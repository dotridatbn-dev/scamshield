import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  HelpCircle,
  RotateCcw,
  Search,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { ToolSwitcher } from '../components/ToolSwitcher';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';
import { MESSAGE_EXAMPLES } from '../data/messageExamples';
import { analyzeMessage, type MessageAnalysisResult } from '../utils/messageAnalyzer';

const MAX_LENGTH = 5000;

export function MessageCheckerPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<MessageAnalysisResult | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) {
      setInputError('Vui lòng dán hoặc nhập nội dung tin nhắn cần kiểm tra.');
      setResult(analyzeMessage(''));
      return;
    }
    if (text.length > MAX_LENGTH) {
      setInputError(`Nội dung vượt quá giới hạn ${MAX_LENGTH.toLocaleString('vi-VN')} ký tự.`);
      return;
    }
    setInputError(null);
    setCopied(false);
    setResult(analyzeMessage(text));
  };

  const handleSelectExample = (exampleContent: string) => {
    setText(exampleContent);
    setInputError(null);
    setCopied(false);
    setResult(analyzeMessage(exampleContent));
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setInputError(null);
    setCopied(false);
  };

  const handleCopyResult = async () => {
    if (!result) return;
    const lines = [
      `Kết quả kiểm tra tin nhắn – ScamShield`,
      `Mức cảnh báo: ${result.statusLabel}${result.score !== null ? ` (${result.score}/100 điểm dấu hiệu)` : ''}`,
      `Nhóm nghi ngờ: ${result.suspectedCategory}`,
      `Nhận xét: ${result.summaryMessage}`,
      ...(result.indicators.length > 0
        ? [
            'Các dấu hiệu phát hiện:',
            ...result.indicators.map((ind, idx) => `${idx + 1}. ${ind.title}`),
          ]
        : []),
      'Lưu ý: Điểm cảnh báo dựa trên quy tắc từ khóa và ngữ cảnh tham khảo, không phải xác suất khoa học hay khẳng định an toàn tuyệt đối.',
    ];
    const summaryText = lines.join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
      } else {
        const area = document.createElement('textarea');
        area.value = summaryText;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const relatedArticles = result
    ? KNOWLEDGE_ARTICLES.filter((a) => result.relatedArticleSlugs.includes(a.slug))
    : [];

  const getStatusBadgeStyle = (status: MessageAnalysisResult['status']) => {
    switch (status) {
      case 'high':
        return {
          container: 'border-red-200 bg-red-50 text-red-900',
          bar: 'bg-[#EF4444]',
          icon: <ShieldAlert className="h-5 w-5 text-[#EF4444] shrink-0" />,
        };
      case 'medium':
        return {
          container: 'border-amber-200 bg-amber-50 text-amber-950',
          bar: 'bg-[#F59E0B]',
          icon: <AlertTriangle className="h-5 w-5 text-[#F59E0B] shrink-0" />,
        };
      case 'low':
        return {
          container: 'border-emerald-200 bg-emerald-50 text-emerald-950',
          bar: 'bg-[#22C55E]',
          icon: <CheckCircle2 className="h-5 w-5 text-[#22C55E] shrink-0" />,
        };
      default:
        return {
          container: 'border-slate-200 bg-slate-100 text-[#0F172A]',
          bar: 'bg-slate-400',
          icon: <HelpCircle className="h-5 w-5 text-[#64748B] shrink-0" />,
        };
    }
  };

  return (
    <>
      <PageMeta
        title="Kiểm tra tin nhắn – ScamShield"
        description="Phân tích dấu hiệu lừa đảo trong tin nhắn SMS, Zalo, Messenger, Facebook, Telegram hoặc email trực tiếp trên trình duyệt."
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Kiểm tra tin nhắn đáng ngờ
          </h1>
          <p className="mt-2 text-base text-[#64748B]">
            Dán nội dung tin nhắn từ SMS, Zalo, Messenger, Facebook, Telegram hoặc email để bộ quy tắc nhận diện các dấu hiệu giả mạo, đòi OTP, việc nhẹ lương cao và đường dẫn lạ.
          </p>
        </div>

        <ToolSwitcher />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="message-input" className="text-sm font-semibold text-[#0F172A]">
                Nội dung tin nhắn cần kiểm tra
              </label>
              <span
                className={`font-mono text-xs tabular-nums ${
                  text.length > MAX_LENGTH ? 'font-semibold text-[#EF4444]' : 'text-[#64748B]'
                }`}
              >
                {text.length.toLocaleString('vi-VN')} / {MAX_LENGTH.toLocaleString('vi-VN')} ký tự
              </span>
            </div>

            <textarea
              id="message-input"
              rows={6}
              maxLength={MAX_LENGTH + 50}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (inputError) setInputError(null);
              }}
              placeholder="Dán nội dung tin nhắn bạn vừa nhận được tại đây..."
              className="mt-2 w-full rounded-xl border border-slate-300 bg-[#F8FAFC] p-4 text-sm leading-relaxed text-[#0F172A] placeholder:text-slate-400 transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
            />

            {inputError && (
              <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#EF4444]" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{inputError}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] whitespace-nowrap"
            >
              <Search className="h-4 w-4" />
              <span>Phân tích tin nhắn</span>
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
              Thử nhanh với 6 ví dụ minh họa giả định:
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {MESSAGE_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleSelectExample(ex.content)}
                  className="flex min-h-[44px] flex-col items-start justify-center rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2 text-left transition-colors hover:border-[#0D9488] hover:bg-white"
                >
                  <span className="text-xs font-semibold text-[#0F172A]">{ex.label}</span>
                  <span className="text-[11px] text-[#64748B]">{ex.scenarioType}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Area */}
        {result && (
          <section
            aria-live="polite"
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6"
          >
            {(() => {
              const style = getStatusBadgeStyle(result.status);
              return (
                <>
                  <div className={`rounded-xl border p-5 ${style.container}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{style.icon}</div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium opacity-80">
                            <span>Phân loại cảnh báo</span>
                            <span aria-hidden="true">·</span>
                            <span>{result.suspectedCategory}</span>
                          </div>
                          <h2 className="mt-1 text-xl font-bold">{result.statusLabel}</h2>
                        </div>
                      </div>

                      {result.score !== null && (
                        <div className="shrink-0 sm:text-right">
                          <div className="text-xs font-medium opacity-80">Chỉ số dấu hiệu</div>
                          <div className="font-mono text-2xl font-bold tabular-nums">
                            {result.score}/100
                          </div>
                        </div>
                      )}
                    </div>

                    {result.score !== null && (
                      <div className="mt-4">
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/80">
                          <div
                            className={`h-full rounded-full transition-all duration-200 ${style.bar}`}
                            style={{ width: `${Math.max(4, result.score)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-relaxed">{result.summaryMessage}</p>
                  </div>

                  <p className="text-xs leading-relaxed text-[#64748B]">
                    <strong>Lưu ý phương pháp:</strong> Điểm số là chỉ báo cảnh báo theo bộ quy tắc heuristic ngay tại trình duyệt, không phải xác suất thống kê khoa học và không khẳng định tuyệt đối một tin nhắn là an toàn 100%.
                  </p>
                </>
              );
            })()}

            {/* Matched Indicators */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0F172A]">
                Các dấu hiệu được ghi nhận ({result.indicators.length})
              </h3>
              {result.indicators.length === 0 ? (
                <p className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
                  {result.safetyNoticeMatched
                    ? 'Nội dung có câu khuyến cáo bảo mật không chia sẻ OTP hoặc cảnh giác lừa đảo. Bộ quy tắc không ghi nhận yêu cầu đánh cắp thông tin.'
                    : 'Không phát hiện cụm dấu hiệu lừa đảo rõ ràng trong bộ quy tắc hiện tại. Vẫn cần đối chiếu người gửi nếu có yêu cầu liên quan tới tiền bạc hoặc thông tin cá nhân.'}
                </p>
              ) : (
                <div className="space-y-3">
                  {result.indicators.map((ind) => (
                    <div
                      key={ind.id}
                      className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {ind.severity === 'high' ? (
                            <ShieldAlert className="h-4 w-4 text-[#EF4444] shrink-0" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-[#F59E0B] shrink-0" />
                          )}
                          <h4 className="text-sm font-bold text-[#0F172A]">{ind.title}</h4>
                        </div>
                        <span className="font-mono text-xs font-medium text-[#64748B] tabular-nums">
                          {ind.severity === 'high' ? 'Mức độ cao' : 'Cần thận trọng'} · +{ind.weight} điểm
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#64748B]">{ind.explanation}</p>
                      {ind.evidence.length > 0 && (
                        <div className="pt-1 space-y-1">
                          <span className="text-xs font-semibold text-[#0F172A]">
                            Đoạn trích khớp dấu hiệu:
                          </span>
                          {ind.evidence.map((snippet, idx) => (
                            <p
                              key={idx}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-[#0F172A] break-words"
                            >
                              {snippet}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="space-y-3 border-t border-slate-200 pt-5">
              <h3 className="text-base font-bold text-[#0F172A]">Khuyến nghị an toàn</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-[#0F172A]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Knowledge Articles */}
            {relatedArticles.length > 0 && (
              <div className="space-y-3 border-t border-slate-200 pt-5">
                <h3 className="text-base font-bold text-[#0F172A]">Bài viết kiến thức liên quan</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {relatedArticles.map((art) => (
                    <Link
                      key={art.slug}
                      to={`/knowledge/${art.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 transition-colors hover:border-[#0D9488] hover:bg-white"
                    >
                      <div>
                        <div className="text-xs text-[#0D9488] font-medium">{art.category}</div>
                        <div className="mt-0.5 text-sm font-bold text-[#0F172A]">{art.title}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#64748B]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={handleCopyResult}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 whitespace-nowrap"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[#22C55E]" />
                ) : (
                  <Copy className="h-4 w-4 text-[#64748B]" />
                )}
                <span>{copied ? 'Đã sao chép kết quả' : 'Sao chép kết quả'}</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Kiểm tra tin nhắn khác</span>
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
