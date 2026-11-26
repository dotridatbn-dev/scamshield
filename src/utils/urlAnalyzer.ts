export type UrlRiskLevel = 'invalid' | 'low' | 'medium' | 'high';

export interface UrlFinding {
  id: string;
  title: string;
  severity: 'info' | 'warn' | 'high';
  detail: string;
}

export interface UrlAnalysisResult {
  valid: boolean;
  errorMessage?: string;
  rawInput: string;
  normalizedUrl: string;
  protocol: string;
  hostname: string;
  pathAndQuery: string;
  riskLevel: UrlRiskLevel;
  riskLabel: string;
  findings: UrlFinding[];
  recommendations: string[];
}

const SHORTENER_HOSTS = new Set([
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'rb.gy',
  'is.gd',
  's.id',
  'cutt.ly',
  'shorturl.at',
  'rebrand.ly',
  'tiny.cc',
  'ow.ly',
  'buff.ly',
]);

const BRAND_PATTERNS: Array<{ keyword: string; label: string; officialRoots: string[] }> = [
  { keyword: 'vietcombank', label: 'Vietcombank', officialRoots: ['vietcombank.com.vn'] },
  { keyword: 'vietinbank', label: 'VietinBank', officialRoots: ['vietinbank.vn'] },
  { keyword: 'bidv', label: 'BIDV', officialRoots: ['bidv.com.vn'] },
  { keyword: 'agribank', label: 'Agribank', officialRoots: ['agribank.com.vn'] },
  { keyword: 'mbbank', label: 'MB Bank', officialRoots: ['mbbank.com.vn'] },
  { keyword: 'techcombank', label: 'Techcombank', officialRoots: ['techcombank.com', 'techcombank.com.vn'] },
  { keyword: 'vpbank', label: 'VPBank', officialRoots: ['vpbank.com.vn'] },
  { keyword: 'tpbank', label: 'TPBank', officialRoots: ['tpbank.vn'] },
  { keyword: 'sacombank', label: 'Sacombank', officialRoots: ['sacombank.com.vn'] },
  { keyword: 'acb', label: 'ACB', officialRoots: ['acb.com.vn'] },
  { keyword: 'momo', label: 'MoMo', officialRoots: ['momo.vn'] },
  { keyword: 'zalopay', label: 'ZaloPay', officialRoots: ['zalopay.vn'] },
  { keyword: 'vneid', label: 'VNeID / Định danh điện tử', officialRoots: ['vneid.gov.vn'] },
  { keyword: 'dichvucong', label: 'Cổng Dịch vụ công', officialRoots: ['dichvucong.gov.vn'] },
  { keyword: 'shopee', label: 'Shopee', officialRoots: ['shopee.vn'] },
  { keyword: 'lazada', label: 'Lazada', officialRoots: ['lazada.vn'] },
];

const SUSPICIOUS_TLDS = new Set([
  'xyz',
  'top',
  'vip',
  'click',
  'icu',
  'club',
  'site',
  'online',
  'work',
  'buzz',
  'cc',
  'tk',
  'ml',
  'ga',
  'cf',
]);

function matchesOfficialRoot(hostname: string, roots: string[]): boolean {
  const lower = hostname.toLowerCase();
  return roots.some((root) => lower === root || lower.endsWith(`.${root}`));
}

function isIpLiteral(hostname: string): boolean {
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^\[.*\]$/;
  return ipv4.test(hostname) || ipv6.test(hostname);
}

export function analyzeUrlStructure(rawInput: string): UrlAnalysisResult {
  const trimmed = rawInput.trim();

  if (!trimmed) {
    return {
      valid: false,
      errorMessage: 'Vui lòng nhập đường dẫn (URL) cần kiểm tra.',
      rawInput,
      normalizedUrl: '',
      protocol: '',
      hostname: '',
      pathAndQuery: '',
      riskLevel: 'invalid',
      riskLabel: 'Chưa hợp lệ',
      findings: [],
      recommendations: [],
    };
  }

  if (/\s/.test(trimmed)) {
    return {
      valid: false,
      errorMessage: 'Đường dẫn không được chứa khoảng trắng. Vui lòng kiểm tra lại chuỗi vừa dán.',
      rawInput,
      normalizedUrl: '',
      protocol: '',
      hostname: '',
      pathAndQuery: '',
      riskLevel: 'invalid',
      riskLabel: 'Định dạng không hợp lệ',
      findings: [],
      recommendations: [],
    };
  }

  const hasExplicitScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
  const candidate = hasExplicitScheme ? trimmed : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return {
      valid: false,
      errorMessage: 'Không thể phân tích cấu trúc đường dẫn này. Vui lòng kiểm tra lại định dạng URL.',
      rawInput,
      normalizedUrl: '',
      protocol: '',
      hostname: '',
      pathAndQuery: '',
      riskLevel: 'invalid',
      riskLabel: 'Định dạng không hợp lệ',
      findings: [],
      recommendations: [],
    };
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return {
      valid: false,
      errorMessage: `Giao thức "${parsed.protocol}" không phải HTTP hoặc HTTPS thông thường.`,
      rawInput,
      normalizedUrl: parsed.href,
      protocol: parsed.protocol.replace(':', '').toUpperCase(),
      hostname: parsed.hostname || '(không xác định)',
      pathAndQuery: `${parsed.pathname}${parsed.search}`,
      riskLevel: 'high',
      riskLabel: 'Giao thức bất thường',
      findings: [
        {
          id: 'non-http-protocol',
          title: 'Sử dụng giao thức không chuẩn cho trình duyệt web',
          severity: 'high',
          detail: 'Đường dẫn không dùng HTTP/HTTPS có thể kích hoạt ứng dụng hoặc tải tệp ngoài ý muốn.',
        },
      ],
      recommendations: [
        'Không mở đường dẫn sử dụng giao thức lạ nhận được từ người không quen biết.',
      ],
    };
  }

  if (!parsed.hostname || !parsed.hostname.includes('.')) {
    return {
      valid: false,
      errorMessage: 'Tên miền trong đường dẫn chưa đầy đủ hoặc không hợp lệ.',
      rawInput,
      normalizedUrl: '',
      protocol: '',
      hostname: '',
      pathAndQuery: '',
      riskLevel: 'invalid',
      riskLabel: 'Định dạng không hợp lệ',
      findings: [],
      recommendations: [],
    };
  }

  const findings: UrlFinding[] = [];
  const hostname = parsed.hostname.toLowerCase();
  const protocolLabel = hasExplicitScheme ? parsed.protocol.replace(':', '').toUpperCase() : 'Chưa ghi rõ (mặc định kiểm tra cấu trúc tên miền)';

  // 1. Giao thức HTTP / HTTPS
  if (hasExplicitScheme && parsed.protocol === 'http:') {
    findings.push({
      id: 'http-unencrypted',
      title: 'Sử dụng HTTP không mã hóa',
      severity: 'warn',
      detail: 'Kết nối HTTP không được mã hóa TLS/SSL, dữ liệu gửi đi dễ bị xem trộm hoặc can thiệp.',
    });
  } else if (hasExplicitScheme && parsed.protocol === 'https:') {
    findings.push({
      id: 'https-disclaimer',
      title: 'Có giao thức HTTPS (không đồng nghĩa với an toàn)',
      severity: 'info',
      detail: 'HTTPS chỉ cho biết kết nối được mã hóa; nhiều trang web giả mạo vẫn sử dụng chứng chỉ HTTPS miễn phí.',
    });
  }

  // 2. Userinfo (@) che giấu tên miền thực
  if (parsed.username || parsed.password || trimmed.includes('@')) {
    findings.push({
      id: 'userinfo-obfuscation',
      title: 'Chứa ký tự "@" che giấu tên miền thực sự',
      severity: 'high',
      detail: `Phần đứng trước "@" chỉ là thông tin định danh giả; trình duyệt thực chất sẽ truy cập tên miền "${hostname}".`,
    });
  }

  // 3. Địa chỉ IP trực tiếp
  if (isIpLiteral(hostname)) {
    findings.push({
      id: 'ip-address-host',
      title: 'Sử dụng địa chỉ IP thay cho tên miền chính thức',
      severity: 'high',
      detail: 'Các ngân hàng, cơ quan nhà nước và thương hiệu uy tín hầu như không gửi đường dẫn dạng địa chỉ IP trần.',
    });
  }

  // 4. Đường dẫn rút gọn
  if (SHORTENER_HOSTS.has(hostname)) {
    findings.push({
      id: 'shortened-url',
      title: 'Đường dẫn đã bị rút gọn, ẩn địa chỉ đích',
      severity: 'warn',
      detail: 'Link rút gọn khiến bạn không thể nhìn thấy tên miền đích thực sự trước khi bấm vào.',
    });
  }

  // 5. Punycode hoặc ký tự dễ gây nhầm lẫn
  if (hostname.includes('xn--') || /[^\x00-\x7F]/.test(rawInput)) {
    findings.push({
      id: 'punycode-homoglyph',
      title: 'Tên miền chứa mã hóa Punycode (xn--) hoặc ký tự không thuần ASCII',
      severity: 'high',
      detail: 'Kỹ thuật này có thể dùng các ký tự gần giống chữ Latinh để đánh lừa thị giác người đọc.',
    });
  }

  // 6. Tên miền phụ (subdomain) bất thường
  const labels = hostname.split('.');
  if (labels.length >= 4 && !hostname.endsWith('.com.vn') && !hostname.endsWith('.gov.vn') && !hostname.endsWith('.edu.vn')) {
    findings.push({
      id: 'excessive-subdomains',
      title: 'Cấu trúc nhiều tầng tên miền phụ (subdomain) bất thường',
      severity: 'warn',
      detail: `Tên miền "${hostname}" có ${labels.length} phân đoạn; kẻ gian thường đặt tên thương hiệu ở phần đầu để đánh lừa người xem.`,
    });
  }

  // 7. Tên miền cấp cao dễ bị lạm dụng hoặc đuôi .example minh họa
  const tld = labels[labels.length - 1];
  if (SUSPICIOUS_TLDS.has(tld)) {
    findings.push({
      id: 'uncommon-tld',
      title: `Sử dụng đuôi tên miền (.${tld}) cần kiểm chứng kỹ`,
      severity: 'warn',
      detail: 'Các đuôi tên miền giá rẻ hoặc ít phổ biến thường xuất hiện trong các chiến dịch phát tán đường dẫn giả mạo.',
    });
  }

  // 8. Độ dài đường dẫn bất thường
  if (trimmed.length > 100) {
    findings.push({
      id: 'excessive-length',
      title: 'Đường dẫn dài bất thường',
      severity: 'warn',
      detail: `Đường dẫn dài ${trimmed.length} ký tự, có thể chứa nhiều tham số chuyển hướng hoặc làm khuất phần tên miền chính trên màn hình nhỏ.`,
    });
  }

  // 9. Khả năng giả mạo thương hiệu
  const fullTarget = `${hostname}${parsed.pathname}`.toLowerCase();
  for (const brand of BRAND_PATTERNS) {
    if (fullTarget.includes(brand.keyword) && !matchesOfficialRoot(hostname, brand.officialRoots)) {
      findings.push({
        id: `brand-impersonation-${brand.keyword}`,
        title: `Có dấu hiệu nhắc đến "${brand.label}" nhưng không thuộc tên miền chính thức`,
        severity: 'high',
        detail: `Tên miền thực là "${hostname}", khác với tên miền chính thức thường dùng (${brand.officialRoots.join(', ')}). Cần cảnh giác cao với nguy cơ giả mạo thương hiệu.`,
      });
      break;
    }
  }

  // 10. Từ khóa nhạy cảm trong đường dẫn
  if (/(login|signin|verify|xac-minh|xacminh|otp|update-bank|nhan-thuong|cap-nhat|khoa-tai-khoan)/i.test(fullTarget)) {
    findings.push({
      id: 'sensitive-path-keywords',
      title: 'Đường dẫn chứa từ khóa liên quan đăng nhập, xác minh hoặc nhận thưởng',
      severity: 'warn',
      detail: 'Hãy kiểm tra kỹ tên miền gốc trước khi nhập bất kỳ thông tin tài khoản hoặc mật khẩu nào.',
    });
  }

  const highCount = findings.filter((f) => f.severity === 'high').length;
  const warnCount = findings.filter((f) => f.severity === 'warn').length;

  let riskLevel: UrlRiskLevel = 'low';
  let riskLabel = 'Ít dấu hiệu bất thường về cấu trúc';

  if (highCount >= 1 || warnCount >= 3) {
    riskLevel = 'high';
    riskLabel = 'Cấu trúc có dấu hiệu rủi ro cao';
  } else if (warnCount >= 1) {
    riskLevel = 'medium';
    riskLabel = 'Cấu trúc có điểm cần thận trọng';
  }

  const recommendations = [
    'Luôn đọc phần tên miền gốc nằm ngay trước dấu "/" đầu tiên để nhận biết trang web thực sự bạn sắp truy cập.',
    'Không đăng nhập tài khoản ngân hàng, ví điện tử hoặc VNeID thông qua liên kết gửi kèm trong tin nhắn lạ.',
    'Thay vì bấm vào đường dẫn, hãy tự mở ứng dụng chính thức hoặc gõ trực tiếp địa chỉ trang web đã kiểm chứng.',
  ];

  return {
    valid: true,
    rawInput: trimmed,
    normalizedUrl: parsed.href,
    protocol: protocolLabel,
    hostname,
    pathAndQuery: `${parsed.pathname}${parsed.search}` || '/',
    riskLevel,
    riskLabel,
    findings,
    recommendations,
  };
}
