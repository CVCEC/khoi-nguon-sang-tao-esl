/* Khơi nguồn sáng tạo hoạt động ESL — shared app (artifact + static site).
   Data source: games.csv (one row per game). Config: window.ESL_CONFIG. */
(function () {
  "use strict";
  var CFG = window.ESL_CONFIG || {};
  var MODE = CFG.mode || "static"; // "artifact" | "static"
  var TOTAL_PLANNED = 90;

  /* ---------------------------------------------------------------- i18n */
  var T = {
    vi: {
      site: "Khơi nguồn sáng tạo hoạt động ESL", siteAlt: "Sparking Creativity in ESL Activities",
      by: "Biên soạn: Phan Thị Quỳnh Trang", skip: "Bỏ qua, đến nội dung chính",
      nav_home: "Trang chủ", nav_lib: "Thư viện hoạt động", nav_persp: "Góc nhìn Canada–Việt Nam", nav_about: "Tác giả",
      hero_lede: "Kho ý tưởng cho thầy cô đang tìm cách dạy tiếng Anh cho trẻ em thật sáng tạo, sinh động và giàu tương tác. Mỗi hoạt động có video 2D hướng dẫn, giáo án theo khung Ontario, cách điều chỉnh cho lớp đông ở Việt Nam và phản hồi từ giáo viên đã dùng thử.",
      cta_lib: "Xem toàn bộ kho hoạt động", cta_persp: "Đọc góc nhìn Canada–Việt Nam",
      st_pub: "hoạt động đã xuất bản", st_plan: "hoạt động trong kế hoạch", st_phase: "giai đoạn thí điểm",
      phase: "GĐ 1",
      how_title: "Cách dùng website", how: [
        ["Lọc hoạt động", "Chọn kỹ năng, trình độ, khối lớp, thời lượng và sĩ số để tìm hoạt động phù hợp với tiết dạy."],
        ["Xem video 2D", "Video 60–90 giây mô phỏng từng bước; các bước đánh số bên dưới khớp với từng cảnh."],
        ["Xem giáo án", "Giáo án theo khung Ontario (xem trực tuyến): mục tiêu, tiêu chí “I can…”, Minds On, Action, Consolidation, phân hóa, đánh giá."],
        ["Cùng đóng góp", "Dùng thử trên lớp rồi chia sẻ phản hồi dưới 2 phút, để cùng nhau làm các hoạt động hoàn thiện hơn."]],
      about_proj: "Về dự án",
      proj_p: "Hơn 90 hoạt động trên website chỉ là một phần nhỏ còn lưu giữ lại từ những năm Phan Thị Quỳnh Trang dạy tiếng Anh tại Việt Nam. Website là nơi các hoạt động ấy được biến tấu, đặt trong sự giao thoa với kinh nghiệm làm việc cùng TESL Ontario, để thầy cô dùng được dù dạy 22 học sinh ở Toronto hay 45 học sinh ở Hà Nội.",
      featured: "Hoạt động nổi bật",
      lib_title: "Thư viện hoạt động", lib_lede: "Lọc theo nhu cầu tiết dạy. Mỗi thẻ dẫn đến trang chi tiết với video, giáo án và góc nhìn Việt Nam.",
      f_search: "Tìm theo tên", f_skill: "Kỹ năng", f_level: "Trình độ", f_grade: "Khối lớp / độ tuổi", f_time: "Thời lượng", f_size: "Sĩ số", f_dev: "Thiết bị",
      any: "Tất cả", t_short: "≤ 15 phút", t_mid: "16–30 phút", t_long: "> 30 phút",
      s_small: "Lớp nhỏ (≤ 25)", s_large: "Lớp đông (40+)", d_no: "Không cần thiết bị", d_yes: "Cần thiết bị",
      showing: function (n, m) { return "Hiển thị " + n + " / " + m + " hoạt động đã xuất bản · kế hoạch " + TOTAL_PLANNED + " hoạt động"; },
      none: "Chưa có hoạt động nào khớp bộ lọc. Hãy bỏ bớt một điều kiện.",
      skills: { "listening-speaking": "Nghe – Nói", reading: "Đọc", writing: "Viết", "vocab-grammar": "Từ vựng – Ngữ pháp", integrated: "Hoạt động tích hợp" },
      levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
      grades: { "1-3": "Lớp 1–3", "3-8": "Lớp 3–8", "4-8": "Lớp 4–8", "9-12": "Lớp 9–12", adult: "Người lớn" },
      min: "phút", students: "học sinh", noDevice: "Không cần thiết bị", device: "Cần thiết bị",
      sum_level: "Trình độ", sum_time: "Thời lượng", sum_size: "Sĩ số", sum_prep: "Chuẩn bị", sum_grade: "Khối lớp",
      b_align: "Phù hợp chương trình Ontario", align_title: "Ontario Curriculum Alignment",
      align_note: "Hoạt động này được thiết kế phù hợp với (aligned with) các kỳ vọng dưới đây; đây không phải sự phê duyệt chính thức của Bộ Giáo dục Ontario. Mã tham chiếu theo Language (2023), Lớp 4; mô tả có thể khác đôi chút theo khối lớp.",
      b_why: "Giá trị sư phạm", why_t: "The Why",
      b_video: "Video hướng dẫn 2D", b_steps: "Các bước",
      b_plan: "Giáo án theo khung Ontario", b_vn: "Góc nhìn ESL tại Việt Nam", b_tip: "Pro-tip", b_fb: "Phản hồi sau hoạt động",
      vn_cmp: "So sánh bối cảnh", col_crit: "Tiêu chí", col_on: "Ontario", col_vn: "Việt Nam",
      play: "Phát", pause: "Tạm dừng", restart: "Xem lại từ đầu", scene: "Cảnh", cc: "Phụ đề", cc_vi: "Tiếng Việt", cc_en: "English", cc_both: "Anh + Việt", cc_off: "Tắt",
      video_note: "Video 2D có giọng đọc tiếng Anh và phụ đề tiếng Việt (có thể chuyển sang tiếng Anh). Các bước đánh số bên dưới là bản ghi lời.",
      video_ext: "Xem video sản xuất (MP4/YouTube)",
      pdf: "Tải giáo án PDF", pdf_lang: "Bản tiếng Việt", pdf_saving: "Đang chuẩn bị tệp…", pdf_done: "Đã gửi tệp để lưu.", pdf_fail: "Không tải được PDF ở chế độ xem này.",
      tip_from: "Pro-tip from Phan Thị Quỳnh Trang",
      fb_lede: "Đây là không gian để thầy cô cùng đóng góp: mỗi phản hồi, mỗi cách điều chỉnh từ lớp học thật sẽ giúp các hoạt động hoàn thiện hơn cho cộng đồng giáo viên. Chỉ mất dưới 2 phút; không thu tên hay ảnh học sinh.",
      fb_game: "Hoạt động đã dùng", fb_grade: "Khối lớp", fb_size: "Sĩ số lớp", fb_country: "Quốc gia",
      c_ca: "Canada", c_vn: "Việt Nam", c_other: "Khác",
      fb_eng: "Học sinh hứng thú", fb_ease: "Dễ tổ chức", fb_goal: "Đạt mục tiêu bài học",
      lo: "1 = thấp", hi: "5 = cao",
      fb_adapt: "Bạn đã điều chỉnh gì?", fb_adapt_ph: "Ví dụ: chơi theo dãy bàn, rút còn 10 phút…",
      fb_rec: "Bạn có giới thiệu hoạt động này cho đồng nghiệp không?", yes: "Có", no: "Không", maybe: "Có thể",
      fb_email: "Email (tùy chọn) – nếu muốn nhận tài liệu mới",
      fb_priv: "Chúng tôi không thu thập tên hay ảnh học sinh. Phản hồi chỉ được dùng để cải thiện học liệu; email (nếu có) chỉ tác giả xem được.",
      fb_send: "Gửi phản hồi", fb_sending: "Đang gửi…", fb_thanks: "Cảm ơn bạn! Phản hồi đã được ghi nhận.",
      fb_need: "Vui lòng chọn đủ ba mức đánh giá và câu hỏi giới thiệu.",
      fb_err: "Chưa gửi được. Kiểm tra kết nối rồi thử lại.",
      fb_ro: "Chế độ xem này chỉ cho phép đọc. Hãy dùng nút Google Form để gửi phản hồi.",
      fb_demo: "Bản xem thử: phản hồi chỉ lưu trên trình duyệt này cho đến khi kết nối nơi lưu dữ liệu.",
      agg_title: "Giáo viên đánh giá", agg_n: function (n) { return n + " phản hồi"; }, agg_none: "Chưa có phản hồi. Hãy là người đầu tiên.",
      agg_rec: "sẽ giới thiệu",
      grade_opts: ["Mầm non / K", "Lớp 1–3", "Lớp 4–6", "Lớp 7–9", "Lớp 10–12", "Người lớn"],
      persp_title: "Góc nhìn tổng quan Canada – Việt Nam",
      persp_lede: "Những khác biệt xuyên suốt giữa lớp học ESL ở Ontario và lớp tiếng Anh theo Chương trình GDPT 2018, và điều mỗi bên có thể học từ bên kia.",
      about_title: "Về tác giả",
      back: "Thư viện", notfound: "Không tìm thấy trang này.", loading: "Đang tải dữ liệu…",
      in_page: "Trong trang này", footer_author: "Tác giả",
      foot_line: "Học liệu do Phan Thị Quỳnh Trang biên soạn.", ack_h: "Lời ghi nhận từ tác giả", ack: "Tôi đã dừng công việc giảng dạy gần 5 năm, nên một số kiến thức có thể không còn cập nhật và một số hoạt động có thể không còn phù hợp với lớp học hiện nay. Thầy cô vui lòng tham khảo và cân nhắc trước khi sử dụng.", nav_rif: "Teaching Projects", nav_gal: "Teaching Portfolio", nav_contact: "Liên hệ", voice_on: "Giọng đọc: bật", voice_off: "Giọng đọc: tắt", illus_cap: "Hình minh họa 2D",
      copied: "Đã sao chép", copy: "Sao chép",
      photos_t: "Từ lớp học thật: Reading is Fun", photos_l: "Học đọc qua truyện theo mô hình dự án (project-based learning).", photo_src: "Ảnh: Phan Thị Quỳnh Trang", rif_more: "Xem dự án Reading is Fun",
      gf_lede: "Góp ý qua Google Form (mở trong thẻ mới); tên hoạt động đã được điền sẵn.", gf_btn: "Mở form phản hồi"
    },
    en: {
      site: "Sparking Creativity in ESL Activities", siteAlt: "Khơi nguồn sáng tạo hoạt động ESL",
      by: "By Phan Thị Quỳnh Trang", skip: "Skip to main content",
      nav_home: "Home", nav_lib: "Activity library", nav_persp: "Canada–Vietnam perspective", nav_about: "Author",
      hero_lede: "A source of ideas for teachers looking for creative, engaging and interactive ways to teach English to children. Every activity has a 2D how-to video, an Ontario-style lesson plan, adaptations for large Vietnamese classes, and feedback from teachers who tried it.",
      cta_lib: "Browse the activity library", cta_persp: "Read the Canada–Vietnam perspective",
      st_pub: "activities published", st_plan: "activities planned", st_phase: "pilot phase",
      phase: "Ph. 1",
      how_title: "How to use this site", how: [
        ["Filter activities", "Choose skill, level, grade, time and class size to find an activity that fits your lesson."],
        ["Watch the 2D video", "A 60–90 second animation shows each step; the numbered steps below match each scene."],
        ["Read the plan", "An Ontario-style lesson plan to read online: goals, “I can…” criteria, Minds On, Action, Consolidation, differentiation and assessment."],
        ["Contribute", "Try it in class, then share feedback in under 2 minutes so that together we make the activities better."]],
      about_proj: "About the project",
      proj_p: "The 90-plus activities on this site are only a small part of what survives from Phan Thị Quỳnh Trang's years of teaching English in Vietnam. Here they are reworked where they meet her experience working with TESL Ontario, so teachers can use them whether they teach 22 students in Toronto or 45 in Hanoi.",
      featured: "Featured activities",
      lib_title: "Activity library", lib_lede: "Filter by what your lesson needs. Each card opens a page with the video, lesson plan and Vietnam perspective.",
      f_search: "Search by name", f_skill: "Skill", f_level: "Level", f_grade: "Grade / age", f_time: "Time", f_size: "Class size", f_dev: "Equipment",
      any: "Any", t_short: "≤ 15 min", t_mid: "16–30 min", t_long: "> 30 min",
      s_small: "Small (≤ 25)", s_large: "Large (40+)", d_no: "No equipment", d_yes: "Needs equipment",
      showing: function (n, m) { return "Showing " + n + " of " + m + " published activities · " + TOTAL_PLANNED + " planned"; },
      none: "No activities match these filters yet. Try removing one.",
      skills: { "listening-speaking": "Listening – Speaking", reading: "Reading", writing: "Writing", "vocab-grammar": "Vocabulary – Grammar", integrated: "Integrated activity" },
      levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
      grades: { "1-3": "Grades 1–3", "3-8": "Grades 3–8", "4-8": "Grades 4–8", "9-12": "Grades 9–12", adult: "Adults" },
      min: "min", students: "students", noDevice: "No equipment", device: "Needs equipment",
      sum_level: "Level", sum_time: "Time", sum_size: "Class size", sum_prep: "Preparation", sum_grade: "Grades",
      b_align: "Ontario alignment", align_title: "Ontario Curriculum Alignment",
      align_note: "This activity is aligned with the expectations below; it is not an official approval by the Ontario Ministry of Education. Codes refer to Language (2023), Grade 4; wording varies slightly by grade.",
      b_why: "The Why", why_t: "The Why",
      b_video: "2D how-to video", b_steps: "Steps",
      b_plan: "Lesson plan (Ontario format)", b_vn: "Vietnam Classroom Perspective", b_tip: "Pro-tip", b_fb: "Post-activity feedback",
      vn_cmp: "Context comparison", col_crit: "Factor", col_on: "Ontario", col_vn: "Vietnam",
      play: "Play", pause: "Pause", restart: "Restart", scene: "Scene", cc: "Subtitles", cc_vi: "Tiếng Việt", cc_en: "English", cc_both: "EN + VI", cc_off: "Off",
      video_note: "2D video with English narration and Vietnamese subtitles (switchable to English). The numbered steps below are the transcript.",
      video_ext: "Watch the produced video (MP4/YouTube)",
      pdf: "Download lesson plan (PDF)", pdf_lang: "English version", pdf_saving: "Preparing file…", pdf_done: "File sent to save.", pdf_fail: "The PDF can't be downloaded in this view.",
      tip_from: "Pro-tip from Phan Thị Quỳnh Trang",
      fb_lede: "This is a shared space for teachers to contribute: every piece of feedback and every adaptation from a real classroom helps make these activities better for the whole teaching community. It takes under 2 minutes; no student names or photos.",
      fb_game: "Activity used", fb_grade: "Grade", fb_size: "Class size", fb_country: "Country",
      c_ca: "Canada", c_vn: "Vietnam", c_other: "Other",
      fb_eng: "Student engagement", fb_ease: "Ease of setup", fb_goal: "Learning goal met",
      lo: "1 = low", hi: "5 = high",
      fb_adapt: "What did you adapt?", fb_adapt_ph: "e.g. played by rows, cut to 10 minutes…",
      fb_rec: "Would you recommend this activity to a colleague?", yes: "Yes", no: "No", maybe: "Maybe",
      fb_email: "Email (optional) – to receive new materials",
      fb_priv: "We never collect student names or photos. Responses are used only to improve these materials; your email (if given) is seen only by the author.",
      fb_send: "Send feedback", fb_sending: "Sending…", fb_thanks: "Thank you! Your feedback was recorded.",
      fb_need: "Please choose all three ratings and the recommendation question.",
      fb_err: "Not sent. Check your connection and try again.",
      fb_ro: "This view is read-only. Use the Google Form button to send feedback.",
      fb_demo: "Preview: feedback is kept only in this browser until a data store is connected.",
      agg_title: "Teacher ratings", agg_n: function (n) { return n + (n === 1 ? " response" : " responses"); }, agg_none: "No feedback yet. Be the first.",
      agg_rec: "would recommend",
      grade_opts: ["Kindergarten", "Grades 1–3", "Grades 4–6", "Grades 7–9", "Grades 10–12", "Adults"],
      persp_title: "Canada – Vietnam overview",
      persp_lede: "The recurring differences between Ontario ESL classrooms and English classes under Vietnam's 2018 General Education Programme, and what each side can learn from the other.",
      about_title: "About the author",
      back: "Library", notfound: "Page not found.", loading: "Loading data…",
      in_page: "On this page", footer_author: "Author",
      foot_line: "Materials written by Phan Thị Quỳnh Trang.", ack_h: "A note from the author", ack: "I stepped away from classroom teaching nearly five years ago, so some of the knowledge here may be out of date and some activities may no longer suit today's classrooms. Please treat them as a reference and consider them carefully before use.", nav_rif: "Teaching Projects", nav_gal: "Teaching Portfolio", nav_contact: "Contact", voice_on: "Voice: on", voice_off: "Voice: off", illus_cap: "2D illustration",
      copied: "Copied", copy: "Copy",
      photos_t: "From real classrooms: Reading is Fun", photos_l: "Learning to read through stories, as a project-based learning programme.", photo_src: "Photos: Phan Thị Quỳnh Trang", rif_more: "See the Reading is Fun project",
      gf_lede: "Share your feedback through the Google Form (opens in a new tab); the activity name is already filled in.", gf_btn: "Open the feedback form"
    }
  };
  var lang = "vi";
  try { lang = localStorage.getItem("esl_lang") || ""; } catch (e) {}
  if (!lang) lang = /^en/i.test(navigator.language || "") ? "en" : "vi";
  if (lang !== "en" && lang !== "vi") lang = "vi";
  function t(k) { return T[lang][k]; }

  /* ---------------------------------------------------------------- utils */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function range(s) { var m = String(s || "").match(/(\d+)\s*[-–]\s*(\d+)/); if (m) return [+m[1], +m[2]]; var n = parseInt(s, 10); return isNaN(n) ? [0, 0] : [n, n]; }
  function list(s) { return String(s || "").split(";").map(function (x) { return x.trim(); }).filter(Boolean); }
  function lines(s) { return String(s || "").split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function L(g, key) { return g[key][lang] || g[key].vi || g[key].en || ""; }

  function parseCSV(text) {
    var rows = [], row = [], f = "", q = false, i = 0, c;
    text = text.replace(/^﻿/, "");
    for (; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
      else f += c;
    }
    if (f.length || row.length) { row.push(f); rows.push(row); }
    var head = rows.shift() || [];
    return rows.filter(function (r) { return r.join("").trim(); }).map(function (r) { var o = {}; head.forEach(function (h, j) { o[h.trim()] = r[j] || ""; }); return o; });
  }
  function sections(s) {
    var out = [], cur = null;
    lines(s).forEach(function (ln) {
      if (ln.indexOf("## ") === 0) { cur = { h: ln.slice(3), items: [], rows: [] }; out.push(cur); }
      else if (cur) { if (ln.indexOf("- ") === 0) cur.items.push(ln.slice(2)); else if (ln.indexOf("|") > -1) cur.rows.push(ln.split("|").map(function (x) { return x.trim(); })); else cur.items.push(ln); }
    });
    return out;
  }
  function steps(s) { return lines(s).map(function (ln) { var p = ln.split("::"); return { title: (p[0] || "").trim(), desc: (p.slice(1).join("::") || "").trim() }; }); }
  function bi(r, k) { return { en: r[k + "_EN"] || "", vi: r[k + "_VI"] || "" }; }

  function normalize(r) {
    return {
      id: r.id, slug: r.slug, status: r.status || "pilot",
      name: bi(r, "ten"), skills: list(r.ky_nang), levels: list(r.trinh_do), step: r.step_level, cefr: r.cefr,
      grades: list(r.khoi_lop), time: range(r.thoi_luong), size: range(r.si_so), device: /^(yes|co|có|true|1)$/i.test(r.thiet_bi || ""),
      prep: bi(r, "chuan_bi"), mode: r.kieu_video || "mingle",
      program: r.ontario_program, strand: r.ontario_strand,
      exp: lines(r.ontario_expectation).map(function (ln) { var p = ln.split("|").map(function (x) { return x.trim(); }); return { code: p[0], title: p[1] || "", desc: p[2] || "" }; }),
      why: bi(r, "the_why"),
      steps: { en: steps(r.cac_buoc_EN), vi: steps(r.cac_buoc_VI) },
      plan: { en: sections(r.giao_an_EN), vi: sections(r.giao_an_VI) },
      vn: { en: sections(r.goc_nhin_VN_EN), vi: sections(r.goc_nhin_VN_VI) },
      tip: bi(r, "pro_tip"), video: r.link_video, meta: bi(r, "meta"), photo: r.anh || "", alt: bi(r, "anh_alt"), photoSrc: r.anh_nguon || "", source: r.nguon || "",
      illBoard: r.minh_hoa_bang || "", illLines: (r.minh_hoa_loi || "").split("|").map(function (x) { return x.trim(); }).filter(Boolean), illCards: (r.minh_hoa_the || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean)
    };
  }
  var GAMES = [];
  function bySlug(s) { for (var i = 0; i < GAMES.length; i++) if (GAMES[i].slug === s) return GAMES[i]; return null; }

  /* ---------------------------------------------------------------- feedback stores */
  var Store = (function () {
    var subs = {}, data = {}, stats = {}, ready = null, mode = "none", db = null, uid = null;
    function emit() { Object.keys(subs).forEach(function (gid) { subs[gid].forEach(function (fn) { fn(agg(gid)); }); }); }
    function agg(gid) {
      var arr = data[gid] || [], n = arr.length, s = { n: n, eng: 0, ease: 0, goal: 0, rec: 0 };
      arr.forEach(function (r) { s.eng += +r.eng || 0; s.ease += +r.ease || 0; s.goal += +r.goal || 0; if (r.rec === "yes") s.rec++; });
      var x = stats[gid];
      if (x && x.n) { s.eng += x.eng * x.n; s.ease += x.ease * x.n; s.goal += x.goal * x.n; s.rec += (x.rec / 100) * x.n; n += x.n; s.n = n; }
      if (n) { s.eng /= n; s.ease /= n; s.goal /= n; s.rec = Math.round(100 * s.rec / n); }
      return s;
    }
    function lsGet() { try { return JSON.parse(localStorage.getItem("esl_fb_demo") || "{}"); } catch (e) { return {}; } }
    function lsSet(v) { try { localStorage.setItem("esl_fb_demo", JSON.stringify(v)); } catch (e) {} }
    function init() {
      if (ready) return ready;
      ready = (async function () {
        if (MODE === "artifact" && window.claude && window.claude.use) {
          try {
            db = await window.claude.use("db");
            var user = await window.claude.use("user");
            uid = user ? await user.id() : null;
            if (db) {
              mode = "db";
              var timer = setTimeout(function () { emit(); }, 10000);
              db.collection("feedback").onSnapshot(function (snap) {
                clearTimeout(timer); data = {};
                snap.docs.forEach(function (d) { var v = d.data() || {}; Object.keys(v.r || {}).forEach(function (gid) { (data[gid] = data[gid] || []).push(v.r[gid]); }); });
                emit();
              }, function () { clearTimeout(timer); emit(); });
              db.collection("stats").onSnapshot(function (snap) { stats = {}; snap.docs.forEach(function (d) { stats[d.id] = d.data() || {}; }); emit(); }, function () {});
              return;
            }
          } catch (e) {}
          mode = "readonly"; return;
        }
        if (CFG.googleSheetCsv) {
          mode = "sheet";
          try { stats = sheetStats(parseCSV(await (await fetch(CFG.googleSheetCsv)).text())); } catch (e) {}
          emit(); return;
        }
        if (CFG.feedbackEndpoint) {
          mode = "remote";
          try {
            var res = await fetch(CFG.feedbackEndpoint + (CFG.feedbackEndpoint.indexOf("?") > -1 ? "&" : "?") + "summary=1");
            var js = await res.json(); data = {};
            Object.keys(js || {}).forEach(function (gid) { data[gid] = { __agg: js[gid] }; });
          } catch (e) {}
          emit(); return;
        }
        mode = "demo"; data = lsGet(); emit();
      })();
      return ready;
    }
    var aggOrig = agg;
    agg = function (gid) { var d = data[gid]; if (d && d.__agg) return d.__agg; return aggOrig(gid); };
    return {
      mode: function () { return mode; },
      ready: function () { return init(); },
      subscribe: function (gid, fn) { (subs[gid] = subs[gid] || []).push(fn); init().then(function () { fn(agg(gid)); }); },
      unsubscribeAll: function () { subs = {}; },
      save: async function (gid, resp, email) {
        await init();
        if (mode === "db") {
          if (!uid) throw new Error("no-user");
          var ref = db.doc("feedback/" + uid), snap = await ref.get(), cur = snap.exists ? (snap.data() || {}) : {};
          var r = Object.assign({}, cur.r || {}); r[gid] = resp;
          await ref.set({ r: r, updated: new Date().toISOString() });
          if (email) { try { var cref = db.doc("contacts/" + uid), cs = await cref.get(), cc = cs.exists ? cs.data() : {}; var gl = (cc.games || []).filter(function (x) { return x !== gid; }).concat([gid]); await cref.set({ email: email, games: gl, updated: new Date().toISOString() }); } catch (e) {} }
          return;
        }
        if (mode === "remote") {
          await fetch(CFG.feedbackEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(Object.assign({ game: gid, email: email || "" }, resp)) });
          var cur2 = (data[gid] && data[gid].__agg) || { n: 0, eng: 0, ease: 0, goal: 0, rec: 0 };
          var n = cur2.n + 1;
          data[gid] = { __agg: { n: n, eng: (cur2.eng * cur2.n + resp.eng) / n, ease: (cur2.ease * cur2.n + resp.ease) / n, goal: (cur2.goal * cur2.n + resp.goal) / n, rec: Math.round(((cur2.rec / 100) * cur2.n + (resp.rec === "yes" ? 1 : 0)) / n * 100) } };
          emit(); return;
        }
        if (mode === "demo") { var all = lsGet(); (all[gid] = all[gid] || []).push(resp); lsSet(all); data = all; emit(); return; }
        throw new Error("readonly");
      }
    };
  })();

  /* Google Form responses (published CSV) → averages per game. Headers are matched by keyword. */
  function sheetStats(rows) {
    var out = {}; if (!rows.length) return out;
    var keys = Object.keys(rows[0]);
    function col(re) { for (var i = 0; i < keys.length; i++) if (re.test(keys[i].toLowerCase())) return keys[i]; return null; }
    var cg = col(/hoạt động|game/), ce = col(/hứng thú|engagement/), ca = col(/dễ tổ chức|ease/), co = col(/mục tiêu|goal/), cr = col(/giới thiệu|recommend/);
    rows.forEach(function (r) {
      var name = String(r[cg] || "").toLowerCase(), g = null;
      GAMES.forEach(function (x) { if (name && (name.indexOf(x.name.en.toLowerCase()) > -1 || name.indexOf(x.name.vi.toLowerCase().replace("…", "")) > -1 || name.indexOf(x.id.toLowerCase()) > -1)) g = x; });
      var e = parseFloat(r[ce]), a = parseFloat(r[ca]), o = parseFloat(r[co]); if (!g || !e || !a || !o) return;
      var s = out[g.id] = out[g.id] || { n: 0, eng: 0, ease: 0, goal: 0, rec: 0 };
      s.n++; s.eng += e; s.ease += a; s.goal += o; if (/^(yes|có(?!\s*thể))/i.test(String(r[cr] || "").trim())) s.rec++;
    });
    Object.keys(out).forEach(function (k) { var s = out[k]; s.eng /= s.n; s.ease /= s.n; s.goal /= s.n; s.rec = Math.round(100 * s.rec / s.n); });
    return out;
  }

  /* ---------------------------------------------------------------- English narration (Claude voice in the artifact, browser voice elsewhere) */
  var Voice = (function () {
    var tts = null, ready = null, synthVoice = null, mode = "none";
    function score(v) { return (/en[-_](US|GB|CA)/i.test(v.lang) ? 2 : 0) + (/Google|Natural|Samantha|Aria|Jenny|Daniel/i.test(v.name) ? 2 : 0); }
    function init() {
      if (ready) return ready;
      ready = (async function () {
        if (window.claude && window.claude.use) { try { tts = await window.claude.use("tts"); } catch (e) { tts = null; } if (tts) { mode = "tts"; return; } }
        if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
          mode = "synth";
          var pick = function () { var vs = speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); }); vs.sort(function (a, b) { return score(b) - score(a); }); synthVoice = vs[0] || null; };
          pick(); try { speechSynthesis.addEventListener("voiceschanged", pick); } catch (e) {}
        }
      })();
      return ready;
    }
    return {
      init: init, mode: function () { return mode; },
      speak: async function (text) {
        await init();
        var guard = new Promise(function (res) { setTimeout(res, 3000 + text.length * 95); });
        return Promise.race([guard, this._speak(text)]);
      },
      _speak: function (text) {
        if (mode === "tts") return tts.speak(text, { language: "en", voice: "airy", rate: 0.95 });
        if (mode !== "synth") return Promise.resolve();
        if (mode === "synth") return new Promise(function (res) {
          speechSynthesis.cancel(); var parts = text.match(/[^.!?]+[.!?]*/g) || [text], i = 0;
          (function next() { if (i >= parts.length) return res(); var u = new SpeechSynthesisUtterance(parts[i++].trim()); u.lang = "en-US"; if (synthVoice) u.voice = synthVoice; u.rate = 0.95; u.onend = next; u.onerror = function () { res(); }; speechSynthesis.speak(u); })();
        });
      },
      stop: function () { try { if (mode === "tts") tts.stop(); else if (mode === "synth") speechSynthesis.cancel(); } catch (e) {} },
      pause: function () { try { if (mode === "tts") tts.pause(); else if (mode === "synth") speechSynthesis.pause(); } catch (e) {} },
      resume: function () { try { if (mode === "tts") tts.resume(); else if (mode === "synth") speechSynthesis.resume(); } catch (e) {} }
    };
  })();

  /* ---------------------------------------------------------------- 2D video */
  var SCENE_SEC = 15;
  var PAL = ["#e07a5f", "#3d8b7d", "#f2b134", "#6c8ebf", "#b56576", "#81b29a", "#e5989b", "#5e6c9c"];
  var SEATS = [[150, 262], [240, 262], [400, 262], [490, 262], [150, 304], [240, 304], [400, 304], [490, 304]];
  var GROUPS = [[110, 270], [175, 278], [120, 310], [185, 314], [455, 270], [520, 278], [465, 310], [530, 314]];
  var BUBBLES = { mingle: ["Do you…?", "Yes, I do!"], relay: ["Can you spell that?", "Full stop!"], hotseat: ["It's a kind of…", "You use it to…"], pairs: ["Your turn!", "I think…"], board: ["Me!", "I know!"] };

  function figure(i, color, teacher) {
    var h = teacher ? 1.25 : 1;
    return '<g id="p' + i + '" class="fig">' +
      '<ellipse cx="0" cy="2" rx="' + (16 * h) + '" ry="4" fill="rgba(20,33,61,.12)"/>' +
      '<rect x="' + (-12 * h) + '" y="' + (-34 * h) + '" width="' + (24 * h) + '" height="' + (34 * h) + '" rx="' + (10 * h) + '" fill="' + color + '"/>' +
      '<line class="arm" x1="' + (9 * h) + '" y1="' + (-26 * h) + '" x2="' + (18 * h) + '" y2="' + (-12 * h) + '" stroke="' + color + '" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="0" cy="' + (-44 * h) + '" r="' + (11 * h) + '" fill="#f1c7a1"/>' +
      '<path d="M' + (-11 * h) + ' ' + (-46 * h) + ' a' + (11 * h) + ' ' + (11 * h) + ' 0 0 1 ' + (22 * h) + ' 0 z" fill="' + (teacher ? "#1b1b1b" : ["#2b2b2b", "#5a3825", "#1d1d1d", "#7b4a2a"][i % 4]) + '"/>' +
      (teacher ? '<rect x="-9" y="-32" width="18" height="5" rx="2" fill="#f6b93b"/>' : '') +
      '</g>';
  }
  function bubble(id) { return '<g id="' + id + '" opacity="0"><rect rx="10" height="30" fill="#ffffff" stroke="#1d6b41" stroke-width="1.5"/><path d="M14 30 l6 9 l4 -9z" fill="#ffffff" stroke="#1d6b41" stroke-width="1.5"/><path d="M15 29 h10" stroke="#ffffff" stroke-width="3"/><text x="10" y="20" font-family="Open Sans,Arial,sans-serif" font-size="13" font-weight="600" fill="#1d6b41"></text></g>'; }

  function Player(root, game) {
    var st = game.steps[lang].length ? game.steps : { en: game.steps.en, vi: game.steps.en };
    var N = Math.min(5, (st.en.length || st.vi.length)) || 5;
    var dur = N * SCENE_SEC, time = 0, playing = false, last = 0, raf = 0, capMode = "vi", curScene = -1, osc = 0, speaking = false, speakId = 0, voiceOn = true, held = false;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var stepsCur = function () { return st[lang] && st[lang].length ? st[lang] : st.en; };

    var svg = '<svg viewBox="0 0 640 360" role="img" aria-label="' + esc(L(game, "name")) + ' – 2D">' +
      '<rect width="640" height="360" fill="#eef9f0"/><rect y="236" width="640" height="124" fill="#dfe5ef"/>' +
      '<rect x="0" y="232" width="640" height="6" fill="#c9d2e1"/>' +
      '<rect x="180" y="34" width="280" height="140" rx="6" fill="#203a43"/><rect x="180" y="34" width="280" height="140" rx="6" fill="none" stroke="#8a6d3b" stroke-width="6"/>' +
      '<text id="bd1" x="320" y="78" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="17" font-weight="700" fill="#ffffff"></text>' +
      '<text id="bd2" x="320" y="106" text-anchor="middle" font-family="Open Sans,Arial,sans-serif" font-size="13" fill="#cfe3d8"></text>' +
      '<text id="bd3" x="320" y="146" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="22" fill="#f2c14e"></text>' +
      '<g id="wall" opacity="0"><rect x="30" y="110" width="58" height="76" fill="#fff" stroke="#9aa6bb"/><rect x="552" y="110" width="58" height="76" fill="#fff" stroke="#9aa6bb"/>' +
      '<path d="M38 124h42M38 134h42M38 144h36M38 154h42M38 164h30M560 124h42M560 134h42M560 144h36M560 154h42M560 164h30" stroke="#9aa6bb" stroke-width="2"/></g>' +
      '<g id="chair" opacity="0"><rect x="296" y="236" width="48" height="10" rx="3" fill="#8a6d3b"/><rect x="300" y="246" width="6" height="26" fill="#8a6d3b"/><rect x="334" y="246" width="6" height="26" fill="#8a6d3b"/><rect x="294" y="196" width="52" height="10" rx="3" fill="#a07f45"/></g>' +
      '<g id="desks">' + [150, 240, 400, 490].map(function (x) { return '<rect x="' + (x - 34) + '" y="270" width="68" height="8" rx="3" fill="#b9c3d4"/><rect x="' + (x - 34) + '" y="312" width="68" height="8" rx="3" fill="#b9c3d4"/>'; }).join("") + '</g>' +
      PAL.map(function (c, i) { return figure(i, c, false); }).join("") + figure(8, "#1d6b41", true) +
      bubble("b0") + bubble("b1") + bubble("bt") +
      '<text id="sc" x="16" y="26" font-family="Montserrat,Arial,sans-serif" font-size="12" font-weight="700" fill="#56627a"></text>' +
      '</svg>';

    root.innerHTML =
      '<div class="player"><div class="stage">' + svg + '<div class="cap" aria-live="polite"></div></div>' +
      '<div class="controls">' +
      '<button type="button" class="ctl" data-a="play" aria-label="' + t("play") + '"></button>' +
      '<button type="button" class="ctl voice" data-a="voice" aria-pressed="true"></button>' +
      '<button type="button" class="ctl" data-a="restart" aria-label="' + t("restart") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/></svg></button>' +
      '<div class="prog">' + Array.apply(null, Array(N)).map(function (_, i) { return '<button type="button" data-s="' + i + '" aria-label="' + t("scene") + " " + (i + 1) + '"><i><b></b></i></button>'; }).join("") + '</div>' +
      '<span class="time">0:00 / ' + fmt(dur) + '</span>' +
      '<label class="sr" style="display:flex;align-items:center;gap:6px;font-size:.8rem;color:var(--muted)">' + t("cc") +
      ' <select class="capsel" aria-label="' + t("cc") + '"><option value="vi">' + t("cc_vi") + '</option><option value="en">' + t("cc_en") + '</option><option value="both">' + t("cc_both") + '</option><option value="off">' + t("cc_off") + '</option></select></label>' +
      '</div></div>' +
      '<p class="msg" style="margin-top:8px">' + t("video_note") + '</p>' +
      (game.video ? '<p class="vlink"><a href="' + esc(game.video) + '" target="_blank" rel="noopener">' + t("video_ext") + ' ↗</a></p>' : '') +
      '<ol class="steps">' + stepsCur().slice(0, N).map(function (s, i) { return '<li><button type="button" data-s="' + i + '"><div><b>' + esc(s.title) + '</b><span>' + esc(s.desc) + '</span></div></button></li>'; }).join("") + '</ol>';

    var S = root.querySelector("svg"), cap = $(".cap", root), btn = $('[data-a="play"]', root), sel = $(".capsel", root), tm = $(".time", root);
    sel.value = capMode;
    var P = []; for (var i = 0; i <= 8; i++) P.push(S.getElementById ? S.getElementById("p" + i) : S.querySelector("#p" + i));
    function q(id) { return S.querySelector("#" + id); }
    function fmt(s) { s = Math.floor(s); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function ease(k) { k = Math.max(0, Math.min(1, k)); return k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; }
    function place(i, x, y, arm) {
      P[i].setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")");
      var a = P[i].querySelector(".arm"); var h = i === 8 ? 1.25 : 1;
      if (arm) { a.setAttribute("x2", (12 * h).toFixed(1)); a.setAttribute("y2", (-58 * h).toFixed(1)); } else { a.setAttribute("x2", (18 * h).toFixed(1)); a.setAttribute("y2", (-12 * h).toFixed(1)); }
    }
    function say(id, x, y, text, show) {
      var g = q(id); g.setAttribute("opacity", show ? 1 : 0); if (!show) return;
      var tx = g.querySelector("text"); if (tx.textContent !== text) tx.textContent = text;
      var w = Math.min(300, 20 + text.length * 7.2); g.querySelector("rect").setAttribute("width", w);
      g.setAttribute("transform", "translate(" + Math.max(6, Math.min(634 - w, x - 18)).toFixed(0) + " " + (y - 108) + ")");
    }
    function quoteOf(s) { var m = (s.desc || "").match(/["“]([^"”]{3,48})["”]/); return m ? m[1] : s.title; }
    function wrapText(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + "…" : s; }

    function render() {
      var sc = Math.min(N - 1, Math.floor(time / SCENE_SEC)), k = (time - sc * SCENE_SEC) / SCENE_SEC, tt = reduce ? 0.6 * SCENE_SEC : osc;
      var kk = reduce ? 0.6 : k, s = stepsCur()[sc] || { title: "", desc: "" }, mode = game.mode;
      var grouped = mode !== "mingle";
      q("sc").textContent = t("scene") + " " + (sc + 1) + "/" + N;
      q("bd1").textContent = wrapText(L(game, "name"), 30);
      q("bd2").textContent = (sc + 1) + ". " + wrapText(s.title, 36);
      q("bd3").textContent = sc === N - 1 ? "✓ ✓ ✓" : (mode === "hotseat" && sc >= 2 ? "UMBRELLA" : (game.illCards.length && sc >= 1 ? game.illCards.slice(0, 4).join("  ") : ""));
      q("wall").setAttribute("opacity", mode === "relay" && sc >= 1 && sc < N - 1 ? 1 : (mode === "relay" && sc === 0 ? ease(kk * 2) : 0));
      q("chair").setAttribute("opacity", mode === "hotseat" && sc < N - 1 ? (sc === 0 ? ease(kk * 2) : 1) : 0);
      q("desks").setAttribute("opacity", 1);
      var bub0 = false, bub1 = false, bt = false, teach = [320, 232], tArm = false;
      for (var i = 0; i < 8; i++) {
        var seat = SEATS[i], grp = GROUPS[i], x = seat[0], y = seat[1], arm = false;
        if (sc === 0) { // setup / grouping
          teach = [lerp(130, 200, ease(kk)), 232];
          if (grouped) { var g = ease((kk - 0.35) / 0.5); x = lerp(seat[0], grp[0], g); y = lerp(seat[1], grp[1], g); }
        } else if (sc === 1) { // rules / modelling
          if (grouped) { x = grp[0]; y = grp[1]; }
          teach = [320, 238]; tArm = Math.sin(tt * 2.2) > 0.2; bt = true;
          arm = (i === 2 && kk > 0.55);
        } else if (sc === N - 1) { // wrap-up
          var back = ease(kk / 0.35); if (grouped) { x = lerp(grp[0], seat[0], back); y = lerp(grp[1], seat[1], back); }
          teach = [lerp(320, 200, back), 232]; arm = Math.sin(tt * 1.4 + i * 1.7) > 0.55 && kk > 0.3;
        } else { // play
          var ph = tt + (sc === 3 ? 7 : 0);
          if (mode === "mingle") {
            var pair = i ^ 1, cx = (SEATS[i][0] + SEATS[(i + 2 + sc) % 8][0]) / 2, cy = 290 + 22 * Math.sin(i + sc);
            var w = 0.5 + 0.5 * Math.sin(ph * 0.9 + i);
            x = lerp(seat[0], cx + (i % 2 ? 18 : -18), w); y = lerp(seat[1], cy, w);
            if (i === 0 && w > .7) bub0 = true; if (i === 5 && w > .7) bub1 = true;
          } else if (mode === "relay") {
            x = grp[0]; y = grp[1];
            if (i === 0 || i === 4) {
              var run = (Math.sin(ph * 0.75 + (i ? 1.2 : 0)) + 1) / 2, wx = i ? 560 : 80;
              x = lerp(grp[0], wx, ease(run)); y = lerp(grp[1], 222, ease(run));
              if (i === 0 && run < .2) bub0 = true;
            }
            if (i === 1 || i === 5) { y = grp[1] + Math.sin(ph * 6) * 1.2; if (i === 5 && sc === 3) bub1 = true; }
          } else if (mode === "hotseat") {
            if (i === 0) { x = 320; y = 262; }
            else { x = grp[0]; y = grp[1] + Math.abs(Math.sin(ph * 3 + i)) * -5; arm = (i === 1 || i === 6) && Math.sin(ph * 2 + i) > 0; }
            if (i === 1) bub0 = Math.sin(ph * 0.8) > -0.2; if (i === 6) bub1 = Math.sin(ph * 0.8) <= -0.2;
          } else if (mode === "floor") {
            var spot = [[150, 300], [250, 318], [360, 300], [470, 318], [200, 336], [310, 340], [420, 336], [530, 300]][(i + sc) % 8];
            var wf = 0.5 + 0.5 * Math.sin(ph * 0.7 + i * 1.3);
            x = lerp(grp[0], spot[0], wf); y = lerp(grp[1], spot[1], wf); arm = wf > 0.85 && i % 2 === 0;
            if (i === 0 && wf > .8) bub0 = true; if (i === 5 && wf > .8) bub1 = true;
          } else if (mode === "pairs") {
            var pr = Math.floor(i / 2), side = i % 2 ? 1 : -1, px = [150, 270, 390, 510][pr];
            x = px + side * 26; y = 300 + (pr % 2) * 18 + Math.sin(ph * 2 + i) * 1.5; arm = Math.sin(ph * 1.6 + pr) > 0.4 && i % 2 === 0;
            if (i === 0) bub0 = Math.sin(ph * 0.8) > -0.1; if (i === 5) bub1 = Math.sin(ph * 0.8) <= -0.1;
          } else {
            x = grp[0] + Math.sin(ph + i) * 6; y = grp[1] - Math.abs(Math.sin(ph * 2.5 + i)) * 3; arm = Math.sin(ph * 1.3 + i * 2) > 0.75;
            if (i === 1) bub0 = Math.sin(ph * 0.8) > -0.1; if (i === 6) bub1 = Math.sin(ph * 0.8) <= -0.1;
          }
          teach = [320 + Math.sin(ph * 0.35) * 150, 232];
        }
        if (reduce) arm = arm && i % 3 === 0;
        place(i, x, y, arm);
      }
      place(8, teach[0], teach[1], tArm);
      var B = game.illLines.length >= 2 ? game.illLines : (BUBBLES[game.mode] || BUBBLES.board);
      var p0 = P[0].getAttribute("transform").match(/[\d.]+/g), p1 = (game.mode === "hotseat" ? P[1] : P[0]).getAttribute("transform").match(/[\d.]+/g);
      if (game.mode === "hotseat") { var a1 = P[1].getAttribute("transform").match(/[\d.]+/g), a6 = P[6].getAttribute("transform").match(/[\d.]+/g); say("b0", +a1[0], +a1[1], B[0], bub0); say("b1", +a6[0], +a6[1], B[1], bub1); }
      else if (["mingle", "relay", "floor", "pairs"].indexOf(game.mode) > -1) { var pp = P[5].getAttribute("transform").match(/[\d.]+/g); say("b0", +p0[0], +p0[1], B[0], bub0); say("b1", +pp[0], +pp[1], B[1], bub1); }
      else { var q1 = P[1].getAttribute("transform").match(/[\d.]+/g), q6 = P[6].getAttribute("transform").match(/[\d.]+/g); say("b0", +q1[0], +q1[1], B[0], bub0); say("b1", +q6[0], +q6[1], B[1], bub1); }
      var bts = stepsCur()[1] || s; say("bt", teach[0], teach[1] - 12, wrapText(quoteOf(bts), 40), bt);
      // progress
      $$(".prog b", root).forEach(function (b, j) { b.style.width = (j < sc ? 100 : j > sc ? 0 : Math.round(k * 100)) + "%"; });
      tm.textContent = fmt(time) + " / " + fmt(dur);
      if (sc !== curScene) { curScene = sc; osc = time - sc * SCENE_SEC; if (playing) narrate(sc); setCaption(); $$(".steps button", root).forEach(function (b, j) { if (j === sc) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); }); }
    }
    function setCaption() {
      var sc = Math.max(0, curScene), en = (st.en[sc] || {}), vi = (st.vi[sc] || {}), html = "";
      if (capMode === "en" || capMode === "both") html += '<span lang="en">' + esc(en.desc || en.title || "") + '</span>';
      if (capMode === "vi" || capMode === "both") html += '<span class="vi" lang="vi">' + esc(vi.desc || vi.title || "") + '</span>';
      cap.innerHTML = html;
    }
    var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>', ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4.2" height="15" rx="1"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1"/></svg>';
    function setBtn() { btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY; btn.setAttribute("aria-label", playing ? t("pause") : t("play")); }
    function narrate(sc) {
      stopSpeech(); if (!voiceOn) return;
      var s = st.en[sc]; if (!s) return;
      var my = ++speakId; speaking = true;
      function fin() { if (my === speakId) speaking = false; }
      Voice.speak("Step " + (sc + 1) + ". " + s.title + ". " + s.desc).then(fin, fin);
    }
    function stopSpeech() { speakId++; speaking = false; held = false; Voice.stop(); }
    function loop(ts) {
      if (!playing) return; if (!last) last = ts;
      var dt = Math.min(0.1, (ts - last) / 1000); last = ts; osc += dt;
      var sc = Math.min(N - 1, Math.floor(time / SCENE_SEC)), end = (sc + 1) * SCENE_SEC, nt = time + dt;
      if (voiceOn && speaking && nt >= end - 0.05) nt = end - 0.05;
      time = nt;
      if (time >= dur - 0.06 && !speaking) { time = dur - 0.001; playing = false; setBtn(); }
      render(); if (playing) raf = requestAnimationFrame(loop);
    }
    function play() {
      if (time >= dur - 0.01) { time = 0; curScene = -1; }
      playing = true; last = 0; setBtn();
      if (held) { held = false; Voice.resume(); } else if (curScene >= 0) narrate(curScene);
      raf = requestAnimationFrame(loop);
    }
    function pause() { playing = false; cancelAnimationFrame(raf); setBtn(); if (speaking) { held = true; Voice.pause(); } }
    function seek(sc) { stopSpeech(); time = sc * SCENE_SEC + 0.01; curScene = -1; render(); }
    var vbtn = $('[data-a="voice"]', root);
    function setVoiceBtn() { vbtn.innerHTML = voiceOn ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/></svg>'; vbtn.setAttribute("aria-label", voiceOn ? t("voice_on") : t("voice_off")); vbtn.setAttribute("title", voiceOn ? t("voice_on") : t("voice_off")); vbtn.setAttribute("aria-pressed", voiceOn ? "true" : "false"); }
    vbtn.addEventListener("click", function () { voiceOn = !voiceOn; setVoiceBtn(); if (!voiceOn) stopSpeech(); else if (playing) narrate(curScene); });
    setVoiceBtn(); Voice.init();
    btn.addEventListener("click", function () { playing ? pause() : play(); });
    $('[data-a="restart"]', root).addEventListener("click", function () { seek(0); play(); });
    $$("[data-s]", root).forEach(function (b) { b.addEventListener("click", function () { seek(+b.getAttribute("data-s")); if (b.closest(".steps")) { root.querySelector(".stage").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }); } }); });
    sel.addEventListener("change", function () { capMode = sel.value; setCaption(); });
    setBtn(); render();
    return { destroy: function () { pause(); stopSpeech(); } };
  }

  /* ---------------------------------------------------------------- 2D illustrations (one per activity type) */
  function fig2(x, y, c, o) {
    o = o || {}; var s = (o.s || 1) * 1.5, hair = o.hair || "#2b2b2b", arm = o.arm || "down", back = o.back;
    var armPath = arm === "up" ? "M8 -26 L14 -60" : arm === "out" ? "M8 -26 L30 -30" : arm === "hold" ? "M8 -26 L16 -14 L4 -14" : "M9 -26 L18 -12";
    var arm2 = arm === "hold" ? '<path d="M-8 -26 L-14 -14 L-2 -14" stroke="' + c + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' : "";
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (o.flip ? -s : s) + ' ' + s + ')">' +
      '<ellipse cx="0" cy="2" rx="17" ry="4" fill="rgba(20,33,61,.12)"/>' +
      '<rect x="-12" y="-34" width="24" height="34" rx="10" fill="' + c + '"/>' +
      '<path d="' + armPath + '" stroke="' + c + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' + arm2 +
      '<circle cx="0" cy="-44" r="11" fill="#f1c7a1"/>' +
      (back ? '<circle cx="0" cy="-45" r="11.5" fill="' + hair + '"/>' : '<path d="M-11 -46 a11 11 0 0 1 22 0 z" fill="' + hair + '"/><circle cx="4" cy="-44" r="1.4" fill="#2b2b2b"/>') +
      (o.board ? '<g transform="translate(' + (arm === "hold" ? -9 : 6) + ' -24)"><rect width="18" height="22" rx="2" fill="#fff" stroke="#9aa6bb"/><path d="M3 7h12M3 12h12M3 17h8M8 3v17M13 3v17" stroke="#c9d2e1" stroke-width="1.2"/></g>' : '') +
      '</g>';
  }
  function bub(x, y, txt, o) {
    o = o || {}; var w = Math.min(260, 22 + txt.length * 7.1), left = o.left;
    var bx = left ? x - w + 20 : x - 20;
    return '<g><rect x="' + bx + '" y="' + (y - 34) + '" width="' + w + '" height="28" rx="10" fill="#fff" stroke="#1d6b41" stroke-width="1.5"/>' +
      '<path d="M' + (x - 4) + ' ' + (y - 7) + ' l4 9 l6 -9z" fill="#fff" stroke="#1d6b41" stroke-width="1.5" stroke-linejoin="round"/><path d="M' + (x - 5) + ' ' + (y - 7.5) + ' h12" stroke="#fff" stroke-width="3"/>' +
      '<text x="' + (bx + 10) + '" y="' + (y - 15) + '" font-family="Open Sans,Arial,sans-serif" font-size="12.5" font-weight="600" fill="#1d6b41">' + esc(txt) + '</text></g>';
  }
  function room(boardTitle, boardLine, extra) {
    return '<rect width="640" height="400" fill="#eef9f0"/><rect y="262" width="640" height="138" fill="#dfe5ef"/><rect y="258" width="640" height="6" fill="#c9d2e1"/>' +
      '<rect x="190" y="30" width="260" height="128" rx="6" fill="#203a43"/><rect x="190" y="30" width="260" height="128" rx="6" fill="none" stroke="#8a6d3b" stroke-width="6"/>' +
      '<text x="320" y="68" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="18" font-weight="800" fill="#fff">' + esc(boardTitle) + '</text>' +
      '<text x="320" y="96" text-anchor="middle" font-family="Open Sans,Arial,sans-serif" font-size="13" fill="#cfe3d8">' + esc(boardLine) + '</text>' + (extra || "");
  }
  function illus(g) {
    var P = PAL, svg;
    if (g.mode === "relay") {
      svg = room("Running Dictation", "Runner reads · Writer writes · swap every 2 lines",
        '<text x="320" y="136" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="15" fill="#f2c14e">Runner ≠ Writer</text>') +
        '<g><rect x="26" y="112" width="96" height="120" fill="#fff" stroke="#9aa6bb"/><text x="36" y="132" font-family="Montserrat,Arial,sans-serif" font-size="10" font-weight="700" fill="#1d6b41">THE BIG RED BUS</text>' +
        [0, 1, 2, 3, 4, 5].map(function (i) { return '<text x="34" y="' + (152 + i * 13) + '" font-family="Open Sans,Arial,sans-serif" font-size="9" fill="#56627a">' + (i + 1) + '.</text><path d="M46 ' + (149 + i * 13) + 'h' + (66 - (i % 3) * 10) + '" stroke="#9aa6bb" stroke-width="2"/>'; }).join("") + '</g>' +
        fig2(150, 300, P[0], { arm: "out", flip: true, hair: "#5a3825" }) +
        '<path d="M298 286h-26M302 296h-34M298 306h-22" stroke="#9aa6bb" stroke-width="2.5" stroke-linecap="round"/>' + fig2(330, 312, P[3], { arm: "out" }) +
        '<rect x="430" y="300" width="150" height="10" rx="3" fill="#b9c3d4"/><rect x="440" y="310" width="6" height="34" fill="#b9c3d4"/><rect x="566" y="310" width="6" height="34" fill="#b9c3d4"/>' +
        '<rect x="482" y="290" width="40" height="12" fill="#fff" stroke="#9aa6bb" transform="rotate(-4 502 296)"/>' +
        fig2(500, 300, P[1], { arm: "hold" }) + fig2(455, 292, P[2], { s: .9, hair: "#7b4a2a" }) + fig2(555, 292, P[4], { s: .9, flip: true }) +
        bub(300, 228, "...waiting for a big red bus.") + bub(600, 176, "Can you spell 'waiting'?", { left: true }) +
        '<text x="26" y="104" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="700" fill="#56627a">TEXT ON THE WALL</text>';
    } else if (g.mode === "hotseat") {
      svg = room("UMBRELLA", "Explain it — don't say it!", '<text x="320" y="134" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="13" fill="#f2c14e">no spelling · no translation</text>') +
        '<g><rect x="478" y="40" width="130" height="66" rx="8" fill="#fff" stroke="#c9d2e1"/><text x="543" y="62" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="700" fill="#56627a">SCORE</text><text x="543" y="90" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="20" font-weight="800" fill="#1d6b41">A 3 · B 2</text></g>' +
        '<g><circle cx="78" cy="74" r="32" fill="#fff" stroke="#c9d2e1" stroke-width="3"/><path d="M78 74 L78 50" stroke="#ef6f5e" stroke-width="3" stroke-linecap="round"/><path d="M78 74 L94 80" stroke="#1d6b41" stroke-width="3" stroke-linecap="round"/><text x="78" y="124" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="12" font-weight="700" fill="#56627a">0:45</text></g>' +
        '<rect x="294" y="262" width="52" height="10" rx="3" fill="#8a6d3b"/><rect x="298" y="272" width="6" height="30" fill="#8a6d3b"/><rect x="336" y="272" width="6" height="30" fill="#8a6d3b"/><rect x="292" y="214" width="56" height="12" rx="3" fill="#a07f45"/>' +
        fig2(320, 270, P[2], { hair: "#1d1d1d" }) + '<text x="320" y="330" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="700" fill="#56627a">HOT SEAT</text>' +
        fig2(150, 330, P[0], { arm: "up", back: false }) + fig2(205, 340, P[5], { hair: "#5a3825" }) + fig2(100, 350, P[6], { s: .95 }) +
        fig2(470, 330, P[3], { arm: "out", flip: true, hair: "#7b4a2a" }) + fig2(530, 344, P[7], { flip: true }) +
        bub(165, 230, "You use it when it rains!") + bub(470, 230, "It keeps you dry.", { left: true }) + bub(336, 198, "Hmm… a raincoat?");
    } else if (g.mode !== "mingle") {
      svg = illusGeneric(g);
    } else {
      svg = room("Find Someone Who…", "Ask one question · write one name · move on",
        '<g transform="translate(276 110)">' + [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) { return '<rect x="' + (c * 30) + '" y="' + (r * 14) + '" width="28" height="12" fill="none" stroke="#cfe3d8" stroke-width="1"/>' + ((r + c) % 2 ? '<path d="M' + (c * 30 + 8) + ' ' + (r * 14 + 6) + 'l4 4 l8 -8" stroke="#f2c14e" stroke-width="1.6" fill="none"/>' : ''); }).join(""); }).join("") + '</g>') +
        fig2(120, 320, P[0], { arm: "hold", board: true }) + fig2(178, 320, P[1], { flip: true, hair: "#5a3825" }) +
        fig2(400, 330, P[2], { arm: "hold", board: true, hair: "#7b4a2a" }) + fig2(458, 330, P[4], { flip: true, arm: "out" }) +
        fig2(282, 296, P[3], { s: .85, board: true, arm: "hold" }) + fig2(560, 300, "#1d6b41", { s: 1.2, hair: "#1b1b1b", board: true, arm: "hold", flip: true }) +
        bub(130, 230, "Do you have a younger brother?") + bub(186, 182, "Yes, I do!", { left: true }) +
        bub(408, 240, "Can you swim?") + bub(462, 194, "No, I can't.", { left: true });
    }
    return '<svg viewBox="0 0 640 400" role="img" aria-label="' + esc(illusAlt(g)) + '" style="display:block;width:100%;height:auto">' + svg + '</svg>';
  }
  function card2(x, y, label, o) {
    o = o || {}; var w = o.w || 46, h = o.h || 34, fs = label.length > 6 ? 10 : label.length > 3 ? 13 : 18;
    return '<g transform="translate(' + x + ' ' + y + ')' + (o.r ? ' rotate(' + o.r + ')' : '') + '"><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="5" fill="' + (o.fill || "#fff") + '" stroke="#9aa6bb" stroke-width="1.5"/><text y="' + (fs / 2.8) + '" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="' + fs + '" font-weight="800" fill="#1d6b41">' + esc(label) + '</text></g>';
  }
  function illusGeneric(g) {
    var P = PAL, C = g.illCards.length ? g.illCards : ["A", "B", "C", "D", "E"], Ls = g.illLines.length >= 2 ? g.illLines : ["Your turn!", "I know!"];
    var title = g.illBoard || g.name.en, sub = (g.steps.en[1] || {}).title || "";
    var s = room(title, sub);
    if (g.mode === "floor") {
      var spots = [[110, 330], [210, 350], [320, 330], [430, 350], [530, 330], [160, 380], [380, 382]];
      s += C.slice(0, 7).map(function (c, k) { return card2(spots[k][0], spots[k][1], c, { r: (k % 3 - 1) * 6, fill: ["#fff4d1", "#e9f5ef", "#e4f4e8"][k % 3] }); }).join("") +
        fig2(200, 318, P[0], { arm: "out" }) + fig2(330, 300, P[1], { arm: "up", hair: "#5a3825" }) + fig2(470, 316, P[3], { flip: true, arm: "out" }) + fig2(560, 286, "#1d6b41", { s: 1.15, hair: "#1b1b1b", flip: true }) +
        bub(210, 228, Ls[0]) + bub(470, 226, Ls[1], { left: true });
    } else if (g.mode === "pairs") {
      s += fig2(130, 320, P[0], { arm: "out" }) + fig2(220, 320, P[1], { flip: true, hair: "#5a3825" }) + fig2(400, 330, P[2], { arm: "out", hair: "#7b4a2a" }) + fig2(490, 330, P[4], { flip: true }) +
        (/cup/i.test(g.name.en) ? '<path d="M150 278 Q175 296 200 278" stroke="#8a6d3b" stroke-width="2" fill="none"/><path d="M144 272h10l-2 10h-6z M196 272h10l-2 10h-6z" fill="#f2f2f2" stroke="#9aa6bb"/>' : C.slice(0, 2).map(function (c, k) { return card2(175 + k * 270, 360, c, { w: 60 }); }).join("")) +
        bub(140, 232, Ls[0]) + bub(480, 240, Ls[1], { left: true });
    } else if (g.mode === "bowling") {
      s += C.slice(0, 6).map(function (c, k) { var row = k < 3 ? 0 : k < 5 ? 1 : 2, col = k < 3 ? k : k < 5 ? k - 3 : 0, x = 470 + (row * 22) + col * 44 - 44, y = 300 + row * 22; return '<g transform="translate(' + x + ' ' + y + ')"><ellipse cx="0" cy="12" rx="9" ry="3" fill="rgba(20,33,61,.15)"/><path d="M-7 10 Q-9 -6 -4 -12 Q-6 -20 0 -24 Q6 -20 4 -12 Q9 -6 7 10z" fill="#fff" stroke="#9aa6bb"/><text y="2" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="9" font-weight="800" fill="#ef6f5e">' + esc(c) + '</text></g>'; }).join("") +
        '<circle cx="300" cy="336" r="13" fill="#3d8b7d"/><path d="M276 336h-26M280 344h-20" stroke="#9aa6bb" stroke-width="2.5" stroke-linecap="round"/>' +
        fig2(170, 340, P[0], { arm: "out" }) + fig2(110, 330, P[1], { hair: "#5a3825" }) + fig2(60, 344, P[2]) +
        bub(180, 250, Ls[0]) + bub(560, 250, Ls[1], { left: true });
    } else if (g.mode === "board") {
      s += C.slice(0, 4).map(function (c, k) { return card2(210 + k * 74, 130, c, { w: 60, h: 30 }); }).join("") +
        fig2(250, 268, P[0], { arm: "up" }) + fig2(400, 268, P[3], { arm: "up", hair: "#7b4a2a", flip: true }) +
        fig2(150, 350, P[1], { back: true }) + fig2(210, 360, P[5], { back: true, hair: "#5a3825" }) + fig2(430, 360, P[2], { back: true }) + fig2(490, 350, P[6], { back: true }) +
        bub(240, 204, Ls[0], { left: true }) + bub(410, 204, Ls[1]);
    } else { // table
      s += '<rect x="130" y="300" width="380" height="14" rx="5" fill="#b9c3d4"/><rect x="146" y="314" width="8" height="40" fill="#b9c3d4"/><rect x="486" y="314" width="8" height="40" fill="#b9c3d4"/>' +
        C.slice(0, 5).map(function (c, k) { return card2(190 + k * 65, 290, c, { w: 52, h: 26, fill: ["#fff4d1", "#e9f5ef", "#e4f4e8"][k % 3] }); }).join("") +
        fig2(150, 280, P[0], { arm: "out" }) + fig2(250, 268, P[1], { hair: "#5a3825", s: .9 }) + fig2(390, 268, P[2], { s: .9 }) + fig2(490, 280, P[4], { flip: true, arm: "out" }) +
        bub(160, 196, Ls[0]) + bub(490, 196, Ls[1], { left: true });
    }
    return s;
  }
  function illusAlt(g) {
    if (L(g, "alt")) return L(g, "alt");
    if (["mingle", "relay", "hotseat"].indexOf(g.mode) < 0) {
      var lines = g.illLines.length >= 2 ? "“" + g.illLines[0] + "” – “" + g.illLines[1] + "”" : "";
      return lang === "vi" ? "Hình minh họa 2D cho hoạt động " + L(g, "name") + ": học sinh đang chơi" + (lines ? ", nói " + lines : "") + "." : "2D illustration of " + L(g, "name") + ": students playing" + (lines ? " and saying " + lines : "") + ".";
    }
    var A = {
      mingle: { vi: "Hình minh họa 2D: học sinh cầm bảng câu hỏi 3×3 đi lại hỏi nhau theo cặp, ví dụ “Do you have a younger brother?” – “Yes, I do!”, giáo viên quan sát.", en: "2D illustration: students holding 3×3 question grids ask each other in pairs, e.g. “Do you have a younger brother?” – “Yes, I do!”, while the teacher watches." },
      relay: { vi: "Hình minh họa 2D: Người chạy đọc đoạn văn dán trên tường rồi chạy về đọc lại cho Người viết ngồi ở bàn nhóm; Người viết hỏi “Can you spell ‘waiting’?”.", en: "2D illustration: a Runner reads a text taped on the wall and hurries back to dictate it to the Writer at the group desk, who asks “Can you spell ‘waiting’?”." },
      hotseat: { vi: "Hình minh họa 2D: một học sinh ngồi ghế nóng quay lưng về bảng ghi từ UMBRELLA; đồng đội gợi ý “You use it when it rains!”, có đồng hồ 60 giây và bảng điểm.", en: "2D illustration: a student sits in the hot seat with their back to the board showing UMBRELLA; teammates give clues such as “You use it when it rains!”, with a 60-second timer and a scoreboard." }
    };
    return (A[g.mode] || A.mingle)[lang];
  }

  /* ---------------------------------------------------------------- views */
  var app, player = null;
  function chips(g) {
    return '<div class="chips">' + g.skills.map(function (s) { return '<span class="chip">' + esc(t("skills")[s] || s) + '</span>'; }).join("") +
      '<span class="chip gold">' + esc(g.cefr ? "CEFR " + g.cefr : "") + '</span></div>';
  }
  function levelTxt(g) { return g.levels.map(function (l) { return t("levels")[l] || l; }).join(" – "); }
  function card(g) {
    return '<a class="card" href="#game-' + esc(g.slug) + '"><div class="card-illus" aria-hidden="true">' + illus(g) + '</div><h3>' + esc(L(g, "name")) + '</h3><p class="sub" lang="' + (lang === "vi" ? "en" : "vi") + '">' + esc(lang === "vi" ? g.name.en : g.name.vi) + '</p>' + chips(g) +
      '<div class="meta"><span>' + g.time[0] + "–" + g.time[1] + " " + t("min") + '</span><span>' + g.size[0] + "–" + g.size[1] + " " + t("students") + '</span><span>' + esc(levelTxt(g)) + '</span><span>' + (g.device ? t("device") : t("noDevice")) + '</span></div></a>';
  }

  function viewHome() {
    var vi = lang === "vi", n = GAMES.length;
    var intg = GAMES.filter(function (g) { return g.skills.indexOf("integrated") > -1; }), lng = GAMES.filter(function (g) { return g.skills.indexOf("integrated") < 0; });
    function links(arr, k) { return '<ul class="lst">' + arr.slice(0, k).map(function (g) { return '<li><a href="#game-' + esc(g.slug) + '">' + esc(L(g, "name")) + '</a></li>'; }).join("") + '</ul>'; }
    var H = vi ? {
      eye: "Phan Thị Quỳnh Trang · Ms Trang Phan TESOL",
      lede: "Đây là một phần tư liệu giảng dạy tôi chia sẻ lại từ những năm 2015–2019, khi trực tiếp đứng lớp với trẻ em tại Việt Nam. Trọng tâm luôn là tương tác giữa người với người: giáo viên đóng vai trò facilitator và mentor, đồng hành để học sinh tự khám phá. Thẻ giấy, bảng và đồ vật quanh lớp là đủ cho phần lớn hoạt động; khi phù hợp, công nghệ được kết hợp một cách hài hòa, ví dụ dùng máy ảnh, iPad và máy tính để học sinh làm và ghép phim stop-motion.",
      k1: "hoạt động đã xuất bản", k2: "giáo viên là người dẫn dắt và đồng hành; công nghệ là công cụ hỗ trợ",
      g_h: "Ba nhóm hoạt động chính", g_l: "Mỗi hoạt động có video 2D hướng dẫn, giáo án theo khung Ontario, cách điều chỉnh cho lớp đông ở Việt Nam và phản hồi từ giáo viên đã dùng thử.",
      a_h: "Hoạt động học tiếng Anh", a_p: "Nghe – nói, đọc, viết, từ vựng và ngữ pháp: những hoạt động ngắn 10–30 phút, chơi mà học, dùng ngay đầu hoặc cuối tiết.",
      b_h: "Hoạt động tích hợp", b_p: "Kết hợp tiếng Anh với toán, khoa học, thủ công, ẩm thực và trải nghiệm thực tế để trẻ dùng ngôn ngữ vào việc có thật.",
      c_h: "Dự án lớn (Project)", c_p: "Những chuỗi nhiều buổi, có sản phẩm cuối cùng để trẻ trình bày và chia sẻ.",
      c1: "Dinosaur Project: đọc, viết, làm phim hoạt hình và tham quan công viên khủng long", c2: "Reading is Fun: đọc truyện theo mô hình dự án, kể lại cho phụ huynh nghe",
      more: "Xem toàn bộ kho hoạt động", count: " hoạt động", see: "Xem",
      t_h: "Lời cảm ơn",
      t_p: ["Xin gửi lời cảm ơn chân thành tới Educap, đơn vị đã đồng hành cùng tôi từ những ngày đầu tiên. Cảm ơn cô Heather Wright, người sáng lập (“mẹ đẻ”) của chương trình AIT TESOL; cảm ơn chị Huyền Cao, Giám đốc Educap; cảm ơn trainer Adrian, người đã dạy tôi, cùng các bạn bè khóa tháng 5/2015. Mọi người đã làm hành trình của tôi bắt đầu thật rực rỡ, đam mê và nhiệt huyết.",
        "Tôi cũng xin cảm ơn các phụ huynh đã luôn tin tưởng, các học trò đã luôn yêu mến, và các đồng nghiệp đã đi cùng tôi trong suốt chặng đường qua."]
    } : {
      eye: "Phan Thị Quỳnh Trang · Ms Trang Phan TESOL",
      lede: "This is a share-back of part of my own teaching materials from 2015–2019, when I taught children in Vietnam face to face. The focus is always human-to-human interaction: the teacher acts as a facilitator and mentor who walks beside students as they discover. Paper cards, a board and objects around the room are enough for most activities; where it fits, technology is blended in naturally, for example cameras, iPads and computers for students to make and edit stop-motion films.",
      k1: "published activities", k2: "the teacher guides and mentors; technology is a tool",
      g_h: "Three main groups of activities", g_l: "Every activity has a 2D how-to video, an Ontario-style lesson plan, adaptations for large Vietnamese classes and feedback from teachers who tried it.",
      a_h: "English-learning activities", a_p: "Listening and speaking, reading, writing, vocabulary and grammar: short 10–30 minute activities that teach through play.",
      b_h: "Integrated activities", b_p: "English combined with maths, science, crafts, cooking and real-world experiences so children use the language for real tasks.",
      c_h: "Big projects", c_p: "Multi-lesson sequences with a final product that children present and share.",
      c1: "Dinosaur Project: reading, writing, stop-motion film and a dinosaur park visit", c2: "Reading is Fun: project-based story reading, retold to parents",
      more: "See the whole activity collection", count: " activities", see: "View",
      t_h: "With heartfelt thanks",
      t_p: ["My sincere thanks to Educap, who has walked with me since the very first days. Thank you to Ms Heather Wright, the founder (“mother”) of the AIT TESOL programme; to Ms Huyen Cao, Director of Educap; to Adrian, the trainer who taught me; and to my friends in the May 2015 cohort. You made the start of my journey bright, passionate and full of enthusiasm.",
        "I also thank the parents who always trusted me, the students who always loved me, and the colleagues who walked beside me all along the way."]
    };
    return '<section class="hero"><div class="stack"><p class="eyebrow">' + esc(H.eye) + '</p><h1>' + esc(t("site")) + '<span lang="' + (lang === "vi" ? "en" : "vi") + '">' + esc(t("siteAlt")) + '</span></h1>' +
      '<p class="lede">' + esc(H.lede) + '</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#library">' + esc(H.more) + ' →</a><a class="btn ghost" href="#perspective">' + esc(t("cta_persp")) + '</a></div>' +
      '<p class="byline"><span class="avatar" style="width:36px;height:36px;font-size:.8rem" aria-hidden="true">QT</span>' + esc(t("by")) + ' · trangphan.org</p></div>' +
      '<div class="hero-side"><figure class="hero-photo"><img src="' + esc((CFG.base || "") + "img/home-trang.jpg") + '" alt="' + (vi ? "Phan Thị Quỳnh Trang, giáo viên TESOL, cười và ôm cuốn tài liệu TESOL trước biển Australian International TESOL." : "Phan Thị Quỳnh Trang, TESOL teacher, smiling and holding a TESOL booklet in front of the Australian International TESOL sign.") + '" width="380" height="500" decoding="async"><figcaption>Phan Thị Quỳnh Trang · Ms Trang Phan TESOL</figcaption></figure><div class="hero-card" aria-label="' + esc(t("site")) + '"><div class="bar" aria-hidden="true"></div><div class="hero-stats">' +
      '<div><div class="k">' + n + '</div><div class="kl">' + H.k1 + '</div></div><div><div class="k" style="font-size:1.45rem;line-height:1.15">Facilitator<br>+ Mentor</div><div class="kl">' + H.k2 + '</div></div></div>' +
      '<p style="font-size:.9rem;opacity:.9">2015 – 2019 · Ontario Language (2023) · ESL/ELD · STEP · CEFR · GDPT 2018</p></div></div></section>' +
      '<section><h2 style="margin-bottom:6px">' + H.g_h + '</h2><p class="msg" style="margin-bottom:14px;max-width:70ch">' + esc(H.g_l) + '</p><div class="grp3">' +
      '<article class="grp"><img src="' + esc((CFG.base || "") + "img/h125.jpg") + '" alt="" loading="lazy" decoding="async"><h3>' + H.a_h + '</h3><p>' + esc(H.a_p) + '</p><p class="eyebrow">' + lng.length + H.count + '</p>' + links(lng, 3) + '<a class="btn ghost" href="#library" data-fskill="">' + H.see + ' →</a></article>' +
      '<article class="grp"><img src="' + esc((CFG.base || "") + "img/h207.jpg") + '" alt="" loading="lazy" decoding="async"><h3>' + H.b_h + '</h3><p>' + esc(H.b_p) + '</p><p class="eyebrow">' + intg.length + H.count + '</p>' + links(intg, 3) + '<a class="btn ghost" href="#library" data-fskill="integrated">' + H.see + ' →</a></article>' +
      '<article class="grp"><img src="' + esc((CFG.base || "") + "img/h047.jpg") + '" alt="" loading="lazy" decoding="async"><h3>' + H.c_h + '</h3><p>' + esc(H.c_p) + '</p><p class="eyebrow">2 project</p><ul class="lst"><li><a href="#project-dinosaurs">' + esc(H.c1) + '</a></li><li><a href="#reading-is-fun">' + esc(H.c2) + '</a></li></ul><a class="btn ghost" href="#project-dinosaurs">' + H.see + ' →</a></article></div>' +
      '<p style="margin-top:16px"><a class="btn" href="#library">' + esc(H.more) + ' →</a></p></section>' +
      '<section aria-labelledby="jr-h"><h2 id="jr-h" style="margin-bottom:6px">' + (vi ? "Hành trình 2012 – 2026" : "The journey, 2012 – 2026") + '</h2><p class="msg" style="margin-bottom:12px;max-width:70ch">' + (vi ? "Mỗi thanh màu là một giai đoạn: lớp mầm non, lớp teen, lớp người lớn, câu chuyện giảng dạy chung và triết lý cá nhân. Bấm vào để mở thư viện." : "Each coloured bar is a phase: preschool, teen, adults, the shared story and my philosophy. Click to open the library.") + '</p>' + infoLanes(vi, JOURNEY(vi)) + '<p style="margin-top:14px"><a class="btn" href="#gallery">' + (vi ? "Mở thư viện hành trình →" : "Open the journey library →") + '</a></p></section>' + '<section class="thanks" aria-labelledby="thanks-h"><p class="eyebrow">' + (vi ? "Tri ân" : "Gratitude") + '</p><h2 id="thanks-h">' + H.t_h + '</h2>' + H.t_p.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") + '</section>' + ackHtml();
  }

  var F = { q: "", skill: "", level: "", grade: "", time: "", size: "", dev: "" };
  function opt(v, label, cur) { return '<option value="' + esc(v) + '"' + (v === cur ? " selected" : "") + '>' + esc(label) + '</option>'; }
  function viewLibrary() {
    var sk = t("skills"), lv = t("levels"), gr = t("grades");
    return '<section><p class="eyebrow">' + esc(t("site")) + '</p><h1 style="margin:6px 0 10px">' + t("lib_title") + '</h1><p class="lede">' + t("lib_lede") + '</p></section>' +
      '<section style="margin-top:22px"><form class="filters" id="filters" role="search" onsubmit="return false">' +
      '<label class="search">' + t("f_search") + '<input id="f-q" type="search" value="' + esc(F.q) + '" autocomplete="off"></label>' +
      '<label>' + t("f_skill") + '<select id="f-skill">' + opt("", t("any"), F.skill) + Object.keys(sk).map(function (k) { return opt(k, sk[k], F.skill); }).join("") + '</select></label>' +
      '<label>' + t("f_level") + '<select id="f-level">' + opt("", t("any"), F.level) + Object.keys(lv).map(function (k) { return opt(k, lv[k], F.level); }).join("") + '</select></label>' +
      '<label>' + t("f_grade") + '<select id="f-grade">' + opt("", t("any"), F.grade) + Object.keys(gr).map(function (k) { return opt(k, gr[k], F.grade); }).join("") + '</select></label>' +
      '<label>' + t("f_time") + '<select id="f-time">' + opt("", t("any"), F.time) + opt("s", t("t_short"), F.time) + opt("m", t("t_mid"), F.time) + opt("l", t("t_long"), F.time) + '</select></label>' +
      '<label>' + t("f_size") + '<select id="f-size">' + opt("", t("any"), F.size) + opt("small", t("s_small"), F.size) + opt("large", t("s_large"), F.size) + '</select></label>' +
      '<label>' + t("f_dev") + '<select id="f-dev">' + opt("", t("any"), F.dev) + opt("no", t("d_no"), F.dev) + opt("yes", t("d_yes"), F.dev) + '</select></label>' +
      '</form><p class="count" id="count" aria-live="polite"></p><div class="cards" id="cards"></div></section>' + libExtras();
  }
  function libExtras() {
    var vi = lang === "vi"; GAL_FLAT = [];
    var g = JRN2(vi).filter(function (c) { return c.id === "chuong-2"; })[0].g;
    var H = vi ? { p_h: "Dự án lớn (Project)", p_l: "Những chuỗi nhiều buổi có sản phẩm cuối cùng.", d: "Dinosaur Project", dp: "Đọc, viết, làm phim hoạt hình stop-motion, làm tranh và tham quan công viên khủng long.", r: "Reading is Fun", rp: "Đọc truyện tiếng Anh theo mô hình dự án, kể lại cho phụ huynh nghe, có video VTV.",
      ph_h: "Hình ảnh hoạt động thật", ph_l: "Một số học liệu và sản phẩm thật từ các lớp học của tác giả. Nhấn vào ảnh để phóng to." }
      : { p_h: "Big projects", p_l: "Multi-lesson sequences with a final product.", d: "Dinosaur Project", dp: "Reading, writing, stop-motion animation, art and a visit to a dinosaur park.", r: "Reading is Fun", rp: "Project-based English story reading, retold to parents, with a VTV report.",
      ph_h: "Photos of real activities", ph_l: "Real materials and products from the author's classes. Tap a photo to enlarge." };
    return '<section style="margin-top:34px"><h2>' + H.p_h + '</h2><p class="msg" style="margin:4px 0 12px">' + H.p_l + '</p><div class="cards"><a class="card" href="#project-dinosaurs"><h3>' + H.d + '</h3><p class="msg">' + esc(H.dp) + '</p></a><a class="card" href="#reading-is-fun"><h3>' + H.r + '</h3><p class="msg">' + esc(H.rp) + '</p></a></div></section>' +
      '<section style="margin-top:34px"><h2>' + H.ph_h + '</h2><p class="msg" style="margin:4px 0 8px">' + H.ph_l + '</p>' + g.map(function (x) { return '<section class="gal-sec"><h3>' + esc(x.h) + '</h3>' + mediaGrid(x.items) + '</section>'; }).join("") + '</section>' +
      '<dialog class="lightbox" id="lb"><figure><img alt=""><figcaption></figcaption></figure><div class="lb-nav"><button type="button" data-lb="-1" aria-label="' + (vi ? "Ảnh trước" : "Previous photo") + '">‹</button><button type="button" data-lb="close">' + (vi ? "Đóng" : "Close") + '</button><button type="button" data-lb="1" aria-label="' + (vi ? "Ảnh sau" : "Next photo") + '">›</button></div></dialog>';
  }
  function projCrumb() { var vi = lang === "vi"; return '<p class="crumb-lib"><a href="#projects">← Teaching Projects</a> &nbsp;·&nbsp; <a href="#library">' + (vi ? "Thư viện hoạt động" : "Activity library") + '</a></p>'; }
  function viewProjectsHub() {
    var vi = lang === "vi", b = CFG.base || "";
    var H = vi ? { eye: "Dự án học tập · Project-Based Learning", h: "Teaching Projects", lede: "Hai dự án lớn tôi đã thiết kế và dạy: mỗi dự án là một chuỗi buổi học có câu hỏi dẫn dắt, sản phẩm cuối và giáo án chi tiết.",
        d: ["Dinosaur Project", "Một tuần dự án liên môn (lịch sử, sinh học, mỹ thuật): đọc, viết, làm phim stop-motion và tham quan công viên khủng long.", "4 buổi · Flyers (A2)", "Xem dự án →"],
        r: ["Reading is Fun", "Học đọc qua truyện: từ giờ kể chuyện trên lớp đến ngày hội đọc sách cùng phụ huynh, kèm tập huấn giáo viên.", "5 giáo án · ngày hội cuối dự án", "Xem dự án →"], lib: "Quay lại thư viện hoạt động" }
      : { eye: "Learning projects · Project-Based Learning", h: "Teaching Projects", lede: "Two big projects I designed and taught: each is a sequence of lessons with a driving question, a final product and detailed lesson plans.",
        d: ["Dinosaur Project", "A one-week cross-curricular project (history, biology, art): reading, writing, stop-motion film and a visit to a dinosaur park.", "4 lessons · Flyers (A2)", "Open the project →"],
        r: ["Reading is Fun", "Learning to read through stories: from storytime in class to a family reading festival, with teacher training.", "5 lesson plans · a festival to end the project", "Open the project →"], lib: "Back to the activity library" };
    function card(href, img, c, k) { return '<a class="hub-card ' + k + '" href="' + href + '"><img src="' + esc(b + img) + '" alt="" loading="lazy" decoding="async" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px;margin-top:6px"><span class="yrs">' + esc(c[2]) + '</span><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p><span class="go">' + c[3] + '</span></a>'; }
    return '<section class="hub-intro"><p class="eyebrow">' + H.eye + '</p><h1 id="page-h">' + H.h + '</h1><p class="lede" style="max-width:68ch">' + esc(H.lede) + '</p></section><section><div class="hub-grid">' + card("#project-dinosaurs", "img/h047.jpg", H.d, "k-adult") + card("#reading-is-fun", "img/rif-group.jpg", H.r, "k-kids") + '</div><p style="margin-top:16px"><a class="btn ghost" href="#library">← ' + H.lib + '</a></p></section>' + ackHtml();
  }
  function viewDino() {
    var vi = lang === "vi";
    var D = vi ? {
      eye: "Dự án lớn · Project-Based Learning", h: "Dinosaur Project", sub: "Khám phá khủng long và môi trường sống của chúng",
      lede: "Một tuần dự án liên môn (lịch sử, sinh học, mỹ thuật) cho học sinh trình độ Cambridge A2 Flyers. Học sinh đọc và tóm tắt văn bản về khủng long theo nhóm, viết câu chuyện về sự tuyệt chủng, làm phim hoạt hình stop-motion, tạo một tác phẩm mỹ thuật và đi tham quan công viên khủng long.",
      obj_h: "Mục tiêu", obj: ["Luyện đọc hiểu và tóm tắt thông tin.", "Luyện làm việc nhóm.", "Luyện viết (bài tự đánh giá cuối dự án).", "Luyện kỹ năng công nghệ (quay video sản phẩm cuối).", "Phát triển sáng tạo qua sản phẩm cuối."],
      lr_h: "Đối tượng", lr: "Học sinh trình độ Cambridge A2 Flyers.", ty_h: "Loại dự án", ty: ["Dự án liên môn: lịch sử, sinh học và mỹ thuật.", "Làm việc nhóm ở Buổi 1–2; sản phẩm cuối do từng học sinh tự làm."],
      ov_h: "Tuần dự án qua bốn buổi", ov: ["Đọc hiểu và tóm tắt thông tin (hai nhóm tóm tắt thông tin về khủng long lên poster).", "Đọc, ngữ pháp và xây dựng câu chuyện về sự tuyệt chủng của khủng long; mở rộng: làm phim stop-motion.", "Chia sẻ cảm nhận về điều đã học, rồi làm dự án mỹ thuật thể hiện vẻ đẹp của khủng long.", "Tham quan công viên khủng long."],
      ap_h: "Phương pháp và nguồn", ap: "Dự án theo phương pháp học qua dự án (project-based learning): học sinh hướng tới một sản phẩm cuối rõ ràng qua nhiều buổi. Dự án kết hợp lịch sử, sinh học và mỹ thuật với việc học tiếng Anh, và mỗi buổi được xây dựng quanh một nhiệm vụ có ý nghĩa.", src: "Hughes, C. D. (2011). National Geographic little kids first big book of dinosaurs. National Geographic Kids.",
      pre_h: "Giáo viên chuẩn bị", pre: ["Các đoạn văn ngắn về khủng long: nhóm 1 dùng Wikipedia; nhóm 2 dùng sách National Geographic Little Kids First Big Book of Dinosaurs (Hughes, 2011).", "Slide hướng dẫn làm phim hoạt hình stop-motion.", "Điện thoại cài ứng dụng Adobe Spark Video và VivaVideo.", "Mô hình khủng long, cát, cây mô hình, kim tuyến và đất nặn."],
      st_h: "Học sinh chuẩn bị", st: ["Bút dạ quang và giấy ghi chú.", "Bản nháp kế hoạch quay phim.", "Hồ sơ điểm mạnh của từng thành viên.", "Bảng phân công nhiệm vụ."],
      ss_h: "Bốn buổi học",
      ss: [["Buổi 1. Đọc hiểu và tóm tắt thông tin", ["Mở đầu bằng hoạt động “chủ đề bí ẩn” để dẫn vào thảo luận và giao nhiệm vụ.", "Hai nhóm làm quen qua “speed dating” để biết điểm mạnh của từng bạn.", "Mỗi học sinh nhận một vai trò trước khi đọc.", "Phát văn bản và nêu yêu cầu.", "Cuối buổi, mỗi nhóm hoàn thành bản tóm tắt bài đọc, buổi thảo luận nhóm và infographic tóm tắt."]],
        ["Buổi 2. Đọc, ngữ pháp và xây dựng câu chuyện (mở rộng: phim stop-motion)", ["Lập sơ đồ ý tưởng cho câu chuyện về sự tuyệt chủng của khủng long.", "Liệt kê từ khóa chủ đề và đặt câu với các từ đó.", "Tìm thông tin trên máy tính, lấy ý tưởng từ các bộ phim có sẵn.", "Giáo viên hướng dẫn từng bước làm phim stop-motion.", "Học sinh viết nháp, luyện, chỉnh sửa và hoàn thiện sản phẩm."]],
        ["Buổi 3. Chia sẻ cảm nhận và dự án mỹ thuật", ["Cùng nhìn lại sản phẩm của buổi 1 và 2.", "Phát vật liệu; mỗi học sinh làm một tác phẩm thể hiện vẻ đẹp của khủng long theo cách riêng.", "Chụp ảnh và quay video tác phẩm."]],
        ["Buổi 4. Tham quan công viên khủng long", ["Quan sát mô hình khủng long kích thước thật (1:1).", "Thảo luận và nhìn lại điều đã học.", "Ghi chú và liệt kê câu hỏi cho lần sau.", "Chụp ảnh, quay video làm tư liệu cho dự án tiếp theo."]]],
      fin_h: "Sản phẩm cuối", fin: ["Phim hoạt hình stop-motion.", "Tác phẩm mỹ thuật cá nhân.", "Bản tóm tắt, ghi chú thảo luận, infographic và câu chuyện của buổi 1 và 2."],
      ph_h: "Hình ảnh minh họa", ph_l: "Một số hoạt động khủng long trong các lớp của tác giả.",
      v_h: "Video sản phẩm của học sinh", v1: "Sản phẩm cuối buổi 2", v2: "Sản phẩm thủ công buổi 3", orig: "Trang gốc trên trangphan.org",
      note: "Nội dung chuyển từ Teaching Portfolio của tác giả tại trangphan.org."
    } : {
      eye: "Big project · Project-Based Learning", h: "Dinosaur Project", sub: "Exploring dinosaurs and their habitats",
      lede: "A cross-curricular Project Week (history, biology, art) for students at Cambridge A2 Flyers level. Students read and summarise dinosaur texts in groups, write a story about extinction, make a stop-motion film, create an art piece and visit a dinosaur park.",
      obj_h: "Objectives", obj: ["Practise reading comprehension and summarizing information.", "Practise teamwork.", "Practise writing (an end-of-project reflection).", "Practise technology skills (filming a video of the final product).", "Develop creativity through the final product."],
      lr_h: "Learners", lr: "Students at Cambridge A2 Flyers level.", ty_h: "Project type", ty: ["Cross-curricular project: history, biology and art.", "Group work in Sessions 1–2; final products made individually."],
      ov_h: "Project Week sessions", ov: ["Reading comprehension and summarizing information (two groups summarize information about dinosaurs on a poster).", "Reading, grammar and building a story about the extinction of the dinosaurs; extension: making a stop-motion animation video.", "Sharing reflections on what was learned, followed by an art project that captures the beauty of dinosaurs.", "Field trip to a dinosaur park."],
      ap_h: "Approach and Source", ap: "This project follows a project-based learning approach: students work towards a clear final product over several sessions. It brings history, biology and art together with English language learning, and each session is built around a meaningful task.", src: "Hughes, C. D. (2011). National Geographic little kids first big book of dinosaurs. National Geographic Kids.",
      pre_h: "Teacher preparation", pre: ["Short dinosaur texts: Group 1 uses Wikipedia; Group 2 uses National Geographic Little Kids First Big Book of Dinosaurs (Hughes, 2011).", "Slides guiding students through making a stop-motion animation.", "Phones with the Adobe Spark Video and VivaVideo apps.", "Dinosaur models, sand, model trees, glitter and modelling clay."],
      st_h: "Students prepare", st: ["Highlighters and sticky notes.", "A draft film plan.", "A portfolio of each group member's strengths.", "A task assignment chart."],
      ss_h: "Four sessions",
      ss: [["Session 1. Reading comprehension and summarising information", ["Open with a “mystery topic” activity that leads into discussion and introduces the task.", "The two groups do “speed dating” to learn each member's strengths.", "Each student receives a role before reading.", "Hand out the texts and explain the requirements.", "By the end of the session, each group completes a summary of the reading text, a group discussion and an infographic summary."]],
        ["Session 2. Reading, grammar and building a story (extension: stop-motion)", ["Create an idea web for a story about the extinction of the dinosaurs.", "List key words on the topic and build sentences with them.", "Search for information on computers and get ideas from existing films.", "The teacher walks students through making a stop-motion animation.", "Students draft, practise, revise and complete their product."]],
        ["Session 3. Sharing reflections and an art project", ["Review the products from Sessions 1 and 2.", "Hand out materials; each student creates an art piece that captures the beauty of dinosaurs in their own way.", "Photograph and film the finished work."]],
        ["Session 4. Field trip to a dinosaur park", ["Observe life-size (1:1) dinosaur models.", "Discuss and reflect on what was learned.", "Take notes and list questions for next time.", "Take photos and video as material for the next project."]]],
      fin_h: "Final products", fin: ["A stop-motion animation.", "An individual art piece.", "The summaries, discussion notes, infographic and story work from Sessions 1 and 2."],
      ph_h: "Illustrative photos", ph_l: "Dinosaur activities from the author's classes.",
      v_h: "Students' product videos", v1: "Products at the end of Session 2", v2: "Handmade products from Session 3", orig: "Original page on trangphan.org",
      note: "Content moved from the author's Teaching Portfolio at trangphan.org."
    };
    GAL_FLAT = [];
    var ph = [["img/h047.jpg", vi ? "Bộ xương khủng long đồ chơi bày trên bàn." : "Toy dinosaur skeletons on a table.", "Dinosaur extinction"], ["img/h242.jpg", vi ? "Trứng khủng long tô màu đang nứt vỏ, bên trong là chú khủng long nhỏ." : "A coloured dinosaur egg cracking open to reveal a baby dinosaur.", vi ? "Trứng khủng long nở" : "A dinosaur hatching"], ["img/h187.jpg", vi ? "Khủng long đồ chơi đặt cạnh tranh tô màu." : "Toy dinosaurs beside colouring pages.", vi ? "Khủng long và tranh tô màu" : "Dinosaurs and colouring pages"], ["img/h216.jpg", vi ? "Phiếu đọc hiểu về khủng long có ô chữ." : "A dinosaur reading worksheet with a word search.", vi ? "Phiếu đọc hiểu khủng long" : "Dinosaur reading sheet"]];
    function ol(a) { return '<ol class="lst">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ol>'; }
    function ul(a) { return '<ul class="lst">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
    return '<section class="stack"><p class="eyebrow">' + D.eye + '</p><h1 id="page-h">' + D.h + '</h1><p class="lede" style="max-width:70ch"><b>' + D.sub + '.</b> ' + esc(D.lede) + '</p><p class="msg" style="font-size:.9rem">' + D.note + ' <a href="https://www.trangphan.org/practiced-teaching-experience/project-1-dinosaurs" target="_blank" rel="noopener">' + D.orig + ' ↗</a></p></section>' +
      '<section class="cols"><div class="panel"><h3>' + D.obj_h + '</h3>' + ul(D.obj) + '<h3 style="margin-top:12px">' + D.lr_h + '</h3><p>' + esc(D.lr) + '</p><h3 style="margin-top:12px">' + D.ty_h + '</h3>' + ul(D.ty) + '</div><div class="panel"><h3>' + D.pre_h + '</h3>' + ul(D.pre) + '<h3 style="margin-top:12px">' + D.st_h + '</h3>' + ul(D.st) + '</div></section>' +
      '<section><h2 style="margin-bottom:12px">' + D.ov_h + '</h2><ol class="path k-adult">' + D.ov.map(function (x, i) { return '<li class="' + ["k-adult", "k-teen", "k-kids", "k-story"][i] + '"><span class="dot" aria-hidden="true">' + (i + 1) + '</span><a href="#ds-' + (i + 1) + '" data-ds="' + (i + 1) + '"><span class="when">' + (vi ? "Buổi " : "Session ") + (i + 1) + '</span><b>' + esc(x) + '</b></a></li>'; }).join("") + '</ol></section>' +
      '<section><h2 style="margin-bottom:12px">' + D.ss_h + '</h2><div class="stack" style="gap:10px">' + D.ss.map(function (x, i) {
        var vid = "";
        return '<details class="lp" id="ds-' + (i + 1) + '"' + (i === 0 ? " open" : "") + '><summary>' + esc(x[0]) + '</summary>' + ol(x[1]) + vid + '</details>'; }).join("") + '</div></section>' +
      '<section class="panel"><h3>' + D.ap_h + '</h3><p style="max-width:70ch">' + esc(D.ap) + '</p><p class="msg" style="margin-top:8px">' + esc(D.src) + '</p></section>' +
      '<section><h2>' + D.ph_h + '</h2><p class="msg" style="margin:4px 0 8px">' + D.ph_l + '</p>' + mediaGrid(ph.map(function (x) { return { img: x[0], alt: x[1], cap: x[2] }; })) + '</section>' + ackHtml() +
      '<dialog class="lightbox" id="lb"><figure><img alt=""><figcaption></figcaption></figure><div class="lb-nav"><button type="button" data-lb="-1" aria-label="' + (vi ? "Ảnh trước" : "Previous photo") + '">‹</button><button type="button" data-lb="close">' + (vi ? "Đóng" : "Close") + '</button><button type="button" data-lb="1" aria-label="' + (vi ? "Ảnh sau" : "Next photo") + '">›</button></div></dialog>';
  }

  function gradeMatch(g, f) { if (!f) return true; if (g.grades.indexOf(f) > -1) return true; var a = range(f), ok = false; g.grades.forEach(function (x) { var b = range(x); if (b[0] && a[0] && b[0] <= a[1] && a[0] <= b[1]) ok = true; }); return ok; }
  function applyFilters() {
    var res = GAMES.filter(function (g) {
      var name = (g.name.en + " " + g.name.vi).toLowerCase();
      if (F.q && name.indexOf(F.q.toLowerCase()) < 0) return false;
      if (F.skill && g.skills.indexOf(F.skill) < 0) return false;
      if (F.level && g.levels.indexOf(F.level) < 0) return false;
      if (!gradeMatch(g, F.grade)) return false;
      if (F.time === "s" && g.time[0] > 15) return false;
      if (F.time === "m" && (g.time[1] < 16 || g.time[0] > 30)) return false;
      if (F.time === "l" && g.time[1] <= 30) return false;
      if (F.size === "small" && g.size[0] > 25) return false;
      if (F.size === "large" && g.size[1] < 40) return false;
      if (F.dev === "no" && g.device) return false; if (F.dev === "yes" && !g.device) return false;
      return true;
    });
    $("#count").textContent = t("showing")(res.length, GAMES.length);
    $("#cards").innerHTML = res.length ? res.map(card).join("") : '<p class="empty">' + t("none") + '</p>';
  }
  function bindLibrary() {
    ["q", "skill", "level", "grade", "time", "size", "dev"].forEach(function (k) {
      var el = $("#f-" + k); el.addEventListener(k === "q" ? "input" : "change", function () { F[k] = el.value; applyFilters(); });
    });
    applyFilters();
  }

  var LEAF = '<svg class="leaf" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="var(--navy)"/><path d="M16 6l1.6 4 3-1.4-1 4.2 3.4-.6-1.8 3 2 .9-5.2 3.7.6 2.6-2.6-.6V25h-1v-3.2l-2.6.6.6-2.6-5.2-3.7 2-.9-1.8-3 3.4.6-1-4.2 3 1.4z" fill="var(--on-navy)"/></svg>';
  function planBlock(g) {
    var P = g.plan[lang].length ? g.plan[lang] : g.plan.en, labels = ["", "", "", "", "", "", "", ""];
    var phase = { 2: "≈ 5'", 3: "≈ 10–15'", 4: "≈ 5'" };
    return '<div class="plan">' + P.map(function (sec, i) {
      var wide = i >= 5 ? " wide" : "", cls = i === 1 ? ' class="ican"' : '';
      return '<div class="panel' + (i === 5 || i === 6 ? "" : "") + '"><h3>' + esc(sec.h) + (phase[i] ? '<span class="ph">' + phase[i] + '</span>' : '') + '</h3><ul' + cls + '>' + sec.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join("") + '</ul></div>';
    }).join("") + '</div>' +
      '';
  }
  function vnBlock(g) {
    var V = g.vn[lang].length ? g.vn[lang] : g.vn.en; if (!V.length) return "";
    var ctx = V[0], adapt = V[1] || { h: "", items: [] }, lessons = V[2] || { h: "", items: [] };
    return '<h3 style="margin-bottom:10px">' + esc(ctx.h || t("vn_cmp")) + '</h3><div class="tbl-wrap"><table><thead><tr><th scope="col">' + t("col_crit") + '</th><th scope="col">' + t("col_on") + '</th><th scope="col">' + t("col_vn") + '</th></tr></thead><tbody>' +
      ctx.rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'; }).join("") + '</tbody></table></div>' +
      '<div class="two"><div class="panel"><h3>' + esc(adapt.h) + '</h3><ul class="lst">' + adapt.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>' +
      '<div class="panel"><h3>' + esc(lessons.h) + '</h3><ul class="lst">' + lessons.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div></div>';
  }
  function fbBlock(g) {
    function seg(name, opts) { return '<div class="seg">' + opts.map(function (o, i) { return '<label><input type="radio" name="' + name + '" id="' + name + '-' + i + '" value="' + esc(o[0]) + '"><span>' + esc(o[1]) + '</span></label>'; }).join("") + '</div>'; }
    function rate(name, label) { return '<fieldset class="field"><legend>' + label + ' <span class="scale-hint">(' + t("lo") + ', ' + t("hi") + ')</span></legend>' + seg(name, [[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"]]) + '</fieldset>'; }
    var gf = CFG.googleForm || {};
    if (gf.url) {
      var href = gf.url + (gf.entryGame ? (gf.url.indexOf("?") > -1 ? "&" : "?") + "usp=pp_url&" + gf.entryGame + "=" + encodeURIComponent(g.name.en + " / " + g.name.vi) : "");
      return '<div class="fb"><p class="msg">' + t("fb_lede") + '</p><div><h3 style="margin-bottom:10px">' + t("agg_title") + ' <span class="msg" id="agg-n"></span></h3><div class="fb-sum" id="agg"></div></div>' +
        '<div class="panel stack"><p>' + t("gf_lede") + '</p><p class="privacy">' + t("fb_priv") + '</p><p><a class="btn" href="' + esc(href) + '" target="_blank" rel="noopener">' + t("gf_btn") + ' ↗</a></p></div></div>';
    }
    return '<div class="fb"><p class="msg">' + t("fb_lede") + '</p><div><h3 style="margin-bottom:10px">' + t("agg_title") + ' <span class="msg" id="agg-n"></span></h3><div class="fb-sum" id="agg"></div></div>' +
      '<form class="panel" id="fb" novalidate>' +
      '<div class="row"><label class="field">' + t("fb_game") + '<input id="fb-game" value="' + esc(L(g, "name")) + '" readonly></label>' +
      '<label class="field">' + t("fb_grade") + '<select id="fb-grade">' + ['<option value="">—</option>'].concat(t("grade_opts").map(function (o) { return '<option>' + esc(o) + '</option>'; })).join("") + '</select></label>' +
      '<label class="field">' + t("fb_size") + '<input id="fb-size" type="number" inputmode="numeric" min="1" max="80" placeholder="40"></label></div>' +
      '<fieldset class="field"><legend>' + t("fb_country") + '</legend>' + seg("fb-country", [["Canada", t("c_ca")], ["Vietnam", t("c_vn")], ["Other", t("c_other")]]) + '</fieldset>' +
      '<div class="row">' + rate("fb-eng", t("fb_eng")) + rate("fb-ease", t("fb_ease")) + rate("fb-goal", t("fb_goal")) + '</div>' +
      '<label class="field">' + t("fb_adapt") + '<textarea id="fb-adapt" maxlength="400" placeholder="' + esc(t("fb_adapt_ph")) + '"></textarea></label>' +
      '<fieldset class="field"><legend>' + t("fb_rec") + '</legend>' + seg("fb-rec", [["yes", t("yes")], ["no", t("no")], ["maybe", t("maybe")]]) + '</fieldset>' +
      '<label class="field">' + t("fb_email") + '<input id="fb-email" type="email" autocomplete="email" inputmode="email"></label>' +
      '<p class="privacy">' + t("fb_priv") + '</p>' +
      '<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><button class="btn" type="submit" id="fb-send">' + t("fb_send") + '</button><span class="msg" id="fb-msg" role="status"></span></div><p class="msg" id="fb-mode"></p>' +
      '</form></div>';
  }
  function renderAgg(s) {
    var box = $("#agg"); if (!box) return;
    $("#agg-n").textContent = s.n ? "· " + t("agg_n")(s.n) : "";
    if (!s.n) { box.innerHTML = '<p class="msg">' + t("agg_none") + '</p>'; return; }
    function st(v, l) { return '<div class="stat"><div class="v">' + v.toFixed(1) + '<span class="msg" style="font-size:.8rem"> / 5</span></div><div class="l">' + l + '</div><div class="meter"><b style="width:' + (v / 5 * 100) + '%"></b></div></div>'; }
    box.innerHTML = st(s.eng, t("fb_eng")) + st(s.ease, t("fb_ease")) + st(s.goal, t("fb_goal")) +
      '<div class="stat"><div class="v">' + s.rec + '%</div><div class="l">' + t("agg_rec") + '</div><div class="meter"><b style="width:' + s.rec + '%"></b></div></div>';
  }
  function bindFeedback(g) {
    Store.subscribe(g.id, renderAgg);
    var form = $("#fb"), msg = $("#fb-msg"); if (!form) return;
    Store.ready().then(function () { var m = Store.mode(), el = $("#fb-mode"); if (!el) return; if (m === "demo") el.textContent = t("fb_demo"); if (m === "readonly") { el.textContent = t("fb_ro"); $("#fb-send").disabled = true; } });
    function val(n) { var el = form.querySelector('input[name="' + n + '"]:checked'); return el ? el.value : ""; }
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var resp = { eng: +val("fb-eng"), ease: +val("fb-ease"), goal: +val("fb-goal"), rec: val("fb-rec"), country: val("fb-country"), grade: $("#fb-grade").value, size: +$("#fb-size").value || null, adapt: $("#fb-adapt").value.trim().slice(0, 400), lang: lang, at: new Date().toISOString() };
      if (!resp.eng || !resp.ease || !resp.goal || !resp.rec) { msg.textContent = t("fb_need"); return; }
      var em = $("#fb-email").value.trim(); if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) em = "";
      var b = $("#fb-send"); b.disabled = true; msg.textContent = t("fb_sending");
      try { await Store.save(g.id, resp, em); form.reset(); msg.innerHTML = '<span class="ok">' + t("fb_thanks") + '</span>'; }
      catch (err) { msg.textContent = String(err && err.message) === "readonly" ? t("fb_ro") : t("fb_err"); }
      b.disabled = false;
    });
  }


  function figureHtml(src, alt, cap, cls) {
    return '<figure class="photo ' + (cls || "") + '"><img src="' + esc((CFG.base || "") + src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" width="800" height="800"><figcaption>' + esc(cap) + '</figcaption></figure>';
  }
  function viewGame(g) {
    var blocks = [["align", t("b_align")], ["why", t("b_why")], ["video", t("b_video")], ["plan", t("b_plan")], ["vn", t("b_vn")], ["tip", t("b_tip")], ["feedback", t("b_fb")]];
    var other = lang === "vi" ? g.name.en : g.name.vi;
    return '<nav class="crumbs" aria-label="breadcrumb"><a href="#library">← ' + t("back") + '</a></nav>' +
      '<header class="g-head"><p class="eyebrow">' + esc(g.id) + ' · ' + esc(g.step) + ' · CEFR ' + esc(g.cefr) + '</p><h1 id="page-h">' + esc(L(g, "name")) + '</h1><p class="alt" lang="' + (lang === "vi" ? "en" : "vi") + '">' + esc(other) + '</p>' + (g.source ? '<p class="msg">' + (lang === "vi" ? "Phát triển từ hoạt động “" : "Developed from the activity “") + esc(g.source) + (lang === "vi" ? "” trong Teaching Gallery" : "” in the Teaching Gallery") + '</p>' : '') + chips(g) +
      '<dl class="summary">' +
      '<div><dt>' + t("sum_level") + '</dt><dd>' + esc(levelTxt(g)) + '<br><span class="msg">' + esc(g.step) + ' · CEFR ' + esc(g.cefr) + '</span></dd></div>' +
      '<div><dt>' + t("sum_time") + '</dt><dd>' + g.time[0] + "–" + g.time[1] + " " + t("min") + '</dd></div>' +
      '<div><dt>' + t("sum_size") + '</dt><dd>' + g.size[0] + "–" + g.size[1] + " " + t("students") + '</dd></div>' +
      '<div><dt>' + t("sum_grade") + '</dt><dd>' + g.grades.map(function (x) { return t("grades")[x] || x; }).join(", ") + '</dd></div>' +
      '<div style="grid-column:1/-1"><dt>' + t("sum_prep") + '</dt><dd>' + esc(L(g, "prep")) + ' <span class="msg">· ' + (g.device ? t("device") : t("noDevice")) + '</span></dd></div>' +
      '</dl>' + ackHtml() + (g.photo ? figureHtml(g.photo, L(g, "alt"), g.photoSrc, "g-photo") : '<figure class="photo g-photo illus">' + illus(g) + '<figcaption>' + t("illus_cap") + ' · ' + esc(L(g, "name")) + '</figcaption></figure>') + '</header>' +
      '<div class="layout"><aside class="toc" aria-label="' + t("in_page") + '"><p class="eyebrow">' + t("in_page") + '</p><ol>' + blocks.map(function (b) { return '<li><a href="#game-' + g.slug + '" data-jump="b-' + b[0] + '">' + esc(b[1]) + '</a></li>'; }).join("") + '</ol></aside>' +
      '<div class="stack" style="gap:44px;min-width:0">' +
      '<section class="block" id="b-align"><div class="align"><div class="align-top">' + LEAF + '<div><strong>' + t("align_title") + '</strong><br><span>' + esc(g.program) + '</span></div></div>' +
      '<p class="note" style="padding-top:12px;font-size:.88rem;color:var(--ink)"><b>Strand:</b> ' + esc(g.strand) + '</p>' +
      '<ul class="exp">' + g.exp.map(function (e) { return '<li><code>' + esc(e.code) + '</code><div><b>' + esc(e.title) + '</b></div><p>' + esc(e.desc) + '</p></li>'; }).join("") + '</ul><p class="note">' + t("align_note") + '</p></div></section>' +
      '<section class="block" id="b-why"><h2>' + t("b_why") + ' <span class="tag">' + (lang === "vi" ? "THE WHY" : "") + '</span></h2><p class="why">' + esc(L(g, "why")) + '</p></section>' +
      '<section class="block" id="b-video"><h2>' + t("b_video") + ' <span class="tag">' + (Math.min(5, g.steps.en.length) * SCENE_SEC) + 's</span></h2><div id="player"></div></section>' +
      '<section class="block" id="b-plan"><h2>' + t("b_plan") + '</h2>' + planBlock(g) + '</section>' +
      '<section class="block" id="b-vn"><h2>' + t("b_vn") + '</h2>' + vnBlock(g) + '</section>' +
      '<section class="block" id="b-tip"><div class="tip"><div class="avatar" aria-hidden="true">QT</div><div><p class="eyebrow" style="margin-bottom:6px">' + t("tip_from") + '</p><q>' + esc(L(g, "tip")) + '</q><cite>— Phan Thị Quỳnh Trang</cite></div></div></section>' +
      '<section class="block" id="b-feedback"><h2>' + t("b_fb") + '</h2>' + fbBlock(g) + '</section>' +
      '</div></div>';
  }

  /* ---------------------------------------------------------------- Canada – Vietnam overview (figures + sources) */
  var SRC = [
    { id: 1, c: "ON", t: "The Ontario Curriculum, Grades 1–8: Language (2023)", u: "https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language" },
    { id: 2, c: "ON", t: "The Ontario Curriculum, Grades 9 to 12: English as a Second Language and English Literacy Development (2007)", u: "https://www.edu.gov.on.ca/eng/curriculum/secondary/esl912currb.pdf" },
    { id: 3, c: "ON", t: "English Language Learners – ESL and ELD Programs and Services: Policies and Procedures for Ontario Elementary and Secondary Schools, K–12 (2007)", u: "https://www.edu.gov.on.ca/eng/document/esleldprograms/esleldprograms.pdf" },
    { id: 4, c: "ON", t: "STEP – Steps to English Proficiency (Ontario Ministry of Education)", u: "https://www.edugains.ca/newsite/ell/step/" },
    { id: 5, c: "ON", t: "O. Reg. 132/12 – Class Size (Education Act)", u: "https://www.ontario.ca/laws/regulation/120132" },
    { id: 6, c: "ON", t: "R.R.O. 1990, Reg. 298 – Operation of Schools (instructional program ≥ 300 minutes/day)", u: "https://www.ontario.ca/laws/regulation/900298" },
    { id: 7, c: "ON", t: "R.R.O. 1990, Reg. 304 – School Year Calendar (≥ 194 school days)", u: "https://www.ontario.ca/laws/regulation/900304" },
    { id: 8, c: "ON", t: "Ontario Schools, K–12: Policy and Program Requirements (1 credit = 110 scheduled hours)", u: "https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements" },
    { id: 9, c: "ON", t: "Growing Success: Assessment, Evaluation, and Reporting in Ontario Schools (2010)", u: "https://www.edu.gov.on.ca/eng/policyfunding/growsuccess.pdf" },
    { id: 10, c: "VN", t: "Chương trình GDPT môn Tiếng Anh – ban hành kèm Thông tư 32/2018/TT-BGDĐT (26/12/2018)", u: "" },
    { id: 11, c: "VN", t: "Chương trình GDPT – Chương trình tổng thể (Thông tư 32/2018/TT-BGDĐT): thời lượng tiết học, 35 tuần thực học", u: "" },
    { id: 12, c: "VN", t: "Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam – Thông tư 01/2014/TT-BGDĐT", u: "" },
    { id: 13, c: "VN", t: "Điều lệ trường tiểu học – Thông tư 28/2020/TT-BGDĐT (không quá 35 học sinh/lớp)", u: "" },
    { id: 14, c: "VN", t: "Điều lệ trường THCS, THPT và trường phổ thông có nhiều cấp học – Thông tư 32/2020/TT-BGDĐT (không quá 45 học sinh/lớp)", u: "" },
    { id: 15, c: "VN", t: "Đánh giá học sinh: Thông tư 27/2020/TT-BGDĐT (tiểu học) và Thông tư 22/2021/TT-BGDĐT (THCS, THPT)", u: "" },
    { id: 16, c: "VN", t: "Phương án thi tốt nghiệp THPT từ năm 2025 – Quyết định 4068/QĐ-BGDĐT (28/11/2023)", u: "" }
  ];
  function cite(ids) { return ids.map(function (i) { return '<a class="cite" href="#perspective" data-src="' + i + '">[' + i + ']</a>'; }).join(""); }
  function viewPerspective() {
    var vi = lang === "vi";
    var rows = vi ? [
      ["Văn bản chương trình", "Language Lớp 1–8 (2023) [1]; ESL/ELD Lớp 9–12 (2007) [2]; chính sách ELL K–12 (2007) [3]", "Chương trình môn Tiếng Anh GDPT 2018, lớp 3–12 [10]", "Ontario dạy tiếng Anh như ngôn ngữ học tập (ESL); Việt Nam dạy như ngoại ngữ (EFL)."],
      ["Sĩ số", "Lớp K–3: 90% số lớp ≤ 20, tối đa 23; Lớp 4–8: bình quân ≤ 24,5; THPT: bình quân ≤ 23 [5]", "Tiểu học ≤ 35; THCS, THPT ≤ 45 học sinh/lớp [13][14]", "Lớp Việt Nam có thể gần gấp đôi."],
      ["Độ dài tiết / ngày học", "Ngày học ≥ 300 phút giảng dạy [6]; nhà trường tự sắp xếp thời khóa biểu", "Tiết 35 phút (tiểu học), 45 phút (THCS, THPT) [11]", "Hoạt động cho lớp Việt Nam phải gọn trong một tiết."],
      ["Năm học", "≥ 194 ngày học [7]", "35 tuần thực học [11]", "Tương đương nhau."],
      ["Thời lượng tiếng Anh", "1 tín chỉ ESL = 110 giờ [8]", "Tiểu học 4 tiết/tuần = 140 tiết/năm (≈ 82 giờ); THCS, THPT 3 tiết/tuần = 105 tiết/năm (≈ 79 giờ); tổng 1.155 tiết từ lớp 3–12 [10]", "Giờ học tiếng Anh trên lớp ở hai bên tương đương nhau."],
      ["Khung trình độ", "STEP: 6 bước [4]; ESL 5 cấp: ESLAO → ESLEO [2]", "Bậc 1 (A1) hết tiểu học, Bậc 2 (A2) hết THCS, Bậc 3 (B1) hết THPT [10][12]", "Có thể quy đổi tương đối qua CEFR."],
      ["Cấu trúc nội dung", "ESL: 4 mạch – Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy [2]", "Hệ thống chủ điểm, chủ đề; 4 kỹ năng nghe, nói, đọc, viết và kiến thức ngôn ngữ [10]", "Ontario có riêng mạch năng lực văn hóa – xã hội."],
      ["Đánh giá", "Bảng thành tích 4 phạm trù: Knowledge and Understanding, Thinking, Communication, Application; đánh giá vì / là / kết quả học tập [9]", "Đánh giá thường xuyên và định kỳ [15]; từ 2025 Ngoại ngữ là môn tự chọn trong kỳ thi tốt nghiệp THPT [16]", "Áp lực thi cử ở Việt Nam tập trung vào bài thi cuối cấp."]
    ] : [
      ["Curriculum documents", "Language Grades 1–8 (2023) [1]; ESL/ELD Grades 9–12 (2007) [2]; ELL policy K–12 (2007) [3]", "2018 General Education Programme, English, Grades 3–12 [10]", "Ontario teaches English as the language of schooling (ESL); Vietnam teaches it as a foreign language (EFL)."],
      ["Class size", "K–3: 90% of classes ≤ 20, max 23; Grades 4–8: board average ≤ 24.5; secondary: board average ≤ 23 [5]", "Primary ≤ 35; lower and upper secondary ≤ 45 students per class [13][14]", "A Vietnamese class can be almost twice as large."],
      ["Period / school day", "≥ 300 minutes of instruction a day [6]; schools set their own timetable", "35-minute periods (primary), 45-minute periods (secondary) [11]", "Activities for Vietnam must fit inside one period."],
      ["School year", "≥ 194 school days [7]", "35 teaching weeks [11]", "Roughly the same."],
      ["English time", "1 ESL credit = 110 hours [8]", "Primary 4 periods/week = 140 periods/year (≈ 82 h); secondary 3 periods/week = 105 periods/year (≈ 79 h); 1,155 periods in Grades 3–12 [10]", "English class hours are similar on both sides."],
      ["Proficiency framework", "STEP: 6 steps [4]; ESL 5 levels: ESLAO → ESLEO [2]", "Level 1 (A1) end of primary, Level 2 (A2) end of lower secondary, Level 3 (B1) end of upper secondary [10][12]", "Both can be roughly mapped through the CEFR."],
      ["Content structure", "ESL: 4 strands – Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy [2]", "Themes and topics; four skills plus language knowledge [10]", "Ontario has a separate socio-cultural competence strand."],
      ["Assessment", "Achievement chart with 4 categories: Knowledge and Understanding, Thinking, Communication, Application; assessment for / as / of learning [9]", "Ongoing and periodic assessment [15]; from 2025 a foreign language is an elective subject in the national graduation exam [16]", "Exam pressure in Vietnam centres on end-of-level tests."]
    ];
    var calc = vi ? {
      h: "Con số cần so sánh nhất: thời gian nói của mỗi học sinh",
      p: "Ước tính đơn giản: nếu một nửa tiết học dành cho học sinh nói lần lượt trước lớp, mỗi em có bao nhiêu giây?",
      a: ["Việt Nam: 45 phút × 50% ÷ 45 học sinh", "≈ 30 giây/em"], b: ["Ontario: 45 phút × 50% ÷ 24 học sinh", "≈ 56 giây/em"],
      c: ["Cả hai lớp khi nói theo cặp cùng lúc", "≈ 11 phút/em"],
      n: "Đây là phép tính minh họa, không phải số liệu khảo sát. Nó cho thấy vì sao các hoạt động theo cặp và theo nhóm là chìa khóa với lớp đông."
    } : {
      h: "The figure that matters most: speaking time per student",
      p: "A simple estimate: if half a lesson is spent on students speaking one at a time in front of the class, how many seconds does each student get?",
      a: ["Vietnam: 45 min × 50% ÷ 45 students", "≈ 30 seconds each"], b: ["Ontario: 45 min × 50% ÷ 24 students", "≈ 56 seconds each"],
      c: ["Either class speaking in pairs at the same time", "≈ 11 minutes each"],
      n: "This is an illustrative calculation, not survey data. It shows why pair and group activities are the key to large classes."
    };
    var D = vi ? {
      vn_h: "Giáo viên Việt Nam có thể áp dụng ngay", vn: ["Viết mục tiêu và tiêu chí “I can…” lên góc bảng ở đầu mỗi tiết, như cách Ontario công khai tiêu chí thành công [9].", "Thêm một mục tiêu văn hóa – giao tiếp cho mỗi bài, học từ mạch Socio-cultural Competence của ESL Ontario [2].", "Tổ chức nói theo cặp, theo dãy để tăng thời gian nói mà không cần di chuyển."],
      on_h: "Giáo viên Ontario có thể học từ lớp Việt Nam", on: ["Nề nếp và tín hiệu chuyển hoạt động rõ ràng giúp lớp đông làm việc hiệu quả.", "Làm mẫu đồng thanh tạo an toàn cho học sinh mới đến trước khi nói cá nhân.", "Chương trình theo chủ điểm với chuẩn đầu ra từng cấp [10] giúp lên kế hoạch dài hạn rõ ràng."],
      note: "Số liệu tổng hợp từ văn bản hiện hành tại thời điểm biên soạn (11/2026). Văn bản có thể được sửa đổi; thầy cô nên kiểm tra bản mới nhất trước khi trích dẫn.", src_h: "Nguồn tham khảo", on_l: "Ontario, Canada", vn_l: "Việt Nam", col: ["Tiêu chí", "Ontario", "Việt Nam", "Ý nghĩa"]
    } : {
      vn_h: "Vietnamese teachers can apply now", vn: ["Write the learning goal and “I can…” criteria on the board at the start of each lesson, as Ontario makes success criteria visible [9].", "Add one socio-cultural communication goal to each lesson, borrowing from Ontario's ESL Socio-cultural Competence strand [2].", "Run speaking in pairs and by rows to increase talk time without moving furniture."],
      on_h: "Ontario teachers can learn from Vietnamese classrooms", on: ["Clear routines and transition signals help large groups work efficiently.", "Choral modelling gives newcomers a safe start before speaking alone.", "A theme-based curriculum with exit targets for each level [10] makes long-term planning clear."],
      note: "Figures compiled from the documents in force at the time of writing (November 2026). Documents can be amended; please check the latest version before citing.", src_h: "Sources", on_l: "Ontario, Canada", vn_l: "Vietnam", col: ["Factor", "Ontario", "Vietnam", "What it means"]
    };
    var CARDS = vi ? [
      ["Chương trình", ["ESL / ELD", "Ngôn ngữ học tập. Language 1–8 (2023) [1]; ESL/ELD 9–12 (2007) [2]; chính sách ELL (2007) [3]"], ["EFL", "Ngoại ngữ. Chương trình môn Tiếng Anh GDPT 2018, lớp 3–12 [10]"]],
      ["Sĩ số lớp", ["≈ 20–24", "K–3: 90% lớp ≤ 20, tối đa 23; lớp 4–8 bình quân ≤ 24,5; THPT bình quân ≤ 23 [5]"], ["35–45", "Tiểu học ≤ 35; THCS, THPT ≤ 45 học sinh/lớp [13][14]"], [24, 45, "học sinh"], "Lớp Việt Nam có thể gần gấp đôi."],
      ["Một tiết học", ["≥ 300 phút/ngày", "Tổng thời gian dạy mỗi ngày [6]; nhà trường tự xếp thời khóa biểu"], ["35–45 phút/tiết", "Tiểu học 35 phút; THCS, THPT 45 phút [11]"], null, "Hoạt động cho lớp Việt Nam phải gọn trong một tiết."],
      ["Năm học", ["≥ 194 ngày", "Số ngày học tối thiểu [7]"], ["35 tuần", "Thực học [11]"], null, "Tương đương nhau."],
      ["Thời lượng tiếng Anh", ["110 giờ", "1 tín chỉ ESL [8]"], ["≈ 80 giờ/năm", "Tiểu học 140 tiết/năm (≈ 82 giờ); THCS, THPT 105 tiết/năm (≈ 79 giờ); tổng 1.155 tiết lớp 3–12 [10]"], [110, 82, "giờ"], "Giờ học tiếng Anh trên lớp ở hai bên tương đương nhau."],
      ["Khung trình độ", ["STEP 6 bước", "ESL 5 cấp: ESLAO → ESLEO [4][2]"], ["3 bậc", "Bậc 1 (A1) hết tiểu học, Bậc 2 (A2) hết THCS, Bậc 3 (B1) hết THPT [10][12]"], null, "Quy đổi tương đối qua CEFR."],
      ["Cấu trúc nội dung", ["4 mạch", "Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy [2]"], ["4 kỹ năng + kiến thức ngôn ngữ", "Hệ thống chủ điểm, chủ đề [10]"], null, "Ontario có riêng mạch năng lực văn hóa – xã hội."],
      ["Đánh giá", ["4 phạm trù", "Knowledge and Understanding, Thinking, Communication, Application; đánh giá vì / là / kết quả học tập [9]"], ["Thường xuyên + định kỳ", "Đánh giá thường xuyên và định kỳ [15]; từ 2025 Ngoại ngữ là môn tự chọn trong thi tốt nghiệp THPT [16]"], null, "Áp lực thi cử tập trung vào bài thi cuối cấp."]
    ] : [
      ["Curriculum", ["ESL / ELD", "English as the language of schooling. Language 1–8 (2023) [1]; ESL/ELD 9–12 (2007) [2]; ELL policy (2007) [3]"], ["EFL", "English as a foreign language. 2018 General Education Programme, Grades 3–12 [10]"]],
      ["Class size", ["≈ 20–24", "K–3: 90% of classes ≤ 20, max 23; Grades 4–8 average ≤ 24.5; secondary average ≤ 23 [5]"], ["35–45", "Primary ≤ 35; lower and upper secondary ≤ 45 per class [13][14]"], [24, 45, "students"], "A Vietnamese class can be almost twice as large."],
      ["One lesson", ["≥ 300 min/day", "Instructional time a day [6]; schools set their own timetable"], ["35–45 min/period", "Primary 35 min; secondary 45 min [11]"], null, "Activities for Vietnam must fit inside one period."],
      ["School year", ["≥ 194 days", "Minimum instructional days [7]"], ["35 weeks", "Teaching weeks [11]"], null, "Roughly the same."],
      ["English time", ["110 hours", "1 ESL credit [8]"], ["≈ 80 h/year", "Primary 140 periods/year (≈ 82 h); secondary 105 periods/year (≈ 79 h); 1,155 periods in Grades 3–12 [10]"], [110, 82, "hours"], "English class hours are similar on both sides."],
      ["Proficiency framework", ["STEP, 6 steps", "ESL 5 levels: ESLAO → ESLEO [4][2]"], ["3 levels", "Level 1 (A1) end of primary, Level 2 (A2) end of lower secondary, Level 3 (B1) end of upper secondary [10][12]"], null, "Roughly mapped through the CEFR."],
      ["Content structure", ["4 strands", "Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy [2]"], ["4 skills + language knowledge", "Themes and topics [10]"], null, "Ontario has a separate socio-cultural competence strand."],
      ["Assessment", ["4 categories", "Knowledge and Understanding, Thinking, Communication, Application; assessment for / as / of learning [9]"], ["Ongoing + periodic", "Ongoing and periodic assessment [15]; from 2025 a foreign language is an elective in the national graduation exam [16]"], null, "Exam pressure centres on end-of-level tests."]
    ];
    var ICO = ["🎓", "👥", "⏱️", "📅", "🕓", "🪜", "🧩", "📋"];
    var CH = vi ? [
      [["Ngôn ngữ học tập", "Language 1–8", "ESL/ELD 9–12", "ELL policy"], ["Ngoại ngữ", "GDPT 2018", "Lớp 3–12"]],
      [{ dots: 24 }, { dots: 45 }],
      [["≥ 300 phút/ngày"], ["35 phút (tiểu học)", "45 phút (THCS, THPT)"]],
      [{ bar: [194, "ngày"] }, { bar: [175, "ngày ≈ 35 tuần × 5"] }],
      [{ bar: [110, "giờ / 1 tín chỉ ESL"] }, { bar: [82, "giờ / năm (≈ 79–82)"] }],
      [{ steps: 6, lab: "STEP" }, { steps: 3, lab: "A1 · A2 · B1" }],
      [["Listening & Speaking", "Reading", "Writing", "Socio-cultural & Media"], ["Nghe", "Nói", "Đọc", "Viết", "Kiến thức ngôn ngữ"]],
      [["Knowledge", "Thinking", "Communication", "Application"], ["Thường xuyên", "Định kỳ", "Thi tốt nghiệp"]]
    ] : [
      [["Language of schooling", "Language 1–8", "ESL/ELD 9–12", "ELL policy"], ["Foreign language", "GDPT 2018", "Grades 3–12"]],
      [{ dots: 24 }, { dots: 45 }],
      [["≥ 300 min/day"], ["35 min (primary)", "45 min (secondary)"]],
      [{ bar: [194, "days"] }, { bar: [175, "days ≈ 35 weeks × 5"] }],
      [{ bar: [110, "hours / 1 ESL credit"] }, { bar: [82, "hours / year (≈ 79–82)"] }],
      [{ steps: 6, lab: "STEP" }, { steps: 3, lab: "A1 · A2 · B1" }],
      [["Listening & Speaking", "Reading", "Writing", "Socio-cultural & Media"], ["Listening", "Speaking", "Reading", "Writing", "Language knowledge"]],
      [["Knowledge", "Thinking", "Communication", "Application"], ["Ongoing", "Periodic", "Graduation exam"]]
    ];
    function viz(v, side, mx) {
      if (v.dots) { var d = ""; for (var i = 0; i < v.dots; i++) d += '<i></i>'; return '<div class="pdots ' + side + '" aria-hidden="true">' + d + '</div><span class="pn">' + v.dots + (vi ? " học sinh" : " students") + '</span>'; }
      if (v.bar) return '<div class="pbar ' + side + '" aria-hidden="true"><b style="width:' + Math.round(v.bar[0] / mx * 100) + '%"></b></div><span class="pn">' + v.bar[0] + ' ' + esc(v.bar[1]) + '</span>';
      if (v.steps) { var st = ""; for (var j = 1; j <= v.steps; j++) st += '<i style="height:' + (10 + j * 8) + 'px"></i>'; return '<div class="pstep ' + side + '" aria-hidden="true">' + st + '</div><span class="pn">' + v.steps + (vi ? " bậc · " : " levels · ") + esc(v.lab) + '</span>'; }
      return '<div class="pchips ' + side + '">' + v.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join("") + '</div>';
    }
    var VS = '<div class="vs-hero" aria-hidden="true"><div class="vsh on"><span>🍁</span><b>Ontario, Canada</b><small>ESL / ELD</small></div><div class="vsh-mid">VS</div><div class="vsh vn"><span>🇻🇳</span><b>' + (vi ? "Việt Nam" : "Vietnam") + '</b><small>EFL · GDPT 2018</small></div></div><div class="vs-grid">' + CARDS.map(function (c, i) {
      var v = CH[i], mx = v[0].bar ? Math.max(v[0].bar[0], v[1].bar[0]) : 1;
      return '<article class="vs"><h3><span class="vs-ico" aria-hidden="true">' + ICO[i] + '</span>' + esc(c[0]) + '</h3><div class="vs-row"><div class="vs-side"><span class="tag">Ontario</span><span class="big">' + esc(c[1][0]) + '</span>' + viz(v[0], "on", mx) + '<span class="sm">' + withCites(c[1][1]) + '</span></div><div class="vs-side vn"><span class="tag">' + (vi ? "Việt Nam" : "Vietnam") + '</span><span class="big">' + esc(c[2][0]) + '</span>' + viz(v[1], "vn", mx) + '<span class="sm">' + withCites(c[2][1]) + '</span></div></div>' +
        (c[4] ? '<p class="so-what">' + esc(c[4]) + '</p>' : '') + '</article>';
    }).join("") + '</div>';
    function srcList(c) { return '<ol class="srcs">' + SRC.filter(function (s) { return s.c === c; }).map(function (s) { return '<li id="src-' + s.id + '" value="' + s.id + '">' + (s.u ? '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + ' ↗</a>' : esc(s.t)) + '</li>'; }).join("") + '</ol>'; }
    function withCites(txt) { return esc(txt).replace(/\[(\d+)\]/g, function (m, n) { return cite([+n]); }); }
    return '<section><p class="eyebrow">' + esc(t("site")) + '</p><h1 id="page-h" style="margin:6px 0 10px">' + t("persp_title") + '</h1><p class="lede">' + t("persp_lede") + '</p></section>' +
      '<section>' + VS + '<p class="msg" style="margin-top:10px">' + D.note + '</p></section>' +
      '<section class="panel stack"><h2>' + calc.h + '</h2><p>' + calc.p + '</p><div class="calc">' +
      [calc.a, calc.b, calc.c].map(function (x, i) { return '<div class="stat' + (i === 2 ? " hl" : "") + '"><div class="l">' + esc(x[0]) + '</div><div class="v">' + esc(x[1]) + '</div></div>'; }).join("") + '</div><p class="msg">' + calc.n + '</p></section>' +
      '<section class="cols">' + [[D.vn_h, D.vn], [D.on_h, D.on]].map(function (c) { return '<div class="panel"><h3>' + esc(c[0]) + '</h3><ul class="lst">' + c[1].map(function (x) { return '<li>' + withCites(x) + '</li>'; }).join("") + '</ul></div>'; }).join("") + '</section>' +
      '<section id="sources"><h2 style="margin-bottom:12px">' + D.src_h + '</h2><div class="cols"><div><h3>' + D.on_l + '</h3>' + srcList("ON") + '</div><div><h3>' + D.vn_l + '</h3>' + srcList("VN") + '</div></div></section>';
  }

  function TT(vi) {
    return [
      ["img/tt-viettesol-activity.jpg", vi ? "Trang Phan hướng dẫn giáo viên thực hành hoạt động với thẻ tranh trên bàn tại hội thảo VietTESOL International Convention 2022, Đại học Nha Trang." : "Trang Phan guides teachers through a hands-on picture-card activity at the VietTESOL International Convention 2022, Nha Trang University.", "VietTESOL 2022"],
      ["img/tt-workshop-floor.jpg", vi ? "Trang Phan cúi xuống hướng dẫn một nhóm giáo viên ngồi quây trên sàn làm nhiệm vụ nhóm trong buổi tập huấn." : "Trang Phan leans in to coach a group of teachers crouched on the floor working on a group task during a workshop.", vi ? "Hoạt động nhóm" : "Group task"],
      ["img/tt-viettesol-flashcards.jpg", vi ? "Trang Phan giơ thẻ từ vựng quần áo, minh họa cách dạy từ vựng cho giáo viên tại VietTESOL 2022." : "Trang Phan holds up a clothing flashcard to model vocabulary teaching for teachers at VietTESOL 2022.", vi ? "Làm mẫu dạy từ vựng" : "Modelling vocabulary"],
      ["img/tt-viettesol-talk.jpg", vi ? "Trang Phan trình bày tại bục giảng hội thảo VietTESOL 2022." : "Trang Phan presents at the lectern at VietTESOL 2022.", vi ? "Báo cáo hội thảo" : "Conference talk"],
      ["img/tt-viettesol-room.jpg", vi ? "Trang Phan mỉm cười trao đổi với giáo viên trong phòng học tại VietTESOL 2022." : "Trang Phan smiles as she talks with teachers in a classroom at VietTESOL 2022.", vi ? "Trao đổi với giáo viên" : "Talking with teachers"],
      ["img/tt-reading-certificates.jpg", vi ? "Các giáo viên cầm giấy chứng nhận sau buổi tập huấn Reading is Fun." : "Teachers hold their certificates after a Reading is Fun training session.", vi ? "Hoàn thành khóa tập huấn" : "Course completion"]
    ];
  }
  function PROJECTS(vi) {
    function T(a, b) { return vi ? a : b; }
    return {
      h: T("Dự án tiêu biểu, có số liệu kiểm chứng", "Selected projects, with verifiable figures"),
      lede: T("Ba dự án dưới đây là những việc tác giả đã trực tiếp làm. Mỗi dự án có số liệu và tài liệu đi kèm.", "Three projects the author worked on directly, each with figures and supporting documents."),
      list: [
        { id: "mentoring", yr: "2017 – 2025", t: T("Chương trình Mentoring phát triển nghề nghiệp cho nhà giáo dục", "Mentoring Program for Professional Development of Educators"), role: T("Người sáng lập (từ 2021)", "Founder (from 2021)"),
          p: T("Bắt đầu từ năm 2017 với việc kèm cặp cá nhân trong Asia Mentoring Program (RMIT University) và các dự án giáo dục cộng đồng tại Việt Nam. Năm 2021, tác giả chính thức sáng lập chương trình, đã qua ba mùa, có hàng trăm mentee và mentor, với sự đồng hành của các đối tác công nghệ giáo dục như ClassIn, ClassPoint và Flyers. Chương trình đã đăng ký bản quyền tại Cục Bản quyền tác giả Việt Nam.",
               "It began in 2017 with one-to-one mentoring in the Asia Mentoring Program (RMIT University) and community education projects in Vietnam. In 2021 the author officially founded the programme, which has run three seasons with hundreds of mentees and mentors, supported by EdTech partners including ClassIn, ClassPoint and Flyers. The programme holds a copyright registration from the Copyright Office of Vietnam."),
          stats: [["100+", T("mentee được hỗ trợ phát triển nghề nghiệp", "mentees supported in their careers")], ["10.000+", T("giáo viên, học sinh và phụ huynh tiếp cận qua workshop, webinar", "teachers, students and families reached through workshops and webinars")], ["8.400+", T("giáo viên trong cộng đồng trên khắp Việt Nam", "teachers in the community across Vietnam")], ["45 + 4", T("mentee và mentor chọn ra từ hàng trăm hồ sơ", "mentees and mentors chosen from hundreds of applicants")], ["95%", T("mentee hài lòng", "mentee satisfaction")], ["80%", T("mentee cải thiện thương hiệu cá nhân", "mentees improved their personal branding")], ["78%", T("mentee tiến bộ trong sự nghiệp (học bổng, thăng tiến, khởi xướng dự án giáo dục)", "mentees advanced their careers (scholarships, promotions, new education initiatives)")]],
          pts: [T("Workshop về SEO, xây dựng thương hiệu cá nhân và kể chuyện trong giảng dạy tiếng Anh; ngày Matching Day ghép 10 cặp mentor – mentee.", "Workshops on SEO, personal branding and storytelling in ELT; a Matching Day pairing 10 mentor–mentee pairs."), T("Cộng đồng “I Love Teaching” với sự tham gia sôi nổi trên toàn quốc.", "The “I Love Teaching” community with strong nationwide engagement."), T("Đóng góp cho mục tiêu SDG 4 (giáo dục chất lượng) và gắn kết giáo dục Việt Nam – Canada.", "Contributes to SDG 4 (quality education) and to Vietnam–Canada education ties.")],
          rec: [T("Top 10 Most Influential Entrepreneurs in Education (Education View US, 2023)", "Top 10 Most Influential Entrepreneurs in Education (Education View US, 2023)"), T("Top Empowerment Women in Education (2024)", "Top Empowerment Women in Education (2024)"), T("Top 10 Trí thức tiêu biểu quốc gia, Việt Nam (2025)", "Top 10 National Outstanding Intellectuals, Vietnam (2025)")],
          links: [[T("IGI Global: chương sách về chương trình", "IGI Global: book chapter on the programme"), "https://www.igi-global.com/book/technology-mediated-language-learning-teaching/333646"], ["Brainz Magazine: Mentoring Program For Professional Development Of Educators", "https://www.brainzmagazine.com/post/mentoring-program-for-professional-development-of-educators"], ["Brainz Magazine: A Career Path For Vietnamese Educators In the 4.0 Century", "https://www.brainzmagazine.com/post/a-career-path-for-vietnamese-educators-in-the-4-0-century"], ["Brainz Magazine: Exclusive Interview With Phan Thi Quynh Trang", "https://www.brainzmagazine.com/post/global-teacher-exclusive-interview-with-phan-thi-quynh-trang"]] },
        { id: "twinkl", yr: T("11/2021 – 12/2022", "Nov 2021 – Dec 2022"), t: T("Twinkl Việt Nam: Content Creator & Ambassador Lead", "Twinkl Vietnam: Content Creator & Ambassador Lead"), role: T("Làm việc từ xa, đặt tại Việt Nam", "Remote, Vietnam-based"),
          p: T("Mục tiêu là đưa Twinkl đến gần hơn với giáo viên, phụ huynh và học sinh Việt Nam bằng nội dung chất lượng và một cộng đồng trực tuyến. Tác giả bắt đầu ở vị trí viết nội dung và dẫn dắt nhóm đại sứ thương hiệu.",
               "The aim was to bring Twinkl closer to Vietnamese teachers, parents and students through quality content and an online community. The author started as a content writer and led the brand-ambassador team."),
          stats: [["5.000+", T("giáo viên và phụ huynh được tiếp cận", "educators and parents reached")], ["13.381", T("lượt tải, đánh giá 4,9/5", "downloads, rated 4.9/5")], ["+40%", T("tỷ lệ chuyển đổi", "conversion rate increase")], ["25+", T("đại sứ thương hiệu được tuyển chọn, đào tạo và quản lý", "brand ambassadors recruited, trained and managed")], ["12", T("webinar về phương pháp dạy học và đồng hành cùng phụ huynh", "webinars on teaching methods and parent engagement")], [T("GĐ 4/6","Phase 4/6"), T("nhóm đại sứ tiến từ Giai đoạn 1 lên Giai đoạn 4", "ambassador team advanced from Phase 1 to Phase 4")]],
          pts: [T("Soạn và tối ưu tài liệu giáo dục, webinar và chiến dịch truyền thông số; theo dõi lượt tải, đánh giá và tỷ lệ chuyển đổi hằng tháng.", "Created and optimised educational materials, webinars and digital campaigns; tracked downloads, ratings and conversion monthly."), T("Chủ đề webinar gồm học qua âm nhạc, dạy ngữ pháp qua đóng vai, phương pháp dạy phát âm, rối loạn ngôn ngữ ở trẻ mầm non và cách dùng tài nguyên Twinkl cùng con.", "Webinar topics included music-based learning, teaching grammar through role play, pronunciation methods, language disorders in preschoolers and using Twinkl resources with children.")],
          rec: [], links: [] },
        { id: "who", yr: "2010 – 2012", t: T("Dự án thí điểm WHO Trauma Care Checklist tại Bệnh viện Đa khoa Đức Giang", "WHO Trauma Care Checklist pilot at Duc Giang General Hospital"), role: T("Trợ lý dự án, Bệnh viện Đa khoa Đức Giang, Hà Nội", "Project Assistant, Duc Giang General Hospital, Hanoi"),
          p: T("Bệnh viện là một trong 13 bệnh viện trên thế giới được WHO chọn thí điểm bảng kiểm chăm sóc chấn thương. Tác giả hỗ trợ Ban chỉ đạo và các chuyên gia WHO triển khai bảng kiểm ở ba khoa (Cấp cứu, Chấn thương chỉnh hình, Gây mê hồi sức): điều phối tập huấn, điều chỉnh quy trình cho phù hợp Việt Nam và báo cáo số liệu về WHO.",
               "The hospital was one of only 13 worldwide selected by WHO to pilot the Trauma Care Checklist. The author supported the Steering Committee and WHO experts in rolling out the checklist across three departments (Emergency, Orthopaedics and Trauma Surgery, Anaesthesia/ICU): coordinating training, adapting protocols to Vietnam and reporting data to WHO."),
          stats: [["13", T("bệnh viện trên toàn cầu tham gia thí điểm", "hospitals worldwide in the pilot")], ["60+", T("bác sĩ và điều dưỡng được tập huấn", "physicians and nurses trained")], ["3", T("đợt tập huấn, tại 3 khoa", "training rounds, across 3 departments")], ["59% → 73%", T("kiểm tra cột sống cổ", "cervical spine checks")], ["36% → 67%", T("trao đổi về giảm đau", "analgesic discussions")], ["90% → 94%", T("kiểm tra mạch ngoại vi", "distal pulse checks")]],
          pts: [T("Đại diện Việt Nam tại hội thảo APTQIN về hệ thống chấn thương và cải tiến chất lượng ở Malaysia (5/2012).", "Represented Vietnam at the APTQIN trauma systems and quality-improvement workshop in Malaysia (May 2012)."), T("Dữ liệu của dự án góp vào nghiên cứu đa quốc gia của WHO, đăng trên World Journal of Surgery (2012).", "Project data contributed to WHO's multi-country study, published in the World Journal of Surgery (2012)."), T("Bảng kiểm trở thành một phần quy trình chăm sóc của bệnh viện, giúp phối hợp nhóm tốt hơn và giảm sai sót có thể phòng tránh.", "The checklist became part of the hospital's care routine, improving teamwork and reducing preventable errors.")],
          rec: [], links: [] }
      ]
    };
  }
  function clubHtml(vi, b) {
    var h = vi ? "Câu lạc bộ tiếng Anh cho bác sĩ" : "The English club for doctors", c = vi ? "Buổi sinh hoạt câu lạc bộ tiếng Anh tại bệnh viện" : "A session of the hospital English club";
    return '<h4 style="margin:16px 0 8px;font-family:var(--f-head)">' + h + '</h4><div class="gal"><figure class="photo"><img src="' + esc(b + "img/club-bacsi.jpg") + '" alt="' + esc(vi ? "Trang Phan cùng ba đồng nghiệp mặc áo blouse trắng, cười chụp ảnh tự sướng trong bệnh viện." : "Trang Phan and three colleagues in white coats smiling in a selfie at the hospital.") + '" loading="lazy" decoding="async" style="aspect-ratio:4/3;object-fit:cover"><figcaption>' + esc(vi ? "Cùng đồng nghiệp tại bệnh viện" : "With colleagues at the hospital") + '</figcaption></figure>' +
      [1, 2].map(function (n) { return '<figure class="photo vid"><video controls preload="none" playsinline poster="' + esc(b + "vid/club" + n + ".jpg") + '" aria-label="' + esc(c + " (" + n + ")") + '"><source src="' + esc(b + "vid/club" + n + ".mp4") + '" type="video/mp4"></video><figcaption>' + esc(c + " (" + n + ")") + '</figcaption></figure>'; }).join("") + '</div>';
  }
  function projectsHtml() {
    var vi = lang === "vi", P = PROJECTS(vi), b = CFG.base || "";
    var X = {
      mentoring: { img: "img/about-mentoring.jpg", alt: vi ? "Infographic Mentoring Program: dòng thời gian, con số, tác động toàn cầu và ảnh cộng đồng." : "Mentoring Program infographic: timeline, key numbers, global impact and community photos.", one: vi ? "Chương trình mentoring phát triển nghề nghiệp cho nhà giáo dục, từ 2017 đến 2025." : "A mentoring programme for the professional growth of educators, 2017–2025." },
      twinkl: { img: "img/about-twinkl.jpg", alt: vi ? "Infographic Twinkl Vietnam Project: trách nhiệm, thành tựu, phản hồi và dòng thời gian." : "Twinkl Vietnam Project infographic: responsibilities, achievements, feedback and timeline.", one: vi ? "Content Creator và Ambassador Lead cho Twinkl tại Việt Nam, 11/2021 – 12/2022." : "Content Creator and Ambassador Lead for Twinkl in Vietnam, Nov 2021 – Dec 2022." },
      who: { img: "img/about-who.jpg", alt: vi ? "Infographic dự án WHO Trauma Care Checklist tại Bệnh viện Đa khoa Đức Giang: tổng quan, tác động, mốc thời gian." : "WHO Trauma Care Checklist at Duc Giang General Hospital infographic: overview, impact and timeline.", yr: "2010 – 2017", role: vi ? "Bệnh viện Đa khoa Đức Giang, Hà Nội" : "Duc Giang General Hospital, Hanoi", one: vi ? "Từ 2010 đến 2017 tôi công tác tại Bệnh viện Đa khoa Đức Giang, phụ trách (lead) câu lạc bộ tiếng Anh cho bác sĩ. Trong đó có dự án thí điểm WHO Trauma Care Checklist (2010 – 2012), một trong 13 bệnh viện trên thế giới." : "From 2010 to 2017 I worked at Duc Giang General Hospital, where I led the English club for doctors. This included the WHO Trauma Care Checklist pilot (2010 – 2012), one of 13 hospitals worldwide." }
    };
    return '<section id="projects"><h2 style="margin-bottom:6px">' + esc(P.h) + '</h2><p class="msg" style="max-width:70ch;margin-bottom:14px">' + esc(P.lede) + '</p><div class="proj-list">' + P.list.map(function (p) {
      var x = X[p.id] || {};
      return '<article class="proj" id="proj-' + p.id + '"><p class="eyebrow">' + esc(x.yr || p.yr) + '</p><h3>' + esc(p.t) + '</h3><p class="proj-role">' + esc(x.role || p.role) + '</p><p>' + esc(x.one || p.p) + '</p>' +
        (x.img ? '<div class="infog" tabindex="0" role="region" aria-label="' + esc(x.alt) + '"><img src="' + esc(b + x.img) + '" alt="' + esc(x.alt) + '" loading="lazy" decoding="async"></div><p class="msg infog-h"><a href="' + esc(b + x.img) + '" target="_blank" rel="noopener">' + (vi ? "Mở infographic đầy đủ ↗" : "Open the full infographic ↗") + '</a> · ' + (vi ? "kéo trong khung để xem hết" : "scroll inside the frame to see it all") + '</p>' : "") +
        (p.id === "who" ? clubHtml(vi, b) : "") + (p.links.length ? '<ul class="lst" style="margin-top:8px">' + p.links.map(function (l) { return '<li><a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a></li>'; }).join("") + '</ul>' : "") + '</article>';
    }).join("") + '</div></section>';
  }
  function viewContact() {
    var vi = lang === "vi", gf = CFG.googleForm || {}, site = CFG.authorSite || "https://www.trangphan.org", fb = CFG.facebook || "https://www.facebook.com/phanthiquynhtrang.cvcec/";
    function card(ic, h, p, href, b) { return '<div class="panel stack"><div style="font-size:1.8rem">' + ic + '</div><h3>' + h + '</h3><p class="msg">' + p + '</p><p><a class="btn" href="' + esc(href) + '" target="_blank" rel="noopener">' + b + ' ↗</a></p></div>'; }
    return '<h1 id="page-h">' + (vi ? "Liên hệ và góp ý" : "Contact and feedback") + '</h1>' +
      '<p class="lede">' + (vi ? "Mình rất muốn nghe ý kiến của thầy cô về các hoạt động và về website này: điều gì dùng được, điều gì cần chỉnh cho lớp của thầy cô." : "I would love to hear what you think of the activities and this site: what worked, and what needs adapting for your class.") + '</p>' +
      '<div class="two" style="margin-top:18px">' +
      (gf.url ? card("📝", vi ? "Góp ý qua Google Form" : "Feedback form", vi ? "Điền form ngắn, mất khoảng hai phút. Ý kiến của thầy cô giúp mình chỉnh sửa học liệu." : "A short form, about two minutes. Your comments help me improve the materials.", gf.url, vi ? "Điền form góp ý" : "Open the form") : '') +
      card("🌐", "www.trangphan.org", vi ? "Trang cá nhân của tác giả: bài viết, dự án và hoạt động giảng dạy." : "The author’s personal site: writing, projects and teaching.", site, vi ? "Mở trang cá nhân" : "Visit the site") +
      card("💬", "Facebook", vi ? "Theo dõi và nhắn tin trực tiếp cho tác giả." : "Follow and message the author directly.", fb, vi ? "Mở Facebook" : "Open Facebook") +
      '</div>';
  }
  function viewAbout() {
    var vi = lang === "vi";
    var A = vi ? {
      role: "Giáo viên tiếng Anh · Ngoại giao giáo dục Canada – Việt Nam",
      intro: ["Phan Thị Quỳnh Trang có hơn 10 năm làm việc trong giáo dục quốc tế. Chị dạy tiếng Anh tại Việt Nam từ năm 2015 cho trẻ mầm non, học sinh tiểu học, thiếu niên và người lớn, đồng thời tập huấn giáo viên tiếng Anh trên khắp Việt Nam.",
              "Khi mới sang Canada, chị vẫn tiếp tục đào tạo giáo viên tiếng Anh trực tuyến qua chương trình Mentoring program. Từ năm 2023, chị tập trung vào ngoại giao giáo dục và kết nối giáo dục giữa Canada và Việt Nam.", "Hơn 90 hoạt động trên website chỉ là một phần nhỏ còn lưu giữ lại từ những năm đứng lớp. Chị muốn biến tấu chúng, đặt trong sự giao thoa với kinh nghiệm làm việc cùng TESL Ontario."],
      exp_h: "Kinh nghiệm giáo dục tiêu biểu",
      exp: [["2023 – nay", "Ngoại giao giáo dục & kết nối giáo dục Canada – Việt Nam", "Toronto"], ["2022 – 2023", "Điều phối viên Đào tạo & Phát triển, Wee College", "Moncton, NB"], ["Những năm đầu ở Canada", "Mentoring program: đào tạo giáo viên tiếng Anh trực tuyến", "Trực tuyến"], ["2019 – 2022", "Phát triển chương trình học thuật & đối tác, FLYER (EdTech); biên soạn nội dung, Twinkl Việt Nam", "Trực tuyến"], ["2016 – 2020", "Chuyên gia tư vấn, Educap – Australian International TESOL (AIT): đào tạo TESOL, xây dựng mạng lưới giáo viên", "Hà Nội"], ["2015 – 2022", "Giáo viên tiếng Anh tự do & giảng viên doanh nghiệp", "Việt Nam"], ["2010 – 2017", "Bệnh viện Đa khoa Đức Giang: trợ lý dự án WHO Trauma Care Checklist; phụ trách câu lạc bộ tiếng Anh cho bác sĩ", "Hà Nội"]],
      edu_h: "Học vấn & chứng chỉ",
      edu: ["Thạc sĩ (MA) TESOL – Horizons University, Pháp (2023, học bổng 50%)", "Văn bằng sau đại học TESOL – Đại học Hà Nội", "Level 7 Postgraduate Diploma in TESOL – Training Qualifications UK", "Professional TESOL Diploma – Australian International TESOL", "Văn bằng Giáo dục Mầm non – Cao đẳng Sư phạm Hà Nội", "Cử nhân Kế toán – Tài chính – Học viện Ngân hàng", "Graduate Certificate in Government Relations – Seneca Polytechnic (đang học)"],
      inc_h: "Bồi dưỡng về giáo dục hòa nhập",
      inc: ["Giáo dục Montessori cho trẻ 2–6 tuổi", "Trị liệu bằng rối (Therapeutic Puppetry) – ĐH Sư phạm Hà Nội", "Đánh giá rối loạn ngôn ngữ – ĐH Sư phạm Hà Nội", "Hoạt động trị liệu cho trẻ có nhu cầu đặc biệt trong trường học"],
      why_h: "Vì sao có bộ học liệu này",
      why: "Bộ học liệu nối hai chặng đường của tác giả: dạy học tại Việt Nam và làm giáo dục tại Canada. Mỗi hoạt động được đặt vào cả hai bối cảnh, lớp 20–25 học sinh ở Ontario và lớp 40–45 học sinh ở Việt Nam, để giáo viên hai nước cùng học hỏi.",
      ph: "Buổi tập huấn giáo viên: giảng viên ngồi trên ghế cao, giơ tay trao đổi với nhóm giáo viên ngồi thành vòng tròn trong phòng đào tạo.",
      phc: "Teacher's Feedback – tập huấn giáo viên · Ảnh: trangphan.org", more: "Xem hồ sơ đầy đủ"
    } : {
      role: "English teacher · Canada – Vietnam education diplomacy",
      intro: ["Phan Thị Quỳnh Trang has more than 10 years of experience in international education. She has taught English in Vietnam since 2015, to preschoolers, primary students, teenagers and adults, and has trained English teachers across Vietnam.",
              "After moving to Canada, she continued to train English teachers online for a time through a Mentoring program. Since 2024 she has focused on education diplomacy and connecting education in Canada and Vietnam.", "The 90-plus activities on this site are only a small part of what survives from her teaching years. She wants to rework them where they meet her experience working with TESL Ontario."],
      exp_h: "Selected education experience",
      exp: [["2023 – present", "Education diplomacy & connecting education in Canada and Vietnam", "Toronto"], ["2022 – 2023", "Training and Development Coordinator, Wee College", "Moncton, NB"], ["Early years in Canada", "Mentoring program: online training for English teachers", "Online"], ["2019 – 2022", "Academic program & partnership development, FLYER (EdTech); content writer, Twinkl Vietnam", "Remote"], ["2016 – 2020", "Executive Consultant, Educap – Australian International TESOL (AIT): TESOL training and a national educator network", "Hanoi"], ["2015 – 2022", "Freelance English teacher & corporate trainer", "Vietnam"], ["2010 – 2017", "Duc Giang General Hospital: WHO Trauma Care Checklist project assistant; led the English club for doctors", "Hanoi"]],
      edu_h: "Education & qualifications",
      edu: ["MA in TESOL – Horizons University, France (2023, 50% scholarship)", "Graduate Diploma in TESOL – Hanoi University", "Level 7 Postgraduate Diploma in TESOL – Training Qualifications UK", "Professional TESOL Diploma – Australian International TESOL", "Diploma in Early Childhood Education – Hanoi College of Education", "Bachelor of Accounting and Finance – Banking Academy of Vietnam", "Graduate Certificate in Government Relations – Seneca Polytechnic (in progress)"],
      inc_h: "Training in inclusive education",
      inc: ["Montessori education for children aged 2–6", "Therapeutic Puppetry – Hanoi National University of Education", "Assessment of Speech Disorders – Hanoi National University of Education", "Occupational therapy for children with special needs in schools"],
      why_h: "Why this collection",
      why: "The collection connects the two parts of the author's career: teaching in Vietnam and working in education in Canada. Every activity is placed in both settings, an Ontario class of 20–25 and a Vietnamese class of 40–45, so teachers in each country can learn from the other.",
      ph: "A teacher-training session: the trainer, seated on a tall stool, gestures as she talks with a circle of teachers in a training room.",
      phc: "Teacher's Feedback – teacher training · Photo: trangphan.org", more: "See the full profile"
    };
    var links = '<div style="display:flex;gap:10px;flex-wrap:wrap">' + (CFG.authorSite ? '<a class="btn" href="' + esc(CFG.authorSite) + '" target="_blank" rel="noopener">' + A.more + ' · trangphan.org ↗</a>' : '') + (CFG.linkedin ? '<a class="btn ghost" href="' + esc(CFG.linkedin) + '" target="_blank" rel="noopener">LinkedIn ↗</a>' : '') + (CFG.facebook ? '<a class="btn ghost" href="' + esc(CFG.facebook) + '" target="_blank" rel="noopener">Facebook ↗</a>' : '') + '</div>';
    function ul(a) { return '<ul class="lst">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
    return '<section class="about-hero"><div class="stack"><p class="eyebrow">' + t("about_title") + '</p><h1 id="page-h">Phan Thị Quỳnh Trang</h1><p class="lede">' + esc(A.role) + '</p>' +
      A.intro.map(function (p) { return '<p style="max-width:66ch">' + esc(p) + '</p>'; }).join("") + links + '</div>' +
      '<div class="stack" style="gap:8px"><p class="eyebrow">Teacher\'s Feedback · ' + (vi ? "Tập huấn giáo viên" : "Teacher training") + '</p>' + collage(TT(vi), "tt") + '</div></section>' +
      '<section><h2 style="margin-bottom:14px">' + A.exp_h + '</h2><ol class="timeline">' + A.exp.map(function (e) { return '<li><span class="yr">' + esc(e[0]) + '</span><div><b>' + esc(e[1]) + '</b><span class="msg"> · ' + esc(e[2]) + '</span></div></li>'; }).join("") + '</ol></section>' +
 projectsHtml() +
      '<section class="tip"><div><p class="eyebrow" style="margin-bottom:6px">' + (vi ? "Cộng đồng giáo viên" : "Teacher community") + '</p><p>' + (vi ? "Xem các mốc hoạt động cùng giáo viên, ảnh Mentoring Program, các workshop và giáo án gốc của tác giả trong Thư viện ảnh." : "See milestones with teachers, Mentoring Program photos, workshops and the author’s original lesson plans in the Gallery.") + '</p><p style="margin-top:10px"><a class="btn ghost" href="#gallery">' + t("nav_gal") + ' →</a></p></div></section>' +
      '<section class="cols"><div class="panel"><h3>' + A.edu_h + '</h3>' + ul(A.edu) + '</div><div class="panel"><h3>' + A.inc_h + '</h3>' + ul(A.inc) + '</div></section>' +
      '<section class="tip"><div class="avatar" aria-hidden="true">QT</div><div><p class="eyebrow" style="margin-bottom:6px">' + A.why_h + '</p><p>' + esc(A.why) + '</p></div></section>' + ackHtml();
  }

  function collage(items, cls) {
    return '<div class="collage ' + (cls || "") + '">' + items.map(function (it, i) {
      return '<figure class="photo c' + i + '"><img src="' + esc((CFG.base || "") + it[0]) + '" alt="' + esc(it[1]) + '" loading="lazy" decoding="async"><figcaption>' + esc(it[2] || "") + '</figcaption></figure>';
    }).join("") + '</div>';
  }
  function rifPhotos(vi) {
    return [
      ["img/rif-stage.jpg", vi ? "Sân khấu ngày hội Reading is Fun: phông nền trời mây, cây bằng bìa, bóng bay và cuốn sách mở với hai truyện “Is That You, Santa?” và “The Little Engine That Could Helps Out”." : "The Reading is Fun stage: a sky backdrop, cardboard trees, balloons and an open book showing “Is That You, Santa?” and “The Little Engine That Could Helps Out”.", vi ? "Sân khấu ngày hội đọc" : "Reading-day stage"],
      ["img/rif-storytime.jpg", vi ? "Cô giáo ngồi trên sàn giơ cuốn sách tranh, kể chuyện cho nhóm trẻ mầm non ngồi quây tròn trước bảng lớp." : "A teacher sits on the floor holding up a picture book and tells the story to a circle of preschoolers.", vi ? "Giờ kể chuyện" : "Story time"],
      ["img/rif-circle.jpg", vi ? "Trẻ mầm non ngồi thành vòng tròn trên sàn gỗ, chăm chú nhìn cô giáo đọc truyện tranh." : "Preschoolers sit in a circle on a wooden floor watching their teacher read a picture book.", vi ? "Nghe và đoán nội dung" : "Listen and predict"],
      ["img/rif-classroom.jpg", vi ? "Học sinh tiểu học mặc đồng phục xanh ngồi quanh bàn có giấy màu, lắng nghe người dẫn trước phông nền Reading is Fun trang trí Giáng sinh." : "Primary students in blue uniforms sit around tables with coloured paper, listening to the host in front of a Christmas-themed Reading is Fun backdrop.", vi ? "Hoạt động nhóm sau khi đọc" : "Group work after reading"],
      ["img/rif-group.jpg", vi ? "Học sinh, phụ huynh và giáo viên vui vẻ giơ tay chụp ảnh chung trước phông nền Reading is Fun; phía trước bày các cuốn truyện như “The Lion and the Mouse”." : "Students, parents and teachers cheer in a group photo in front of the Reading is Fun backdrop, with storybooks such as “The Lion and the Mouse” in front.", vi ? "Ngày hội cùng phụ huynh" : "Celebration with families"],
      ["img/rif-celebration.jpg", vi ? "Trẻ em và phụ huynh ngồi trên thảm cùng bóng bay trước sân khấu Reading is Fun." : "Children and parents sit on the carpet with balloons in front of the Reading is Fun stage.", vi ? "Trình bày sản phẩm" : "Sharing the product"],
      ["img/tt-reading-certificates.jpg", vi ? "Các giáo viên cầm giấy chứng nhận sau buổi tập huấn Reading is Fun, phía sau là màn chiếu chữ “Reading is fun”." : "Teachers hold their certificates after a Reading is Fun training session, with “Reading is fun” on the screen behind them.", vi ? "Tập huấn giáo viên" : "Teacher training"],
      ["img/rif-cake.jpg", vi ? "Bánh kem chủ đề Reading is Fun trang trí giá sách, mũ tốt nghiệp và bảng “Workshop English”." : "A Reading is Fun cake decorated with a bookshelf, a graduation cap and a “Workshop English” sign.", vi ? "Bánh kỷ niệm chương trình" : "Programme cake"]
    ];
  }

  /* 2D illustrations for the five Reading is Fun stages */
  function lionFace(x, y, r) { return '<g transform="translate(' + x + ' ' + y + ')"><circle r="' + (r * 1.45) + '" fill="#c98a2b"/><circle r="' + r + '" fill="#f2b134"/><circle cx="' + (-r * .35) + '" cy="' + (-r * .15) + '" r="' + (r * .1) + '" fill="#2b2b2b"/><circle cx="' + (r * .35) + '" cy="' + (-r * .15) + '" r="' + (r * .1) + '" fill="#2b2b2b"/><path d="M' + (-r * .2) + ' ' + (r * .2) + ' q' + (r * .2) + ' ' + (r * .25) + ' ' + (r * .4) + ' 0" stroke="#7b4a2a" stroke-width="2" fill="none"/></g>'; }
  function mouseFace(x, y, r) { return '<g transform="translate(' + x + ' ' + y + ')"><circle cx="' + (-r * .75) + '" cy="' + (-r * .7) + '" r="' + (r * .55) + '" fill="#9aa6bb"/><circle cx="' + (r * .75) + '" cy="' + (-r * .7) + '" r="' + (r * .55) + '" fill="#9aa6bb"/><circle r="' + r + '" fill="#b9c3d4"/><circle cx="' + (-r * .3) + '" cy="' + (-r * .1) + '" r="' + (r * .1) + '" fill="#2b2b2b"/><circle cx="' + (r * .3) + '" cy="' + (-r * .1) + '" r="' + (r * .1) + '" fill="#2b2b2b"/><circle cy="' + (r * .3) + '" r="' + (r * .14) + '" fill="#e5989b"/></g>'; }
  function bigBook(x, y, w) {
    var h = w * .7;
    return '<g transform="translate(' + x + ' ' + y + ')"><rect x="' + (-w / 2) + '" y="' + (-h) + '" width="' + w + '" height="' + h + '" rx="4" fill="#3d8b7d"/><rect x="' + (-w / 2 + 6) + '" y="' + (-h + 6) + '" width="' + (w - 12) + '" height="' + (h - 12) + '" rx="3" fill="#e9f5ef"/>' + lionFace(-w * .16, -h * .55, w * .11) + mouseFace(w * .22, -h * .38, w * .06) + '<text x="0" y="' + (-h + 22) + '" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="' + (w * .075) + '" font-weight="800" fill="#1d6b41">The Lion and the Mouse</text></g>';
  }
  function rifIllus(i) {
    var P = PAL, s;
    if (i === 0) {
      s = room("Our project: Story Day!", "Driving question: How can we retell a story?") +
        '<g transform="translate(470 175)"><rect width="140" height="80" rx="6" fill="#fff" stroke="#c9d2e1"/><text x="70" y="22" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="800" fill="#56627a">I THINK…</text><path d="M14 40h112M14 56h90" stroke="#c9d2e1" stroke-width="2"/></g>' +
        fig2(300, 300, "#1d6b41", { s: 1.15, hair: "#1b1b1b", arm: "up" }) + bigBook(250, 270, 120) +
        fig2(120, 350, P[0], { back: true, s: .9 }) + fig2(180, 356, P[1], { back: true, s: .9, hair: "#5a3825" }) + fig2(420, 352, P[2], { back: true, s: .9 }) + fig2(480, 356, P[4], { back: true, s: .9, hair: "#7b4a2a", arm: "up" }) +
        bub(320, 150, "What do you see on the cover?");
    } else if (i === 1) {
      s = '<rect width="640" height="400" fill="#eef9f0"/><rect y="250" width="640" height="150" fill="#e8dcc6"/>' +
        '<ellipse cx="320" cy="320" rx="250" ry="60" fill="#d8c8aa"/>' + bigBook(320, 250, 150) + fig2(320, 290, "#1d6b41", { s: 1, hair: "#1b1b1b", arm: "hold" }) +
        [[110, 330], [170, 360], [240, 378], [400, 378], [470, 360], [530, 330]].map(function (q, k) { return fig2(q[0], q[1], P[k], { back: k > 1 && k < 4, s: .85, arm: k === 4 ? "up" : "down", hair: ["#2b2b2b", "#5a3825"][k % 2] }); }).join("") +
        bub(330, 120, "What happens next?") + bub(500, 245, "The mouse helps!", { left: true });
    } else if (i === 2) {
      s = room("Put the story in order", "1 → 2 → 3 → 4 → 5") +
        '<rect x="90" y="270" width="460" height="12" rx="4" fill="#b9c3d4"/><rect x="100" y="282" width="8" height="40" fill="#b9c3d4"/><rect x="532" y="282" width="8" height="40" fill="#b9c3d4"/>' +
        [0, 1, 2, 3, 4].map(function (k) { var x = 118 + k * 84; return '<g transform="translate(' + x + ' 196)"><rect width="66" height="66" rx="5" fill="#fff" stroke="#9aa6bb"/>' + (k === 0 ? lionFace(33, 34, 13) : k === 1 ? mouseFace(33, 36, 11) + lionFace(33, 30, 8) : k === 2 ? '<path d="M8 10 L58 10 L58 56 L8 56 Z M8 25 H58 M8 40 H58 M23 10 V56 M38 10 V56" stroke="#7b4a2a" stroke-width="2" fill="none"/>' + lionFace(33, 36, 9) : k === 3 ? mouseFace(33, 34, 12) : lionFace(22, 36, 10) + mouseFace(48, 40, 7)) + '<circle cx="10" cy="10" r="9" fill="#1d6b41"/><text x="10" y="14" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="800" fill="#fff">' + (k + 1) + '</text></g>' + (k < 4 ? '<path d="M' + (x + 70) + ' 229 l10 0" stroke="#1d6b41" stroke-width="2.5" marker-end="url(#ar)"/>' : ''); }).join("") +
        fig2(150, 350, P[0], { back: true, arm: "up" }) + fig2(250, 360, P[1], { back: true, hair: "#5a3825" }) + fig2(380, 360, P[2], { back: true }) + fig2(480, 350, P[3], { back: true, arm: "up", hair: "#7b4a2a" }) +
        bub(160, 190, "Please let me go!") + bub(480, 190, "I will help you one day!", { left: true });
    } else if (i === 3) {
      s = room("Make your props", "First cut · Next colour · Then glue") +
        '<rect x="80" y="276" width="480" height="12" rx="4" fill="#b9c3d4"/>' +
        lionFace(200, 250, 22) + mouseFace(330, 256, 16) +
        '<g transform="translate(400 236)"><rect width="70" height="44" fill="#fff" stroke="#9aa6bb"/><path d="M35 0v44" stroke="#9aa6bb"/><path d="M6 12h22M6 20h22M42 12h22M42 20h18" stroke="#c9d2e1" stroke-width="2"/></g>' +
        '<g transform="translate(120 262) rotate(-20)"><circle r="6" fill="none" stroke="#ef6f5e" stroke-width="3"/><circle cx="12" r="6" fill="none" stroke="#ef6f5e" stroke-width="3"/><path d="M3 -4 L30 -22 M9 -4 L-14 -22" stroke="#56627a" stroke-width="3"/></g>' +
        '<rect x="500" y="252" width="16" height="26" rx="3" fill="#f2b134"/><rect x="503" y="246" width="10" height="8" fill="#e07a5f"/>' +
        fig2(150, 350, P[0], { back: true, arm: "out" }) + fig2(250, 360, P[5], { back: true }) + fig2(370, 360, P[6], { back: true, hair: "#5a3825", arm: "out" }) + fig2(470, 350, P[7], { back: true }) +
        bub(240, 205, "Can I have the glue, please?") + bub(470, 205, "Here you are!", { left: true });
    } else {
      s = '<rect width="640" height="400" fill="#eef9f0"/><rect x="40" y="40" width="560" height="220" fill="#203a43"/>' +
        '<path d="M40 40 h90 q-20 110 0 220 h-90z" fill="#ef6f5e"/><path d="M600 40 h-90 q20 110 0 220 h90z" fill="#ef6f5e"/><rect x="40" y="36" width="560" height="14" fill="#a80d27"/>' +
        '<text x="320" y="78" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="18" font-weight="800" fill="#f2c14e">Story Day!</text>' +
        '<rect x="40" y="250" width="560" height="16" fill="#8a6d3b"/>' +
        fig2(230, 250, P[2], { s: 1.05 }) + lionFace(230, 180, 20) + fig2(330, 250, P[1], { s: .95, arm: "out" }) + mouseFace(330, 190, 14) + fig2(430, 250, P[3], { arm: "up" }) +
        [[90, 380], [160, 392], [240, 384], [400, 384], [480, 392], [550, 380]].map(function (q, k) { return fig2(q[0], q[1], ["#56627a", "#3d8b7d", "#6c8ebf", "#b56576", "#5e6c9c", "#81b29a"][k], { back: true, s: 1.05, arm: k % 2 ? "up" : "down", hair: ["#2b2b2b", "#5a3825", "#1d1d1d"][k % 3] }); }).join("") +
        '<text x="140" y="300" font-size="22" fill="#f6b93b">★</text><text x="500" y="300" font-size="22" fill="#f6b93b">★</text>' +
        bub(320, 150, "I will help you, Lion!");
    }
    return '<svg viewBox="0 0 640 400" role="img" aria-hidden="true" style="display:block;width:100%;height:auto"><defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d6b41"/></marker></defs>' + s + '</svg>';
  }

  function rifPlans(vi) {
    // Each plan: [title, minutes, goals[], criteria[], prep, mindsOn[], action[], consolidation[], diffNew, diffAdv, assess[], ontario]
    return vi ? [
      ["Chọn truyện & khởi động dự án", ["Đoán nội dung truyện từ bìa sách và tranh.", "Làm quen 6 từ khóa: lion, mouse, big, small, net, help."],
        ["Em có thể nói điều em thấy trên bìa sách.", "Em có thể đoán câu chuyện nói về điều gì.", "Em có thể nói và làm động tác cho 4 từ mới."],
        "Sách truyện (khổ lớn hoặc chiếu tranh), 6 thẻ tranh từ khóa, túi bí mật có thú bông sư tử và chuột, bảng dự đoán “I think…”.",
        ["(8 phút) Túi bí mật: học sinh sờ, đoán con vật. Hát/chant “Big lion, small mouse” kèm động tác."],
        ["(10 phút) Đi dạo qua tranh (picture walk): bìa sách và 3 tranh đầu, hỏi “What do you see? Who is big? Who is small?”.", "(10 phút) Dạy 6 từ khóa bằng tranh và TPR (động tác toàn thân); luyện đồng thanh rồi từng dãy.", "(7 phút) Giới thiệu câu hỏi dẫn dắt và sản phẩm cuối: Ngày hội kể chuyện cho bố mẹ. Chia nhóm, đặt tên nhóm."],
        ["(10 phút) Mỗi nhóm dán một dự đoán lên bảng “I think the lion will…” (vẽ hoặc viết). Phiếu ra lớp: nói một từ mới với cô."],
        "Học sinh mới học tiếng Anh: chỉ tranh và gọi tên; ghép đôi với bạn hỗ trợ.", "Học sinh khá: viết câu dự đoán đầy đủ và giải thích “because…”.",
        ["Vì học tập: quan sát học sinh dùng từ khóa, ghi chú nhanh.", "Là học tập: giơ ngón cái tự đánh giá theo 3 tiêu chí.", "Lưu bảng dự đoán làm mốc so sánh cho bài 2."],
        "ESL Ontario – mạch Listening and Speaking; Language (2023) C2.1 Activating Prior Knowledge, C2.3 Making and Confirming Predictions, B2.2 Vocabulary; STEP 1–2."],
      ["Giờ kể chuyện", ["Nghe trọn câu chuyện và hiểu các sự kiện chính.", "Phản hồi bằng động tác và câu trả lời ngắn."],
        ["Em có thể nghe và làm động tác theo câu chuyện.", "Em có thể trả lời câu hỏi Who? What?", "Em có thể kiểm tra dự đoán của mình đúng hay sai."],
        "Sách truyện, thẻ từ khóa, bảng dự đoán từ bài 1, giấy vẽ.",
        ["(5 phút) Ôn từ khóa bằng hoạt động chớp thẻ (flash cards). Đọc lại các dự đoán trên bảng."],
        ["(10 phút) Đọc to lần 1, dừng ở 3 điểm hỏi “What happens next?”.", "(10 phút) Đọc lần 2: học sinh làm động tác theo (gầm như sư tử, kêu chít chít, bị mắc lưới, cắn dây).", "(10 phút) Vòng tròn hiểu bài: câu hỏi Who/What, đúng/sai bằng ngón cái."],
        ["(10 phút) So sánh với dự đoán: “I was right / I was wrong”. Vẽ cảnh em thích nhất và ghi một từ."],
        "Học sinh mới học tiếng Anh: trả lời bằng cách chỉ tranh, làm động tác.", "Học sinh khá: trả lời câu hỏi Why? (Why does the mouse help the lion?).",
        ["Vì học tập: câu hỏi Who/What trong khi đọc.", "Là học tập: tự kiểm tra dự đoán.", "Kết quả: tranh vẽ có ghi từ (kiểm tra nhanh mức hiểu)."],
        "ESL Ontario – mạch Listening and Speaking, Reading (đọc chung); Language (2023) B1.1 Effective Listening Skills, B1.2 Listening Strategies for Comprehension, C2.3 Making and Confirming Predictions."],
      ["Khám phá & luyện đọc", ["Sắp xếp các sự kiện theo đúng trình tự.", "Đọc câu ngắn cùng nhóm và luyện lời thoại nhân vật."],
        ["Em có thể sắp xếp 5 tranh theo thứ tự.", "Em có thể cùng nhóm đọc câu dưới mỗi tranh.", "Em có thể nói rõ lời thoại của nhân vật mình."],
        "Mỗi nhóm một bộ 5 thẻ tranh và 5 dải câu, thẻ vai (Lion, Mouse, Hunter, Narrator), đáp án.",
        ["(5 phút) “Đoàn tàu câu chuyện”: cô xáo 3 tranh trên bảng, cả lớp sắp lại."],
        ["(12 phút) Nhóm 4–5 em (lớp đông: ghép hai bàn) sắp tranh và ghép dải câu.", "(8 phút) Đọc đồng thanh rồi đọc nối tiếp (echo reading) theo nhóm.", "(10 phút) Nhận thẻ vai, luyện lời thoại: “Please let me go!”, “I will help you one day.”"],
        ["(10 phút) Một nhóm trình bày thứ tự trên bảng, cả lớp đọc lại; các nhóm tự đối chiếu đáp án."],
        "Học sinh mới học tiếng Anh: thẻ chỉ có tranh; vai có một câu thoại.", "Học sinh khá: dải câu không có tranh; viết thêm một câu cho người dẫn chuyện.",
        ["Vì học tập: bảng kiểm khi đi vòng quanh (sắp xếp, đọc).", "Là học tập: các nhóm chấm chéo theo đáp án.", "Kết quả: thu phiếu sắp xếp của mỗi nhóm."],
        "ESL Ontario – mạch Reading, Listening and Speaking; Language (2023) C2.6 Summarizing, B2.3 Reading Fluency."],
      ["Tạo sản phẩm", ["Lập kế hoạch và làm đạo cụ hoặc sách tranh để kể lại chuyện.", "Dùng ngôn ngữ hướng dẫn và hợp tác trong nhóm."],
        ["Em có thể làm theo hướng dẫn 3 bước.", "Em có thể ghi chú thích tiếng Anh cho sản phẩm.", "Em có thể làm việc cùng nhóm và chia sẻ đồ dùng."],
        "Mẫu mặt nạ sư tử, chuột và sách tranh 6 trang; giấy màu, kéo, keo, bút màu; thẻ câu “Can I have…, please?”.",
        ["(5 phút) Cho xem sản phẩm mẫu; dạy “First…, next…, then…”."],
        ["(3 phút) Phân vai trong nhóm: trưởng nhóm, quản lý đồ dùng, họa sĩ, thư ký.", "(22 phút) Làm mặt nạ hoặc sách tranh 6 trang có chú thích; cô đi vòng quanh, nhắc mẫu câu đã dán trên bảng.", "(5 phút) Dọn dẹp theo bài hát."],
        ["(10 phút) Đi xem tranh (gallery walk): mỗi nhóm nhận “2 ngôi sao, 1 điều ước”. Diễn thử một lần với đạo cụ."],
        "Học sinh mới học tiếng Anh: chép chú thích từ ngân hàng từ.", "Học sinh khá: viết lời người dẫn chuyện.",
        ["Vì học tập: quan sát việc dùng câu hỏi xin đồ dùng.", "Là học tập: phiếu tự kiểm của nhóm.", "Kết quả: thang đánh giá sản phẩm (nội dung, chú thích tiếng Anh, hợp tác)."],
        "ESL Ontario – mạch Writing (chú thích), Listening and Speaking (ngôn ngữ lớp học), Socio-cultural Competence (chuẩn mực hợp tác); Language (2023) D1.1 Purpose and Audience."],
      ["Ngày hội trình bày & phản tư", ["Kể lại hoặc diễn lại câu chuyện trước khán giả.", "Tự đánh giá và nhận phản hồi."],
        ["Em có thể nói to, rõ cho khán giả nghe.", "Em có thể cùng nhóm kể lại câu chuyện theo đúng thứ tự.", "Em có thể nói một điều em làm tốt và một điều cần cố gắng."],
        "Đạo cụ, sách tranh của các nhóm; phiếu “ngôi sao” cho phụ huynh; phiếu tự đánh giá; thang đánh giá kể chuyện.",
        ["(5 phút) Khởi động giọng và cơ thể (gầm nhỏ, gầm to); kiểm tra đạo cụ lần cuối."],
        ["(30 phút) Mỗi nhóm trình bày 3–4 phút (6 nhóm + chuyển tiếp). Lớp 45 em: chia hai lượt trong hai buổi, hoặc trình bày theo trạm để phụ huynh đi xem."],
        ["(10 phút) Phụ huynh dán ngôi sao và viết một lời khen. Học sinh tự đánh giá theo tiêu chí “I can…”. Cả lớp trả lời lại câu hỏi dẫn dắt."],
        "Học sinh mới học tiếng Anh: vai có một câu thoại và động tác; người dẫn chuyện hỗ trợ.", "Học sinh khá: làm người dẫn chuyện; sáng tác một kết thúc mới.",
        ["Kết quả học tập: thang đánh giá kể chuyện theo 4 phạm trù của bảng thành tích Ontario (Knowledge and Understanding, Thinking, Communication, Application).", "Là học tập: phiếu tự đánh giá.", "Vì học tập: ghi chú cho dự án tiếp theo."],
        "ESL Ontario – mạch Listening and Speaking, Socio-cultural Competence; Language (2023) B1.3 Speaking Purposes and Strategies, C2.6 Summarizing; Growing Success (2010)."]
    ] : [
      ["Choose a story & launch the project", ["Predict the story from the cover and pictures.", "Meet 6 key words: lion, mouse, big, small, net, help."],
        ["I can say what I see on the cover.", "I can guess what the story is about.", "I can say and act out 4 new words."],
        "Picture book (big book or projected), 6 key-word picture cards, a mystery bag with a toy lion and mouse, an “I think…” prediction chart.",
        ["(8 min) Mystery bag: students feel and guess the animals. Chant “Big lion, small mouse” with actions."],
        ["(10 min) Picture walk: the cover and first 3 pictures – “What do you see? Who is big? Who is small?”", "(10 min) Teach the 6 key words with pictures and TPR; practise chorally, then row by row.", "(7 min) Introduce the driving question and final product: Story Day for families. Form groups and name them."],
        ["(10 min) Each group posts one prediction on the “I think the lion will…” chart (drawing or words). Exit ticket: say one new word to the teacher."],
        "New ELLs: point to pictures and name them; pair with a supportive buddy.", "Advanced students: write a full prediction sentence with “because…”.",
        ["For learning: observe use of key words; quick notes.", "As learning: thumbs self-check against the 3 criteria.", "Keep the prediction chart as a baseline for Lesson 2."],
        "Ontario ESL – Listening and Speaking strand; Language (2023) C2.1 Activating Prior Knowledge, C2.3 Making and Confirming Predictions, B2.2 Vocabulary; STEP 1–2."],
      ["Story time", ["Listen to the whole story and understand the main events.", "Respond with actions and short answers."],
        ["I can listen and act out what happens.", "I can answer Who? and What? questions.", "I can check whether my prediction was right."],
        "Picture book, key-word cards, prediction chart from Lesson 1, drawing paper.",
        ["(5 min) Flash-card review of key words. Reread the predictions."],
        ["(10 min) Read-aloud 1 with 3 stops: “What happens next?”", "(10 min) Read-aloud 2: students act along (roar, squeak, caught in the net, bite the rope).", "(10 min) Comprehension circle: Who/What questions, true/false thumbs."],
        ["(10 min) Compare with predictions: “I was right / I was wrong”. Draw a favourite scene and label it with one word."],
        "New ELLs: answer by pointing and acting.", "Advanced students: answer Why? questions (Why does the mouse help the lion?).",
        ["For learning: Who/What questions during reading.", "As learning: prediction check.", "Of learning: labelled drawing as a quick comprehension check."],
        "Ontario ESL – Listening and Speaking, Reading (shared reading); Language (2023) B1.1 Effective Listening Skills, B1.2 Listening Strategies for Comprehension, C2.3 Making and Confirming Predictions."],
      ["Explore & practise reading", ["Put story events in order.", "Read short sentences with the group and rehearse character lines."],
        ["I can put 5 pictures in order.", "I can read the sentence under each picture with my group.", "I can say my character's line clearly."],
        "Per group: 5 picture cards and 5 sentence strips; role cards (Lion, Mouse, Hunter, Narrator); answer key.",
        ["(5 min) “Story train”: the teacher mixes 3 pictures on the board; the class fixes the order."],
        ["(12 min) Groups of 4–5 (large class: join two benches) sequence pictures and match sentence strips.", "(8 min) Choral reading, then echo reading in groups.", "(10 min) Hand out role cards; rehearse lines: “Please let me go!”, “I will help you one day.”"],
        ["(10 min) One group shows its order on the board; the class reads it; groups check against the key."],
        "New ELLs: picture-only cards; a role with one line.", "Advanced students: sentence strips without pictures; write one extra narrator line.",
        ["For learning: checklist while circulating (sequencing, decoding).", "As learning: groups peer-check with the key.", "Of learning: collect each group's sequencing sheet."],
        "Ontario ESL – Reading, Listening and Speaking strands; Language (2023) C2.6 Summarizing, B2.3 Reading Fluency."],
      ["Make the product", ["Plan and make props or a picture book for the retelling.", "Use instruction language and work as a team."],
        ["I can follow 3-step instructions.", "I can label my work in English.", "I can work with my group and share materials."],
        "Sample lion and mouse masks and a 6-page picture book; coloured paper, scissors, glue, crayons; “Can I have…, please?” sentence cards.",
        ["(5 min) Show the samples; teach “First…, next…, then…”."],
        ["(3 min) Group roles: leader, materials manager, artist, writer.", "(22 min) Make masks or a 6-page labelled picture book; the teacher circulates and points to the sentence frames on the board.", "(5 min) Clean-up song."],
        ["(10 min) Gallery walk: each group receives “2 stars and a wish”. Rehearse once with the props."],
        "New ELLs: copy labels from a word bank.", "Advanced students: write the narrator's lines.",
        ["For learning: observe requests for materials.", "As learning: group self-check list.", "Of learning: product rubric (content, English labels, teamwork)."],
        "Ontario ESL – Writing (labels), Listening and Speaking (classroom language), Socio-cultural Competence (collaboration norms); Language (2023) D1.1 Purpose and Audience."],
      ["Celebrate & reflect", ["Retell or perform the story for an audience.", "Self-assess and receive feedback."],
        ["I can speak loudly and clearly for the audience.", "I can retell the story in order with my group.", "I can say one thing I did well and one thing to improve."],
        "Group props and books; star cards for families; self-assessment sheet; retelling rubric.",
        ["(5 min) Voice and body warm-up (soft roar, loud roar); final prop check."],
        ["(30 min) Each group performs for 3–4 minutes (6 groups plus transitions). Class of 45: split across two sessions, or perform in stations that families visit."],
        ["(10 min) Families add a star and one compliment. Students self-assess with the “I can…” criteria. The class answers the driving question again."],
        "New ELLs: a role with one line and actions, supported by the narrator.", "Advanced students: narrator; invent a new ending.",
        ["Of learning: retelling rubric using the 4 categories of Ontario's achievement chart (Knowledge and Understanding, Thinking, Communication, Application).", "As learning: self-assessment sheet.", "For learning: notes for the next project."],
        "Ontario ESL – Listening and Speaking, Socio-cultural Competence; Language (2023) B1.3 Speaking Purposes and Strategies, C2.6 Summarizing; Growing Success (2010)."]
    ];
  }
  function planDetails(p, i, vi) {
    var L2 = vi ? { g: "Mục tiêu bài học", c: "Tiêu chí thành công", pr: "Chuẩn bị", m: "Khởi động (Minds On)", a: "Hoạt động chính (Action)", co: "Củng cố (Consolidation)", d: "Phân hóa", dn: "Hỗ trợ:", da: "Mở rộng:", as: "Đánh giá", on: "Liên kết chương trình Ontario", lv: "Đối tượng: Lớp 2–4 · STEP 1–3 · CEFR Pre-A1–A1 · 45 phút", ill: "Hình minh họa 2D bước " } :
      { g: "Learning goals", c: "Success criteria", pr: "Preparation", m: "Minds On", a: "Action", co: "Consolidation", d: "Differentiation", dn: "Support:", da: "Extension:", as: "Assessment", on: "Ontario curriculum links", lv: "Learners: Grades 2–4 · STEP 1–3 · CEFR Pre-A1–A1 · 45 minutes", ill: "2D illustration, stage " };
    function ul(a, cls) { return '<ul class="lst' + (cls ? " " + cls : "") + '">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
    return '<details class="lp"' + (i === 0 ? " open" : "") + '><summary><span class="n">' + (i + 1) + '</span><span><b>' + esc(p[0]) + '</b><small>45 ' + (vi ? "phút" : "min") + ' · The Lion and the Mouse</small></span></summary>' +
      '<div class="lp-body"><figure class="photo lp-ill">' + rifIllus(i) + '<figcaption>' + L2.ill + (i + 1) + ' · ' + esc(p[0]) + '</figcaption></figure>' +
      '<div class="lp-grid"><p class="msg" style="grid-column:1/-1">' + L2.lv + '</p>' +
      '<div><h4>' + L2.g + '</h4>' + ul(p[1]) + '</div><div><h4>' + L2.c + '</h4>' + ul(p[2], "ican") + '</div>' +
      '<div style="grid-column:1/-1"><h4>' + L2.pr + '</h4><p>' + esc(p[3]) + '</p></div>' +
      '<div class="tl" style="grid-column:1/-1"><div><h4>' + L2.m + '</h4>' + ul(p[4]) + '</div><div><h4>' + L2.a + '</h4>' + ul(p[5]) + '</div><div><h4>' + L2.co + '</h4>' + ul(p[6]) + '</div></div>' +
      '<div><h4>' + L2.d + '</h4><ul class="lst"><li><b>' + L2.dn + '</b> ' + esc(p[7]) + '</li><li><b>' + L2.da + '</b> ' + esc(p[8]) + '</li></ul></div>' +
      '<div><h4>' + L2.as + '</h4>' + ul(p[9]) + '</div>' +
      '<p class="lp-on" style="grid-column:1/-1"><b>' + L2.on + ':</b> ' + esc(p[10]) + '</p></div></div></details>';
  }
  function viewRif() {
    var vi = lang === "vi";
    var D = vi ? {
      eyebrow: "Dự án học tập · Project-Based Learning", title: "Reading is Fun",
      lede: "Chương trình đọc truyện tiếng Anh của Trang Phan: trẻ học kỹ năng đọc thông qua truyện, từ giờ kể chuyện trên lớp đến ngày hội đọc sách cùng phụ huynh, kèm tập huấn để giáo viên tự tổ chức.",
      dq_h: "Câu hỏi dẫn dắt", dq: "“Làm thế nào để lớp mình kể lại một câu chuyện thật hay cho bố mẹ nghe?”",
      ph_h: "Tiến trình dự án",
      ph: [["Chọn truyện & khởi động", "Chọn truyện tranh phù hợp trình độ và giới thiệu câu hỏi dẫn dắt cùng sản phẩm cuối."], ["Giờ kể chuyện", "Đọc to với tranh; đoán trước, hỏi trong và ôn sau khi đọc."], ["Khám phá & luyện đọc", "Sắp xếp tranh theo trình tự, đọc theo nhóm, luyện lời thoại."], ["Tạo sản phẩm", "Làm đạo cụ, sách tranh hoặc phông nền cho phần trình bày."], ["Ngày hội trình bày & phản tư", "Kể lại cho phụ huynh, tự đánh giá và nhận phản hồi."]],
      lp_h: "Giáo án chi tiết cho từng bước", lp_l: "Năm giáo án 45 phút theo khung Ontario, dùng truyện ngụ ngôn Aesop “The Lion and the Mouse” làm ví dụ. Nhấn vào từng bước để xem.",
      sk_h: "Kỹ năng & liên kết chương trình",
      sk: ["Ontario ESL – 4 mạch: Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy.", "Ontario Language (2023) – C2.1, C2.3, C2.6 (Comprehension); B1, B2.2 (Foundations of Language).", "Chương trình GDPT 2018 môn Tiếng Anh: đọc hiểu truyện ngắn, nói theo chủ điểm, năng lực hợp tác.", "Kỹ năng thế kỷ 21: hợp tác, sáng tạo, tự tin trình bày."],
      gal_h: "Hình ảnh chương trình", tip_h: "Pro-tip từ Phan Thị Quỳnh Trang",
      tip: "Hãy cho phụ huynh tham gia ngày hội cuối dự án. Khi trẻ biết mình sẽ kể chuyện cho bố mẹ nghe, các em đọc đi đọc lại một cách tự nguyện, và đó chính là luyện đọc lưu loát."
    } : {
      eyebrow: "Learning project · Project-Based Learning", title: "Reading is Fun",
      lede: "Trang Phan's English story-reading programme: children build reading skills through stories, from classroom story time to a reading celebration with families, plus training so teachers can run it themselves.",
      dq_h: "Driving question", dq: "“How can our class retell a story so well that our parents enjoy it?”",
      ph_h: "Project stages",
      ph: [["Choose a story & launch", "Pick a picture book at the right level and introduce the driving question and final product."], ["Story time", "Read aloud with pictures: predict before, ask during, review after."], ["Explore & practise", "Sequence pictures, read in groups, rehearse lines."], ["Make the product", "Create props, a picture book or a backdrop."], ["Celebrate & reflect", "Retell for families, self-assess and receive feedback."]],
      lp_h: "Detailed lesson plan for each stage", lp_l: "Five 45-minute lesson plans in the Ontario format, using Aesop's fable “The Lion and the Mouse” as the example. Open each stage to read it.",
      sk_h: "Skills & curriculum links",
      sk: ["Ontario ESL – 4 strands: Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy.", "Ontario Language (2023) – C2.1, C2.3, C2.6 (Comprehension); B1, B2.2 (Foundations of Language).", "Vietnam's 2018 English curriculum: reading short stories, theme-based speaking, collaboration.", "21st-century skills: collaboration, creativity, confidence presenting."],
      gal_h: "Programme photos", tip_h: "Pro-tip from Phan Thị Quỳnh Trang",
      tip: "Invite families to the final celebration. When children know they will tell the story to their parents, they reread it again and again on their own, and that is fluency practice."
    };
    var P = rifPhotos(vi), plans = rifPlans(vi);
    GAL_FLAT = [];
    var V = vi ? { h: "Phóng sự VTV1: Giúp bé đọc truyện tiếng Anh hiệu quả", p: "Chương trình “Vì tầm vóc Việt” của VTV1 đã đưa Reading is Fun lên sóng truyền hình, với cảnh trẻ đọc truyện, hoạt động nhóm và phần chia sẻ của tác giả. Đoạn video dưới đây được nén nhỏ; phần chữ chạy và thông tin quyên góp phía dưới màn hình gốc đã được cắt bớt.", src: "Nguồn tham chiếu: mục Featured trên trangphan.org", more_h: "Thêm hình ảnh từ lớp học và buổi tập huấn", more_l: "Học liệu và sản phẩm của chương trình, cùng các buổi tập huấn giáo viên về hoạt động đọc." }
      : { h: "VTV1 report: Helping children read English stories effectively", p: "VTV1's programme “Vì tầm vóc Việt” broadcast a report on Reading is Fun, showing children reading stories, group activities and a talk by the author. The clip below is compressed; the scrolling text and donation details at the bottom of the original screen have been trimmed.", src: "Reference: the Featured page on trangphan.org", more_h: "More photos from classes and training sessions", more_l: "Programme materials and products, and teacher-training sessions on reading activities." };
    var vtv = '<section aria-labelledby="vtv-h"><h2 id="vtv-h" style="margin-bottom:6px">' + V.h + '</h2><p class="msg" style="max-width:72ch;margin-bottom:12px">' + esc(V.p) + '</p><figure class="vtv"><video controls preload="metadata" playsinline poster="' + esc((CFG.base || "") + "vid/rif-vtv.jpg") + '" aria-label="' + esc(V.h) + '"><source src="' + esc((CFG.base || "") + "vid/rif-vtv.mp4") + '" type="video/mp4"></video><figcaption>VTV1 · Vì tầm vóc Việt · <a href="https://www.trangphan.org/featured" target="_blank" rel="noopener">' + V.src + ' ↗</a></figcaption></figure></section>';
    var JR = JRN2(vi), more = [P && 0].slice(0, 0);
    function pick(id, grp) { var c = JR.filter(function (x) { return x.id === id; })[0]; var all = c.m.concat((c.g || []).reduce(function (a, g) { return a.concat(g.items); }, [])); return all; }
    var want = ["img/h008.jpg", "img/h097.jpg", "img/h112.jpg", "img/h144.jpg", "img/h216.jpg", "img/h188.jpg", "img/h021.jpg", "img/h148.jpg", "img/h146.jpg"];
    var pool = []; JR.forEach(function (c) { pool = pool.concat(c.m, (c.g || []).reduce(function (a, g) { return a.concat(g.items); }, [])); });
    var moreItems = want.map(function (w) { return pool.filter(function (x) { return x.img === w; })[0]; }).filter(Boolean);
    var moreHtml = '<section><h2>' + V.more_h + '</h2><p class="msg" style="margin:4px 0 8px">' + V.more_l + '</p>' + mediaGrid(moreItems) + '</section>' +
      '<dialog class="lightbox" id="lb"><figure><img alt=""><figcaption></figcaption></figure><div class="lb-nav"><button type="button" data-lb="-1" aria-label="' + (vi ? "Ảnh trước" : "Previous photo") + '">‹</button><button type="button" data-lb="close">' + (vi ? "Đóng" : "Close") + '</button><button type="button" data-lb="1" aria-label="' + (vi ? "Ảnh sau" : "Next photo") + '">›</button></div></dialog>';
    return '<section class="about-hero"><div class="stack"><p class="eyebrow">' + D.eyebrow + '</p><h1 id="page-h">' + D.title + '</h1><p class="lede">' + esc(D.lede) + '</p>' +
      '<div class="panel"><p class="eyebrow" style="margin-bottom:6px">' + D.dq_h + '</p><p class="quote">' + esc(D.dq) + '</p></div></div>' +
      collage([P[0]], "one") + '</section>' + vtv +
      '<section><h2 style="margin-bottom:14px">' + D.ph_h + '</h2><ol class="pbl">' + D.ph.map(function (p, i) { return '<li><a href="#reading-is-fun" data-lp="' + i + '"><b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span></a></li>'; }).join("") + '</ol></section>' +
      '<section id="lesson-plans"><h2 style="margin-bottom:6px">' + D.lp_h + '</h2><p class="msg" style="margin-bottom:14px">' + D.lp_l + '</p><div class="stack" style="gap:10px">' + plans.map(function (p, i) { return planDetails(p, i, vi); }).join("") + '</div></section>' +
      '<section><h2 style="margin-bottom:14px">' + D.gal_h + '</h2>' + collage(P.slice(1, 7), "rif") + '</section>' + moreHtml +
      '<section class="cols"><div class="panel"><h3>' + D.sk_h + '</h3><ul class="lst">' + D.sk.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>' +
      '<div class="tip"><div class="avatar" aria-hidden="true">QT</div><div><p class="eyebrow" style="margin-bottom:6px">' + D.tip_h + '</p><q>' + esc(D.tip) + '</q></div></div></section>' + ackHtml();
  }

  function ackHtml() { return '<aside class="ack" role="note"><p class="eyebrow">' + t("ack_h") + '</p><p>' + esc(t("ack")) + '</p></aside>'; }

  /* ---------------------------------------------------------------- shell & routing */
  function setMeta(title, desc) {
    document.title = title;
    var m = document.querySelector('meta[name="description"]'); if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); } m.content = desc;
  }
  function shell() {
    document.documentElement.lang = lang;
    $("#skip").textContent = t("skip");
    $("#brand-t").innerHTML = esc(t("site")) + '<small>' + esc(t("by")) + '</small>';
    $("#nav").innerHTML = [["home", t("nav_home")], ["library", t("nav_lib")], ["projects", t("nav_rif")], ["perspective", t("nav_persp")], ["gallery", t("nav_gal")], ["about", t("nav_about")], ["contact", t("nav_contact")]].map(function (n) { return '<a href="#' + n[0] + '" data-r="' + n[0] + '">' + esc(n[1]) + '</a>'; }).join("");
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-l") === lang ? "true" : "false"); });
    $("#foot").innerHTML = '<div class="foot-row"><div><div style="display:flex;gap:10px;align-items:center;margin-bottom:6px"><b style="color:var(--ink)">' + esc(t("site")) + '</b></div><p>' + esc(t("foot_line")) + '</p></div>' +
      '<div class="foot-links">' + (CFG.authorSite ? '<a href="' + esc(CFG.authorSite) + '" target="_blank" rel="noopener">www.trangphan.org</a>' : '') +
      (CFG.linkedin ? '<a href="' + esc(CFG.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' : '') + (CFG.facebook ? '<a href="' + esc(CFG.facebook) + '" target="_blank" rel="noopener">Facebook</a>' : '') + '</div></div>';
  }
  /* ---------- Gallery: classroom photos, children's work, teacher community, original materials ---------- */
  function GAL(vi) {
    function P(f, v, e, c, ce) { return ["img/" + f + ".jpg", vi ? v : e, vi ? c : ce]; }
    return {
      kids: [
        { h: vi ? "Hỏi đáp “Who are you?” với mũ con vật" : "“Who are you?” with animal hats", p: vi ? "Mỗi bé đội một chiếc mũ con vật tự làm và trả lời “I’m a cat!” trước bảng từ vựng con vật." : "Each child wears a home-made animal hat and answers “I’m a cat!” in front of the animal word wall.", items: [
          P("st-02", "Ba bé đội mũ hình ngựa, vẹt và mèo đứng trước bảng có thẻ chữ “Who are you?” và tranh con vật.", "Three children in horse, parrot and cat hats stand by a board showing the words “Who are you?” and animal pictures.", "Who are you?", "Who are you?"),
          P("pr-05", "Một bé trai đội mũ chuột cười tươi, giơ tay chỉ lên các thẻ từ DOG, CAT, PARROT trên bảng.", "A smiling boy in a mouse hat points up at the DOG, CAT and PARROT word cards on the board.", "Chỉ và gọi tên", "Point and name"),
          P("pr-06", "Bé gái tóc buộc hai bên đội mũ mèo, làm động tác bắn tim trước bảng từ vựng.", "A girl with pigtails wears a cat hat and makes a finger-heart in front of the word wall.", "I’m a cat!", "I’m a cat!"),
          P("pr-07", "Bé trai mặc áo vàng đội mũ chuột hamster, đứng trước các thẻ từ THIS, PARK, GUITAR.", "A boy in a yellow T-shirt wears a hamster hat in front of the THIS, PARK and GUITAR cards.", "Mũ con vật tự làm", "Home-made hat"),
          P("pr-08", "Bé gái mặc váy vàng chấm bi đội mũ vẹt, mỉm cười dưới thẻ chữ WHO ARE YOU.", "A girl in a yellow polka-dot dress wears a parrot hat and smiles under the WHO ARE YOU cards.", "I’m a parrot!", "I’m a parrot!"),
          P("pr-09", "Bé trai đội mũ ngựa đứng cạnh tranh rắn, chuột và lợn có thẻ từ tương ứng.", "A boy in a horse hat stands beside the snake, mouse and pig pictures with their word cards.", "I’m a horse!", "I’m a horse!"),
          P("pr-10", "Bé gái đội mũ mèo cười rạng rỡ trước tranh cừu, vẹt, rắn và ngựa.", "A girl in a cat hat beams in front of the sheep, parrot, snake and horse pictures.", "Nụ cười sau giờ học", "All smiles")
        ] },
        { h: vi ? "Lớp học làm bánh bằng tiếng Anh" : "Baking biscuits in English", p: vi ? "Trẻ học từ vựng nguyên liệu, làm theo thẻ công thức từng bước rồi cùng nặn bánh, kết hợp nghe hiểu chỉ dẫn với vận động tinh." : "Children learn ingredient words, follow step-by-step recipe cards and shape biscuits together, linking listening to instructions with fine-motor skills.", items: [
          P("st-12", "Bốn bé đội mũ đầu bếp cầm bột mì, khay trứng, hộp bơ và khay nướng trước bảng có thẻ công thức Biscuit Recipe.", "Four children in chef hats hold flour, eggs, margarine and a baking tray in front of Biscuit Recipe cards.", "Giới thiệu nguyên liệu", "Our ingredients"),
          P("st-14", "Một nhóm bốn bé khác cầm nguyên liệu làm bánh, đứng trước bảng thẻ các bước làm bánh.", "Another group of four children holds the ingredients in front of the recipe-step cards.", "Ingredients: flour, eggs, butter", "Ingredients: flour, eggs, butter"),
          P("st-07", "Các bé ngồi quanh bàn vàng, vo bột thành viên nhỏ đặt lên khay lót giấy bạc.", "Children around a yellow table roll dough into small balls on a foil-lined tray.", "Roll the dough", "Roll the dough"),
          P("st-13", "Bốn bé đội mũ đầu bếp cùng vo bột quanh một khay nướng.", "Four children in chef hats roll dough together around one baking tray.", "Làm việc nhóm", "Teamwork"),
          P("st-09", "Bé trai mặc áo đỏ chăm chú vo viên bột tròn trong lòng bàn tay.", "A boy in a red top concentrates on rolling a ball of dough in his palms.", "Vận động tinh", "Fine-motor skills"),
          P("st-10", "Bé gái đội mũ đầu bếp tập trung nặn bột trên khay.", "A girl in a chef hat focuses on shaping dough over the tray.", "Make a ball", "Make a ball"),
          P("st-08", "Cận cảnh bé gái đội mũ đầu bếp cúi nhìn khay bánh.", "Close-up of a girl in a chef hat looking down at the tray.", "Tập trung", "Focused"),
          P("st-11", "Bé trai nhỏ đội mũ đầu bếp xoa hai tay, bên cạnh hộp bơ thực vật và lò nướng.", "A young boy in a chef hat rubs his hands beside a tub of margarine and an oven.", "Rub your hands", "Rub your hands"),
          P("st-15", "Năm bé quây quanh khay ấn bột thành những chiếc bánh tròn dẹt.", "Five children gather around a tray pressing dough into flat round biscuits.", "Press the biscuits", "Press the biscuits")
        ] },
        { h: vi ? "Phiếu học tập và tư duy" : "Worksheets and thinking tasks", p: vi ? "Phiếu nối bóng, hoàn thành quy luật, phân loại thực phẩm giúp trẻ luyện từ vựng cùng kỹ năng quan sát và lập luận." : "Shadow-matching, pattern and food-sorting sheets build vocabulary alongside observation and reasoning.", items: [
          P("st-01", "Hai bé ngồi quay lưng vào nhau ở hai bàn màu cam và vàng, dùng bút khoanh tranh trên phiếu.", "Two children sit back to back at orange and yellow tables, circling pictures on their worksheets.", "Listen and circle", "Listen and circle"),
          P("st-03", "Bốn bé ngồi thành hàng làm phiếu Matching Shadows with Pictures, nối bóng với hình nhạc cụ.", "Four children in a row complete Matching Shadows with Pictures, linking shadows to musical instruments.", "Nối bóng với hình", "Match the shadows"),
          P("st-04", "Bé gái dán hình người vào ô trống trên phiếu Can You Complete the Pattern?", "A girl sticks figures into the gaps on a Can You Complete the Pattern? sheet.", "Hoàn thành quy luật", "Complete the pattern"),
          P("st-05", "Các bé cắt dán hình thực phẩm lên phiếu đĩa ăn và nối thực phẩm với nguồn gốc của chúng.", "Children cut and stick food pictures onto plate sheets and match foods to where they come from.", "Where does it come from?", "Where does it come from?")
        ] }
      ],
      teach: [
        { h: vi ? "Mentoring Program – Alumni Meet" : "Mentoring Program – Alumni Meet", p: vi ? "Buổi gặp mặt cựu thành viên của chương trình cố vấn giáo viên tiếng Anh. Tác giả tham gia trực tuyến từ Canada." : "An alumni gathering of the mentoring programme for English teachers. The author joined online from Canada.", items: [
          P("tc-03", "Hai giáo viên chụp ảnh trước phông nền Mentoring Program Alumni Meet có dòng chữ Together we strive.", "Two teachers pose in front of the Mentoring Program Alumni Meet backdrop reading Together we strive.", "Alumni Meet", "Alumni Meet"),
          P("tc-04", "Nhóm giáo viên đứng thành hàng, cười vui trong không gian quán cà phê tường gạch trắng.", "A group of teachers stand in a row, laughing, in a white-brick café space.", "Gặp lại nhau", "Together again"),
          P("tc-01", "Giáo viên ngồi quanh bàn viết suy nghĩ lên giấy nhớ.", "Teachers around tables write their reflections on sticky notes.", "Viết chia sẻ", "Writing reflections"),
          P("tc-06", "Giáo viên dán giấy nhớ lên hình cây chiếu trên màn.", "Teachers stick notes onto a tree projected on the screen.", "Cây ý tưởng", "Idea tree"),
          P("tc-05", "Diễn giả mặc gi-lê nâu trình bày cạnh màn chiếu hình cây phủ đầy giấy nhớ.", "A speaker in a brown waistcoat presents beside a screen showing a tree covered in sticky notes.", "Chia sẻ của diễn giả", "Guest speaker"),
          P("tc-07", "Một diễn giả khác mặc áo đen chia sẻ với người tham dự.", "Another speaker in black talks with participants.", "Trao đổi", "Discussion"),
          P("tc-14", "Diễn giả trình bày, trên màn chiếu là tác giả tham gia trực tuyến.", "A speaker presents while the author appears on screen, joining online.", "Kết nối trực tuyến", "Joining online"),
          P("tc-02", "Người tham dự ngồi trên ghế sofa lắng nghe phần trình bày.", "Participants seated on sofas listen to a presentation.", "Lắng nghe", "Listening"),
          P("tc-15", "Giáo viên giơ tay hưởng ứng một câu hỏi.", "Teachers raise their hands in response to a question.", "Hưởng ứng", "Hands up"),
          P("tc-08", "Hai giáo viên trò chuyện vui vẻ bên bàn.", "Two teachers chat happily at a table.", "Kết nối đồng nghiệp", "Peer connection")
        ] },
        { h: vi ? "Workshop trực tiếp kết hợp trực tuyến" : "Blended in-person and online workshop", p: vi ? "Giáo viên ngồi vòng tròn trên sàn lớp mầm non, cùng thực hành hoạt động với một học sinh nhỏ, trong khi đồng nghiệp ở xa theo dõi qua màn hình." : "Teachers sit in a circle on a preschool floor and try out activities with a young learner while remote colleagues follow on screen.", items: [
          P("tc-09", "Giáo viên ngồi thành vòng tròn trên sàn, phía trước là màn hình lớn có người tham gia trực tuyến.", "Teachers sit in a circle on the floor facing a large screen with online participants.", "Vòng tròn chia sẻ", "Sharing circle"),
          P("tc-12", "Người hướng dẫn đứng giữa vòng tròn giáo viên ngồi ghế nhỏ.", "The facilitator stands in the middle of teachers seated on small chairs.", "Hướng dẫn", "Facilitation"),
          P("tc-10", "Giáo viên quỳ quanh một bé đang làm hoạt động trên bảng con.", "Teachers kneel around a child doing an activity on a mini whiteboard.", "Quan sát trẻ", "Observing a child"),
          P("tc-11", "Nhiều giáo viên cúi xuống cùng thực hành nhiệm vụ nhóm trên sàn.", "Many teachers lean in to work on a group task on the floor.", "Thực hành", "Hands-on practice")
        ] },
        { h: vi ? "Workshop đọc “Reading Magic” cùng Twinkl (2024)" : "“Reading Magic” reading workshop with Twinkl (2024)", p: vi ? "Workshop cho giáo viên mầm non về cách đọc truyện cùng trẻ qua bộ truyện Rhino Readers. Tác giả kết nối trực tuyến từ Canada." : "A workshop for kindergarten teachers on reading stories with children through the Rhino Readers series. The author connected online from Canada.", items: [
          P("tc-13", "Diễn giả cầm micro trước màn chiếu Reading Time với bìa truyện Get That Cat!", "A speaker with a microphone stands before a Reading Time slide showing the book Get That Cat!", "Reading Time", "Reading Time"),
          P("tc-16", "Bốn người giơ ngón cái chụp ảnh trước màn hình lớn, tác giả xuất hiện trên màn hình gọi video.", "Four people give a thumbs-up in front of a big screen where the author appears on a video call.", "Kết nối Canada – Việt Nam", "Canada–Vietnam link")
        ] }
      ],
      tl: vi ? [["4/2022", "Liên hoan kể truyện trực tuyến: 9 giáo viên dẫn truyện cho các lớp Kindy, Starters và Movers."], ["7/2022", "Workshop trực tiếp “Phương pháp giảng dạy YLE Cambridge” cho giáo viên."], ["9–10/2022", "Webinar ứng dụng AI trong dạy phát âm và chuỗi workshop phát âm, phối hợp cùng ELSA Speak."], ["8/2022 – 2024", "Mentoring Program mùa 1–3: kết nối mentor và mentee là giáo viên tiếng Anh trên khắp Việt Nam."], ["26/2/2023", "Sự kiện “Leading Together” dành cho cộng đồng giáo viên “I love teaching” tại Hà Nội."], ["2023", "Alumni Meet: gặp mặt cựu thành viên Mentoring Program."], ["7/2024", "Workshop đọc “Reading Magic” cùng Twinkl cho giáo viên mầm non."]]
        : [["Apr 2022", "Online storytelling festival: 9 teachers led stories for Kindy, Starters and Movers classes."], ["Jul 2022", "In-person workshop on teaching Cambridge YLE."], ["Sep–Oct 2022", "Webinar on AI for pronunciation teaching and a pronunciation workshop series with ELSA Speak."], ["Aug 2022 – 2024", "Mentoring Program seasons 1–3, connecting mentors and mentee English teachers across Vietnam."], ["26 Feb 2023", "“Leading Together”, an event for the “I love teaching” teacher community in Hanoi."], ["2023", "Alumni Meet for Mentoring Program members."], ["Jul 2024", "“Reading Magic” reading workshop with Twinkl for kindergarten teachers."]]
    };
  }
  /* ---------- Gallery: "My Teaching Care.er" journey ---------- */
  function JRN(vi) {
    function P(f, v, e, c, ce) { return { img: "img/" + f + ".jpg", alt: vi ? v : e, cap: vi ? c : ce }; }
    function V(n, v, e, c, ce) { return { vid: "vid/v" + n + ".mp4", poster: "vid/v" + n + ".jpg", alt: vi ? v : e, cap: vi ? c : ce }; }
    function T(a, b) { return vi ? a : b; }
    return [
      { id: "mo-dau", yr: "2012 – 2024", h: T("Mở đầu: Vì con mà thành cô giáo", "Prologue: I became a teacher because of my son"),
        p: [T("Mười hai năm trước, tôi chọn học tiếp tiếng Anh và giáo dục mầm non để chuẩn bị cho đứa con đầu lòng. Mười năm trước, tôi học giảng dạy tiếng Anh một cách bài bản để dạy con. Tám năm trước, tôi học Montessori. Sáu năm trước, tôi học các khóa bồi dưỡng về giáo dục đặc biệt để hiểu sâu hơn cách hỗ trợ trẻ. Bốn năm trước, tôi bắt đầu thực hành mentoring và phát triển con người.",
               "Twelve years ago I went back to studying English and early childhood education to get ready for my first child. Ten years ago I trained properly in English language teaching so I could teach him. Eight years ago I studied Montessori. Six years ago I took courses in special education to understand more ways to support children. Four years ago I began practising mentoring and people development."),
             T("Lựa chọn ban đầu chỉ vì con, nhưng lại thành tiền đề để tôi yêu hơn nghề dạy tiếng Anh, rồi thành mong muốn đầu tư vào con người.", "It started with my son, and it became the reason I fell in love with teaching English, and then with investing in people.")],
        q: T("Từ lựa chọn ban đầu là vì con, nhưng lại là tiền đề để yêu hơn về giảng dạy tiếng Anh.", "A choice I first made for my son became the reason I came to love teaching English."),
        m: [V("095", "Tác giả ôm đàn guitar hát cùng con trai nhỏ trên sàn nhà ở Canada.", "The author plays guitar and sings with her young son on the floor at home in Canada.", "Hát cùng con ở Canada, 2024", "Singing with my son in Canada, 2024"),
            P("j1-crowns", "Mười mấy em bé mầm non ngồi trên thảm, đội vương miện giấy đỏ tự làm trong buổi sinh nhật.", "A group of preschoolers sit on the carpet wearing home-made red paper crowns at a birthday party.", "Sinh nhật con trai cùng 17 bạn nhỏ, 2016", "My son's birthday with 17 little friends, 2016")] },

      { id: "chuong-1", yr: "2016 – 2019", h: T("Chương 1: Cô Trang và lũ trẻ", "Chapter 1: Ms Trang and the kids"),
        p: [T("Có sinh nhật với 17 nhóc tì đội vương miện cô tự làm, có trò trốn dưới gầm bàn, ban nhạc “Treeband” tập đúng một lần đã quay xong Shape of You, và những bức tranh học trò vẽ tặng cô ngày 20/11.",
               "There was a birthday with 17 little ones in crowns I made myself, hide-and-seek under the desks, a “Treeband” that rehearsed once and recorded Shape of You, and the pictures my students painted for me on Teachers' Day."),
             T("Một hôm, các con vẽ “I love teacher Trang” kín cả bảng lẫn tường. Tôi không trách mà nhờ các con sửa lại cho đẹp hơn. Các con nhận việc vui vẻ, không đùn đẩy trách nhiệm, và đó mới là điều tôi muốn các con học được.",
               "One day the children covered the board and the wall with “I love teacher Trang”. Instead of scolding, I asked them to help make it look better. They took it on happily, without passing the blame, and that was exactly what I wanted them to learn.")],
        l: T("Bài học: lớp tiếng Anh cũng là nơi dạy nhân cách. Có lần cả lớp không nghĩ ra vì sao mình đặc biệt trong bài “I am unique”. Có lần một bạn gọi món cơm cả nhóm tự làm là “rác”. Có lần cả nhóm gạt một bạn trai ra ngoài vì bạn thích màu hồng, và tôi đã dừng tiết học 15 phút để cả lớp nói về chuyện tôn trọng nhau.",
             "Lesson: an English class is also where character is taught. Once the class could not think why they were special in an “I am unique” lesson. Once a child called the rice rolls the group had made “rubbish”. Once a group pushed out a boy because he liked pink, and I paused the lesson for 15 minutes so we could talk about respect."),
        q: T("Chỉ có trong mắt lũ trẻ TRANG mới thực sự là TRANG.", "Only in the eyes of children is TRANG truly TRANG."),
        m: [P("j1-friends", "Ghép bốn ảnh tác giả chụp chung, cười đùa cùng các học trò nhỏ.", "Four photos of the author laughing and posing with her young students.", "Cô và trò", "Teacher and students"),
            P("j1-tables", "Các bé chui trốn dưới gầm những chiếc bàn nhựa nhiều màu trong lớp.", "Children hide under colourful plastic tables in the classroom.", "Trốn cô Trang dưới gầm bàn", "Hiding from Ms Trang under the tables"),
            V("006", "Hai bé đứng trước bảng chữ cái, một bé chỉ vào thẻ từ trong tiết dạy mẫu.", "Two children stand at an alphabet board; one points to a word card during a demo lesson.", "Tiết dạy demo: khích lệ, chờ lớp yên lặng, rồi cùng lắng nghe bạn", "Demo lesson: encourage, wait for quiet, then listen to a classmate"),
            V("009", "Nhóm học sinh ngồi quanh bàn nhỏ, dùng đồ dùng học tập làm nhạc cụ.", "Students sit around a small table using classroom materials as instruments.", "“Treeband” hát Shape of You", "“Treeband” sings Shape of You"),
            V("020", "Hai học sinh tuổi teen ngồi bên hồ nước trong công viên, cùng hát.", "Two teenage students sit by a pond in a park and sing together.", "Học trò tuổi teen hát trước giờ học", "My teenage students singing before class"),
            V("022", "Các bé mầm non ngồi trên thảm cỏ, cười lớn cùng cô giáo.", "Preschoolers sit on artificial grass laughing with their teacher.", "Cười không dừng được", "Can't stop laughing"),
            P("j1-nature", "Tranh sáp màu bầu trời xanh, lá cây thật dán lên và dòng chữ Thanks to Nature.", "A crayon picture of a blue sky with real leaves glued on and the words Thanks to Nature.", "Tranh học trò tặng cô", "A gift from a student"),
            P("j1-vnteacher", "Tranh hoàng hôn cam hồng, bóng em bé ngồi xích đu dưới tán lá thật, dòng chữ Thanks to my Vietnamese teacher.", "An orange-pink sunset picture of a child on a swing under real leaves, with the words Thanks to my Vietnamese teacher.", "Thanks to my Vietnamese teacher", "Thanks to my Vietnamese teacher"),
            P("j1-drawing", "Tranh bút mực vẽ cô giáo đeo kính và một bạn nhỏ đội vương miện trao tấm thiệp.", "An ink drawing of a teacher in glasses and a child in a crown handing her a card.", "Bức vẽ tặng cô ngày 20/11", "A Teachers' Day drawing"),
            P("j1-board", "Bảng trắng với dòng chữ I love teacher Trang và nhiều trái tim; bên dưới là bức tranh tường sau khi các con sửa lại.", "A whiteboard reading I love teacher Trang with hearts; below, the wall picture after the children repainted it.", "Từ vẽ bậy thành tranh tường", "From scribbles to a mural")] },

      { id: "chuong-2", yr: "2018 – 2019", h: T("Chương 2: Triết lý lớp học", "Chapter 2: A classroom philosophy"),
        p: [T("Đây là giai đoạn tôi viết lại cách mình dạy, kết hợp những gì học được từ TESOL, giáo dục mầm non, giáo dục đặc biệt và Montessori.", "This was when I wrote down how I teach, combining what I learned from TESOL, early childhood education, special education and Montessori.")],
        b: vi ? ["Soạn giáo án bắt đầu từ người học: lứa tuổi, trình độ, nhu cầu, đặc điểm phát triển. Mỗi hoạt động đi qua vòng why – how – what và phải bám mục tiêu bài học.", "Luôn có back-up plan và kiểm soát lỗi (học từ Montessori). Câu lệnh cho trẻ 6 tuổi chỉ 4–6 từ, kèm nét mặt và cử chỉ.", "10 thói quen tích cực của lớp: chào khi đến, trung thực, chia sẻ, tôn trọng, vui vẻ dọn lớp, chào khi về…", "Nghỉ giải lao để xử lý (processing break): quy tắc 10:2 của Eric Jensen, cứ 10 phút học thì 2 phút để não xử lý thông tin.", "Trước khi bé học tiếng Anh, hãy xem bé đã sẵn sàng chưa: tự lập, có sự lặp lại ở nhà, kỹ năng vận động tinh, khả năng tập trung. Hãy là con cú OWL: Observe – Wait – Listen.", "Đọc to (reading aloud) giúp bé tự tin, phát âm tốt hơn, đọc trôi chảy và hiểu cảm xúc nhân vật.", "Mô hình 6Cs của Michael Fullan (Character, Citizenship, Collaboration, Communication, Creativity, Critical thinking) là kim chỉ nam khi thiết kế hoạt động."]
          : ["Lesson planning starts from the learners: age, level, needs and developmental stage. Every activity goes through a why – how – what loop and must serve the lesson goal.", "Always have a back-up plan and error control (borrowed from Montessori). Commands for 6-year-olds are 4–6 words, with facial expression and gesture.", "Ten positive class habits: say hello, be honest, share, respect everyone, enjoy tidying up, say goodbye…", "Processing breaks: Eric Jensen's 10:2 rule, two minutes to process for every ten minutes of input.", "Before a child learns English, check readiness: independence, repetition at home, fine-motor skills, attention span. Be an OWL: Observe – Wait – Listen.", "Reading aloud builds confidence, pronunciation, fluency and an understanding of characters' feelings.", "Michael Fullan's 6Cs (Character, Citizenship, Collaboration, Communication, Creativity, Critical thinking) guide how activities are designed."],
        q: T("Gieo thói quen – Gặt tính cách. · Kids need more exploration than explanation.", "Sow a habit, reap a character. · Kids need more exploration than explanation."),
        m: [P("j2-habits", "Tấm thiết kế nền băng xanh với tiêu đề 10 Positive Habits in My Class.", "A blue ice-textured graphic titled 10 Positive Habits in My Class.", "10 thói quen tích cực", "10 positive habits"),
            V("011", "Các bé và cô giáo đứng thành vòng tròn, vận động theo nhạc giữa giờ học.", "Children and teachers stand in a circle moving to music mid-lesson.", "Processing break giữa giờ", "A processing break"),
            V("021", "Video bé trai đọc thuộc bài thơ “Three little kittens” qua các độ tuổi.", "A video of a young boy reciting the rhyme “Three little kittens” at different ages.", "Con trai tôi đọc thơ qua 3 độ tuổi", "My son reciting a rhyme at three ages"),
            P("j2-park", "Bóng cây lớn in trên nền trời chạng vạng trong buổi ngoại khóa ở công viên.", "The silhouette of a large tree against the dusk sky during an outing to a park.", "Ngoại khóa: học bằng mọi giác quan", "Field trip: learning with every sense")] },

      { id: "chuong-3", yr: "2019 – 2021", h: T("Chương 3: Học mà chơi ở trường mầm non", "Chapter 3: Learning through play in preschool"),
        p: [T("Ở trường mầm non, giờ tiếng Anh là trò “deaf man” với Jingle Bell Rock, là buổi ôn body parts, là làm bánh Giáng sinh và cùng nhau trang trí tường. Các con nặn bột thành vòng tròn, ngôi sao, người tuyết, vừa nặn vừa gọi tên hình.",
               "In preschool, English time meant a “deaf man” game to Jingle Bell Rock, a body-parts review, Christmas baking and decorating the wall together. Children shaped dough into circles, stars and snowmen, naming each shape as they went."),
             T("Rồi dịch bệnh đến, lớp học đóng cửa, và tôi chỉ còn nhớ những câu “cô Trang xinh đẹp”.", "Then the pandemic came, classrooms closed, and all I had left were the voices saying “pretty Ms Trang”.")],
        q: T("Trẻ con hổng biết nói dối.", "Children don't know how to lie."),
        m: [V("023", "Các bé ngồi ghế nhựa thành vòng tròn trên thảm cỏ, một bé đeo tai nghe chơi trò deaf man.", "Children sit in a circle on grass; one wears headphones for the deaf man game.", "Trò “deaf man” với Jingle Bell Rock", "“Deaf man” game with Jingle Bell Rock"),
            V("024", "Hai hàng bé ngồi trên thảm cỏ, ôn tập các bộ phận cơ thể cùng cô.", "Two rows of children on the grass review body parts with their teacher.", "Ôn body parts", "Body-parts review"),
            P("j3-baking", "Cô giáo ngồi giữa các bé quanh bàn nhỏ màu vàng và cam, hướng dẫn vo bột bánh.", "A teacher sits among children at small yellow and orange tables, showing them how to roll dough.", "Làm bánh Giáng sinh", "Christmas baking"),
            P("j3-shapes", "Những miếng bột nặn hình vòng tròn, ngôi sao, xoắn ốc trên thớt gỗ.", "Dough shaped into rings, a star and a twist on a wooden board.", "Circle, star, twist", "Circle, star, twist"),
            P("j3-cookies", "Đĩa bánh bột nặn hình người tuyết, vòng tròn và nhiều hình ngộ nghĩnh.", "A plate of dough cookies shaped like snowmen, rings and other fun forms.", "Tác phẩm của các con", "The children's creations"),
            P("j3-wall", "Bốn bé quay lưng vẽ cây thông Noel và người tuyết lên tường bảng trắng, dán sticker hình hoa.", "Four children, backs to the camera, draw Christmas trees and a snowman on a whiteboard wall with flower stickers.", "Trang trí tường Giáng sinh", "Decorating the Christmas wall"),
            P("j3-puzzles", "Bốn bé ngồi trên sàn ghép thẻ chữ và hình, xung quanh là chữ cái xốp nhiều màu.", "Four children sit on the floor matching word-picture puzzles among foam letters.", "Ghép thẻ chữ cái", "Letter puzzles"),
            P("j3-collage", "Ghép ảnh: cô giáo kể chuyện cho các bé áo đỏ, các bé đội mũ đầu bếp, sách giác quan My Sensory Book, giờ chơi trên cỏ.", "Collage: a teacher tells a story to children in red, children in chef hats, a My Sensory Book, and play time on the grass.", "Những ngày ở trường mầm non", "Days at preschool"),
            V("028", "Các bé nhìn vào máy quay ở cổng trường.", "Children look into the camera at the school gate.", "“Cô Trang xinh đẹp”", "“Pretty Ms Trang”")] },

      { id: "chuong-4", yr: "2020 – 2021", h: T("Chương 4: Covid, giữ nghề bằng cách đổi mới", "Chapter 4: Covid, keeping the profession by changing"),
        p: [T("Covid đóng cửa mọi thứ đúng lúc tôi mang bầu bé thứ hai. Hai vợ chồng làm lại từ đầu: chồng học thiết kế đồ họa, tôi học công nghệ giáo dục để chuyển đổi số, và tôi vẫn hoàn thành chương trình thạc sĩ.",
               "Covid closed everything just as I was expecting my second child. My husband and I started again: he studied graphic design, I studied educational technology to go digital, and I still completed my master's degree."),
             T("Tôi trở thành Ambassador Leader của Twinkl và chia sẻ tài liệu miễn phí cho thầy cô, trong đó có bộ tài liệu giúp trẻ mầm non biết bảo vệ bản thân. Tôi muốn nối dài cánh tay để chương trình mình xây dựng đến được với nhiều học sinh hơn.",
               "I became a Twinkl Ambassador Leader and shared free resources with teachers, including a set that helps preschoolers learn to keep themselves safe. I wanted to reach further so the programme I had built could help more children.")],
        q: T("Đam mê với nghề, mình quyết không bỏ nghề, mà phải phấn đấu và chấp nhận thay đổi.", "Out of passion, I decided not to leave teaching, but to keep striving and accept change."),
        m: [
            P("j4-band", "Năm bé ngồi ghế nhỏ chơi nhạc cụ, khuôn mặt được che bằng hình bông hoa.", "Five children on small chairs play instruments, faces covered with flower graphics.", "Ban nhạc nhí, mặt được che bảo vệ", "A little band, faces covered for privacy")] },

      { id: "chuong-5", yr: "2022", h: T("Chương 5: Lớp học mẫu 4–5 tuổi", "Chapter 5: A model class for 4–5-year-olds"),
        p: [T("Mỗi lớp chỉ 4 bé, học Phonics bằng nhiều giác quan (multi-sensory learning), mỗi tuần 2 buổi 60 phút. Buổi 1 học từ vựng bằng thẻ hình và thẻ chữ, buổi 2 ghép thành mẫu câu và rèn phản xạ. Cứ 2 tuần các con làm quen với một bài đánh giá trên giấy.",
               "Each class had only four children learning phonics through multi-sensory activities, two 60-minute sessions a week. Session one taught vocabulary with picture and word cards; session two built sentence patterns and quick responses. Every two weeks the children tried a short paper check."),
             T("Các con học ghép chữ cái, “Who is this? This is…”, “I'm a…”, “What do you like to do?”, làm tranh chân dung cảm xúc và dự án Vu Lan làm bánh quy tặng ba mẹ. Sau 4 buổi, các bé 4 tuổi làm bài kiểm tra trên giấy không sai câu nào. Một bé cần nhiều hỗ trợ để ghi nhớ, sau 2 tháng cô và mẹ cùng đồng hành, đã tự đọc to được các bước làm bánh.",
               "They learned letter matching, “Who is this? This is…”, “I'm a…”, “What do you like to do?”, made feelings portraits and a Vu Lan project baking biscuits for their parents. After four sessions, the 4-year-olds completed a paper test without a single mistake. One child who needed extra support to remember read the baking steps aloud on her own after two months of help from her teacher and mother.")],
        l: T("Phương pháp: chọn học liệu theo WANTS – NEEDS – LACKS của nhóm học sinh, trực quan hóa tối đa, thẻ chữ luôn có cả chữ in hoa và in thường, học qua bài hát (song-based learning). Cô đóng vai người lắng nghe, người hướng dẫn, người quan sát và mentor. Các bạn nhỏ thích thay nhau làm “cô giáo”.",
             "Method: choose materials by the group's WANTS – NEEDS – LACKS, make everything visual, always show upper- and lower-case letters, and learn through songs. The teacher is listener, instructor, observer and mentor. The children love taking turns being the “teacher”."),
        q: T("Em bé từ vui học, tới thích học và giờ là cảm giác học tập trong hạnh phúc.", "From enjoying lessons, to loving to learn, to learning in happiness."),
        m: [V("052", "Cô giáo và bé ngồi bên khay chữ, so từng chữ cái với thẻ từ GRANDPA; mặt bé được che bằng biểu tượng cảm xúc.", "Teacher and child at a letter tray compare each letter with the GRANDPA word card; the child's face is covered with an emoji.", "Letter matching: đọc to từng chữ, ghép từ trái sang phải", "Letter matching: read each letter aloud, build left to right"),
            P("j5-familytree", "Tấm cây gia đình My family tree ép plastic với hình ông bà, bố mẹ, anh chị em và em bé.", "A laminated My family tree with pictures of grandparents, parents, siblings and a baby.", "My family tree", "My family tree"),
            P("j5-unit1", "Trang mục tiêu Unit 1 My noisy family: từ vựng gia đình, kỹ năng nghe, đọc, sao chép và viết tiền tiểu học, đánh giá phát âm bằng AI.", "The Unit 1 My noisy family plan: family words, listening, reading, copying and pre-writing skills, AI pronunciation check.", "Mục tiêu Unit 1", "Unit 1 goals"),
            V("055", "Bé gái đứng trước bảng, gắn hình thành viên gia đình lên cây gia đình.", "A girl at the board places family members on the family tree.", "Gắn hình lên cây gia đình", "Building the family tree"),
            V("056", "Bé gái áo vàng chỉ vào từng thẻ từ trên bảng.", "A girl in yellow points to each word card on the board.", "Đọc thẻ từ", "Reading word cards"),
            V("057", "Bé gái cầm micro đồ chơi đọc to các thẻ hình trên bảng.", "A girl with a toy microphone reads the picture cards aloud.", "Đọc to với micro", "Reading aloud with a microphone"),
            V("058", "Bé ghép chữ cái nam châm thành từ trên bảng con.", "A child builds words with magnetic letters on a mini board.", "Ghép chữ trên bảng con", "Building words on a mini board"),
            V("059", "Các bé đứng thành hàng nhún nhảy theo bài hát chào buổi học.", "Children stand in a row dancing to the hello song.", "Bài hát chào yêu thích", "Our favourite hello song"),
            P("j5-test", "Ghép ảnh phiếu kiểm tra Who is this? với các câu và hình được đánh dấu tích đỏ.", "A collage of Who is this? test sheets with red ticks.", "Bài kiểm tra sau 4 buổi: không sai câu nào", "The test after four sessions: no mistakes"),
            V("061", "Bé gái đứng trước bảng Who is this?, chỉ vào hình và trả lời This is…", "A girl at the Who is this? board points to a picture and answers This is…", "Who is this? This is…", "Who is this? This is…"),
            V("062", "Bé sắp xếp các thẻ câu trên bàn màu xanh.", "A child arranges sentence cards on a blue table.", "Sắp xếp thẻ câu", "Ordering sentence cards"),
            V("063", "Các bé thay nhau làm cô giáo, chỉ lên bảng gọi bạn trả lời.", "Children take turns being the teacher, pointing at the board and asking classmates.", "Các bạn thay nhau làm “cô giáo”", "Taking turns being the “teacher”"),
            P("j5-magnets", "Ghép ảnh tay bé bóc băng dính nam châm dán sau thẻ hình con vật.", "A collage of a child's hands peeling magnetic tape to stick behind animal picture cards.", "Cùng làm học liệu nam châm", "Making magnetic cards together"),
            P("j5-animals", "Bảng trắng với thẻ WHO ARE YOU, I'm a và hình các con vật kèm câu I'm a cat, I'm a dog…", "A whiteboard with WHO ARE YOU and I'm a cards and animal pictures labelled I'm a cat, I'm a dog…", "Who are you? I'm a…", "Who are you? I'm a…"),
            V("066", "Bé dùng iPad chọn hình theo câu hỏi.", "A child uses an iPad to choose pictures for a question.", "Học với iPad", "Learning with an iPad"),
            V("067", "Bé gái chỉ ngón tay đọc từng câu Who is this? This is…", "A girl points along each Who is this? This is… sentence.", "Chỉ tay đọc câu", "Finger-pointing while reading"),
            V("068", "Phiếu Who is this? được đánh dấu khi bé đọc.", "A Who is this? sheet ticked as the child reads.", "Đọc và tự kiểm tra", "Read and self-check"),
            V("070", "Bé gái ghép thẻ I'm a với hình con vật trên bảng.", "A girl matches I'm a cards to animal pictures on the board.", "Ghép câu I'm a…", "Building I'm a… sentences"),
            V("071", "Bé gái gắn thẻ chữ WHO ARE YOU lên bảng.", "A girl sticks the WHO ARE YOU cards on the board.", "Who are you?", "Who are you?"),
            V("072", "Bé trai đọc tên con vật trên thẻ hình; tên bé trong video đã được làm mờ.", "A boy names the animal on a picture card; his name in the video has been blurred.", "Gọi tên con vật", "Naming animals"),
            V("073", "Bé gái đọc dải câu I'm a cat, I'm a horse…; tên bé trong video đã được làm mờ.", "A girl reads a strip of sentences I'm a cat, I'm a horse…; her name has been blurred.", "Đọc dải câu", "Reading a sentence strip"),
            V("074", "Bé chạm vào màn hình iPad để nghe và chọn đáp án.", "A child taps an iPad screen to listen and choose.", "Nghe và chọn trên iPad", "Listen and choose on the iPad"),
            V("075", "Bé đọc câu với thẻ chó, có chữ So cute n funny.", "A child reads with a dog card; the caption says So cute n funny.", "Lỗi kỹ thuật xíu", "A small technical hiccup"),
            P("j5-likeboard", "Bảng thẻ chữ WHAT DO YOU LIKE TO DO? và I LIKE với các hành động clapping hands, stamping feet…", "Word cards WHAT DO YOU LIKE TO DO? and I LIKE with actions such as clapping hands and stamping feet.", "What do you like to do?", "What do you like to do?"),
            P("j5-likesheets", "Ghép bốn phiếu bài tập nối hành động với câu I like…, sắp xếp từ thành câu hỏi.", "Four worksheets matching actions to I like… sentences and ordering words into the question.", "Phiếu luyện tập", "Practice sheets"),
            P("j5-face1", "Bé gái váy hoa ngồi cầm bức chân dung ghép từ mảnh giấy màu; mắt được che bằng hình vẽ.", "A girl in a floral dress holds a portrait collage; her eyes are covered with a drawing.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-face2", "Bé gái cầm bức chân dung ghép màu hồng và vàng; mắt được che, tên trên tranh đã làm mờ.", "A girl holds a pink and yellow portrait collage; eyes covered and the name blurred.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-face3", "Bé trai áo vàng cười tươi cầm tranh ghép; mắt được che, tên trên tranh đã làm mờ.", "A smiling boy in yellow holds his collage; eyes covered and the name blurred.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-face4", "Bé gái tóc hai bím cầm tranh chân dung nền xanh lá; mắt được che bằng hình trái tim.", "A girl with pigtails holds a green-background portrait; eyes covered with heart graphics.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-face5", "Bé gái cười cầm tranh hình ngôi nhà có mắt và miệng; mắt được che.", "A smiling girl holds a house-shaped face collage; eyes covered.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-face6", "Bé gái tóc ngắn cầm tranh ghép nhiều mảnh màu; mắt được che.", "A girl with a bob holds a multi-coloured collage; eyes covered.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-face7", "Bé trai áo cam cầm tranh hình tam giác có một con mắt; mắt bé được che.", "A boy in orange holds a triangle face collage with one eye; his eyes are covered.", "Chân dung cảm xúc", "Feelings portrait"),
            P("j5-dictionary", "Các trang My Picture Dictionary bé tự cắt dán hình và chữ con vật, hành động, nơi chốn.", "My Picture Dictionary pages where children cut and stick animals, actions and places with their words.", "My Picture Dictionary", "My Picture Dictionary"),
            P("j5-recipe", "Thẻ công thức Biscuit Recipe và 9 bước làm bánh gắn bằng nam châm trên bảng.", "A Biscuit Recipe card and nine baking-step cards held with magnets on the board.", "Dự án Vu Lan: 9 bước làm bánh", "Vu Lan project: nine baking steps"),
            V("089", "Cô giáo đội mũ đầu bếp đàn ukulele hát về các bước làm bánh bên thẻ công thức.", "A teacher in a chef hat plays ukulele and sings the baking steps beside the recipe cards.", "Hát các bước làm bánh", "Singing the baking steps"),
            V("093", "Bé gái đọc to các bước làm bánh trên bàn; mặt bé được che bằng hình hoạt hình.", "A girl reads the baking steps aloud at the table; her face is covered with a cartoon.", "Tự đọc to các bước làm bánh sau 2 tháng", "Reading the steps aloud after two months")] },

      { id: "chuong-6", yr: "2022", h: T("Chương 6: Từ lớp học đến đào tạo giáo viên", "Chapter 6: From the classroom to teacher training"),
        p: [T("Ngày 21/5/2022, workshop “Teaching with Blended Learning Approach” giúp giáo viên lên lesson plan, chọn chiến lược kết hợp trực tiếp và trực tuyến, rồi tự tay làm học liệu từ dây kim tuyến, pom-pom và thẻ chữ. Tiếp theo là khóa đào tạo cả ngày 30/7 về xây dựng giáo án, làm học liệu và ứng dụng công nghệ cho lớp từ ít đến đông học sinh.",
               "On 21 May 2022 the workshop “Teaching with Blended Learning Approach” had teachers build lesson plans, choose face-to-face and online strategies, and make their own materials from pipe cleaners, pom-poms and word cards. A full-day training on 30 July followed, on lesson planning, materials making and technology for small and large classes.")],
        l: T("Ý nghĩa: giáo viên học bằng cách làm, giống hệt cách các em nhỏ học. Mỗi nhóm trình bày sản phẩm, nhận góp ý của nhóm khác rồi mới tổng kết.", "Why it matters: teachers learn by doing, exactly as children do. Each team presents its product and gets feedback from the others before the wrap-up."),
        m: [P("j6-intro", "Tác giả đứng trình bày trước màn hình lớn có tiêu đề Teaching with Blended Learning.", "The author presents in front of a large screen titled Teaching with Blended Learning.", "Mở đầu workshop 21/5/2022", "Opening the workshop, 21 May 2022"),
            P("j6-circle", "Giáo viên ngồi thành vòng tròn lớn trên sàn, tác giả ngồi chia sẻ.", "Teachers sit in a large circle on the floor while the author shares.", "Vòng tròn chia sẻ", "Sharing circle"),
            P("j6-sort", "Một giáo viên giới thiệu hoạt động phân loại ý kiến For và Against trên màn hình.", "A teacher introduces a For and Against sorting task on the screen.", "Hoạt động phân loại ý kiến", "Sorting ideas"),
            
            P("j6-dojo", "Giáo viên giới thiệu cách điểm danh và khen thưởng trên ClassDojo.", "A teacher shows attendance and rewards on ClassDojo.", "Công cụ quản lý lớp", "Class management tools"),
            P("j6-materials2", "Bàn đầy dây kim tuyến nhiều màu, túi pom-pom, keo dán và cốc giấy.", "A table with colourful pipe cleaners, a bag of pom-poms, glue and paper cups.", "Nguyên liệu làm học liệu", "Materials for making resources"),
            P("j6-materials1", "Keo, bút sáp, chuông bàn, kéo và các thẻ chữ xanh ghi các bước lập kế hoạch.", "Glue, crayons, desk bells, scissors and blue cards listing planning steps.", "Thẻ các bước lập kế hoạch", "Planning-step cards"),
            P("j6-team1", "Bốn giáo viên cúi xuống sàn ghép thẻ lên sơ đồ Blended Learning Strategies.", "Four teachers bend over the floor placing cards on a Blended Learning Strategies chart.", "Làm việc nhóm", "Team work"),
            P("j6-team2", "Ba giáo viên quỳ trên sàn sắp xếp thẻ chiến lược lên sơ đồ.", "Three teachers kneel on the floor arranging strategy cards on the chart.", "Chọn chiến lược", "Choosing strategies"),
            P("j6-team3", "Ba giáo viên nam ngồi xổm trên sàn dán thẻ và rắc kim tuyến lên poster.", "Three male teachers crouch on the floor sticking cards and glitter on a poster.", "Trang trí poster", "Decorating the poster"),
            P("j6-poster1", "Poster Blended Learning Strategies với sơ đồ hai vòng tròn và 7 bước lập kế hoạch.", "A Blended Learning Strategies poster with a two-circle diagram and seven planning steps.", "Sản phẩm nhóm", "Team product"),
            P("j6-poster2", "Poster kim tuyến với các bước lập kế hoạch, kết thúc và đánh giá bài học.", "A glittery poster listing planning, ending and evaluating the lesson.", "Sản phẩm nhóm", "Team product"),
            P("j6-planboard", "Tấm Lesson Plan có 10 bước nối bằng pom-pom, hình ngôi sao, trái tim và đám mây bằng dây kim tuyến.", "A Lesson Plan board with ten steps linked by pom-poms and pipe-cleaner star, heart and cloud.", "Lesson plan 10 bước", "A ten-step lesson plan"),
            P("j6-present1", "Hai giáo viên đứng trình bày poster của nhóm.", "Two teachers present their team's poster.", "Trình bày sản phẩm", "Presenting"),
            P("j6-present2", "Ba giáo viên nam trình bày poster và sơ đồ trước lớp.", "Three male teachers present their poster and chart.", "Nhận góp ý", "Getting feedback"),
            V("077", "Cô giáo đàn ukulele cho hai bé ngồi bàn nhỏ trước bảng thẻ chữ.", "A teacher plays ukulele for two children at small tables in front of word cards.", "Song-based learning (trích đoạn quảng bá khóa 30/7)", "Song-based learning (clip for the 30 July course)"),
            V("078", "Bé gái đứng trước bảng What do you like to do?; mặt được che bằng hình hoạt hình.", "A girl at the What do you like to do? board; her face is covered by a cartoon.", "What do you like to do?", "What do you like to do?"),
            V("079", "Bé làm phiếu bài tập trên bàn vàng; mặt được che bằng hình hoạt hình.", "A child completes a worksheet at a yellow table; face covered by a cartoon.", "Luyện tập trên phiếu", "Worksheet practice")] },

      { id: "ket", yr: "2023 – 2024", h: T("Kết: Mang nghề theo sang Canada", "Epilogue: Bringing the profession to Canada"),
        p: [T("Sang Canada, tôi mang theo bộ học liệu đã xây dựng và tiếp tục đồng hành với giáo viên Việt Nam từ xa qua Mentoring Program và các workshop. Mười hai năm nhìn lại, mọi bắt đầu đều từ những đứa trẻ.",
               "In Canada I brought the materials I had built and kept supporting Vietnamese teachers from afar through the Mentoring Program and workshops. Looking back over twelve years, every beginning came from the children.")],
        q: T("Còn bạn, bạn chọn nghề giáo viên tiếng Anh vì lý do gì?", "And you, why did you choose to teach English?"),
        m: [P("j7-materials", "Ghép 9 ảnh học liệu: thẻ ngữ pháp câu bị động, từ họ -AM, bowling âm vần, sách giác quan, thành phố London bằng giấy, tranh màu nước.", "Nine photos of materials: passive-voice cards, the -AM word family, phonics bowling, a sensory book, a paper London, watercolour painting.", "Bộ học liệu tự làm", "Home-made materials"),
            P("j7-sky", "Hàng cây trụi lá in bóng trên nền trời xanh, vầng trăng lưỡi liềm nhỏ.", "Bare trees silhouetted against a blue sky with a thin crescent moon.", "Bầu trời Canada, 2024", "Canadian sky, 2024")] }
    ];
  }
  /* ---------- Gallery: "Busy with Purpose" ---------- */
  function JRN2(vi) {
    function T(a, b) { return vi ? a : b; }
    function P(n, v, e) { var c = vi ? v : e; return { img: "img/h" + ("00" + n).slice(-3) + ".jpg", alt: c, cap: c }; }
    function V(n, v, e) { var c = vi ? v : e; return { vid: "vid/hv" + ("0" + n).slice(-2) + ".mp4", poster: "vid/hv" + ("0" + n).slice(-2) + ".jpg", alt: c, cap: c }; }
    return [
      { id: "mo-dau", yr: "2017", h: T("Mở đầu: Làm sao để một bà mẹ bận rộn vẫn vui cùng con?", "Prologue: How can a busy mum still have fun with her child?"),
        p: [T("Năm 2017, tôi tự hỏi một câu rất đời thường: làm sao một người mẹ bận rộn vẫn có thể vui chơi và học cùng con? Câu trả lời đầu tiên nằm ngay trong bếp: một chiếc đĩa, vài giọt màu, một quả trứng, một túi nước.",
               "In 2017 I asked myself a very ordinary question: how can a busy mother still play and learn with her child? The first answer was right there in the kitchen: a plate, a few drops of colour, an egg, a bag of water."),
             T("Gần mười năm sau, tôi vẫn đang “bận”, nhưng là bận có chủ đích: từ phòng thí nghiệm tại gia, qua lớp học trực tuyến và những chuyến tập huấn khắp Việt Nam, đến phòng ngoại giao giáo dục ở Toronto.",
               "Nearly ten years later I am still busy, but busy with purpose: from a home lab, through online classes and training trips across Vietnam, to an education-diplomacy room in Toronto.")],
        q: T("Bận, nhưng bận có chủ đích.", "Busy, but busy with purpose."),
        m: [V(16, "Cùng con trai pha màu trên đĩa để làm “chiếc chổi ma thuật”.", "Mixing colours on a plate with my son to make a “magic broom”.")] },

      { id: "chuong-1", yr: "2017", h: T("Chương 1: Phòng thí nghiệm tại gia", "Chapter 1: The Home Lab"),
        p: [T("Những thí nghiệm nhỏ làm bằng đồ dùng trong nhà: màu thực phẩm, dầu ăn, bột nở, túi zip, quả bóng bay. Tôi quay lại từng thí nghiệm, thêm phụ đề tiếng Việt và tiếng Anh để các mẹ khác có thể làm cùng con.",
               "Small experiments made with things found at home: food colouring, oil, baking soda, zip bags, balloons. I filmed each one with Vietnamese and English captions so other parents could try them with their children."),
             T("Điều tôi học được: con không cần đồ chơi đắt tiền, chỉ cần một người lớn đủ tò mò để cùng hỏi “điều gì sẽ xảy ra?”.",
               "What I learned: a child does not need expensive toys, only an adult curious enough to ask “what will happen?” together.")],
        l: T("Mỗi thí nghiệm là một bài học từ vựng và tư duy khoa học. Làm xong, hãy để trẻ tự nói lại các bước bằng tiếng Anh.",
             "Every experiment is a lesson in vocabulary and scientific thinking. When it is done, let the child retell the steps in English."),
        m: [V(2, "Mê cung giấy: dẫn bi theo đường vẽ.", "Paper maze: guiding marbles along the drawn path."),
            V(3, "Túi cảm giác: nhào màu trong túi zip.", "Sensory bag: squishing colours inside a zip bag."),
            V(6, "Bột bắp trộn nước (oobleck) ngoài sân.", "Oobleck (cornflour and water) outdoors."),
            V(11, "Khoa học trong bếp: dầu, màu và bột nở.", "Kitchen science: oil, colour and baking soda."),
            V(13, "Màu sắc lan trong lọ nước.", "Colour spreading in a jar of water."),
            V(29, "Bóng bay, đá và nước.", "Balloons, ice and water."),
            V(34, "Quả trứng “bóng nảy” ngâm giấm.", "The “bouncy egg” soaked in vinegar."),
            V(27, "Thả đồ chơi vào khối đá cùng con trai.", "Freezing toys in ice with my son."),
            V(4, "Thí nghiệm lửa trên đĩa cát, do người lớn thực hiện.", "A fire experiment on a plate of sand, done by an adult."),
            P(49, "Lọ nước có cây và màu tím: vòng tuần hoàn thu nhỏ.", "A jar with a plant and purple water: a small ecosystem."),
            P(222, "Túi nước vẽ chu trình nước (water cycle).", "A water-cycle bag drawn with marker."),
            P(210, "Quả dâu tây hái từ chậu cây tự trồng.", "A strawberry picked from a home-grown plant."),
            P(90, "Khách sạn côn trùng (bug hotel) trong vườn.", "A bug hotel in the garden."),
            P(63, "Sân khấu bóng Halloween bằng giấy đen.", "A Halloween shadow theatre made of black paper."),
            P(93, "Học từ vựng bằng bóng và rối bóng.", "Learning vocabulary through shadow puppets."),
            P(3, "Tranh tuyên truyền “Talk PANTS”: dạy trẻ biết bảo vệ cơ thể.", "A “Talk PANTS” poster: teaching children to keep their bodies safe.")] },

      { id: "chuong-2", yr: "2018 – 2019", h: T("Chương 2: Người làm học liệu", "Chapter 2: The Materials Maker"),
        p: [T("Từ những thí nghiệm tại nhà, tôi chuyển sang tự làm học liệu cho lớp: lapbook, thẻ chữ, trò chơi ngữ pháp, rối và các tấm thẻ từ vựng. Tôi tin học liệu tốt không nhất thiết đắt, chỉ cần có ý đồ sư phạm rõ ràng.",
               "From home experiments I moved on to making materials for class: lapbooks, letter cards, grammar games, puppets and vocabulary cards. I believe good materials need not be expensive, only pedagogically deliberate."),
             T("Tôi còn đọc và ghi lại những điều làm mình tin vào nghề, trong đó có câu của nhà giáo dục Vasyl Sukhomlinsky về niềm tin vào đứa trẻ.",
               "I also collected the ideas that keep me believing in this job, among them Vasyl Sukhomlinsky's words about faith in the child.")],
        l: T("Một học liệu tốt trả lời được ba câu hỏi: trẻ làm gì, trẻ nói gì, trẻ nhớ được gì sau 10 phút.",
             "A good material answers three questions: what does the child do, what does the child say, what is remembered ten minutes later?"),
        q: T("Học liệu là cách tôi nói “tôi tin con làm được” bằng giấy, kéo và hồ dán.", "Materials are how I say “I believe you can” with paper, scissors and glue."),
        m: [V(8, "Cô nói giọng bụng để tương tác với nhân vật ảo, người bạn đồng hành của các bé.", "Ventriloquism: the author voices a virtual character, a companion who talks with the children."),
            V(19, "Hộp nhạc đồ chơi làm học liệu nói.", "A toy music box used as a speaking prompt."),
            V(26, "Bảng ghép gỗ: dạy từ vựng côn trùng.", "A wooden puzzle used to teach insect vocabulary."),
            V(32, "Kể chuyện “The Ant and the Grasshopper” bằng sân khấu hộp giấy.", "Telling “The Ant and the Grasshopper” on a cardboard stage.")],
        g: [
          { h: T("Chữ cái và âm vần", "Letters and phonics"), items: [
            P(12, "Tờ gấp chữ B (Bear) tự vẽ.", "A hand-drawn folding sheet for letter B (Bear)."),
            P(23, "Máy ghép chữ WOOD.", "A letter-matching toy spelling WOOD."),
            P(30, "Thẻ b – e – f cho trẻ nhận mặt chữ.", "A b – e – f card for letter recognition."),
            P(50, "Chữ cái bằng xốp trên bãi cỏ.", "Foam letters on the grass."),
            P(134, "Chữ K xanh trên hạt đậu.", "A blue letter K on soybeans."),
            P(221, "Bowling âm vần: đổ ngã âm đầu.", "Phonics bowling: knock down the sounds."),
            P(86, "Họ từ -AM với tranh cừu (ram).", "The -AM word family with a ram drawing."),
            P(234, "Ngôi nhà họ từ -en, -ed, -et.", "Word-family houses for -en, -ed, -et."),
            P(83, "Ghép hình COW: ghép chữ và tranh.", "A COW puzzle matching letters and picture.")] },
          { h: T("Lapbook và tờ gấp", "Lapbooks and foldables"), items: [
            P(55, "Lapbook “Number bonds” cầu vồng.", "A rainbow “Number bonds” lapbook."),
            P(82, "Dàn lapbook từ vựng trên bàn.", "A row of vocabulary lapbooks on the desk."),
            P(203, "Lapbook cơ thể: tóm tắt kiến thức vừa học.", "A body-systems lapbook summarising new knowledge."),
            P(8, "Hoạt động đọc hiểu và sáng tạo nội dung theo chủ đề.", "Reading and content-creation activity around a theme."),
            P(161, "Hình lập phương Taste / Hear.", "A Taste / Hear cube."),
            P(72, "“My Sensory Book”: sách các chất liệu.", "“My Sensory Book”: a book of textures."),
            P(131, "Bộ học liệu mang đi dạy: thẻ, túi bí ẩn, bịt mắt.", "A travelling teaching kit: cards, a mystery bag, eye mask."),
            P(132, "Hộp giấy màu và dụng cụ làm thủ công.", "A box of coloured paper and craft tools."),
            P(189, "Bàn học liệu: pom-pom, hồ, bút, thẻ.", "A materials table: pom-poms, glue, pens and cards.")] },
          { h: T("Rối, thủ công và cảm xúc", "Puppets, crafts and feelings"), items: [
            P(95, "Ghép que kem: ABCDE và ổ gà con.", "Lolly-stick puzzle: ABCDE and a chick nest."),
            P(147, "Ngôi nhà bằng que kem cho từ vựng nơi chốn.", "Lolly-stick houses for place vocabulary."),
            P(58, "Vịt con bằng giấy xếp.", "Folded paper ducklings."),
            P(76, "Mặt nạ mèo giấy.", "A paper cat mask."),
            P(144, "“Love yourself”: hình người giấy ghi cách chăm sóc bản thân.", "“Love yourself”: a paper figure of self-care ideas."),
            P(34, "Hoạt động cân bằng cảm xúc bằng giấy.", "An emotional-balance craft made of paper."),
            P(53, "Bản đồ Việt Nam bằng pom-pom và ảnh.", "A pom-pom map of Vietnam with photos."),
            P(177, "Đá vẽ tay: sản phẩm thủ công.", "Hand-painted rocks.")] },
          { h: T("Trò chơi, ngữ pháp và khủng long", "Games, grammar and dinosaurs"), items: [
            P(80, "Thẻ bài trò chơi câu bị động.", "A passive-voice card game."),
            P(97, "Jenga ngữ pháp: rút khối, đặt câu.", "Grammar Jenga: pull a block, make a sentence."),
            P(125, "Khay thẻ ghi nhớ từ vựng.", "A tray game for vocabulary memory."),
            P(127, "Túi nước và chữ nổi: trò chơi giác quan.", "A water bag with floating letters: a sensory game."),
            P(114, "Phiếu bài tập về nam châm.", "A worksheet on magnetism."),
            P(47, "“Dinosaur extinction”: khủng long và sự tuyệt chủng.", "“Dinosaur extinction” with toy skeletons."),
            P(242, "Trứng khủng long nứt vỏ.", "A cracking dinosaur egg."),
            P(187, "Khủng long đồ chơi và tranh tô màu.", "Toy dinosaurs and colouring pages."),
            P(216, "Phiếu đọc hiểu về khủng long cho trẻ 5–7 tuổi.", "A dinosaur reading sheet for ages 5–7."),
            P(116, "Poster vòng đời cây (plant life cycle).", "A plant life-cycle poster."),
            P(207, "Thành phố London bằng giấy.", "A paper London.")] }
        ] },

      { id: "chuong-3", yr: "2020 – 2021", h: T("Chương 3: Lớp học lên mạng", "Chapter 3: Teaching Goes Online"),
        p: [T("Khi lớp học chuyển lên mạng, tôi học cách dạy trẻ qua màn hình: nền tảng ClassIn, bài giảng Twinkl, các lớp thử nghiệm với trường cao đẳng và trung tâm. Học liệu giấy được số hóa thành slide, bài hát và câu chuyện ngắn.",
               "When classes moved online I learned to teach children through a screen: the ClassIn platform, Twinkl lessons, pilot classes with colleges and centres. Paper materials became slides, songs and short stories."),
             T("Tôi vừa dạy vừa học, và ghi lại những gì làm được để chia sẻ với đồng nghiệp.", "I taught and learned at the same time, and wrote down what worked to share with colleagues.")],
        m: [V(23, "Bài giảng “Living and non-living” dạng video.", "A “Living and non-living” lesson as a video."),
            V(25, "Công thức bánh chưng bằng hình ảnh tiếng Anh.", "A bánh chưng recipe in English slides.")] },

      { id: "chuong-4", yr: "2022", h: T("Chương 4: Đi khắp mọi miền", "Chapter 4: The Training Road"),
        p: [T("Năm 2022, tôi đi tập huấn cho giáo viên ở nhiều nơi: Hà Nội, Sài Gòn, Nha Trang. Mười một buổi workshop, từ “Reading is Fun” đến “Blended learning”, một gian hàng triển lãm công nghệ giáo dục và Hội nghị quốc tế VietTESOL 2022 tại Nha Trang.",
               "In 2022 I trained teachers in many places: Hanoi, Saigon, Nha Trang. Eleven workshops, from “Reading is Fun” to “Blended learning”, an education-technology exhibition booth and the VietTESOL International Convention 2022 in Nha Trang."),
             T("Sau mỗi buổi, tôi xin giáo viên viết ba điều: điều thích, điều chưa thích, điều muốn học thêm. Những mảnh giấy viết tay dưới đây là phần quý nhất của tôi.",
               "After each session I asked teachers to write three things: what they liked, what they did not, what they wanted to learn next. These handwritten slips are what I treasure most.")],
        l: T("Phản hồi viết tay ngắn gọn thường thật hơn phiếu khảo sát dài. Hãy xin ba dòng, không hơn.", "Short handwritten feedback is often more honest than a long survey. Ask for three lines, no more."),
        q: T("Giáo viên cần tôi nghe nhiều hơn nói.", "Teachers need me to listen more than I talk."),
        m: [P(21, "Trước hội trường tại VietTESOL International Convention 2022, Nha Trang.", "Before the VietTESOL International Convention 2022, Nha Trang."),
            P(148, "Phòng workshop tại VietTESOL 2022.", "A workshop room at VietTESOL 2022."),
            P(31, "Vịnh Nha Trang nhìn từ khách sạn hội nghị.", "Nha Trang bay seen from the conference hotel."),
            P(146, "Giảng workshop trực tuyến kết hợp: 170 lượt đăng ký.", "Teaching a blended workshop: 170 sign-ups."),
            P(112, "Mind map và sketchnote cho hoạt động đọc hiểu.", "Mind map and sketchnote for reading comprehension."),
            P(13, "Áp phích “Environment Lab for Kids” (ACCB, YSEALI).", "The “Environment Lab for Kids” poster (ACCB, YSEALI)."),
            P(246, "Tại gian hàng Environment Lab for Kids in Viet Nam.", "At the Environment Lab for Kids in Viet Nam booth."),
            P(107, "Thư mời triển lãm công nghệ lớp học của ClassIn, 18/6/2022.", "Invitation to the ClassIn classroom-technology exhibition, 18 June 2022."),
            P(208, "Áp phích workshop “Designing blended learning activities for young learners”.", "Poster for the “Designing blended learning activities for young learners” workshop."),
            P(231, "Đứng cạnh biển “OMO Learning” tại triển lãm.", "Beside the “OMO Learning” banner at the exhibition."),
            P(188, "Đám mây từ khóa từ phản hồi của giáo viên.", "A word cloud from teachers' feedback.")],
        g: [{ h: T("Ba dòng phản hồi viết tay", "Three-line handwritten feedback"), items: [
            P(10, "Phản hồi 1.", "Feedback slip 1."), P(15, "Phản hồi 2.", "Feedback slip 2."), P(35, "Phản hồi 3.", "Feedback slip 3."),
            P(41, "Phản hồi 4.", "Feedback slip 4."), P(52, "Phản hồi 5.", "Feedback slip 5."), P(73, "Phản hồi 6.", "Feedback slip 6."),
            P(99, "Phản hồi 7.", "Feedback slip 7."), P(109, "Phản hồi 8.", "Feedback slip 8."), P(137, "Phản hồi 9.", "Feedback slip 9."),
            P(165, "Phản hồi 10.", "Feedback slip 10."), P(240, "Phản hồi 11.", "Feedback slip 11.")] }] },

      { id: "chuong-5", yr: "2022 – 2024", h: T("Chương 5: Giáo viên, Mentor, Edupreneur", "Chapter 5: Teacher, Mentor, Edupreneur"),
        p: [T("Từ cuối năm 2022, vai trò của tôi mở rộng: mentor trong Chương trình Mentoring của ClassIn, diễn giả webinar về phát âm có hỗ trợ AI, chuyến học tập ELT tại Canada, buổi Human Library ở Moncton và Global Summit 2023 tại Đại học Toronto.",
               "From late 2022 my role widened: mentor in ClassIn's Mentoring Program, speaker at a webinar on AI-assisted pronunciation, an ELT study trip to Canada, a Human Library session in Moncton and the Global Summit 2023 at the University of Toronto."),
             T("Tôi cũng bắt đầu viết: bài cộng tác trên Brainz Magazine, và cuộc phỏng vấn về hành trình từ 4Cs, 6Cs đến 7Cs của kỹ năng thế kỷ 21.",
               "I also began to write: contributions to Brainz Magazine, and an interview on the path from 4Cs and 6Cs to 7Cs of 21st-century skills.")],
        q: T("Dạy học là đủ, nhưng chia sẻ nghề mới làm nghề lớn lên.", "Teaching is enough, but sharing the craft is what makes it grow."),
        m: [P(17, "Sơ đồ “Components of Expert Systems in AI” dùng trong webinar phát âm có AI.", "“Components of Expert Systems in AI” diagram used in the AI-pronunciation webinar."),
            P(196, "Bìa tài liệu Global Summit 2023: Worldwide Commission to Educate All Kids.", "Programme cover of Global Summit 2023: Worldwide Commission to Educate All Kids."),
            P(56, "Bài “Vietnamese People and Their Studious Story” trên Brainz Magazine.", "“Vietnamese People and Their Studious Story” in Brainz Magazine.")] },

      { id: "chuong-6", yr: "2024 – 2026", h: T("Chương 6: Nhịp cầu Canada – Việt Nam", "Chapter 6: Building Bridges"),
        p: [T("Từ cuối năm 2024, tôi dành phần lớn thời gian cho giáo dục và ngoại giao văn hóa: đồng hành cùng mentee của OE4BW, dẫn podcast cùng Hanson College, mentor cho sinh viên RMIT và Toronto Metropolitan University, dự chương trình Best Diplomats Canada 2025 do UNITAR hỗ trợ, và kết nối mạng lưới dạy tiếng Việt và văn hóa Việt tại Canada.",
               "From late 2024 most of my time goes to education and cultural diplomacy: accompanying OE4BW mentees, recording a podcast with Hanson College, mentoring RMIT and Toronto Metropolitan University students, attending Best Diplomats Canada 2025 supported by UNITAR, and connecting the network that teaches Vietnamese language and culture in Canada."),
             T("Trong Best Diplomats 2025, tôi đại diện Việt Nam trong phiên mô phỏng, có nghị quyết đạt 98% phiếu thuận. Tôi mang theo áo dài và con chuồn chuồn tre để kể câu chuyện “ngoại giao tre” của Việt Nam.",
               "At Best Diplomats 2025 I represented Vietnam in the simulation, and a resolution passed with 98% of the vote. I brought an áo dài and a bamboo dragonfly to tell Vietnam's “bamboo diplomacy” story.")],
        l: T("Ngoại giao giáo dục bắt đầu từ chuyện nhỏ: một lớp học, một người bạn, một câu chuyện được kể đúng lúc.", "Education diplomacy starts small: one classroom, one friend, one story told at the right moment."),
        q: T("Từ phòng thí nghiệm tại gia đến phòng ngoại giao, tôi vẫn là cô giáo.", "From the home lab to the diplomacy room, I am still a teacher."),
        m: [V(24, "Phát biểu tại phiên mô phỏng Best Diplomats Canada 2025.", "Speaking at the Best Diplomats Canada 2025 simulation."),
            P(11, "Áp phích Master Diplomacy: Leadership and Negotiations.", "Master Diplomacy poster: Leadership and Negotiations."),
            P(19, "Thẻ đại biểu Best Diplomats Canada 2025 tại Toronto.", "Delegate badge, Best Diplomats Canada 2025, Toronto."),
            P(69, "Thẻ đại biểu trên nền thành phố Toronto.", "The delegate badge against the Toronto skyline."),
            P(119, "Phông nền Best Diplomats Canada 2025.", "The Best Diplomats Canada 2025 backdrop."),
            P(124, "Ngồi sau biển “Vietnam” với áo dài đỏ.", "Seated behind the “Vietnam” placard in a red áo dài."),
            P(172, "Chụp ảnh trước phông Best Diplomats.", "A photo before the Best Diplomats backdrop."),
            P(117, "Con chuồn chuồn tre mang cờ Việt Nam: quà “ngoại giao tre”.", "A bamboo dragonfly with the Vietnamese flag: a “bamboo diplomacy” gift."),
            P(230, "Áo dài đỏ và cờ Việt Nam trước toà nhà cổ ở Toronto.", "Red áo dài and the Vietnamese flag before a heritage building in Toronto."),
            P(133, "Thẻ giới thiệu trên Mạng lưới dạy tiếng Việt và văn hóa Việt toàn cầu.", "Introduction card from the global network teaching Vietnamese language and culture."),
            P(62, "Tại Hanson College, Toronto.", "At Hanson College, Toronto."),
            P(105, "Trước biển chữ HANSON.", "In front of the HANSON sign."),
            P(118, "Tách cà phê Hanson trên đường đi dạy.", "A Hanson mug on the way to teach."),
            P(235, "Toà nhà phủ cây xanh ở Toronto.", "An ivy-covered building in Toronto."),
            P(224, "Ngày tuyết đầu tiên ở Canada.", "A snowy day in Canada.")] },

      { id: "ket", yr: "2026", h: T("Khép lại: Busy with purpose", "Closing: Busy with purpose"),
        p: [T("Gần mười năm, những thứ tôi làm thay đổi hình thức nhưng không đổi câu hỏi đầu tiên: làm sao để học và dạy thật vui, thật có ích. Cảm ơn những đứa trẻ, những giáo viên và những người bạn đã cùng tôi bận rộn có chủ đích.",
               "Over nearly ten years what I do has changed shape, but the first question has not: how can learning and teaching be joyful and useful? Thank you to the children, the teachers and the friends who were busy with purpose alongside me.")],
        q: T("Busy with purpose.", "Busy with purpose."),
        m: [V(18, "Hát với đàn ukulele cho học trò.", "Singing with a ukulele for my students.")] }
    ];
  }
  var GAL_FLAT = [];
  function mediaGrid(items) {
    return '<div class="gal">' + items.map(function (it) {
      if (it.vid) return '<figure class="photo vid"><video controls preload="none" playsinline poster="' + esc((CFG.base || "") + it.poster) + '" aria-label="' + esc(it.alt) + '"><source src="' + esc((CFG.base || "") + it.vid) + '" type="video/mp4"></video><figcaption>▶ ' + esc(it.cap) + '</figcaption></figure>';
      var i = GAL_FLAT.push([it.img, it.alt, it.cap]) - 1;
      return '<figure class="photo"><button type="button" class="gal-btn" data-gi="' + i + '" aria-label="' + esc((lang === "vi" ? "Phóng to ảnh: " : "Enlarge photo: ") + it.cap) + '"><img src="' + esc((CFG.base || "") + it.img) + '" alt="' + esc(it.alt) + '" loading="lazy" decoding="async"></button><figcaption>' + esc(it.cap) + '</figcaption></figure>';
    }).join("") + '</div>';
  }
  function galGrid(groups) {
    return groups.map(function (g) {
      return '<section class="gal-sec"><h3>' + esc(g.h) + '</h3><p class="msg" style="max-width:70ch">' + esc(g.p) + '</p>' + mediaGrid(g.items.map(function (x) { return { img: x[0], alt: x[1], cap: x[2] }; })) + '</section>';
    }).join("");
  }
  function JOURNEY(vi) {
    var A = JRN(vi), B = JRN2(vi), G = GAL(vi);
    function T(a, b) { return vi ? a : b; }
    function pa(id) { return A.filter(function (c) { return c.id === id; })[0]; }
    function pb(id) { return B.filter(function (c) { return c.id === id; })[0]; }
    var A0 = pa("mo-dau"), A1 = pa("chuong-1"), A2 = pa("chuong-2"), A3 = pa("chuong-3"), A4 = pa("chuong-4"), A5 = pa("chuong-5"), A6 = pa("chuong-6"), AK = pa("ket");
    var B0 = pb("mo-dau"), B1 = pb("chuong-1"), B2 = pb("chuong-2"), B3 = pb("chuong-3"), B4 = pb("chuong-4"), B5 = pb("chuong-5"), B6 = pb("chuong-6"), BK = pb("ket");
    function AV(n, v, e, c, ce) { return { vid: "vid/av" + n + ".mp4", poster: "vid/av" + n + ".jpg", alt: T(v, e), cap: T(c, ce) }; }
    function find(arr, img) { return arr.filter(function (x) { return x.img === img || x.vid === img; })[0]; }
    var j1crowns = find(A0.m, "img/j1-crowns.jpg"), v095 = find(A0.m, "vid/v095.mp4");
    return [
      { id: "bat-dau", yr: "2012 – 2015", tl: T("5/2015", "May 2015"), tt: T("Học TESOL tại Educap, những học trò đầu tiên", "TESOL at Educap and the first students"),
        h: T("Từ người mẹ đến cô giáo tiếng Anh", "From a mother to an English teacher"),
        p: [T("Tôi bắt đầu học tiếng Anh và giáo dục mầm non để chuẩn bị cho đứa con đầu lòng, rồi học giảng dạy tiếng Anh bài bản để dạy con. Sau đó là Montessori, các khóa bồi dưỡng về giáo dục đặc biệt để hiểu cách hỗ trợ trẻ, và mentoring, phát triển con người.",
              "I began studying English and early childhood education to prepare for my first child, then trained properly in English language teaching so I could teach him. Montessori followed, then courses in special education to understand how to support children, and mentoring and people development."),
            T("Tháng 5/2015, tôi bắt đầu học chương trình TESOL tại Educap. Cũng trong năm đó, tôi nhận những học trò đầu tiên của mình: chỉ 3–4 bạn nhỏ trong một lớp học rất nhỏ.",
              "In May 2015 I began the TESOL programme at Educap. That same year I took my first students: just three or four little ones in a very small class.")],
        q: A0.q, m: [] },
      { id: "thuong-hieu", yr: "2016 – 2019", tl: "2016", tt: T("Xây dựng thương hiệu Ms Trang Phan TESOL", "Building the Ms Trang Phan TESOL brand"),
        h: T("Ms Trang Phan TESOL: lớp học chia theo độ tuổi", "Ms Trang Phan TESOL: classes grouped by age"),
        p: [T("Năm 2016, tôi xây dựng thương hiệu mstrangphantesol với các lớp học chia theo độ tuổi. Đó là những năm có sinh nhật với 17 nhóc tì đội vương miện cô tự làm, trò trốn dưới gầm bàn, ban nhạc “Treeband” và những bức tranh học trò vẽ tặng cô ngày 20/11.",
              "In 2016 I built the mstrangphantesol brand with classes grouped by age. Those were the years of a birthday with 17 little ones in crowns I made myself, hide-and-seek under the desks, a “Treeband” and the pictures my students painted for me on Teachers' Day."),
            A1.p[1]],
        l: A1.l, q: A1.q, m: (j1crowns ? [j1crowns] : []).concat(A1.m) },
      { id: "lop-nguoi-lon", yr: T("Tháng 7 – 10/2016", "July – October 2016"), tl: "7/2016", tt: T("Khóa tiếng Anh cho người lớn (ATCC 2016)", "An English course for adults (ATCC 2016)"),
        h: T("Lớp tiếng Anh cho người lớn: học bằng làm, nói và diễn", "An adult English class: learning by doing, speaking and acting"),
        p: [T("Song song với các lớp trẻ em, tháng 7/2016 tôi dạy một khóa tiếng Anh cho người lớn gồm hai lớp (ATCC 2016). Khóa học do Educap đứng ra tổ chức, phối hợp cùng Trung tâm Điều hành bay. Lớp này là minh chứng rằng người lớn hoàn toàn có thể học bằng hoạt động: sau giờ làm việc căng thẳng, các anh chị được chơi, diễn và vận động để giảm căng thẳng (reduce stress after working hours), và chính nhờ vậy việc học hiệu quả hơn. Sau mỗi buổi tôi quay video các hoạt động và đăng lên nhóm học viên để cả lớp xem lại mình đã làm được gì: giới thiệu bản thân, thói quen hằng ngày, luyện phát âm bằng tongue twister, thuyết trình, nhập vai.",
              "Alongside the children's classes, in July 2016 I taught an English course for adults with two classes (ATCC 2016). The course was organised by Educap in cooperation with the Air Traffic Control Centre. This class is proof that adults can learn through activities: after a stressful working day, learners played, acted and moved around to reduce stress after working hours, and learned more effectively as a result. After each session I filmed the activities and posted them to the learners' group so everyone could look back at what they had done: introductions, daily routines, pronunciation practice with tongue twisters, presentations and role play."),
            T("Tôi nhắn lớp: “Các anh chị cứ nhiệt tình diễn thật sâu. Action rất quan trọng, và sẽ giúp mọi người nói tiếng Anh tự nhiên hơn.” Cuối tháng có bài kiểm tra bốn kỹ năng nghe, nói, đọc, viết để theo dõi sự tiến bộ, và một chương trình “ATCC’s got talent” để các nhóm thi đấu.",
              "I told the class: “Act it out with feeling. Action matters, and it helps you speak English more naturally.” At the end of the month there was a four-skills test (listening, speaking, reading, writing) to track progress, and an “ATCC’s got talent” show where the groups competed.")],
        l: T("Từ tháng 7 đến tháng 10/2016, tôi dạy hai lớp cùng Educap: giáo trình chính là International Express, cứ sau hai buổi lại có một bài kiểm tra ngắn để theo dõi tiến bộ, và từ vựng được học bằng bản đồ từ (mind map). Làm việc nhóm: ngồi thành vòng tròn để không ai bị khuất; chọn một người ghi chép; gác “cái tôi” sang bên và lắng nghe nhau; quan sát các nhóm khác trình bày để rút kinh nghiệm. Luyện phát âm: nghe mẫu, đọc từng từ, rồi mới tăng tốc.",
             "From July to October 2016 I taught two classes together with Educap: the main course book was International Express, a short test followed every two sessions to track progress, and vocabulary was learned through mind maps. Teamwork: sit in a circle so nobody is hidden; choose a note-taker; set egos aside and listen; watch other groups present to learn from them. Pronunciation: listen to a model, read word by word, then speed up."),
        q: T("Action rất quan trọng, và sẽ giúp mọi người nói tiếng Anh tự nhiên hơn.", "Action matters, and it helps you speak English more naturally."),
        g: [
          { h: T("Giới thiệu bản thân và daily routines","Introductions and daily routines"), items: [AV(3,"Introduce, daily routines","Introduce, daily routines","Introduce, daily routines","Introduce, daily routines")] },
          { h: T("Phát âm và luyện nghe","Pronunciation and listening"), items: [AV(4,"Học viên đọc tongue twister, mỗi người đọc trước lớp.","Learners read tongue twisters aloud one by one.","Tongue twister","Tongue twister"), AV(26,"Tongue twister: luyện líu lưỡi","Tongue twisters: warming up the tongue","Tongue twister: luyện líu lưỡi","Tongue twisters: warming up the tongue"), AV(5,"Trò chơi Chinese whisper: thì thầm câu truyền tai nhau để luyện nghe và phát hiện lỗi phát âm.","Chinese whispers: passing a sentence along to practise listening and spot pronunciation errors.","Chinese whisper","Chinese whispers"), AV(44,"Cup phone: điện thoại cốc giấy","The cup phone","Cup phone: điện thoại cốc giấy","The cup phone"), AV(54,"Tăng phản xạ nghe","Boosting listening reflexes","Tăng phản xạ nghe","Boosting listening reflexes"), AV(58,"Nghe lại và viết ra lời nhắn của nhóm (1)","Listening back and writing down a group's message (1)","Nghe lại và viết ra lời nhắn của nhóm (1)","Listening back and writing down a group's message (1)")] },
          { h: T("Khởi động, bonding và trò chơi vận động","Warm-ups, bonding and movement games"), items: [AV(9,"Trò khởi động “Who can make me smile?”: một bạn cố làm bạn đối diện cười.","The warm-up “Who can make me smile?”: one learner tries to make a partner laugh.","Who can make me smile?","Who can make me smile?"), AV(29,"Trò chơi đổi ghế (change your chair)","The change-your-chair game","Trò chơi đổi ghế (change your chair)","The change-your-chair game"), AV(31,"Trò chơi luyện chia động từ cho ngôi thứ nhất và thứ ba","A game to practise verbs for 1st and 3rd person","Trò chơi luyện chia động từ cho ngôi thứ nhất và thứ ba","A game to practise verbs for 1st and 3rd person"), AV(56,"4 corners","4 corners","4 corners","4 corners"), AV(40,"Một khoảnh khắc vui trong lớp","A fun moment in class","Một khoảnh khắc vui trong lớp","A fun moment in class"), AV(41,"Mystery objects: luyện nói, miêu tả đồ vật","Mystery objects: practising speaking and describing things","Mystery objects: luyện nói, miêu tả đồ vật","Mystery objects: practising speaking and describing things"), AV(16,"Trò chơi đoán nghề nghiệp “What’s your job?”: mỗi nhóm diễn tả một nghề.","The guessing game “What’s your job?”: each group mimes an occupation.","What’s your job?","What’s your job?"), AV(45,"Act to describe sentence: diễn tả để cả lớp đoán câu","Act to describe a sentence","Act to describe sentence: diễn tả để cả lớp đoán câu","Act to describe a sentence"), AV(46,"Miss word: nhập vai tìm từ còn thiếu","Miss word role play","Miss word: nhập vai tìm từ còn thiếu","Miss word role play"), AV(73,"Bonding warm-up để reduce stress và gắn kết trước khi làm bài kiểm tra cuối kỳ","A bonding warm-up to reduce stress and bring the class together before the final test","Bonding warm-up để reduce stress và gắn kết trước khi làm bài kiểm tra cuối kỳ","A bonding warm-up to reduce stress and bring the class together before the final test"), AV(64,"Hoạt động cả lớp cùng vận động (31/8)","A whole-class movement activity (31 Aug)","Hoạt động cả lớp cùng vận động (31/8)","A whole-class movement activity (31 Aug)")] },
          { h: T("Nhập vai theo tình huống","Role play in situations"), items: [AV(8,"Nhóm nhập vai cạnh bàn giáo viên, màn hình chiếu phía sau.","A role-play group beside the teacher's table with a projected screen behind.","Role play: Chicken dance","Role play: Chicken dance"), AV(12,"Hai học viên cầm kịch bản đứng nhập vai trước lớp.","Two learners hold scripts and act out a scene before the class.","Role play: nhập vai","Role play"), AV(13,"Học viên để lại lời nhắn trên điện thoại theo tình huống “Leave your message after the beep”.","A learner leaves a phone message in the scenario “Leave your message after the beep”.","Leave your message after the beep","Leave your message after the beep"), AV(23,"Nhóm 3 nhập vai trong tình huống “good job”.","Group 3 acts out a “good job” situation.","Role play: nhóm 3","Role play: group 3"), AV(24,"Hai cặp học viên nhập vai tình huống lần đầu gặp nhau.","Two pairs act out a first-meeting situation.","Role play: First meeting","Role play: First meeting"), AV(36,"Role play: nhóm 2","Role play: group 2","Role play: nhóm 2","Role play: group 2"), AV(38,"Role play: nhóm 4 (1)","Role play: group 4 (1)","Role play: nhóm 4 (1)","Role play: group 4 (1)"), AV(48,"Offers and requests: luyện đề nghị và yêu cầu (1)","Offers and requests practice (1)","Offers and requests: luyện đề nghị và yêu cầu (1)","Offers and requests practice (1)"), AV(60,"Buổi kiểm tra nhập vai (16/8)","The role-play test (16 Aug)","Buổi kiểm tra nhập vai (16/8)","The role-play test (16 Aug)"), AV(67,"Role play theo nhóm","Group role play","Role play theo nhóm","Group role play")] },
          { h: T("Thuyết trình và làm việc nhóm","Presentations and teamwork"), items: [AV(6,"Nhóm học viên thuyết trình trước lớp ngồi thành vòng tròn.","A group presents in front of a class seated in a circle.","Thuyết trình (phần 1)","Presentation (part 1)"), AV(7,"Nhóm khác thuyết trình, cả lớp ngồi quanh lắng nghe.","Another group presents while the class listens.","Thuyết trình (phần 2)","Presentation (part 2)"), AV(14,"Các nhóm ngồi thành vòng tròn thảo luận và ghi chép.","Groups sit in circles to discuss and take notes.","Teamwork","Teamwork"), AV(74,"Thuyết trình dự án: nhóm 1","Project presentation: group 1","Thuyết trình dự án: nhóm 1","Project presentation: group 1"), AV(76,"Một học viên thuyết trình","A learner presents","Một học viên thuyết trình","A learner presents")] },
          { h: T("“ATCC’s got talent”","“ATCC’s got talent”"), items: [AV(17,"Nhóm 3 biểu diễn trong chương trình “ATCC’s got talent”.","Group 3 performs in “ATCC’s got talent”.","Group 3: ATCC’s got talent","Group 3: ATCC’s got talent"), AV(18,"Hội trường với màn chiếu “ATCC’s got talent”, các nhóm trả lời câu hỏi quiz.","A hall with the “ATCC’s got talent” screen as groups answer quiz questions.","Questions quiz","Questions quiz"), AV(19,"Ba học viên đứng biểu diễn trước màn chiếu.","Three learners perform in front of the screen.","ATCC’s got talent","ATCC’s got talent"), AV(20,"Nhóm học viên áo hồng và áo xanh biểu diễn trước màn chiếu.","A group in pink and green performs in front of the screen.","ATCC’s got talent","ATCC’s got talent"), AV(51,"“ATCC’s got talent”: các nhóm biểu diễn (1)","“ATCC’s got talent”: groups perform (1)","“ATCC’s got talent”: các nhóm biểu diễn (1)","“ATCC’s got talent”: groups perform (1)"), AV(52,"“ATCC’s got talent” (2)","“ATCC’s got talent” (2)","“ATCC’s got talent” (2)","“ATCC’s got talent” (2)")] },
          { h: T("Buổi cuối khóa: mini contest, nhập vai và flash mob (3–5/10)","The last session: mini contest, role play and flash mob (3–5 Oct)"), items: [AV(78,"Video “My love” của lớp (3/10)","The class’s “My love” video (3 Oct)","Video “My love” của lớp (3/10)","The class’s “My love” video (3 Oct)"), AV(79,"Mini contest buổi cuối (4/10)","The mini contest of the last session (4 Oct)","Mini contest buổi cuối (4/10)","The mini contest of the last session (4 Oct)"), AV(80,"Nhập vai theo một tình huống bất ngờ","Role play in a surprise situation","Nhập vai theo một tình huống bất ngờ","Role play in a surprise situation"), AV(81,"Hoạt động buổi cuối (5/10)","A last-day activity (5 Oct)","Hoạt động buổi cuối (5/10)","A last-day activity (5 Oct)"), AV(82,"Flash mob của cả lớp (5/10)","The class flash mob (5 Oct)","Flash mob của cả lớp (5/10)","The class flash mob (5 Oct)"), AV(63,"Flashmob nhóm 2","Flash mob: group 2","Flashmob nhóm 2","Flash mob: group 2")] },
          { h: T("Ảnh lớp học và làm việc nhóm","Class photos and group work"), items: [{ img: "img/atcc2-1.jpg", alt: T("Cả lớp đứng chụp ảnh chung trong phòng học.","The whole class poses in the classroom."), cap: T("Cả lớp đứng chụp ảnh chung trong phòng học.","The whole class poses in the classroom.") }, { img: "img/atcc2-2.jpg", alt: T("Học viên làm việc theo cặp.","Learners working in pairs."), cap: T("Học viên làm việc theo cặp.","Learners working in pairs.") }, { img: "img/atcc2-3.jpg", alt: T("Buổi học đầu khóa trong phòng họp.","An early session in a meeting room."), cap: T("Buổi học đầu khóa trong phòng họp.","An early session in a meeting room.") }, { img: "img/atcc2-4.jpg", alt: T("Học viên ghi chép trong buổi học.","Learners taking notes."), cap: T("Học viên ghi chép trong buổi học.","Learners taking notes.") }, { img: "img/atcc2-5.jpg", alt: T("Học viên làm bài theo nhóm.","Learners working in groups."), cap: T("Học viên làm bài theo nhóm.","Learners working in groups.") }, { img: "img/atcc2-6.jpg", alt: T("Làm việc nhóm quanh bàn.","Groupwork around a table."), cap: T("Làm việc nhóm quanh bàn.","Groupwork around a table.") }, { img: "img/atcc2-7.jpg", alt: T("Các nhóm thảo luận.","Groups discussing."), cap: T("Các nhóm thảo luận.","Groups discussing.") }, { img: "img/atcc2-8.jpg", alt: T("Nhóm thảo luận và ghi chép.","A group discussing and writing."), cap: T("Nhóm thảo luận và ghi chép.","A group discussing and writing.") }, { img: "img/atcc2-10.jpg", alt: T("Lớp xếp bàn để làm việc nhóm.","The room set up for groupwork."), cap: T("Lớp xếp bàn để làm việc nhóm.","The room set up for groupwork.") }] },
          { h: T("Học bằng cơ thể, bản đồ từ vựng và ngữ pháp","Learning with the body, vocabulary maps and grammar"), items: [{ img: "img/atcc2-11.jpg", alt: T("Các nhóm xếp chữ bằng cơ thể trên sàn.","Groups forming letters with their bodies on the floor."), cap: T("Các nhóm xếp chữ bằng cơ thể trên sàn.","Groups forming letters with their bodies on the floor.") }, { img: "img/atcc2-12.jpg", alt: T("Xếp chữ bằng cơ thể (2).","Forming letters with their bodies (2)."), cap: T("Xếp chữ bằng cơ thể (2).","Forming letters with their bodies (2).") }, { img: "img/atcc2-16.jpg", alt: T("Trò chơi cup phone với dây ruy băng (1).","The cup-phone game with ribbons (1)."), cap: T("Trò chơi cup phone với dây ruy băng (1).","The cup-phone game with ribbons (1).") }, { img: "img/atcc2-17.jpg", alt: T("Trò chơi cup phone (2).","The cup-phone game (2)."), cap: T("Trò chơi cup phone (2).","The cup-phone game (2).") }] },
          { h: T("Những khoảnh khắc vui bên lớp","Fun moments with the class"), items: [{ img: "img/atcc2-24.jpg", alt: T("Cả lớp chụp selfie vui nhộn.","A fun class selfie."), cap: T("Cả lớp chụp selfie vui nhộn.","A fun class selfie.") }, { img: "img/atcc2-25.jpg", alt: T("Selfie nhóm cuối khóa.","A group selfie at the end of the course."), cap: T("Selfie nhóm cuối khóa.","A group selfie at the end of the course.") }, { img: "img/atcc2-34.jpg", alt: T("Cả lớp chụp ảnh Trung thu với băng đô và đèn lồng giấy tự mang.","The class at the Mid-Autumn party with headbands and paper lanterns."), cap: T("Cả lớp chụp ảnh Trung thu với băng đô và đèn lồng giấy tự mang.","The class at the Mid-Autumn party with headbands and paper lanterns.") }, { img: "img/atcc2-36.jpg", alt: T("Mọi người cùng chọn bánh Trung thu.","Everyone choosing mooncakes."), cap: T("Mọi người cùng chọn bánh Trung thu.","Everyone choosing mooncakes.") }, { img: "img/atcc2-37.jpg", alt: T("Học viên đội mũ giấy truyền thống, thưởng thức bánh Trung thu.","Learners in paper hats enjoying mooncakes."), cap: T("Học viên đội mũ giấy truyền thống, thưởng thức bánh Trung thu.","Learners in paper hats enjoying mooncakes.") }] },
          { h: T("Tiết học chủ đề “Celebration” (5/8)","Lesson on the theme “Celebration” (5 Aug)"), items: [{ img: "img/atcc2-26.jpg", alt: T("Học viên đội mũ tiệc trước màn chiếu của tiết học chủ đề “Celebration”.","Learners in party hats in front of the slide for the “Celebration” lesson."), cap: T("Học viên đội mũ tiệc trước màn chiếu của tiết học chủ đề “Celebration”.","Learners in party hats in front of the slide for the “Celebration” lesson.") }, { img: "img/atcc2-29.jpg", alt: T("Các nhóm tự trang trí bánh trong hoạt động của tiết “Celebration”: mỗi nhóm một kiểu.","Each group decorated its own cake in the “Celebration” lesson."), cap: T("Các nhóm tự trang trí bánh trong hoạt động của tiết “Celebration”: mỗi nhóm một kiểu.","Each group decorated its own cake in the “Celebration” lesson.") }, { img: "img/atcc2-31.jpg", alt: T("Các nhóm quây quanh bàn làm bánh trong tiết “Celebration”.","Groups around the table making cakes in the “Celebration” lesson."), cap: T("Các nhóm quây quanh bàn làm bánh trong tiết “Celebration”.","Groups around the table making cakes in the “Celebration” lesson.") }, AV(69,"Trò chơi trong tiết học chủ đề “Celebration”","A game in the “Celebration” lesson","Trò chơi trong tiết học chủ đề “Celebration”","A game in the “Celebration” lesson")] }
        ] },
      { id: "lop-tree", yr: T("Tháng 7/2017 – 10/2020","July 2017 – October 2020"), tl: "7/2017", tt: T("Lớp TREE: từ trẻ nhỏ đến tuổi teen (2017–2020)","The TREE class: from young children to teens (2017–2020)"),
        h: T("Lớp TREE: ba năm đồng hành cùng một nhóm học trò","The TREE class: three years alongside one group of students"),
        p: [T("Từ tháng 7/2017 đến tháng 10/2020, tôi dạy lớp TREE vào tối thứ Tư và thứ Sáu (19h30–21h). Các bạn bước vào lớp khi còn là những đứa trẻ khoảng 10 tuổi và cùng tôi đi qua nhiều giai đoạn: học theo chủ đề bằng hoạt động, ngoại khóa, dự án, thuyết trình, ôn thi Movers, Flyer rồi lộ trình IELTS. Sau mỗi buổi tôi gửi lên nhóm phụ huynh hình ảnh, video và nội dung bài học để gia đình theo dõi con tiến bộ.",
              "From July 2017 to October 2020 I taught the TREE class on Wednesday and Friday evenings (7:30–9:00 pm). The students joined as children of about ten and went with me through many stages: learning by theme through activities, extracurricular days, projects, presentations, Movers and Flyers exam preparation, and then an IELTS pathway. After each session I posted photos, videos and the lesson content to the parents’ group so families could follow their children’s progress."),
            T("Đây là một lớp tôi tự hào: nhiều học trò của lớp hiện đang du học tại Canada và Úc, hoặc học tại Đại học Bách khoa, Đại học Hà Nội và Đại học Mỏ – Địa chất. Dưới đây là những tư liệu của lớp, được bổ sung dần theo từng giai đoạn.",
              "It is a class I am proud of: many of its students are now studying abroad in Canada and Australia, or at Hanoi University of Science and Technology, Hanoi University and Hanoi University of Mining and Geology. Below are the class’s materials, added stage by stage.")],
        m: [{ img: "img/tree-2.jpg", alt: T("Sơ đồ tư duy “My daily routine” do một học sinh vẽ: nhân vật ở giữa, các mũi tên tỏa ra những khung tranh có đồng hồ.","A “My daily routine” mind map drawn by a student: a figure in the middle with arrows leading to framed pictures that each have a clock."), cap: T("Sơ đồ tư duy về daily routine của một học sinh lớp TREE (26/7/2017)","A TREE student’s mind map about daily routines (26 Jul 2017)") }],
        g: [
          { h: T("Buổi học 26/7/2017: daily routine và sơ đồ tư duy","Lesson of 26 July 2017: daily routines and mind maps"), items: [{ img: "img/tree-1.jpg", alt: T("Sơ đồ tư duy về daily routine vẽ bằng bút màu: nhân vật ở giữa, các mũi tên dẫn đến các hoạt động như đánh răng, ngủ dậy, bơi.","A colourful daily-routine mind map: a figure in the middle with arrows to activities such as brushing teeth, waking up and swimming."), cap: T("Chủ đề daily routine: mỗi bạn vẽ một sơ đồ tư duy để trình bày","Topic: daily routines. Each student drew a mind map to present") }, { img: "img/tree-2.jpg", alt: T("Sơ đồ tư duy “My daily routine” với các khung tranh và đồng hồ.","A “My daily routine” mind map with framed pictures and clocks."), cap: T("Sơ đồ tư duy “My daily routine”","A “My daily routine” mind map") }, AV(83,"Một bạn giơ sơ đồ tư duy lên để trình bày trước lớp (1)","A student holds up a mind map to present to the class (1)","Một bạn giơ sơ đồ tư duy lên để trình bày trước lớp (1)","A student holds up a mind map to present to the class (1)"), AV(84,"Cả lớp ngồi quanh bàn nghe bạn trình bày sơ đồ tư duy (2)","The class listens to a mind-map presentation around the desks (2)","Cả lớp ngồi quanh bàn nghe bạn trình bày sơ đồ tư duy (2)","The class listens to a mind-map presentation around the desks (2)"), AV(85,"Một bạn trình bày bài vẽ về thói quen hằng ngày (3)","A student presents a drawing about daily routines (3)","Một bạn trình bày bài vẽ về thói quen hằng ngày (3)","A student presents a drawing about daily routines (3)"), AV(86,"Học sinh ngồi tại bàn, chuẩn bị trình bày (4)","Students at their desks getting ready to present (4)","Học sinh ngồi tại bàn, chuẩn bị trình bày (4)","Students at their desks getting ready to present (4)")] },
          { h: T("Bài kiểm tra nói bất ngờ (26/7/2017)","A surprise speaking test (26 Jul 2017)"), items: [AV(87,"Bài kiểm tra nói (không hề được chuẩn bị): học sinh thứ nhất","Speaking test (no preparation at all): first student","Bài kiểm tra nói (không hề được chuẩn bị): học sinh thứ nhất","Speaking test (no preparation at all): first student"), AV(88,"Bài kiểm tra nói: học sinh thứ hai","Speaking test: second student","Bài kiểm tra nói: học sinh thứ hai","Speaking test: second student"), AV(89,"Bài kiểm tra nói: học sinh thứ ba","Speaking test: third student","Bài kiểm tra nói: học sinh thứ ba","Speaking test: third student")] },
          { h: T("Tháng 8/2017: buổi biểu diễn và ảnh lưu niệm (3–9/8)","August 2017: a performance and a souvenir photo (3–9 Aug)"), items: [AV(90,"Một khoảnh khắc vui trong lớp (3/8)","A fun moment in class (3 Aug)","Một khoảnh khắc vui trong lớp (3/8)","A fun moment in class (3 Aug)"), AV(91,"Buổi biểu diễn của lớp: “ca sĩ còn ái ngại lắm” (9/8)","A class performance: the “singer” is still a little shy (9 Aug)","Buổi biểu diễn của lớp: “ca sĩ còn ái ngại lắm” (9/8)","A class performance: the “singer” is still a little shy (9 Aug)"), AV(92,"Buổi biểu diễn của lớp, phần 2 (9/8)","The class performance, part 2 (9 Aug)","Buổi biểu diễn của lớp, phần 2 (9/8)","The class performance, part 2 (9 Aug)"), { img: "img/tree-3.jpg", alt: T("Bốn học sinh đứng trước bảng trắng, hai bạn cầm bức tranh dải ngân hà, một bạn cầm micro, một bạn giơ ngón cái.","Four students stand in front of a whiteboard; two hold a picture of a galaxy, one holds a microphone and one gives a thumbs-up."), cap: T("Chụp ảnh lưu niệm với “ban tổ chức” (9/8/2017)","A souvenir photo with the “organising committee” (9 Aug 2017)") }] },
          { h: T("Thi đua tích sao và ghép từ nối câu (10–16/8/2017)","Collecting stars and joining words into sentences (10–16 Aug 2017)"), items: [{ img: "img/tree-4.jpg", alt: T("Bìa cuốn sách Usborne “Peep inside Space” có dòng chữ “Only 50 stars to get this”.","The cover of the Usborne book “Peep inside Space” with the words “Only 50 stars to get this”."), cap: T("Phần thưởng cho bạn nào đủ 50 sao trong tháng 8: một cuốn sách (10/8)","The prize for reaching 50 stars in August: a book (10 Aug)") }, { img: "img/tree-5.jpg", alt: T("Hai học sinh ngồi trên sàn cạnh dải thẻ ghép hình có các từ như cat, run, can, play.","Two students sit on the floor beside a row of jigsaw word cards such as cat, run, can and play."), cap: T("Hoạt động ghép từ nối câu (16/8)","A word-joining sentence activity (16 Aug)") }, { img: "img/tree-6.jpg", alt: T("Hai học sinh ngồi cạnh một dải thẻ từ ghép hình dài trên sàn.","Two students beside a long jigsaw strip of word cards on the floor."), cap: T("Ghép thẻ từ thành một câu thật dài (16/8)","Joining word cards into a very long sentence (16 Aug)") }, AV(93,"Nhập vai giáo viên – học sinh để tìm hiểu về khủng long (16/8)","Teacher–student role play to learn about dinosaurs (16 Aug)","Nhập vai giáo viên – học sinh để tìm hiểu về khủng long (16/8)","Teacher–student role play to learn about dinosaurs (16 Aug)")] },
          { h: T("Kể lại ngày ngoại khóa bằng thì quá khứ (23/8/2017)","Retelling the field trip in the past tense (23 Aug 2017)"), items: [{ img: "img/tree-7.jpg", alt: T("Hai con khủng long bằng đá cạnh lối đi trong công viên, vài người đứng trên bờ tường nhìn ra xa.","Two stone dinosaur statues beside a park path, with a few people on a wall looking out."), cap: T("Ngày ngoại khóa ở công viên khủng long","The field-trip day at a dinosaur park") }, AV(94,"Các bạn ngồi trên ghế sofa kể lại ngày ngoại khóa bằng thì quá khứ (1)","Students on a sofa retell the field trip in the past tense (1)","Các bạn ngồi trên ghế sofa kể lại ngày ngoại khóa bằng thì quá khứ (1)","Students on a sofa retell the field trip in the past tense (1)"), AV(95,"Kể lại ngày ngoại khóa bằng thì quá khứ (2)","Retelling the field trip in the past tense (2)","Kể lại ngày ngoại khóa bằng thì quá khứ (2)","Retelling the field trip in the past tense (2)"), AV(96,"Kể lại ngày ngoại khóa bằng thì quá khứ (3)","Retelling the field trip in the past tense (3)","Kể lại ngày ngoại khóa bằng thì quá khứ (3)","Retelling the field trip in the past tense (3)")] },
          { h: T("Đóng vai nhân vật và kể lại truyện (27/9/2017)","Playing characters and retelling a story (27 Sep 2017)"), items: [AV(97,"Đóng vai nhân vật, kể lại truyện (1)","Playing characters and retelling a story (1)","Đóng vai nhân vật, kể lại truyện (1)","Playing characters and retelling a story (1)"), AV(98,"Đóng vai nhân vật, kể lại truyện (2)","Playing characters and retelling a story (2)","Đóng vai nhân vật, kể lại truyện (2)","Playing characters and retelling a story (2)")] },
          { h: T("Tháng 10/2017: từ vựng Halloween và học hát (24–25/10)","October 2017: Halloween vocabulary and learning a song (24–25 Oct)"), items: [AV(99,"Ôn từ vựng của hai buổi đã học để chuẩn bị cho lễ hóa trang Halloween (24/10)","Reviewing vocabulary from two sessions to prepare for the Halloween costume party (24 Oct)","Ôn từ vựng của hai buổi đã học để chuẩn bị cho lễ hóa trang Halloween (24/10)","Reviewing vocabulary from two sessions to prepare for the Halloween costume party (24 Oct)"), AV(100,"Cả nhóm hát theo bài hát, thuộc lời và phát âm đúng, không cần chép lời (25/10)","The group sings along, knowing the words and pronouncing them correctly without copying the lyrics (25 Oct)","Cả nhóm hát theo bài hát, thuộc lời và phát âm đúng, không cần chép lời (25/10)","The group sings along, knowing the words and pronouncing them correctly without copying the lyrics (25 Oct)"), AV(101,"Các bạn hát và biểu cảm theo giai điệu (25/10)","The students sing and act out the melody (25 Oct)","Các bạn hát và biểu cảm theo giai điệu (25/10)","The students sing and act out the melody (25 Oct)")] },
          { h: T("Đi dạo hỏi chuyện người nước ngoài ở khu hồ Hoàn Kiếm (29/10/2017)","Out and about: talking with foreign visitors around Hoan Kiem Lake (29 Oct 2017)"), items: [{ img: "img/tree-8.jpg", alt: T("Một vị khách nước ngoài nói chuyện với nhóm học sinh trên phố đi bộ.","A foreign visitor talks with a group of students on a pedestrian street."), cap: T("Một vị khách nước ngoài nói chuyện với nhóm học sinh trên phố đi bộ.","A foreign visitor talks with a group of students on a pedestrian street.") }, { img: "img/tree-9.jpg", alt: T("Hai học sinh đứng cạnh một vị khách nước ngoài cầm bản đồ bên hồ.","Two students stand beside a foreign visitor holding a map by the lake."), cap: T("Hai học sinh đứng cạnh một vị khách nước ngoài cầm bản đồ bên hồ.","Two students stand beside a foreign visitor holding a map by the lake.") }, { img: "img/tree-10.jpg", alt: T("Một vị khách nữ trò chuyện với học sinh cầm sổ ghi chép.","A visitor talks with students holding notebooks."), cap: T("Một vị khách nữ trò chuyện với học sinh cầm sổ ghi chép.","A visitor talks with students holding notebooks.") }, { img: "img/tree-11.jpg", alt: T("Học sinh trao đổi với một cô khách nước ngoài trên vỉa hè.","Students chat with a foreign visitor on the pavement."), cap: T("Học sinh trao đổi với một cô khách nước ngoài trên vỉa hè.","Students chat with a foreign visitor on the pavement.") }, { img: "img/tree-12.jpg", alt: T("Chụp ảnh lưu niệm cùng một vị khách nước ngoài bên hồ.","A souvenir photo with a foreign visitor by the lake."), cap: T("Chụp ảnh lưu niệm cùng một vị khách nước ngoài bên hồ.","A souvenir photo with a foreign visitor by the lake.") }, { img: "img/tree-13.jpg", alt: T("Học sinh hỏi chuyện hai vị khách nước ngoài, tay cầm sổ ghi chép.","Students interview two foreign visitors, notebooks in hand."), cap: T("Học sinh hỏi chuyện hai vị khách nước ngoài, tay cầm sổ ghi chép.","Students interview two foreign visitors, notebooks in hand.") }, { img: "img/tree-14.jpg", alt: T("Học sinh trò chuyện với hai bạn nhỏ nước ngoài.","Students talk with two young foreign visitors."), cap: T("Học sinh trò chuyện với hai bạn nhỏ nước ngoài.","Students talk with two young foreign visitors.") }, { img: "img/tree-15.jpg", alt: T("Ảnh chụp chung với các bạn nhỏ nước ngoài.","A group photo with young foreign visitors."), cap: T("Ảnh chụp chung với các bạn nhỏ nước ngoài.","A group photo with young foreign visitors.") }, { img: "img/tree-16.jpg", alt: T("Một bạn học sinh hỏi chuyện một vị khách rồi ghi lại câu trả lời.","A student asks a visitor questions and writes down the answers."), cap: T("Một bạn học sinh hỏi chuyện một vị khách rồi ghi lại câu trả lời.","A student asks a visitor questions and writes down the answers.") }, { img: "img/tree-17.jpg", alt: T("Học sinh ghi chép khi nói chuyện với một cặp khách nước ngoài.","Students take notes while talking to a pair of foreign visitors."), cap: T("Học sinh ghi chép khi nói chuyện với một cặp khách nước ngoài.","Students take notes while talking to a pair of foreign visitors.") }, { img: "img/tree-18.jpg", alt: T("Học sinh bắt chuyện với một du khách bên hồ.","Students strike up a conversation with a tourist by the lake."), cap: T("Học sinh bắt chuyện với một du khách bên hồ.","Students strike up a conversation with a tourist by the lake.") }, { img: "img/tree-19.jpg", alt: T("Học sinh hỏi chuyện một cô khách nước ngoài, ghi chép vào sổ.","Students ask a visitor questions and note down the answers."), cap: T("Học sinh hỏi chuyện một cô khách nước ngoài, ghi chép vào sổ.","Students ask a visitor questions and note down the answers.") }, { img: "img/tree-20.jpg", alt: T("Ảnh chụp chung với một cô khách nước ngoài thân thiện.","A photo with a friendly foreign visitor."), cap: T("Ảnh chụp chung với một cô khách nước ngoài thân thiện.","A photo with a friendly foreign visitor.") }, { img: "img/tree-21.jpg", alt: T("Một bạn học sinh ghi chép khi cô khách nước ngoài trả lời.","A student writes as a visitor answers."), cap: T("Một bạn học sinh ghi chép khi cô khách nước ngoài trả lời.","A student writes as a visitor answers.") }] },
          { h: T("Ghép câu so sánh hơn và miêu tả tranh (13/11/2017)","Comparatives: building sentences and describing pictures (13 Nov 2017)"), items: [{ img: "img/tree-22.jpg", alt: T("Học sinh nằm và ngồi quanh tấm thảm xốp làm bài tập so sánh (comparatives).","Students lying and sitting around a foam mat doing a comparatives exercise."), cap: T("Học sinh nằm và ngồi quanh tấm thảm xốp làm bài tập so sánh (comparatives).","Students lying and sitting around a foam mat doing a comparatives exercise.") }, { img: "img/tree-23.jpg", alt: T("Các bạn cùng xếp các mảnh giấy thành câu hoàn chỉnh (1).","Students arrange paper strips into complete sentences (1)."), cap: T("Các bạn cùng xếp các mảnh giấy thành câu hoàn chỉnh (1).","Students arrange paper strips into complete sentences (1).") }, { img: "img/tree-24.jpg", alt: T("Các bạn cùng xếp các mảnh giấy thành câu hoàn chỉnh (2).","Students arrange paper strips into complete sentences (2)."), cap: T("Các bạn cùng xếp các mảnh giấy thành câu hoàn chỉnh (2).","Students arrange paper strips into complete sentences (2).") }, { img: "img/tree-25.jpg", alt: T("Các bạn cùng ghép câu so sánh (3).","Students join comparative sentences together (3)."), cap: T("Các bạn cùng ghép câu so sánh (3).","Students join comparative sentences together (3).") }, { img: "img/tree-26.jpg", alt: T("Các bạn cùng ghép câu so sánh (4).","Students join comparative sentences together (4)."), cap: T("Các bạn cùng ghép câu so sánh (4).","Students join comparative sentences together (4).") }, AV(102,"Học sinh miêu tả tranh (1)","Students describe pictures (1)","Học sinh miêu tả tranh (1)","Students describe pictures (1)"), AV(103,"Học sinh miêu tả tranh (2)","Students describe pictures (2)","Học sinh miêu tả tranh (2)","Students describe pictures (2)"), AV(104,"Học sinh miêu tả tranh (3)","Students describe pictures (3)","Học sinh miêu tả tranh (3)","Students describe pictures (3)"), AV(105,"Học sinh miêu tả tranh (4)","Students describe pictures (4)","Học sinh miêu tả tranh (4)","Students describe pictures (4)"), AV(106,"Học sinh miêu tả tranh (5)","Students describe pictures (5)","Học sinh miêu tả tranh (5)","Students describe pictures (5)")] },
          { h: T("Giáng sinh cùng lớp (17/12/2017)","Christmas with the class (17 Dec 2017)"), items: [{ img: "img/tree-27.jpg", alt: T("Ba bạn ngồi trên ghế sofa ở góc trang trí Giáng sinh.","Three students sit on a sofa in a Christmas decoration corner."), cap: T("Ba bạn ngồi trên ghế sofa ở góc trang trí Giáng sinh.","Three students sit on a sofa in a Christmas decoration corner.") }, { img: "img/tree-28.jpg", alt: T("Ba bạn chụp ảnh ở góc Giáng sinh với cây thông và người tuyết.","Three students pose in a Christmas corner with a tree and a snowman."), cap: T("Ba bạn chụp ảnh ở góc Giáng sinh với cây thông và người tuyết.","Three students pose in a Christmas corner with a tree and a snowman.") }, { img: "img/tree-29.jpg", alt: T("Hai bạn tự chụp ảnh ở khu chợ Giáng sinh.","Two students take a selfie at the Christmas market."), cap: T("Hai bạn tự chụp ảnh ở khu chợ Giáng sinh.","Two students take a selfie at the Christmas market.") }, { img: "img/tree-30.jpg", alt: T("Một bạn đội băng đô Giáng sinh.","A student wearing a Christmas headband."), cap: T("Một bạn đội băng đô Giáng sinh.","A student wearing a Christmas headband.") }, { img: "img/tree-31.jpg", alt: T("Ba bạn cầm cốc nước trước các gian hàng Giáng sinh.","Three students with drinks in front of Christmas stalls."), cap: T("Ba bạn cầm cốc nước trước các gian hàng Giáng sinh.","Three students with drinks in front of Christmas stalls.") }] },
          { h: T("Làm spring roll: học từ vựng bằng cách nấu (26/5/2018)","Making spring rolls: learning vocabulary by cooking (26 May 2018)"), items: [{ img: "img/tree-32.jpg", alt: T("Những cuốn spring roll tự làm xếp trên đĩa, nhân trứng, cà rốt, rong biển và xúc xích.","Home-made spring rolls on a plate, filled with egg, carrot, seaweed and sausage."), cap: T("Thành phẩm: spring roll các bạn tự cuốn","The finished spring rolls the students made") }, { img: "img/tree-33.jpg", alt: T("Những cuốn spring roll có rong biển trên đĩa trắng.","Spring rolls with seaweed on a white plate."), cap: T("Spring roll nhân rong biển","Spring rolls with seaweed") }, { img: "img/tree-34.jpg", alt: T("Bản vẽ sơ đồ nguyên liệu spring roll: ingredients, preparation, sauce và completed.","A drawn diagram of spring roll ingredients, preparation, sauce and the completed roll."), cap: T("Sơ đồ “Spring roll” do học sinh vẽ: nguyên liệu, dụng cụ, nước chấm, thành phẩm","A student’s “Spring roll” diagram: ingredients, tools, sauces and the finished roll") }, { img: "img/tree-35.jpg", alt: T("Bảng nguyên liệu vẽ màu có các từ eggs, onion, salmon, mushrooms, fish, noodles, cucumber, sausages, carrot.","A coloured ingredient chart with the words eggs, onion, salmon, mushrooms, fish, noodles, cucumber, sausages and carrot."), cap: T("Bảng từ vựng nguyên liệu do học sinh vẽ","An ingredient vocabulary chart drawn by a student") }, { img: "img/tree-36.jpg", alt: T("Một bạn đang vẽ sơ đồ nguyên liệu spring roll có các từ carrot, sausage, egg, noodles.","A student draws the spring roll ingredients diagram with the words carrot, sausage, egg and noodles."), cap: T("Vẽ và ghi từ vựng nguyên liệu","Drawing and labelling the ingredients") }, { img: "img/tree-37.jpg", alt: T("Một bạn đeo găng tay trong suốt đang chuẩn bị bánh tráng.","A student in clear gloves prepares the rice paper."), cap: T("Chuẩn bị cuốn spring roll","Getting ready to roll") }, { img: "img/tree-38.jpg", alt: T("Các bạn ngồi quanh bàn nhỏ, đeo găng tay, cuốn spring roll.","Students sit at small tables in gloves, rolling their spring rolls."), cap: T("Cả nhóm cùng cuốn spring roll","Everyone rolling spring rolls together") }, { img: "img/tree-39.jpg", alt: T("Các bạn ngồi quanh bàn trong buổi tối, mỗi bạn cuốn một cuốn.","Students around the table in the evening, each rolling their own."), cap: T("Buổi tối cuốn spring roll","An evening of spring roll making") }, { img: "img/tree-40.jpg", alt: T("Cả nhóm cụng ly nước ngọt sau khi làm xong, trên đĩa là các cuốn spring roll.","The group clinks plastic cups after finishing, with spring rolls on the plate."), cap: T("Cụng ly sau khi làm xong","Cheers after cooking") }, { img: "img/tree-41.jpg", alt: T("Bốn bạn đứng trước bảng trắng viết “Spring Roll”.","Four students stand in front of a whiteboard that says “Spring Roll”."), cap: T("Chụp ảnh trước bảng “Spring Roll”","A photo in front of the “Spring Roll” board") }] },
          { h: T("Quay parody theo ý thích (11/1/2018)","A parody the students wanted to film (11 Jan 2018)"), items: [AV(107,"Các bạn thuộc lời đến mức không cần diễn, quay chỉ mất 10 phút","The students knew their lines so well they barely needed to act; filming took only 10 minutes","Các bạn thuộc lời đến mức không cần diễn, quay chỉ mất 10 phút","The students knew their lines so well they barely needed to act; filming took only 10 minutes")] },
          { h: T("Dự án phim Jurassic World: làm việc nhóm và thuyết trình (6–7/6/2018)","Jurassic World film project: teamwork and presenting (6–7 Jun 2018)"), items: [{ img: "img/tree-42.jpg", alt: T("Ba bạn cùng viết bài trong nhóm.","Three students write together in a group."), cap: T("Ba bạn cùng viết bài trong nhóm.","Three students write together in a group.") }, { img: "img/tree-43.jpg", alt: T("Các bạn tra cứu trên máy tính và ghi chép về bộ phim.","Students research on the computer and take notes about the film."), cap: T("Các bạn tra cứu trên máy tính và ghi chép về bộ phim.","Students research on the computer and take notes about the film.") }, AV(108,"Nhóm ba bạn thuyết trình về phim (1)","A group of three presents the film (1)","Nhóm ba bạn thuyết trình về phim (1)","A group of three presents the film (1)"), AV(109,"Nhóm ba bạn thuyết trình về phim (2)","A group of three presents the film (2)","Nhóm ba bạn thuyết trình về phim (2)","A group of three presents the film (2)"), { img: "img/tree-48.jpg", alt: T("Các bạn ngồi quanh hai tờ giấy lớn để chuẩn bị làm poster.","Students sit around two big sheets of paper to prepare their posters."), cap: T("Các bạn ngồi quanh hai tờ giấy lớn để chuẩn bị làm poster.","Students sit around two big sheets of paper to prepare their posters.") }] },
          { h: T("Làm poster Jurassic World (14/6/2018)","Making Jurassic World posters (14 Jun 2018)"), items: [{ img: "img/tree-49.jpg", alt: T("Các bạn nằm vẽ poster, xung quanh là những ảnh cắt từ phim.","Students lie on the floor drawing posters, surrounded by film stills."), cap: T("Các bạn nằm vẽ poster, xung quanh là những ảnh cắt từ phim.","Students lie on the floor drawing posters, surrounded by film stills.") }, { img: "img/tree-47.jpg", alt: T("Poster “Jurassic World 2” nhóm làm và ba bạn đứng cạnh.","The “Jurassic World 2” poster with three of its makers."), cap: T("Poster “Jurassic World 2” nhóm làm và ba bạn đứng cạnh.","The “Jurassic World 2” poster with three of its makers.") }, { img: "img/tree-50.jpg", alt: T("Poster “Jurassic World 2” với phần nội dung, thông tin phim và hình khủng long.","The “Jurassic World 2” poster with content, movie information and dinosaur drawings."), cap: T("Poster “Jurassic World 2” với phần nội dung, thông tin phim và hình khủng long.","The “Jurassic World 2” poster with content, movie information and dinosaur drawings.") }, { img: "img/tree-52.jpg", alt: T("Bốn bạn ngồi dưới poster “Jurassic World”.","Four students sit under their “Jurassic World” poster."), cap: T("Bốn bạn ngồi dưới poster “Jurassic World”.","Four students sit under their “Jurassic World” poster.") }, { img: "img/tree-51.jpg", alt: T("Poster “Jurassic World” có danh sách diễn viên, tác giả và nội dung.","The “Jurassic World” poster with cast, author and story."), cap: T("Poster “Jurassic World” có danh sách diễn viên, tác giả và nội dung.","The “Jurassic World” poster with cast, author and story.") }] },
          { h: T("Miêu tả căn phòng bằng tranh (8/6/2018)","Describing a room through drawings (8 Jun 2018)"), items: [{ img: "img/tree-44.jpg", alt: T("Một bạn cầm bức vẽ căn phòng có giường, tủ sách và cửa sổ.","A student holds a drawing of a room with a bed, bookshelf and window."), cap: T("Một bạn cầm bức vẽ căn phòng có giường, tủ sách và cửa sổ.","A student holds a drawing of a room with a bed, bookshelf and window.") }, { img: "img/tree-45.jpg", alt: T("Một bạn cầm bức vẽ căn phòng với bàn học, giường và giá sách.","A student holds a drawing of a room with a desk, bed and bookshelf."), cap: T("Một bạn cầm bức vẽ căn phòng với bàn học, giường và giá sách.","A student holds a drawing of a room with a desk, bed and bookshelf.") }, { img: "img/tree-46.jpg", alt: T("Một bạn cầm bức vẽ căn phòng nhiều đồ vật xếp chồng.","A student holds a drawing of a room full of stacked objects."), cap: T("Một bạn cầm bức vẽ căn phòng nhiều đồ vật xếp chồng.","A student holds a drawing of a room full of stacked objects.") }, AV(110,"Các bạn làm bài ở bảng trắng","Students working at the whiteboard","Các bạn làm bài ở bảng trắng","Students working at the whiteboard"), AV(111,"Các bạn viết và vẽ theo nhóm (1)","Students write and draw in groups (1)","Các bạn viết và vẽ theo nhóm (1)","Students write and draw in groups (1)"), AV(112,"Các bạn viết và vẽ theo nhóm (2)","Students write and draw in groups (2)","Các bạn viết và vẽ theo nhóm (2)","Students write and draw in groups (2)"), AV(113,"Các bạn viết và vẽ theo nhóm (3)","Students write and draw in groups (3)","Các bạn viết và vẽ theo nhóm (3)","Students write and draw in groups (3)"), AV(114,"Các bạn viết và vẽ theo nhóm (4)","Students write and draw in groups (4)","Các bạn viết và vẽ theo nhóm (4)","Students write and draw in groups (4)")] },
          { h: T("Thuyết trình poster (21/6/2018)","Poster presentations (21 Jun 2018)"), items: [AV(115,"Hai bạn thuyết trình trước poster","Two students present in front of the poster","Hai bạn thuyết trình trước poster","Two students present in front of the poster"), AV(116,"Bốn bạn thuyết trình trước poster","Four students present in front of the poster","Bốn bạn thuyết trình trước poster","Four students present in front of the poster")] },
          { h: T("Vì sao tớ đặc biệt (20–21/6/2018)","Why I’m special (20–21 Jun 2018)"), items: [{ img: "img/tree-53.jpg", alt: T("Học sinh vẽ chân dung bạn trong lớp, phía sau là hai poster Jurassic World.","Students draw portraits of classmates with two Jurassic World posters behind them."), cap: T("Học sinh vẽ chân dung bạn trong lớp, phía sau là hai poster Jurassic World.","Students draw portraits of classmates with two Jurassic World posters behind them.") }, { img: "img/tree-54.jpg", alt: T("Các bạn đi quanh phòng điền phiếu miêu tả bạn học.","Students move around the room filling in worksheets about classmates."), cap: T("Các bạn đi quanh phòng điền phiếu miêu tả bạn học.","Students move around the room filling in worksheets about classmates.") }, { img: "img/tree-55.jpg", alt: T("Cả nhóm nằm quanh vòng tròn bút sáp để vẽ chân dung bạn.","The group lies in a circle around crayons, drawing portraits of friends."), cap: T("Cả nhóm nằm quanh vòng tròn bút sáp để vẽ chân dung bạn.","The group lies in a circle around crayons, drawing portraits of friends.") }, { img: "img/tree-56.jpg", alt: T("Bút sáp và giấy vẽ chân dung trên sàn.","Crayons and portrait drawings on the floor."), cap: T("Bút sáp và giấy vẽ chân dung trên sàn.","Crayons and portrait drawings on the floor.") }, AV(117,"Bài giới thiệu một người bạn đặc biệt (1)","A presentation about a special friend (1)","Bài giới thiệu một người bạn đặc biệt (1)","A presentation about a special friend (1)"), AV(118,"Bài giới thiệu một người bạn đặc biệt (2)","A presentation about a special friend (2)","Bài giới thiệu một người bạn đặc biệt (2)","A presentation about a special friend (2)"), AV(119,"Bài giới thiệu một người bạn đặc biệt (3)","A presentation about a special friend (3)","Bài giới thiệu một người bạn đặc biệt (3)","A presentation about a special friend (3)"), AV(120,"Bài giới thiệu một người bạn đặc biệt (4)","A presentation about a special friend (4)","Bài giới thiệu một người bạn đặc biệt (4)","A presentation about a special friend (4)"), AV(121,"Bài giới thiệu một người bạn đặc biệt (5)","A presentation about a special friend (5)","Bài giới thiệu một người bạn đặc biệt (5)","A presentation about a special friend (5)"), AV(122,"Bài giới thiệu một người bạn đặc biệt (6)","A presentation about a special friend (6)","Bài giới thiệu một người bạn đặc biệt (6)","A presentation about a special friend (6)"), AV(123,"Bài giới thiệu một người bạn đặc biệt (7)","A presentation about a special friend (7)","Bài giới thiệu một người bạn đặc biệt (7)","A presentation about a special friend (7)"), AV(124,"Bài giới thiệu một người bạn đặc biệt (8)","A presentation about a special friend (8)","Bài giới thiệu một người bạn đặc biệt (8)","A presentation about a special friend (8)"), AV(125,"Bài giới thiệu một người bạn đặc biệt (9)","A presentation about a special friend (9)","Bài giới thiệu một người bạn đặc biệt (9)","A presentation about a special friend (9)"), AV(126,"Bài giới thiệu một người bạn đặc biệt (10)","A presentation about a special friend (10)","Bài giới thiệu một người bạn đặc biệt (10)","A presentation about a special friend (10)")] },
          { h: T("Nghiệm thu đầu giờ: các bạn diễn kịch ngắn (5/7/2018)","Warm-up performances: short skits (5 Jul 2018)"), items: [{ img: "img/tree-57.jpg", alt: T("Ba bạn đứng trước bảng, một bạn cầm chổi, chuẩn bị diễn.","Three students stand in front of the whiteboard, one holding a broom, ready to perform."), cap: T("Ba bạn đứng trước bảng, một bạn cầm chổi, chuẩn bị diễn.","Three students stand in front of the whiteboard, one holding a broom, ready to perform.") }, { img: "img/tree-58.jpg", alt: T("Hai bạn diễn một tình huống vui với cây chổi.","Two students act out a funny scene with a broom."), cap: T("Hai bạn diễn một tình huống vui với cây chổi.","Two students act out a funny scene with a broom.") }, AV(127,"Nhóm bốn bạn trình diễn (1)","A group of four performs (1)","Nhóm bốn bạn trình diễn (1)","A group of four performs (1)"), AV(128,"Nhóm bốn bạn trình diễn (2)","A group of four performs (2)","Nhóm bốn bạn trình diễn (2)","A group of four performs (2)"), AV(129,"Hai bạn diễn tình huống với cây chổi","Two students act out a scene with a broom","Hai bạn diễn tình huống với cây chổi","Two students act out a scene with a broom"), AV(131,"Nhóm bốn bạn trình diễn (3)","A group of four performs (3)","Nhóm bốn bạn trình diễn (3)","A group of four performs (3)"), AV(132,"Các bạn cười vui sau phần trình diễn","Students laugh after the performance","Các bạn cười vui sau phần trình diễn","Students laugh after the performance")] },
          { h: T("Thử thách đánh vần, quá khứ đơn và viết truyện (7/7/2018)","Spelling challenges, past simple and story writing (7 Jul 2018)"), items: [AV(133,"Các bạn làm việc nhóm ở bàn nhỏ (1)","Students work in groups at small tables (1)","Các bạn làm việc nhóm ở bàn nhỏ (1)","Students work in groups at small tables (1)"), AV(134,"Các bạn làm việc nhóm ở bàn nhỏ (2)","Students work in groups at small tables (2)","Các bạn làm việc nhóm ở bàn nhỏ (2)","Students work in groups at small tables (2)"), AV(135,"Các bạn trao đổi và viết truyện theo nhóm","Students discuss and write stories in groups","Các bạn trao đổi và viết truyện theo nhóm","Students discuss and write stories in groups"), AV(136,"Các bạn làm việc nhóm ở bàn nhỏ (3)","Students work in groups at small tables (3)","Các bạn làm việc nhóm ở bàn nhỏ (3)","Students work in groups at small tables (3)"), AV(137,"Các bạn đọc và viết trong nhóm","Students read and write in their group","Các bạn đọc và viết trong nhóm","Students read and write in their group")] },
          { h: T("Học từ vựng mới và làm poster (11/7/2018)","Learning new vocabulary and making a poster (11 Jul 2018)"), items: [{ img: "img/tree-59.jpg", alt: T("Các bạn dán ảnh và viết lên tờ giấy lớn trên sàn.","Students glue photos and write on a big sheet of paper on the floor."), cap: T("Các bạn dán ảnh và viết lên tờ giấy lớn trên sàn.","Students glue photos and write on a big sheet of paper on the floor.") }, { img: "img/tree-60.jpg", alt: T("Từ vựng mới trên bảng và các bạn cùng tra cứu trên máy tính.","New vocabulary on the board while students look things up on the computer."), cap: T("Từ vựng mới trên bảng và các bạn cùng tra cứu trên máy tính.","New vocabulary on the board while students look things up on the computer.") }] },
          { h: T("Thực hành nói tại nhà (13/7/2018)","Speaking practice at home (13 Jul 2018)"), items: [AV(138,"Học sinh tự quay video luyện nói ở nhà (1)","A student films a speaking practice at home (1)","Học sinh tự quay video luyện nói ở nhà (1)","A student films a speaking practice at home (1)"), AV(139,"Học sinh tự quay video luyện nói ở nhà (2)","A student films a speaking practice at home (2)","Học sinh tự quay video luyện nói ở nhà (2)","A student films a speaking practice at home (2)"), AV(140,"Học sinh tự quay video luyện nói ở nhà (3)","A student films a speaking practice at home (3)","Học sinh tự quay video luyện nói ở nhà (3)","A student films a speaking practice at home (3)"), AV(141,"Học sinh tự quay video luyện nói ở nhà (4)","A student films a speaking practice at home (4)","Học sinh tự quay video luyện nói ở nhà (4)","A student films a speaking practice at home (4)"), AV(142,"Học sinh tự quay video luyện nói ở nhà (5)","A student films a speaking practice at home (5)","Học sinh tự quay video luyện nói ở nhà (5)","A student films a speaking practice at home (5)")] },
          { h: T("Dự án phim ảnh tĩnh – stop motion (18–21/7/2018)","Stop-motion film project (18–21 Jul 2018)"), items: [{ img: "img/tree-61.jpg", alt: T("Bài đọc hướng dẫn làm phim stop motion: vật liệu, các bước và cách dựng.","The reading text on stop motion animation: supplies, method and set-up."), cap: T("Bài đọc hướng dẫn làm phim stop motion: vật liệu, các bước và cách dựng.","The reading text on stop motion animation: supplies, method and set-up.") }, AV(143,"Video mẫu “How to make…” làm bằng đất nặn","A sample “How to make…” clay-lettering video","Video mẫu “How to make…” làm bằng đất nặn","A sample “How to make…” clay-lettering video"), AV(144,"Sản phẩm phim ảnh tĩnh của học sinh (1)","A student’s stop-motion film (1)","Sản phẩm phim ảnh tĩnh của học sinh (1)","A student’s stop-motion film (1)"), AV(145,"Sản phẩm phim ảnh tĩnh của học sinh (2)","A student’s stop-motion film (2)","Sản phẩm phim ảnh tĩnh của học sinh (2)","A student’s stop-motion film (2)")] },
          { h: T("Thử thách từ vựng, mẫu câu và some – any – a few – a little (23/7/2018)","Vocabulary and sentence challenges, some – any – a few – a little (23 Jul 2018)"), items: [AV(146,"Trò chơi ngồi vòng tròn trên sàn (1)","A circle game on the floor (1)","Trò chơi ngồi vòng tròn trên sàn (1)","A circle game on the floor (1)"), AV(147,"Trò chơi ngồi vòng tròn trên sàn (2)","A circle game on the floor (2)","Trò chơi ngồi vòng tròn trên sàn (2)","A circle game on the floor (2)"), AV(148,"Chơi trò chơi trước bảng trắng (1)","A game at the whiteboard (1)","Chơi trò chơi trước bảng trắng (1)","A game at the whiteboard (1)"), AV(149,"Chơi trò chơi trước bảng trắng (2)","A game at the whiteboard (2)","Chơi trò chơi trước bảng trắng (2)","A game at the whiteboard (2)"), AV(152,"Chơi trò chơi trước bảng trắng (3)","A game at the whiteboard (3)","Chơi trò chơi trước bảng trắng (3)","A game at the whiteboard (3)")] },
          { h: T("Khoa học bằng tiếng Anh: áp suất không khí – “quả trứng chui vào chai” (25/7/2018)","Science in English: air pressure – the “egg in a bottle” (25 Jul 2018)"), items: [AV(153,"Học sinh thực hành thí nghiệm và thuyết trình bằng tiếng Anh","Students do the experiment and present in English","Học sinh thực hành thí nghiệm và thuyết trình bằng tiếng Anh","Students do the experiment and present in English")] },
          { h: T("Kỹ năng trình bày: lập dàn ý và tự quay vlog (8/1/2020)","Presentation skills: outlining and filming a vlog (8 Jan 2020)"), items: [AV(154,"Học sinh thực hành tự quay vlog về việc tự học tiếng Anh (1)","A student practises filming a vlog about self-studying English (1)","Học sinh thực hành tự quay vlog về việc tự học tiếng Anh (1)","A student practises filming a vlog about self-studying English (1)"), AV(155,"Học sinh thực hành tự quay vlog về việc tự học tiếng Anh (2)","A student practises filming a vlog about self-studying English (2)","Học sinh thực hành tự quay vlog về việc tự học tiếng Anh (2)","A student practises filming a vlog about self-studying English (2)"), AV(156,"Học sinh thực hành tự quay vlog về việc tự học tiếng Anh (3)","A student practises filming a vlog about self-studying English (3)","Học sinh thực hành tự quay vlog về việc tự học tiếng Anh (3)","A student practises filming a vlog about self-studying English (3)")] }
        ] },
      { id: "home-lab", yr: "2017", tl: "2017", tt: T("Phòng thí nghiệm tại gia", "The home lab"),
        h: T("Phòng thí nghiệm tại gia: vui học cùng con", "The home lab: learning and playing with my child"),
        p: [B0.p[0]].concat(B1.p), l: B1.l, q: B0.q, m: B0.m.concat(B1.m) },
      { id: "triet-ly", yr: "2018 – 2019", tl: "2018", tt: T("Viết lại cách dạy, làm học liệu", "Rewriting how I teach, making materials"),
        h: T("Triết lý lớp học và những bộ học liệu tự làm", "Classroom philosophy and home-made materials"),
        p: A2.p.concat(B2.p), l: A2.l, q: B2.q, m: A2.m.concat(B2.m),
        more: { h: T("Xem toàn bộ hình ảnh học liệu trong Thư viện hoạt động", "See all the material photos in the Activity library"), href: "#library" } },
      { id: "mam-non", yr: "2019 – 2021", tl: "2019", tt: T("Dạy tiếng Anh ở trường mầm non", "Teaching English in a preschool"),
        h: T("Học mà chơi ở trường mầm non", "Learning through play in a preschool"),
        p: A3.p, l: A3.l, q: A3.q, m: A3.m },
      { id: "covid", yr: "2020 – 2021", tl: T("2020 – 21", "2020 – 21"), tt: T("Covid: dạy trẻ trực tuyến", "Covid: teaching children online"),
        h: T("Covid: giữ nghề bằng cách đổi mới", "Covid: keeping the craft alive by reinventing it"),
        p: A4.p.concat(B3.p, [T("Trong giai đoạn này tôi sáng lập UP Moving Forward, đơn vị giáo dục kết hợp cùng các nhãn hàng ClassIn, Twinkl và Flyer. Các video giảng dạy tương tác trực tuyến của UP được học sinh, phụ huynh và giáo viên đón nhận rất tốt. Thêm video đầy đủ có trên kênh YouTube của UP Moving Forward.",
              "During this period I founded UP Moving Forward, an education initiative working with the ClassIn, Twinkl and Flyer brands. UP's interactive online teaching videos were received very warmly by students, parents and teachers. More full videos are on the UP Moving Forward YouTube channel.")]), l: A4.l, q: A4.q,
        m: A4.m.concat(B3.m, [
          { vid: "vid/hv36.mp4", poster: "vid/hv36.jpg", alt: T("Buổi học trực tuyến trên ClassIn với bài đọc và nối số.", "An online ClassIn lesson with a read-and-number task."), cap: T("Lớp học trực tuyến trên ClassIn (hình học sinh đã được che)", "An online ClassIn lesson (students' video tiles covered)") },
          { vid: "vid/hv37.mp4", poster: "vid/hv37.jpg", alt: T("Buổi học phonics tương tác trên ClassIn với bộ tài liệu Twinkl: thẻ chữ, bảng hành tinh và trò chơi cờ.", "An interactive phonics lesson on ClassIn with Twinkl materials: letter cards, a planet board and a board game."), cap: T("Lớp phonics tương tác trực tuyến (Twinkl × UP)", "Interactive online phonics lesson (Twinkl × UP)") }]),
        yt: { h: T("Video giảng dạy của UP Moving Forward", "UP Moving Forward teaching videos"), p: T("Một số video từ kênh YouTube của UP Moving Forward. Bấm vào ảnh để xem ngay tại đây.", "A selection from the UP Moving Forward YouTube channel. Click a thumbnail to play it here."),
          v: [["g27EiGkdpK8", T("Lớp Movers A1 (21/9/2021)", "Movers A1 class (21 Sep 2021)")], ["CAFt_Dp1xLg", T("Buổi học thử miễn phí: Presentation Class", "Free trial: Presentation Class")], ["uLlsjqjQWc0", T("Twinkl Go: trò chơi online cho giảng dạy", "Twinkl Go: online games for teaching")], ["dKEF9Rx40eA", T("Buổi hỏi đáp (Q&A) cùng giáo viên", "Teacher Q&A session")], ["RArytBEkPNE", T("Video lớp học trực tuyến", "Online class video")], ["A0a7kGj2gkU", "Workshop 1"], ["Vy4Uz_Sa5aI", T("Bài học Household items trên ClassIn", "Household items lesson on ClassIn")], ["F9Ap3VG0NOM", T("Trò chơi ghép đếm “People Who Help Us” trên ClassIn", "“People Who Help Us” counting and matching puzzle on ClassIn")], ["nS56HoVha3g", T("Hoạt động đọc: Little Red Riding Hood (sau khi đọc)", "Reading activity: Little Red Riding Hood (post-reading)")], ["PHBXnHDspno", T("Lớp ESL demo", "ESL demo class")]] },
        more: { h: T("Xem kênh YouTube UP Moving Forward", "Watch the UP Moving Forward YouTube channel"), href: "https://www.youtube.com/@upeducation4114", ext: true } },
      { id: "lop-mau", yr: "2022", tl: "2022", tt: T("Lớp học mẫu 4–5 tuổi", "A model class for 4–5-year-olds"),
        h: T("Lớp học mẫu 4–5 tuổi", "A model class for 4–5-year-olds"),
        p: A5.p, l: A5.l, q: A5.q, m: A5.m, extra: "kids" },
      { id: "dao-tao", yr: "2021 – 2022", tl: T("2021 – 22", "2021 – 22"), tt: T("Đào tạo giáo viên: trực tuyến trước, rồi workshop trực tiếp", "Teacher training: online first, then in-person workshops"),
        h: T("Đào tạo giáo viên: từ trực tuyến đến workshop trực tiếp", "Teacher training: from online to in-person workshops"),
        p: [T("Trong giai đoạn Covid 2021–2022, tôi đào tạo giáo viên trực tuyến trước: chia sẻ các workshop, tập huấn làm học liệu và thiết kế bài giảng. Sau đó mới có một số workshop trực tiếp ở Hà Nội, Sài Gòn và Nha Trang.",
                "During Covid in 2021–2022 I trained teachers online first: sharing workshops, training in making materials and designing lessons. Only afterwards came a few in-person workshops in Hanoi, Saigon and Nha Trang.")].concat(A6.p, B4.p.slice(1)),
        l: A6.l.concat ? A6.l : A6.l, q: B4.q, m: A6.m.concat(B4.m), g: B4.g, extra: "teach" },
      { id: "canada", yr: T("Cuối 2022 – 2023", "Late 2022 – 2023"), tl: T("Cuối 2022", "Late 2022"), tt: T("Chuyển sang Canada, làm việc từ xa", "Moving to Canada, working remotely"),
        h: T("Sang Canada: làm việc từ xa và điều phối trong TESL Ontario", "Moving to Canada: remote work and coordinating within TESL Ontario"),
        p: [T("Cuối năm 2022, tôi chuyển sang Canada. Thời gian đầu tôi chỉ làm việc trực tuyến từ xa: tiếp tục đồng hành cùng giáo viên Việt Nam qua Mentoring Program và các workshop, mang theo bộ học liệu đã xây dựng.",
              "At the end of 2022 I moved to Canada. At first I only worked online and remotely: I kept accompanying Vietnamese teachers through a mentoring programme and workshops, bringing the materials I had built."),
            T("Tôi từng tham gia điều phối trong hiệp hội TESL Ontario; sau đó tôi dừng lại và chuyển hướng sang ngoại giao giáo dục.",
              "I took part in coordinating work within TESL Ontario; after that I stopped and turned towards education diplomacy."),
            B5.p[0], B5.p[1]],
        q: B5.q, m: B5.m.concat(AK.m) },
      { id: "ngoai-giao", yr: T("2023 – nay", "2023 – present"), tl: T("2023 – nay", "2023 – now"), tt: T("Ngoại giao giáo dục Canada – Việt Nam", "Canada–Vietnam education diplomacy"),
        h: T("Ngoại giao giáo dục: nhịp cầu Canada – Việt Nam", "Education diplomacy: a bridge between Canada and Vietnam"),
        p: B6.p, l: B6.l, q: BK.q, m: B6.m.concat(BK.m, v095 ? [v095] : []) }
    ].map(function (c) { c.G = G; return c; });
  }
  function ytOne(id, title) { return '<div class="yt-grid" style="padding:0 16px 16px"><figure class="yt"><button type="button" class="yt-btn" data-yt="' + id + '" aria-label="' + esc(title) + '"><img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy"><span class="yt-play" aria-hidden="true">▶</span></button><figcaption>' + esc(title) + ' · <a href="https://youtu.be/' + id + '" target="_blank" rel="noopener">YouTube</a></figcaption></figure></div>'; }
  function ytHtml(y) {
    return '<h3 style="margin-top:22px">' + esc(y.h) + '</h3><p class="msg" style="max-width:70ch">' + esc(y.p) + '</p><div class="yt-grid">' + y.v.map(function (v) {
      return '<figure class="yt"><button type="button" class="yt-btn" data-yt="' + v[0] + '" aria-label="' + esc(v[1]) + '"><img src="https://i.ytimg.com/vi/' + v[0] + '/hqdefault.jpg" alt="" loading="lazy"><span class="yt-play" aria-hidden="true">▶</span></button><figcaption>' + esc(v[1]) + ' · <a href="https://youtu.be/' + v[0] + '" target="_blank" rel="noopener">YouTube</a></figcaption></figure>';
    }).join("") + '</div>';
  }
  var CHB = { "bat-dau": "kids", "thuong-hieu": "kids", "mam-non": "kids", "covid": "kids", "lop-mau": "kids", "lop-tree": "teen", "lop-nguoi-lon": "adult", "home-lab": "story", "dao-tao": "story", "canada": "story", "ngoai-giao": "story", "triet-ly": "phil" };
  var CHS = { "bat-dau": 2012, "thuong-hieu": 2016, "lop-nguoi-lon": 2016.5, "home-lab": 2017, "lop-tree": 2017.5, "triet-ly": 2018, "mam-non": 2019, "covid": 2020, "dao-tao": 2021, "lop-mau": 2022, "canada": 2022.8, "ngoai-giao": 2023 };
  var CHE = { "bat-dau": 2016, "thuong-hieu": 2019, "lop-nguoi-lon": 2016.85, "home-lab": 2018, "lop-tree": 2020.8, "triet-ly": 2020, "mam-non": 2021, "covid": 2021.9, "dao-tao": 2022.8, "lop-mau": 2023, "canada": 2023, "ngoai-giao": 2026.9 };
  var CHR = { covid: 1, "lop-mau": 1 };
  var BR = { kids: "k-kids", teen: "k-teen", adult: "k-adult", story: "k-story", phil: "k-phil" };
  var BICON = { kids: "\ud83e\uddd2", teen: "\ud83c\udfac", adult: "\ud83d\udcbc", story: "\ud83e\udded", phil: "\ud83d\udca1" };
  var BNAME = function (vi) { return vi ? { kids: "Lớp mầm non và trẻ nhỏ", teen: "Lớp teen (TREE)", adult: "Lớp người lớn đi làm", story: "Câu chuyện giảng dạy chung", phil: "Triết lý giảng dạy cá nhân" } : { kids: "Preschool and young learners", teen: "The teen class (TREE)", adult: "Working adults", story: "The shared teaching story", phil: "My teaching philosophy" }; };
  function infoLanes(vi, J) {
    var N = BNAME(vi), Y0 = 2012, Y1 = 2027, W = Y1 - Y0, ticks = "";
    for (var y = Y0; y <= 2026; y += 2) ticks += '<span style="left:' + ((y - Y0) / W * 100) + '%">' + y + '</span>';
    var order = ["kids", "teen", "adult", "story", "phil"];
    var rows = order.map(function (b) {
      var bars = J.filter(function (c) { return CHB[c.id] === b; }).map(function (c) {
        var l = (CHS[c.id] - Y0) / W * 100, w = Math.max((CHE[c.id] - CHS[c.id]) / W * 100, 1.4);
        return '<a class="bar ' + BR[b] + '" href="#gallery-' + b + '" data-jr="' + c.id + '" style="left:' + l + '%;width:' + w + '%;top:' + (3 + (CHR[c.id] || 0) * 24) + 'px" title="' + esc(c.tl + " · " + c.tt) + '" aria-label="' + esc(c.tl + " · " + c.tt) + '"></a>';
      }).join("");
      return '<div class="lane"><a class="lane-l ' + BR[b] + '" href="#gallery-' + b + '"><span>' + BICON[b] + '</span>' + esc(N[b]) + '</a><div class="lane-t" style="height:' + (b === "kids" ? 50 : 26) + 'px">' + bars + '</div></div>';
    }).join("");
    return '<div class="lanes2" role="group" aria-label="' + (vi ? "Các giai đoạn theo năm" : "Phases by year") + '"><div class="axis2"><i></i><div class="axis-t">' + ticks + '</div></div>' + rows + '</div>';
  }
  function infoPath(vi, J, only) {
    var N = BNAME(vi), list = J.filter(function (c) { return !only || CHB[c.id] === only; }).slice().sort(function (a, b) { return CHS[a.id] - CHS[b.id]; });
    return '<ol class="path">' + list.map(function (c) {
      var b = CHB[c.id];
      return '<li class="' + BR[b] + '"><span class="dot" aria-hidden="true">' + BICON[b] + '</span><a href="#gallery-' + b + '" data-jr="' + c.id + '"><span class="when">' + esc(c.tl) + '</span><b>' + esc(c.tt) + '</b><small>' + esc(N[b]) + '</small></a></li>';
    }).join("") + '</ol>';
  }
  function viewGalleryHub() {
    var vi = lang === "vi", J = JOURNEY(vi), N = BNAME(vi);
    var H = vi ? {
      eye: "Thư viện hành trình giảng dạy · Ms Trang Phan TESOL", h: "Teaching Portfolio", lede: "Mười ba năm đứng lớp, làm học liệu và đào tạo giáo viên, được kể lại bằng ảnh, video và học liệu thật. Chọn một luồng bên dưới, hoặc đi theo dòng thời gian.",
      consent: "Ảnh và video học sinh được đăng với sự đồng ý của phụ huynh. Website không ghi tên, lớp hay thông tin cá nhân của trẻ; tên xuất hiện trong ảnh và video đã được làm mờ.",
      s1: "1. Thư viện hoạt động lớp thực tế", s1p: "Ba lớp, ba nhóm tuổi, mỗi lớp là một câu chuyện xuyên suốt. Cuối mỗi nhánh có phần đối chiếu với chương trình Ontario.",
      s2: "2. Chia sẻ câu chuyện giảng dạy chung", s3: "3. Triết lý giảng dạy cá nhân",
      c: { kids: ["Từ những học trò đầu tiên (2015) đến lớp học mẫu 4–5 tuổi (2022): trò chơi, dự án, học trực tuyến và học mà chơi.", "2012 – 2022"], teen: ["Một nhóm bạn đi cùng cô từ lúc 10 tuổi đến khi trưởng thành: học theo dự án, làm phim, thuyết trình, tự học.", "2017 – 2020"], adult: ["Khóa tiếng Anh cho người đi làm: học qua hoạt động để giảm căng thẳng sau giờ làm.", "2016"], story: ["Từ phòng thí nghiệm tại gia, đào tạo giáo viên, chuyển sang Canada đến ngoại giao giáo dục Canada – Việt Nam.", "2017 – nay"], phil: ["Vì sao tôi viết lại cách dạy, làm học liệu và chọn học qua trải nghiệm. Kèm góc nhìn Canada – Việt Nam.", "2018 – 2019"] },
      go: "Xem câu chuyện →", tl: "Dòng thời gian", tl2: "Các dấu mốc", lg: "Mỗi thanh màu là một giai đoạn; bấm vào để mở câu chuyện tương ứng."
    } : {
      eye: "The teaching-journey library · Ms Trang Phan TESOL", h: "Teaching Portfolio", lede: "Thirteen years of teaching, making materials and training teachers, told through real photos, videos and resources. Pick a stream below, or follow the timeline.",
      consent: "Student photos and videos are published with parents’ consent. The site does not name children or their classes; names visible in photos and videos are blurred.",
      s1: "1. Real classroom activity library", s1p: "Three classes, three age groups, each one a continuous story. Every branch ends with a comparison to the Ontario curriculum.",
      s2: "2. The shared teaching story", s3: "3. My teaching philosophy",
      c: { kids: ["From the first students (2015) to the model class for 4–5-year-olds (2022): games, projects, online lessons and learning through play.", "2012 – 2022"], teen: ["A group of friends who walked with me from age 10 to adulthood: project-based learning, films, presentations, self-study.", "2017 – 2020"], adult: ["An English course for people at work: learning through activities to ease the stress after a long day.", "2016"], story: ["From the home lab to teacher training, moving to Canada and Canada–Vietnam education diplomacy.", "2017 – now"], phil: ["Why I rewrote the way I teach, made materials and chose learning by doing. With a Canada–Vietnam perspective.", "2018 – 2019"] },
      go: "Open the story →", tl: "Timeline", tl2: "Milestones", lg: "Each coloured bar is a phase; click it to open that story."
    };
    function card(b) { return '<a class="hub-card ' + BR[b] + '" href="#gallery-' + b + '"><span class="ico" aria-hidden="true">' + BICON[b] + '</span><span class="yrs">' + H.c[b][1] + '</span><h3>' + esc(N[b]) + '</h3><p>' + esc(H.c[b][0]) + '</p><span class="go">' + H.go + '</span></a>'; }
    return '<section class="hub-intro"><p class="eyebrow">' + H.eye + '</p><h1 id="page-h">' + H.h + '</h1><p class="lede" style="max-width:72ch">' + esc(H.lede) + '</p><p class="consent">' + esc(H.consent) + '</p></section>' +
      '<section aria-labelledby="tl-h"><h2 id="tl-h" style="margin-bottom:6px">' + H.tl + '</h2><p class="msg" style="margin-bottom:12px">' + H.lg + '</p>' + infoLanes(vi, J) + '</section>' +
      '<section class="hub-sec"><h2>' + H.s1 + '</h2><p class="msg" style="max-width:72ch">' + H.s1p + '</p><div class="hub-grid">' + card("kids") + card("teen") + card("adult") + '</div></section>' +
      '<section class="hub-sec"><div class="hub-grid">' + '<div class="hub-sec"><h2>' + H.s2 + '</h2>' + card("story") + '</div><div class="hub-sec"><h2>' + H.s3 + '</h2>' + card("phil") + '</div></div></section>' +
      '<section><h2 style="margin-bottom:12px">' + H.tl2 + '</h2>' + infoPath(vi, J) + '</section>' + ackHtml();
  }
  function viewGallery(cat) {
    cat = cat || "hub";
    if (cat === "hub") return viewGalleryHub();
    var vi = lang === "vi", J = JOURNEY(vi), G = GAL(vi); GAL_FLAT = [];
    var STU = ["Dự án thuyết trình Unit 7", "Quay parody", "Dự án phim Jurassic", "Làm poster Jurassic", "Miêu tả căn phòng", "Thuyết trình poster", "Vì sao tớ đặc biệt", "Thực hành nói tại nhà", "Dự án phim ảnh tĩnh", "Làm spring roll", "Học từ vựng mới và làm poster", "Kỹ năng trình bày: lập dàn ý"];
    function isStu(g) { return STU.some(function (p) { return g.h.indexOf(p) === 0; }); }
    function chFull(c) { return CHB[c.id] === cat; }
    function chGroups(c) { return chFull(c) ? (c.g || []) : []; }
    var JC = J.filter(chFull);
    var T = vi ? {
      eye: "Teaching Portfolio · Ms Trang Phan TESOL", h: "Thư viện hoạt động giảng dạy thực tế",
      lede: "Đây là kho ảnh, video và học liệu thật từ các lớp học, buổi tập huấn và dự án tôi đã thực hiện trong những năm dạy TESOL, khi thương hiệu của tôi là “Ms Trang Phan TESOL”. Bạn không cần chọn album: cứ kéo xuống, mỗi đoạn nối tiếp đoạn trước theo thời gian, từ những học trò đầu tiên năm 2015 đến lớp học thời Covid, đào tạo giáo viên, rồi chặng đường sang Canada và làm ngoại giao giáo dục.",
      consent: "Ảnh và video học sinh được đăng với sự đồng ý của phụ huynh. Website không ghi tên, lớp hay thông tin cá nhân của trẻ; tên xuất hiện trong ảnh và video đã được làm mờ. Mã giảm giá, liên kết đăng ký và thông tin chuyển khoản trong các bài gốc đã hết hạn hoặc được lược bỏ.",
      tl_h: "Dòng thời gian", lesson: "Bài học", tl_h2: "Các mốc hoạt động cùng giáo viên", more_h: "Thêm từ lớp học 2022",
      orig_h: "Tư liệu giảng dạy gốc của tác giả", orig_p: "Một số giáo án và biểu mẫu tác giả đã dùng khi đứng lớp, nay được chuẩn hóa theo tinh thần chương trình và chính sách đánh giá của Ontario, kèm góc giao thoa với lớp học Việt Nam để thầy cô tham khảo.",
      fullan: "Nguồn mô hình 6Cs: Michael Fullan và cộng sự, New Pedagogies for Deep Learning."
    } : {
      eye: "Gallery · Ms Trang Phan TESOL", h: "A library of real teaching activities",
      lede: "This is a collection of real photos, videos and materials from the classes, training sessions and projects I ran during my TESOL teaching years, when my brand was “Ms Trang Phan TESOL”. There is no album to choose: just scroll, and each part follows the last in time, from my first students in 2015 to Covid-era classes, teacher training, then the move to Canada and education diplomacy.",
      consent: "Photos and videos of children are published with their parents' consent. The site shows no names, classes or personal details of any child; names visible in photos and videos have been blurred. Expired vouchers, registration links and bank details from the original posts are left out.",
      tl_h: "Timeline", lesson: "Lesson", tl_h2: "Milestones with teachers", more_h: "More from the 2022 classes",
      orig_h: "The author's original teaching materials", orig_p: "A few lesson plans and templates the author used in class, now aligned with Ontario's curriculum and assessment policy, with notes on how they cross over to Vietnamese classrooms.",
      fullan: "Source of the 6Cs model: Michael Fullan and colleagues, New Pedagogies for Deep Learning."
    };
    var ONT = vi ? {
      kids: { h: "Đối chiếu với Ontario Curriculum hôm nay: lớp mầm non và trẻ nhỏ", lede: "Đối chiếu với The Kindergarten Program (2016) và Language, Grades 1–8 (2023). Đây là phần tác giả tự nhìn lại dựa trên kinh nghiệm dạy ở Việt Nam, không phải thẩm định chính thức.",
        items: [
          ["Belonging and Contributing (Thuộc về và đóng góp)", "Trò chơi nhóm, chia sẻ đồ dùng, buổi trình bày cho phụ huynh trong Reading is Fun.", "Khung Kindergarten: mỗi trẻ thuộc về cộng đồng lớp và đóng góp vào đó, gia đình là đối tác.", "hi", "Rất gần: lớp luôn có nhóm, vai trò và phụ huynh tham gia."],
          ["Self-Regulation and Well-Being (Tự điều chỉnh và khỏe mạnh)", "Xen kẽ hoạt động vận động (TPR) với nhiệm vụ yên tĩnh; em chưa muốn chơi được ngồi xem đến khi sẵn sàng.", "Khung Kindergarten: trẻ học nhận biết cảm xúc, tự điều chỉnh và chăm sóc bản thân.", "mid", "Có nhịp động – tĩnh nhưng chưa dạy tự điều chỉnh một cách có chủ đích và có ghi nhận."],
          ["Demonstrating Literacy and Mathematics Behaviours", "Phonics, chữ cái, thẻ từ, bài hát; đếm và hình khối khi làm bánh.", "Language 2023, Strand B (Nền tảng ngôn ngữ): ngôn ngữ nói, từ vựng, nhận biết âm; kết hợp toán trong trải nghiệm thực.", "hi", "Rất gần, nhất là phần ngôn ngữ nói và từ vựng qua hoạt động."],
          ["Problem Solving and Innovating", "Làm bánh theo thẻ công thức, thí nghiệm, làm sản phẩm rồi trình bày.", "Khung Kindergarten: trẻ thử, đặt câu hỏi, sáng tạo và giải quyết vấn đề qua chơi.", "hi", "Gần: dự án và trải nghiệm là cốt lõi cách dạy."],
          ["Ghi nhận học tập và hỗ trợ học sinh học tiếng Anh", "Ảnh, video và nhận xét hằng tháng gửi phụ huynh; dùng tiếng Việt khi cần.", "Growing Success và pedagogical documentation; ELL policy và thang STEP cho học sinh học tiếng Anh.", "mid", "Có bằng chứng và trao đổi với gia đình nhưng chưa có thang đánh giá như STEP hay mô tả tiến bộ có hệ thống."]
        ] },
      teen: { h: "Đối chiếu với Ontario Curriculum hôm nay: lớp teen (TREE)", lede: "Các bạn học lớp TREE ở độ tuổi khoảng 10–16, tương đương Grades 5–10 ở Ontario. Đối chiếu với Language, Grades 1–8 (2023), chương trình tiếng Anh bậc trung học và ESL/ELD. Đây là phần tác giả tự nhìn lại, không phải thẩm định chính thức.",
        items: [
          ["Giao tiếp nói và trình bày", "Thuyết trình poster, quay vlog, parody, kịch ngắn, nói tại nhà.", "Language 2023, Strand B: ngôn ngữ nói, trình bày; kỹ năng nghe để hiểu.", "hi", "Rất gần: nói và trình bày là trục chính của lớp."],
          ["Làm sản phẩm truyền thông (media)", "Phim ảnh tĩnh, phim ngắn Jurassic, poster, parody.", "Language 2023, Strand A và D: hiểu và sáng tạo văn bản truyền thông, kỹ năng số.", "hi", "Gần: học sinh vừa phân tích vừa tự làm sản phẩm."],
          ["Quá trình viết (dàn ý, nháp, chỉnh sửa)", "Lập dàn ý trước khi quay vlog, miêu tả căn phòng, viết kịch bản.", "Language 2023, Strand D: lập kế hoạch, viết nháp, chỉnh sửa, hoàn thiện và công bố.", "mid", "Có dàn ý và kịch bản nhưng phần viết ít hơn phần nói; cần thêm chu trình nháp – phản hồi – sửa."],
          ["Kỹ năng học tập và thói quen làm việc", "Dự án nhóm, tự học tiếng Anh, thực hành nói ở nhà.", "Growing Success: trách nhiệm, tự tổ chức, làm việc độc lập, hợp tác, chủ động, tự điều chỉnh.", "hi", "Gần: dự án dài hơi rèn các kỹ năng này, dù chưa đánh giá riêng."],
          ["Liên môn và gắn với đời sống", "Khoa học bằng tiếng Anh, nấu món ăn, tìm hiểu phố cổ để quay vlog ngoài trời.", "Ontario khuyến khích kết nối liên môn và học từ trải nghiệm thực.", "hi", "Gần."],
          ["Hỗ trợ học sinh học tiếng Anh (ESL/ELD, STEP)", "Dạy trong bối cảnh tiếng Anh là ngoại ngữ, hỗ trợ bằng tiếng Việt.", "ESL/ELD và STEP mô tả tiến bộ theo từng bước.", "mid", "Có hỗ trợ nhưng chưa dùng thang mô tả theo bậc để theo dõi tiến bộ."]
        ] },
      adult: { h: "Đối chiếu với khung Ontario / Canada hôm nay: lớp người lớn đi làm", lede: "Ontario Curriculum (K–12) không áp dụng cho người lớn. Phần này đối chiếu với Canadian Language Benchmarks (CLB) và cách đánh giá theo danh mục (PBLA) thường dùng trong các chương trình tiếng Anh cho người lớn ở Ontario, cùng tinh thần học lấy người học làm trung tâm. Đây là phần tác giả tự nhìn lại, không phải thẩm định chính thức.",
        items: [
          ["Giao tiếp theo nhiệm vụ đời thực", "Trò chơi, đóng vai, khảo sát nhanh, hoạt động nhóm.", "CLB và cách dạy theo nhiệm vụ: học viên làm việc có thật bằng tiếng Anh.", "hi", "Gần: hoạt động xoay quanh việc làm được bằng tiếng Anh."],
          ["Học qua hoạt động, giảm căng thẳng", "Người đi làm học buổi tối; trò chơi giúp thư giãn sau giờ làm.", "Nguyên tắc học người lớn: môi trường an toàn, người học chủ động, liên quan thực tế.", "hi", "Rất gần."],
          ["Ngôn ngữ gắn với công việc", "Lớp có nhiều trình độ khác nhau (different levels); học viên là nhân viên của nhiều bộ phận khác nhau tại trung tâm điều hành bay cùng học.", "Chương trình tiếng Anh cho nơi làm việc dùng tình huống nghề nghiệp thật.", "mid", "Có gắn nghề nghiệp ở mức chủ đề; vì nhiều trình độ và nhiều bộ phận học chung nên chưa xây dựng bộ nhiệm vụ riêng cho từng vị trí."],
          ["Cân bằng bốn kỹ năng", "Có bài kiểm tra giữa kỳ, cuối kỳ và một bài presentation cuối khóa, theo curriculum do Educap biên soạn; hoạt động trên lớp thiên về nghe và nói.", "CLB mô tả đủ nghe, nói, đọc, viết.", "hi", "Khá gần: chương trình có kiểm tra định kỳ; có thể thêm đọc và viết gắn với công việc."],
          ["Đánh giá tiến bộ", "Phản hồi miệng trong lớp, không có hồ sơ.", "PBLA: hồ sơ minh chứng, mục tiêu I can… và phản hồi định kỳ.", "gap", "Chưa có: hôm nay sẽ thêm hồ sơ mini và bảng “I can…” cho từng học viên."]
        ] }
    } : {
      kids: { h: "Compared with the Ontario curriculum today: preschool and young learners", lede: "Compared with The Kindergarten Program (2016) and Language, Grades 1–8 (2023). This is the author’s own look back, based on teaching in Vietnam; it is not an official review.",
        items: [
          ["Belonging and Contributing", "Group games, sharing materials, presentations for parents at Reading is Fun.", "Kindergarten frame: every child belongs to and contributes to the class community, with families as partners.", "hi", "Very close: there were always groups, roles and parents taking part."],
          ["Self-Regulation and Well-Being", "Movement (TPR) balanced with quiet tasks; a child not ready to play may watch until ready.", "Kindergarten frame: children learn to name feelings, self-regulate and look after themselves.", "mid", "There was a movement–quiet rhythm but self-regulation was not taught or documented on purpose."],
          ["Demonstrating Literacy and Mathematics Behaviours", "Phonics, letters, word cards, songs; counting and shapes while baking.", "Language 2023, Strand B (Foundations of Language): oral language, vocabulary, phonological awareness; maths in real experiences.", "hi", "Very close, especially oral language and vocabulary through activity."],
          ["Problem Solving and Innovating", "Baking from recipe cards, experiments, making products and presenting them.", "Kindergarten frame: children explore, ask questions, create and solve problems through play.", "hi", "Close: projects and experiences were the core of the teaching."],
          ["Documenting learning and supporting English learners", "Photos, videos and monthly notes to parents; Vietnamese used when needed.", "Growing Success and pedagogical documentation; ELL policy and STEP for English learners.", "mid", "There was evidence and talk with families but no STEP-like scale or systematic description of growth."]
        ] },
      teen: { h: "Compared with the Ontario curriculum today: the teen class (TREE)", lede: "TREE students were about 10–16, roughly Grades 5–10 in Ontario. Compared with Language, Grades 1–8 (2023), secondary English and ESL/ELD. This is the author’s own look back, not an official review.",
        items: [
          ["Oral communication and presenting", "Poster presentations, vlogs, parodies, skits, speaking at home.", "Language 2023, Strand B: oral language and presenting; listening to understand.", "hi", "Very close: speaking and presenting were the backbone of the class."],
          ["Making media", "Stop-motion films, short Jurassic films, posters, parodies.", "Language 2023, Strands A and D: understanding and creating media texts, digital skills.", "hi", "Close: students analysed and made their own media."],
          ["The writing process (outline, draft, revise)", "Outlining before a vlog, describing a room, writing scripts.", "Language 2023, Strand D: planning, drafting, revising, editing, publishing.", "mid", "Outlines and scripts were there but writing was lighter than speaking; a draft–feedback–revise cycle would help."],
          ["Learning skills and work habits", "Group projects, self-study of English, speaking practice at home.", "Growing Success: responsibility, organization, independent work, collaboration, initiative, self-regulation.", "hi", "Close: long projects trained these skills though they were not rated separately."],
          ["Cross-curricular and real-life links", "Science in English, cooking, researching the Old Quarter for an outdoor vlog.", "Ontario encourages cross-curricular links and learning from real experience.", "hi", "Close."],
          ["Supporting English learners (ESL/ELD, STEP)", "Taught English as a foreign language with Vietnamese support.", "ESL/ELD and STEP describe growth step by step.", "mid", "Support was there but no stepped scale was used to track progress."]
        ] },
      adult: { h: "Compared with Ontario / Canadian frameworks today: working adults", lede: "The Ontario curriculum (K–12) does not apply to adults. This compares with the Canadian Language Benchmarks (CLB) and portfolio-based assessment (PBLA) commonly used in adult English programs in Ontario, and with learner-centred adult-education principles. It is the author’s own look back, not an official review.",
        items: [
          ["Real-life, task-based communication", "Games, role-plays, quick surveys, group tasks.", "CLB and task-based teaching: learners do real things in English.", "hi", "Close: activities centred on what learners could do in English."],
          ["Learning through activity, lower stress", "Learners came after work; games helped them relax.", "Adult-learning principles: a safe setting, active learners, relevance.", "hi", "Very close."],
          ["Language tied to the workplace", "A mixed-level class (different levels): learners from many different departments of the air traffic control centre studied together.", "Workplace English uses real job situations.", "mid", "The job was a theme, but with mixed levels and many departments in one room, no dedicated tasks per role were built."],
          ["Balance of four skills", "A midterm test, a final test and a final presentation, following the curriculum compiled by Educap; in-class activities leaned towards listening and speaking.", "CLB covers listening, speaking, reading and writing.", "hi", "Fairly close: periodic tests were built in; I could add workplace reading and writing."],
          ["Assessing progress", "Spoken feedback in class, no portfolio.", "PBLA: a portfolio of evidence, “I can…” goals and regular feedback.", "gap", "Not there: today I would add a mini-portfolio and an “I can…” checklist for each learner."]
        ] }
    };
    var LV = vi ? { hi: "Rất gần", mid: "Gần một phần", gap: "Còn khoảng cách" } : { hi: "Strong match", mid: "Partial match", gap: "A gap" };
    function ontHtml() {
      var O = ONT[cat]; if (!O) return "";
      return '<section class="ont" aria-labelledby="ont-h"><div class="ont-top"><p class="eyebrow">Ontario Curriculum · ' + (vi ? "thời điểm hiện tại" : "today") + '</p><h2 id="ont-h">' + esc(O.h) + '</h2><p>' + esc(O.lede) + '</p></div><div class="ont-body"><div class="ont-grid">' +
        O.items.map(function (it) { return '<article class="ont-item"><h3>' + esc(it[0]) + '</h3><span class="lvl ' + it[3] + '">' + LV[it[3]] + '</span><div class="row2"><div><b>' + (vi ? "Điều tôi đã làm" : "What I did") + '</b>' + esc(it[1]) + '</div><div><b>Ontario</b>' + esc(it[2]) + '</div><div><b>' + (vi ? "Nhận xét" : "Reflection") + '</b>' + esc(it[4]) + '</div></div></article>'; }).join("") +
        '</div><p class="ont-note">' + (vi ? "Mức độ phù hợp do tác giả tự đánh giá (aligned with, không phải được công nhận). Nên đối chiếu lại với văn bản chương trình chính thức tại dcp.edu.gov.on.ca trước khi trích dẫn." : "Match levels are the author’s own judgement (aligned with, not accredited). Check the official documents at dcp.edu.gov.on.ca before quoting.") + '</p></div></section>';
    }
    var CT = vi ? {
      kids: ["Lớp mầm non và trẻ nhỏ: một câu chuyện xuyên suốt", "Từ những học trò đầu tiên năm 2015 đến lớp học mẫu 4–5 tuổi năm 2022: trò chơi, dự án, học trực tuyến trong Covid và học mà chơi ở trường mầm non."],
      teen: ["Lớp teen (TREE): một câu chuyện xuyên suốt", "Từ tháng 7/2017 đến 10/2020, một nhóm bạn đi cùng cô từ lúc khoảng 10 tuổi: học theo dự án, làm phim, thuyết trình và tự học. Có cả sản phẩm do chính các bạn tạo ra."],
      adult: ["Lớp người lớn đi làm: một câu chuyện xuyên suốt", "Khóa tiếng Anh năm 2016 dành cho người đi làm: học qua hoạt động để giảm căng thẳng sau giờ làm."],
      story: ["Chia sẻ câu chuyện giảng dạy chung", "Từ phòng thí nghiệm tại gia, đào tạo giáo viên, chuyển sang Canada đến ngoại giao giáo dục Canada – Việt Nam; kèm học liệu và giáo án gốc."],
      phil: ["Triết lý giảng dạy cá nhân", "Vì sao tôi viết lại cách dạy, làm học liệu và chọn học qua trải nghiệm."]
    } : {
      kids: ["Preschool and young learners: one continuous story", "From the first students in 2015 to the model class for 4–5-year-olds in 2022: games, projects, online lessons during Covid and learning through play in preschool."],
      teen: ["The teen class (TREE): one continuous story", "From July 2017 to October 2020, a group of friends walked with me from about age 10: project-based learning, films, presentations and self-study, including work the students made themselves."],
      adult: ["Working adults: one continuous story", "A 2016 English course for people at work: learning through activities to ease the stress after a long day."],
      story: ["The shared teaching story", "From the home lab to teacher training, moving to Canada and Canada–Vietnam education diplomacy, with original materials and lesson plans."],
      phil: ["My teaching philosophy", "Why I rewrote the way I teach, made materials and chose learning by doing."]
    };
    T.h = CT[cat][0]; T.lede = CT[cat][1];
    var N = BNAME(vi), order = ["kids", "teen", "adult", "story", "phil"];
    var sibs = '<nav class="sibs" aria-label="' + (vi ? "Các nhánh thư viện" : "Library branches") + '">' + order.map(function (b) { return '<a class="' + BR[b] + '" href="#gallery-' + b + '"' + (b === cat ? ' aria-current="page"' : "") + '><span aria-hidden="true">' + BICON[b] + '</span>' + esc(N[b]) + '</a>'; }).join("") + '</nav>';
    function ul(a) { return '<ul class="lst">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
    var html = '<p class="crumb-lib"><a href="#gallery">← Teaching Portfolio</a></p><section class="branch-head ' + BR[cat] + '"><p class="eyebrow">' + T.eye + '</p><h1 id="page-h">' + esc(T.h) + '</h1><p class="lede" style="max-width:72ch">' + esc(T.lede) + '</p><p class="consent">' + esc(T.consent) + '</p>' + sibs + '</section>' +
      '<section aria-labelledby="tl-h" class="' + BR[cat] + '"><h2 id="tl-h" style="margin-bottom:12px">' + T.tl_h + '</h2>' + infoPath(vi, J, cat) + '</section>';
    html += JC.map(function (c) {
      var full = chFull(c), extra = "";
      if (full && c.extra === "kids") extra = '<h3 style="margin-top:22px">' + T.more_h + '</h3>' + galGrid(G.kids);
      if (full && c.extra === "teach") extra = galGrid(G.teach.filter(function (g, i) { return i === 1; })) + '<h3 style="margin-top:22px">' + T.tl_h2 + '</h3><ol class="timeline">' + G.tl.map(function (e) { return '<li><span class="yr">' + esc(e[0]) + '</span><div>' + esc(e[1]) + '</div></li>'; }).join("") + '</ol>' + galGrid(G.teach.filter(function (g, i) { return i !== 1; }));
      var groups = c.g ? chGroups(c).map(function (g) { return '<section class="gal-sec"><h3>' + esc(g.h) + (isStu(g) ? '<span class="stu-tag">' + (vi ? "Sản phẩm của học sinh" : "Student work") + '</span>' : "") + '</h3>' + mediaGrid(g.items) + '</section>'; }).join("") : "";
      return '<section class="jr-ch" id="jr-' + c.id + '"><p class="eyebrow">' + esc(c.yr) + '</p><h2>' + esc(c.h) + '</h2>' +
        (!full ? "" : c.p.map(function (p) { return '<p style="max-width:70ch">' + esc(p) + '</p>'; }).join("")) +
        (!full ? "" : c.l ? '<aside class="x-note"><p class="eyebrow">' + T.lesson + '</p><p>' + esc(c.l) + '</p></aside>' : "") +
        (!full ? "" : c.q ? '<blockquote class="jr-q"><p>“' + esc(c.q) + '”</p><cite>— Phan Thị Quỳnh Trang</cite></blockquote>' : "") +
        (!full ? "" : (c.m && c.m.length ? mediaGrid(c.m) : "") + (c.yt ? ytHtml(c.yt) : "")) + (full && c.more ? '<p><a class="btn ghost" href="' + c.more.href + '"' + (c.more.ext ? ' target="_blank" rel="noopener"' : "") + '>' + esc(c.more.h) + ' →</a></p>' : "") + groups + extra + '</section>';
    }).join("");
    if (cat === "phil") html += '<section class="hub-sec"><h2>' + (vi ? "Đọc thêm về cách tôi nghĩ" : "More on how I think") + '</h2><div class="hub-grid"><a class="hub-card k-phil" href="#perspective"><span class="ico" aria-hidden="true">\ud83c\udf0f</span><h3>' + t("nav_persp") + '</h3><p>' + (vi ? "So sánh cách dạy và học ở Canada và Việt Nam." : "How teaching and learning compare in Canada and Vietnam.") + '</p><span class="go">' + (vi ? "Xem →" : "Open →") + '</span></a><a class="hub-card k-phil" href="#about"><span class="ico" aria-hidden="true">\ud83d\udc69\u200d\ud83c\udfeb</span><h3>' + t("nav_about") + '</h3><p>' + (vi ? "Hành trình nghề nghiệp và các dự án của tác giả." : "The author’s career path and projects.") + '</p><span class="go">' + (vi ? "Xem →" : "Open →") + '</span></a></div></section>';
    html += ontHtml() + (cat !== "story" ? "" : '<section id="originals"><h2>' + T.orig_h + '</h2><p class="msg" style="max-width:70ch;margin-bottom:12px">' + T.orig_p + '</p>' + origMaterials(vi) + '</section>') + ackHtml() +
      '<dialog class="lightbox" id="lb"><figure><img alt=""><figcaption></figcaption></figure><div class="lb-nav"><button type="button" data-lb="-1" aria-label="' + (vi ? "Ảnh trước" : "Previous photo") + '">‹</button><button type="button" data-lb="close">' + (vi ? "Đóng" : "Close") + '</button><button type="button" data-lb="1" aria-label="' + (vi ? "Ảnh sau" : "Next photo") + '">›</button></div></dialog>';
    return html;
  }
  function origMaterials(vi) {
    function tbl(head, rows) { return '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join("") + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return i === 0 ? '<th scope="row">' + esc(c) + '</th>' : '<td>' + esc(c) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>'; }
    function ul(a) { return '<ul class="lst">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
    var FB_EN = ["I really appreciate the effort and energy you all put in the lesson. There are diverse activities which aim to give students many opportunities to be exposed to and learn the language. But there are several issues for your consideration:", "Set up the context: In a real primary classroom, there’s not much space for students to move around. And the context is somehow more serious compared to the kindergarten classes.", "Writing: Children aged 6 need to have quiet time in class to practise handwriting with vocabulary/structures learnt.", "Activities: Children aged 6 need time to enhance their concentration individually in specific task. So too many activities that require them to move or react will make them tired very soon. Teacher’s talking time in several parts is a bit too much (check listening ex).", "Story-telling: it’s more of show and tell."];
    var J = vi ? {
      t: "Giáo án gốc: Jungle Animals (60 phút, trẻ 6 tuổi) – kèm nhận xét và điểm của giảng viên",
      meta: "Giáo án dạy thực hành ngày 18/6/2018 trong khóa đào tạo giáo viên tại Trường Đại học Hà Nội, do nhóm “Super busy kids” gồm Nguyễn Thúy Nga, Ngô Thu Hà, Lê Thị Hồng và Phan Thị Quỳnh Trang soạn và dạy. Khung giáo án theo Australian International TESOL, do Trang Phan chỉnh sửa. Bản gốc được giữ nguyên để giáo viên mới thấy một giáo án thật trông như thế nào, điểm mạnh ở đâu và cần sửa gì.",
      info: [["Chủ đề", "Jungle Animals"], ["Đối tượng", "Trẻ 6 tuổi, trình độ Beginner, đã học cùng giáo viên 4 tuần, thuộc bảng chữ cái A–Z và đã học phonics"], ["Thời lượng", "60 phút"], ["Kỹ năng", "Nghe, nói; kỹ năng vận động, tư duy, làm việc nhóm"], ["Phương pháp", "TPR; Natural approach; Direct method; Audio-lingual"], ["Từ vựng · mẫu câu", "lion, horse, monkey, frog, snake · It’s a …"], ["Đồ dùng", "Thẻ tranh, đồ vật thật, booklet, phiếu bài tập, phông nền rừng, mũ và túi nhà thám hiểm"]],
      dev_h: "Đặc điểm phát triển của trẻ 6 tuổi (nhóm tìm hiểu trước khi soạn)", dev: ["Nói câu đơn giản nhưng đầy đủ 5–7 từ; làm theo chuỗi ba chỉ dẫn liên tiếp.", "Bắt đầu hiểu một từ có nhiều nghĩa, nên thích câu đố và hoạt động đùa chữ.", "Sự chấp nhận của bạn bè trở nên quan trọng; trẻ học hợp tác và chia sẻ, bắt đầu chơi được hoạt động có luật."],
      head: ["Giai đoạn", "Hoạt động", "Lời giáo viên (trích bản gốc)", "Thời gian"],
      rows: [["Ice breaker", "Giáo viên vào vai nhà thám hiểm, chia hai đội đỏ – xanh, nêu quy tắc và thưởng sao cho câu trả lời đúng.", "“Hellooooo! How are you today?” · “Can you fight in class?” · “Look! This is a jungle and I’m an explorer.”", "1 phút"], ["Warm-up", "Run through the jungle: nhảy qua khúc gỗ, nhấc cao gối qua cát lún, chạy trốn hổ, nhón chân qua rắn, nói chuyện với khỉ. Em nào chưa muốn chơi được ngồi xem đến khi sẵn sàng.", "“Wear your hat, follow me.” · “I jump over the logs.”", "5 phút"], ["Dạy từ mới (Ms Nga)", "Ngồi vòng tròn; thẻ tranh A5 ép plastic; đọc mẫu 5 lần; lặp lại cả lớp, theo đội, từng em; sửa lỗi tối đa 2 lần.", "“Look, listen, and quiet.” · “It is a frog – frog – frog.” · “Good try!”", "10 phút"], ["Nhiệm vụ 1 (Ms Hà)", "Hot seat: giáo viên giả tiếng kêu và động tác để trẻ đoán; hai em quay lưng với bảng, cả lớp diễn tả để bạn đoán. Letter matching: mỗi đội ghép tên con vật từ túi chữ cái A–Z rồi bấm chuông.", "“Do not look back.” · “What animal is this? It is a lion, L-I-O-N.”", "15 phút"], ["Nhiệm vụ 2 (Ms Hồng)", "Ôn từ bằng đánh vần (L-L-Lion); nói câu với thẻ tranh; sắp xếp từ thành câu; phiếu: nghe – khoanh tranh, nghe – khoanh từ và nối câu với tranh.", "“Quiet, listen and repeat.” · “Exercise 1: listen and tick.”", "15 phút"], ["Củng cố (Ms Trang)", "In dấu vân tay thành con vật; kể truyện tranh tự làm trong vòng tròn; chào tạm biệt ở cửa bằng một câu với thẻ tranh. Dự phòng: tô màu booklet có câu đầy đủ.", "“Where’s your daddy finger? Press, then print.” · “Tadaaa, it is a monkey!”", "13 phút"]],
      ph_h: "Ảnh buổi dạy thực hành",
      ph: [["img/jg-01.jpg", "Các giáo viên trong vai học sinh đội mũ nhà thám hiểm, ôm túi đỏ, ngồi cười trên hàng ghế trong phòng học.", "Học viên trong vai “nhà thám hiểm”"], ["img/jg-02.jpg", "Nhóm giáo viên đứng trước màn chiếu giáo án Jungle Animals, cạnh bảng ghi ngày Monday, June 18th, 2018, trao đổi với các học viên đang ngồi.", "Nhóm trình bày giáo án"], ["img/jg-03.jpg", "Một giáo viên phát phiếu bài tập cho học viên đội mũ cao bồi, khoác túi đỏ.", "Phát phiếu bài tập"]],
      sc_h: "Kết quả đánh giá: 92/100 điểm",
      sc_p: "Chấm theo phiếu quan sát và đánh giá giờ dạy của khóa học, gồm sáu nhóm tiêu chí:",
      sc_head: ["Nhóm tiêu chí", "Điểm đạt"],
      sc: [["Xác định mục tiêu và lập kế hoạch bài dạy", "38"], ["Sử dụng nguồn học liệu và điều chỉnh tài liệu", "18"], ["Sửa lỗi và đánh giá tiến bộ", "9"], ["Giao tiếp rõ ràng", "10"], ["Quản lý lớp học", "9"], ["Tương tác trong lớp", "8"], ["Tổng", "92/100"]],
      fb_h: "Nhận xét của giảng viên (nguyên văn)",
      fbvi_h: "Tạm dịch",
      fbvi: ["Cô rất trân trọng công sức và năng lượng các bạn dành cho tiết dạy. Các hoạt động đa dạng, tạo nhiều cơ hội để học sinh tiếp xúc và học ngôn ngữ. Tuy vậy, có một số điểm các bạn cần cân nhắc:", "Bối cảnh: lớp tiểu học thật không có nhiều chỗ để học sinh di chuyển, và không khí lớp học nghiêm túc hơn lớp mẫu giáo.", "Viết: trẻ 6 tuổi cần có thời gian yên tĩnh trên lớp để luyện viết từ vựng và mẫu câu vừa học.", "Hoạt động: trẻ 6 tuổi cần thời gian rèn sự tập trung cá nhân vào một nhiệm vụ cụ thể. Quá nhiều hoạt động phải vận động hoặc phản xạ sẽ khiến trẻ nhanh mệt. Thời gian giáo viên nói ở một số phần hơi nhiều (xem lại bài nghe).", "Kể chuyện: phần này giống “show and tell” hơn là kể chuyện."],
      ls_h: "Bài học cho giáo viên mới",
      ls: ["Soạn theo đúng không gian lớp thật: chuẩn bị phương án vận động tại chỗ khi lớp đông, bàn ghế cố định.", "Cân bằng “động” và “tĩnh”: sau mỗi hoạt động vận động nên có một nhiệm vụ cá nhân yên tĩnh, ví dụ luyện viết từ vừa học.", "Giảm lời giáo viên: hướng dẫn ngắn, làm mẫu một lần rồi để học sinh làm.", "Kể chuyện thật sự cần giọng kể, câu hỏi dự đoán và tương tác, không chỉ giơ tranh và gọi tên."],
      on_h: "Nhìn lại năm 2026: đối chiếu với chương trình Ontario (aligned with)",
      on: ["Language, Grades 1–8 (2023) – B1.1: nghe và làm theo chuỗi chỉ dẫn trong hoạt động vận động.", "B2.2: nhận biết và dùng từ vựng về con vật.", "B1.5: dùng cấu trúc câu đơn giản “It’s a …” khi nói.", "A1.2: tham gia chủ động qua làm việc đội, hoạt động và sản phẩm thủ công.", "ESL/ELD – STEP 1: học sinh mới bắt đầu, cần nhiều hỗ trợ trực quan và vận động.", "Nhận xét của giảng viên về thời gian viết yên tĩnh trùng với mạch D (Composition): nếu dạy lại, nên thêm 5 phút viết “It’s a … ” có tranh minh họa."]
    } : {
      t: "Original lesson plan: Jungle Animals (60 minutes, age 6) – with the trainer’s feedback and score",
      meta: "A practicum lesson taught on 18 June 2018 in a teacher-training course at Hanoi University, planned and taught by the “Super busy kids” team: Nguyễn Thúy Nga, Ngô Thu Hà, Lê Thị Hồng and Phan Thị Quỳnh Trang. Lesson-plan format by Australian International TESOL, adapted by Trang Phan. The original is kept as it was so new teachers can see what a real plan looks like, what worked and what needed fixing.",
      info: [["Topic", "Jungle Animals"], ["Learners", "Age 6, beginners, four weeks with the teacher, know the A–Z alphabet and have learned phonics"], ["Length", "60 minutes"], ["Skills", "Listening, speaking; motor, thinking and teamwork skills"], ["Approach", "TPR; Natural approach; Direct method; Audio-lingual"], ["Vocabulary · structure", "lion, horse, monkey, frog, snake · It’s a …"], ["Materials", "Flashcards, real objects, booklet, worksheet, jungle backdrop, explorer hats and bags"]],
      dev_h: "Developmental milestones of a 6-year-old (researched before planning)", dev: ["Speaks in simple but complete sentences of five to seven words; follows a series of three commands.", "Starts to see that words can have more than one meaning, so enjoys jokes and puns.", "Peer acceptance matters more; children learn to cooperate and share and can play organized games."],
      head: ["Stage", "Activity", "Teacher language (from the original)", "Time"],
      rows: [["Ice breaker", "The teacher plays a jungle explorer, makes red and blue teams, sets rules and gives stars for good answers.", "“Hellooooo! How are you today?” · “Can you fight in class?” · “Look! This is a jungle and I’m an explorer.”", "1 min"], ["Warm-up", "Run through the jungle: jump over logs, high knees through quicksand, run from the tiger, tiptoe past the snake, talk to the monkeys. Children not ready to play may watch until they want to join.", "“Wear your hat, follow me.” · “I jump over the logs.”", "5 min"], ["Teach new words (Ms Nga)", "Circle time; laminated A5 flashcards; model five times; whole class, teams, individuals; correct at most twice.", "“Look, listen, and quiet.” · “It is a frog – frog – frog.” · “Good try!”", "10 min"], ["Task 1 (Ms Hà)", "Hot seat: the teacher makes animal sounds and actions for children to guess; two children face away while the class acts. Letter matching: teams build animal names from A–Z letter bags and ring the bell.", "“Do not look back.” · “What animal is this? It is a lion, L-I-O-N.”", "15 min"], ["Task 2 (Ms Hồng)", "Review by spelling (L-L-Lion); sentences with flashcards; reorder words into sentences; worksheet: listen and circle pictures, listen, circle words and match sentences to pictures.", "“Quiet, listen and repeat.” · “Exercise 1: listen and tick.”", "15 min"], ["Follow-up (Ms Trang)", "Fingerprint animals; a hand-made story in a circle; goodbye at the door with one sentence per flashcard. Back-up: colour a booklet with full sentences.", "“Where’s your daddy finger? Press, then print.” · “Tadaaa, it is a monkey!”", "13 min"]],
      ph_h: "Photos from the practicum",
      ph: [["img/jg-01.jpg", "Teachers playing students sit in a row wearing explorer hats and holding red bags, smiling.", "Trainees as “jungle explorers”"], ["img/jg-02.jpg", "The team stands by the Jungle Animals slide and a board dated Monday, June 18th, 2018, talking with seated trainees.", "Presenting the plan"], ["img/jg-03.jpg", "A teacher hands out worksheets to a trainee wearing a cowboy hat and a red bag.", "Handing out worksheets"]],
      sc_h: "Assessment result: 92/100",
      sc_p: "Scored on the course’s lesson observation and evaluation form, across six groups of criteria:",
      sc_head: ["Criteria", "Points"],
      sc: [["Setting goals and planning lessons", "38"], ["Using resources and adapting materials", "18"], ["Correcting errors and assessing progress", "9"], ["Communicating clearly", "10"], ["Classroom management", "9"], ["Classroom dynamics", "8"], ["Total", "92/100"]],
      fb_h: "Trainer’s feedback (original wording)",
      fbvi_h: "", fbvi: [],
      ls_h: "Lessons for new teachers",
      ls: ["Plan for the real room: have on-the-spot movement options for large classes with fixed desks.", "Balance active and quiet: after each movement game, add a quiet individual task such as writing the new words.", "Cut teacher talk: short instructions, model once, then let students do it.", "Real storytelling needs voice, prediction questions and interaction, not just holding up pictures and naming them."],
      on_h: "Looking back in 2026: alignment with the Ontario curriculum (aligned with)",
      on: ["Language, Grades 1–8 (2023) – B1.1: listen to and follow a series of instructions in movement games.", "B2.2: recognize and use animal vocabulary.", "B1.5: use the simple structure “It’s a …” in speech.", "A1.2: participate actively through teamwork, games and crafts.", "ESL/ELD – STEP 1: beginning learners who need strong visual and movement support.", "The trainer’s point about quiet writing time matches strand D (Composition): if taught again, add 5 minutes of writing “It’s a …” with a drawing."]
    };
    function jHtml() {
      var tb = function (rows) { return '<div class="tbl-wrap"><table class="tbl"><tbody>' + rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join("") + '</tbody></table></div>'; };
      return '<p>' + esc(J.meta) + '</p>' + tb(J.info) +
        '<h4>' + esc(J.ph_h) + '</h4><div class="gal jg">' + J.ph.map(function (it) { var i = GAL_FLAT.push(it) - 1; return '<figure class="photo"><button type="button" class="gal-btn" data-gi="' + i + '" aria-label="' + esc((vi ? "Phóng to ảnh: " : "Enlarge photo: ") + it[2]) + '"><img src="' + esc((CFG.base || "") + it[0]) + '" alt="' + esc(it[1]) + '" loading="lazy" decoding="async"></button><figcaption>' + esc(it[2]) + '</figcaption></figure>'; }).join("") + '</div>' +
        '<h4>' + esc(J.dev_h) + '</h4>' + ul(J.dev) + tbl(J.head, J.rows) +
        '<h4>' + esc(J.sc_h) + '</h4><p>' + esc(J.sc_p) + '</p>' + tbl(J.sc_head, J.sc) +
        '<h4>' + esc(J.fb_h) + '</h4><blockquote class="fb" lang="en">' + '<p>' + esc(FB_EN[0]) + '</p>' + ul(FB_EN.slice(1)) + '</blockquote>' +
        (J.fbvi.length ? '<h4>' + esc(J.fbvi_h) + '</h4><p>' + esc(J.fbvi[0]) + '</p>' + ul(J.fbvi.slice(1)) : '') +
        '<h4>' + esc(J.ls_h) + '</h4>' + ul(J.ls) + '<aside class="x-note"><p class="eyebrow">' + esc(J.on_h) + '</p>' + ul(J.on) + '</aside>';
    }
    var TPL = vi ? [
      { t: "Mẫu báo cáo học tập tháng gửi phụ huynh",
        p: "Viết theo tinh thần Growing Success (2010) và mẫu Communication of Learning của chương trình Kindergarten Ontario (2016): mô tả bằng lời điều trẻ đã học, sự tiến bộ và bước tiếp theo, thay vì chỉ liệt kê nội dung hay cho điểm.",
        parts: [
          { h: "Phần 1. Thông tin chung", tbl: [["Mục", "Gợi ý điền"], [["Tháng / chủ đề", "Ví dụ: Tháng 9 – Family, Friends, My hobbies"], ["Mục tiêu học tập (We are learning to…)", "Giới thiệu bản thân và gia đình bằng 3–5 câu"], ["Từ vựng và mẫu câu trọng tâm", "Khoảng 10–15 từ chính; Hello! Nice to meet you! This is my…"], ["Dự án / sản phẩm", "Ví dụ: My family lapbook"]]] },
          { h: "Phần 2. Nhận xét theo bốn mạch của chương trình Language (2023)", tbl: [["Mạch", "Điều con đã học (Key learning)", "Con đã tiến bộ (Growth)", "Bước tiếp theo (Next steps)"], [["B. Nền tảng ngôn ngữ: nghe – nói, từ vựng, phát âm", "Ví dụ: con nghe và làm theo 2–3 chỉ dẫn liên tiếp", "Con bắt đầu nói câu đầy đủ thay vì chỉ một từ", "Luyện hỏi lại: “Can you say it again, please?”"], ["C. Đọc hiểu", "Con nhận ra từ quen thuộc trong truyện tranh", "", ""], ["D. Viết và sáng tạo", "Con viết tên và một câu ngắn có hình minh họa", "", ""], ["A. Kết nối và vận dụng", "Con dùng tiếng Anh trong hoạt động và khi thuyết trình sản phẩm", "", ""]]] },
          { h: "Phần 3. Kỹ năng học tập và thói quen làm việc (Learning skills)", tbl: [["Kỹ năng", "Mức (E · G · S · N)", "Ví dụ cụ thể giáo viên quan sát được"], [["Trách nhiệm (Responsibility)", "", ""], ["Tổ chức (Organization)", "", ""], ["Làm việc độc lập (Independent work)", "", ""], ["Hợp tác (Collaboration)", "", ""], ["Chủ động (Initiative)", "", ""], ["Tự điều chỉnh (Self-regulation)", "", ""]]], note: "E – Xuất sắc · G – Tốt · S – Đạt · N – Cần cải thiện (thang đo của Growing Success)." },
          { h: "Phần 4. Đồng hành cùng con ở nhà", ul: ["Một hoạt động 10 phút phụ huynh có thể làm cùng con trong tháng tới.", "Phụ huynh được khuyến khích trò chuyện với con bằng tiếng mẹ đẻ về điều con học: hiểu sâu ở tiếng mẹ đẻ sẽ hỗ trợ việc học tiếng Anh.", "Ô phản hồi của phụ huynh gửi lại giáo viên."] }
        ],
        x: ["Ontario: báo cáo mô tả bằng lời, nhấn mạnh tiến bộ và bước tiếp theo; kỹ năng học tập được đánh giá riêng với kết quả môn học.", "Việt Nam: Thông tư 27/2020 về đánh giá học sinh tiểu học cũng ưu tiên nhận xét thường xuyên bằng lời. Mẫu này giữ phần từ vựng và mẫu câu cụ thể mà phụ huynh Việt Nam quen theo dõi, đồng thời bổ sung bước tiếp theo theo cách làm của Ontario."] },
      { t: "Mẫu phiếu nhắc lại kiến thức (phụ huynh cùng con ôn bài)",
        p: "Phiếu một trang gửi về nhà mỗi tuần. Phiếu tạo kênh trao đổi hai chiều giữa nhà trường và gia đình, đồng thời giúp con tự đánh giá việc học của mình (assessment as learning).",
        parts: [
          { h: "1. Cùng đọc to – Let’s read aloud together!", tbl: [["Chữ cái của tuần", "Từ minh họa"], [["A a", "apple · ant · ax · alligator"], ["B b", "bear · bed · bird · banana"]]] },
          { h: "2. Nhìn tranh và nói", ul: ["Con chỉ vào tranh và nói từ; phụ huynh đánh dấu ✓ những từ con nhớ.", "Mức thử thách: con đặt một câu với từ đó, ví dụ “I like bananas.”"] },
          { h: "3. Con tự đánh giá", ul: ["Con tô một khuôn mặt: 😀 Con nói được hết · 🙂 Con nói được một số từ · 🤔 Con cần ôn thêm."] },
          { h: "4. Kết nối với tiếng mẹ đẻ", ul: ["Hỏi con bằng tiếng Việt: “Từ này nghĩa là gì? Nhà mình có đồ vật này không?”", "Phụ huynh không cần giỏi tiếng Anh: chỉ cần nghe con nói, khen ngợi và dùng file âm thanh hoặc mã QR giáo viên gửi kèm để nghe phát âm chuẩn."] },
          { h: "5. Phản hồi gửi giáo viên", ul: ["Con thích nhất từ nào? Con gặp khó ở đâu? Một điều phụ huynh muốn chia sẻ."] }
        ],
        x: ["Ontario: chính sách hỗ trợ học sinh học tiếng Anh (ELL, 2007) khuyến khích gia đình duy trì tiếng mẹ đẻ; tự đánh giá là một phần của đánh giá như là học tập trong Growing Success.", "Việt Nam: phụ huynh rất quan tâm việc ôn bài ở nhà. Phiếu chuyển việc “kiểm tra bài” thành 10 phút trò chuyện vui, giới hạn 8 từ mỗi tuần để con không quá tải."] },
      { t: "Mẫu phiếu quan sát học sinh",
        p: "Dùng trong giờ học để ghi bằng chứng học tập theo ba nguồn của Growing Success: quan sát (O), trò chuyện (C) và sản phẩm (P). Mỗi em một phiếu, ghi ngắn gọn và có ngày tháng để theo dõi tiến bộ, kết hợp với thang Steps to English Proficiency (STEP) cho học sinh học tiếng Anh.",
        parts: [
          { h: "Phần A. Hành vi ngôn ngữ quan sát được", tbl: [["Tiêu chí", "Biểu hiện", "Mức độ", "Nguồn (O / C / P) · ngày"], [["Nghe hiểu", "Làm theo 2–3 chỉ dẫn liên tiếp, có hoặc không cần cử chỉ hỗ trợ", "", ""], ["Nói", "Dùng từ hoặc câu mục tiêu; tự tin nói trước nhóm", "", ""], ["Từ vựng", "Gọi tên và dùng đúng từ của chủ đề", "", ""], ["Đọc – viết sơ khởi", "Nhận ra chữ cái hoặc từ quen; viết hoặc vẽ để diễn đạt ý", "", ""]]], note: "Mức độ: Bắt đầu · Đang phát triển · Vững vàng · Mở rộng. Có thể ghi thêm bước STEP (1–6) của em." },
          { h: "Phần B. Kỹ năng học tập (Learning skills)", tbl: [["Kỹ năng", "Biểu hiện quan sát được", "E · G · S · N"], [["Hợp tác", "Chờ lượt, giúp bạn, chia sẻ đồ dùng", ""], ["Chủ động", "Tự tham gia, đặt câu hỏi", ""], ["Tự điều chỉnh", "Kiên trì khi gặp khó, biết xin giúp đỡ", ""], ["Làm việc độc lập", "Hoàn thành nhiệm vụ với ít nhắc nhở", ""]]] },
          { h: "Phần C. Tổng hợp", ul: ["Một điểm mạnh nổi bật của em.", "Một bước tiếp theo cụ thể cho em (next step).", "Hỗ trợ cần có: hình ảnh, bạn đồng hành, thời gian thêm, tiếng mẹ đẻ."] }
        ],
        x: ["Ontario: đánh giá dựa trên nhiều nguồn bằng chứng và tài liệu hóa quá trình học (pedagogical documentation); kỹ năng học tập được ghi riêng.", "Việt Nam: lớp đông 40–45 em nên mỗi buổi chỉ cần quan sát kỹ 5–6 em theo vòng xoay; sau hai tuần, giáo viên có ghi chép cho cả lớp để viết nhận xét thường xuyên."] }
    ] : [
      { t: "Template: monthly learning report to parents",
        p: "Written in the spirit of Growing Success (2010) and Ontario’s Kindergarten Communication of Learning (2016): describe in words what the child learned, how they grew and the next steps, rather than only listing content or giving marks.",
        parts: [
          { h: "Part 1. General information", tbl: [["Item", "Suggested entry"], [["Month / topics", "e.g. September – Family, Friends, My hobbies"], ["Learning goal (We are learning to…)", "Introduce myself and my family in 3–5 sentences"], ["Key vocabulary and structures", "About 10–15 core words; Hello! Nice to meet you! This is my…"], ["Project / product", "e.g. My family lapbook"]]] },
          { h: "Part 2. Comments across the four strands of Language (2023)", tbl: [["Strand", "Key learning", "Growth in learning", "Next steps"], [["B. Foundations: oral language, vocabulary, pronunciation", "e.g. follows 2–3 instructions in a row", "Now speaks in full sentences instead of single words", "Practise asking: “Can you say it again, please?”"], ["C. Comprehension", "Recognizes familiar words in picture books", "", ""], ["D. Composition", "Writes their name and a short sentence with a drawing", "", ""], ["A. Literacy connections and applications", "Uses English in games and when presenting a product", "", ""]]] },
          { h: "Part 3. Learning skills and work habits", tbl: [["Skill", "Rating (E · G · S · N)", "Specific example observed"], [["Responsibility", "", ""], ["Organization", "", ""], ["Independent work", "", ""], ["Collaboration", "", ""], ["Initiative", "", ""], ["Self-regulation", "", ""]]], note: "E – Excellent · G – Good · S – Satisfactory · N – Needs improvement (Growing Success scale)." },
          { h: "Part 4. Learning together at home", ul: ["One 10-minute activity families can do with their child next month.", "Families are encouraged to talk with their child in their home language about what they learned: deep understanding in the first language supports English learning.", "A space for parents to reply to the teacher."] }
        ],
        x: ["Ontario: reports describe learning in words, focus on growth and next steps, and rate learning skills separately from subject achievement.", "Vietnam: Circular 27/2020 on primary assessment also favours ongoing written comments. This template keeps the specific vocabulary and sentence patterns Vietnamese parents like to follow, and adds Ontario-style next steps."] },
      { t: "Template: weekly review sheet (parents review with their child)",
        p: "A one-page sheet sent home each week. It opens two-way communication between school and family and lets the child assess their own learning (assessment as learning).",
        parts: [
          { h: "1. Let’s read aloud together!", tbl: [["Letter of the week", "Picture words"], [["A a", "apple · ant · ax · alligator"], ["B b", "bear · bed · bird · banana"]]] },
          { h: "2. Look and say", ul: ["The child points to each picture and says the word; parents tick ✓ the words remembered.", "Challenge: make a sentence with the word, e.g. “I like bananas.”"] },
          { h: "3. I check my learning", ul: ["The child colours a face: 😀 I can say them all · 🙂 I can say some · 🤔 I need more practice."] },
          { h: "4. Home-language connection", ul: ["Ask in the home language: “What does this word mean? Do we have this at home?”", "Parents do not need to be fluent in English: listen, praise, and use the audio file or QR code from the teacher to hear the correct pronunciation."] },
          { h: "5. Note to the teacher", ul: ["Which word did your child like most? What was hard? Anything you would like to share."] }
        ],
        x: ["Ontario: the English Language Learners policy (2007) encourages families to keep using their first language; self-assessment is part of assessment as learning in Growing Success.", "Vietnam: parents care a great deal about homework. The sheet turns “checking homework” into a cheerful 10-minute chat, limited to 8 words a week so children are not overloaded."] },
      { t: "Template: student observation sheet",
        p: "Use during lessons to record evidence of learning from the three sources named in Growing Success: observations (O), conversations (C) and products (P). One sheet per child, short dated notes to track growth, combined with Steps to English Proficiency (STEP) for English language learners.",
        parts: [
          { h: "Part A. Observable language behaviours", tbl: [["Criterion", "Look-fors", "Level", "Source (O / C / P) · date"], [["Listening", "Follows 2–3 instructions in a row, with or without gestures", "", ""], ["Speaking", "Uses the target word or sentence; speaks confidently in a group", "", ""], ["Vocabulary", "Names and uses topic words correctly", "", ""], ["Early reading and writing", "Recognizes letters or familiar words; writes or draws to express ideas", "", ""]]], note: "Levels: Beginning · Developing · Secure · Extending. You can also note the child’s STEP (1–6)." },
          { h: "Part B. Learning skills", tbl: [["Skill", "Look-fors", "E · G · S · N"], [["Collaboration", "Waits for a turn, helps others, shares materials", ""], ["Initiative", "Joins in unprompted, asks questions", ""], ["Self-regulation", "Persists when it is hard, asks for help", ""], ["Independent work", "Completes tasks with few reminders", ""]]] },
          { h: "Part C. Summary", ul: ["One clear strength of the child.", "One specific next step for the child.", "Supports needed: visuals, a buddy, extra time, home language."] }
        ],
        x: ["Ontario: assessment draws on several sources of evidence and on pedagogical documentation of learning; learning skills are recorded separately.", "Vietnam: with 40–45 students, observe 5–6 children closely each lesson on a rotation; after two weeks the teacher has notes on the whole class for ongoing written comments."] }
    ];
    function tplHtml(T) {
      var b = '<p>' + esc(T.p) + '</p>' + T.parts.map(function (pt) {
        return '<h4>' + esc(pt.h) + '</h4>' + (pt.tbl ? tbl(pt.tbl[0], pt.tbl[1]) : "") + (pt.ul ? ul(pt.ul) : "") + (pt.note ? '<p class="msg">' + esc(pt.note) + '</p>' : "");
      }).join("");
      return b + '<aside class="x-note"><p class="eyebrow">' + (vi ? "Góc giao thoa Canada – Việt Nam" : "Canada–Vietnam crossover") + '</p>' + ul(T.x) + '</aside>';
    }
    function det(t, body, open) { return '<details class="lp"' + (open ? " open" : "") + '><summary>' + esc(t) + '</summary><div class="lp-body">' + body + '</div></details>'; }
    return det(J.t, jHtml()) +
      TPL.map(function (T) { return det(T.t, tplHtml(T)); }).join("");
  }
  function bindGallery() {
    $$(".yt-btn").forEach(function (b) { b.addEventListener("click", function () {
      var f = document.createElement("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + b.getAttribute("data-yt") + "?autoplay=1&rel=0"; f.title = b.getAttribute("aria-label"); f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true; f.className = "yt-frame";
      b.replaceWith(f);
    }); });
    $$("a[data-ds]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var d = document.getElementById("ds-" + a.getAttribute("data-ds")); if (d) { d.open = true; d.scrollIntoView({ behavior: "smooth", block: "start" }); } }); });
    var lb = $("#lb"); if (!lb) return; var cur = 0, img = $("img", lb), cap = $("figcaption", lb);
    function show(i) { cur = (i + GAL_FLAT.length) % GAL_FLAT.length; var it = GAL_FLAT[cur]; img.src = (CFG.base || "") + it[0]; img.alt = it[1]; cap.textContent = it[2] + " — " + it[1]; }
    $$("a[data-jr]").forEach(function (a) { a.addEventListener("click", function (e) { var id = a.getAttribute("data-jr"), el = document.getElementById("jr-" + id); if (el && location.hash === a.getAttribute("href")) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); } else PENDING_JR = id; }); });
    $$(".gal-btn").forEach(function (b) { b.addEventListener("click", function () { show(+b.getAttribute("data-gi")); if (lb.showModal) lb.showModal(); else lb.setAttribute("open", ""); }); });
    $$("[data-lb]", lb).forEach(function (b) { b.addEventListener("click", function () { var v = b.getAttribute("data-lb"); if (v === "close") lb.close(); else show(cur + (+v)); }); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") show(cur + 1); if (e.key === "ArrowLeft") show(cur - 1); });
  }
  var firstRoute = true, PENDING_JR = "";
  function route() {
    if (player) { player.destroy(); player = null; }
    Store.unsubscribeAll();
    var h = (location.hash || "").replace(/^#/, "") || CFG.start || "home", html, key = h, g = null;
    if (h.indexOf("gallery") === 0) key = "gallery";
    if (h === "project-dinosaurs" || h === "reading-is-fun" || h === "projects") key = "projects";
    if (h.indexOf("game-") === 0) { g = bySlug(h.slice(5)); key = "library"; }
    if (h === "home") { html = viewHome(); setMeta(t("site") + " · Phan Thị Quỳnh Trang", t("hero_lede")); }
    else if (h === "projects") { html = viewProjectsHub(); setMeta("Teaching Projects · " + t("site"), lang === "vi" ? "Các dự án giảng dạy: Dinosaur Project và Reading is Fun." : "Teaching projects: the Dinosaur Project and Reading is Fun."); }
    else if (h === "reading-is-fun") { html = projCrumb() + viewRif(); setMeta("Reading is Fun · " + t("site"), lang === "vi" ? "Reading is Fun: học kỹ năng đọc tiếng Anh qua truyện theo mô hình dự án, do Phan Thị Quỳnh Trang tổ chức." : "Reading is Fun: building English reading skills through stories as a project-based learning programme by Phan Thị Quỳnh Trang."); }
    else if (h === "library") { html = viewLibrary(); setMeta(t("lib_title") + " · " + t("site"), t("lib_lede")); }
    else if (h === "perspective") { html = viewPerspective(); setMeta(t("persp_title") + " · " + t("site"), t("persp_lede")); }
    else if (h.indexOf("gallery") === 0) { var GC = { "gallery-kids": "kids", "gallery-teen": "teen", "gallery-adult": "adult", "gallery-story": "story", "gallery-teacher": "story", "gallery-phil": "phil", "gallery-student": "teen", "gallery-class": "kids" }; html = viewGallery(GC[h] || "hub"); setMeta("Teaching Portfolio · " + t("site"), lang === "vi" ? "Ảnh lớp học và các hoạt động cộng đồng giáo viên của Phan Thị Quỳnh Trang, kèm giáo án và biểu mẫu gốc." : "Classroom photos, children’s work and teacher-community activities by Phan Thị Quỳnh Trang, with original lesson plans and templates."); }
    else if (h === "project-dinosaurs") { html = projCrumb() + viewDino(); setMeta("Dinosaur Project · " + t("site"), lang === "vi" ? "Dự án liên môn Dinosaur Project: đọc, viết, phim hoạt hình stop-motion, mỹ thuật và tham quan công viên khủng long." : "Dinosaur Project: a cross-curricular project with reading, writing, stop-motion animation, art and a dinosaur park visit."); }
    else if (h === "contact") { html = viewContact(); setMeta((lang === "vi" ? "Liên hệ" : "Contact") + " · " + t("site"), lang === "vi" ? "Gửi góp ý qua Google Form, trang trangphan.org và Facebook của tác giả." : "Send feedback via the Google Form, trangphan.org and the author’s Facebook."); }
    else if (h === "about") { html = viewAbout(); setMeta("Phan Thị Quỳnh Trang · " + t("site"), lang === "vi" ? "Giới thiệu Phan Thị Quỳnh Trang, giáo viên tiếng Anh và tác giả bộ hoạt động Khơi nguồn sáng tạo hoạt động ESL." : "About Phan Thị Quỳnh Trang, English teacher and author of Sparking Creativity in ESL Activities."); }
    else if (g) { html = viewGame(g); setMeta(L(g, "name") + " – " + t("site") + " · Phan Thị Quỳnh Trang", L(g, "meta")); }
    else { html = '<h1 id="page-h">' + t("notfound") + '</h1><p style="margin-top:12px"><a href="#home">' + t("nav_home") + '</a></p>'; key = ""; }
    app.innerHTML = html;
    $$("#nav a").forEach(function (a) { if (a.getAttribute("data-r") === key) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (h === "library") { bindLibrary(); bindGallery(); }
    $$("[data-fskill]").forEach(function (a) { a.addEventListener("click", function () { F.skill = a.getAttribute("data-fskill"); }); });
    if (h.indexOf("gallery") === 0 || h === "project-dinosaurs" || h === "reading-is-fun") bindGallery();
    $$(".cite").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var el = document.getElementById("src-" + a.getAttribute("data-src")); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1600); } }); });
    $$("[data-lp]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var d = $$("details.lp")[+a.getAttribute("data-lp")]; if (d) { d.open = true; d.scrollIntoView(); d.querySelector("summary").focus({ preventScroll: true }); } }); });
    if (g) {
      player = Player($("#player"), g);
      bindFeedback(g);
      $$("[data-jump]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var el = document.getElementById(a.getAttribute("data-jump")); if (el) { el.scrollIntoView(); el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); } }); });
    }
    if (!firstRoute) { window.scrollTo(0, 0); var hd = $("h1", app); if (hd) { hd.setAttribute("tabindex", "-1"); hd.focus({ preventScroll: true }); } }
    firstRoute = false;
    if (PENDING_JR) { var pj = document.getElementById("jr-" + PENDING_JR); PENDING_JR = ""; if (pj) setTimeout(function () { pj.scrollIntoView({ block: "start" }); }, 50); }
  }
  function start(csv) {
    GAMES = parseCSV(csv).map(normalize).filter(function (g) { return g.status !== "draft"; });
    shell(); route();
  }
  function boot() {
    app = $("#app");
    $("#skip").addEventListener("click", function () { var m = $("#main"); m.focus(); m.scrollIntoView(); });
    $$(".lang button").forEach(function (b) { b.addEventListener("click", function () { lang = b.getAttribute("data-l"); try { localStorage.setItem("esl_lang", lang); } catch (e) {} shell(); route(); }); });
    window.addEventListener("hashchange", route);
    app.innerHTML = '<p class="loading">' + t("loading") + '</p>';
    if (window.ESL_CSV) start(window.ESL_CSV);
    else fetch((CFG.base || "") + (CFG.csvUrl || "data/games.csv")).then(function (r) { return r.text(); }).then(start).catch(function () { app.innerHTML = '<p class="empty">games.csv?</p>'; });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
