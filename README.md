# RS1

研究レポート標準（RS1）。大学のレポート・ゼミのレジュメ・卒業論文を、報告の種類に応じた同じ骨格で書くための規定とテンプレート。

- 共通ルール：[`rules/README.md`](rules/README.md)
- 報告の種類別パターン A〜H：[`patterns/`](patterns/)（選び方は [`patterns/00-chooser.md`](patterns/00-chooser.md)）
- 出力規定（環境差・LaTeX・Word・PDF）：[`typeset/`](typeset/)
- テンプレート：[`templates/latex/`](templates/latex/)（`rs1.sty`・`rs1-report.tex`・`refs.bib`・出力見本 PDF）、[`templates/word/`](templates/word/)（`rs1-report.docx`・`rs1-short.docx`）
- GPT 用の設定：[`gpt/`](gpt/)
- デザインシステムの部品とトークン：[`design-system/`](design-system/)

授業・学科・提出先の指定は、常に RS1 より優先する。

## ファイルの直リンク（GPT・ツールから読むとき）

| ファイル | URL |
| --- | --- |
| `rules/README.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/rules/README.md |
| `patterns/00-chooser.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/00-chooser.md |
| `patterns/01-experiment.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/01-experiment.md |
| `patterns/02-literature-review.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/02-literature-review.md |
| `patterns/03-field-observation.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/03-field-observation.md |
| `patterns/04-data-analysis.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/04-data-analysis.md |
| `patterns/05-progress-report.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/05-progress-report.md |
| `patterns/06-thesis.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/06-thesis.md |
| `patterns/07-argumentative.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/07-argumentative.md |
| `patterns/08-short-report.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/08-short-report.md |
| `patterns/99-sources.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/patterns/99-sources.md |
| `typeset/00-environment.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/typeset/00-environment.md |
| `typeset/10-latex.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/typeset/10-latex.md |
| `typeset/11-docx.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/typeset/11-docx.md |
| `typeset/12-pdf.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/typeset/12-pdf.md |
| `typeset/13-latex-source.md` | https://raw.githubusercontent.com/kami2news/rs1-report-standard/main/typeset/13-latex-source.md |

## KM1 との関係

RS1 は、自分用デザイン標準 KM1（`kami2news/km1-design-system`）の姉妹の標準。KM1 が画面・一般の文書・スライドの土台、RS1 は大学の授業・ゼミ・卒業研究で提出するレポート・レジュメ・論文の専用規定。

**順位：** 授業・提出先の指定 ＞ RS1 ＞ KM1。研究レポートでは KM1 の「PDF の規定」（KM1-DOC-001）と Word の規定（KM1-DOC-002）の代わりに RS1 を使う。

| 場面 | 従う標準 |
| --- | --- |
| 授業のレポート・ゼミのレジュメ・卒業論文 | RS1 |
| 発表スライド | 中身の順番は RS1（`patterns/05-progress-report.md`）、見た目は KM1-DOC-003 |
| レポートに載せるグラフ | RS1 の「グラフの色」（`chart-1`〜`chart-4`、色・マーカー・線種を組にする） |
| それ以外の資料・手順書・画面・アプリ | KM1 |

**共通の土台（KM1 から引き継ぐ）：** 書体は Noto Sans JP（400・700）、余白は 4px 刻み、ライトテーマで白黒印刷でも読める、色だけで意味を伝えない、数値と単位の間に半角の空白、メインカラー `#10218B`（RS1 では画面の部品だけに使い、文書の中では使わない）。

**意図して KM1 と違う点（実際の授業レポートの形に合わせるため）：**

| 項目 | KM1（KM1-DOC-001・002） | RS1 |
| --- | --- | --- |
| 見出しの色 | 章は紺（`brand-ink`）＋下に 2pt の線 | 黒の太字だけ。色・線を付けない |
| 余白 | 上下 20 mm・左右 17 mm | 四方 25 mm |
| 本文 | 10pt・行送り 1.7 | 10.5pt（Word は行送り固定 19.5pt） |
| 表 | 見出しセルに薄い灰色の背景 | 三線表、背景なし |
| PDF の版 | 求められたときだけ PDF/A | PDF/A-2b が基本 |
| ファイル名 | `<文書名>_<YYYY-MM-DD>.pdf` | 半角英数字だけ（`学籍番号_姓_課題名_YYYYMMDD.pdf`） |
| 書体の代わり | Noto Sans CJK JP を許す | 指定しない（無い PC には PDF で渡す） |
| 範囲の記号 | 〜 を使う | 〜 は使わず、en ダッシュ「–」か「から」 |

**トークンについて（未整理）：** `design-system/tokens.json` の色の一部は KM1 の値を写したもの（`#10218B`・`#242424`・`#616161`・`#d1d1d1`・`#0f6cbd`・`#b10e1c`）。名前は KM1 と違い（`ink-muted`＝KM1 の `ink-tertiary`、`line`＝`stroke`、`space-1`〜`8`＝`space-xs` など）、ダークの `brand`・`warning`・`line-strong`・`brand-tint`・`surface-subtle`・`focus-ring`・グラフの 4 色は KM1 とずれている。KM1 にそろえるかは今後決める。決まるまでは、KM1 の値を変えても RS1 は自動では変わらない。

## 正本と更新の流れ

**このリポジトリが RS1 の正本。** 変更はまずここで行い、そのあとで claude.ai のデザインシステム「RS1」と GPT に反映する。

| 置き場所 | 役割 | 更新のしかた |
| --- | --- | --- |
| このリポジトリ | 正本（規定・パターン・出力規定・テンプレート・部品の見本） | 直接編集してコミット |
| claude.ai のデザインシステム「RS1」 | 画面で見るための写し | `design-system/` と `rules/`・`patterns/`・`typeset/` の内容を反映する |
| 自分の GPT | 規定はこのリポジトリを直接読む | 規定は自動で最新。Word テンプレートを変えたときだけ知識ファイルを差し替える |

- `design-system/`：デザインシステムの部品の見本（`components/`）、トークン（`tokens.json`・`tokens.css`）、索引（`design-system.json`）。
- `templates/word/make.js`・`make-short.js`：Word テンプレートを作り直すスクリプト（Node.js と npm の `docx`）。`make-short.js` の出力は、表題・頭書き・参考文献・総文字数のスタイルに `w:snapToGrid w:val="0"` を後から加える。
