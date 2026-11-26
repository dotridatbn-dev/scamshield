import { Link, useLocation } from 'react-router-dom';
import { MessageSquareWarning, Link2, PhoneCall, Landmark, ShieldAlert } from 'lucide-react';

const TOOL_TABS = [
  {
    path: '/check/message',
    label: 'Kiểm tra tin nhắn',
    icon: MessageSquareWarning,
  },
  {
    path: '/check/url',
    label: 'Kiểm tra đường dẫn',
    icon: Link2,
  },
  {
    path: '/check/phone',
    label: 'Tra cứu số điện thoại',
    icon: PhoneCall,
  },
  {
    path: '/check/bank',
    label: 'Tra cứu tài khoản ngân hàng',
    icon: Landmark,
  },
];

export function ToolSwitcher() {
  const { pathname } = useLocation();

  return (
    <div className="space-y-4">
      <nav
        aria-label="Chuyển nhanh giữa các công cụ kiểm tra"
        className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-200 bg-white p-2 sm:grid-cols-2 lg:grid-cols-4"
      >
        {TOOL_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
        <p>
          <strong>Lưu ý bảo mật:</strong> Vui lòng không nhập mật khẩu, mã OTP hoặc thông tin cá nhân nhạy cảm. Toàn bộ quá trình kiểm tra chỉ chạy trực tiếp trên trình duyệt của bạn.
        </p>
      </div>
    </div>
  );
}
