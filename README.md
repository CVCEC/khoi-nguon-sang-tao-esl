# Khơi nguồn sáng tạo hoạt động ESL

*Sparking Creativity in ESL Activities* — kho ý tưởng giúp thầy cô dạy tiếng Anh cho trẻ em sáng tạo, sinh động và giàu tương tác. Biên soạn: Phan Thị Quỳnh Trang · [www.trangphan.org](https://www.trangphan.org)

Website: https://esl.trangphan.org/

Website tĩnh, không cần máy chủ hay cơ sở dữ liệu. Biên soạn: Phan Thị Quỳnh Trang · www.trangphan.org

## Cấu trúc
```
index.html                 Trang chủ / thư viện / góc nhìn / tác giả (điều hướng bằng #)
games/<slug>/index.html    Trang riêng cho từng trò (tiêu đề, mô tả meta, JSON-LD riêng cho SEO)
assets/app.css, app.js     Template dùng chung (một template cho cả 90 trò)
data/games.csv             NGUỒN DỮ LIỆU — mỗi trò một dòng (website đọc file này)
data/games.xlsx            Cùng dữ liệu dạng Excel, có trang "huong_dan" giải thích từng cột
apps-script/Code.gs        Nơi lưu phản hồi giáo viên (Google Sheets)
```

## Đưa lên mạng
1. Tải toàn bộ thư mục lên hosting (hiện tại: GitHub Pages, tên miền esl.trangphan.org). Nếu dùng đường dẫn khác, sửa `SITE_URL` trong `scripts/build.py` rồi build lại (ảnh hưởng thẻ canonical).
2. Website phải chạy qua http(s) (không mở trực tiếp bằng file://) vì cần đọc `data/games.csv`.

## Bật form phản hồi bằng Google Form (khuyên dùng)
1. Tạo Google Form theo danh sách câu hỏi trong tin nhắn hướng dẫn (giữ nguyên các từ khóa trong tên câu hỏi: "Trò chơi", "hứng thú", "dễ tổ chức", "mục tiêu", "giới thiệu").
2. Lấy link điền sẵn (⋮ → Nhận đường liên kết điền sẵn) để biết mã `entry.xxxx` của câu "Trò chơi".
3. Điền vào `ESL_CONFIG.googleForm` = `{"url": "<link form>", "entryGame": "entry.xxxx"}`.
4. Để hiện điểm trung bình: trong trang tính phản hồi → Tệp → Chia sẻ → Xuất bản lên web → chọn trang "Câu trả lời" dạng CSV → dán link vào `googleSheetCsv`.

## Cách thay thế: Apps Script
1. Tạo một Google Sheet → Tiện ích mở rộng → Apps Script → dán `apps-script/Code.gs`.
2. Triển khai → Ứng dụng web → Thực thi: *Tôi*, Truy cập: *Bất kỳ ai* → sao chép URL kết thúc bằng `/exec`.
3. Trong `index.html` và mỗi `games/*/index.html`, điền URL vào `"feedbackEndpoint": ""`.
Khi chưa điền, form chạy ở chế độ xem thử (chỉ lưu trên trình duyệt).
Email giáo viên được ghi ở trang tính riêng `contacts` và không bao giờ hiển thị công khai.

## Thêm trò chơi mới (quy trình "Templating & Filling")
1. Mở `data/games.xlsx`, thêm một dòng, theo quy ước ở trang `huong_dan` (5 bước = 5 cảnh video).
2. Xuất trang `games` ra CSV (UTF-8) đè lên `data/games.csv`.
3. Chạy `python3 scripts/build.py` để tạo lại trang SEO cho trò mới.
   (Chỉ sửa nội dung trò đã có thì chỉ cần thay `games.csv`, không cần build.)

## Cần bổ sung
- Logo: hiện dùng chữ "QT" trên nền navy — có thể thay khối `<span class="logo">` trong `index.html`.
- Link Facebook: điền `"facebook"` trong `ESL_CONFIG`.
- Ảnh (thư mục `img/`): Reading is Fun và tập huấn giáo viên, đã có sự đồng ý của phụ huynh. Trang trò chơi dùng hình minh họa 2D tự vẽ cho đến khi có ảnh chụp đúng hoạt động.
- Video: giọng đọc tiếng Anh dùng giọng có sẵn của trình duyệt (Web Speech API); chất lượng giọng tùy thiết bị.
- Video sản xuất (nếu có): điền cột `link_video`; video 2D dựng sẵn vẫn hiển thị.

## Thư mục `source/`
Mã nguồn để build lại website: `source/src` (template, CSS, JS), `source/data/games.xlsx` và `games.csv` (dữ liệu), `source/scripts/build.py`.
Chạy `cd source && python3 scripts/build.py`, rồi chép nội dung `source/dist/site/` ra thư mục gốc của repo.

## Lời ghi nhận
Tác giả đã dừng công việc giảng dạy gần 5 năm, nên một số kiến thức có thể không còn cập nhật và một số hoạt động có thể không còn phù hợp. Thầy cô vui lòng tham khảo và cân nhắc trước khi sử dụng.
