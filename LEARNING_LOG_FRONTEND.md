# Nhật Ký Học Tập (Learning Log) - Frontend (Angular)

Đây là tài liệu tổng hợp quá trình xây dựng, kiến trúc và các vấn đề kỹ thuật liên quan đến phần Frontend (Angular) của dự án DevHabit.

---

## 1. Kiến Trúc & Công Nghệ

*   **Framework**: Angular 18+ (Sử dụng Standalone Components - Không dùng NgModule).
*   **Ngôn ngữ**: TypeScript.
*   **Styling**: SCSS + Angular Material (UI Library).
*   **Mô hình**: Monorepo (Nằm trong thư mục `src/DevHabit.Web` cùng với Backend).

---

## 2. Quy Trình Phát Triển

### A. Khởi tạo & Cấu hình
*   **Tạo dự án**: `ng new DevHabit.Web --style scss --routing`.
*   **Cài đặt Material**: `ng add @angular/material`.
*   **Cấu hình Proxy (`proxy.conf.json`)**:
    *   Giúp chuyển hướng các request `/api` từ `localhost:4200` sang Backend `https://localhost:5001` (hoặc `http` tùy cấu hình) để tránh lỗi CORS trong lúc development.
*   **Cấu hình HttpClient**:
    *   Bật `provideHttpClient(withFetch())` trong `app.config.ts`.

### B. Authentication (Đăng nhập/Đăng ký)
*   **Service (`auth.service.ts`)**:
    *   Gọi API Login/Register/Logout.
    *   Lưu trữ `access_token` và `refresh_token` vào `localStorage`.
*   **Interceptor (`auth.interceptor.ts`)**:
    *   Tự động chèn header `Authorization: Bearer ...` vào tất cả request gửi đi.
*   **Components**:
    *   `LoginComponent`: Form đăng nhập, hỗ trợ phím Enter.
    *   `RegisterComponent`: Form đăng ký.
    *   Logic chuyển hướng (`Router`) sau khi đăng nhập thành công.

### C. Quản lý Tags
*   **Danh sách (`TagsListComponent`)**: Hiển thị bảng Tag, có nút Edit/Delete.
*   **Dialog (`TagDialogComponent`)**: Popup để thêm mới hoặc sửa Tag.

### D. Quản lý Habits (Chức năng chính)
*   **Model**: Định nghĩa interface `Habit` có chứa mảng `tags`.
*   **Danh sách (`HabitManagerComponent`)**:
    *   Hiển thị thông tin chi tiết (Frequency, Target).
    *   Hiển thị danh sách Tag dưới dạng Chip/Badge.
    *   Hiển thị ngày tạo/cập nhật theo múi giờ địa phương (dùng `DatePipe`).
*   **Thêm/Sửa (`HabitDialogComponent`)**:
    *   Form phức tạp với Dropdown chọn Type (Binary/Measurable) và Frequency.
    *   **Multi-select Tags**: Cho phép chọn nhiều Tag cùng lúc khi tạo Habit.

### E. Giao diện & Trải nghiệm (UX)
*   **Sidenav (Menu trái)**: Sử dụng `MatSidenav` để làm menu điều hướng chuyên nghiệp.
*   **Dashboard**: Trang chủ hiển thị dạng Card, có nút xem chi tiết.
*   **Chi tiết Habit**: Trang riêng biệt hiển thị đầy đủ thông tin.

---

## 3. Các Vấn Đề Kỹ Thuật Đã Giải Quyết

### Lỗi Kết Nối & Mạng
1.  **Lỗi `Failed to fetch`**:
    *   *Nguyên nhân*: Trình duyệt chặn kết nối đến Backend vì chứng chỉ SSL tự ký (Self-signed) không an toàn.
    *   *Khắc phục*: Truy cập trực tiếp link API trên trình duyệt và bấm "Proceed unsafe" để chấp nhận chứng chỉ.
2.  **Lỗi `406 Not Acceptable` (API Versioning)**:
    *   *Nguyên nhân*: Backend yêu cầu header chính xác `application/json;v=1` nhưng Frontend gửi sai format.
    *   *Khắc phục*: Cấu hình `HttpInterceptor` hoặc sửa Service để gửi đúng header.
3.  **Lỗi `400 Bad Request` (Page Size)**:
    *   *Nguyên nhân*: Frontend gửi `page_size=100` nhưng Backend giới hạn tối đa 50.
    *   *Khắc phục*: Sửa Frontend xuống 50.

### Lỗi Docker (Frontend)
1.  **Lỗi `TLS handshake timeout` khi build Docker**:
    *   *Nguyên nhân*: Mạng chập chờn không pull được image `node` và `nginx`.
    *   *Khắc phục*: Chạy `npm start` ở máy thật (Local) thay vì Docker trong quá trình dev.
2.  **HTTPS trong Docker**:
    *   Tự tạo chứng chỉ SSL (`openssl`) và cấu hình Nginx để chạy HTTPS trên cổng 443 (map ra 4430).
    *   Sửa lỗi Redirect 301/302 của Nginx để trỏ đúng về cổng 4430 thay vì 443 mặc định.

### Mẹo vặt
*   **Chạy Web Network (LAN)**: Dùng lệnh `ng serve --host 0.0.0.0 --ssl` để mở cổng cho điện thoại/máy khác truy cập.

---

## 4. Hướng dẫn chạy dự án
*   **Cài đặt**: `npm install` (hoặc `npm install --cache .npm-cache` nếu lỗi quyền).
*   **Chạy Dev**: `npm start` (Truy cập `http://localhost:4200` hoặc `https://localhost:4200`).
*   **Build Docker**: `docker-compose up -d --build devhabit.web`.
