export interface PhoneCheckResult {
  valid: boolean;
  errorMessage?: string;
  cleanedInput: string;
  localFormat: string;
  internationalFormat: string;
  numberTypeLabel: string;
}

export function validateAndNormalizeVietnamesePhone(rawInput: string): PhoneCheckResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      errorMessage: 'Vui lòng nhập số điện thoại cần chuẩn hóa và kiểm tra định dạng.',
      cleanedInput: '',
      localFormat: '',
      internationalFormat: '',
      numberTypeLabel: '',
    };
  }

  // Loại bỏ khoảng trắng, dấu gạch ngang, dấu chấm và ngoặc đơn
  const stripped = trimmed.replace(/[\s\-().]/g, '');

  if (!/^\+?\d+$/.test(stripped)) {
    return {
      valid: false,
      errorMessage: 'Số điện thoại chỉ được chứa chữ số, dấu "+", khoảng trắng hoặc dấu gạch ngang.',
      cleanedInput: stripped,
      localFormat: '',
      internationalFormat: '',
      numberTypeLabel: '',
    };
  }

  let normalizedLocal = stripped;
  if (stripped.startsWith('+84')) {
    normalizedLocal = `0${stripped.slice(3)}`;
  } else if (stripped.startsWith('84') && stripped.length >= 11) {
    normalizedLocal = `0${stripped.slice(2)}`;
  }

  const isMobile = /^0(3|5|7|8|9)\d{8}$/.test(normalizedLocal);
  const isLandline = /^02\d{8,9}$/.test(normalizedLocal);

  if (!isMobile && !isLandline) {
    return {
      valid: false,
      errorMessage:
        'Số điện thoại chưa khớp định dạng số di động (10 số đầu 03, 05, 07, 08, 09) hoặc số cố định (đầu 02) phổ biến tại Việt Nam.',
      cleanedInput: stripped,
      localFormat: normalizedLocal,
      internationalFormat: '',
      numberTypeLabel: '',
    };
  }

  const intl = `+84${normalizedLocal.slice(1)}`;
  const groupedLocal = isMobile
    ? `${normalizedLocal.slice(0, 4)} ${normalizedLocal.slice(4, 7)} ${normalizedLocal.slice(7)}`
    : `${normalizedLocal.slice(0, 4)} ${normalizedLocal.slice(4, 7)} ${normalizedLocal.slice(7)}`;

  return {
    valid: true,
    cleanedInput: stripped,
    localFormat: groupedLocal,
    internationalFormat: `${intl.slice(0, 3)} ${intl.slice(3, 6)} ${intl.slice(6, 9)} ${intl.slice(9)}`,
    numberTypeLabel: isMobile ? 'Định dạng di động Việt Nam (10 chữ số)' : 'Định dạng điện thoại cố định (đầu 02)',
  };
}

export interface VietnameseBank {
  id: string;
  name: string;
  shortName: string;
}

export const VIETNAMESE_BANKS: VietnameseBank[] = [
  { id: 'vietcombank', name: 'Ngân hàng TMCP Ngoại thương Việt Nam', shortName: 'Vietcombank' },
  { id: 'vietinbank', name: 'Ngân hàng TMCP Công thương Việt Nam', shortName: 'VietinBank' },
  { id: 'bidv', name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', shortName: 'BIDV' },
  { id: 'agribank', name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn', shortName: 'Agribank' },
  { id: 'mbbank', name: 'Ngân hàng TMCP Quân đội', shortName: 'MB Bank' },
  { id: 'techcombank', name: 'Ngân hàng TMCP Kỹ thương Việt Nam', shortName: 'Techcombank' },
  { id: 'vpbank', name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', shortName: 'VPBank' },
  { id: 'acb', name: 'Ngân hàng TMCP Á Châu', shortName: 'ACB' },
  { id: 'tpbank', name: 'Ngân hàng TMCP Tiên Phong', shortName: 'TPBank' },
  { id: 'sacombank', name: 'Ngân hàng TMCP Sài Gòn Thương Tín', shortName: 'Sacombank' },
  { id: 'shb', name: 'Ngân hàng TMCP Sài Gòn – Hà Nội', shortName: 'SHB' },
  { id: 'vib', name: 'Ngân hàng TMCP Quốc tế Việt Nam', shortName: 'VIB' },
  { id: 'hdbank', name: 'Ngân hàng TMCP Phát triển TP.HCM', shortName: 'HDBank' },
  { id: 'msb', name: 'Ngân hàng TMCP Hàng Hải Việt Nam', shortName: 'MSB' },
  { id: 'ocb', name: 'Ngân hàng TMCP Phương Đông', shortName: 'OCB' },
  { id: 'lpbank', name: 'Ngân hàng TMCP Lộc Phát Việt Nam', shortName: 'LPBank' },
  { id: 'other', name: 'Ngân hàng hoặc tổ chức khác', shortName: 'Ngân hàng khác' },
];

export interface BankAccountCheckResult {
  valid: boolean;
  errorMessage?: string;
  cleanedAccount: string;
  maskedAccount: string;
  length: number;
}

export function validateAndMaskBankAccount(rawAccount: string): BankAccountCheckResult {
  // Chỉ loại bỏ khoảng trắng thừa, giữ nguyên số 0 ở đầu
  const cleaned = rawAccount.replace(/\s+/g, '');

  if (!cleaned) {
    return {
      valid: false,
      errorMessage: 'Vui lòng nhập số tài khoản ngân hàng cần chuẩn bị kiểm chứng.',
      cleanedAccount: '',
      maskedAccount: '',
      length: 0,
    };
  }

  if (!/^[a-zA-Z0-9]+$/.test(cleaned)) {
    return {
      valid: false,
      errorMessage: 'Số tài khoản chỉ nên chứa chữ số hoặc ký tự chữ (đối với tài khoản biệt danh), không chứa ký tự đặc biệt.',
      cleanedAccount: cleaned,
      maskedAccount: '',
      length: cleaned.length,
    };
  }

  if (cleaned.length < 6 || cleaned.length > 24) {
    return {
      valid: false,
      errorMessage: 'Độ dài số tài khoản thông thường tại Việt Nam nằm trong khoảng từ 6 đến 24 ký tự.',
      cleanedAccount: cleaned,
      maskedAccount: '',
      length: cleaned.length,
    };
  }

  const tail = cleaned.slice(-4);
  const head = cleaned.length > 8 ? cleaned.slice(0, 2) : '';
  const hiddenCount = Math.max(2, cleaned.length - head.length - tail.length);
  const masked = `${head}${'•'.repeat(hiddenCount)}${tail}`;

  return {
    valid: true,
    cleanedAccount: cleaned,
    maskedAccount: masked,
    length: cleaned.length,
  };
}
