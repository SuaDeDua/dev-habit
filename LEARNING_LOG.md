# Nhật Ký Học Tập (Learning Log) - Dự Án DevHabit

Đây là bản tóm tắt các công việc và kiến thức quan trọng đã được thực hiện và học hỏi trong quá trình phát triển dự án DevHabit. Mục đích là để bạn có thể dễ dàng ôn lại và nắm bắt những gì đã làm.

---

## 1. Tổng Quan Dự Án & Kiến Trúc

*   **Tên Dự Án**: `DevHabit`
*   **Mục Tiêu**: Xây dựng một ứng dụng quản lý thói quen.
*   **Kiến Trúc**: Monorepo với Backend ASP.NET Core và Frontend Angular.
    *   **Backend**: `src/DevHabit.Api` - Một API được xây dựng trên ASP.NET Core 8.
        *   **Kiến trúc**: Monolith phân lớp (Layered Monolith), không phải Clean Architecture nghiêm ngặt (Controller gọi trực tiếp DbContext).
        *   **Database**: PostgreSQL với Entity Framework Core, sử dụng `snake_case` cho tên cột.
        *   **Serialization**: `Newtonsoft.Json` (camelCase).
        *   **Validation**: `FluentValidation` với Error Handling sử dụng `IExceptionHandler` để trả về `ProblemDetails` chuẩn RFC 7807.
        *   **API Versioning**: Sử dụng `MediaTypeApiVersionReader` (`application/json;v=1` hoặc `application/vnd.dev-habit.hateoas.v{version}+json`).
        *   **Data Shaping**: Cho phép client yêu cầu các trường cụ thể (`fields` query parameter) thông qua một `IDataShapingService` và các extension method của `IQueryable`.
        *   **HATEOAS**: Cung cấp các liên kết Hypermedia dựa trên `Accept` header.
        *   **Authentication**: JWT Bearer Token với ASP.NET Core Identity.
        *   **Observability**: OpenTelemetry cho Tracing và Metrics.
    *   **Frontend**: `src/DevHabit.Web` - Ứng dụng Angular 18+ (Standalone Components).
        *   **Styling**: SCSS và Angular Material.
        *   **Kết nối Backend**: Sử dụng Proxy trong Development và Nginx trong Docker để xử lý CORS và định tuyến API.

---

## 2. Quy Trình Phân Tích Codebase & Các Phát Hiện Quan Trọng

Khi bắt đầu, chúng ta đã thực hiện phân tích sâu codebase để nắm bắt kiến trúc và các công nghệ.

*   **`Program.cs`**: Điểm khởi đầu của ứng dụng, nơi cấu hình pipeline middleware và đăng ký các dịch vụ chính (thông qua các extension method).
*   **`DependencyInjection.cs`**: Trung tâm cấu hình DI, nơi mọi service được đăng ký (DbContext, DataShaping, LinkService, Validators, ExceptionHandlers, v.v.).
*   **`Middlewares/ValidationExceptionHandler.cs`**: Cách custom lỗi FluentValidation thành `ProblemDetails` thống nhất.
*   **`Controllers/HabitsController.cs`**: Controller mẫu, thể hiện cách sử dụng Data Shaping, HATEOAS, Validation và truy cập DbContext.
*   **`Services/LinkService.cs`**: Wrapper cho `LinkGenerator` để tạo HATEOAS link.
*   **`Services/DataShapingService.cs`**: Service reflection-based để định hình dữ liệu trong bộ nhớ.
*   **`Extensions/QueryableExtensions.cs`**: Chứa các extension method cho `IQueryable` để hỗ trợ sorting, pagination và gọi Data Shaping sau khi query DB.

---

## 3. Khắc Phục Các Vấn Đề Xây Dựng (Build Issues)

Ban đầu, dự án không build được do thiếu `using` directives và lỗi visibility:

*   **Vấn đề**: `IPaginationResult` không được tìm thấy (mặc định là `internal`), `SortMappingDefinition<,>` cũng lỗi tương tự.
*   **Giải pháp**:
    *   Sửa `src/DevHabit.Api/Common/Pagination/IPaginationResult.cs` thành `public interface IPaginationResult`.
    *   Đảm bảo `using DevHabit.Api.Common.Pagination;` có trong `src/DevHabit.Api/Common/DataShaping/ShapedPaginationResult.cs`.
    *   Đảm bảo `using DevHabit.Api.Common.Sorting;` có trong `src/DevHabit.Api/Dtos/Tags/TagMappings.cs` và `src/DevHabit.Api/Dtos/Habits/HabitMappings.cs`.
*   **Kết quả**: Dự án build thành công.

---

## 4. Tích Hợp & Chạy Test với Hurl

Chúng ta đã tạo và chạy các test tích hợp API bằng Hurl.

*   **Mục tiêu**: Tự động kiểm tra luồng API (Đăng ký, Đăng nhập, CRUD Habit).
*   **Các bước**:
    1.  Cập nhật các file Hurl lẻ (`.hurl`) để phản ánh đúng cấu trúc và payload từ `.http`.
    2.  Tạo file `src/DevHabit.Api/Request/hurl/hurl.env` chứa các biến môi trường và dummy.
    3.  Tạo file `src/DevHabit.Api/Request/hurl/integration.hurl` làm kịch bản test đầy đủ.
    4.  Sửa các file Hurl lẻ để thêm khối `[Options]` vào cuối file, giúp `hurl.nvim` hoặc `hurl` CLI nhận diện biến.
*   **Các vấn đề gặp phải & Giải pháp**:
    *   **AirTunes chiếm cổng 5000**: Đổi sang `https://localhost:5001` hoặc cổng khác.
    *   **Lỗi `400 Bad Request` khi tạo Habit**: Payload không khớp với Validator (`HabitType.Binary` với `minutes` là không hợp lệ). Sửa `type` thành `2` (Measurable).
    *   **Lỗi `409 Conflict` khi đăng ký**: `Email` hoặc `Name` bị trùng. Tạo email và name ngẫu nhiên bằng `user_$(date +%s)_$RANDOM@test.com` và `User_{{email}}`.
*   **Lệnh chạy Hurl**:
    ```bash
    hurl --insecure --variable host=https://localhost:5001 \
         --variable email=user_$(date +%s)_$RANDOM@test.com \
         src/DevHabit.Api/Request/hurl/integration.hurl --verbose
    ```

---

## 5. Tích Hợp Frontend Angular

Chúng ta đã thêm một ứng dụng Angular vào dự án.

*   **Tạo Dự Án**: `npx @angular/cli@latest new DevHabit.Web --directory src/DevHabit.Web --style scss --routing true --skip-git --package-manager npm --ssr false`
*   **Cài Angular Material**: `cd src/DevHabit.Web && npx ng add @angular/material --skip-confirmation --defaults`
*   **Cấu hình Proxy**:
    *   Tạo `src/DevHabit.Web/proxy.conf.json` để trỏ `/api` về `https://127.0.0.1:5001` (với `secure: false`, `changeOrigin: true`, `logLevel: "debug"`).
    *   Cập nhật `angular.json` để `ng serve` sử dụng `proxyConfig`.
*   **Cấu hình CORS ở Backend**: Thêm policy `AllowAngularDev` cho `http://localhost:4200` trong `src/DevHabit.Api/Program.cs`.
*   **HttpClient**: Bật `provideHttpClient(withFetch())` trong `src/DevHabit.Web/src/app/app.config.ts`.
*   **Hiển thị Habits**:
    *   Tạo `src/DevHabit.Web/src/app/models/habit.model.ts` (interfaces).
    *   Tạo `src/DevHabit.Web/src/app/services/habit.service.ts` (gọi API).
    *   Tạo `src/DevHabit.Web/src/app/components/habit-list/habit-list.component.ts` (hiển thị).
    *   Cập nhật `src/DevHabit.Web/src/app/app.component.ts` để nhúng `HabitListComponent`.
*   **Tích hợp Docker Compose**:
    *   Tạo `src/DevHabit.Web/Dockerfile` (multi-stage build với Nginx).
    *   Tạo `src/DevHabit.Web/nginx.conf` (định tuyến `/api` tới `devhabit.api:8080`).
    *   Thêm `devhabit.web` service vào `docker-compose.yml`.
*   **Các vấn đề gặp phải & Giải pháp**:
    *   **`npm install` lỗi EACCES**: Dùng `npm install --cache .npm-cache` để chuyển cache vào thư mục cục bộ.
    *   **Lỗi `Failed to fetch`**:
        *   Chưa chấp nhận chứng chỉ SSL của `https://localhost:5001` trong trình duyệt.
        *   Vấn đề IPv4/IPv6, sửa proxy target thành `https://127.0.0.1:5001`.
    *   **Lỗi `400 Invalid API version`**: `MediaTypeApiVersionReader` đọc sai header `Accept`. Khắc phục bằng cách gửi header `Accept: application/json;v=1` từ Angular.
    *   **Lỗi `307 Temporary Redirect` trong Docker**: `app.UseHttpsRedirection()` trong `Program.cs` đã gây redirect loop khi API chạy sau Nginx. Comment dòng này khi chạy trong Docker.

---

## 6. Triển Khai Tính Năng Đăng Nhập (Authentication)

Để bảo mật ứng dụng và các request yêu cầu `[Authorize]`.

*   **`AuthService` (`src/DevHabit.Web/src/app/services/auth.service.ts`)**: Quản lý login, logout, lưu/lấy `accessToken` từ `localStorage`.
*   **`AuthInterceptor` (`src/DevHabit.Web/src/app/interceptors/auth.interceptor.ts`)**: Tự động thêm header `Authorization: Bearer <token>` vào mọi request đi. Đăng ký trong `app.config.ts`.
*   **`LoginComponent` (`src/DevHabit.Web/src/app/components/login/`)**: Giao diện đăng nhập, gọi `AuthService`, xử lý lỗi và chuyển hướng.
*   **Cấu hình Router (`src/DevHabit.Web/src/app/app.routes.ts`)**: Thêm path `/login`.
*   **`AppComponent` (`src/DevHabit.Web/src/app/app.component.ts`)**: Thêm thanh toolbar với nút Login/Logout.
*   **Backend**: Bỏ `[AllowAnonymous]` khỏi `GetHabits` trong `src/DevHabit.Api/Controllers/HabitsController.cs` để API yêu cầu đăng nhập.

---

Hy vọng file nhật ký này sẽ giúp bạn rất nhiều trong quá trình học tập và làm việc với dự án.
Bạn có thể đọc nó trên điện thoại sau khi đẩy lên GitHub hoặc qua Google Drive/Notes.
Chúc bạn thành công!
