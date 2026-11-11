# -*- coding: utf-8 -*-
"""Compact builder for activities G024–G090: one short bilingual spec per activity is expanded into the full row
(lesson plan in Ontario format, Vietnam perspective, meta) used by the website."""
from games_batch2 import plan, vn, steps, ROW_SIZE, ROW_TIME

MODE_ADAPT = {
    "floor": ("Use the aisles and the space in front of the board; call one row at a time.", "Dùng lối đi và khoảng trống trước bảng; gọi lần lượt từng dãy."),
    "pairs": ("Desk partners work as pairs; for round two, turn to the pair behind.", "Bạn cùng bàn làm thành cặp; vòng hai thì quay xuống cặp bàn sau."),
    "table": ("A group of 4 = two desks: the front pair turns around to face the back pair.", "Nhóm 4 em = hai bàn: cặp bàn trên quay xuống cặp bàn dưới."),
    "board": ("Each row is a team and sends one player at a time to the board.", "Mỗi dãy là một đội, mỗi lượt cử một bạn lên bảng."),
    "bowling": ("Run two lanes at once in the aisles; waiting teams write the words they hear.", "Mở hai đường lăn ở lối đi; đội chờ lượt viết các từ nghe được."),
}
ON_LEARN = [
    ("Ontario teachers can learn from Vietnam: clear routines and transition signals keep a large group on task.", "Giáo viên Ontario học từ Việt Nam: nề nếp và tín hiệu chuyển hoạt động rõ ràng giữ lớp đông tập trung."),
    ("Ontario teachers can learn from Vietnam: choral modelling gives newcomers a safe start before speaking alone.", "Giáo viên Ontario học từ Việt Nam: làm mẫu đồng thanh giúp học sinh mới đến tự tin trước khi nói một mình."),
    ("Ontario teachers can learn from Vietnam: low-cost, hand-made materials work as well as printed kits.", "Giáo viên Ontario học từ Việt Nam: đồ dùng tự làm, chi phí thấp hiệu quả không kém bộ in sẵn."),
    ("Ontario teachers can learn from Vietnam: class monitors and group leaders share classroom management with students.", "Giáo viên Ontario học từ Việt Nam: cán sự lớp và nhóm trưởng cùng giáo viên quản lý lớp."),
    ("Ontario teachers can learn from Vietnam: notebook records give a clear picture of progress over the year.", "Giáo viên Ontario học từ Việt Nam: ghi chép trong vở cho thấy rõ tiến bộ cả năm học."),
    ("Ontario teachers can learn from Vietnam: families are keen partners when invited into class events.", "Giáo viên Ontario học từ Việt Nam: phụ huynh rất sẵn lòng đồng hành khi được mời tham gia hoạt động lớp."),
]
SK_EN = {"listening-speaking": "listening and speaking", "reading": "reading", "writing": "writing", "vocab-grammar": "vocabulary and grammar", "integrated": "integrated learning"}
SK_VI = {"listening-speaking": "nghe nói", "reading": "đọc", "writing": "viết", "vocab-grammar": "từ vựng, ngữ pháp", "integrated": "học tích hợp"}

def split_time(t):
    hi = int(str(t).split("-")[-1]); hi = min(hi, 45)
    m = max(3, round(hi * 0.15)); c = max(3, round(hi * 0.15)); a = hi - m - c
    a1 = max(2, round(a * 0.2)); a3 = max(3, round(a * 0.3)); a2 = a - a1 - a3
    return m, (a1, a2, a3), c

def build(e, idx):
    st = e["st"]
    m, (a1, a2, a3), c = split_time(e["time"])
    def P(lang):
        L = 0 if lang == "en" else 1
        u = "min" if lang == "en" else "phút"
        T = (lambda s: s[0], lambda s: s[2])[L]; D = (lambda s: s[1], lambda s: s[3])[L]
        minds = [f"({m} {u}) {T(st[0])}: {D(st[0])}"]
        action = [f"({a1} {u}) {T(st[1])}: {D(st[1])}", f"({a2} {u}) {T(st[2])}: {D(st[2])}", f"({a3} {u}) {T(st[3])}: {D(st[3])}"]
        cons = [f"({c} {u}) {T(st[4])}: {D(st[4])}"]
        ass = [("observe and note " if lang == "en" else "quan sát và ghi chú ") + e["focus"][L] + ".",
               "students self-check the success criteria (thumbs up / sideways / down)." if lang == "en" else "học sinh tự đánh giá theo tiêu chí thành công (ngón cái lên / ngang / xuống).",
               e["of"][L].split(": ", 1)[-1]]
        return plan(lang, e["goals"][L], e["sc"][L], minds, action, cons, e["dn"][L], e["dadv"][L], ass, e["mats"][L])
    def V(lang):
        L = 0 if lang == "en" else 1
        rows = [ROW_SIZE[lang], ROW_TIME[lang], e["ctx"][L]]
        adapt = [MODE_ADAPT.get(e["mode"], MODE_ADAPT["table"])[L], e["vnadapt"][L], e["gdpt"][L]]
        now = ("Vietnamese teachers can apply now: " if lang == "en" else "Giáo viên Việt Nam áp dụng ngay: ") + e["vnnow"][L]
        lessons = [now, ON_LEARN[idx % len(ON_LEARN)][L]]
        return vn(lang, rows, adapt, lessons)
    sk = e["sk"].split(";")
    prog = e.get("prog") or f"Language, Grades 1–8 (2023) · {e['step']}"
    gr_en = {"1-3": "Grades 1–3", "3-8": "Grades 3–8", "9-12": "Grades 9–12", "adult": "adults", "4-8": "Grades 4–8"}
    gr_vi = {"1-3": "lớp 1–3", "3-8": "lớp 3–8", "9-12": "lớp 9–12", "adult": "người lớn", "4-8": "lớp 4–8"}
    g_en = ", ".join(gr_en.get(x, x) for x in e["gr"].split(";")); g_vi = ", ".join(gr_vi.get(x, x) for x in e["gr"].split(";"))
    return dict(
        id=e["id"], slug=e["slug"], status="pilot", nguon=e.get("src", ""), ten_EN=e["en"], ten_VI=e["vi"], ky_nang=e["sk"],
        trinh_do=e["lv"], step_level=e["step"], cefr=e["cefr"], khoi_lop=e["gr"], thoi_luong=e["time"], si_so=e["size"],
        thiet_bi=e.get("dev", "no"), chuan_bi_EN=e["prep"][0], chuan_bi_VI=e["prep"][1], kieu_video=e["mode"],
        minh_hoa_bang=e["board"], minh_hoa_loi=e["lines"], minh_hoa_the=e.get("cards", ""),
        ontario_program=prog, ontario_strand=e["strand"], ontario_expectation=e["exp"],
        the_why_EN=e["why"][0], the_why_VI=e["why"][1],
        cac_buoc_EN=steps([(s[0], s[1]) for s in st]), cac_buoc_VI=steps([(s[2], s[3]) for s in st]),
        giao_an_EN=P("en"), giao_an_VI=P("vi"), goc_nhin_VN_EN=V("en"), goc_nhin_VN_VI=V("vi"),
        pro_tip_EN=e["tip"][0], pro_tip_VI=e["tip"][1],
        meta_EN=f"{e['en']}: an ESL activity for {g_en} focused on {', '.join(SK_EN[x] for x in sk)}, with a 2D video, an Ontario-aligned lesson plan and tips for large classes.",
        meta_VI=f"{e['vi']}: hoạt động tiếng Anh cho {g_vi}, tập trung {', '.join(SK_VI[x] for x in sk)}, có video 2D, giáo án theo khung Ontario và mẹo cho lớp đông.",
    )
