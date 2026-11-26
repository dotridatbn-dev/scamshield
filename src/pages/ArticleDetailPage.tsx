import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <>
        <PageMeta
          title="Không tìm thấy bài viết – ScamShield"
          description="Bài viết bạn yêu cầu không tồn tại hoặc đã được chuyển vị trí."
        />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center space-y-5">
          <h1 className="text-2xl font-bold text-[#0F172A]">Không tìm thấy bài viết</h1>
          <p className="text-sm text-[#64748B]">
            Đường dẫn bài viết không tồn tại trong Thư viện kiến thức ScamShield.
          </p>
          <Link
            to="/knowledge"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F766E]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại Thư viện kiến thức</span>
          </Link>
        </div>
      </>
    );
  }

  const relatedArticles = KNOWLEDGE_ARTICLES.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  return (
    <>
      <PageMeta
        title={`${article.title} – ScamShield`}
        description={article.summary}
      />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D9488] hover:text-[#0F766E]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại Thư viện kiến thức</span>
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
            <span className="font-semibold text-[#0D9488]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readingMinutes} phút đọc</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#64748B]">{article.summary}</p>
        </div>

        {/* 1. Tổng quan */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A]">1. Tổng quan</h2>
          <p className="text-sm leading-relaxed text-[#0F172A] sm:text-base">{article.overview}</p>
        </section>

        {/* 2. Thủ đoạn thường gặp & 3. Dấu hiệu nhận biết */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#F59E0B] shrink-0" />
              <h2 className="text-lg font-bold text-[#0F172A]">2. Thủ đoạn thường gặp</h2>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-[#64748B]">
              {article.tactics.map((tactic, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#0F172A] mt-0.5 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{tactic}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#EF4444] shrink-0" />
              <h2 className="text-lg font-bold text-[#0F172A]">3. Dấu hiệu nhận biết</h2>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-[#64748B]">
              {article.signs.map((sign, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#EF4444] mt-0.5 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 4. Tình huống minh họa */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 space-y-2.5">
          <div className="text-xs font-semibold text-amber-900">
            Ví dụ minh họa nhằm mục đích giáo dục
          </div>
          <h2 className="text-lg font-bold text-[#0F172A]">
            4. {article.scenarioTitle}
          </h2>
          <p className="text-sm leading-relaxed text-[#0F172A] sm:text-base">
            {article.scenarioDescription}
          </p>
        </section>

        {/* 5. Cách phòng tránh */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#0D9488] shrink-0" />
            <h2 className="text-xl font-bold text-[#0F172A]">5. Cách phòng tránh</h2>
          </div>
          <ul className="space-y-3">
            {article.prevention.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#0F172A] sm:text-base">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0D9488]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Cách xử lý khi trở thành nạn nhân */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#0F172A]">
            6. Cách xử lý khi trở thành nạn nhân
          </h2>
          <ol className="space-y-3">
            {article.responseSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#0F172A] sm:text-base">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F172A] font-mono text-xs font-bold text-white tabular-nums">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="pt-2">
            <Link
              to="/support"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D9488] hover:text-[#0F766E]"
            >
              <span>Xem thêm hướng dẫn khẩn cấp tại Trung tâm hỗ trợ</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 7. Bài viết liên quan */}
        {relatedArticles.length > 0 && (
          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-[#0F172A]">7. Bài viết liên quan</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/knowledge/${rel.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0D9488]"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#64748B]">
                      <span className="font-semibold text-[#0D9488]">{rel.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{rel.readingMinutes} phút đọc</span>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-[#0F172A] group-hover:text-[#0D9488]">
                      {rel.title}
                    </h3>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] group-hover:text-[#0D9488]">
                    <span>Đọc tiếp</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
