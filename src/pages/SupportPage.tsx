import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  LifeBuoy,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import {
  SUPPORT_FAQS,
  SUPPORT_SCENARIOS,
  VERIFIED_REPORTING_CHANNELS,
} from '../data/supportData';

export function SupportPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SUPPORT_SCENARIOS[0].id);
  const [openFaqId, setOpenFaqId] = useState<string | null>(SUPPORT_FAQS[0].id);

  const activeScenario =
    SUPPORT_SCENARIOS.find((s) => s.id === selectedScenarioId) || SUPPORT_SCENARIOS[0];

  return (
    <>
      <PageMeta
        title="Trung tâm hỗ trợ – ScamShield"
        description="Hướng dẫn xử lý khẩn cấp theo từng tình huống khi nghi ngờ bị lừa đảo, cảnh báo bẫy thu hồi tiền và các kênh phản ánh chính thức."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <section className="rounded-2xl bg-[#0F172A] p-6 text-white sm:p-10">
          <div className="flex items-center gap-2.5 text-sm font-medium text-[#14B8A6]">
            <LifeBuoy className="h-4 w-4" />
            <span>Hướng dẫn ứng phó sự cố</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
            Bạn đang nghi ngờ mình bị lừa đảo?
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Hãy giữ bình tĩnh và chọn đúng tình huống bạn đang gặp phải bên dưới để thực hiện ngay các bước khóa tài khoản, bảo toàn bằng chứng và liên hệ đúng cơ quan chức năng.
          </p>
        </section>

        {/* Recovery Scam Alert */}
        <section className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#EF4444]" />
          <div className="space-y-1 text-sm leading-relaxed">
            <h2 className="font-bold">
              Cảnh báo lừa đảo thu hồi tiền (lừa đảo thứ cấp)
            </h2>
            <p>
              Tuyệt đối không tin các tài khoản, trang mạng hoặc dịch vụ tự xưng “công an mạng”, “luật sư trực tuyến” hay “kỹ thuật viên lấy lại tiền treo” yêu cầu bạn chuyển trước tiền phí, tiền đối ứng hoặc cung cấp OTP. Đó là thủ đoạn lừa đảo lần hai nhắm vào nạn nhân.
            </p>
          </div>
        </section>

        {/* 7 Interactive Scenarios */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-2.5">
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">
              Chọn tình huống bạn đang gặp phải
            </h2>
            {SUPPORT_SCENARIOS.map((scenario) => {
              const active = scenario.id === activeScenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    active
                      ? 'border-[#0D9488] bg-[#0D9488] text-white'
                      : 'border-slate-200 bg-white text-[#0F172A] hover:border-[#0D9488]'
                  }`}
                >
                  <span>{scenario.title}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#EF4444]">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{activeScenario.urgencyLabel}</span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-[#0F172A] sm:text-2xl">
                  {activeScenario.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#64748B]">
                  {activeScenario.summary}
                </p>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-5">
                <h3 className="text-base font-bold text-[#0F172A]">
                  Hành động cần làm ngay lập tức
                </h3>
                <ol className="space-y-3">
                  {activeScenario.immediateSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#0F172A]">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F172A] font-mono text-xs font-bold text-white tabular-nums">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-5">
                <h3 className="text-base font-bold text-[#0F172A]">
                  Các bước tiếp theo
                </h3>
                <ul className="space-y-2.5">
                  {activeScenario.followUpSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#64748B]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Official Reporting Channels */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Kênh liên hệ và báo cáo chính thức
            </h2>
            <p className="mt-1.5 text-sm text-[#64748B]">
              ScamShield không thu thập đơn tố giác trực tiếp. Vui lòng liên hệ ngân hàng của bạn qua số tổng đài chính thức hoặc phản ánh tới các kênh sau:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {VERIFIED_REPORTING_CHANNELS.map((channel) => (
              <div
                key={channel.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0D9488]">
                    <PhoneCall className="h-4 w-4 shrink-0" />
                    <h3 className="text-base font-bold text-[#0F172A]">{channel.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#64748B]">
                    {channel.description}
                  </p>
                </div>

                {channel.href ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 font-mono text-sm font-semibold text-[#0D9488] transition-colors hover:border-[#0D9488] hover:bg-white"
                  >
                    <span>{channel.contact}</span>
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 font-mono text-sm font-semibold text-[#0F172A]">
                    {channel.contact}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#0F172A]">Câu hỏi thường gặp</h2>
          <div className="space-y-3">
            {SUPPORT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#64748B] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-4 text-sm leading-relaxed text-[#64748B]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
