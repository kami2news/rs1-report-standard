# 出力規定：LaTeX / LaTeX

RS1 の文書を LaTeX で組むときの規定。テンプレートの全文は `typeset/13-latex-source.md`、出力見本は `templates/rs1-report-sample.pdf`。ファイル一式（rs1-templates.zip）は別に配布する。学科・学会の指定クラスがあるときはそちらを使い、この規定は指定のない部分だけに当てる。

## 1　エンジンとクラス

| 項目 | 規定 |
| --- | --- |
| エンジン | LuaLaTeX（TeX Live 2023 以降）。pLaTeX・upLaTeX は使わない |
| クラス | `jlreq`（日本語組版処理の要件に準拠したクラス） |
| 書体 | 和文・欧文とも原ノ味角ゴシック（Regular・Bold）を `luatexja-fontspec` で指定。TeX Live に同梱なので、どの OS でも同じ字形になる。コードは Noto Sans Mono（入っていなければ Latin Modern Mono）。学科が明朝を指定したときは `\setmainjfont` を原ノ味明朝（HaranoAjiMincho）に替える |
| 文献処理 | `biblatex` ＋ `biber`、`style=numeric-comp`、`sorting=none`（本文に出てくる順の番号） |
| ビルド | `latexmk -lualatex`、または lualatex → biber → lualatex ×2 |

## 2　版面（A4 縦）

クラスオプションで次のとおり指定する。`geometry` パッケージは使わない（`jlreq` の版面設計と衝突するため）。

```
\documentclass[lualatex, paper=a4paper, fontsize=10.5pt, jafontsize=10.5pt,
  baselineskip=19.5pt, line_length=160mm, head_space=25mm, foot_space=25mm]{jlreq}
\usepackage{rs1}
```

| RS1 のトークン | 値 | LaTeX |
| --- | --- | --- |
| `page-margin` | 約 25 mm | `head_space=25mm`、`foot_space=25mm`、左右は `line_length=160mm` で 25 mm |
| `t-body` | 10.5 pt／行送り 19.5 pt | `fontsize=10.5pt`、`baselineskip=19.5pt` |
| `t-title` | 18 pt | `\rsonetitleblock` が設定 |
| `t-caption` | 9 pt | `caption` の `font=small` |

「1 行 40 字×30 行」のように指定されたときは、クラスオプションを `line_length=40zw, number_of_lines=30` に替え、`baselineskip` と `head_space`・`foot_space` を外す（版面の縦位置は jlreq が決める）。書体の指定（明朝など）があれば `\setmainjfont` を替える。

## 3　見出し・表題

- 章 `\section`、節 `\subsection`、項 `\subsubsection` の 3 階層まで。`\paragraph` 以下は使わない。
- 参考文献・付録・謝辞は `\section*` か `\printbibliography[title=参考文献]`。
- 1 頁目の頭は `\course`（講義名）・`\submitted`（提出日）・`\student`（学籍番号と氏名）・`\conditions`（実験日・天候・共同実験者など）を設定して `\rsonetitleblock{表題}`。英題は求められたときだけ `\titleen`。卒業論文は学科の表紙様式に従い、なければ `titlepage` 環境で `CoverPage` と同じ項目を並べる。
- 要旨は `rsabstract` 環境、キーワードは `\keywords{…}`。授業のレポートでは使わない（指示があるときだけ）。中間報告は `\begin{rsabstract}[要約]`。

## 4　図・表・式

- 表の説明は `\caption` を表の上に、図の説明は図の下に書く（`rs1.sty` が位置を固定）。
- 表は `booktabs` の三線表（`\toprule`・`\midrule`・`\bottomrule`）。縦罫（`|`）は使わない。数値列は `siunitx` の `S` 列で小数点をそろえる。
- 図は PDF（ベクター）を `\includegraphics` で入れる。写真など画像は 300 dpi 以上の PNG・JPEG。
- 系列の色は `rs1chart1`〜`rs1chart4` を使い、マーカーと線種も変える（README「グラフの色」）。
- 独立した式は `equation`、番号は `\label` と `\eqref` で参照する。式の直後に「ここで、…」で記号を説明する。
- 数値と単位は `\qty{12.3}{mg/L}`、単位だけは `\si{mS/m}` で書く（間のスペースが自動でそろう）。
- イオンの価数は `Ca\textsuperscript{2+}`、化学式が多いときは `mhchem` の `\ce{Ca^2+}`。
- 本文からの参照は `表~\ref{tab:…}`、`図~\ref{fig:…}`、`式~\eqref{eq:…}`。ラベル名は `fig:`・`tab:`・`eq:`・`sec:` で始める。

## 5　注記枠・引用

- 注記は `\rsnote{…}`（注記）・`\rsassume{…}`（前提）・`\rscaution{…}`（注意）・`\rsopen{…}`（未解決）。枠や色は付かず、行頭に太字のラベルと 1 字下げが入る。
- 文献は `refs.bib` に書き、本文は `\cite{key}`。`rs1.sty` が参考文献を RS1 の形（論文・書籍・本の章・Web とデータの 4 種類）に並べる。使う型は `@article`・`@book`・`@incollection`（`@inbook`）・`@online`（`@dataset`・`@misc`）。
- 和文の文献には `keywords = {ja}` を付け、名前を「姓, 名」で書く（例：`author = {山田, 太郎 and 鈴木, 花子}`）。出力は「山田 太郎・鈴木 花子」、6 名以上は「ほか」になる。欧文は「Family, Given」で書き、「Yamada, T., …, et al.」と出る。
- 版は `edition = {2}`（「第 2 版」と出る）、出版地は `location`、データの版は `version`、閲覧日は `urldate = {2026-11-16}`。
- URL は途中で改行されないので、長い URL は行からはみ出すことがある。そのときは DOI を優先し、URL はトップページまでにする。複数は `\cite{a,b}` で `[1, 2]`、連番は自動で `[4–6]` にまとまる。
- `.bib` の各項目に `doi` を、Web 資料には `url` と `urldate` を入れる。頁の無い電子ジャーナルは `pages` の代わりに `eid` に論文番号を書く。著者 6 名以上は自動で 3 名＋ほか（欧文は et al.）になる。
- 脚注は `\footnote{…}`。出典には使わない。

## 6　PDF の出力

- 1 行目の `\DocumentMetadata{pdfstandard=a-2b, lang=ja-JP}` で PDF/A-2b として出す。古い TeX でエラーになるときは、この行を消して普通の PDF にする。
- `\hypersetup{pdftitle=…, pdfauthor=…}` で文書情報を入れる。しおり（ブックマーク）は見出しから自動で作られる。
- 出力後は「PDF の規定」（`typeset/12-pdf.md`）のチェックを通す。

## 7　してはいけないこと

- `\\` や `\vspace` を重ねて体裁を作る（余白は `rs1.sty` に任せる）
- 図表の位置を `[H]` で固定しすぎる（基本は `[htbp]`）
- 色付きの文字で強調する（強調は太字か語順で）
- 他人の `.sty` をコピーして混ぜる（中身を確かめてから使う）
