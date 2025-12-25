# Nhật Ký Học Tập (Learning Log) - Backend (.NET API)

Đây là tài liệu tổng hợp quá trình xây dựng, kiến trúc và các vấn đề kỹ thuật liên quan đến phần Backend (ASP.NET Core) của dự án DevHabit.

---

## 1. Kiến Trúc & Công Nghệ

*   **Framework**: ASP.NET Core 8 Web API.
*   **Database**: PostgreSQL với Entity Framework Core.
    *   Sử dụng `snake_case` cho tên bảng/cột.
    *   Tách biệt `ApplicationDbContext` (nghiệp vụ) và `ApplicationIdentityDbContext` (Identity) nhưng dùng chung database.
*   **Authentication**: JWT Bearer Token + Identity.
    *   Access Token: 30 phút.
    *   Refresh Token: Lưu trong DB, có tính năng thu hồi (Logout).
*   **API Design**:
    *   **Versioning**: Hỗ trợ `v1`, `v2` qua header (`Accept`).
    *   **Data Shaping**: Cho phép client chọn trường trả về (`?fields=id,name`).
    *   **HATEOAS**: Trả về các link điều hướng (Self, Update, Delete...) trong response.
    *   **Sorting/Pagination**: Hỗ trợ sắp xếp và phân trang mềm dẻo.

---

## 2. Quy Trình Phát Triển & Refactoring

### A. Thiết lập ban đầu
*   Cấu hình `Program.cs` sử dụng Extension Methods (`AddApiServices`, `AddDatabase`...) để code gọn gàng.
*   Thiết lập `DependencyInjection.cs` để quản lý toàn bộ service container.
*   Xử lý lỗi tập trung bằng `ValidationExceptionHandler` (trả về ProblemDetails).

### B. Authentication (Quan trọng)
*   **Đăng ký (`Register`)**:
    *   Tạo User trong bảng Identity và bảng Users nghiệp vụ trong cùng 1 Transaction.
*   **Đăng nhập (`Login`)**:
    *   Sinh Access Token (JWT) và Refresh Token.
    *   Lưu Refresh Token vào bảng `refresh_tokens`.
*   **Làm mới Token (`Refresh`)**:
    *   Dùng Refresh Token để lấy Access Token mới khi cái cũ hết hạn.
*   **Đăng xuất (`Logout`)**:
    *   Xóa Refresh Token khỏi database để thu hồi quyền truy cập vĩnh viễn.

### C. Tính năng Habit & Tags
*   **Create Habit**:
    *   Cập nhật Logic để nhận danh sách `TagIds`.
    *   Tự động tạo các bản ghi trong bảng trung gian `HabitTags` ngay khi tạo Habit.
*   **Update Habit**:
    *   Xử lý đồng bộ Tags: Xóa tag cũ, thêm tag mới, giữ nguyên tag không đổi.
*   **Validation**:
    *   Sử dụng FluentValidation.
    *   Khắc phục lỗi validation độ dài chuỗi (ví dụ Description giới hạn 50 -> nâng lên 500).

---

## 3. Các Vấn Đề Kỹ Thuật Đã Giải Quyết

### Lỗi Cấu Hình & Logic
1.  **Lỗi Refresh Token không hoạt động**:
    *   *Nguyên nhân*: Sai chính tả `RefreshTokenExtirationDays` trong `appsettings.json` -> Giá trị về 0 -> Token hết hạn ngay lập tức.
    *   *Khắc phục*: Sửa lại tên biến và logic `AddMinutes` thành `AddDays`.
2.  **Lỗi `400 Bad Request` khi Create Habit**:
    *   *Nguyên nhân*: Controller nhận 2 tham số object (`CreateHabitDto` và `AcceptHeaderDto`) khiến Model Binder bị loạn.
    *   *Khắc phục*: Thêm `[FromBody]` vào trước `CreateHabitDto`.
3.  **Lỗi 500 tại API `/me`**:
    *   *Nguyên nhân*: Thiếu đăng ký `AddMemoryCache` cho `UserContext` và query sai cột ID (`IdentityId` vs `Id`).
    *   *Khắc phục*: Đăng ký service và sửa lại câu lệnh LINQ.

### Lỗi Docker & Mạng
1.  **Lỗi `307 Temporary Redirect`**:
    *   *Nguyên nhân*: Middleware `app.UseHttpsRedirection()` ép chuyển sang HTTPS nhưng Nginx trong Docker đang chạy HTTP nội bộ (port 80).
    *   *Khắc phục*: Comment dòng này khi chạy trong môi trường Docker/Dev.
2.  **Lỗi kết nối Docker Hub**:
    *   *Nguyên nhân*: Mạng chập chờn không pull được image.
    *   *Khắc phục*: Pull thủ công hoặc dùng Mirror.

### Tối ưu hóa Code
1.  **CancellationToken**: Thêm vào toàn bộ Controller và Service để hủy tác vụ khi client ngắt kết nối -> Tiết kiệm tài nguyên.
2.  **Roslynator Warnings**: Sửa các lỗi so sánh chuỗi (`ToLower() ==`) thành `string.Equals` hoặc `EF.Functions.ILike`.

---

## 4. Công Cụ Test
*   **Hurl**: Dùng để chạy Integration Test tự động (file `.hurl`).
*   **Kulala.nvim / REST Client**: Dùng để test nhanh API trong quá trình code (file `.http`). Đã cấu hình tự động bắt Access Token.
