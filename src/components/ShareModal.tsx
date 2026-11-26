import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy, Download, Share2, X, AlertTriangle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getInitialPublicOrigin(): string {
  if (typeof window === 'undefined') return '';
return new URL(import.meta.env.BASE_URL, window.location.origin).href;
}

function isLocalOrPrivateOrigin(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.startsWith('192.168.') ||
      host.startsWith('10.') ||
      host.endsWith('.local') || host.endsWith('.localhost') || host === '[::1]' || /^172\.(1[6-9]|2[0-9]|3[01])\./.test(host) || host.endsWith('.googleusercontent.com') || host.endsWith('.aistudio.google.com') || host === 'aistudio.google.com'
    );
  } catch {
    return true;
  }
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [targetUrl, setTargetUrl] = useState<string>(getInitialPublicOrigin);
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [qrReady, setQrReady] = useState('');
  const [qrError, setQrError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isLocalPreview = isLocalOrPrivateOrigin(targetUrl);

  let isValidHttpUrl = false;
  try {
    const u = new URL(targetUrl.trim());
    isValidHttpUrl = u.protocol === 'https:' && !u.username && !u.password && !isLocalPreview;
  } catch {
    isValidHttpUrl = false;
  }

  useEffect(() => {
    if (!isOpen) return;
    setTargetUrl(getInitialPublicOrigin());
    setCopied(false);
    setShareFeedback(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    let active = true;
    setQrReady('');
    canvasRef.current.getContext('2d')?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (!isValidHttpUrl) {
      setQrError('Vui lòng nhập đường dẫn HTTPS công khai sau khi triển khai.');
      return;
    }

    setQrError(null);
    QRCode.toCanvas(
      canvasRef.current,
      targetUrl.trim(),
      {
        width: 240,
        margin: 4,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      },
      (err) => {
        if (!active) return;
        if (err) {
          setQrError('Không thể tạo mã QR cho đường dẫn này.');
        } else { setQrReady(targetUrl.trim()); }
      }
    );
    return () => { active = false; };
  }, [isOpen, targetUrl, isValidHttpUrl]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!isValidHttpUrl) return;
    const cleanUrl = targetUrl.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cleanUrl);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = cleanUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(tempInput);
        if (!ok) throw new Error('copy failed');
      }
      setCopied(true);
      setShareFeedback('Đã sao chép liên kết vào bộ nhớ tạm.');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setShareFeedback('Không thể tự động sao chép. Bạn có thể chọn và sao chép trực tiếp ô đường dẫn.');
    }
  };

  const handleNativeShare = async () => {
    if (!isValidHttpUrl) return;
    const cleanUrl = targetUrl.trim();
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'ScamShield – Kiểm tra trước khi tin tưởng',
          text: 'Công cụ miễn phí giúp nhận diện dấu hiệu lừa đảo qua tin nhắn, đường dẫn và nâng cao kiến thức an toàn số.',
          url: cleanUrl,
        });
        setShareFeedback('Đã mở hộp thoại chia sẻ của thiết bị.');
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          await handleCopy();
        }
      }
    } else {
      await handleCopy();
    }
  };

  const handleDownloadPng = () => {
    if (!canvasRef.current || !isValidHttpUrl || qrReady !== targetUrl.trim()) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'scamshield-qr.png';
    link.click();
    setShareFeedback('Đã tải xuống ảnh mã QR (scamshield-qr.png).');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="share-modal-title" className="text-xl font-bold text-[#0F172A]">
              Chia sẻ ScamShield
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              Gửi liên kết hoặc mã QR để người thân, bạn bè và sinh viên truy cập miễn phí.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng hộp thoại chia sẻ"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0F172A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          <label htmlFor="share-public-url" className="block text-sm font-medium text-[#0F172A]">
            Đường dẫn công khai của ScamShield
          </label>
          <input
            id="share-public-url"
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://scamshield.pages.dev"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-[#0F172A] transition-colors focus:border-[#0D9488] focus:bg-white focus:outline-none"
          />
          <p className="mt-1.5 text-xs text-[#64748B]">
            Mặc định sử dụng địa chỉ trang hiện tại. Sau khi triển khai lên Cloudflare Pages, bạn có thể giữ nguyên hoặc nhập tên miền công khai chính thức để tạo mã QR.
          </p>
        </div>

        {isLocalPreview && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
            <span>
              Địa chỉ hiện tại là môi trường nội bộ hoặc cục bộ. Trước khi in hoặc gửi mã QR cho cộng đồng, hãy thay bằng đường dẫn HTTPS công khai sau khi triển khai.
            </span>
          </div>
        )}

        <div className="mt-5 flex flex-col items-center rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
          {qrError && (
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-[#EF4444]">
              {qrError}
            </div>
          )}
            <div className={`rounded-xl bg-white p-3 shadow-xs ${qrError ? 'hidden' : ''}`}>
              <canvas
                ref={canvasRef}
                aria-label="Mã QR dẫn tới trang web ScamShield"
                className="block h-[216px] w-[216px]"
              />
            </div>
          <span className="mt-3 text-xs font-medium text-[#64748B]">
            Quét bằng camera điện thoại hoặc ứng dụng hỗ trợ QR
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!isValidHttpUrl}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
          >
            {copied ? <Check className="h-4 w-4 text-[#22C55E]" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép link'}</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            disabled={!isValidHttpUrl}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
          >
            <Share2 className="h-4 w-4" />
            <span>Chia sẻ nhanh</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={!isValidHttpUrl || Boolean(qrError) || qrReady !== targetUrl.trim()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            <span>Tải QR PNG</span>
          </button>
        </div>

        {shareFeedback && (
          <p className="mt-3 text-center text-xs font-medium text-[#0D9488]" role="status">
            {shareFeedback}
          </p>
        )}
      </div>
    </div>
  );
}
