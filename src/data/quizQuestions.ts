export interface QuizQuestion {
  id: number;
  topic: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedArticleSlug: string;
}

export interface QuizResultTier {
  minScore: number;
  maxScore: number;
  title: string;
  summary: string;
  advice: string;
}

export const QUIZ_RESULT_TIERS: QuizResultTier[] = [
  {
    minScore: 13,
    maxScore: 15,
    title: 'Kiến thức an toàn số tốt',
    summary:
      'Bạn nhận diện tốt phần lớn các dấu hiệu giả mạo, thao túng tâm lý và rủi ro bảo mật phổ biến.',
    advice:
      'Hãy tiếp tục duy trì thói quen kiểm chứng độc lập trước mỗi giao dịch và chia sẻ kiến thức này với người thân trong gia đình. Lưu ý rằng điểm số trắc nghiệm không đảm bảo phòng tránh tuyệt đối mọi thủ đoạn mới ngoài thực tế.',
  },
  {
    minScore: 10,
    maxScore: 12,
    title: 'Nắm được phần lớn kiến thức cơ bản',
    summary:
      'Bạn đã có nền tảng phòng tránh lừa đảo khá vững, nhưng vẫn có thể bị bất ngờ trước một số kịch bản tinh vi hơn.',
    advice:
      'Hãy xem lại các câu trả lời chưa chính xác và đọc thêm bài viết về giả mạo Deepfake, mã QR hoặc tuyển dụng trực tuyến để hoàn thiện kỹ năng.',
  },
  {
    minScore: 6,
    maxScore: 9,
    title: 'Cần bổ sung kiến thức',
    summary:
      'Bạn nhận ra một số dấu hiệu quen thuộc nhưng dễ bị thuyết phục khi kẻ gian tạo áp lực thời gian hoặc giả danh cơ quan uy tín.',
    advice:
      'Bạn nên đọc kỹ các bài hướng dẫn trong Thư viện kiến thức và thực hành nguyên tắc "chậm lại 5 phút để kiểm chứng" trước mọi yêu cầu chuyển tiền hay cung cấp OTP.',
  },
  {
    minScore: 0,
    maxScore: 5,
    title: 'Nên tìm hiểu thêm về phòng tránh lừa đảo',
    summary:
      'Bạn có nguy cơ cao trước các kịch bản lừa đảo trực tuyến nếu gặp phải tình huống giả danh hoặc dụ dỗ lợi nhuận cao.',
    advice:
      'Hãy dành thời gian đọc các bài viết cơ bản về bảo vệ mã OTP, nhận diện tin nhắn giả mạo và trao đổi với người thân đáng tin cậy khi gặp yêu cầu tài chính bất thường.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Bảo vệ mã OTP & ngân hàng',
    scenario:
      'Một người tự xưng là nhân viên ngân hàng gọi điện báo tài khoản của bạn vừa phát sinh phí dịch vụ 1.200.000đ mỗi tháng và đề nghị bạn đọc mã OTP vừa gửi về điện thoại để hỗ trợ hủy ngay. Bạn nên làm gì?',
    options: [
      'Đọc mã OTP nhanh để kịp hủy trước khi bị trừ tiền',
      'Từ chối cung cấp mã OTP, tắt máy và tự kiểm tra trực tiếp trên ứng dụng ngân hàng chính thức hoặc gọi tổng đài in trên thẻ',
      'Chỉ đọc một nửa mã OTP để kiểm tra xem người gọi có phải nhân viên thật không',
      'Chuyển toàn bộ tiền sang một tài khoản khác theo hướng dẫn của người gọi',
    ],
    correctIndex: 1,
    explanation:
      'Ngân hàng không bao giờ gọi điện yêu cầu khách hàng đọc mã OTP, mật khẩu hay mã PIN để hủy dịch vụ. Khi có nghi ngờ, hãy chủ động cúp máy và liên hệ qua ứng dụng hoặc số tổng đài chính thức của ngân hàng.',
    relatedArticleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
  },
  {
    id: 2,
    topic: 'Tuyển dụng việc nhẹ lương cao',
    scenario:
      'Bạn thấy tin tuyển cộng tác viên đánh giá sản phẩm tại nhà với thu nhập 700.000đ/ngày. Sau hai nhiệm vụ đầu được hoàn tiền nhỏ, nhóm chat yêu cầu bạn chuyển 3.000.000đ để "nâng cấp đơn hàng VIP" mới rút được hoa hồng. Đây là dấu hiệu gì?',
    options: [
      'Quy trình ký quỹ bình thường của các sàn thương mại điện tử lớn',
      'Thủ đoạn lừa đảo làm nhiệm vụ online: trả thưởng nhỏ tạo lòng tin rồi chiếm đoạt khoản nạp lớn',
      'Chính sách bảo hiểm đơn hàng cho người mới làm việc',
      'Lỗi hệ thống thanh toán cần chuyển thêm một lần nữa để tự động hoàn tiền',
    ],
    correctIndex: 1,
    explanation:
      'Đây là kịch bản kinh điển của lừa đảo nhiệm vụ online. Kẻ gian cho nạn nhân nhận lợi nhuận nhỏ ở những lượt đầu rồi liên tục đưa ra lý do lỗi hệ thống hoặc nâng cấp đơn để dụ nạp số tiền ngày càng lớn.',
    relatedArticleSlug: 'lua-dao-tuyen-dung-viec-nhe-luong-cao',
  },
  {
    id: 3,
    topic: 'Đường dẫn giả mạo & HTTPS',
    scenario:
      'Khi kiểm tra một đường dẫn nhận qua SMS, bạn thấy địa chỉ bắt đầu bằng "https://" và có biểu tượng ổ khóa trên trình duyệt. Điều này có ý nghĩa gì?',
    options: [
      'Trang web chắc chắn thuộc về cơ quan nhà nước hoặc ngân hàng uy tín',
      'Trang web đã được kiểm duyệt không chứa mã độc hoặc lừa đảo',
      'Kết nối giữa trình duyệt và máy chủ được mã hóa, nhưng trang web vẫn có thể là trang giả mạo',
      'Bạn có thể yên tâm nhập mật khẩu và số thẻ ngân hàng ngay lập tức',
    ],
    correctIndex: 2,
    explanation:
      'HTTPS chỉ xác nhận dữ liệu truyền đi được mã hóa. Kẻ lừa đảo hoàn toàn có thể đăng ký chứng chỉ HTTPS cho tên miền giả mạo, vì vậy bạn luôn phải kiểm tra kỹ tên miền gốc thực sự.',
    relatedArticleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
  },
  {
    id: 4,
    topic: 'Giả danh cơ quan nhà nước',
    scenario:
      'Một cuộc gọi xưng là cán bộ công an thông báo bạn liên quan đến vụ án rửa tiền, yêu cầu giữ bí mật tuyệt đối với gia đình và cài ứng dụng qua tệp ".apk" để "khai báo trực tuyến". Bạn xử lý thế nào?',
    options: [
      'Làm theo vì người gọi đọc đúng họ tên và số căn cước của mình',
      'Cài thử ứng dụng xem giao diện có giống cổng dịch vụ công không',
      'Ngắt cuộc gọi ngay, không cài tệp lạ và liên hệ trực tiếp công an xã/phường nơi cư trú để xác minh nếu cần',
      'Chuyển tiền vào tài khoản chỉ định để chứng minh mình vô tội',
    ],
    correctIndex: 2,
    explanation:
      'Cơ quan công an không làm việc qua cuộc gọi đe dọa, không yêu cầu giữ bí mật với người thân, không yêu cầu chuyển tiền "chứng minh trong sạch" và không gửi tệp .apk ngoài kho ứng dụng chính thống.',
    relatedArticleSlug: 'gia-danh-cong-an-va-co-quan-nha-nuoc',
  },
  {
    id: 5,
    topic: 'Lừa đảo nhắm vào sinh viên',
    scenario:
      'Tân sinh viên nhận được tin nhắn tự xưng cán bộ phòng công tác sinh viên thông báo trúng học bổng khuyến khích và yêu cầu chuyển khoản trước 500.000đ "phí xét duyệt hồ sơ" vào tài khoản cá nhân trước 17:00 hôm nay. Nhận định nào đúng nhất?',
    options: [
      'Nên chuyển gấp vì sắp hết hạn nộp hồ sơ học bổng',
      'Đây là dấu hiệu lừa đảo: học bổng chính thức của nhà trường không thu phí xét duyệt vào tài khoản cá nhân',
      'Chuyển một nửa trước để giữ suất rồi hỏi lại cố vấn học tập sau',
      'Gửi ảnh CCCD và thẻ sinh viên qua chat để nhờ kiểm tra giúp',
    ],
    correctIndex: 1,
    explanation:
      'Các trường đại học và tổ chức cấp học bổng chính thống không yêu cầu sinh viên nộp phí giữ suất hay phí xét duyệt qua tài khoản cá nhân. Sinh viên cần kiểm tra thông báo trên cổng thông tin chính thức hoặc liên hệ trực tiếp văn phòng khoa.',
    relatedArticleSlug: 'lua-dao-nham-vao-hoc-sinh-sinh-vien',
  },
  {
    id: 6,
    topic: 'Công nghệ Deepfake',
    scenario:
      'Tài khoản mạng xã hội của một người bạn nhắn tin hỏi mượn 5.000.000đ. Khi bạn yêu cầu gọi video để kiểm chứng, cuộc gọi hiện khuôn mặt giống hệt bạn mình trong 4 giây với âm thanh hơi rè rồi tắt máy vì "mạng yếu" và giục chuyển khoản gấp. Bạn nên làm gì?',
    options: [
      'Chuyển tiền vì đã nhìn thấy đúng khuôn mặt bạn mình qua video',
      'Chuyển trước một phần để giúp bạn lúc khẩn cấp',
      'Gọi trực tiếp bằng số điện thoại di động quen thuộc hoặc đặt câu hỏi riêng tư mà chỉ hai người biết',
      'Nhắn tin lại qua chính tài khoản mạng xã hội đó để hỏi lại',
    ],
    correctIndex: 2,
    explanation:
      'Kẻ gian có thể chiếm tài khoản mạng xã hội và ghép video Deepfake ngắn kèm lý do mạng yếu để đánh lừa nạn nhân. Luôn gọi lại bằng số điện thoại thường dùng hoặc xác nhận qua một kênh độc lập khác.',
    relatedArticleSlug: 'lua-dao-bang-cong-nghe-deepfake',
  },
  {
    id: 7,
    topic: 'Lừa đảo qua mã QR',
    scenario:
      'Ở một bảng tin công cộng hoặc trên tin nhắn lạ có dán một mã QR ghi "Quét để nhận hỗ trợ / xem hóa đơn điện tử". Khi quét mã, trình duyệt mở ra trang yêu cầu nhập mật khẩu tài khoản ngân hàng. Bạn nên làm gì?',
    options: [
      'Đóng ngay trang web, không nhập bất kỳ thông tin cá nhân hay tài khoản nào',
      'Nhập thử thông tin để xem có đúng hóa đơn của mình hay không',
      'Lưu mã QR lại và gửi cho người khác quét thử giúp',
      'Cài ứng dụng được gợi ý trên trang vừa mở',
    ],
    correctIndex: 0,
    explanation:
      'Mã QR chỉ là cách mã hóa đường dẫn hoặc dữ liệu văn bản, bản thân nó có thể bị dán đè hoặc dẫn tới trang web giả mạo. Luôn kiểm tra tên miền hiển thị sau khi quét và thoát ngay nếu thấy yêu cầu đăng nhập bất thường.',
    relatedArticleSlug: 'lua-dao-thong-qua-ma-qr',
  },
  {
    id: 8,
    topic: 'Đầu tư tài chính',
    scenario:
      'Một nhóm chat đầu tư khẳng định có "thuật toán nội bộ" cam kết lãi suất cố định 25% mỗi tháng, không bao giờ thua lỗ và thúc giục bạn vay thêm tiền để kịp vòng vốn. Dấu hiệu nào cảnh báo rủi ro cao nhất?',
    options: [
      'Nhóm có nhiều ảnh chụp màn hình số dư lợi nhuận cao',
      'Cam kết lợi nhuận cố định cao bất thường, khẳng định không rủi ro và thúc giục vay tiền đầu tư',
      'Nhóm hoạt động sôi nổi vào buổi tối',
      'Có người tự xưng từng làm việc tại nước ngoài',
    ],
    correctIndex: 1,
    explanation:
      'Mọi hình thức đầu tư hợp pháp đều đi kèm rủi ro và không thể cam kết mức sinh lời cố định cao phi lý như vậy. Ảnh chụp lợi nhuận trong các nhóm chat rất dễ bị dàn dựng.',
    relatedArticleSlug: 'lua-dao-dau-tu-tai-chinh',
  },
  {
    id: 9,
    topic: 'Lừa đảo giao hàng',
    scenario:
      'Một người gọi điện tự xưng nhân viên giao hàng báo bạn có đơn hàng giá trị 350.000đ cần chuyển khoản thanh toán trước mới giao hoặc bấm vào link để "hủy gói hội viên shipper". Nhưng bạn nhớ mình không đặt đơn nào. Cách xử lý đúng là gì?',
    options: [
      'Chuyển khoản trước để nhận hàng rồi tính sau',
      'Bấm vào link hủy hội viên để tránh bị trừ tiền định kỳ',
      'Không chuyển khoản, không bấm vào link lạ; kiểm tra lại lịch sử đơn hàng trực tiếp trên ứng dụng mua sắm chính thức',
      'Đọc địa chỉ nhà và thông tin CCCD cho người gọi đối chiếu',
    ],
    correctIndex: 2,
    explanation:
      'Kẻ gian thường giả danh shipper yêu cầu chuyển khoản trước cho đơn hàng không có thật hoặc gửi link giả mạo để đánh cắp tài khoản với cớ hủy thẻ hội viên.',
    relatedArticleSlug: 'lua-dao-giao-hang',
  },
  {
    id: 10,
    topic: 'Mua bán trực tuyến & thuê trọ',
    scenario:
      'Khi tìm phòng trọ qua mạng, chủ bài đăng báo có rất nhiều người đang hỏi thuê và yêu cầu bạn chuyển trước 1.000.000đ tiền "cọc giữ phòng" trước khi cho xem phòng trực tiếp. Bạn nên làm gì?',
    options: [
      'Chuyển cọc ngay vì sợ mất phòng giá rẻ',
      'Từ chối chuyển cọc khi chưa trực tiếp xem phòng, kiểm tra giấy tờ hợp lệ và ký xác nhận rõ ràng',
      'Gửi ảnh CCCD thay cho tiền đặt cọc',
      'Nhờ người bán quay một đoạn video ngắn rồi chuyển khoản luôn',
    ],
    correctIndex: 1,
    explanation:
      'Chiêu trò phòng trọ đẹp giá rẻ rồi thúc ép đặt cọc giữ chỗ trước khi xem phòng là bẫy lừa đảo rất phổ biến nhắm vào sinh viên và người đi làm xa quê.',
    relatedArticleSlug: 'lua-dao-mua-ban-truc-tuyen',
  },
  {
    id: 11,
    topic: 'Lừa đảo tình cảm (Romance Scam)',
    scenario:
      'Một người quen qua mạng xã hội nói đang ở nước ngoài, thường xuyên trò chuyện tình cảm và báo đã gửi về Việt Nam một kiện hàng chứa quà giá trị lớn, nhưng hải quan yêu cầu bạn đóng phí thông quan 15.000.000đ mới nhận được. Bạn nên đánh giá thế nào?',
    options: [
      'Đóng phí vì người đó hứa sẽ gửi bù lại gấp đôi khi gặp mặt',
      'Đây là dấu hiệu đặc trưng của lừa đảo tình cảm kết hợp đóng phí nhận quà',
      'Xin số tài khoản của nhân viên hải quan qua tin nhắn để chuyển trước một nửa',
      'Gửi ảnh sao kê ngân hàng để chứng minh tài chính',
    ],
    correctIndex: 1,
    explanation:
      'Thủ đoạn xây dựng mối quan hệ tình cảm trực tuyến rồi bịa ra kiện hàng mắc kẹt tại sân bay hoặc hải quan để yêu cầu nạn nhân đóng phí là kịch bản lừa đảo tình cảm phổ biến.',
    relatedArticleSlug: 'lua-dao-tinh-cam',
  },
  {
    id: 12,
    topic: 'Chiếm đoạt tài khoản mạng xã hội',
    scenario:
      'Một người bạn gửi cho bạn một đường dẫn bình chọn cuộc thi ảnh hoặc nhận tài liệu học tập, yêu cầu bạn đăng nhập lại tài khoản Facebook/Google trên trang đó để xác nhận. Bạn nên làm gì?',
    options: [
      'Đăng nhập ngay để ủng hộ bạn bè',
      'Kiểm tra kỹ tên miền của trang; nếu không phải tên miền chính thức của Facebook/Google thì thoát ngay và cảnh báo bạn mình có thể đã bị mất tài khoản',
      'Nhập mật khẩu phụ rồi xem chuyện gì xảy ra',
      'Tắt xác thực hai yếu tố (2FA) để đăng nhập cho nhanh',
    ],
    correctIndex: 1,
    explanation:
      'Nhiều chiến dịch đánh cắp tài khoản mạng xã hội dùng trang đăng nhập giả mạo dưới danh nghĩa bình chọn hoặc tải tài liệu. Bật xác thực hai yếu tố (2FA) và kiểm tra tên miền giúp ngăn chặn việc mất quyền kiểm soát tài khoản.',
    relatedArticleSlug: 'lua-dao-chiem-doat-tai-khoan-mang-xa-hoi',
  },
  {
    id: 13,
    topic: 'Trúng thưởng & tri ân',
    scenario:
      'Một tin nhắn thông báo bạn trúng giải thưởng giá trị lớn dù bạn chưa từng tham gia chương trình quay số nào, kèm yêu cầu thanh toán "phí vận chuyển và thuế" trước khi trao thưởng. Điều nào sau đây đúng?',
    options: [
      'Các chương trình uy tín luôn yêu cầu chuyển tiền thuế vào tài khoản cá nhân trước khi nhận quà',
      'Đây là dấu hiệu lừa đảo trúng thưởng; không chuyển bất kỳ khoản phí nào cho giải thưởng không rõ nguồn gốc',
      'Nếu tin nhắn có kèm logo thương hiệu lớn thì chắc chắn là thật',
      'Nên gọi vào số điện thoại lạ trong tin nhắn để thương lượng giảm phí',
    ],
    correctIndex: 1,
    explanation:
      'Thông báo trúng thưởng bất ngờ kèm yêu cầu nộp phí trước qua chuyển khoản cá nhân là dấu hiệu lừa đảo rõ ràng. Logo và hình ảnh thương hiệu rất dễ bị sao chép.',
    relatedArticleSlug: 'lua-dao-trung-thuong',
  },
  {
    id: 14,
    topic: 'Xử lý sau khi lỡ bấm link hoặc lộ OTP',
    scenario:
      'Nếu bạn lỡ nhập thông tin thẻ ngân hàng hoặc mã OTP vào một trang web nghi ngờ lừa đảo, hành động ưu tiên hàng đầu ngay lúc đó là gì?',
    options: [
      'Chờ đến ngày hôm sau xem tài khoản có bị trừ tiền không',
      'Liên hệ ngay tổng đài chính thức của ngân hàng hoặc dùng app chính thức để khóa thẻ/khóa tài khoản khẩn cấp và đổi mật khẩu',
      'Tìm dịch vụ "lấy lại tiền lừa đảo" trên mạng xã hội và đóng phí nhờ hỗ trợ',
      'Xóa toàn bộ lịch sử trình duyệt và tin nhắn để tránh rắc rối',
    ],
    correctIndex: 1,
    explanation:
      'Tốc độ phản ứng giúp hạn chế thiệt hại: cần khóa thẻ/tài khoản qua kênh chính thức của ngân hàng ngay lập tức, giữ lại bằng chứng giao dịch và cảnh giác với các dịch vụ "thu hồi tiền" thu phí trước.',
    relatedArticleSlug: 'lua-dao-ngan-hang-va-danh-cap-otp',
  },
  {
    id: 15,
    topic: 'Cảnh giác với lừa đảo thứ cấp',
    scenario:
      'Sau khi bị lừa chuyển tiền, nạn nhân lên mạng tìm kiếm sự giúp đỡ và thấy một trang tự xưng "hỗ trợ thu hồi tiền treo trên hệ thống" yêu cầu đóng trước 2.000.000đ phí kỹ thuật. Đây là tình huống gì?',
    options: [
      'Dịch vụ hỗ trợ hợp pháp được cấp phép thu hồi tiền trực tuyến',
      'Lừa đảo thứ cấp (lừa đảo thu hồi tiền) nhắm vào tâm lý nóng vội muốn lấy lại tiền của nạn nhân',
      'Thủ tục hành chính bắt buộc trước khi trình báo công an',
      'Cơ chế hoàn tiền tự động của cổng thanh toán',
    ],
    correctIndex: 1,
    explanation:
      'Không có cá nhân hay dịch vụ mạng nào có thể "hack ngược" hay thu hồi tiền bằng cách thu phí trước. Nạn nhân nên trình báo trực tiếp tại cơ quan công an và làm việc với ngân hàng qua kênh chính thức.',
    relatedArticleSlug: 'gia-danh-cong-an-va-co-quan-nha-nuoc',
  },
];
