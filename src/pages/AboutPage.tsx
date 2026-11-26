import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Eye,
  GraduationCap,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';

const ROADMAP_PHASES = [
  {
    phase: 'Giai đoạn 1 · Hiện tại (MVP 1.0)',
    title: 'Nền tảng công cụ tĩnh miễn phí trên trình duyệt',
    items: [
      'Cung cấp 4 công cụ kiểm tra tin nhắn, cấu trúc URL, chuẩn hóa số điện thoại và danh sách kiểm tra trước khi chuyển khoản.',
      'Hoàn thiện Thư viện 12 bài viết kiến thức, Trắc nghiệm 15 tình huống và Trung tâm hỗ trợ ứng phó sự cố.',
      'Vận hành hoàn toàn không chi phí hạ tầng, bảo vệ quyền riêng tư tuyệt đối cho người dùng.',
    ],
  },
  {
    phase: 'Giai đoạn 2 · Mở rộng cộng đồng',
    title: 'Cảnh báo định kỳ & gói hỗ trợ gia đình',
    items: [
      'Phát triển bộ tài liệu tập huấn an toàn số cho sinh viên, câu lạc bộ và người cao tuổi.',
      'Nghiên cứu cơ chế tích hợp nguồn cảnh báo uy tín khi được cấp phép hợp lệ và đảm bảo kiểm duyệt chặt chẽ.',
      'Ra mắt tính năng bảo vệ mở rộng định hướng cho cá nhân và gia đình có người lớn tuổi.',
    ],
  },
  {
    phase: 'Giai đoạn 3 · Hợp tác giáo dục & tổ chức',
    title: 'Đào tạo nhận thức an toàn số bền vững',
    items: [
      'Xây dựng chương trình đào tạo và mô phỏng tình huống lừa đảo cho trường học, đại học và doanh nghiệp.',
      'Triển khai mô hình tài trợ giáo dục và cấp phép nội dung truyền thông an toàn mạng.',
    ],
  },
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="Giới thiệu dự án – ScamShield"
        description="Thông tin dự án ScamShield – nguyên mẫu sản phẩm môn Kỹ năng khởi nghiệp tại Trường Đại học Công nghệ, ĐHQGHN với mô hình Freemium tạo tác động xã hội."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <section className="rounded-2xl bg-[#0F172A] p-6 text-white sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#14B8A6]">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>Dự án môn Kỹ năng khởi nghiệp · Phiên bản MVP 1.0</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Giới thiệu dự án ScamShield
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            ScamShield là nguyên mẫu sản phẩm (MVP) được xây dựng cho đồ án cuối kỳ môn Kỹ năng khởi nghiệp tại Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội (UET – VNU). Trang web này đóng vai trò sản phẩm mẫu phục vụ kế hoạch kinh doanh học thuật, không mang tính đại diện hay chứng thực chính thức từ nhà trường.
          </p>
        </section>

        {/* 1. Vấn đề xã hội & 2. Giải pháp ScamShield */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">1. Vấn đề xã hội</h2>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Tại Việt Nam, các hình thức lừa đảo trực tuyến qua tin nhắn, mạng xã hội, cuộc gọi giả danh, đường dẫn độc hại và mã QR ngày càng tinh vi. Nhiều người dùng—từ sinh viên tìm việc làm thêm, người mua sắm trực tuyến đến người lớn tuổi—thường thiếu một công cụ đơn giản, miễn phí và dễ hiểu để dừng lại kiểm tra dấu hiệu rủi ro ngay trước khi bấm link hoặc chuyển tiền.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">2. Giải pháp ScamShield</h2>
            <p className="text-sm leading-relaxed text-[#64748B]">
              ScamShield cung cấp một điểm truy cập thống nhất gồm 4 công cụ kiểm tra nhanh trên trình duyệt, thư viện kiến thức trực quan, bài trắc nghiệm tình huống và hướng dẫn xử lý sự cố khẩn cấp. Người dùng không cần cài đặt ứng dụng, không cần đăng ký tài khoản và dữ liệu kiểm tra không rời khỏi thiết bị cá nhân.
            </p>
          </div>
        </section>

        {/* 3. Sứ mệnh & 4. Tầm nhìn */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <Target className="h-5 w-5" />
              <h2 className="text-xl font-bold text-[#0F172A]">3. Sứ mệnh</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Giúp mọi người dùng Internet tại Việt Nam hình thành thói quen “Kiểm tra trước khi tin tưởng”, giảm thiểu nguy cơ mất tài sản và dữ liệu cá nhân thông qua các công cụ dễ tiếp cận và kiến thức thực tế.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <Eye className="h-5 w-5" />
              <h2 className="text-xl font-bold text-[#0F172A]">4. Tầm nhìn</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Hướng tới trở thành nền tảng giáo dục và hỗ trợ phòng chống lừa đảo trực tuyến đáng tin cậy cho cộng đồng người Việt, kết nối hiệu quả giữa công cụ phòng ngừa, đào tạo nhận thức và hướng dẫn ứng phó sự cố.
            </p>
          </div>
        </section>

        {/* 5. Khách hàng mục tiêu & 6. Tuyên bố giá trị & 7. Điểm khác biệt */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-bold text-[#0F172A]">5. Khách hàng mục tiêu</h2>
            </div>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>· Người dùng Internet phổ thông và các gia đình tại Việt Nam.</li>
              <li>· Học sinh, sinh viên, người trẻ tìm việc và thuê trọ.</li>
              <li>· Người mua sắm trực tuyến và người cao tuổi sử dụng ngân hàng số.</li>
              <li>· Nhà trường, tổ chức giáo dục và doanh nghiệp có nhu cầu tập huấn an toàn số.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="text-lg font-bold text-[#0F172A]">6. Tuyên bố giá trị</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Nhận diện nhanh dấu hiệu đáng ngờ, giải thích rõ ràng lý do bằng tiếng Việt dễ hiểu, bảo vệ tuyệt đối quyền riêng tư vì mọi xử lý diễn ra ngay trên trình duyệt mà không yêu cầu đăng nhập.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <Compass className="h-5 w-5" />
              <h2 className="text-lg font-bold text-[#0F172A]">7. Điểm khác biệt</h2>
            </div>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>· Minh bạch giới hạn kỹ thuật, không tự nhận là công cụ “AI toàn năng” khi chạy quy tắc cục bộ.</li>
              <li>· Không bịa đặt số lượt báo cáo hay danh tính chủ thuê bao chưa kiểm chứng.</li>
              <li>· Kết hợp cả 4 yếu tố: Phát hiện · Xác minh · Giáo dục · Bảo vệ.</li>
            </ul>
          </div>
        </section>

        {/* 8. Mô hình kinh doanh dự kiến & 9. Tác động xã hội dự kiến */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <TrendingUp className="h-5 w-5" />
              <h2 className="text-xl font-bold text-[#0F172A]">
                8. Mô hình kinh doanh dự kiến (Impact-first Freemium)
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Trong kế hoạch kinh doanh học thuật, ScamShield định hướng mô hình Freemium ưu tiên tác động xã hội (hiện chưa tích hợp thanh toán trong phiên bản MVP 1.0):
            </p>
            <ul className="space-y-2.5 text-sm text-[#0F172A]">
              <li>
                <strong>Công cụ cốt lõi miễn phí cho cộng đồng:</strong> Duy trì miễn phí chức năng kiểm tra cơ bản, thư viện kiến thức, trắc nghiệm và hướng dẫn khẩn cấp cho toàn bộ người dân.
              </li>
              <li>
                <strong>Gói dịch vụ nâng cao dự kiến cho cá nhân & gia đình:</strong> Các tính năng mở rộng trong tương lai như hồ sơ cảnh báo cho người thân lớn tuổi hoặc tiện ích hỗ trợ đa kênh.
              </li>
              <li>
                <strong>Đào tạo nhận thức an toàn số B2B / B2E:</strong> Cung cấp chương trình tập huấn, kiểm tra đánh giá nội bộ cho trường học và doanh nghiệp.
              </li>
              <li>
                <strong>Tài trợ giáo dục & cấp phép nội dung:</strong> Hợp tác tài trợ chiến dịch truyền thông cộng đồng với các đơn vị giáo dục và tổ chức xã hội.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-[#0D9488]">
              <HeartHandshake className="h-5 w-5" />
              <h2 className="text-xl font-bold text-[#0F172A]">
                9. Tác động xã hội dự kiến
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Đây là mục tiêu định hướng của dự án chứ chưa phải số liệu thống kê thực tế đã đạt được:
            </p>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li>· Nâng cao khả năng tự nhận diện dấu hiệu lừa đảo trước khi giao dịch của sinh viên và gia đình.</li>
              <li>· Giảm độ trễ trong việc xử lý sự cố khi người dùng lỡ bấm đường dẫn lạ hoặc lộ OTP.</li>
              <li>· Tạo cầu nối chia sẻ kiến thức an toàn số dễ tiếp cận thông qua liên kết web và mã QR.</li>
            </ul>
          </div>
        </section>

        {/* 10. Lộ trình phát triển */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#0D9488]" />
            <h2 className="text-2xl font-bold text-[#0F172A]">10. Lộ trình phát triển dự kiến</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {ROADMAP_PHASES.map((item) => (
              <div key={item.phase} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
                <div className="text-xs font-semibold text-[#0D9488]">{item.phase}</div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <ul className="space-y-2 text-sm leading-relaxed text-[#64748B]">
                  {item.items.map((point, idx) => (
                    <li key={idx}>· {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-[#64748B]">
            Trải nghiệm trực tiếp các công cụ kiểm tra và chính sách bảo vệ quyền riêng tư của ScamShield.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/check/message"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F766E]"
            >
              <span>Dùng thử công cụ</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/privacy"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50"
            >
              Chính sách quyền riêng tư
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
