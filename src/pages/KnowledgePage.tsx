import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, RotateCcw, Search } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { ARTICLE_CATEGORIES, KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';
import { containsNormalizedQuery } from '../utils/vietnamese';

export function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || article.category === selectedCategory;
      if (!matchesCategory) return false;

      const searchableText = [
        article.title,
        article.category,
        article.summary,
        article.overview,
        ...article.tactics,
        ...article.signs,
      ].join(' ');

      return containsNormalizedQuery(searchableText, searchQuery);
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tất cả');
  };

  return (
    <>
      <PageMeta
        title="Thư viện kiến thức – ScamShield"
        description="12 bài viết hướng dẫn nhận diện thủ đoạn lừa đảo trực tuyến, bảo vệ tài khoản ngân hàng, sinh viên và gia đình."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Thư viện kiến thức phòng chống lừa đảo
          </h1>
          <p className="mt-2.5 text-base text-[#64748B]">
            Tìm hiểu 12 chuyên đề về thủ đoạn lừa đảo phổ biến tại Việt Nam, tình huống giả định dễ gặp và hướng dẫn xử lý thực tế.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm bài viết theo từ khóa (hỗ trợ có dấu hoặc không dấu)"
              placeholder="Tìm bài viết (ví dụ: OTP, sinh viên, việc nhẹ, QR, deepfake...)"
              className="w-full rounded-xl border border-slate-300 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#0F172A] placeholder:text-slate-400 transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Lọc theo chủ đề">
            {ARTICLE_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#0F172A] text-white'
                      : 'border border-slate-200 bg-[#F8FAFC] text-[#64748B] hover:border-slate-300 hover:text-[#0F172A]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-[#64748B]">
          <span className="tabular-nums">
            Hiển thị <strong className="text-[#0F172A]">{filteredArticles.length}</strong> / {KNOWLEDGE_ARTICLES.length} bài viết
          </span>
        </div>

        {/* Article Grid or Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-4">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-[#0F172A]">
                Không tìm thấy bài viết phù hợp
              </h2>
              <p className="mx-auto max-w-md text-sm text-[#64748B]">
                Thử thay đổi từ khóa tìm kiếm hoặc chọn lại danh mục “Tất cả” để xem toàn bộ 12 bài viết kiến thức.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/knowledge/${article.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#0D9488]"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span className="font-semibold text-[#0D9488]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{article.readingMinutes} phút đọc</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#64748B]">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] group-hover:text-[#0D9488]">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
