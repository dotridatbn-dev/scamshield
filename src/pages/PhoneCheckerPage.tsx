import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Info,
  PhoneCall,
  Search,
  Trash2,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { ToolSwitcher } from '../components/ToolSwitcher';
import {
  validateAndNormalizeVietnamesePhone,
  type PhoneCheckResult,
} from '../utils/phoneAndBank';

const CALLER_CHECKLIST = [
  'Kiểm tra xem người gọi có tạo áp lực khẩn cấp, đe dọa pháp lý hoặc yêu cầu giữ bí mật với gia đình hay không.',
  'Cơ quan công an, viện kiểm sát, tòa án hoặc ngân hàng không làm việc, lấy lời khai hay yêu cầu chuyển tiền qua điện thoại.',
  'Nếu người gọi tự xưng nhân viên ngân hàng, nhà mạng hoặc giao hàng: cúp máy và tự gọi lại qua tổng đài chính thức hoặc kiểm tra trên ứng dụng chính thức.',
  'Tuyệt đối không đọc mã OTP, mật khẩu, mã PIN hay làm theo hướng dẫn cài đặt tệp lạ từ người gọi.',
];

export function PhoneCheckerPage() {
  const [phoneInput, setPhoneInput] = useState('');
  const [result, setResult] = useState<PhoneCheckResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(validateAndNormalizeVietnamesePhone(phoneInput));
  };

  const handleClear = () => {
    setPhoneInput('');
    setResult(null);
  };

  return (
    <>
      <PageMeta
        title="Tra cứu số điện thoại – ScamShield"
        description="Chuẩn hóa định dạng số điện thoại Việt Nam (0 / +84), hướng dẫn xác minh người gọi và cung cấp kênh phản ánh cuộc gọi lừa đảo chính thức."
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Trợ lý xác minh số điện thoại
          </h1>
          <p className="mt-2 text-base text-[#64748B]">
            Chuẩn hóa định dạng số điện thoại Việt Nam (đầu 0 hoặc +84) và áp dụng quy trình kiểm chứng người gọi trước khi trao đổi thông tin hay thực hiện giao dịch.
          </p>
        </div>

        <ToolSwitcher />

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#64748B]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
          <p>
            <strong>Minh bạch dữ liệu:</strong> ScamShield hiện chưa kết nối với cơ sở dữ liệu số điện thoại lừa đảo theo thời gian thực và không hiển thị số lượt báo cáo hay danh tính chủ thuê bao giả định. Định dạng số hợp lệ không đồng nghĩa với việc người gọi là an toàn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <div>
            <label htmlFor="phone-input" className="block text-sm font-semibold text-[#0F172A]">
              Nhập số điện thoại cần chuẩn hóa (hỗ trợ đầu 0 hoặc +84)
            </label>
            <input
              id="phone-input"
              type="tel"
              inputMode="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Ví dụ: 0912 345 678 hoặc +84 912-345-678"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-[#F8FAFC] px-4 py-3 font-mono text-sm text-[#0F172A] placeholder:text-slate-400 transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
            />
            {result && !result.valid && result.errorMessage && (
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#EF4444]" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{result.errorMessage}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] whitespace-nowrap"
            >
              <Search className="h-4 w-4" />
              <span>Chuẩn hóa & Kiểm tra định dạng</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4 text-[#64748B]" />
              <span>Xóa nội dung</span>
            </button>
          </div>
        </form>

        {result && result.valid && (
          <section
            aria-live="polite"
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6"
          >
            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488]" />
                <div>
                  <div className="text-xs font-medium text-[#64748B]">Trạng thái tra cứu dữ liệu</div>
                  <h2 className="mt-0.5 text-lg font-bold text-[#0F172A]">
                    Chưa có dữ liệu xác minh.
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
                    Số điện thoại khớp quy chuẩn định dạng tại Việt Nam ({result.numberTypeLabel}), nhưng ScamShield chưa kết nối dữ liệu báo cáo cộng đồng hoặc cơ sở dữ liệu thuê bao trực tiếp để kết luận mức độ an toàn của số này.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                <div className="text-xs font-semibold text-[#64748B]">Định dạng trong nước (chuẩn hóa)</div>
                <p className="mt-1.5 font-mono text-lg font-bold text-[#0F172A] tabular-nums">
                  {result.localFormat}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                <div className="text-xs font-semibold text-[#64748B]">Định dạng quốc tế (+84)</div>
                <p className="mt-1.5 font-mono text-lg font-bold text-[#0F172A] tabular-nums">
                  {result.internationalFormat}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Verification Guidance & Checklist */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="h-5 w-5 text-[#0D9488]" />
              <h2 className="text-lg font-bold text-[#0F172A]">
                Danh sách tự kiểm tra khi nhận cuộc gọi lạ
              </h2>
            </div>
            <ul className="space-y-3">
              {CALLER_CHECKLIST.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#0F172A]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Kênh tra cứu & phản ánh chính thức
            </h2>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Khi nhận cuộc gọi hoặc tin nhắn có dấu hiệu lừa đảo, bạn có thể phản ánh trực tiếp tới các kênh chính thức sau:
            </p>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                <div className="font-bold text-[#0F172A]">Đầu số tiếp nhận phản ánh 156</div>
                <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                  Gọi hoặc nhắn tin miễn phí tới 156 để phản ánh cuộc gọi rác và cuộc gọi có dấu hiệu lừa đảo.
                </p>
              </div>
              <p className="text-xs text-slate-500">Các liên kết bên ngoài chưa được kiểm tra trạng thái hiện tại; nếu không truy cập được, hãy liên hệ ngân hàng hoặc cơ quan có thẩm quyền qua kênh chính thức.</p>
              <a
                href="https://canhbao.ncsc.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 transition-colors hover:border-[#0D9488] hover:bg-white"
              >
                <div>
                  <div className="font-bold text-[#0F172A]">Cổng Cảnh báo An toàn thông tin</div>
                  <div className="mt-0.5 font-mono text-xs text-[#0D9488]">canhbao.ncsc.gov.vn</div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#64748B]" />
              </a>
              <a
                href="https://chongthurac.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 transition-colors hover:border-[#0D9488] hover:bg-white"
              >
                <div>
                  <div className="font-bold text-[#0F172A]">Hệ thống phản ánh tin nhắn, cuộc gọi rác</div>
                  <div className="mt-0.5 font-mono text-xs text-[#0D9488]">chongthurac.vn</div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#64748B]" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
