import { Link } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Chính sách quyền riêng tư – ScamShield"
        description="Cam kết quyền riêng tư của ScamShield: mọi phân tích chạy trực tiếp trên trình duyệt, không thu thập dữ liệu cá nhân, không lưu lịch sử."
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0D9488]">
            <Lock className="h-4 w-4" />
            <span>Bảo vệ quyền riêng tư tuyệt đối</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Chính sách quyền riêng tư của ScamShield
          </h1>
          <p className="text-sm text-[#64748B]">
            Cập nhật gần nhất: 26/11/2026 · Áp dụng cho phiên bản ScamShield MVP 1.0
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">
            1. Nguyên tắc xử lý hoàn toàn trên trình duyệt
          </h2>
          <p className="text-sm leading-relaxed text-[#64748B]">
            ScamShield được xây dựng như một ứng dụng web tĩnh. Mọi thao tác kiểm tra tin nhắn, phân tích cấu trúc đường dẫn (URL), chuẩn hóa số điện thoại, che số tài khoản ngân hàng và chấm điểm bài trắc nghiệm đều được thực thi trực tiếp bằng mã nguồn chạy trong trình duyệt trên thiết bị của bạn.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">
            2. Không thu thập và không lưu trữ dữ liệu người dùng
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-[#64748B]">
            <li>· Không yêu cầu đăng ký tài khoản, đăng nhập, email hoặc số điện thoại để sử dụng.</li>
            <li>· Không có máy chủ phụ trợ hay cơ sở dữ liệu lưu trữ nội dung bạn dán vào các biểu mẫu kiểm tra.</li>
            <li>· Không lưu lịch sử tin nhắn, đường dẫn, số điện thoại hoặc số tài khoản vào bộ nhớ trình duyệt (<code className="font-mono text-xs">localStorage</code> / <code className="font-mono text-xs">sessionStorage</code>).</li>
            <li>· Không gửi nội dung bạn nhập sang dịch vụ trí tuệ nhân tạo bên ngoài hay công cụ theo dõi hành vi.</li>
            <li>· Không tự động truy cập, tải nội dung hoặc mở đường dẫn nghi ngờ mà bạn nhập vào công cụ Kiểm tra đường dẫn.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">
            3. Khuyến cáo khi nhập thông tin kiểm tra
          </h2>
          <p className="text-sm leading-relaxed text-[#64748B]">
            Dù dữ liệu không rời khỏi trình duyệt, ScamShield luôn khuyến nghị: <strong>“Vui lòng không nhập mật khẩu, mã OTP hoặc thông tin cá nhân nhạy cảm.”</strong> Khi bạn đóng hoặc tải lại trang, mọi nội dung đang hiển thị trong bộ nhớ tạm của phiên làm việc sẽ bị xóa bỏ.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">
            4. Giới hạn trách nhiệm và độ chính xác
          </h2>
          <p className="text-sm leading-relaxed text-[#64748B]">
            Các công cụ của ScamShield cung cấp dấu hiệu nhận biết và khuyến nghị tham khảo dựa trên bộ quy tắc cố định. ScamShield không bảo đảm an toàn tuyệt đối cho bất kỳ tin nhắn, trang web, số điện thoại hay giao dịch tài chính nào. Người dùng cần chủ động kiểm chứng qua kênh chính thức của ngân hàng, nhà trường, doanh nghiệp hoặc cơ quan nhà nước trước khi ra quyết định.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0F172A]">
            5. Liên kết ngoài
          </h2>
          <p className="text-sm leading-relaxed text-[#64748B]">
            Trung tâm hỗ trợ và công cụ xác minh có cung cấp liên kết tới các cổng cảnh báo an toàn thông tin chính thức tại Việt Nam để hỗ trợ người dùng phản ánh sự cố. Khi truy cập sang trang web bên ngoài, bạn tuân theo chính sách quyền riêng tư của đơn vị vận hành trang web đó.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0F172A]">
            <ShieldCheck className="h-5 w-5 text-[#0D9488]" />
            <span>Sẵn sàng kiểm tra an toàn mà không cần đăng ký</span>
          </div>
          <Link
            to="/check/message"
            className="inline-flex min-h-[44px] items-center rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F766E]"
          >
            Kiểm tra ngay
          </Link>
        </div>
      </div>
    </>
  );
}
