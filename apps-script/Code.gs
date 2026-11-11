/**
 * Nơi lưu phản hồi giáo viên cho website "Khơi nguồn sáng tạo hoạt động ESL" (Phan Thị Quỳnh Trang).
 * Cách dùng: tạo Google Sheet mới → Tiện ích mở rộng → Apps Script → dán file này
 * → Triển khai → Tùy chọn triển khai mới → Ứng dụng web
 *   (Thực thi với tư cách: Tôi; Ai có quyền truy cập: Bất kỳ ai)
 * → sao chép URL /exec vào feedbackEndpoint trong index.html và games/*/index.html.
 * Email được ghi sang trang tính riêng "contacts" và không bao giờ trả về trình duyệt.
 */
var FB = "feedback", CT = "contacts";
function sheet_(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(head); }
  return sh;
}
function clamp_(v) { v = Number(v); return v >= 1 && v <= 5 ? Math.round(v) : ""; }
function doPost(e) {
  var d = {}; try { d = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false }); }
  if (!/^G\d{3}$/.test(String(d.game))) return out_({ ok: false });
  sheet_(FB, ["time", "game", "grade", "size", "country", "engagement", "ease", "goal", "adapt", "recommend", "lang"]).appendRow([
    new Date(), d.game, String(d.grade || "").slice(0, 40), Number(d.size) || "", String(d.country || "").slice(0, 20),
    clamp_(d.eng), clamp_(d.ease), clamp_(d.goal), String(d.adapt || "").slice(0, 400), String(d.rec || "").slice(0, 10), String(d.lang || "").slice(0, 2)]);
  if (d.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) sheet_(CT, ["time", "email", "game"]).appendRow([new Date(), String(d.email).slice(0, 120), d.game]);
  return out_({ ok: true });
}
function doGet(e) {
  var rows = sheet_(FB, ["time", "game", "grade", "size", "country", "engagement", "ease", "goal", "adapt", "recommend", "lang"]).getDataRange().getValues().slice(1);
  var agg = {};
  rows.forEach(function (r) {
    var g = r[1]; if (!r[5] || !r[6] || !r[7]) return;
    var a = agg[g] = agg[g] || { n: 0, eng: 0, ease: 0, goal: 0, rec: 0 };
    a.n++; a.eng += r[5]; a.ease += r[6]; a.goal += r[7]; if (r[9] === "yes") a.rec++;
  });
  Object.keys(agg).forEach(function (g) { var a = agg[g]; a.eng /= a.n; a.ease /= a.n; a.goal /= a.n; a.rec = Math.round(100 * a.rec / a.n); });
  return out_(agg);
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
