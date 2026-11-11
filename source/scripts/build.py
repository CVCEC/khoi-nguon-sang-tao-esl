# -*- coding: utf-8 -*-
"""Build both outputs from data/games.csv:
   dist/artifact/  — claude.ai artifact page (data inlined) + pdf/
   dist/site/      — static site (reads data/games.csv at runtime)"""
import csv, json, os, shutil, html
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.styles import ParagraphStyle

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC, DATA, DIST = [os.path.join(ROOT, d) for d in ("src", "data", "dist")]
CFG = {"authorSite": "https://www.trangphan.org", "linkedin": "https://www.linkedin.com/in/phan-thi-quynh-trang-cvcec", "facebook": "", "rifAlbum": "https://drive.google.com/drive/folders/1QcEU-sIorNBMVrh07D126r4Y3hdV3CAw?usp=sharing",
       "googleForm": {"url": "https://docs.google.com/forms/d/e/1FAIpQLScRG1KuWac8WAMlMveqbuSzmqsfKwNJCACP55GnVjxOfRDf9w/viewform", "entryGame": "entry.186104599"}}
NAVY = colors.HexColor("#14213d"); GOLD = colors.HexColor("#e8a900"); MUTED = colors.HexColor("#56627a"); TINT = colors.HexColor("#e9eef7")

rows = list(csv.DictReader(open(os.path.join(DATA, "games.csv"), encoding="utf-8")))
rows = [r for r in rows if r.get("status", "pilot") != "draft"]
csv_text = open(os.path.join(DATA, "games.csv"), encoding="utf-8").read()

# ------------------------------------------------------------------ PDFs
pdfmetrics.registerFont(TTFont("DV", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DVB", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
st = {
  "h1": ParagraphStyle("h1", fontName="DVB", fontSize=18, leading=23, textColor=NAVY),
  "sub": ParagraphStyle("sub", fontName="DV", fontSize=10, leading=14, textColor=MUTED),
  "h2": ParagraphStyle("h2", fontName="DVB", fontSize=11.5, leading=15, textColor=NAVY, spaceBefore=9, spaceAfter=3),
  "b": ParagraphStyle("b", fontName="DV", fontSize=9.5, leading=13.5),
  "li": ParagraphStyle("li", fontName="DV", fontSize=9.5, leading=13.5, leftIndent=12, bulletIndent=2, bulletFontName="DV"),
  "sm": ParagraphStyle("sm", fontName="DV", fontSize=8, leading=11, textColor=MUTED),
}
LBL = {
 "en": dict(plan="Lesson Plan", level="Level", time="Time", size="Class size", prep="Preparation", align="Ontario Curriculum Alignment (aligned with)", steps="Steps", tip="Pro-tip from Phan Thị Quỳnh Trang", min="min", stud="students",
            foot="Khơi nguồn sáng tạo hoạt động ESL · Sparking Creativity in ESL Activities · Phan Thị Quỳnh Trang · www.trangphan.org"),
 "vi": dict(plan="Giáo án", level="Trình độ", time="Thời lượng", size="Sĩ số", prep="Chuẩn bị", align="Phù hợp chương trình Ontario (aligned with)", steps="Các bước", tip="Pro-tip từ Phan Thị Quỳnh Trang", min="phút", stud="học sinh",
            foot="Khơi nguồn sáng tạo hoạt động ESL · Phan Thị Quỳnh Trang biên soạn · www.trangphan.org"),
}
def e(s): return html.escape(s or "")
def sections(text):
    out, cur = [], None
    for ln in (text or "").splitlines():
        ln = ln.strip()
        if not ln: continue
        if ln.startswith("## "): cur = [ln[3:], []]; out.append(cur)
        elif cur is not None: cur[1].append(ln[2:] if ln.startswith("- ") else ln)
    return out

def make_pdf(r, lang, path):
    U = "EN" if lang == "en" else "VI"; lb = LBL[lang]
    def foot(c, d):
        c.saveState(); c.setFillColor(NAVY); c.rect(0, A4[1] - 8 * mm, A4[0], 8 * mm, stroke=0, fill=1)
        c.setFillColor(GOLD); c.rect(0, A4[1] - 9 * mm, 40 * mm, 1 * mm, stroke=0, fill=1)
        c.setFont("DV", 7.5); c.setFillColor(MUTED); c.drawString(18 * mm, 10 * mm, lb["foot"]); c.drawRightString(A4[0] - 18 * mm, 10 * mm, str(d.page)); c.restoreState()
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=18 * mm, bottomMargin=18 * mm,
                            title=f"{r['ten_'+U]} – {lb['plan']}", author="Phan Thị Quỳnh Trang")
    other = r["ten_EN"] if lang == "vi" else r["ten_VI"]
    S = [Paragraph(f"{lb['plan']} · {e(r['id'])}", st["sub"]), Paragraph(e(r["ten_" + U]), st["h1"]), Paragraph(e(other), st["sub"]), Spacer(1, 6)]
    info = [[Paragraph(f"<b>{lb['level']}</b><br/>{e(r['trinh_do'].replace(';',' – ').title())}<br/>{e(r['step_level'])} · CEFR {e(r['cefr'])}", st["b"]),
             Paragraph(f"<b>{lb['time']}</b><br/>{e(r['thoi_luong'])} {lb['min']}", st["b"]),
             Paragraph(f"<b>{lb['size']}</b><br/>{e(r['si_so'])} {lb['stud']}", st["b"])],
            [Paragraph(f"<b>{lb['prep']}:</b> {e(r['chuan_bi_'+U])}", st["b"]), "", ""]]
    t = Table(info, colWidths=[64 * mm, 55 * mm, 55 * mm]); t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), TINT), ("SPAN", (0, 1), (-1, 1)), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOX", (0, 0), (-1, -1), .5, NAVY), ("INNERGRID", (0, 0), (-1, -1), .3, colors.white), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    S += [t, Paragraph(lb["align"], st["h2"]), Paragraph(f"{e(r['ontario_program'])} — {e(r['ontario_strand'])}", st["sm"])]
    for ln in r["ontario_expectation"].splitlines():
        p = [x.strip() for x in ln.split("|")]
        if p and p[0]: S.append(Paragraph(f"<b>{e(p[0])}</b> {e(p[1] if len(p)>1 else '')} — {e(p[2] if len(p)>2 else '')}", st["li"], bulletText="•"))
    for h, items in sections(r["giao_an_" + U]):
        block = [Paragraph(e(h), st["h2"])] + [Paragraph(e(x), st["li"], bulletText=("✓" if h.lower().startswith(("success", "tiêu chí")) else "•")) for x in items]
        S.append(KeepTogether(block))
    S.append(Paragraph(lb["steps"], st["h2"]))
    for i, ln in enumerate([l for l in r["cac_buoc_" + U].splitlines() if l.strip()], 1):
        a, _, b = ln.partition("::"); S.append(Paragraph(f"<b>{i}. {e(a.strip())}</b> — {e(b.strip())}", st["li"]))
    S += [Paragraph(lb["tip"], st["h2"]), Paragraph(f"“{e(r['pro_tip_'+U])}”", st["b"])]
    doc.build(S, onFirstPage=foot, onLaterPages=foot)

shutil.rmtree(DIST, ignore_errors=True); os.makedirs(DIST)  # PDF giáo án: không phát hành (chỉ xem trực tuyến)

# ------------------------------------------------------------------ pages
css = open(os.path.join(SRC, "app.css"), encoding="utf-8").read()
js = open(os.path.join(SRC, "app.js"), encoding="utf-8").read()
body = open(os.path.join(SRC, "body.html"), encoding="utf-8").read()
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;600;700&display=swap">'
TITLE = "Khơi nguồn sáng tạo hoạt động ESL"
DESC = "Thư viện trò chơi ESL song ngữ Anh–Việt do Phan Thị Quỳnh Trang biên soạn: video 2D, giáo án theo khung Ontario, góc nhìn lớp học Việt Nam."

# artifact
A = os.path.join(DIST, "artifact"); os.makedirs(A); shutil.copytree(os.path.join(SRC, "img"), os.path.join(A, "img"))
acfg = dict(CFG, mode="artifact")
open(os.path.join(A, "index.html"), "w", encoding="utf-8").write(
  f'<title>{TITLE}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<meta name="description" content="{e(DESC)}">\n<meta name="author" content="Phan Thị Quỳnh Trang">\n{FONTS}\n<style>\n{css}\n</style>\n{body}\n'
  f'<script>window.ESL_CONFIG={json.dumps(acfg)};window.ESL_CSV={json.dumps(csv_text, ensure_ascii=False)};</script>\n<script>\n{js}\n</script>\n')

# static site
W = os.path.join(DIST, "site")
for d in ("assets", "data", "apps-script"): os.makedirs(os.path.join(W, d), exist_ok=True)
shutil.copytree(os.path.join(SRC, "img"), os.path.join(W, "img"))
open(os.path.join(W, "assets", "app.css"), "w", encoding="utf-8").write(css)
open(os.path.join(W, "assets", "app.js"), "w", encoding="utf-8").write(js)
shutil.copy(os.path.join(DATA, "games.csv"), os.path.join(W, "data", "games.csv"))
shutil.copy(os.path.join(DATA, "games.xlsx"), os.path.join(W, "data", "games.xlsx"))
SITE_URL = "https://esl.trangphan.org/"

def page(title, desc, base, start, canonical, jsonld):
    cfg = dict(CFG, mode="static", base=base, csvUrl="data/games.csv", feedbackEndpoint="", googleSheetCsv="")
    if start: cfg["start"] = start
    return f'''<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(title)}</title><meta name="description" content="{e(desc)}"><meta name="author" content="Phan Thị Quỳnh Trang">
<link rel="canonical" href="{canonical}"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="{canonical}">
{FONTS}<link rel="stylesheet" href="{base}assets/app.css">
<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>
<!-- Cấu hình: googleForm.url = link Google Form, googleForm.entryGame = mã entry.xxx của câu "Trò chơi"; googleSheetCsv = link CSV "Xuất bản lên web" của trang tính phản hồi (để hiện điểm trung bình); feedbackEndpoint = Apps Script (cách thay thế) -->
<script>window.ESL_CONFIG={json.dumps(cfg)};</script>
</head><body>
{body}
<script src="{base}assets/app.js" defer></script>
</body></html>
'''
author = {"@type": "Person", "name": "Phan Thị Quỳnh Trang", "url": CFG["authorSite"]}
org = author
open(os.path.join(W, "index.html"), "w", encoding="utf-8").write(page(TITLE + " · Phan Thị Quỳnh Trang", DESC, "", "", SITE_URL,
  {"@context": "https://schema.org", "@type": "WebSite", "name": TITLE, "alternateName": "Sparking Creativity in ESL Activities", "url": SITE_URL, "author": author, "publisher": org, "inLanguage": ["vi", "en"]}))
for r in rows:
    d = os.path.join(W, "games", r["slug"]); os.makedirs(d)
    url = SITE_URL + "games/" + r["slug"] + "/"
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page(
      f"{r['ten_VI']} ({r['ten_EN']}) – {TITLE} · Phan Thị Quỳnh Trang", r["meta_VI"], "../../", "game-" + r["slug"], url,
      {"@context": "https://schema.org", "@type": "LearningResource", "name": r["ten_EN"], "alternateName": r["ten_VI"], "description": r["meta_EN"], "url": url,
       "author": author, "publisher": org, "inLanguage": ["en", "vi"], "learningResourceType": "Classroom activity", "educationalLevel": r["cefr"], "timeRequired": "PT" + r["thoi_luong"].split("-")[-1] + "M",
       "educationalAlignment": [{"@type": "AlignmentObject", "alignmentType": "teaches", "educationalFramework": "Ontario Curriculum, Language (2023)", "targetName": ln.split("|")[0].strip() + " " + ln.split("|")[1].strip()} for ln in r["ontario_expectation"].splitlines() if "|" in ln]}))
shutil.copy(os.path.join(SRC, "Code.gs"), os.path.join(W, "apps-script", "Code.gs"))
shutil.copy(os.path.join(SRC, "README.md"), os.path.join(W, "README.md"))
print("built", len(rows), "games")
