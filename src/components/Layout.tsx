import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Share2, X } from 'lucide-react';
import { ShieldLogo } from './ShieldLogo';
import { ShareModal } from './ShareModal';

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/check/message', label: 'Công cụ kiểm tra', matchPrefix: '/check' },
  { to: '/knowledge', label: 'Thư viện kiến thức', matchPrefix: '/knowledge' },
  { to: '/quiz', label: 'Trắc nghiệm' },
  { to: '/support', label: 'Trung tâm hỗ trợ' },
  { to: '/about', label: 'Giới thiệu' },
];

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const isNavActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.matchPrefix) {
      return pathname.startsWith(item.matchPrefix);
    }
    return pathname === item.to;
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-2"
            aria-label="ScamShield – Trang chủ"
          >
            <ShieldLogo className="h-8 w-8 shrink-0" />
            <span className="text-lg font-bold tracking-tight text-[#0F172A]">
              ScamShield
            </span>
          </Link>

          {/* Zone 2: Desktop Navigation */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden lg:flex items-center gap-5 xl:gap-6"
          >
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap shrink-0 text-sm font-medium transition-colors py-1 border-b-2 ${
                    active
                      ? 'border-[#0D9488] text-[#0D9488]'
                      : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/check/message"
              className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] whitespace-nowrap shrink-0"
            >
              Kiểm tra ngay
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0F172A] transition-colors hover:bg-slate-50 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
          >
            <nav aria-label="Điều hướng di động" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isNavActive(item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex min-h-[44px] items-center rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-[#0D9488]/10 text-[#0D9488]'
                        : 'text-[#0F172A] hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/privacy"
                className={`flex min-h-[44px] items-center rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  pathname === '/privacy'
                    ? 'bg-[#0D9488]/10 text-[#0D9488]'
                    : 'text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
              >
                Chính sách quyền riêng tư
              </Link>
              <div className="mt-2 grid grid-cols-1 gap-2 border-t border-slate-200 pt-3 sm:grid-cols-2">
                <Link
                  to="/check/message"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0D9488] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E]"
                >
                  Kiểm tra ngay
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShareModalOpen(true);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Chia sẻ ScamShield</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <ShieldLogo className="h-8 w-8 shrink-0" />
                <span className="text-lg font-bold text-[#0F172A]">ScamShield</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#64748B]">
                Kiểm tra trước khi tin tưởng. Nhận diện lừa đảo — Bảo vệ cộng đồng. Toàn bộ công cụ kiểm tra chạy trực tiếp trên trình duyệt, không thu thập hay lưu trữ dữ liệu cá nhân.
              </p>
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0D9488] hover:bg-white"
              >
                <Share2 className="h-4 w-4 text-[#0D9488]" />
                <span>Chia sẻ ScamShield</span>
              </button>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h3 className="text-sm font-semibold text-[#0F172A]">Công cụ kiểm tra</h3>
              <ul className="space-y-2.5 text-sm text-[#64748B]">
                <li>
                  <Link to="/check/message" className="hover:text-[#0D9488] transition-colors">
                    Kiểm tra tin nhắn
                  </Link>
                </li>
                <li>
                  <Link to="/check/url" className="hover:text-[#0D9488] transition-colors">
                    Kiểm tra đường dẫn
                  </Link>
                </li>
                <li>
                  <Link to="/check/phone" className="hover:text-[#0D9488] transition-colors">
                    Tra cứu số điện thoại
                  </Link>
                </li>
                <li>
                  <Link to="/check/bank" className="hover:text-[#0D9488] transition-colors">
                    Tra cứu tài khoản ngân hàng
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h3 className="text-sm font-semibold text-[#0F172A]">Kiến thức & Dự án</h3>
              <ul className="space-y-2.5 text-sm text-[#64748B]">
                <li>
                  <Link to="/knowledge" className="hover:text-[#0D9488] transition-colors">
                    Thư viện kiến thức (12 bài viết)
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="hover:text-[#0D9488] transition-colors">
                    Trắc nghiệm chống lừa đảo (15 câu)
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-[#0D9488] transition-colors">
                    Trung tâm hỗ trợ khẩn cấp
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#0D9488] transition-colors">
                    Giới thiệu dự án
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#0D9488] transition-colors">
                    Chính sách quyền riêng tư
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#64748B]">
            <p className="font-medium text-[#0F172A]">
              ScamShield – Dự án môn Kỹ năng khởi nghiệp, Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội.
            </p>
            <p>
              Phiên bản MVP 1.0 · Nguyên mẫu sản phẩm phục vụ học phần khởi nghiệp, không thay thế khuyến cáo pháp lý chính thức.
            </p>
          </div>
        </div>
      </footer>

      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />
    </div>
  );
}
