import { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Info,
  Landmark,
  Search,
  Trash2,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { ToolSwitcher } from '../components/ToolSwitcher';
import {
  VIETNAMESE_BANKS,
  validateAndMaskBankAccount,
  type BankAccountCheckResult,
} from '../utils/phoneAndBank';
import { containsNormalizedQuery } from '../utils/vietnamese';

const PRE_TRANSFER_CHECKLIST = [
  { id: 'verified-recipient', label: 'Tôi đã xác minh người nhận.' },
  { id: 'clear-purpose', label: 'Tôi biết rõ mục đích chuyển tiền.' },
  { id: 'no-pressure', label: 'Tôi không bị thúc ép chuyển khoản.' },
  { id: 'no-advance-fee', label: 'Tôi không phải đóng phí nhận thưởng hoặc nhận việc.' },
  { id: 'independent-check', label: 'Tôi đã kiểm tra thông tin qua kênh độc lập.' },
];

export function BankCheckerPage() {
  const [bankSearch, setBankSearch] = useState('');
  const [selectedBankId, setSelectedBankId] = useState(VIETNAMESE_BANKS[0].id);
  const [accountInput, setAccountInput] = useState('');
  const [result, setResult] = useState<BankAccountCheckResult | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const filteredBanks = useMemo(() => {
    const matches = VIETNAMESE_BANKS.filter((bank) =>
      containsNormalizedQuery(`${bank.shortName} ${bank.name}`, bankSearch)
    );
    return matches.length > 0 ? matches : VIETNAMESE_BANKS;
  }, [bankSearch]);

  const selectedBank =
    VIETNAMESE_BANKS.find((b) => b.id === selectedBankId) || VIETNAMESE_BANKS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(validateAndMaskBankAccount(accountInput));
  };

  const handleClear = () => {
    setAccountInput('');
    setResult(null);
  };

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = PRE_TRANSFER_CHECKLIST.filter((item) => checkedItems[item.id]).length;

  return (
    <>
      <PageMeta
        title="Tra cứu tài khoản ngân hàng – ScamShield"
        description="Chuẩn bị kiểm chứng tài khoản ngân hàng trước khi chuyển tiền với danh sách ngân hàng Việt Nam, che số tài khoản và bảng tự kiểm tra an toàn."
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Trợ lý kiểm chứng tài khoản ngân hàng
          </h1>
          <p className="mt-2 text-base text-[#64748B]">
            Kiểm tra định dạng số tài khoản (giữ nguyên số 0 ở đầu), che hiển thị an toàn và rà soát danh sách xác minh trước khi bạn thực hiện lệnh chuyển tiền.
          </p>
        </div>

        <ToolSwitcher />

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#64748B]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
          <p>
            <strong>Minh bạch dữ liệu:</strong> ScamShield hiện chưa kết nối cơ sở dữ liệu tài khoản ngân hàng lừa đảo theo thời gian thực, không hiển thị tên chủ tài khoản hay số lượt báo cáo giả định, và không lưu trữ số tài khoản bạn nhập vào.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Bank & Account Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
              <div>
                <label htmlFor="bank-search" className="block text-sm font-semibold text-[#0F172A]">
                  Tìm nhanh ngân hàng
                </label>
                <input
                  id="bank-search"
                  type="text"
                  value={bankSearch}
                  onChange={(e) => {
                    const nextQuery = e.target.value;
                    setBankSearch(nextQuery);
                    const firstMatch = VIETNAMESE_BANKS.find((b) =>
                      containsNormalizedQuery(`${b.shortName} ${b.name}`, nextQuery)
                    );
                    if (firstMatch) {
                      setSelectedBankId(firstMatch.id);
                    }
                  }}
                  placeholder="Gõ tên ngân hàng (ví dụ: Vietcombank, MB Bank, TPBank...)"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="bank-select" className="block text-sm font-semibold text-[#0F172A]">
                  Chọn ngân hàng thụ hưởng
                </label>
                <select
                  id="bank-select"
                  value={selectedBankId}
                  onChange={(e) => setSelectedBankId(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0F172A] transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
                >
                  {filteredBanks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.shortName} — {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bank-account-input" className="block text-sm font-semibold text-[#0F172A]">
                  Số tài khoản cần kiểm tra
                </label>
                <input
                  id="bank-account-input"
                  type="text"
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  placeholder="Nhập số tài khoản (giữ nguyên số 0 ở đầu nếu có)"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-[#F8FAFC] px-4 py-3 font-mono text-sm text-[#0F172A] placeholder:text-slate-400 transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
                />
                <p className="mt-1.5 text-xs text-[#64748B]">
                  Mỗi ngân hàng tại Việt Nam có độ dài số tài khoản khác nhau (từ 6 đến hơn 16 ký tự). Khoảng trắng thừa sẽ được tự động loại bỏ.
                </p>
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
                  <span>Kiểm tra định dạng & hướng dẫn</span>
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
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5"
              >
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                  <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488]" />
                  <div>
                    <div className="text-xs font-medium text-[#64748B]">Chưa có dữ liệu xác minh trực tiếp</div>
                    <h2 className="mt-0.5 text-lg font-bold text-[#0F172A]">
                      Đã chuẩn bị thông tin kiểm chứng cho {selectedBank.shortName}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                      Định dạng chuỗi hợp lệ để đối chiếu thủ công, nhưng không chứng minh tài khoản này là an toàn.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                    <div className="text-xs font-semibold text-[#64748B]">Ngân hàng đã chọn</div>
                    <p className="mt-1 text-sm font-bold text-[#0F172A]">{selectedBank.shortName}</p>
                    <p className="mt-0.5 text-xs text-[#64748B]">{selectedBank.name}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
                    <div className="text-xs font-semibold text-[#64748B]">
                      Số tài khoản đã che ({result.length} ký tự)
                    </div>
                    <p className="mt-1 font-mono text-lg font-bold text-[#0F172A] tabular-nums">
                      {result.maskedAccount}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 border-t border-slate-200 pt-4">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Hướng dẫn xác minh trước khi chuyển khoản
                  </h3>
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                      <span>
                        Đối chiếu tên chủ tài khoản hiển thị trên ứng dụng ngân hàng chính thức xem có trùng khớp đúng với người hoặc đơn vị bạn định giao dịch hay không.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                      <span>
                        Cảnh giác nếu người nhận tự xưng tổ chức, trường học hoặc doanh nghiệp nhưng lại cung cấp số tài khoản mang tên cá nhân.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>
            )}
          </div>

          {/* Right: Interactive Pre-Transfer Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    Danh sách kiểm tra trước khi chuyển tiền
                  </h2>
                  <span className="font-mono text-xs font-semibold text-[#0D9488] tabular-nums">
                    {completedCount}/{PRE_TRANSFER_CHECKLIST.length}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-[#64748B]">
                  Hãy tự đánh dấu từng bước bên dưới trước khi xác nhận giao dịch chuyển khoản.
                </p>
              </div>

              <div className="space-y-2.5">
                {PRE_TRANSFER_CHECKLIST.map((item) => {
                  const checked = Boolean(checkedItems[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-colors ${
                        checked
                          ? 'border-[#0D9488] bg-[#0D9488]/5 text-[#0F172A] font-medium'
                          : 'border-slate-200 bg-[#F8FAFC] text-[#0F172A] hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChecklistItem(item.id)}
                        className="h-4 w-4 shrink-0 rounded accent-[#0D9488]"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-950">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
                <span>
                  Danh sách kiểm tra này giúp bạn giảm rủi ro thao túng tâm lý, nhưng <strong>không đảm bảo an toàn tuyệt đối cho giao dịch</strong>. Nếu còn bất kỳ nghi ngờ nào, hãy tạm dừng chuyển tiền.
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <h3 className="text-base font-bold text-[#0F172A]">Kênh hỗ trợ xác minh chính thức</h3>
              <p className="text-sm text-[#64748B]">
                Nếu phát hiện dấu hiệu lừa đảo liên quan tới giao dịch ngân hàng, hãy liên hệ tổng đài chính thức của ngân hàng phát hành thẻ và theo dõi cảnh báo từ Cổng An toàn thông tin quốc gia.
              </p>
              <p className="text-xs text-slate-500">Các liên kết bên ngoài chưa được kiểm tra trạng thái hiện tại; nếu không truy cập được, hãy liên hệ ngân hàng hoặc cơ quan có thẩm quyền qua kênh chính thức.</p>
              <a
                href="https://canhbao.ncsc.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] w-full items-center justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0D9488] hover:bg-white"
              >
                <span>canhbao.ncsc.gov.vn</span>
                <ExternalLink className="h-4 w-4 text-[#64748B]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
