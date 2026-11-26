export interface KnowledgeArticle {
  slug: string;
  title: string;
  category: string;
  readingMinutes: number;
  summary: string;
  overview: string;
  tactics: string[];
  signs: string[];
  scenarioTitle: string;
  scenarioDescription: string;
  prevention: string[];
  responseSteps: string[];
  relatedSlugs: string[];
}

export const ARTICLE_CATEGORIES = [
  'Tất cả',
  'Tài chính & Ngân hàng',
  'Việc làm & Học đường',
  'Giả mạo & Công nghệ',
  'Mua sắm & Đời sống',
] as const;

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    slug: 'lua-dao-ngan-hang-va-danh-cap-otp',
    title: 'Lừa đảo ngân hàng và đánh cắp OTP',
    category: 'Tài chính & Ngân hàng',
    readingMinutes: 5,
    summary:
      'Hiểu rõ cách kẻ gian giả danh ngân hàng để lấy mã OTP, mật khẩu đăng nhập và cách tự bảo vệ tài khoản thanh toán.',
    overview:
      'Lừa đảo giả danh ngân hàng là hình thức kẻ xấu mạo danh nhân viên chăm sóc khách hàng, bộ phận thẻ hoặc hệ thống tự động để dẫn dụ người dùng cung cấp mã OTP, mật khẩu đăng nhập hay bấm vào trang web giả mạo. Chỉ cần một mã OTP xác nhận giao dịch hoặc liên kết ví, số tiền trong tài khoản có thể bị chuyển đi rất nhanh.',
    tactics: [
      'Gửi tin nhắn SMS giả mạo thương hiệu ngân hàng kèm đường dẫn lạ báo tài khoản sắp bị khóa hoặc cần xác thực sinh trắc học.',
      'Gọi điện tự xưng nhân viên ngân hàng báo khách hàng bị trừ phí dịch vụ hàng tháng và đề nghị đọc mã OTP để hủy.',
      'Tạo trang web có tên miền gần giống ngân hàng thật để đánh lừa người dùng nhập tên đăng nhập, mật khẩu và mã OTP.',
    ],
    signs: [
      'Tin nhắn chứa đường dẫn lạ, tên miền không trùng khớp website chính thức của ngân hàng.',
      'Người gọi yêu cầu đọc mã OTP, mã PIN, mật khẩu hoặc chụp hai mặt thẻ ngân hàng.',
      'Tạo tâm lý hoảng loạn với mốc thời gian gấp gáp như khóa tài khoản trong 15 phút hoặc mất tiền ngay lập tức.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Chị Minh nhận được tin nhắn có nội dung thông báo thẻ tín dụng vừa phát sinh giao dịch bất thường và kèm đường dẫn "xacminh-the.example". Khi bấm vào, trang web yêu cầu nhập mật khẩu ngân hàng điện tử và mã OTP gửi về điện thoại để "hủy giao dịch". Nếu làm theo, kẻ gian sẽ dùng chính mã OTP đó để thực hiện giao dịch rút tiền hoặc liên kết ví.',
    prevention: [
      'Tuyệt đối không cung cấp mã OTP, mật khẩu, mã PIN hay mã CVV cho bất kỳ ai kể cả người tự xưng nhân viên ngân hàng.',
      'Không đăng nhập tài khoản ngân hàng thông qua đường dẫn gửi trong tin nhắn, email hoặc mạng xã hội.',
      'Luôn tự mở ứng dụng ngân hàng chính thức trên điện thoại hoặc gọi số tổng đài in ở mặt sau thẻ để kiểm tra.',
    ],
    responseSteps: [
      'Gọi ngay tổng đài chính thức của ngân hàng để yêu cầu khóa thẻ và khóa tài khoản ngân hàng điện tử khẩn cấp.',
      'Đổi mật khẩu ứng dụng ngân hàng và email liên kết ngay khi còn quyền truy cập.',
      'Chụp lại tin nhắn, đường dẫn và sao kê giao dịch để trình báo cơ quan công an gần nhất nếu phát sinh mất tiền.',
    ],
    relatedSlugs: ['lua-dao-thong-qua-ma-qr', 'gia-danh-cong-an-va-co-quan-nha-nuoc'],
  },
  {
    slug: 'lua-dao-tuyen-dung-viec-nhe-luong-cao',
    title: 'Lừa đảo tuyển dụng, việc nhẹ lương cao',
    category: 'Việc làm & Học đường',
    readingMinutes: 5,
    summary:
      'Nhận diện bẫy tuyển cộng tác viên online, làm nhiệm vụ chốt đơn ảo và việc làm thêm nhắm vào sinh viên, người tìm việc.',
    overview:
      'Các lời mời làm việc tại nhà không đòi hỏi kinh nghiệm nhưng trả thu nhập cao bất thường thường nhắm vào sinh viên, người nội trợ hoặc người đang tìm việc làm thêm. Ban đầu, kẻ gian thường trả những khoản tiền nhỏ để tạo lòng tin trước khi dẫn dụ nạn nhân nạp tiền vào các nhiệm vụ giá trị lớn.',
    tactics: [
      'Đăng tin tuyển cộng tác viên nhập liệu, nghe nhạc, bấm thích video hoặc đánh giá sản phẩm với mức lương vài trăm nghìn đến hàng triệu đồng mỗi ngày.',
      'Kéo người ứng tuyển vào nhóm Telegram hoặc Zalo có nhiều tài khoản giả đóng vai đồng nghiệp khoe đã rút được tiền.',
      'Yêu cầu ứng viên chuyển khoản đặt cọc giữ chỗ, thanh toán đơn hàng ảo hoặc đóng phí làm thẻ nhân viên, phí xét duyệt hồ sơ.',
    ],
    signs: [
      'Cam kết thu nhập cao phi thực tế so với tính chất công việc rất đơn giản.',
      'Yêu cầu người tìm việc phải bỏ tiền ra trước mới được nhận việc hoặc mới rút được tiền hoa hồng.',
      'Liên hệ tuyển dụng hoàn toàn qua tài khoản mạng xã hội ẩn danh, không có hợp đồng hay địa chỉ doanh nghiệp rõ ràng.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Bạn Nam là sinh viên năm hai thấy bài đăng tuyển cộng tác viên xử lý đơn hàng online tại nhà. Ở hai đơn đầu tiên trị giá 100.000đ, Nam nhận lại đủ tiền gốc và hoa hồng 20.000đ. Đến nhiệm vụ thứ ba, nhóm hướng dẫn yêu cầu chuyển 4.000.000đ rồi lấy lý do "nhập sai cú pháp" để bắt chuyển thêm tiền mở khóa hệ thống.',
    prevention: [
      'Ghi nhớ nguyên tắc: công việc chân chính trả lương cho bạn, không bắt bạn nộp tiền cọc hoặc nạp tiền làm nhiệm vụ.',
      'Tìm hiểu kỹ thông tin pháp lý, mã số thuế và website chính thức của đơn vị tuyển dụng.',
      'Sinh viên nên tìm việc làm thêm thông qua trung tâm hỗ trợ sinh viên của nhà trường hoặc các kênh tuyển dụng uy tín.',
    ],
    responseSteps: [
      'Dừng ngay việc chuyển thêm tiền dù đối tượng hứa sẽ hoàn trả toàn bộ khi xong nhiệm vụ cuối.',
      'Lưu lại toàn bộ lịch sử trò chuyện, tên nhóm chat, biên lai chuyển khoản và tài khoản nhận tiền.',
      'Trình báo sự việc với cơ quan công an địa phương và thông báo cho gia đình để được hỗ trợ kịp thời.',
    ],
    relatedSlugs: ['lua-dao-nham-vao-hoc-sinh-sinh-vien', 'lua-dao-dau-tu-tai-chinh'],
  },
  {
    slug: 'lua-dao-dau-tu-tai-chinh',
    title: 'Lừa đảo đầu tư tài chính',
    category: 'Tài chính & Ngân hàng',
    readingMinutes: 6,
    summary:
      'Phân biệt đầu tư hợp pháp với các mô hình sàn giao dịch giả mạo, nhóm "thầy đọc lệnh" cam kết sinh lời không rủi ro.',
    overview:
      'Lừa đảo đầu tư tài chính thường núp bóng giao dịch ngoại hối, tiền mã hóa, cổ phiếu quốc tế hoặc dự án tài chính công nghệ. Đối tượng xây dựng hình ảnh chuyên gia thành đạt, tạo hội nhóm kín để thao túng tâm lý và khiến nạn nhân liên tục nạp tiền vào các ứng dụng hoặc website do chúng tự kiểm soát.',
    tactics: [
      'Quảng cáo cam kết lợi nhuận cao cố định theo ngày hoặc tháng và khẳng định "bảo vốn 100%, không rủi ro".',
      'Mời vào nhóm có hàng chục tài khoản đóng vai nhà đầu tư thắng lớn để tạo hiệu ứng đám đông.',
      'Cho phép rút số tiền lãi nhỏ ở lần đầu, sau đó yêu cầu đóng thuế, phí xác minh hoặc phí nâng cấp tài khoản khi nạn nhân muốn rút vốn lớn.',
    ],
    signs: [
      'Ứng dụng hoặc website đầu tư phải tải qua đường dẫn lạ, không rõ pháp nhân được cấp phép tại Việt Nam.',
      'Chuyển tiền đầu tư vào tài khoản ngân hàng mang tên cá nhân hoặc nhiều tài khoản khác nhau.',
      'Liên tục thúc giục vay mượn tiền hoặc dồn toàn bộ tiền tiết kiệm để kịp "vòng lệnh đặc biệt".',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Ông Hùng được mời vào một nhóm học đầu tư miễn phí trên mạng xã hội. Sau vài tuần nghe giảng, người tự xưng chuyên gia rủ ông cài đặt ứng dụng sàn giao dịch quốc tế. Khi số dư hiển thị trên màn hình tăng gấp đôi, ông muốn rút tiền nhưng hệ thống báo phải nộp thêm 20% "phí thanh khoản quốc tế" vào tài khoản cá nhân.',
    prevention: [
      'Không tin vào bất kỳ lời mời đầu tư nào cam kết lợi nhuận cao bất thường hoặc không có rủi ro.',
      'Chỉ tham gia đầu tư thông qua các tổ chức tài chính, công ty chứng khoán được cơ quan quản lý nhà nước cấp phép.',
      'Trao đổi với người thân đáng tin cậy trước khi quyết định chuyển số tiền lớn vào các kênh đầu tư mới.',
    ],
    responseSteps: [
      'Không nộp thêm bất kỳ khoản phí mở khóa hay tiền thuế nào để cố rút tiền từ sàn giả mạo.',
      'Thu thập đầy đủ chứng cứ chuyển khoản, đường dẫn trang web, ứng dụng và thông tin liên hệ của đối tượng.',
      'Đến cơ quan công an trình báo và cảnh giác với các quảng cáo nhận thu hồi vốn đầu tư.',
    ],
    relatedSlugs: ['lua-dao-tuyen-dung-viec-nhe-luong-cao', 'lua-dao-tinh-cam'],
  },
  {
    slug: 'gia-danh-cong-an-va-co-quan-nha-nuoc',
    title: 'Giả danh công an và cơ quan nhà nước',
    category: 'Giả mạo & Công nghệ',
    readingMinutes: 6,
    summary:
      'Cách nhận diện cuộc gọi mạo danh cán bộ công an, viện kiểm sát, cơ quan thuế hoặc hỗ trợ cập nhật VNeID.',
    overview:
      'Đây là thủ đoạn đánh mạnh vào nỗi sợ hãi pháp lý của người dân, đặc biệt là người cao tuổi và sinh viên sống xa gia đình. Kẻ gian thường nắm sẵn một số thông tin cơ bản như họ tên hoặc quê quán để tạo cảm giác đáng tin cậy, rồi vu khống nạn nhân liên quan đến đường dây tội phạm hoặc lỗi hồ sơ hành chính.',
    tactics: [
      'Gọi điện tự xưng cán bộ công an, tòa án thông báo có lệnh khởi tố, bắt tạm giam hoặc tài khoản liên quan rửa tiền.',
      'Yêu cầu giữ bí mật tuyệt đối, không được nói với gia đình và phải ra nơi vắng người nghe máy liên tục.',
      'Hướng dẫn cài đặt ứng dụng giả mạo dịch vụ công hoặc VNeID qua tệp ".apk" để chiếm quyền điều khiển điện thoại, hoặc yêu cầu chuyển tiền "chứng minh trong sạch".',
    ],
    signs: [
      'Yêu cầu làm việc, lấy lời khai hoặc chứng minh tài chính hoàn toàn qua điện thoại hoặc cuộc gọi video.',
      'Gửi hình ảnh "lệnh bắt", "quyết định phong tỏa" qua mạng xã hội với lời lẽ đe dọa.',
      'Đề nghị cài ứng dụng ngoài Google Play / App Store hoặc bật quyền Trợ năng (Accessibility) trên điện thoại.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Một sinh viên năm nhất sống tại ký túc xá nhận cuộc gọi tự xưng cán bộ điều tra báo căn cước của em bị kẻ xấu dùng mở tài khoản rửa tiền. Người gọi yêu cầu em không kể với bố mẹ và tải ứng dụng "xác minh công dân" qua đường dẫn gửi trên Zalo để tránh bị bắt ngay trong ngày.',
    prevention: [
      'Ghi nhớ rằng cơ quan công an, viện kiểm sát, tòa án không làm việc, điều tra tội phạm hay yêu cầu chuyển tiền qua điện thoại hoặc mạng xã hội.',
      'Tuyệt đối không cài đặt tệp ".apk" từ tin nhắn lạ và không cấp quyền điều khiển từ xa trên thiết bị.',
      'Khi nhận được cuộc gọi có tính chất đe dọa pháp lý, hãy cúp máy ngay và liên hệ trực tiếp công an xã/phường nơi cư trú.',
    ],
    responseSteps: [
      'Ngắt kết nối mạng ngay lập tức nếu đã lỡ tải hoặc cài đặt ứng dụng lạ theo hướng dẫn.',
      'Liên hệ ngân hàng khóa tài khoản khẩn cấp qua điện thoại khác nếu nghi ngờ thiết bị đã bị chiếm quyền.',
      'Gọi báo cho người thân và đến cơ quan công an gần nhất để trình báo.',
    ],
    relatedSlugs: ['lua-dao-ngan-hang-va-danh-cap-otp', 'lua-dao-nham-vao-hoc-sinh-sinh-vien'],
  },
  {
    slug: 'lua-dao-mua-ban-truc-tuyen',
    title: 'Lừa đảo mua bán trực tuyến',
    category: 'Mua sắm & Đời sống',
    readingMinutes: 5,
    summary:
      'Phòng tránh rủi ro khi mua hàng giá rẻ bất thường, đặt cọc online, thuê phòng trọ và giao dịch ngoài sàn.',
    overview:
      'Sự tiện lợi của thương mại điện tử và mạng xã hội cũng kéo theo nhiều chiêu trò bán hàng giả, nhận cọc rồi chặn liên lạc hoặc dẫn dụ người mua chuyển tiền trực tiếp thay vì thanh toán qua hệ thống bảo vệ của sàn.',
    tactics: [
      'Đăng bán sản phẩm công nghệ, vé sự kiện, phòng trọ với mức giá thấp hơn thị trường rất nhiều để thu hút người mua.',
      'Thúc giục khách chuyển khoản đặt cọc trước với lý do "chỉ còn một suất" hoặc "có người khác đang hỏi mua".',
      'Dẫn dụ người bán hoặc người mua rời khỏi sàn thương mại điện tử để giao dịch qua tin nhắn riêng, sau đó gửi biên lai chuyển khoản giả.',
    ],
    signs: [
      'Người bán từ chối giao dịch trực tiếp hoặc từ chối thanh toán qua cơ chế bảo vệ người mua của sàn.',
      'Tài khoản bán hàng mới lập, thiếu thông tin xác thực hoặc thường xuyên khóa bình luận.',
      'Ép chuyển tiền cọc gấp trong ngày khi chưa được kiểm tra hàng hóa hay hiện trạng phòng trọ.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Bạn Lan tìm thuê phòng trọ gần trường đại học qua mạng xã hội và thấy căn phòng đầy đủ nội thất với giá rất rẻ. Người đăng tự xưng chủ nhà nói đang về quê, đề nghị Lan chuyển trước 1.500.000đ giữ phòng trước khi có người khác cọc mất. Sau khi nhận tiền, số điện thoại và tài khoản mạng xã hội lập tức chặn liên lạc.',
    prevention: [
      'Không chuyển tiền đặt cọc khi chưa kiểm tra thực tế sản phẩm, phòng trọ và xác minh quyền sở hữu hợp pháp.',
      'Ưu tiên thanh toán trực tiếp hoặc qua cổng thanh toán chính thức có cơ chế tạm giữ tiền bảo vệ người mua.',
      'Kiểm tra kỹ biến động số dư thực tế trong ứng dụng ngân hàng trước khi giao hàng thay vì tin vào ảnh chụp màn hình biên lai.',
    ],
    responseSteps: [
      'Ngừng mọi giao dịch bổ sung và chụp lại toàn bộ tin nhắn, bài đăng, tài khoản ngân hàng của người bán.',
      'Thông báo với nền tảng mạng xã hội hoặc sàn giao dịch để gắn cảnh báo tài khoản vi phạm.',
      'Trình báo cơ quan công an địa phương nếu số tiền bị chiếm đoạt đáng kể.',
    ],
    relatedSlugs: ['lua-dao-giao-hang', 'lua-dao-nham-vao-hoc-sinh-sinh-vien'],
  },
  {
    slug: 'lua-dao-tinh-cam',
    title: 'Lừa đảo tình cảm',
    category: 'Mua sắm & Đời sống',
    readingMinutes: 5,
    summary:
      'Nhận diện các tài khoản giả mạo danh tính tiếp cận tình cảm qua mạng rồi dẫn dụ đóng phí nhận quà hoặc đầu tư chung.',
    overview:
      'Lừa đảo tình cảm (Romance Scam) diễn ra chậm rãi hơn các thủ đoạn khác. Kẻ xấu dành nhiều tuần hoặc nhiều tháng xây dựng sự gắn kết tình cảm, tạo dựng lòng tin rồi mới đưa ra các tình huống cần tiền khẩn cấp như gửi quà bị giữ ở hải quan, người thân bệnh nặng hoặc rủ đầu tư kiếm tiền cho tương lai chung.',
    tactics: [
      'Dùng hình ảnh đẹp được lấy cắp trên mạng để đóng vai chuyên gia, doanh nhân, bác sĩ hoặc người sống ở nước ngoài.',
      'Quan tâm dồn dập, hứa hẹn gắn bó lâu dài nhưng luôn né tránh gặp mặt trực tiếp ngoài đời thực.',
      'Thông báo đã gửi kiện hàng có tiền mặt và quà giá trị cao, rồi giả danh nhân viên giao nhận hoặc hải quan đòi đóng phí thông quan.',
    ],
    signs: [
      'Mối quan hệ tiến triển quá nhanh nhưng chưa từng gặp mặt trực tiếp hoặc luôn từ chối xác minh danh tính rõ ràng.',
      'Đề cập đến vấn đề tài chính: vay tiền gấp, đóng phí nhận quà tặng hoặc rủ tham gia sàn đầu tư lạ.',
      'Yêu cầu giữ kín mối quan hệ và các khoản chuyển tiền với gia đình.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Sau hai tháng trò chuyện qua mạng với một người tự xưng kỹ sư làm việc ở nước ngoài, bà Hoa nhận được thông báo người này gửi tặng đồng hồ và tiền mặt về Việt Nam. Ngay hôm sau, một số lạ gọi điện xưng nhân viên vận chuyển quốc tế yêu cầu bà chuyển 12.000.000đ phí khai báo hải quan để nhận kiện hàng.',
    prevention: [
      'Luôn cảnh giác với mọi lời đề nghị chuyển tiền, đóng phí nhận quà hoặc đầu tư từ người chỉ quen biết qua mạng.',
      'Chia sẻ câu chuyện với người thân trong gia đình để có góc nhìn khách quan khi phát sinh yêu cầu tài chính.',
      'Không gửi hình ảnh nhạy cảm hay giấy tờ tùy thân cho người quen qua mạng.',
    ],
    responseSteps: [
      'Dừng ngay việc chuyển tiền và chặn liên hệ với cả tài khoản kết bạn lẫn các số tự xưng hải quan, vận chuyển.',
      'Lưu giữ toàn bộ đoạn chat và lịch sử chuyển khoản để làm căn cứ trình báo.',
      'Tìm sự chia sẻ từ gia đình, bạn bè để ổn định tâm lý và phòng tránh bị dẫn dụ tiếp.',
    ],
    relatedSlugs: ['lua-dao-dau-tu-tai-chinh', 'lua-dao-trung-thuong'],
  },
  {
    slug: 'lua-dao-giao-hang',
    title: 'Lừa đảo giao hàng',
    category: 'Mua sắm & Đời sống',
    readingMinutes: 4,
    summary:
      'Cảnh giác trước chiêu trò giả danh shipper giao đơn hàng không có thật hoặc gửi đường dẫn hủy gói hội viên.',
    overview:
      'Lợi dụng thói quen mua sắm trực tuyến thường xuyên của nhiều gia đình, kẻ gian giả làm nhân viên giao hàng gọi điện báo có đơn hàng cần chuyển khoản thanh toán trước hoặc gửi đường dẫn lừa đảo để chiếm đoạt quyền truy cập tài khoản ngân hàng.',
    tactics: [
      'Gọi điện báo giao hàng nhưng nói đang để trước cửa hoặc gửi bảo vệ, yêu cầu người nhận chuyển khoản ngay dù thực tế không có đơn hàng nào.',
      'Sau khi nạn nhân chuyển nhầm hoặc thắc mắc, kẻ gian tiếp tục nói mình bấm nhầm kích hoạt "thẻ hội viên shipper" sẽ tự động trừ tiền hàng tháng và gửi link giả để hủy.',
      'Giao bưu phẩm bên trong là đồ vật rẻ tiền không đúng giá trị để thu tiền thu hộ (COD) từ người nhà nhận thay.',
    ],
    signs: [
      'Không có mã vận đơn khớp trên ứng dụng mua sắm chính thức của bạn.',
      'Người gọi liên tục thúc giục chuyển khoản vào tài khoản cá nhân khi bạn chưa tận tay kiểm tra gói hàng.',
      'Gửi đường dẫn lạ qua tin nhắn yêu cầu đăng nhập để hủy dịch vụ giao hàng hoặc hoàn tiền.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Giữa giờ làm việc, anh Tuấn nhận cuộc gọi tự xưng shipper báo có đơn hàng 280.000đ đang gửi ở lễ tân và giục chuyển khoản ngay. Khi anh mở ứng dụng mua sắm kiểm tra lại thì hoàn toàn không có đơn hàng nào đang giao trong ngày.',
    prevention: [
      'Luôn kiểm tra trạng thái đơn hàng và mã vận đơn trực tiếp trên ứng dụng mua sắm chính thức trước khi thanh toán.',
      'Thống nhất với người thân ở nhà không tự ý nhận và trả tiền hộ cho những đơn hàng chưa được xác nhận trước.',
      'Tuyệt đối không bấm vào đường dẫn lạ để "hủy thẻ hội viên" hay "nhận hoàn tiền giao nhầm".',
    ],
    responseSteps: [
      'Từ chối chuyển khoản nếu không thấy đơn hàng trên hệ thống chính thức và chặn số điện thoại làm phiền.',
      'Nếu đã lỡ bấm vào đường dẫn và nhập thông tin ngân hàng, hãy liên hệ ngân hàng khóa tài khoản ngay lập tức.',
      'Phản ánh số điện thoại gọi lừa đảo tới đầu số 156.',
    ],
    relatedSlugs: ['lua-dao-mua-ban-truc-tuyen', 'lua-dao-ngan-hang-va-danh-cap-otp'],
  },
  {
    slug: 'lua-dao-trung-thuong',
    title: 'Lừa đảo trúng thưởng',
    category: 'Mua sắm & Đời sống',
    readingMinutes: 4,
    summary:
      'Phát hiện tin nhắn, cuộc gọi thông báo trúng xe, điện thoại hoặc voucher tri ân yêu cầu đóng phí trước.',
    overview:
      'Lừa đảo trúng thưởng đánh vào tâm lý bất ngờ và mong muốn nhận quà giá trị cao. Kẻ gian sao chép tên tuổi, hình ảnh của các nhãn hàng, nhà mạng hoặc sàn thương mại điện tử để gửi thông báo trúng thưởng hàng loạt và yêu cầu đóng trước các loại phí vô lý.',
    tactics: [
      'Gửi tin nhắn hoặc gọi điện chúc mừng trúng thưởng điện thoại, xe máy, tiền mặt dù người nhận chưa từng tham gia quay số.',
      'Yêu cầu chuyển trước phí làm hồ sơ, phí vận chuyển hoặc thuế thu nhập cá nhân để được giải ngân phần thưởng.',
      'Dụ nạn nhân chuyển sang mua hàng giá cao trong các buổi phát sóng hoặc nhóm chat để "đủ điều kiện nhận quà".',
    ],
    signs: [
      'Giải thưởng có giá trị rất lớn nhưng đến hoàn toàn bất ngờ không rõ nguồn gốc chương trình.',
      'Buộc phải chuyển tiền trước mới được nhận quà hoặc tiền thưởng.',
      'Thông tin liên hệ nhận thưởng chỉ là tài khoản cá nhân, không có công bố công khai trên trang chính thức của thương hiệu.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Cô Mai nhận được cuộc gọi thông báo số điện thoại của cô trúng giải tri ân một chiếc tủ lạnh và 10 triệu đồng. Người gọi dặn cô chuyển trước 900.000đ phí vận chuyển vào số tài khoản cá nhân để xe giao hàng xuất kho ngay buổi chiều.',
    prevention: [
      'Không tin vào thông báo trúng thưởng đối với những chương trình bạn chưa từng tham gia.',
      'Kiểm tra thông báo chính thức trên website hoặc trang xác thực chính thức của nhãn hàng.',
      'Không bao giờ chuyển tiền trước để nhận giải thưởng hay quà tặng miễn phí.',
    ],
    responseSteps: [
      'Cúp máy hoặc xóa tin nhắn ngay khi thấy yêu cầu nộp phí nhận thưởng.',
      'Nếu đã lỡ chuyển tiền, lưu lại chứng từ chuyển khoản và trình báo cơ quan công an gần nhất.',
      'Nhắc nhở người cao tuổi trong gia đình về chiêu trò gọi điện trúng thưởng này.',
    ],
    relatedSlugs: ['lua-dao-mua-ban-truc-tuyen', 'lua-dao-giao-hang'],
  },
  {
    slug: 'lua-dao-bang-cong-nghe-deepfake',
    title: 'Lừa đảo bằng công nghệ Deepfake',
    category: 'Giả mạo & Công nghệ',
    readingMinutes: 5,
    summary:
      'Nhận biết cuộc gọi video giả khuôn mặt và giọng nói người thân để vay tiền khẩn cấp.',
    overview:
      'Công nghệ trí tuệ nhân tạo có thể tái tạo khuôn mặt hoặc giả lập giọng nói từ hình ảnh, video công khai trên mạng xã hội. Sau khi chiếm được tài khoản nhắn tin hoặc kết bạn giả, kẻ xấu sử dụng video ngắn ghép khuôn mặt người quen để thuyết phục nạn nhân chuyển tiền gấp.',
    tactics: [
      'Chiếm quyền tài khoản mạng xã hội của người thân rồi nhắn tin hỏi vay tiền hoặc nhờ chuyển khoản hộ.',
      'Thực hiện cuộc gọi video rất ngắn (chỉ vài giây) với hình ảnh mờ, thiếu tự nhiên rồi tắt vội với lý do sóng yếu.',
      'Giục chuyển tiền vào một tài khoản ngân hàng mang tên người lạ với lý do tài khoản chính đang bị lỗi.',
    ],
    signs: [
      'Cuộc gọi video chỉ kéo dài vài giây, hình ảnh giật cục hoặc khẩu hình miệng không khớp âm thanh.',
      'Chủ đề cuộc trò chuyện xoay quanh việc vay tiền gấp, gặp tai nạn hoặc nhờ chuyển hộ ngay.',
      'Số tài khoản nhận tiền không trùng tên với người thân quen của bạn.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Anh Duy nhận tin nhắn từ tài khoản mạng xã hội của em trai nhờ chuyển gấp 6.000.000đ đóng viện phí cho bạn. Để tạo tin tưởng, tài khoản này gọi video trong 3 giây hiện khuôn mặt giống em trai anh đang ngồi ở hành lang mờ tối rồi ngắt máy báo hết pin.',
    prevention: [
      'Luôn gọi điện thoại trực tiếp bằng số di động thường dùng của người thân để xác nhận trước khi chuyển tiền.',
      'Đặt một câu hỏi kiểm chứng riêng tư mà chỉ hai người biết nếu thấy dấu hiệu hình ảnh hay giọng nói bất thường.',
      'Hạn chế đăng công khai quá nhiều video cận mặt và giọng nói rõ nét cho người lạ trên mạng xã hội.',
    ],
    responseSteps: [
      'Liên hệ ngay với người thân qua số điện thoại di động hoặc người ở cạnh họ để kiểm chứng và cảnh báo tài khoản mạng xã hội bị mạo danh.',
      'Nếu đã lỡ chuyển tiền, báo ngay cho ngân hàng và trình báo cơ quan công an địa phương.',
    ],
    relatedSlugs: ['lua-dao-chiem-doat-tai-khoan-mang-xa-hoi', 'gia-danh-cong-an-va-co-quan-nha-nuoc'],
  },
  {
    slug: 'lua-dao-thong-qua-ma-qr',
    title: 'Lừa đảo thông qua mã QR',
    category: 'Giả mạo & Công nghệ',
    readingMinutes: 4,
    summary:
      'Vì sao quét mã QR lạ có thể dẫn tới trang giả mạo đánh cắp tài khoản hoặc chuyển tiền nhầm đích.',
    overview:
      'Mã QR được sử dụng rộng rãi tại quán ăn, cửa hàng và dịch vụ công nhờ tính tiện lợi. Tuy nhiên, người dùng không thể đọc trực tiếp nội dung ẩn bên trong mã QR bằng mắt thường. Kẻ gian lợi dụng điểm này để dán đè mã QR giả tại điểm thanh toán hoặc gửi mã QR dẫn tới trang web độc hại.',
    tactics: [
      'Dán đè mã QR chuyển khoản của kẻ xấu lên bảng mã QR thanh toán tại quầy thu ngân hoặc cửa hàng.',
      'Gửi mã QR trong tờ rơi, tin nhắn hoặc bài viết mạng xã hội mời quét để nhận quà, xem thông báo học bổng hoặc hỗ trợ dịch vụ công.',
      'Chuyển hướng người quét tới trang đăng nhập giả mạo ngân hàng, ví điện tử hoặc mạng xã hội.',
    ],
    signs: [
      'Mã QR trên quầy thanh toán có dấu hiệu bị dán đè, bong mép hoặc khác font chữ với phần còn lại của bảng.',
      'Sau khi quét mã chuyển khoản, tên người nhận hiển thị không khớp với tên cửa hàng hoặc chủ hộ kinh doanh.',
      'Quét mã thông tin nhưng trang mở ra lại yêu cầu nhập mật khẩu ngân hàng, mã OTP hoặc tải ứng dụng lạ.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Trong một nhóm cộng đồng trên mạng xã hội xuất hiện hình ảnh thông báo hỗ trợ nhận phiếu mua hàng miễn phí kèm mã QR ở góc ảnh. Khi người dùng quét mã, điện thoại mở ra một trang web có tên miền lạ yêu cầu đăng nhập tài khoản mạng xã hội và nhập số điện thoại để xác thực.',
    prevention: [
      'Kiểm tra kỹ tên miền trang web hiển thị trước khi bấm mở liên kết từ mã QR.',
      'Khi quét mã QR thanh toán, luôn đối chiếu tên người thụ hưởng và hỏi xác nhận nhân viên thu ngân nếu thấy tên lạ.',
      'Không quét mã QR từ tờ rơi không rõ nguồn gốc hoặc tin nhắn mời nhận quà, vay vốn nhanh.',
    ],
    responseSteps: [
      'Đóng ngay trình duyệt nếu trang mở ra từ mã QR yêu cầu mật khẩu, OTP hoặc tải tệp cài đặt.',
      'Thông báo ngay cho chủ cửa hàng nếu phát hiện bảng mã QR thanh toán có dấu hiệu bị dán đè.',
      'Khóa thẻ và đổi mật khẩu khẩn cấp nếu đã lỡ nhập thông tin tài khoản vào trang web mở từ mã QR.',
    ],
    relatedSlugs: ['lua-dao-ngan-hang-va-danh-cap-otp', 'lua-dao-chiem-doat-tai-khoan-mang-xa-hoi'],
  },
  {
    slug: 'lua-dao-chiem-doat-tai-khoan-mang-xa-hoi',
    title: 'Lừa đảo chiếm đoạt tài khoản mạng xã hội',
    category: 'Giả mạo & Công nghệ',
    readingMinutes: 5,
    summary:
      'Bảo vệ tài khoản Facebook, Zalo, Telegram trước bẫy đường dẫn bình chọn, đăng nhập giả và chiếm mã xác thực.',
    overview:
      'Tài khoản mạng xã hội bị chiếm đoạt thường trở thành công cụ để kẻ gian tiếp tục lừa đảo bạn bè, người thân trong danh sách liên hệ. Phần lớn trường hợp mất tài khoản xảy ra do người dùng đăng nhập vào trang web giả mạo hoặc vô tình cung cấp mã xác thực đăng nhập.',
    tactics: [
      'Nhắn tin từ tài khoản người quen nhờ bấm vào đường dẫn bình chọn cuộc thi, xem ảnh hoặc tải tài liệu.',
      'Hiển thị màn hình đăng nhập giống hệt Facebook, Zalo hoặc Google để đánh cắp mật khẩu và mã OTP xác thực hai lớp.',
      'Giả danh đội ngũ hỗ trợ nền tảng báo tài khoản vi phạm bản quyền và sắp bị khóa trong 24 giờ.',
    ],
    signs: [
      'Đường dẫn yêu cầu đăng nhập lại tài khoản mạng xã hội nhưng tên miền không phải trang chính thức.',
      'Tin nhắn từ bạn bè có văn phong máy móc, thúc giục bấm link bình chọn gấp.',
      'Nhận được thông báo đăng nhập từ thiết bị hoặc vị trí lạ mà bạn không thực hiện.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Bạn Thảo nhận tin nhắn từ tài khoản của bạn cùng lớp nhờ bình chọn cho bài dự thi thiết kế thông qua một đường dẫn rút gọn. Khi mở ra, trang web yêu cầu nhập tài khoản, mật khẩu mạng xã hội và mã xác nhận gửi về SMS. Ngay sau đó, tài khoản của Thảo bị đổi mật khẩu và gửi tin nhắn vay tiền hàng loạt.',
    prevention: [
      'Bật xác thực hai yếu tố (2FA) bằng ứng dụng tạo mã thay vì chỉ dựa vào SMS cho các tài khoản quan trọng.',
      'Kiểm tra kỹ tên miền trên thanh địa chỉ trước khi nhập mật khẩu ở bất kỳ biểu mẫu đăng nhập nào.',
      'Không sử dụng lại cùng một mật khẩu cho email, mạng xã hội và tài khoản ngân hàng.',
    ],
    responseSteps: [
      'Nhanh chóng dùng tính năng khôi phục tài khoản chính thức của nền tảng và đăng xuất khỏi mọi thiết bị lạ.',
      'Nhờ bạn bè hoặc dùng kênh liên lạc khác thông báo ngay cho gia đình, lớp học về việc tài khoản bị chiếm quyền.',
      'Kiểm tra email khôi phục để đảm bảo kẻ gian không thiết lập quy tắc chuyển tiếp email ẩn.',
    ],
    relatedSlugs: ['lua-dao-bang-cong-nghe-deepfake', 'lua-dao-nham-vao-hoc-sinh-sinh-vien'],
  },
  {
    slug: 'lua-dao-nham-vao-hoc-sinh-sinh-vien',
    title: 'Lừa đảo nhắm vào học sinh, sinh viên',
    category: 'Việc làm & Học đường',
    readingMinutes: 6,
    summary:
      'Tổng hợp các chiêu trò phổ biến nhắm vào sinh viên như học bổng giả, đóng học phí hộ, thuê trọ, việc làm thêm và giả danh cán bộ trường.',
    overview:
      'Học sinh, sinh viên thường sử dụng mạng xã hội nhiều, có nhu cầu tìm việc làm thêm, thuê phòng trọ và săn học bổng, nhưng đôi khi còn thiếu kinh nghiệm đối chiếu thông tin tài chính. Kẻ xấu lợi dụng tâm lý háo hức hoặc lo lắng về thủ tục nhập học để thực hiện nhiều kịch bản lừa đảo nhắm riêng vào nhóm này.',
    tactics: [
      'Học bổng giả và trại hè quốc tế: thông báo trúng học bổng hoặc giao lưu sinh viên và yêu cầu chuyển tiền "chứng minh tài chính" hay phí giữ suất.',
      'Lừa đảo đóng học phí hoặc tài liệu: gửi tin nhắn giả danh phòng đào tạo, cán bộ khoa báo nộp bổ sung học phí qua tài khoản cá nhân.',
      'Bẫy việc làm thêm và thuê trọ đầu năm học: rao phòng trọ đẹp giá rẻ hoặc việc làm tại nhà để thu tiền cọc trước.',
      'Giả danh thầy cô, cán bộ trường hoặc gọi điện đe dọa liên quan hồ sơ nhập học, định danh sinh viên.',
    ],
    signs: [
      'Yêu cầu chuyển tiền học phí, lệ phí hồ sơ hoặc tiền học bổng vào tài khoản mang tên cá nhân thay vì tài khoản chính thức của nhà trường.',
      'Bài đăng phòng trọ hoặc việc làm thêm có điều kiện hấp dẫn bất thường kèm áp lực chuyển cọc gấp trong ngày.',
      'Thông báo học bổng hay sự kiện không xuất hiện trên cổng thông tin điện tử hoặc trang chính thức của trường.',
    ],
    scenarioTitle: 'Tình huống minh họa giả định',
    scenarioDescription:
      'Đầu học kỳ mới, một nhóm chat tự xưng là hội sinh viên hỗ trợ tân sinh viên gửi đường dẫn "xác nhận học bổng doanh nghiệp" và yêu cầu ứng viên chuyển 700.000đ phí mở hồ sơ trong buổi tối để kịp danh sách sáng hôm sau. Khi một sinh viên hỏi trực tiếp cố vấn học tập của khoa thì được xác nhận nhà trường không có chương trình thu phí này.',
    prevention: [
      'Mọi khoản học phí, lệ phí hoặc thông báo học bổng đều phải kiểm chứng trực tiếp trên cổng thông tin chính thức của nhà trường hoặc văn phòng khoa.',
      'Chỉ đi xem phòng trọ trực tiếp cùng bạn bè hoặc người thân trước khi ký hợp đồng và đặt cọc.',
      'Tuyệt đối không tham gia các công việc làm thêm yêu cầu nạp tiền trước hoặc cho thuê tài khoản ngân hàng cá nhân.',
    ],
    responseSteps: [
      'Dừng ngay mọi giao dịch chuyển tiền và thông báo cho cố vấn học tập, phòng công tác sinh viên để cảnh báo cho các bạn khác.',
      'Nếu đã lỡ chuyển tiền hoặc lộ thông tin ngân hàng, gọi ngay ngân hàng khóa tài khoản và báo cho gia đình cùng cơ quan công an địa phương.',
    ],
    relatedSlugs: ['lua-dao-tuyen-dung-viec-nhe-luong-cao', 'lua-dao-mua-ban-truc-tuyen'],
  },
];
