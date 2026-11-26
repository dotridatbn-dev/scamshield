import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  RotateCcw,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { KNOWLEDGE_ARTICLES } from '../data/knowledgeArticles';
import { QUIZ_QUESTIONS, QUIZ_RESULT_TIERS } from '../data/quizQuestions';

type QuizStage = 'intro' | 'active' | 'completed';

export function QuizPage() {
  const [stage, setStage] = useState<QuizStage>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmedAnswers, setConfirmedAnswers] = useState<Record<number, number>>({});
  const [copiedResult, setCopiedResult] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const confirmedChoice = confirmedAnswers[currentQuestion.id];
  const isQuestionConfirmed = confirmedChoice !== undefined;

  const score = QUIZ_QUESTIONS.reduce((total, q) => {
    return confirmedAnswers[q.id] === q.correctIndex ? total + 1 : total;
  }, 0);

  const handleStartQuiz = () => {
    setStage('active');
    setCurrentIndex(0);
    setSelectedOption(null);
    setConfirmedAnswers({});
    setCopiedResult(false);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isQuestionConfirmed) return;
    setConfirmedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (!isQuestionConfirmed) return;
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setStage('completed');
    }
  };

  const matchedTier =
    QUIZ_RESULT_TIERS.find((t) => score >= t.minScore && score <= t.maxScore) ||
    QUIZ_RESULT_TIERS[QUIZ_RESULT_TIERS.length - 1];

  const missedSlugs = Array.from(
    new Set(
      QUIZ_QUESTIONS.filter((q) => confirmedAnswers[q.id] !== q.correctIndex).map(
        (q) => q.relatedArticleSlug
      )
    )
  );

  const recommendedSlugs =
    missedSlugs.length > 0
      ? missedSlugs.slice(0, 3)
      : [
          'lua-dao-ngan-hang-va-danh-cap-otp',
          'lua-dao-bang-cong-nghe-deepfake',
          'lua-dao-nham-vao-hoc-sinh-sinh-vien',
        ];

  const recommendedArticles = KNOWLEDGE_ARTICLES.filter((a) =>
    recommendedSlugs.includes(a.slug)
  );

  const handleCopySummary = async () => {
    const shareText = [
      `Kết quả Trắc nghiệm chống lừa đảo – ScamShield`,
      `Điểm số: ${score}/${totalQuestions} câu đúng`,
      `Đánh giá: ${matchedTier.title}`,
      `Nhận xét: ${matchedTier.summary}`,
      `Kiểm tra kiến thức an toàn số cùng ScamShield — Kiểm tra trước khi tin tưởng.`,
    ].join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        const area = document.createElement('textarea');
        area.value = shareText;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2500);
    } catch {
      setCopiedResult(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Trắc nghiệm chống lừa đảo – ScamShield"
        description="Kiểm tra phản xạ nhận diện 15 tình huống lừa đảo trực tuyến phổ biến tại Việt Nam kèm giải thích chi tiết."
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {stage === 'intro' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D9488]/10 text-[#0D9488]">
              <ClipboardCheck className="h-6 w-6" />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Trắc nghiệm kiến thức chống lừa đảo trực tuyến
              </h1>
              <p className="text-base leading-relaxed text-[#64748B]">
                Bài trắc nghiệm gồm 15 tình huống thực tế xoay quanh tin nhắn ngân hàng, việc nhẹ lương cao, giả danh công an, mã QR, Deepfake, mua bán trực tuyến và lừa đảo nhắm vào sinh viên.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 sm:grid-cols-3 text-sm">
              <div>
                <div className="text-xs text-[#64748B]">Số lượng câu hỏi</div>
                <div className="mt-1 font-bold text-[#0F172A] tabular-nums">15 tình huống</div>
              </div>
              <div>
                <div className="text-xs text-[#64748B]">Phản hồi</div>
                <div className="mt-1 font-bold text-[#0F172A]">Giải thích ngay từng câu</div>
              </div>
              <div>
                <div className="text-xs text-[#64748B]">Quyền riêng tư</div>
                <div className="mt-1 font-bold text-[#0F172A]">Không lưu thông tin cá nhân</div>
              </div>
            </div>

            <p className="text-xs text-[#64748B]">
              Lưu ý: Kết quả trắc nghiệm giúp bạn tự đánh giá kiến thức tham khảo, không bảo đảm phòng tránh tuyệt đối mọi tình huống lừa đảo ngoài thực tế.
            </p>

            <button
              type="button"
              onClick={handleStartQuiz}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0F766E]"
            >
              <span>Bắt đầu làm bài</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {stage === 'active' && (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-[#0F172A] tabular-nums">
                  Câu {currentIndex + 1} / {totalQuestions}
                </span>
                <span className="text-xs font-medium text-[#0D9488]">
                  {currentQuestion.topic}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#0D9488] transition-all duration-200"
                  style={{
                    width: `${((currentIndex + (isQuestionConfirmed ? 1 : 0)) / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
              <h1 className="text-lg font-bold leading-relaxed text-[#0F172A] sm:text-xl">
                {currentQuestion.scenario}
              </h1>

              <div className="space-y-3" role="radiogroup" aria-label="Các phương án trả lời">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = isQuestionConfirmed
                    ? confirmedChoice === idx
                    : selectedOption === idx;
                  const isCorrectOption = idx === currentQuestion.correctIndex;

                  let optionClasses =
                    'border-slate-200 bg-[#F8FAFC] text-[#0F172A] hover:border-[#0D9488] hover:bg-white';

                  if (isQuestionConfirmed) {
                    if (isCorrectOption) {
                      optionClasses = 'border-emerald-300 bg-emerald-50 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses = 'border-red-300 bg-red-50 text-red-950';
                    } else {
                      optionClasses = 'border-slate-200 bg-slate-50 text-[#64748B]';
                    }
                  } else if (isSelected) {
                    optionClasses = 'border-[#0D9488] bg-[#0D9488]/5 text-[#0F172A] font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isQuestionConfirmed}
                      onClick={() => setSelectedOption(idx)}
                      className={`flex min-h-[52px] w-full items-start gap-3 rounded-xl border p-4 text-left text-sm leading-relaxed transition-colors disabled:cursor-default ${optionClasses}`}
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current font-mono text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isQuestionConfirmed && isCorrectOption && (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
                      )}
                      {isQuestionConfirmed && isSelected && !isCorrectOption && (
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#EF4444]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!isQuestionConfirmed ? (
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleConfirmAnswer}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0D9488] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Xác nhận đáp án
                  </button>
                </div>
              ) : (
                <div className="space-y-4 border-t border-slate-200 pt-5" aria-live="polite">
                  <div
                    className={`rounded-xl border p-4 ${
                      confirmedChoice === currentQuestion.correctIndex
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                        : 'border-red-200 bg-red-50 text-red-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {confirmedChoice === currentQuestion.correctIndex ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                          <span>Chính xác!</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-5 w-5 text-[#EF4444]" />
                          <span>
                            Chưa chính xác. Đáp án đúng là phương án{' '}
                            {String.fromCharCode(65 + currentQuestion.correctIndex)}.
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{currentQuestion.explanation}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                      <span>
                        {currentIndex + 1 < totalQuestions ? 'Câu tiếp theo' : 'Xem kết quả'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {stage === 'completed' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
            <div className="rounded-2xl bg-[#0F172A] p-6 text-white sm:p-8">
              <div className="text-xs font-medium text-[#14B8A6]">
                Hoàn thành bài trắc nghiệm an toàn số
              </div>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">{matchedTier.title}</h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                    {matchedTier.summary}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="text-xs text-slate-400">Điểm của bạn</div>
                  <div className="font-mono text-4xl font-bold text-[#14B8A6] tabular-nums">
                    {score}/{totalQuestions}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-2">
              <h2 className="text-base font-bold text-[#0F172A]">Lời khuyên dành cho bạn</h2>
              <p className="text-sm leading-relaxed text-[#64748B]">{matchedTier.advice}</p>
              <p className="text-xs text-[#64748B]">
                Lưu ý: Kết quả bài kiểm tra mang tính củng cố kiến thức, không đảm bảo phòng tránh được mọi hình thức lừa đảo thực tế.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#0F172A]">
                Bài viết gợi ý nên đọc tiếp
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {recommendedArticles.map((art) => (
                  <Link
                    key={art.slug}
                    to={`/knowledge/${art.slug}`}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 transition-colors hover:border-[#0D9488] hover:bg-white"
                  >
                    <div>
                      <div className="text-xs font-medium text-[#0D9488]">{art.category}</div>
                      <div className="mt-1 text-sm font-bold text-[#0F172A]">{art.title}</div>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A]">
                      <span>Đọc ngay</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 whitespace-nowrap"
              >
                {copiedResult ? (
                  <Check className="h-4 w-4 text-[#22C55E]" />
                ) : (
                  <Copy className="h-4 w-4 text-[#64748B]" />
                )}
                <span>{copiedResult ? 'Đã sao chép kết quả' : 'Chia sẻ kết quả dạng văn bản'}</span>
              </button>

              <button
                type="button"
                onClick={handleStartQuiz}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] whitespace-nowrap"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Làm lại bài trắc nghiệm</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
