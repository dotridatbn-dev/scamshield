import { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Search,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { ToolSwitcher } from '../components/ToolSwitcher';
import { analyzeUrlStructure, type UrlAnalysisResult } from '../utils/urlAnalyzer';

const SAMPLE_URLS = [
  {
    label: 'Giả mạo tên miền ngân hàng (.example)',
    value: 'https://dangnhap-vietcombank.example/xac-minh-otp',
  },
  {
    label: 'Chứa ký tự "@" che tên miền thực',
    value: 'https://dichvucong.gov.vn@kiemtra-hoso.example/login',
  },
  {
    label: 'Địa chỉ IP trần cài tệp lạ',
    value: 'http://192.0.2.45/tai-ung-dung-vneid.apk',
  },
  {
    label: 'Link rút gọn ẩn địa chỉ đích',
    value: 'https://bit.ly/uu-dai-tri-an-khach-hang',
  },
];

export function UrlCheckerPage() {
  const [urlInput, setUrlInput] = useState('');
  const [result, setResult] = useState<UrlAnalysisResult | null>(null);

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setResult(analyzeUrlStructure(urlInput));
  };

  const handleSelectExample = (value: string) => {
    setUrlInput(value);
    setResult(analyzeUrlStructure(value));
  };

  const handleClear = () => {
    setUrlInput('');
    setResult(null);
  };

  const getRiskSummaryStyle = (level: UrlAnalysisResult['riskLevel']) => {
    switch (level) {
      case 'high':
        return {
          box: 'border-red-200 bg-red-50 text-red-950',
          icon: <ShieldAlert className="h-5 w-5 text-[#EF4444] shrink-0" />,
        };
      case 'medium':
        return {
          box: 'border-amber-200 bg-amber-50 text-amber-950',
          icon: <AlertTriangle className="h-5 w-5 text-[#F59E0B] shrink-0" />,
        };
      default:
        return {
          box: 'border-emerald-200 bg-emerald-50 text-emerald-950',
          icon: <CheckCircle2 className="h-5 w-5 text-[#22C55E] shrink-0" />,
        };
    }
  };

  return (
    <>
      <PageMeta
        title="Kiểm tra đường dẫn – ScamShield"
        description="Phân tích cấu trúc đường dẫn (URL), tên miền thực, giao thức, Punycode, tên miền phụ và dấu hiệu giả mạo trực tiếp trên trình duyệt."
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Kiểm tra cấu trúc đường dẫn (URL)
          </h1>
          <p className="mt-2 text-base text-[#64748B]">
            Dán đường dẫn bạn nhận được để bóc tách tên miền thực sự và nhận diện các kỹ thuật ngụy trang phổ biến mà không cần bấm mở trang web.
          </p>
        </div>

        <ToolSwitcher />

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#64748B]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
          <p>
            Công cụ hiện phân tích cấu trúc đường dẫn. Chưa tích hợp cơ sở dữ liệu website độc hại theo thời gian thực. ScamShield không tự động truy cập vào đường dẫn bạn nhập và luôn hiển thị liên kết dưới dạng văn bản thuần để đảm bảo an toàn.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <div>
            <label htmlFor="url-input" className="block text-sm font-semibold text-[#0F172A]">
              Đường dẫn cần kiểm tra cấu trúc
            </label>
            <input
              id="url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Ví dụ: https://dangnhap-vietcombank.example/xac-minh"
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
              <span>Phân tích đường dẫn</span>
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

          <div className="border-t border-slate-200 pt-5">
            <p className="text-xs font-semibold text-[#64748B]">
              Ví dụ cấu trúc đường dẫn giả định (.example):
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SAMPLE_URLS.map((sample) => (
                <button
                  key={sample.value}
                  type="button"
                  onClick={() => handleSelectExample(sample.value)}
                  className="flex min-h-[44px] flex-col items-start justify-center rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2 text-left transition-colors hover:border-[#0D9488] hover:bg-white"
                >
                  <span className="text-xs font-semibold text-[#0F172A]">{sample.label}</span>
                  <span className="mt-0.5 max-w-full truncate font-mono text-[11px] text-[#64748B]">
                    {sample.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </form>

        {result && result.valid && (
          <section
            aria-live="polite"
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6"
          >
            {(() => {
              const style = getRiskSummaryStyle(result.riskLevel);
              return (
                <div className={`rounded-xl border p-5 ${style.box}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{style.icon}</div>
                    <div>
                      <div className="text-xs font-medium opacity-80">Kết quả phân tích cấu trúc</div>
                      <h2 className="mt-0.5 text-xl font-bold">{result.riskLabel}</h2>
                      <p className="mt-2 text-sm leading-relaxed">
                        {result.riskLevel === 'high'
                          ? 'Đường dẫn có dấu hiệu ngụy trang hoặc cấu trúc bất thường rõ rệt. Không bấm truy cập và không nhập mật khẩu hay mã OTP.'
                          : result.riskLevel === 'medium'
                            ? 'Cấu trúc đường dẫn có điểm cần kiểm chứng thêm trước khi tin tưởng. Hãy đối chiếu kỹ tên miền thực sự.'
                            : 'Chưa thấy bất thường rõ rệt về cấu trúc kỹ thuật, nhưng điều này không chứng minh trang web là an toàn tuyệt đối.'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Parsed Anatomy - Plain text only */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 sm:col-span-2">
                <div className="text-xs font-semibold text-[#64748B]">Tên miền thực sự (Hostname)</div>
                <p className="mt-1.5 font-mono text-sm font-bold text-[#0F172A] break-all select-all">
                  {result.hostname}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                <div className="text-xs font-semibold text-[#64748B]">Giao thức</div>
                <p className="mt-1.5 font-mono text-sm font-bold text-[#0F172A]">
                  {result.protocol}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
              <div className="text-xs font-semibold text-[#64748B]">
                Đường dẫn hiển thị dạng văn bản thuần (không tạo liên kết bấm được)
              </div>
              <p className="mt-1.5 font-mono text-xs text-[#0F172A] break-all select-all">
                {result.rawInput}
              </p>
            </div>

            {/* Findings */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A]">
                Chi tiết dấu hiệu cấu trúc ({result.findings.length})
              </h3>
              {result.findings.length === 0 ? (
                <p className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
                  Không ghi nhận dấu hiệu bất thường trong cấu trúc tên miền. Bạn vẫn cần kiểm tra nguồn gửi và tự đối chiếu địa chỉ chính thức của dịch vụ.
                </p>
              ) : (
                <div className="space-y-3">
                  {result.findings.map((finding) => (
                    <div
                      key={finding.id}
                      className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        {finding.severity === 'high' ? (
                          <ShieldAlert className="h-4 w-4 text-[#EF4444] shrink-0" />
                        ) : finding.severity === 'warn' ? (
                          <AlertTriangle className="h-4 w-4 text-[#F59E0B] shrink-0" />
                        ) : (
                          <Info className="h-4 w-4 text-[#0D9488] shrink-0" />
                        )}
                        <h4 className="text-sm font-bold text-[#0F172A]">{finding.title}</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-[#64748B]">{finding.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="space-y-3 border-t border-slate-200 pt-5">
              <h3 className="text-base font-bold text-[#0F172A]">Khuyến nghị an toàn</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#0F172A]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
