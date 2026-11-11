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
      nav_home: "Trang chủ", nav_lib: "Thư viện trò chơi", nav_persp: "Góc nhìn Canada–Việt Nam", nav_about: "Tác giả",
      hero_lede: "Kho ý tưởng cho thầy cô đang tìm cách dạy tiếng Anh cho trẻ em thật sáng tạo, sinh động và giàu tương tác. Mỗi trò có video 2D hướng dẫn, giáo án theo khung Ontario, cách điều chỉnh cho lớp đông ở Việt Nam và phản hồi từ giáo viên đã dùng thử.",
      cta_lib: "Xem thư viện trò chơi", cta_persp: "Đọc góc nhìn Canada–Việt Nam",
      st_pub: "trò đã xuất bản", st_plan: "trò trong kế hoạch", st_phase: "giai đoạn thí điểm",
      phase: "GĐ 1",
      how_title: "Cách dùng website", how: [
        ["Lọc trò chơi", "Chọn kỹ năng, trình độ, khối lớp, thời lượng và sĩ số để tìm trò phù hợp với tiết dạy."],
        ["Xem video 2D", "Video 60–90 giây mô phỏng từng bước; các bước đánh số bên dưới khớp với từng cảnh."],
        ["Xem giáo án", "Giáo án theo khung Ontario (xem trực tuyến): mục tiêu, tiêu chí “I can…”, Minds On, Action, Consolidation, phân hóa, đánh giá."],
        ["Cùng đóng góp", "Dùng thử trên lớp rồi chia sẻ phản hồi dưới 2 phút, để cùng nhau làm các hoạt động hoàn thiện hơn."]],
      about_proj: "Về dự án",
      proj_p: "Hơn 90 hoạt động trên website chỉ là một phần nhỏ còn lưu giữ lại từ những năm Phan Thị Quỳnh Trang dạy tiếng Anh tại Việt Nam. Website là nơi các hoạt động ấy được biến tấu, đặt trong sự giao thoa với kinh nghiệm làm việc cùng TESL Ontario, để thầy cô dùng được dù dạy 22 học sinh ở Toronto hay 45 học sinh ở Hà Nội.",
      featured: "Trò chơi thí điểm",
      lib_title: "Thư viện trò chơi", lib_lede: "Lọc theo nhu cầu tiết dạy. Mỗi thẻ dẫn đến trang chi tiết với video, giáo án và góc nhìn Việt Nam.",
      f_search: "Tìm theo tên", f_skill: "Kỹ năng", f_level: "Trình độ", f_grade: "Khối lớp / độ tuổi", f_time: "Thời lượng", f_size: "Sĩ số", f_dev: "Thiết bị",
      any: "Tất cả", t_short: "≤ 15 phút", t_mid: "16–30 phút", t_long: "> 30 phút",
      s_small: "Lớp nhỏ (≤ 25)", s_large: "Lớp đông (40+)", d_no: "Không cần thiết bị", d_yes: "Cần thiết bị",
      showing: function (n, m) { return "Hiển thị " + n + " / " + m + " trò đã xuất bản · kế hoạch " + TOTAL_PLANNED + " trò"; },
      none: "Chưa có trò nào khớp bộ lọc. Hãy bỏ bớt một điều kiện.",
      skills: { "listening-speaking": "Nghe – Nói", reading: "Đọc", writing: "Viết", "vocab-grammar": "Từ vựng – Ngữ pháp" },
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
      fb_game: "Trò chơi đã dùng", fb_grade: "Khối lớp", fb_size: "Sĩ số lớp", fb_country: "Quốc gia",
      c_ca: "Canada", c_vn: "Việt Nam", c_other: "Khác",
      fb_eng: "Học sinh hứng thú", fb_ease: "Dễ tổ chức", fb_goal: "Đạt mục tiêu bài học",
      lo: "1 = thấp", hi: "5 = cao",
      fb_adapt: "Bạn đã điều chỉnh gì?", fb_adapt_ph: "Ví dụ: chơi theo dãy bàn, rút còn 10 phút…",
      fb_rec: "Bạn có giới thiệu trò này cho đồng nghiệp không?", yes: "Có", no: "Không", maybe: "Có thể",
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
      foot_line: "Học liệu do Phan Thị Quỳnh Trang biên soạn.", ack_h: "Lời ghi nhận từ tác giả", ack: "Tôi đã dừng công việc giảng dạy gần 5 năm, nên một số kiến thức có thể không còn cập nhật và một số hoạt động có thể không còn phù hợp với lớp học hiện nay. Thầy cô vui lòng tham khảo và cân nhắc trước khi sử dụng.", nav_rif: "Reading is Fun", voice_on: "Giọng đọc: bật", voice_off: "Giọng đọc: tắt", illus_cap: "Hình minh họa 2D",
      copied: "Đã sao chép", copy: "Sao chép",
      photos_t: "Từ lớp học thật: Reading is Fun", photos_l: "Học đọc qua truyện theo mô hình dự án (project-based learning).", photo_src: "Ảnh: Phan Thị Quỳnh Trang", rif_more: "Xem dự án Reading is Fun",
      gf_lede: "Góp ý qua Google Form (mở trong thẻ mới); tên trò chơi đã được điền sẵn.", gf_btn: "Mở form phản hồi"
    },
    en: {
      site: "Sparking Creativity in ESL Activities", siteAlt: "Khơi nguồn sáng tạo hoạt động ESL",
      by: "By Phan Thị Quỳnh Trang", skip: "Skip to main content",
      nav_home: "Home", nav_lib: "Game library", nav_persp: "Canada–Vietnam perspective", nav_about: "Author",
      hero_lede: "A source of ideas for teachers looking for creative, engaging and interactive ways to teach English to children. Every game has a 2D how-to video, an Ontario-style lesson plan, adaptations for large Vietnamese classes, and feedback from teachers who tried it.",
      cta_lib: "Browse the game library", cta_persp: "Read the Canada–Vietnam perspective",
      st_pub: "games published", st_plan: "games planned", st_phase: "pilot phase",
      phase: "Ph. 1",
      how_title: "How to use this site", how: [
        ["Filter games", "Choose skill, level, grade, time and class size to find a game that fits your lesson."],
        ["Watch the 2D video", "A 60–90 second animation shows each step; the numbered steps below match each scene."],
        ["Read the plan", "An Ontario-style lesson plan to read online: goals, “I can…” criteria, Minds On, Action, Consolidation, differentiation and assessment."],
        ["Contribute", "Try it in class, then share feedback in under 2 minutes so that together we make the activities better."]],
      about_proj: "About the project",
      proj_p: "The 90-plus activities on this site are only a small part of what survives from Phan Thị Quỳnh Trang's years of teaching English in Vietnam. Here they are reworked where they meet her experience working with TESL Ontario, so teachers can use them whether they teach 22 students in Toronto or 45 in Hanoi.",
      featured: "Pilot games",
      lib_title: "Game library", lib_lede: "Filter by what your lesson needs. Each card opens a page with the video, lesson plan and Vietnam perspective.",
      f_search: "Search by name", f_skill: "Skill", f_level: "Level", f_grade: "Grade / age", f_time: "Time", f_size: "Class size", f_dev: "Equipment",
      any: "Any", t_short: "≤ 15 min", t_mid: "16–30 min", t_long: "> 30 min",
      s_small: "Small (≤ 25)", s_large: "Large (40+)", d_no: "No equipment", d_yes: "Needs equipment",
      showing: function (n, m) { return "Showing " + n + " of " + m + " published games · " + TOTAL_PLANNED + " planned"; },
      none: "No games match these filters yet. Try removing one.",
      skills: { "listening-speaking": "Listening – Speaking", reading: "Reading", writing: "Writing", "vocab-grammar": "Vocabulary – Grammar" },
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
      fb_game: "Game used", fb_grade: "Grade", fb_size: "Class size", fb_country: "Country",
      c_ca: "Canada", c_vn: "Vietnam", c_other: "Other",
      fb_eng: "Student engagement", fb_ease: "Ease of setup", fb_goal: "Learning goal met",
      lo: "1 = low", hi: "5 = high",
      fb_adapt: "What did you adapt?", fb_adapt_ph: "e.g. played by rows, cut to 10 minutes…",
      fb_rec: "Would you recommend this game to a colleague?", yes: "Yes", no: "No", maybe: "Maybe",
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
      foot_line: "Materials written by Phan Thị Quỳnh Trang.", ack_h: "A note from the author", ack: "I stepped away from classroom teaching nearly five years ago, so some of the knowledge here may be out of date and some activities may no longer suit today's classrooms. Please treat them as a reference and consider them carefully before use.", nav_rif: "Reading is Fun", voice_on: "Voice: on", voice_off: "Voice: off", illus_cap: "2D illustration",
      copied: "Copied", copy: "Copy",
      photos_t: "From real classrooms: Reading is Fun", photos_l: "Learning to read through stories, as a project-based learning programme.", photo_src: "Photos: Phan Thị Quỳnh Trang", rif_more: "See the Reading is Fun project",
      gf_lede: "Share your feedback through the Google Form (opens in a new tab); the game name is already filled in.", gf_btn: "Open the feedback form"
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
      tip: bi(r, "pro_tip"), video: r.link_video, meta: bi(r, "meta"), photo: r.anh || "", alt: bi(r, "anh_alt"), photoSrc: r.anh_nguon || ""
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
    var cg = col(/trò chơi|game/), ce = col(/hứng thú|engagement/), ca = col(/dễ tổ chức|ease/), co = col(/mục tiêu|goal/), cr = col(/giới thiệu|recommend/);
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
      (teacher ? '<rect x="-9" y="-32" width="18" height="5" rx="2" fill="#e8a900"/>' : '') +
      '</g>';
  }
  function bubble(id) { return '<g id="' + id + '" opacity="0"><rect rx="10" height="30" fill="#ffffff" stroke="#14213d" stroke-width="1.5"/><path d="M14 30 l6 9 l4 -9z" fill="#ffffff" stroke="#14213d" stroke-width="1.5"/><path d="M15 29 h10" stroke="#ffffff" stroke-width="3"/><text x="10" y="20" font-family="Open Sans,Arial,sans-serif" font-size="13" font-weight="600" fill="#14213d"></text></g>'; }

  function Player(root, game) {
    var st = game.steps[lang].length ? game.steps : { en: game.steps.en, vi: game.steps.en };
    var N = Math.min(5, (st.en.length || st.vi.length)) || 5;
    var dur = N * SCENE_SEC, time = 0, playing = false, last = 0, raf = 0, capMode = "vi", curScene = -1, osc = 0, speaking = false, speakId = 0, voiceOn = true, held = false;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var stepsCur = function () { return st[lang] && st[lang].length ? st[lang] : st.en; };

    var svg = '<svg viewBox="0 0 640 360" role="img" aria-label="' + esc(L(game, "name")) + ' – 2D">' +
      '<rect width="640" height="360" fill="#eef2f8"/><rect y="236" width="640" height="124" fill="#dfe5ef"/>' +
      '<rect x="0" y="232" width="640" height="6" fill="#c9d2e1"/>' +
      '<rect x="180" y="34" width="280" height="140" rx="6" fill="#203a43"/><rect x="180" y="34" width="280" height="140" rx="6" fill="none" stroke="#8a6d3b" stroke-width="6"/>' +
      '<text id="bd1" x="320" y="78" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="17" font-weight="700" fill="#ffffff"></text>' +
      '<text id="bd2" x="320" y="106" text-anchor="middle" font-family="Open Sans,Arial,sans-serif" font-size="13" fill="#cfe3d8"></text>' +
      '<text id="bd3" x="320" y="146" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="22" fill="#f2c14e"></text>' +
      '<g id="wall" opacity="0"><rect x="30" y="110" width="58" height="76" fill="#fff" stroke="#9aa6bb"/><rect x="552" y="110" width="58" height="76" fill="#fff" stroke="#9aa6bb"/>' +
      '<path d="M38 124h42M38 134h42M38 144h36M38 154h42M38 164h30M560 124h42M560 134h42M560 144h36M560 154h42M560 164h30" stroke="#9aa6bb" stroke-width="2"/></g>' +
      '<g id="chair" opacity="0"><rect x="296" y="236" width="48" height="10" rx="3" fill="#8a6d3b"/><rect x="300" y="246" width="6" height="26" fill="#8a6d3b"/><rect x="334" y="246" width="6" height="26" fill="#8a6d3b"/><rect x="294" y="196" width="52" height="10" rx="3" fill="#a07f45"/></g>' +
      '<g id="desks">' + [150, 240, 400, 490].map(function (x) { return '<rect x="' + (x - 34) + '" y="270" width="68" height="8" rx="3" fill="#b9c3d4"/><rect x="' + (x - 34) + '" y="312" width="68" height="8" rx="3" fill="#b9c3d4"/>'; }).join("") + '</g>' +
      PAL.map(function (c, i) { return figure(i, c, false); }).join("") + figure(8, "#14213d", true) +
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
      q("bd3").textContent = sc === N - 1 ? "✓ ✓ ✓" : (mode === "hotseat" && sc >= 2 ? "UMBRELLA" : "");
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
          } else {
            x = grp[0] + Math.sin(ph + i) * 6; y = grp[1];
          }
          teach = [320 + Math.sin(ph * 0.35) * 150, 232];
        }
        if (reduce) arm = arm && i % 3 === 0;
        place(i, x, y, arm);
      }
      place(8, teach[0], teach[1], tArm);
      var B = BUBBLES[game.mode] || BUBBLES.board;
      var p0 = P[0].getAttribute("transform").match(/[\d.]+/g), p1 = (game.mode === "hotseat" ? P[1] : P[0]).getAttribute("transform").match(/[\d.]+/g);
      if (game.mode === "hotseat") { var a1 = P[1].getAttribute("transform").match(/[\d.]+/g), a6 = P[6].getAttribute("transform").match(/[\d.]+/g); say("b0", +a1[0], +a1[1], B[0], bub0); say("b1", +a6[0], +a6[1], B[1], bub1); }
      else { var pp = P[game.mode === "mingle" ? 5 : 5].getAttribute("transform").match(/[\d.]+/g); say("b0", +p0[0], +p0[1], B[0], bub0); say("b1", +pp[0], +pp[1], B[1], bub1); }
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
    return '<g><rect x="' + bx + '" y="' + (y - 34) + '" width="' + w + '" height="28" rx="10" fill="#fff" stroke="#14213d" stroke-width="1.5"/>' +
      '<path d="M' + (x - 4) + ' ' + (y - 7) + ' l4 9 l6 -9z" fill="#fff" stroke="#14213d" stroke-width="1.5" stroke-linejoin="round"/><path d="M' + (x - 5) + ' ' + (y - 7.5) + ' h12" stroke="#fff" stroke-width="3"/>' +
      '<text x="' + (bx + 10) + '" y="' + (y - 15) + '" font-family="Open Sans,Arial,sans-serif" font-size="12.5" font-weight="600" fill="#14213d">' + esc(txt) + '</text></g>';
  }
  function room(boardTitle, boardLine, extra) {
    return '<rect width="640" height="400" fill="#eef2f8"/><rect y="262" width="640" height="138" fill="#dfe5ef"/><rect y="258" width="640" height="6" fill="#c9d2e1"/>' +
      '<rect x="190" y="30" width="260" height="128" rx="6" fill="#203a43"/><rect x="190" y="30" width="260" height="128" rx="6" fill="none" stroke="#8a6d3b" stroke-width="6"/>' +
      '<text x="320" y="68" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="18" font-weight="800" fill="#fff">' + esc(boardTitle) + '</text>' +
      '<text x="320" y="96" text-anchor="middle" font-family="Open Sans,Arial,sans-serif" font-size="13" fill="#cfe3d8">' + esc(boardLine) + '</text>' + (extra || "");
  }
  function illus(g) {
    var P = PAL, svg;
    if (g.mode === "relay") {
      svg = room("Running Dictation", "Runner reads · Writer writes · swap every 2 lines",
        '<text x="320" y="136" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="15" fill="#f2c14e">Runner ≠ Writer</text>') +
        '<g><rect x="26" y="112" width="96" height="120" fill="#fff" stroke="#9aa6bb"/><text x="36" y="132" font-family="Montserrat,Arial,sans-serif" font-size="10" font-weight="700" fill="#14213d">THE BIG RED BUS</text>' +
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
        '<g><rect x="478" y="40" width="130" height="66" rx="8" fill="#fff" stroke="#c9d2e1"/><text x="543" y="62" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="700" fill="#56627a">SCORE</text><text x="543" y="90" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="20" font-weight="800" fill="#14213d">A 3 · B 2</text></g>' +
        '<g><circle cx="78" cy="74" r="32" fill="#fff" stroke="#c9d2e1" stroke-width="3"/><path d="M78 74 L78 50" stroke="#c8102e" stroke-width="3" stroke-linecap="round"/><path d="M78 74 L94 80" stroke="#14213d" stroke-width="3" stroke-linecap="round"/><text x="78" y="124" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="12" font-weight="700" fill="#56627a">0:45</text></g>' +
        '<rect x="294" y="262" width="52" height="10" rx="3" fill="#8a6d3b"/><rect x="298" y="272" width="6" height="30" fill="#8a6d3b"/><rect x="336" y="272" width="6" height="30" fill="#8a6d3b"/><rect x="292" y="214" width="56" height="12" rx="3" fill="#a07f45"/>' +
        fig2(320, 270, P[2], { hair: "#1d1d1d" }) + '<text x="320" y="330" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="700" fill="#56627a">HOT SEAT</text>' +
        fig2(150, 330, P[0], { arm: "up", back: false }) + fig2(205, 340, P[5], { hair: "#5a3825" }) + fig2(100, 350, P[6], { s: .95 }) +
        fig2(470, 330, P[3], { arm: "out", flip: true, hair: "#7b4a2a" }) + fig2(530, 344, P[7], { flip: true }) +
        bub(165, 230, "You use it when it rains!") + bub(470, 230, "It keeps you dry.", { left: true }) + bub(336, 198, "Hmm… a raincoat?");
    } else {
      svg = room("Find Someone Who…", "Ask one question · write one name · move on",
        '<g transform="translate(276 110)">' + [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) { return '<rect x="' + (c * 30) + '" y="' + (r * 14) + '" width="28" height="12" fill="none" stroke="#cfe3d8" stroke-width="1"/>' + ((r + c) % 2 ? '<path d="M' + (c * 30 + 8) + ' ' + (r * 14 + 6) + 'l4 4 l8 -8" stroke="#f2c14e" stroke-width="1.6" fill="none"/>' : ''); }).join(""); }).join("") + '</g>') +
        fig2(120, 320, P[0], { arm: "hold", board: true }) + fig2(178, 320, P[1], { flip: true, hair: "#5a3825" }) +
        fig2(400, 330, P[2], { arm: "hold", board: true, hair: "#7b4a2a" }) + fig2(458, 330, P[4], { flip: true, arm: "out" }) +
        fig2(282, 296, P[3], { s: .85, board: true, arm: "hold" }) + fig2(560, 300, "#14213d", { s: 1.2, hair: "#1b1b1b", board: true, arm: "hold", flip: true }) +
        bub(130, 230, "Do you have a younger brother?") + bub(186, 182, "Yes, I do!", { left: true }) +
        bub(408, 240, "Can you swim?") + bub(462, 194, "No, I can't.", { left: true });
    }
    return '<svg viewBox="0 0 640 400" role="img" aria-label="' + esc(illusAlt(g)) + '" style="display:block;width:100%;height:auto">' + svg + '</svg>';
  }
  function illusAlt(g) {
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
    var pub = GAMES.length;
    return '<section class="hero"><div class="stack"><p class="eyebrow">Phan Thị Quỳnh Trang · ESL</p><h1>' + esc(t("site")) + '<span lang="' + (lang === "vi" ? "en" : "vi") + '">' + esc(t("siteAlt")) + '</span></h1>' +
      '<p class="lede">' + esc(t("hero_lede")) + '</p>' + ackHtml() +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#library">' + esc(t("cta_lib")) + ' →</a><a class="btn ghost" href="#perspective">' + esc(t("cta_persp")) + '</a></div>' +
      '<p class="byline"><span class="avatar" style="width:36px;height:36px;font-size:.8rem" aria-hidden="true">QT</span>' + esc(t("by")) + ' · trangphan.org</p></div>' +
      '<div class="hero-card" aria-label="' + esc(t("site")) + '"><div class="bar" aria-hidden="true"></div><div class="hero-stats">' +
      '<div><div class="k">' + pub + '</div><div class="kl">' + t("st_pub") + '</div></div><div><div class="k">' + TOTAL_PLANNED + '</div><div class="kl">' + t("st_plan") + '</div></div></div>' +
      '<p style="font-size:.9rem;opacity:.9">Ontario Language (2023) · ESL/ELD · STEP · CEFR · GDPT 2018</p></div></section>' +
      '<section><h2 style="margin-bottom:14px">' + t("how_title") + '</h2><ol class="howto">' + t("how").map(function (h) { return '<li><h3>' + esc(h[0]) + '</h3><p class="msg" style="font-size:.93rem;margin-top:4px">' + esc(h[1]) + '</p></li>'; }).join("") + '</ol></section>' +
      '<section><h2 style="margin-bottom:14px">' + t("featured") + '</h2><div class="cards">' + GAMES.map(card).join("") + '</div></section>' +
      '<section><h2 style="margin-bottom:6px">' + t("photos_t") + '</h2><p class="msg" style="margin-bottom:14px">' + t("photos_l") + '</p>' + collage(rifPhotos(lang === "vi").slice(1, 5), "strip4") +
      '<p style="margin-top:12px"><a class="btn ghost" href="#reading-is-fun">' + t("rif_more") + ' →</a></p></section>' +
      '<section class="panel"><h2 style="margin-bottom:10px">' + t("about_proj") + '</h2><p style="max-width:70ch">' + esc(t("proj_p")) + '</p></section>' + ackHtml();
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
      '</form><p class="count" id="count" aria-live="polite"></p><div class="cards" id="cards"></div></section>';
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
      '<header class="g-head"><p class="eyebrow">' + esc(g.id) + ' · ' + esc(g.step) + ' · CEFR ' + esc(g.cefr) + '</p><h1 id="page-h">' + esc(L(g, "name")) + '</h1><p class="alt" lang="' + (lang === "vi" ? "en" : "vi") + '">' + esc(other) + '</p>' + chips(g) +
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
      ["Thời lượng tiếng Anh", "1 tín chỉ ESL = 110 giờ [8]; học sinh ELL còn dùng tiếng Anh trong mọi môn học [3]", "Tiểu học 4 tiết/tuần = 140 tiết/năm (≈ 82 giờ); THCS, THPT 3 tiết/tuần = 105 tiết/năm (≈ 79 giờ); tổng 1.155 tiết từ lớp 3–12 [10]", "Giờ học trên lớp gần bằng nhau, nhưng học sinh Ontario được ‘ngâm’ trong tiếng Anh cả ngày."],
      ["Khung trình độ", "STEP: 6 bước [4]; ESL 5 cấp: ESLAO → ESLEO [2]", "Bậc 1 (A1) hết tiểu học, Bậc 2 (A2) hết THCS, Bậc 3 (B1) hết THPT [10][12]", "Có thể quy đổi tương đối qua CEFR."],
      ["Cấu trúc nội dung", "ESL: 4 mạch – Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy [2]", "Hệ thống chủ điểm, chủ đề; 4 kỹ năng nghe, nói, đọc, viết và kiến thức ngôn ngữ [10]", "Ontario có riêng mạch năng lực văn hóa – xã hội."],
      ["Đánh giá", "Bảng thành tích 4 phạm trù: Knowledge and Understanding, Thinking, Communication, Application; đánh giá vì / là / kết quả học tập [9]", "Đánh giá thường xuyên và định kỳ [15]; từ 2025 Ngoại ngữ là môn tự chọn trong kỳ thi tốt nghiệp THPT [16]", "Áp lực thi cử ở Việt Nam tập trung vào bài thi cuối cấp."]
    ] : [
      ["Curriculum documents", "Language Grades 1–8 (2023) [1]; ESL/ELD Grades 9–12 (2007) [2]; ELL policy K–12 (2007) [3]", "2018 General Education Programme, English, Grades 3–12 [10]", "Ontario teaches English as the language of schooling (ESL); Vietnam teaches it as a foreign language (EFL)."],
      ["Class size", "K–3: 90% of classes ≤ 20, max 23; Grades 4–8: board average ≤ 24.5; secondary: board average ≤ 23 [5]", "Primary ≤ 35; lower and upper secondary ≤ 45 students per class [13][14]", "A Vietnamese class can be almost twice as large."],
      ["Period / school day", "≥ 300 minutes of instruction a day [6]; schools set their own timetable", "35-minute periods (primary), 45-minute periods (secondary) [11]", "Activities for Vietnam must fit inside one period."],
      ["School year", "≥ 194 school days [7]", "35 teaching weeks [11]", "Roughly the same."],
      ["English time", "1 ESL credit = 110 hours [8]; ELLs also use English in every subject [3]", "Primary 4 periods/week = 140 periods/year (≈ 82 h); secondary 3 periods/week = 105 periods/year (≈ 79 h); 1,155 periods in Grades 3–12 [10]", "Class hours are similar, but Ontario students are immersed in English all day."],
      ["Proficiency framework", "STEP: 6 steps [4]; ESL 5 levels: ESLAO → ESLEO [2]", "Level 1 (A1) end of primary, Level 2 (A2) end of lower secondary, Level 3 (B1) end of upper secondary [10][12]", "Both can be roughly mapped through the CEFR."],
      ["Content structure", "ESL: 4 strands – Listening and Speaking; Reading; Writing; Socio-cultural Competence and Media Literacy [2]", "Themes and topics; four skills plus language knowledge [10]", "Ontario has a separate socio-cultural competence strand."],
      ["Assessment", "Achievement chart with 4 categories: Knowledge and Understanding, Thinking, Communication, Application; assessment for / as / of learning [9]", "Ongoing and periodic assessment [15]; from 2025 a foreign language is an elective subject in the national graduation exam [16]", "Exam pressure in Vietnam centres on end-of-level tests."]
    ];
    var calc = vi ? {
      h: "Con số cần so sánh nhất: thời gian nói của mỗi học sinh",
      p: "Ước tính đơn giản: nếu một nửa tiết học dành cho học sinh nói lần lượt trước lớp, mỗi em có bao nhiêu giây?",
      a: ["Việt Nam: 45 phút × 50% ÷ 45 học sinh", "≈ 30 giây/em"], b: ["Ontario: 45 phút × 50% ÷ 24 học sinh", "≈ 56 giây/em"],
      c: ["Cả hai lớp khi nói theo cặp cùng lúc", "≈ 11 phút/em"],
      n: "Đây là phép tính minh họa, không phải số liệu khảo sát. Nó cho thấy vì sao các trò chơi theo cặp và theo nhóm là chìa khóa với lớp đông."
    } : {
      h: "The figure that matters most: speaking time per student",
      p: "A simple estimate: if half a lesson is spent on students speaking one at a time in front of the class, how many seconds does each student get?",
      a: ["Vietnam: 45 min × 50% ÷ 45 students", "≈ 30 seconds each"], b: ["Ontario: 45 min × 50% ÷ 24 students", "≈ 56 seconds each"],
      c: ["Either class speaking in pairs at the same time", "≈ 11 minutes each"],
      n: "This is an illustrative calculation, not survey data. It shows why pair and group games are the key to large classes."
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
    function srcList(c) { return '<ol class="srcs">' + SRC.filter(function (s) { return s.c === c; }).map(function (s) { return '<li id="src-' + s.id + '" value="' + s.id + '">' + (s.u ? '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.t) + ' ↗</a>' : esc(s.t)) + '</li>'; }).join("") + '</ol>'; }
    function withCites(txt) { return esc(txt).replace(/\[(\d+)\]/g, function (m, n) { return cite([+n]); }); }
    return '<section><p class="eyebrow">' + esc(t("site")) + '</p><h1 id="page-h" style="margin:6px 0 10px">' + t("persp_title") + '</h1><p class="lede">' + t("persp_lede") + '</p></section>' +
      '<section><div class="tbl-wrap"><table class="cmp"><thead><tr>' + D.col.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join("") + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + withCites(r[1]) + '</td><td>' + withCites(r[2]) + '</td><td class="msg">' + esc(r[3]) + '</td></tr>'; }).join("") + '</tbody></table></div><p class="msg" style="margin-top:8px">' + D.note + '</p></section>' +
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
  function viewAbout() {
    var vi = lang === "vi";
    var A = vi ? {
      role: "Nhà giáo dục TESOL · Đào tạo giáo viên · Ngoại giao giáo dục Canada – Việt Nam",
      intro: ["Phan Thị Quỳnh Trang có hơn 10 năm làm việc trong giáo dục quốc tế. Chị dạy tiếng Anh tại Việt Nam từ năm 2015 cho trẻ mầm non, học sinh tiểu học, thiếu niên và người lớn, đồng thời tập huấn giáo viên tiếng Anh trên khắp Việt Nam.",
              "Khi mới sang Canada, chị vẫn tiếp tục đào tạo giáo viên tiếng Anh trực tuyến qua chương trình Mentoring program. Từ năm 2024, chị tập trung vào ngoại giao giáo dục và kết nối giáo dục giữa Canada và Việt Nam.", "Hơn 90 hoạt động trên website chỉ là một phần nhỏ còn lưu giữ lại từ những năm đứng lớp. Chị muốn biến tấu chúng, đặt trong sự giao thoa với kinh nghiệm làm việc cùng TESL Ontario."],
      exp_h: "Kinh nghiệm giáo dục tiêu biểu",
      exp: [["2024 – nay", "Ngoại giao giáo dục & kết nối giáo dục Canada – Việt Nam", "Toronto"], ["2023 – 2024", "Giám đốc Giáo dục, OCES Group", "Toronto"], ["2022 – 2023", "Điều phối viên Đào tạo & Phát triển, Wee College", "Moncton, NB"], ["Những năm đầu ở Canada", "Mentoring program: đào tạo giáo viên tiếng Anh trực tuyến", "Trực tuyến"], ["2019 – 2022", "Phát triển chương trình học thuật & đối tác, FLYER (EdTech); biên soạn nội dung, Twinkl Việt Nam", "Trực tuyến"], ["2016 – 2020", "Chuyên gia tư vấn, Educap – Australian International TESOL (AIT): đào tạo TESOL, xây dựng mạng lưới giáo viên", "Hà Nội"], ["2015 – 2022", "Giáo viên tiếng Anh tự do & giảng viên doanh nghiệp", "Việt Nam"]],
      edu_h: "Học vấn & chứng chỉ",
      edu: ["Thạc sĩ (MA) TESOL – Horizons University, Pháp (2023, học bổng 50%)", "Văn bằng sau đại học TESOL – Đại học Hà Nội", "Level 7 Postgraduate Diploma in TESOL – Training Qualifications UK", "Professional TESOL Diploma – Australian International TESOL", "Văn bằng Giáo dục Mầm non – Cao đẳng Sư phạm Hà Nội", "Cử nhân Kế toán – Tài chính – Học viện Ngân hàng", "Graduate Certificate in Government Relations – Seneca Polytechnic (đang học)"],
      inc_h: "Bồi dưỡng về giáo dục hòa nhập",
      inc: ["Giáo dục Montessori cho trẻ 2–6 tuổi", "Trị liệu bằng rối (Therapeutic Puppetry) – ĐH Sư phạm Hà Nội", "Đánh giá rối loạn ngôn ngữ – ĐH Sư phạm Hà Nội", "Hoạt động trị liệu cho trẻ có nhu cầu đặc biệt trong trường học"],
      why_h: "Vì sao có bộ học liệu này",
      why: "Bộ học liệu nối hai chặng đường của tác giả: dạy học tại Việt Nam và làm giáo dục tại Canada. Mỗi trò chơi được đặt vào cả hai bối cảnh, lớp 20–25 học sinh ở Ontario và lớp 40–45 học sinh ở Việt Nam, để giáo viên hai nước cùng học hỏi.",
      ph: "Buổi tập huấn giáo viên: giảng viên ngồi trên ghế cao, giơ tay trao đổi với nhóm giáo viên ngồi thành vòng tròn trong phòng đào tạo.",
      phc: "Teacher's Feedback – tập huấn giáo viên · Ảnh: trangphan.org", more: "Xem hồ sơ đầy đủ"
    } : {
      role: "TESOL educator · Teacher trainer · Canada – Vietnam education diplomacy",
      intro: ["Phan Thị Quỳnh Trang has more than 10 years of experience in international education. She has taught English in Vietnam since 2015, to preschoolers, primary students, teenagers and adults, and has trained English teachers across Vietnam.",
              "After moving to Canada, she continued to train English teachers online for a time through a Mentoring program. Since 2024 she has focused on education diplomacy and connecting education in Canada and Vietnam.", "The 90-plus activities on this site are only a small part of what survives from her teaching years. She wants to rework them where they meet her experience working with TESL Ontario."],
      exp_h: "Selected education experience",
      exp: [["2024 – present", "Education diplomacy & connecting education in Canada and Vietnam", "Toronto"], ["2023 – 2024", "Education Director, OCES Group", "Toronto"], ["2022 – 2023", "Training and Development Coordinator, Wee College", "Moncton, NB"], ["Early years in Canada", "Mentoring program: online training for English teachers", "Online"], ["2019 – 2022", "Academic program & partnership development, FLYER (EdTech); content writer, Twinkl Vietnam", "Remote"], ["2016 – 2020", "Executive Consultant, Educap – Australian International TESOL (AIT): TESOL training and a national educator network", "Hanoi"], ["2015 – 2022", "Freelance English teacher & corporate trainer", "Vietnam"]],
      edu_h: "Education & qualifications",
      edu: ["MA in TESOL – Horizons University, France (2023, 50% scholarship)", "Graduate Diploma in TESOL – Hanoi University", "Level 7 Postgraduate Diploma in TESOL – Training Qualifications UK", "Professional TESOL Diploma – Australian International TESOL", "Diploma in Early Childhood Education – Hanoi College of Education", "Bachelor of Accounting and Finance – Banking Academy of Vietnam", "Graduate Certificate in Government Relations – Seneca Polytechnic (in progress)"],
      inc_h: "Training in inclusive education",
      inc: ["Montessori education for children aged 2–6", "Therapeutic Puppetry – Hanoi National University of Education", "Assessment of Speech Disorders – Hanoi National University of Education", "Occupational therapy for children with special needs in schools"],
      why_h: "Why this collection",
      why: "The collection connects the two parts of the author's career: teaching in Vietnam and working in education in Canada. Every game is placed in both settings, an Ontario class of 20–25 and a Vietnamese class of 40–45, so teachers in each country can learn from the other.",
      ph: "A teacher-training session: the trainer, seated on a tall stool, gestures as she talks with a circle of teachers in a training room.",
      phc: "Teacher's Feedback – teacher training · Photo: trangphan.org", more: "See the full profile"
    };
    var links = '<div style="display:flex;gap:10px;flex-wrap:wrap">' + (CFG.authorSite ? '<a class="btn" href="' + esc(CFG.authorSite) + '" target="_blank" rel="noopener">' + A.more + ' · trangphan.org ↗</a>' : '') + (CFG.linkedin ? '<a class="btn ghost" href="' + esc(CFG.linkedin) + '" target="_blank" rel="noopener">LinkedIn ↗</a>' : '') + (CFG.facebook ? '<a class="btn ghost" href="' + esc(CFG.facebook) + '" target="_blank" rel="noopener">Facebook ↗</a>' : '') + '</div>';
    function ul(a) { return '<ul class="lst">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }
    return '<section class="about-hero"><div class="stack"><p class="eyebrow">' + t("about_title") + '</p><h1 id="page-h">Phan Thị Quỳnh Trang</h1><p class="lede">' + esc(A.role) + '</p>' +
      A.intro.map(function (p) { return '<p style="max-width:66ch">' + esc(p) + '</p>'; }).join("") + links + '</div>' +
      '<div class="stack" style="gap:8px"><p class="eyebrow">Teacher\'s Feedback · ' + (vi ? "Tập huấn giáo viên" : "Teacher training") + '</p>' + collage(TT(vi), "tt") + '</div></section>' +
      '<section><h2 style="margin-bottom:14px">' + A.exp_h + '</h2><ol class="timeline">' + A.exp.map(function (e) { return '<li><span class="yr">' + esc(e[0]) + '</span><div><b>' + esc(e[1]) + '</b><span class="msg"> · ' + esc(e[2]) + '</span></div></li>'; }).join("") + '</ol></section>' +
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
    return '<g transform="translate(' + x + ' ' + y + ')"><rect x="' + (-w / 2) + '" y="' + (-h) + '" width="' + w + '" height="' + h + '" rx="4" fill="#3d8b7d"/><rect x="' + (-w / 2 + 6) + '" y="' + (-h + 6) + '" width="' + (w - 12) + '" height="' + (h - 12) + '" rx="3" fill="#e9f5ef"/>' + lionFace(-w * .16, -h * .55, w * .11) + mouseFace(w * .22, -h * .38, w * .06) + '<text x="0" y="' + (-h + 22) + '" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="' + (w * .075) + '" font-weight="800" fill="#14213d">The Lion and the Mouse</text></g>';
  }
  function rifIllus(i) {
    var P = PAL, s;
    if (i === 0) {
      s = room("Our project: Story Day!", "Driving question: How can we retell a story?") +
        '<g transform="translate(470 175)"><rect width="140" height="80" rx="6" fill="#fff" stroke="#c9d2e1"/><text x="70" y="22" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="800" fill="#56627a">I THINK…</text><path d="M14 40h112M14 56h90" stroke="#c9d2e1" stroke-width="2"/></g>' +
        fig2(300, 300, "#14213d", { s: 1.15, hair: "#1b1b1b", arm: "up" }) + bigBook(250, 270, 120) +
        fig2(120, 350, P[0], { back: true, s: .9 }) + fig2(180, 356, P[1], { back: true, s: .9, hair: "#5a3825" }) + fig2(420, 352, P[2], { back: true, s: .9 }) + fig2(480, 356, P[4], { back: true, s: .9, hair: "#7b4a2a", arm: "up" }) +
        bub(320, 150, "What do you see on the cover?");
    } else if (i === 1) {
      s = '<rect width="640" height="400" fill="#eef2f8"/><rect y="250" width="640" height="150" fill="#e8dcc6"/>' +
        '<ellipse cx="320" cy="320" rx="250" ry="60" fill="#d8c8aa"/>' + bigBook(320, 250, 150) + fig2(320, 290, "#14213d", { s: 1, hair: "#1b1b1b", arm: "hold" }) +
        [[110, 330], [170, 360], [240, 378], [400, 378], [470, 360], [530, 330]].map(function (q, k) { return fig2(q[0], q[1], P[k], { back: k > 1 && k < 4, s: .85, arm: k === 4 ? "up" : "down", hair: ["#2b2b2b", "#5a3825"][k % 2] }); }).join("") +
        bub(330, 120, "What happens next?") + bub(500, 245, "The mouse helps!", { left: true });
    } else if (i === 2) {
      s = room("Put the story in order", "1 → 2 → 3 → 4 → 5") +
        '<rect x="90" y="270" width="460" height="12" rx="4" fill="#b9c3d4"/><rect x="100" y="282" width="8" height="40" fill="#b9c3d4"/><rect x="532" y="282" width="8" height="40" fill="#b9c3d4"/>' +
        [0, 1, 2, 3, 4].map(function (k) { var x = 118 + k * 84; return '<g transform="translate(' + x + ' 196)"><rect width="66" height="66" rx="5" fill="#fff" stroke="#9aa6bb"/>' + (k === 0 ? lionFace(33, 34, 13) : k === 1 ? mouseFace(33, 36, 11) + lionFace(33, 30, 8) : k === 2 ? '<path d="M8 10 L58 10 L58 56 L8 56 Z M8 25 H58 M8 40 H58 M23 10 V56 M38 10 V56" stroke="#7b4a2a" stroke-width="2" fill="none"/>' + lionFace(33, 36, 9) : k === 3 ? mouseFace(33, 34, 12) : lionFace(22, 36, 10) + mouseFace(48, 40, 7)) + '<circle cx="10" cy="10" r="9" fill="#14213d"/><text x="10" y="14" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="11" font-weight="800" fill="#fff">' + (k + 1) + '</text></g>' + (k < 4 ? '<path d="M' + (x + 70) + ' 229 l10 0" stroke="#14213d" stroke-width="2.5" marker-end="url(#ar)"/>' : ''); }).join("") +
        fig2(150, 350, P[0], { back: true, arm: "up" }) + fig2(250, 360, P[1], { back: true, hair: "#5a3825" }) + fig2(380, 360, P[2], { back: true }) + fig2(480, 350, P[3], { back: true, arm: "up", hair: "#7b4a2a" }) +
        bub(160, 190, "Please let me go!") + bub(480, 190, "I will help you one day!", { left: true });
    } else if (i === 3) {
      s = room("Make your props", "First cut · Next colour · Then glue") +
        '<rect x="80" y="276" width="480" height="12" rx="4" fill="#b9c3d4"/>' +
        lionFace(200, 250, 22) + mouseFace(330, 256, 16) +
        '<g transform="translate(400 236)"><rect width="70" height="44" fill="#fff" stroke="#9aa6bb"/><path d="M35 0v44" stroke="#9aa6bb"/><path d="M6 12h22M6 20h22M42 12h22M42 20h18" stroke="#c9d2e1" stroke-width="2"/></g>' +
        '<g transform="translate(120 262) rotate(-20)"><circle r="6" fill="none" stroke="#c8102e" stroke-width="3"/><circle cx="12" r="6" fill="none" stroke="#c8102e" stroke-width="3"/><path d="M3 -4 L30 -22 M9 -4 L-14 -22" stroke="#56627a" stroke-width="3"/></g>' +
        '<rect x="500" y="252" width="16" height="26" rx="3" fill="#f2b134"/><rect x="503" y="246" width="10" height="8" fill="#e07a5f"/>' +
        fig2(150, 350, P[0], { back: true, arm: "out" }) + fig2(250, 360, P[5], { back: true }) + fig2(370, 360, P[6], { back: true, hair: "#5a3825", arm: "out" }) + fig2(470, 350, P[7], { back: true }) +
        bub(240, 205, "Can I have the glue, please?") + bub(470, 205, "Here you are!", { left: true });
    } else {
      s = '<rect width="640" height="400" fill="#eef2f8"/><rect x="40" y="40" width="560" height="220" fill="#203a43"/>' +
        '<path d="M40 40 h90 q-20 110 0 220 h-90z" fill="#c8102e"/><path d="M600 40 h-90 q20 110 0 220 h90z" fill="#c8102e"/><rect x="40" y="36" width="560" height="14" fill="#a80d27"/>' +
        '<text x="320" y="78" text-anchor="middle" font-family="Montserrat,Arial,sans-serif" font-size="18" font-weight="800" fill="#f2c14e">Story Day!</text>' +
        '<rect x="40" y="250" width="560" height="16" fill="#8a6d3b"/>' +
        fig2(230, 250, P[2], { s: 1.05 }) + lionFace(230, 180, 20) + fig2(330, 250, P[1], { s: .95, arm: "out" }) + mouseFace(330, 190, 14) + fig2(430, 250, P[3], { arm: "up" }) +
        [[90, 380], [160, 392], [240, 384], [400, 384], [480, 392], [550, 380]].map(function (q, k) { return fig2(q[0], q[1], ["#56627a", "#3d8b7d", "#6c8ebf", "#b56576", "#5e6c9c", "#81b29a"][k], { back: true, s: 1.05, arm: k % 2 ? "up" : "down", hair: ["#2b2b2b", "#5a3825", "#1d1d1d"][k % 3] }); }).join("") +
        '<text x="140" y="300" font-size="22" fill="#e8a900">★</text><text x="500" y="300" font-size="22" fill="#e8a900">★</text>' +
        bub(320, 150, "I will help you, Lion!");
    }
    return '<svg viewBox="0 0 640 400" role="img" aria-hidden="true" style="display:block;width:100%;height:auto"><defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#14213d"/></marker></defs>' + s + '</svg>';
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
        ["(5 phút) Ôn từ khóa bằng trò chớp thẻ (flash cards). Đọc lại các dự đoán trên bảng."],
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
    return '<section class="about-hero"><div class="stack"><p class="eyebrow">' + D.eyebrow + '</p><h1 id="page-h">' + D.title + '</h1><p class="lede">' + esc(D.lede) + '</p>' +
      '<div class="panel"><p class="eyebrow" style="margin-bottom:6px">' + D.dq_h + '</p><p class="quote">' + esc(D.dq) + '</p></div></div>' +
      collage([P[0]], "one") + '</section>' +
      '<section><h2 style="margin-bottom:14px">' + D.ph_h + '</h2><ol class="pbl">' + D.ph.map(function (p, i) { return '<li><a href="#reading-is-fun" data-lp="' + i + '"><b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span></a></li>'; }).join("") + '</ol></section>' +
      '<section id="lesson-plans"><h2 style="margin-bottom:6px">' + D.lp_h + '</h2><p class="msg" style="margin-bottom:14px">' + D.lp_l + '</p><div class="stack" style="gap:10px">' + plans.map(function (p, i) { return planDetails(p, i, vi); }).join("") + '</div></section>' +
      '<section><h2 style="margin-bottom:14px">' + D.gal_h + '</h2>' + collage(P.slice(1, 7), "rif") + '</section>' +
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
    $("#nav").innerHTML = [["home", t("nav_home")], ["library", t("nav_lib")], ["reading-is-fun", t("nav_rif")], ["perspective", t("nav_persp")], ["about", t("nav_about")]].map(function (n) { return '<a href="#' + n[0] + '" data-r="' + n[0] + '">' + esc(n[1]) + '</a>'; }).join("");
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-l") === lang ? "true" : "false"); });
    $("#foot").innerHTML = '<div class="foot-row"><div><div style="display:flex;gap:10px;align-items:center;margin-bottom:6px"><b style="color:var(--ink)">' + esc(t("site")) + '</b></div><p>' + esc(t("foot_line")) + '</p></div>' +
      '<div class="foot-links">' + (CFG.authorSite ? '<a href="' + esc(CFG.authorSite) + '" target="_blank" rel="noopener">www.trangphan.org</a>' : '') +
      (CFG.linkedin ? '<a href="' + esc(CFG.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' : '') + (CFG.facebook ? '<a href="' + esc(CFG.facebook) + '" target="_blank" rel="noopener">Facebook</a>' : '') + '</div></div>';
  }
  var firstRoute = true;
  function route() {
    if (player) { player.destroy(); player = null; }
    Store.unsubscribeAll();
    var h = (location.hash || "").replace(/^#/, "") || CFG.start || "home", html, key = h, g = null;
    if (h.indexOf("game-") === 0) { g = bySlug(h.slice(5)); key = "library"; }
    if (h === "home") { html = viewHome(); setMeta(t("site") + " · Phan Thị Quỳnh Trang", t("hero_lede")); }
    else if (h === "reading-is-fun") { html = viewRif(); setMeta("Reading is Fun · " + t("site"), lang === "vi" ? "Reading is Fun: học kỹ năng đọc tiếng Anh qua truyện theo mô hình dự án, do Phan Thị Quỳnh Trang tổ chức." : "Reading is Fun: building English reading skills through stories as a project-based learning programme by Phan Thị Quỳnh Trang."); }
    else if (h === "library") { html = viewLibrary(); setMeta(t("lib_title") + " · " + t("site"), t("lib_lede")); }
    else if (h === "perspective") { html = viewPerspective(); setMeta(t("persp_title") + " · " + t("site"), t("persp_lede")); }
    else if (h === "about") { html = viewAbout(); setMeta("Phan Thị Quỳnh Trang · " + t("site"), lang === "vi" ? "Giới thiệu Phan Thị Quỳnh Trang, nhà giáo dục TESOL và tác giả bộ hoạt động Khơi nguồn sáng tạo hoạt động ESL." : "About Phan Thị Quỳnh Trang, TESOL educator and author of Sparking Creativity in ESL Activities."); }
    else if (g) { html = viewGame(g); setMeta(L(g, "name") + " – " + t("site") + " · Phan Thị Quỳnh Trang", L(g, "meta")); }
    else { html = '<h1 id="page-h">' + t("notfound") + '</h1><p style="margin-top:12px"><a href="#home">' + t("nav_home") + '</a></p>'; key = ""; }
    app.innerHTML = html;
    $$("#nav a").forEach(function (a) { if (a.getAttribute("data-r") === key) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (h === "library") bindLibrary();
    $$(".cite").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var el = document.getElementById("src-" + a.getAttribute("data-src")); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1600); } }); });
    $$("[data-lp]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var d = $$("details.lp")[+a.getAttribute("data-lp")]; if (d) { d.open = true; d.scrollIntoView(); d.querySelector("summary").focus({ preventScroll: true }); } }); });
    if (g) {
      player = Player($("#player"), g);
      bindFeedback(g);
      $$("[data-jump]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); var el = document.getElementById(a.getAttribute("data-jump")); if (el) { el.scrollIntoView(); el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); } }); });
    }
    if (!firstRoute) { window.scrollTo(0, 0); var hd = $("h1", app); if (hd) { hd.setAttribute("tabindex", "-1"); hd.focus({ preventScroll: true }); } }
    firstRoute = false;
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
