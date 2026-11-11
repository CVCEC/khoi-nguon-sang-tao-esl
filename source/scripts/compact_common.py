# -*- coding: utf-8 -*-
from compact import build

X = {
 'A11': 'A1.1 | Receptive and Expressive Communication | ', 'A12': 'A1.2 | Student Agency and Engagement | ',
 'B11': 'B1.1 | Effective Listening Skills | ', 'B12': 'B1.2 | Listening Strategies for Comprehension | ',
 'B13': 'B1.3 | Speaking Purposes and Strategies | ', 'B14': 'B1.4 | Oral and Non-Verbal Communication Strategies | ',
 'B15': 'B1.5 | Word Choice, Syntax, and Grammar in Oral Communication | ',
 'B21': 'B2.1 | Word-Level Reading and Spelling | ', 'B22': 'B2.2 | Vocabulary | ', 'B23': 'B2.3 | Reading Fluency: Accuracy, Rate, and Prosody | ',
 'B31': 'B3.1 | Syntax and Sentence Structure | ', 'B32': 'B3.2 | Grammar | ', 'B33': 'B3.3 | Capitalization and Punctuation | ',
 'C21': 'C2.1 | Prereading: Activating Prior Knowledge | ', 'C23': 'C2.3 | Making and Confirming Predictions | ',
 'C24': 'C2.4 | Ongoing Comprehension Check | ', 'C25': 'C2.5 | Making Connections | ', 'C26': 'C2.6 | Summarizing | ',
 'D11': 'D1.1 | Purpose and Audience | ', 'D12': 'D1.2 | Developing Ideas | ', 'D13': 'D1.3 | Research | ',
 'D14': 'D1.4 | Organizing Content | ', 'D15': 'D1.5 | Reflecting on Learning | ',
}
STRAND = {'A': 'A. Literacy Connections and Applications', 'B': 'B. Foundations of Language', 'C': 'C. Comprehension', 'D': 'D. Composition'}

def ex(*pairs):
    return "\n".join(X[k] + d for k, d in pairs)

G = []
def A(id, slug, src, en, vi, sk, lv, step, cefr, gr, time, size, mode, board, lines, cards, prep, exp, why, st,
      goals, sc, dn, dadv, focus, of, mats, ctx, vnadapt, gdpt, vnnow, tip, prog=None):
    codes = [ln.split("|")[0].strip() for ln in exp.split("\n")]
    strand = "; ".join(STRAND[c] for c in sorted({c[0] for c in codes}, key="BCDA".index))
    e = dict(id=id, slug=slug, src=src, en=en, vi=vi, sk=sk, lv=lv, step=step, cefr=cefr, gr=gr, time=time, size=size, mode=mode,
             board=board, lines=lines, cards=cards, prep=prep, exp=exp, strand=strand, why=why, st=st, goals=goals, sc=sc,
             dn=dn, dadv=dadv, focus=focus, of=of, mats=mats, ctx=ctx, vnadapt=vnadapt, gdpt=gdpt, vnnow=vnnow, tip=tip, prog=prog)
    G.append(build(e, int(id[1:])))
