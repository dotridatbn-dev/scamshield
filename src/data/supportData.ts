export interface SupportScenario {
  id: string;
  title: string;
  urgencyLabel: string;
  summary: string;
  immediateSteps: string[];
  followUpSteps: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface VerifiedChannel {
  name: string;
  description: string;
  contact: string;
  href?: string;
}

export const SUPPORT_SCENARIOS: SupportScenario[] = [
  {
    id: 'clicked-link',
    title: 'Tôi đã bấm vào đường dẫn đáng ngờ',
    urgencyLabel: 'Ưu tiên ngắt kết nối và kiểm tra thiết bị',
    summary:
      'Nếu bạn mới chỉ bấm vào đường dẫn mà chưa nhập mật khẩu, mã OTP hay tải tệp cài đặt, nguy cơ vẫn có thể kiểm soát được nếu xử lý kịp thời.',
    immediateSteps: [
      'Đóng ngay tab trình duyệt chứa đường dẫn đáng ngờ và không điền thêm bất kỳ thông tin nào.',
      'Nếu trình duyệt tự động tải xuống tệp lạ (đặc biệt là tệp .apk trên Android), không mở tệp và xóa ngay khỏi thư mục Tải xuống.',
      'Ngắt kết nối mạng (Wi-Fi / 4G) tạm thời nếu nghi ngờ thiết bị vừa cài ứng dụng không rõ nguồn gốc.',
    ],
    followUpSteps: [
      'Kiểm tra danh sách ứng dụng đã cài trên điện thoại và gỡ bỏ ứng dụng lạ vừa xuất hiện.',
      'Theo dõi biến động số dư và nhật ký đăng nhập các tài khoản quan trọng trong vài ngày tiếp theo.',
    ],
  },
  {
    id: 'shared-otp-password',
    title: 'Tôi đã cung cấp OTP hoặc mật khẩu',
    urgencyLabel: 'Hành động khẩn cấp ngay lập tức',
    summary:
      'Mã OTP và mật khẩu là chìa khóa trực tiếp vào tài khoản ngân hàng hoặc ví điện tử. Thời gian xử lý càng nhanh càng giúp giảm thiểu rủi ro mất tiền.',
    immediateSteps: [
      'Gọi ngay số tổng đài chính thức của ngân hàng (lấy từ website chính thức hoặc mặt sau thẻ vật lý) để yêu cầu khóa khẩn cấp tài khoản, thẻ và dịch vụ ngân hàng điện tử.',
      'Nếu vẫn đăng nhập được vào ứng dụng ngân hàng chính thức, tự khóa thẻ tạm thời và đổi mật khẩu ngay lập tức.',
      'Đổi mật khẩu cho email chính và các tài khoản khác nếu bạn có thói quen dùng chung mật khẩu.',
    ],
    followUpSteps: [
      'Kiểm tra lịch sử giao dịch và sao kê để phát hiện các giao dịch phát sinh ngoài ý muốn.',
      'Bật xác thực hai yếu tố (2FA) và kiểm tra thiết bị lạ đang đăng nhập trong phần cài đặt bảo mật.',
    ],
  },
  {
    id: 'shared-bank-info',
    title: 'Tôi đã cung cấp thông tin ngân hàng hoặc ảnh CCCD',
    urgencyLabel: 'Cần khóa thẻ và bảo vệ danh tính',
    summary:
      'Thông tin số thẻ, mã CVV/CVC, ngày hết hạn hoặc ảnh chụp hai mặt CCCD có thể bị lợi dụng để thanh toán trực tuyến hoặc đăng ký dịch vụ mạo danh.',
    immediateSteps: [
      'Liên hệ ngân hàng qua tổng đài chính thức để khóa hoặc thay thế thẻ đã lộ thông tin (đặc biệt nếu đã lộ số thẻ và mã CVV mặt sau).',
      'Tắt tính năng thanh toán trực tuyến quốc tế hoặc hạ hạn mức giao dịch trong ứng dụng ngân hàng.',
      'Lưu lại toàn bộ đoạn chat và số điện thoại/tài khoản của người đã thu thập thông tin của bạn.',
    ],
    followUpSteps: [
      'Cảnh giác cao độ nếu thời gian sau có người gọi điện báo nợ xấu hoặc nhắc khoản vay bạn không hề đăng ký.',
      'Nếu nghi ngờ danh tính bị lạm dụng mở tài khoản hoặc vay vốn trái phép, trình báo cơ quan công an địa phương để được hướng dẫn xác minh.',
    ],
  },
  {
    id: 'transferred-money',
    title: 'Tôi đã chuyển tiền cho đối tượng đáng ngờ',
    urgencyLabel: 'Liên hệ ngân hàng và lưu giữ bằng chứng',
    summary:
      'Dù giao dịch chuyển khoản nhanh thường hoàn tất ngay, việc liên hệ ngân hàng sớm và lưu đầy đủ chứng cứ là bước bắt buộc để phục vụ trình báo.',
    immediateSteps: [
      'Gọi ngay tổng đài chính thức của ngân hàng chuyển tiền và ngân hàng nhận (nếu biết) để thông báo giao dịch nghi ngờ lừa đảo và hỏi quy trình hỗ trợ tra soát.',
      'Chụp màn hình biên lai chuyển khoản, sao kê, số tài khoản nhận, nội dung tin nhắn, số điện thoại và đường dẫn liên quan.',
      'Ngừng chuyển thêm bất kỳ khoản tiền nào khác dù đối tượng dọa mất tiền cũ hoặc hứa "chuyển thêm để mở khóa rút vốn".',
    ],
    followUpSteps: [
      'Mang toàn bộ hồ sơ bằng chứng đến cơ quan công an cấp xã/phường nơi cư trú hoặc cơ quan công an gần nhất để trình báo.',
      'Tuyệt đối cảnh giác với các quảng cáo "lấy lại tiền bị lừa đảo" thu phí trước trên mạng xã hội.',
    ],
  },
  {
    id: 'lost-social-account',
    title: 'Tôi bị mất tài khoản mạng xã hội',
    urgencyLabel: 'Cảnh báo người thân và khôi phục quyền truy cập',
    summary:
      'Kẻ gian chiếm tài khoản Facebook, Zalo hoặc Telegram thường nhắn tin ngay cho danh bạ của bạn để hỏi vay tiền hoặc gửi link lừa đảo.',
    immediateSteps: [
      'Nhờ người thân, bạn bè thông báo rộng rãi (qua SMS, gọi điện trực tiếp hoặc nhóm lớp/gia đình) rằng tài khoản của bạn đã bị chiếm quyền và tuyệt đối không chuyển tiền.',
      'Sử dụng chức năng khôi phục tài khoản chính thức của nền tảng (Facebook, Zalo, Google) và đăng xuất khỏi toàn bộ thiết bị lạ.',
      'Kiểm tra email liên kết tài khoản mạng xã hội xem có bị đổi mật khẩu hay thiết lập chuyển tiếp email lạ không.',
    ],
    followUpSteps: [
      'Sau khi lấy lại tài khoản, đổi mật khẩu mạnh duy nhất và bật xác thực hai yếu tố (2FA) bằng ứng dụng xác thực.',
      'Kiểm tra mục tin nhắn đã gửi để biết những ai có thể đã nhận tin nhắn mạo danh từ tài khoản của bạn.',
    ],
  },
  {
    id: 'blackmail-threats',
    title: 'Tôi bị đe dọa hoặc tống tiền',
    urgencyLabel: 'Không thỏa hiệp và tìm sự trợ giúp ngay',
    summary:
      'Đối tượng tống tiền (đe dọa tung hình ảnh nhạy cảm, ghép ảnh hoặc dọa khởi tố) thường lợi dụng nỗi sợ hãi để ép nạn nhân chuyển tiền nhiều lần không dứt.',
    immediateSteps: [
      'Không chuyển tiền theo yêu cầu của kẻ đe dọa vì việc đáp ứng yêu cầu đầu tiên thường dẫn đến các lần đòi tiền tiếp theo.',
      'Lưu giữ toàn bộ tin nhắn, số điện thoại, tài khoản mạng xã hội và lịch sử cuộc gọi làm bằng chứng trước khi chặn liên hệ.',
      'Chia sẻ ngay với người thân đáng tin cậy, cố vấn học tập (nếu là sinh viên) hoặc người hỗ trợ tâm lý để không phải đối mặt một mình.',
    ],
    followUpSteps: [
      'Trình báo trực tiếp với cơ quan công an địa phương kèm theo các bằng chứng đã lưu.',
      'Rà soát lại quyền riêng tư trên mạng xã hội để hạn chế người lạ xem danh sách bạn bè và thông tin cá nhân.',
    ],
  },
  {
    id: 'report-scam',
    title: 'Tôi muốn báo cáo lừa đảo hoặc tin nhắn rác',
    urgencyLabel: 'Gửi thông tin tới kênh tiếp nhận chính thức',
    summary:
      'ScamShield không thu thập hồ sơ tố giác thay cho cơ quan chức năng. Bạn hãy gửi phản ánh trực tiếp tới các kênh chính thức dưới đây để được tiếp nhận đúng thẩm quyền.',
    immediateSteps: [
      'Chuẩn bị sẵn ảnh chụp màn hình nội dung tin nhắn, số điện thoại gọi đến, đường dẫn hoặc biên lai chuyển khoản (nếu có thiệt hại tài chính).',
      'Với cuộc gọi hoặc tin nhắn rác/lừa đảo: phản ánh qua đầu số 156 hoặc cổng tiếp nhận của Bộ Thông tin và Truyền thông (cũ)/cơ quan quản lý viễn thông.',
      'Với vụ việc chiếm đoạt tài sản hoặc đe dọa: trình báo trực tiếp tại công an phường/xã nơi cư trú để lập hồ sơ theo quy định pháp luật.',
    ],
    followUpSteps: [
      'Chia sẻ cảnh báo chung (đã che thông tin cá nhân của bạn) cho người thân và bạn bè để tránh thêm người bị hại.',
    ],
  },
];

export const VERIFIED_REPORTING_CHANNELS: VerifiedChannel[] = [
  {
    name: 'Đầu số phản ánh cuộc gọi, tin nhắn rác và lừa đảo 156',
    description:
      'Đầu số tiếp nhận phản ánh cuộc gọi rác, cuộc gọi có dấu hiệu lừa đảo qua gọi điện miễn phí hoặc nhắn tin theo cú pháp hướng dẫn của nhà mạng.',
    contact: 'Gọi 156 hoặc nhắn tin tới 156 (miễn phí)',
  },
  {
    name: 'Tổng đài Cảnh sát phản ứng nhanh 113',
    description:
      'Đường dây khẩn cấp của lực lượng Công an nhân dân khi xảy ra tình huống khẩn cấp, đe dọa an toàn hoặc cần trình báo sự việc nghiêm trọng.',
    contact: 'Gọi 113 hoặc liên hệ Công an xã/phường gần nhất',
  },
  {
    name: 'Cổng Cảnh báo An toàn thông tin Việt Nam (NCSC)',
    description:
      'Kênh cảnh báo và phản ánh đường dẫn lừa đảo; trạng thái truy cập hiện tại chưa được kiểm chứng.',
    contact: 'canhbao.ncsc.gov.vn',
    href: 'https://canhbao.ncsc.gov.vn',
  },
  {
    name: 'Hệ thống tiếp nhận phản ánh tin nhắn, cuộc gọi rác',
    description:
      'Kênh phản ánh tin nhắn, thư điện tử và cuộc gọi rác; trạng thái truy cập hiện tại chưa được kiểm chứng.',
    contact: 'chongthurac.vn',
    href: 'https://chongthurac.vn',
  },
];

export const SUPPORT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'ScamShield có lưu trữ tin nhắn, số điện thoại hoặc số tài khoản tôi nhập vào không?',
    answer:
      'Không. Toàn bộ quá trình phân tích tin nhắn, kiểm tra cấu trúc đường dẫn, chuẩn hóa số điện thoại và danh sách kiểm tra ngân hàng đều diễn ra trực tiếp trên trình duyệt của bạn. ScamShield không sử dụng máy chủ lưu trữ, không có cơ sở dữ liệu lịch sử tra cứu và không gửi nội dung bạn nhập ra bên ngoài.',
  },
  {
    id: 'faq-2',
    question: 'Nếu kết quả báo "Ít dấu hiệu rủi ro" thì có chắc chắn 100% là an toàn không?',
    answer:
      'Không. Không có công cụ tự động nào có thể khẳng định một thông tin là an toàn tuyệt đối. Kết quả phân tích của ScamShield dựa trên bộ quy tắc nhận diện dấu hiệu phổ biến để hỗ trợ bạn tham khảo, không thay thế việc tự kiểm chứng độc lập qua kênh chính thức.',
  },
  {
    id: 'faq-3',
    question: 'Tại sao ScamShield không tự động mở đường dẫn tôi nhập vào để kiểm tra nội dung trang web?',
    answer:
      'Việc tự động truy cập hoặc tải nội dung từ một đường dẫn lạ có thể làm phát tán mã độc, lộ địa chỉ mạng hoặc kích hoạt bẫy chuyển hướng. Vì vậy, ScamShield chỉ phân tích cấu trúc văn bản của đường dẫn ngay trong trình duyệt và luôn hiển thị đường dẫn dưới dạng chữ thuần.',
  },
  {
    id: 'faq-4',
    question: 'Công cụ tra cứu số điện thoại và tài khoản ngân hàng có kết nối dữ liệu báo cáo lừa đảo trực tiếp không?',
    answer:
      'Chưa. Ở phiên bản MVP 1.0 này, ScamShield chưa kết nối với cơ sở dữ liệu số điện thoại hay tài khoản ngân hàng lừa đảo theo thời gian thực. Công cụ giúp bạn chuẩn hóa định dạng, che một phần số tài khoản và thực hiện quy trình tự kiểm chứng trước khi giao dịch.',
  },
  {
    id: 'faq-5',
    question: 'Tôi vừa lỡ chuyển tiền cho kẻ lừa đảo, có nên thuê dịch vụ "thu hồi tiền treo" trên mạng xã hội không?',
    answer:
      'Tuyệt đối không. Các trang hoặc cá nhân quảng cáo có thể lấy lại tiền bị lừa nhưng yêu cầu bạn chuyển trước phí kỹ thuật, phí luật sư hoặc tiền đối ứng thường chính là bẫy lừa đảo thứ cấp nhằm chiếm đoạt thêm tài sản của bạn.',
  },
  {
    id: 'faq-6',
    question: 'Tin nhắn cảnh báo bảo mật thực sự từ ngân hàng có bị ScamShield đánh nhầm là lừa đảo không?',
    answer:
      'Bộ quy tắc của ScamShield xét ngữ cảnh kết hợp nhiều yếu tố chứ không chỉ dựa vào một từ khóa đơn lẻ. Ví dụ, câu nhắc nhở như "Không cung cấp mã OTP cho người lạ" được nhận diện là thông điệp cảnh báo an toàn thay vì tự động xếp vào nguy cơ cao.',
  },
  {
    id: 'faq-7',
    question: 'Vì sao tôi không thấy chức năng đăng ký tài khoản hay đăng nhập trên ScamShield?',
    answer:
      'ScamShield được thiết kế theo nguyên tắc miễn phí, dễ tiếp cận và bảo vệ quyền riêng tư tối đa. Bạn có thể sử dụng ngay toàn bộ công cụ kiểm tra, thư viện kiến thức và bài trắc nghiệm mà không cần tạo tài khoản hay cung cấp email, số điện thoại.',
  },
  {
    id: 'faq-8',
    question: 'Tôi có thể dùng ScamShield trên điện thoại hoặc chia sẻ cho người lớn tuổi trong gia đình không?',
    answer:
      'Có. Giao diện ScamShield tương thích với trình duyệt trên điện thoại Android, iPhone, máy tính bảng và máy tính cá nhân. Bạn có thể bấm nút "Chia sẻ ScamShield" để sao chép liên kết hoặc tải mã QR gửi cho gia đình, bạn bè và thầy cô.',
  },
];
