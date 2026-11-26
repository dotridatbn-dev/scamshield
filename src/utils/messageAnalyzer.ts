import { normalizeVietnameseSearch, normalizeWhitespace } from './vietnamese';

export type RiskStatus = 'insufficient' | 'low' | 'medium' | 'high';

export interface MatchedIndicator {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  weight: number;
  explanation: string;
  evidence: string[];
}

export interface MessageAnalysisResult {
  status: RiskStatus;
  score: number | null;
  statusLabel: string;
  suspectedCategory: string;
  summaryMessage: string;
  indicators: MatchedIndicator[];
  recommendations: string[];
  relatedArticleSlugs: string[];
  safetyNoticeMatched: boolean;
}

interface RuleDefinition {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  weight: number;
  categoryHint: string;
  explanation: string;
  recommendation: string;
  articleSlug: string;
  patterns: RegExp[];
}

const SAFETY_WARNING_PHRASES: RegExp[] = [
  /khong\s+(bao\s+gio\s+)?(cung\s+cap|chia\s+se|gui|doc|nhap|tiet\s+lo)\s+(ma\s+)?(otp|mat\s+khau|pin|cvv)/i,
  /tuyet\s+doi\s+khong\s+(cung\s+cap|chia\s+se|chuyen\s+tien|bam\s+vao)/i,
  /ngan\s+hang\s+khong\s+(bao\s+gio\s+)?yeu\s+cau\s+(cung\s+cap\s+)?(otp|mat\s+khau)/i,
  /cong\s+an\s+khong\s+lam\s+viec\s+qua\s+dien\s+thoai/i,
  /canh\s+giac\s+(voi\s+)?(thu\s+doan|lua\s+dao)/i,
  /day\s+la\s+tin\s+nhan\s+canh\s+bao/i,
];

const RULES: RuleDefinition[] = [
  {
    id: 'otp-password-demand',
    title: 'Yêu cầu cung cấp mã OTP, mật khẩu hoặc mã PIN',
    severity: 'high',
    weight: 48,
    categoryHint: 'Đánh cắp tài khoản / OTP ngân hàng',
    explanation:
      'Tin nhắn có dấu hiệu yêu cầu bạn đọc, gửi hoặc nhập mã OTP, mật khẩu, mã PIN hay mã CVV. Tổ chức tài chính và cơ quan hợp pháp không bao giờ yêu cầu thông tin bí mật này qua tin nhắn hoặc cuộc gọi.',
    recommendation:
      'Tuyệt đối không cung cấp mã OTP, mật khẩu, mã PIN hoặc thông tin thẻ cho bất kỳ ai dưới mọi hình thức.',
    articleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
    patterns: [
      /(gui|cung\s+cap|doc|nhap|xac\s+nhan|bao\s+lai|chuyen\s+tiep)\s+(lai\s+)?(cho\s+(em|anh|chi|nhan\s+vien|tong\s+dai|he\s+thong)\s+)?(ma\s+)?(otp|mat\s+khau|password|ma\s+pin|cvv|smart\s*otp)/i,
      /(ma\s+)?(otp|mat\s+khau|pin)\s+(se\s+gui\s+ve|vua\s+gui|la\s+gi|de\s+hoan\s+tat|de\s+huy|de\s+mo\s+khoa|de\s+nhan)/i,
      /xac\s+minh\s+giao\s+dich\s+bang\s+(ma\s+)?otp/i,
    ],
  },
  {
    id: 'financial-info-request',
    title: 'Yêu cầu cung cấp thông tin thẻ hoặc tài khoản ngân hàng nhạy cảm',
    severity: 'high',
    weight: 32,
    categoryHint: 'Chiếm đoạt thông tin tài chính',
    explanation:
      'Nội dung đề nghị bạn gửi số thẻ, ảnh hai mặt thẻ, CCCD hoặc thông tin đăng nhập ngân hàng để xác minh hay nhận hỗ trợ.',
    recommendation:
      'Không gửi ảnh chụp CCCD, mặt thẻ ngân hàng hoặc tên đăng nhập cho người lạ qua mạng.',
    articleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
    patterns: [
      /(chup|gui|dien|nhap)\s+(anh\s+)?(2\s+mat\s+|hai\s+mat\s+)?(the\s+ngan\s+hang|the\s+tin\s+dung|so\s+the|cccd|cmnd|tai\s+khoan\s+ebanking)/i,
      /(ten\s+dang\s+nhap|tai\s+khoan\s+ngan\s+hang)\s+(va|kem)\s+(mat\s+khau|ma\s+pin)/i,
    ],
  },
  {
    id: 'advance-fee-deposit',
    title: 'Yêu cầu đóng phí trước, đặt cọc hoặc chuyển khoản để nhận quyền lợi',
    severity: 'high',
    weight: 34,
    categoryHint: 'Lừa đảo yêu cầu đóng phí trước / đặt cọc',
    explanation:
      'Yêu cầu chuyển tiền đặt cọc, phí hồ sơ, phí giải ngân, thuế nhận thưởng hoặc nạp tiền làm nhiệm vụ trước khi nhận tiền là dấu hiệu lừa đảo phổ biến.',
    recommendation:
      'Không chuyển tiền đặt cọc, phí mở khóa hay phí nhận thưởng cho cá nhân hoặc tài khoản không rõ ràng.',
    articleSlug: 'lua-dao-trung-thuong',
    patterns: [
      /(chuyen|dong|nop|nap)\s+(truoc\s+)?(khoan\s+)?(tien\s+)?(dat\s+coc|phi\s+ho\s+so|phi\s+van\s+chuyen|phi\s+giai\s+ngan|phi\s+mo\s+khoa|phi\s+rut\s+tien|thue\s+thu\s+nhap|phi\s+nhan\s+thuong)/i,
      /(nap\s+tien|chuyen\s+khoan)\s+(de\s+)?(kich\s+hoat|nang\s+cap|hoan\s+thanh\s+don|nhan\s+lai|rut\s+von)/i,
      /dat\s+coc\s+(giu\s+cho|phong|hang|hoc\s+bong)/i,
    ],
  },
  {
    id: 'online-task-scam',
    title: 'Dấu hiệu lừa đảo làm nhiệm vụ online / chốt đơn ảo',
    severity: 'high',
    weight: 34,
    categoryHint: 'Lừa đảo tuyển dụng, việc nhẹ lương cao',
    explanation:
      'Hình thức rủ rê bấm like, tăng tương tác, đặt đơn hàng ảo, nạp tiền nhận hoa hồng qua Telegram/Zalo thường trả thưởng nhỏ ban đầu rồi chiếm đoạt số tiền lớn về sau.',
    recommendation:
      'Tránh xa mọi công việc yêu cầu nạp tiền, thanh toán đơn hàng hộ hoặc chuyển khoản qua nhóm Telegram để nhận hoa hồng.',
    articleSlug: 'lua-dao-tuyen-dung-viec-nhe-luong-cao',
    patterns: [
      /(lam\s+nhiem\s+vu|chot\s+don|tang\s+tuong\s+tac|like\s+video|danh\s+gia\s+san\s+pham|ctv\s+online|cong\s+tac\s+vien\s+tai\s+nha)/i,
      /(hoa\s+hong\s+\d+%|nhan\s+hoa\s+hong\s+ngay|hoan\s+tien\s+sau\s+\d+\s+phut)/i,
      /(nhom\s+telegram|chuyen\s+vien\s+huong\s+dan\s+nhiem\s+vu|len\s+don\s+hang)/i,
    ],
  },
  {
    id: 'unrealistic-job-income',
    title: 'Hứa hẹn thu nhập cao bất thường với yêu cầu công việc đơn giản',
    severity: 'medium',
    weight: 26,
    categoryHint: 'Lừa đảo tuyển dụng, việc nhẹ lương cao',
    explanation:
      'Lời mời việc làm tại nhà không cần kinh nghiệm nhưng cam kết thu nhập vài trăm nghìn đến hàng triệu đồng mỗi ngày thường là mồi nhử lừa đảo.',
    recommendation:
      'Kiểm tra thông tin doanh nghiệp tuyển dụng qua website chính thức và không đóng bất kỳ khoản phí nào để nhận việc.',
    articleSlug: 'lua-dao-tuyen-dung-viec-nhe-luong-cao',
    patterns: [
      /(viec\s+nhe\s+luong\s+cao|khong\s+can\s+kinh\s+nghiem.*thu\s+nhap|ngoi\s+nha\s+luot\s+dien\s+thoai)/i,
      /(thu\s+nhap|luong|kiem\s+tien)\s*(tu\s*)?(\d{3}k|\d+\s*(trieu|tr)|[5-9]00\.?000)\s*(\/|moi\s+)?(ngay|buoi|gio)/i,
      /chi\s+can\s+\d+\s*(phut|gio)\s*(moi\s+ngay)?\s*(kiem|nhan)/i,
    ],
  },
  {
    id: 'unrealistic-investment',
    title: 'Cam kết lợi nhuận đầu tư cao bất thường hoặc không rủi ro',
    severity: 'high',
    weight: 34,
    categoryHint: 'Lừa đảo đầu tư tài chính',
    explanation:
      'Không có kênh đầu tư hợp pháp nào cam kết lợi nhuận cố định cực cao hoặc đảm bảo sinh lời chắc chắn trong thời gian ngắn.',
    recommendation:
      'Không tham gia các sàn giao dịch, tiền ảo, ngoại hối không được cấp phép tại Việt Nam và không nghe theo "chuyên gia đọc lệnh".',
    articleSlug: 'lua-dao-dau-tu-tai-chinh',
    patterns: [
      /(cam\s+ket|bao\s+dam|chac\s+chan)\s+(loi\s+nhuan|sinh\s+loi|lai\s+suat|co\s+lai|khong\s+rui\s+ro|bao\s+von)/i,
      /(loi\s+nhuan|lai\s+suat)\s+(\d{2,3}%|gap\s+\d+\s+lan)\s*(\/|moi\s+)?(ngay|tuan|thang)/i,
      /(thay\s+doc\s+lenh|keo\s+1[-:]?1|san\s+giao\s+dich\s+quoc\s+te|bao\s+chay\s+tai\s+khoan)/i,
    ],
  },
  {
    id: 'prize-scam',
    title: 'Thông báo trúng thưởng hoặc nhận quà giá trị lớn bất ngờ',
    severity: 'medium',
    weight: 26,
    categoryHint: 'Lừa đảo trúng thưởng / quà tặng',
    explanation:
      'Kẻ gian thường giả danh chương trình tri ân, sàn thương mại điện tử hoặc nhãn hàng thông báo bạn trúng xe, điện thoại, tiền mặt để dụ cung cấp thông tin hoặc đóng phí.',
    recommendation:
      'Xác minh trực tiếp trên kênh chính thức của nhãn hàng nếu bạn từng tham gia chương trình quay thưởng thực tế.',
    articleSlug: 'lua-dao-trung-thuong',
    patterns: [
      /(chuc\s+mung\s+(quy\s+khach|ban)\s+(da\s+)?trung\s+(thuong|giai)|trung\s+thuong\s+(dac\s+biet|tri\s+an|iphone|xe\s+may|\d+\s+trieu))/i,
      /(nhan\s+qua\s+tri\s+an\s+mien\s+phi|ma\s+du\s+thuong\s+may\s+man|phieu\s+qua\s+tang\s+doc\s+quyen)/i,
    ],
  },
  {
    id: 'artificial-urgency',
    title: 'Tạo áp lực thời gian gấp gáp để buộc hành động vội vàng',
    severity: 'medium',
    weight: 18,
    categoryHint: 'Thao túng tâm lý khẩn cấp',
    explanation:
      'Kẻ lừa đảo cố tình đặt thời hạn rất ngắn (trong 15–30 phút, ngay lập tức) để nạn nhân không kịp kiểm chứng với người thân hoặc cơ quan chức năng.',
    recommendation:
      'Chủ động dừng lại, hít thở sâu và kiểm chứng độc lập; thông báo hợp pháp hiếm khi ép bạn xử lý trong vài phút qua tin nhắn lạ.',
    articleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
    patterns: [
      /(trong\s+vong\s+\d+\s*(phut|gio)|ngay\s+lap\s+tuc|khan\s+cap|han\s+chot\s+hom\s+nay|neu\s+khong\s+se\s+(bi\s+)?(khoa|huy|thu\s+hoi|phong\s+toa))/i,
      /(chi\s+con\s+\d+\s+suat|het\s+han\s+sau\s+\d+\s+phut)/i,
    ],
  },
  {
    id: 'threats-intimidation',
    title: 'Đe dọa pháp lý, phong tỏa tài khoản hoặc cưỡng chế',
    severity: 'high',
    weight: 30,
    categoryHint: 'Giả danh công an, tòa án hoặc đe dọa tâm lý',
    explanation:
      'Ngôn ngữ đe dọa liên quan đến lệnh bắt, khởi tố, rửa tiền hoặc đóng băng tài khoản nhằm gây hoảng loạn và buộc nạn nhân làm theo chỉ dẫn.',
    recommendation:
      'Giữ bình tĩnh, ngắt liên lạc ngay và không chuyển tiền "chứng minh trong sạch". Cơ quan công an làm việc trực tiếp qua giấy mời hợp lệ tại địa phương.',
    articleSlug: 'gia-danh-cong-an-va-co-quan-nha-nuoc',
    patterns: [
      /(lenh\s+bat|khoi\s+to|truy\s+na|lien\s+quan\s+duong\s+day\s+rua\s+tien|ma\s+tuy|chuyen\s+tien\s+chung\s+minh\s+trong\s+sach)/i,
      /(dong\s+bang\s+tai\s+khoan|phong\s+toa\s+tai\s+san|toa\s+an\s+trieu\s+tap|giay\s+trieu\s+tap\s+khan)/i,
    ],
  },
  {
    id: 'bank-impersonation',
    title: 'Đề cập thương hiệu ngân hàng kèm yêu cầu xử lý sự cố bất thường',
    severity: 'medium',
    weight: 22,
    categoryHint: 'Giả danh ngân hàng / ví điện tử',
    explanation:
      'Tin nhắn viện lý do tài khoản bị khóa, nâng cấp sinh trắc học, hủy dịch vụ trừ tiền hàng tháng hoặc lỗi hệ thống để dẫn dụ người dùng bấm link lạ hoặc gọi số lạ.',
    recommendation:
      'Mở trực tiếp ứng dụng ngân hàng chính thức hoặc gọi số hotline in ở mặt sau thẻ để tự kiểm tra.',
    articleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
    patterns: [
      /(tai\s+khoan\s+(ngan\s+hang|the)\s+(cua\s+ban\s+)?(da\s+bi\s+khoa|tam\s+khoa|sap\s+bi\s+khoa|phat\s+sinh\s+giao\s+dich\s+la|bi\s+tru\s+phi))/i,
      /(cap\s+nhat\s+sinh\s+trac\s+hoc|xac\s+thuc\s+tai\s+khoan\s+ngan\s+hang|huy\s+goi\s+dich\s+vu\s+tu\s+dong|nang\s+han\s+muc\s+the)/i,
    ],
  },
  {
    id: 'government-impersonation',
    title: 'Nhân danh cơ quan nhà nước, công an, thuế hoặc VNeID',
    severity: 'high',
    weight: 28,
    categoryHint: 'Giả danh công an và cơ quan nhà nước',
    explanation:
      'Kẻ gian thường mạo danh cán bộ công an, thuế, bảo hiểm xã hội hoặc hỗ trợ VNeID để yêu cầu cài app lạ, cập nhật định danh mức 2 qua đường dẫn không chính thống.',
    recommendation:
      'Liên hệ trực tiếp công an phường/xã hoặc cơ quan thuế địa phương; tuyệt đối không cài ứng dụng định danh từ file gửi qua chat.',
    articleSlug: 'gia-danh-cong-an-va-co-quan-nha-nuoc',
    patterns: [
      /(can\s+bo\s+cong\s+an|cuc\s+canh\s+sat|co\s+quan\s+dieu\s+tra|vien\s+kiem\s+sat|toa\s+an\s+nhan\s+dan)/i,
      /(cap\s+nhat\s+(vneid|dinh\s+danh\s+dien\s+tu|ma\s+so\s+thue|bao\s+hiem\s+xa\s+hoi)\s+(qua\s+link|truc\s+tuyen|tai\s+day))/i,
      /(bo\s+cong\s+an\s+yeu\s+cau|phong\s+chong\s+toi\s+pham\s+cong\s+nghe\s+cao.*chuyen\s+khoan)/i,
    ],
  },
  {
    id: 'family-impersonation',
    title: 'Giả danh người thân hoặc bạn bè vay tiền / nhờ chuyển khoản khẩn cấp',
    severity: 'high',
    weight: 30,
    categoryHint: 'Giả danh người thân hoặc chiếm đoạt tài khoản mạng xã hội',
    explanation:
      'Tài khoản mạng xã hội bị chiếm quyền hoặc giả mạo thường nhắn tin hỏi vay tiền gấp, báo đang nằm viện hoặc nhờ chuyển khoản hộ vì tài khoản bị lỗi.',
    recommendation:
      'Gọi điện thoại trực tiếp qua số di động quen thuộc (không gọi qua app vừa nhắn tin) để nghe giọng nói và xác nhận trước khi chuyển tiền.',
    articleSlug: 'lua-dao-chiem-doat-tai-khoan-mang-xa-hoi',
    patterns: [
      /(cho\s+(minh|em|anh|tao|to)\s+muon\s+tam|chuyen\s+gap\s+(cho\s+)?(me|bo|con|anh|em|minh)|chuyen\s+ho\s+vao\s+tai\s+khoan\s+nay)/i,
      /(dang\s+cap\s+cuu|tai\s+nan\s+giao\s+thong|dien\s+thoai\s+bi\s+hong|mat\s+vi\s+tien|tai\s+khoan\s+dang\s+loi\s+khong\s+chuyen\s+duoc)/i,
      /lat\s+toi\s+(tra|chuyen\s+lai)\s+(lien|ngay)/i,
    ],
  },
  {
    id: 'suspicious-url-mention',
    title: 'Chứa đường dẫn hoặc tên miền lạ yêu cầu truy cập',
    severity: 'medium',
    weight: 22,
    categoryHint: 'Đường dẫn giả mạo (Phishing)',
    explanation:
      'Tin nhắn kèm theo liên kết rút gọn hoặc tên miền không phải trang web chính thức để dẫn dụ người dùng đăng nhập hoặc tải tệp.',
    recommendation:
      'Không bấm trực tiếp vào đường dẫn trong tin nhắn lạ; hãy kiểm tra cấu trúc liên kết bằng công cụ Kiểm tra đường dẫn của ScamShield.',
    articleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
    patterns: [
      /(https?:\/\/\S+|www\.\S+|\b[a-z0-9-]+\.(example|xyz|top|vip|click|cc|club|shop|online|info|site|icu)\b)/i,
      /\b(bit\.ly|tinyurl\.com|rb\.gy|cutt\.ly|shorturl\.at|is\.gd|t\.co)\/\S+/i,
      /(bam\s+vao\s+(link|duong\s+dan)|truy\s+cap\s+lien\s+ket|dang\s+nhap\s+tai\s+link)/i,
    ],
  },
  {
    id: 'unfamiliar-app-install',
    title: 'Yêu cầu tải ứng dụng ngoài kho chính thức hoặc cài tệp APK',
    severity: 'high',
    weight: 36,
    categoryHint: 'Chiếm quyền điều khiển thiết bị qua ứng dụng độc hại',
    explanation:
      'Yêu cầu tải tệp .apk, cài ứng dụng không có trên App Store / Google Play hoặc bật chia sẻ màn hình, quyền Trợ năng (Accessibility) có thể giúp kẻ gian chiếm quyền điều khiển điện thoại.',
    recommendation:
      'Tuyệt đối không tải tệp .apk từ tin nhắn lạ và không cấp quyền Trợ năng hay chia sẻ màn hình cho người lạ.',
    articleSlug: 'gia-danh-cong-an-va-co-quan-nha-nuoc',
    patterns: [
      /(tai\s+(file|tep|ung\s+dung|app)\s+(.{0,25})\.apk|cai\s+dat\s+(ung\s+dung|app)\s+(ngoai|qua\s+link|dich\s+vu\s+cong))/i,
      /(bat\s+quyen\s+tro\s+nang|accessibility|chia\s+se\s+man\s+hinh|cap\s+quyen\s+dieu\s+khien)/i,
    ],
  },
];

function extractEvidenceSnippets(rawText: string, patterns: RegExp[]): string[] {
  const normalizedRaw = normalizeWhitespace(rawText);
  const sentences = normalizedRaw.split(/(?<=[.!?\n])\s+|\n+/);
  const matched: string[] = [];

  for (const sentence of sentences) {
    const normalizedSentence = normalizeVietnameseSearch(sentence);
    if (patterns.some((p) => p.test(normalizedSentence))) {
      const trimmed = sentence.trim();
      if (trimmed && !matched.includes(trimmed)) {
        matched.push(trimmed.length > 140 ? `${trimmed.slice(0, 137)}...` : trimmed);
      }
    }
  }

  if (matched.length === 0) {
    const fallbackNormalized = normalizeVietnameseSearch(normalizedRaw);
    for (const p of patterns) {
      const m = fallbackNormalized.match(p);
      if (m && m[0]) {
        matched.push(`Cụm từ khớp dấu hiệu: "${m[0]}"`);
        break;
      }
    }
  }

  return matched.slice(0, 3);
}

export function analyzeMessage(rawInput: string): MessageAnalysisResult {
  const cleaned = normalizeWhitespace(rawInput);

  if (!cleaned) {
    return {
      status: 'insufficient',
      score: null,
      statusLabel: 'Chưa đủ thông tin',
      suspectedCategory: 'Chưa có nội dung để phân tích',
      summaryMessage: 'Vui lòng dán nội dung tin nhắn hoặc chọn một ví dụ minh họa để bắt đầu kiểm tra.',
      indicators: [],
      recommendations: [
        'Sao chép đầy đủ nội dung tin nhắn đáng ngờ (không cần bao gồm mật khẩu hoặc mã OTP cá nhân của bạn).',
      ],
      relatedArticleSlugs: [],
      safetyNoticeMatched: false,
    };
  }

  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const normalized = normalizeVietnameseSearch(cleaned);
  const hasUrl = /https?:\/\/|www\.|\.[a-z]{2,}\//i.test(cleaned);

  if (cleaned.length < 15 || (wordCount < 4 && !hasUrl)) {
    return {
      status: 'insufficient',
      score: null,
      statusLabel: 'Chưa đủ thông tin',
      suspectedCategory: 'Nội dung quá ngắn để đánh giá ngữ cảnh',
      summaryMessage:
        'Đoạn văn bản hiện tại quá ngắn để nhận diện ngữ cảnh. Hãy cung cấp trọn vẹn tin nhắn hoặc lời đề nghị mà bạn nhận được.',
      indicators: [],
      recommendations: [
        'Dán toàn bộ đoạn tin nhắn gồm lời chào, yêu cầu cụ thể và đường dẫn (nếu có) để bộ quy tắc đánh giá chính xác hơn.',
        'Luôn giữ nguyên thái độ cảnh giác nếu người gửi thúc giục chuyển tiền hoặc xin thông tin cá nhân.',
      ],
      relatedArticleSlugs: ['lua-dao-ngan-hang-va-danh-cap-otp'],
      safetyNoticeMatched: false,
    };
  }

  const isSafetyWarning = SAFETY_WARNING_PHRASES.some((pattern) => pattern.test(normalized));
  // Loại bỏ cụm phủ định trước khi tìm yêu cầu tiết lộ bí mật.
  const affirmativeText = normalized.replace(/(?:khong|dung|cho|cam)\s+(?:bao\s+gio\s+)?(?:cung\s+cap|chia\s+se|gui|doc|nhap|tiet\s+lo)\s+(?:ma\s+)?(?:otp|mat\s+khau|pin|cvv)/gi, ' ');
  const directSecretDemand = /(?:gui|cung\s+cap|doc|bao\s+lai|chuyen\s+tiep|chia\s+se)\s+(?:lai\s+)?(?:ma\s+)?(?:otp|mat\s+khau|password|ma\s+pin|cvv|smart\s*otp)\b/i.test(affirmativeText);

  const matchedIndicators: MatchedIndicator[] = [];
  const categoryVotes = new Map<string, number>();
  const recommendationSet = new Set<string>();
  const articleSlugSet = new Set<string>();

  for (const rule of RULES) {
    // Nếu tin nhắn là cảnh báo an toàn (ví dụ: "Không cung cấp mã OTP cho người lạ")
    // và KHÔNG có lời yêu cầu cung cấp OTP thực sự hoặc URL lạ, bỏ qua rule OTP/financial để tránh báo nhầm.
    if (
      isSafetyWarning &&
      (rule.id === 'otp-password-demand' || rule.id === 'financial-info-request')
    ) {
      const explicitDemand = /(gui\s+otp\s+cho|doc\s+ma\s+otp|nhap\s+otp\s+tai)/i.test(normalized);
      if (!explicitDemand && !directSecretDemand) {
        continue;
      }
    }

    const hits = (rule.id === 'otp-password-demand' && directSecretDemand) || rule.patterns.some((pattern) => pattern.test(normalized));
    if (hits) {
      const evidence = extractEvidenceSnippets(cleaned, rule.patterns);
      matchedIndicators.push({
        id: rule.id,
        title: rule.title,
        severity: rule.severity,
        weight: rule.weight,
        explanation: rule.explanation,
        evidence,
      });
      categoryVotes.set(
        rule.categoryHint,
        (categoryVotes.get(rule.categoryHint) || 0) + rule.weight
      );
      recommendationSet.add(rule.recommendation);
      articleSlugSet.add(rule.articleSlug);
    }
  }

  let rawScore = matchedIndicators.reduce((sum, item) => sum + item.weight, 0);

  // Cộng điểm ngữ cảnh khi kết hợp nhiều yếu tố (ví dụ: giả danh + thúc giục + link/OTP)
  const hasImpersonation = matchedIndicators.some((i) =>
    ['bank-impersonation', 'government-impersonation', 'family-impersonation'].includes(i.id)
  );
  const hasActionPressure = matchedIndicators.some((i) =>
    [
      'otp-password-demand',
      'advance-fee-deposit',
      'suspicious-url-mention',
      'unfamiliar-app-install',
      'artificial-urgency',
    ].includes(i.id)
  );

  if (hasImpersonation && hasActionPressure && matchedIndicators.length >= 2) {
    rawScore += 14;
  }

  // Nếu có yếu tố cảnh báo an toàn rõ ràng và ít dấu hiệu rủi ro khác, giảm nhẹ điểm nhiễu
  if (isSafetyWarning && matchedIndicators.length <= 1) {
    rawScore = Math.max(0, rawScore - 15);
  }

  // Không phân loại nguy hiểm cao chỉ vì một từ khóa nhạy cảm đơn lẻ không kèm yêu cầu
  if (matchedIndicators.length === 1 && matchedIndicators[0].severity !== 'high') {
    rawScore = Math.min(rawScore, 28);
  }

  if (directSecretDemand) rawScore = Math.max(rawScore, 70);

  const finalScore = Math.max(0, Math.min(100, rawScore));

  let status: RiskStatus = 'low';
  let statusLabel = 'Ít dấu hiệu rủi ro';
  let summaryMessage =
    'Bộ quy tắc chưa phát hiện nhiều dấu hiệu lừa đảo rõ rệt trong đoạn văn bản này. Tuy nhiên, kết quả chỉ mang tính tham khảo và bạn vẫn nên kiểm chứng người gửi trước khi giao dịch.';

  if (finalScore >= 70) {
    status = 'high';
    statusLabel = 'Nguy cơ cao';
    summaryMessage =
      'Tin nhắn chứa nhiều dấu hiệu rủi ro nghiêm trọng thường gặp trong các kịch bản lừa đảo trực tuyến. Bạn không nên làm theo yêu cầu, không bấm vào liên kết và không chuyển tiền hay cung cấp OTP.';
  } else if (finalScore >= 30) {
    status = 'medium';
    statusLabel = 'Đáng ngờ';
    summaryMessage =
      'Tin nhắn có một số dấu hiệu đáng ngờ cần được kiểm chứng thêm qua kênh chính thức trước khi bạn phản hồi hoặc thực hiện giao dịch.';
  } else if (isSafetyWarning && matchedIndicators.length === 0) {
    summaryMessage =
      'Nội dung mang tính chất nhắc nhở hoặc cảnh báo an toàn thông tin, không phát hiện yêu cầu đánh cắp OTP hay dẫn dụ chuyển tiền.';
  }

  let suspectedCategory = 'Chưa ghi nhận nhóm lừa đảo cụ thể';
  if (categoryVotes.size > 0) {
    const sorted = [...categoryVotes.entries()].sort((a, b) => b[1] - a[1]);
    suspectedCategory = sorted[0][0];
  } else if (isSafetyWarning) {
    suspectedCategory = 'Thông điệp cảnh báo / nhắc nhở an toàn';
  }

  if (recommendationSet.size === 0) {
    recommendationSet.add(
      'Luôn xác minh danh tính người gửi qua kênh liên lạc độc lập trước khi chia sẻ thông tin cá nhân hoặc thực hiện giao dịch tài chính.'
    );
    recommendationSet.add(
      'Không cung cấp mã OTP, mật khẩu, thông tin thẻ ngân hàng hoặc cài đặt tệp lạ từ tin nhắn.'
    );
  }

  if (articleSlugSet.size === 0) {
    articleSlugSet.add('lua-dao-ngan-hang-va-danh-cap-otp');
    articleSlugSet.add('lua-dao-tuyen-dung-viec-nhe-luong-cao');
  }

  return {
    status,
    score: finalScore,
    statusLabel,
    suspectedCategory,
    summaryMessage,
    indicators: matchedIndicators,
    recommendations: Array.from(recommendationSet),
    relatedArticleSlugs: Array.from(articleSlugSet).slice(0, 3),
    safetyNoticeMatched: isSafetyWarning,
  };
}
