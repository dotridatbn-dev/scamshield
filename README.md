# ScamShield — Kiểm tra trước khi tin tưởng

**ScamShield** (phiên bản MVP 1.0) là ứng dụng web tĩnh hỗ trợ người dùng tại Việt Nam nhận diện dấu hiệu lừa đảo trực tuyến, kiểm tra cấu trúc đường dẫn, chuẩn hóa số điện thoại, rà soát thông tin trước khi chuyển khoản, học tập qua thư viện kiến thức và bài trắc nghiệm tình huống.

> Dự án môn Kỹ năng khởi nghiệp, Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội (UET – VNU).

## Tính năng chính

- **Kiểm tra tin nhắn (`/check/message`)**: Bộ quy tắc nhận diện dấu hiệu lừa đảo theo ngữ cảnh chạy 100% trên trình duyệt, hỗ trợ chuẩn hóa tiếng Việt có/không dấu, 6 ví dụ giả định, chấm chỉ báo rủi ro (0–100) và sao chép kết quả.
- **Kiểm tra đường dẫn (`/check/url`)**: Phân tích cấu trúc URL (giao thức HTTP/HTTPS, tên miền thực, địa chỉ IP, link rút gọn, Punycode, ký tự `@`, tên miền phụ bất thường, dấu hiệu giả mạo thương hiệu) dưới dạng văn bản thuần, không tự động truy cập.
- **Tra cứu số điện thoại (`/check/phone`)**: Chuẩn hóa định dạng `0` và `+84`, hướng dẫn xác minh người gọi và liên kết tới kênh phản ánh chính thức (`156`, `canhbao.ncsc.gov.vn`).
- **Tra cứu tài khoản ngân hàng (`/check/bank`)**: Tìm kiếm 16 ngân hàng phổ biến tại Việt Nam + "Ngân hàng khác", giữ nguyên số `0` ở đầu, che số tài khoản và danh sách tự kiểm tra trước khi chuyển khoản.
- **Thư viện kiến thức (`/knowledge` & `/knowledge/:slug`)**: 12 bài viết tiếng Việt đầy đủ 7 phần, tìm kiếm không phân biệt dấu và lọc theo chuyên mục.
- **Trắc nghiệm chống lừa đảo (`/quiz`)**: 15 câu hỏi tình huống kèm giải thích chi tiết và 4 mức đánh giá.
- **Trung tâm hỗ trợ (`/support`)**: Hướng dẫn xử lý khẩn cấp cho 7 tình huống sự cố, cảnh báo lừa đảo thu hồi tiền, 8 câu hỏi thường gặp và kênh tiếp nhận chính thức.
- **Chia sẻ ScamShield & Mã QR**: Tạo mã QR ngay trên trình duyệt, cho phép chỉnh đường dẫn công khai và tải ảnh PNG.

## Yêu cầu kỹ thuật & vận hành không chi phí

- **Frontend-only Static SPA**: React, TypeScript, Vite, Tailwind CSS, Lucide React, React Router, `qrcode`.
- **Không yêu cầu**: Máy chủ backend, cơ sở dữ liệu, tài khoản người dùng, API key hay dịch vụ trả phí khi chạy.
- **Quyền riêng tư**: Không thu thập hay lưu trữ dữ liệu người dùng vào `localStorage` hoặc gửi ra bên ngoài.

## Cài đặt và chạy cục bộ

```bash
npm install
npm run dev
```

## Đóng gói bản sản phẩm tĩnh (`dist/`)

```bash
npm run build
```

Thư mục đầu ra là `dist/`, đã kèm tệp `public/_redirects` (`/* /index.html 200`) để hỗ trợ định tuyến SPA trên **Cloudflare Pages**.

## Hướng dẫn triển khai miễn phí lên Cloudflare Pages

1. Đưa mã nguồn lên kho lưu trữ GitHub (hoặc nén thư mục dự án / tải trực tiếp thư mục `dist/`).
2. Đăng nhập **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages**.
3. Kết nối kho GitHub (hoặc chọn **Upload assets** để tải lên thư mục `dist/` sau khi chạy `npm run build`).
4. Thiết lập cấu hình build:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: Không cần biến môi trường hay API key.
5. Sau khi triển khai thành công, mở liên kết HTTPS công khai và dùng nút **Chia sẻ ScamShield** để tạo mã QR chính thức tải xuống dạng PNG.

## Bản hiệu chỉnh

- Node.js 22.16 trở lên; không cần API key. Đã bỏ cấu hình AI Studio và các phụ thuộc không dùng. Phiên bản phụ thuộc được ghim lại theo bộ công cụ phổ biến; chưa xác minh cài đặt trực tuyến.
- Khi kết nối GitHub với Cloudflare Pages, dùng `npm run build`, thư mục `dist`, thư mục gốc repository. Nếu tải trực tiếp, chỉ tải `dist` sau khi build thành công, không tải ZIP mã nguồn.
- Kiểm thử hồi quy thuật toán: `npm test` sau khi cài dependencies.
- Chưa xác minh production build, giao diện, QR trên thiết bị hoặc trạng thái các liên kết ngoài do môi trường không truy cập npm/web. Cần kiểm tra trước khi công bố.
