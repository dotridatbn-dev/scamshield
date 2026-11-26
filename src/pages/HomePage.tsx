import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Landmark,
  Layers,
  LifeBuoy,
  Link2,
  Lock,
  MessageSquareWarning,
  PhoneCall,
  SearchCheck,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';

const TOOL_CARDS = [
  {
    number: '01',
    title: 'Kiểm tra tin nhắn',
    description:
      'Phân tích tin nhắn SMS, Zalo, Facebook, Telegram hoặc email theo bộ quy tắc dấu hiệu rủi ro ngay trên trình duyệt.',
    to: '/check/message',
    icon: MessageSquareWarning,
    cta: 'Kiểm tra tin nhắn',
  },
  {
    number: '02',
    title: 'Kiểm tra đường dẫn',
    description:
      'Bóc tách tên miền thực, giao thức, ký tự dễ nhầm lẫn, đường dẫn rút gọn hoặc dấu hiệu giả mạo thương hiệu mà không truy cập liên kết.',
    to: '/check/url',
    icon: Link2,
    cta: 'Kiểm tra đường dẫn',
  },
  {
    number: '03',
    title: 'Tra cứu số điện thoại',
    description:
      'Chuẩn hóa định dạng số 0 / +84 tại Việt Nam, hướng dẫn quy trình xác minh người gọi và cung cấp kênh phản ánh chính thức.',
    to: '/check/phone',
    icon: PhoneCall,
    cta: 'Kiểm tra số điện thoại',
  },
  {
    number: '04',
    title: 'Tra cứu tài khoản ngân hàng',
    description:
      'Kiểm tra định dạng số tài khoản theo ngân hàng, che hiển thị an toàn và thực hành danh sách kiểm tra trước khi chuyển khoản.',
    to: '/check/bank',
    icon: Landmark,
    cta: 'Kiểm tra tài khoản',
  },
];

const CORE_VALUES = [
  {
    title: 'Phát hiện',
    description:
      'Nhận diện sớm các cụm dấu hiệu thường gặp như đòi OTP, đóng phí nhận thưởng, việc nhẹ lương cao và đường dẫn lạ.',
    icon: SearchCheck,
  },
  {
    title: 'Xác minh',
    description:
      'Hình thành thói quen tách tên miền thực, chuẩn hóa thông tin liên hệ và đối chiếu độc lập trước khi tin tưởng.',
    icon: CheckCircle2,
  },
  {
    title: 'Giáo dục',
    description:
      'Cung cấp 12 bài viết phân tích thủ đoạn thực tế và 15 câu hỏi trắc nghiệm giúp rèn luyện phản xạ an toàn số.',
    icon: GraduationCap,
  },
  {
    title: 'Bảo vệ',
    description:
      'Hướng dẫn từng bước xử lý khẩn cấp khi lỡ bấm đường dẫn, lộ OTP, mất tài khoản hoặc đã chuyển tiền.',
    icon: ShieldCheck,
  },
];

const WORKFLOW_STEPS = [
  {
    step: 'Bước 01',
    title: 'Dán nội dung hoặc chọn công cụ phù hợp',
    description:
      'Sao chép tin nhắn, đường dẫn, số điện thoại hoặc thông tin giao dịch bạn đang nghi ngờ. Không cần đăng nhập hay cung cấp dữ liệu cá nhân.',
  },
  {
    step: 'Bước 02',
    title: 'Phân tích cục bộ trực tiếp trên trình duyệt',
    description:
      'Hệ thống quy tắc đối chiếu các dấu hiệu rủi ro và cấu trúc kỹ thuật ngay trên thiết bị của bạn, không gửi dữ liệu ra máy chủ ngoài.',
  },
  {
    step: 'Bước 03',
    title: 'Đọc giải thích chi tiết và hành động an toàn',
    description:
      'Xem rõ lý do cảnh báo, hướng dẫn kiểm chứng độc lập, bài viết kiến thức liên quan và các bước bảo vệ tài khoản kịp thời.',
  },
];

export function HomePage() {
  const featuredArticles = KNOWLEDGE_ARTICLES.slice(0, 6);

  return (
    <>
      <PageMeta
        title="ScamShield – Kiểm tra và phòng chống lừa đảo trực tuyến"
        description="ScamShield giúp bạn nhận diện những dấu hiệu lừa đảo trực tuyến, kiểm tra thông tin đáng ngờ và chủ động bảo vệ tài sản, thông tin cá nhân trên không gian mạng."
      />

      {/* Dark Navy Hero Section */}
      <section className="bg-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm font-medium text-[#14B8A6]">
                Nhận diện lừa đảo — Bảo vệ cộng đồng
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:leading-[1.15]">
                Kiểm tra trước khi tin tưởng.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                ScamShield giúp bạn nhận diện những dấu hiệu lừa đảo trực tuyến, kiểm tra thông tin đáng ngờ và chủ động bảo vệ tài sản, thông tin cá nhân trên không gian mạng.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Link
                  to="/check/message"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#14B8A6] whitespace-nowrap"
                >
                  <span>Kiểm tra lừa đảo ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/knowledge"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/60 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-slate-400 hover:bg-slate-800 whitespace-nowrap"
                >
                  <BookOpen className="h-4 w-4 text-[#14B8A6]" />
                  <span>Khám phá kiến thức</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-slate-800 pt-6 sm:grid-cols-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                  <span>Miễn phí sử dụng</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                  <span>Không cần đăng ký</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                  <span>Bảo vệ quyền riêng tư</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                  <span>Truy cập trên nhiều thiết bị</span>
                </div>
              </div>
            </div>

            {/* Locally rendered SVG cybersecurity illustration */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 sm:p-8">
                <svg
                  viewBox="0 0 420 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Minh họa quy trình kiểm tra dấu hiệu lừa đảo tại trình duyệt của ScamShield"
                  className="w-full h-auto"
                >
                  <rect x="16" y="16" width="388" height="268" rx="16" fill="#1E293B" stroke="#334155" />
                  <rect x="36" y="38" width="170" height="14" rx="7" fill="#334155" />
                  <rect x="36" y="64" width="230" height="10" rx="5" fill="#475569" />
                  <rect x="36" y="92" width="210" height="58" rx="10" fill="#0F172A" stroke="#334155" />
                  <rect x="50" y="106" width="140" height="8" rx="4" fill="#94A3B8" />
                  <rect x="50" y="124" width="178" height="8" rx="4" fill="#64748B" />
                  <rect x="36" y="168" width="210" height="44" rx="10" fill="#0F172A" stroke="#0D9488" />
                  <circle cx="58" cy="190" r="9" fill="#0D9488" fillOpacity="0.22" />
                  <path d="M54 190L57 193L63 187" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="76" y="185" width="145" height="9" rx="4.5" fill="#E2E8F0" />
                  <rect x="36" y="226" width="136" height="32" rx="8" fill="#0D9488" />
                  <rect x="56" y="238" width="96" height="8" rx="4" fill="#FFFFFF" />
                  {/* Central Shield Graphic */}
                  <path
                    d="M324 72L374 92.8V131.5C374 163.2 352.7 189.4 324 197.6C295.3 189.4 274 163.2 274 131.5V92.8L324 72Z"
                    fill="#0D9488"
                  />
                  <path
                    d="M324 83.2L363.2 99.6V131.1C363.2 156.6 346.6 177.9 324 185.4C301.4 177.9 284.8 156.6 284.8 131.1V99.6L324 83.2Z"
                    fill="#0F172A"
                    fillOpacity="0.24"
                  />
                  <path
                    d="M304 135L318 149L345 120"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="276" y="216" width="96" height="10" rx="5" fill="#334155" />
                  <rect x="290" y="234" width="68" height="8" rx="4" fill="#14B8A6" fillOpacity="0.7" />
                </svg>
                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  Xử lý hoàn toàn trên trình duyệt của bạn · Không lưu lịch sử tra cứu · Không yêu cầu tài khoản.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Main Tools Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Bốn công cụ kiểm tra nhanh trước khi hành động
          </h2>
          <p className="mt-3 text-base text-[#64748B]">
            Chọn công cụ phù hợp với thông tin bạn vừa nhận được để đối chiếu dấu hiệu rủi ro và đọc hướng dẫn xác minh an toàn.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TOOL_CARDS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.to}
                to={tool.to}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#0D9488]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#64748B] tabular-nums">
                      {tool.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#64748B]">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0D9488]">
                  <span>{tool.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Common Scam Forms Section */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Các hình thức lừa đảo phổ biến hiện nay
              </h2>
              <p className="mt-3 text-base text-[#64748B]">
                Hiểu rõ kịch bản của kẻ gian là cách hiệu quả nhất để bảo vệ bản thân, gia đình, người lớn tuổi và sinh viên.
              </p>
            </div>
            <Link
              to="/knowledge"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#0D9488] hover:text-[#0F766E] whitespace-nowrap"
            >
              <span>Xem tất cả 12 bài viết</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/knowledge/${article.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 transition-colors hover:border-[#0D9488] hover:bg-white"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span className="font-medium text-[#0D9488]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{article.readingMinutes} phút đọc</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {article.summary}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] group-hover:text-[#0D9488]">
                  <span>Đọc chi tiết</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How ScamShield Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            ScamShield hoạt động như thế nào?
          </h2>
          <p className="mt-3 text-base text-[#64748B]">
            Minh bạch, không thu thập dữ liệu và ưu tiên giải thích dễ hiểu để ai cũng có thể tự kiểm chứng.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
                <Layers className="h-4 w-4" />
                <span>{item.step}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#0F172A]">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#64748B]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Four Core Values */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
              Bốn giá trị cốt lõi
            </h2>
            <p className="mt-3 text-base text-[#64748B]">
              Mọi tính năng của ScamShield đều xoay quanh bốn trụ cột giúp người dùng chủ động bảo vệ mình trên môi trường số.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0D9488]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0F172A]">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiz & Support Preview Split */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#0F172A]">
                Trắc nghiệm an toàn số
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                Thử sức với 15 tình huống thực tế từ giả danh ngân hàng, tuyển dụng việc nhẹ lương cao, mã QR đến Deepfake. Mỗi câu trả lời đều kèm giải thích chi tiết để bạn rút kinh nghiệm ngay.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/quiz"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
              >
                <span>Bắt đầu làm trắc nghiệm</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#EF4444]">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#0F172A]">
                Trung tâm hỗ trợ
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                Bạn đang nghi ngờ mình bị lừa đảo hoặc vừa lỡ bấm vào đường dẫn lạ, lộ OTP hay chuyển tiền nhầm? Xem ngay quy trình xử lý khẩn cấp theo từng tình huống và kênh báo cáo chính thức.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/support"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0D9488] hover:text-[#0D9488] whitespace-nowrap"
              >
                <span>Xem hướng dẫn xử lý ngay</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-To-Action */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0F172A] px-6 py-12 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            Dành một phút kiểm tra trước khi chuyển tiền hay chia sẻ thông tin cá nhân.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Chậm lại một nhịp để đối chiếu giúp bạn tránh được phần lớn những bẫy lừa đảo trực tuyến phổ biến.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/check/message"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#14B8A6] whitespace-nowrap"
            >
              <span>Kiểm tra lừa đảo ngay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
            >
              Tìm hiểu dự án ScamShield
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
