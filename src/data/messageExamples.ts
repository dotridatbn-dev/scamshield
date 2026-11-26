export interface MessageExample {
  id: string;
  label: string;
  scenarioType: string;
  content: string;
}

export const MESSAGE_EXAMPLES: MessageExample[] = [
  {
    id: 'bank-otp',
    label: 'Giả danh ngân hàng & OTP',
    scenarioType: 'Tình huống giả định',
    content:
      'THÔNG BÁO KHẨN: Tài khoản ngân hàng của bạn vừa phát sinh giao dịch bất thường và sẽ bị tạm khóa trong vòng 15 phút. Vui lòng truy cập đường dẫn http://xacminh-nganhang.example/khoa-the và gửi lại mã OTP xác nhận cho nhân viên hỗ trợ để hủy giao dịch ngay lập tức.',
  },
  {
    id: 'recruitment-task',
    label: 'Tuyển dụng việc nhẹ lương cao',
    scenarioType: 'Tình huống giả định',
    content:
      'Tuyển cộng tác viên online làm việc tại nhà, chỉ cần lướt điện thoại 30 phút mỗi ngày kiếm thu nhập từ 600k đến 1.500.000đ/ngày, không cần kinh nghiệm. Tham gia nhóm Telegram hướng dẫn làm nhiệm vụ chốt đơn hàng nhận hoa hồng ngay sau 5 phút.',
  },
  {
    id: 'investment-profit',
    label: 'Đầu tư cam kết lợi nhuận',
    scenarioType: 'Tình huống giả định',
    content:
      'Chào bạn, nhóm chuyên gia bên mình đang mở kèo 1-1 trên sàn giao dịch quốc tế, cam kết lợi nhuận 35%/tháng và bảo đảm không rủi ro, bao vốn hoàn toàn. Bạn chỉ cần nạp tiền kích hoạt tài khoản từ 2 triệu đồng để thầy đọc lệnh mỗi tối.',
  },
  {
    id: 'prize-fee',
    label: 'Trúng thưởng yêu cầu đóng phí',
    scenarioType: 'Tình huống giả định',
    content:
      'Chúc mừng quý khách đã trúng thưởng giải đặc biệt tri ân gồm 1 điện thoại đời mới và 20 triệu đồng tiền mặt. Để hoàn tất nhận quà, quý khách vui lòng đóng trước khoản phí hồ sơ và thuế thu nhập 850.000đ trong hôm nay qua tài khoản hướng dẫn.',
  },
  {
    id: 'police-impersonation',
    label: 'Giả danh cơ quan công an',
    scenarioType: 'Tình huống giả định',
    content:
      'Thông báo từ cán bộ công an Cục Cảnh sát điều tra: Số căn cước của bạn có liên quan đến đường dây rửa tiền và đang có lệnh khởi tố, phong tỏa tài khoản. Yêu cầu bạn cài đặt ứng dụng định danh tại tep-capnhat.example/vneid.apk và chuyển tiền chứng minh trong sạch ngay.',
  },
  {
    id: 'legitimate-notice',
    label: 'Tin nhắn thông báo hợp lệ',
    scenarioType: 'Ví dụ tham khảo an toàn',
    content:
      'Thông báo từ Phòng Đào tạo: Lịch sinh hoạt công dân đầu khóa sẽ diễn ra vào 08:30 ngày 15/09/2026 tại Giảng đường A. Sinh viên mang theo thẻ sinh viên để điểm danh. Lưu ý: Nhà trường và ngân hàng liên kết không bao giờ yêu cầu sinh viên cung cấp mã OTP hoặc mật khẩu qua tin nhắn.',
  },
];
