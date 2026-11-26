import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Không tìm thấy trang (404) – ScamShield"
        description="Trang bạn đang tìm kiếm không tồn tại trên ScamShield."
      />

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 space-y-6">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200/70 text-[#0F172A]">
          <ShieldAlert className="h-7 w-7 text-[#0D9488]" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-sm font-bold text-[#0D9488]">404</p>
          <h1 className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
            Không tìm thấy trang bạn yêu cầu
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[#64748B]">
            Đường dẫn có thể đã thay đổi hoặc nhập chưa chính xác. Bạn có thể quay về trang chủ hoặc chuyển thẳng tới công cụ kiểm tra tin nhắn.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Về trang chủ</span>
          </Link>
          <Link
            to="/check/message"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F766E]"
          >
            Kiểm tra tin nhắn ngay
          </Link>
        </div>
      </div>
    </>
  );
}
