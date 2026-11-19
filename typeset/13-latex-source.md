# LaTeX テンプレートのソース / LaTeX template source

`10-latex.md` の規定どおりに設定したテンプレートの全文。ファイルとして使うときは、それぞれを `rs1.sty`・`rs1-report.tex`・`refs.bib` の名前で同じフォルダに保存し、`latexmk -lualatex rs1-report` でコンパイルする。出力見本は `templates/rs1-report-sample.pdf`。

## rs1.sty

```latex
% rs1.sty — RS1 研究レポート標準の LaTeX 設定
% 使い方：jlreq（LuaLaTeX）で \usepackage{rs1}。詳しくは project/output/latex.md
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{rs1}[2026/11/16 v1.0 RS1 research report standard]

% ---- 書体：和文も欧文も原ノ味角ゴシック（= 源ノ角ゴシック／Noto Sans JP と同じデザイン。TeX Live に同梱なので OS に依存しない）
%      太さは Regular（400）と Bold（700）の 2 つだけ。コードは Noto Sans Mono（無ければ Latin Modern Mono）
\RequirePackage{luatexja-fontspec}
\setmainfont{HaranoAjiGothic}[Extension=.otf, UprightFont=*-Regular, BoldFont=*-Bold, ItalicFont=*-Regular, ItalicFeatures={FakeSlant=0.15}]
\setsansfont{HaranoAjiGothic}[Extension=.otf, UprightFont=*-Regular, BoldFont=*-Bold]
\setmainjfont{HaranoAjiGothic}[Extension=.otf, UprightFont=*-Regular, BoldFont=*-Bold]
\setsansjfont{HaranoAjiGothic}[Extension=.otf, UprightFont=*-Regular, BoldFont=*-Bold]
\IfFontExistsTF{Noto Sans Mono}{\setmonofont{Noto Sans Mono}[Scale=MatchLowercase]}{}

% ---- 数式・単位・表・図
\RequirePackage{amsmath}
\RequirePackage{siunitx}            % \qty{12.3}{mg/L}：数値と単位の間を半角スペースで固定
\sisetup{mode=match, reset-text-family=false, reset-text-series=false, reset-text-shape=false, inter-unit-product=\ensuremath{\cdot}, per-mode=symbol, uncertainty-mode=separate}
\RequirePackage{booktabs}           % 三線表：\toprule \midrule \bottomrule、縦罫は使わない
\RequirePackage{graphicx}
\RequirePackage{xcolor}

% ---- RS1 の色（tokens.json と同じ値。印刷はライトテーマ）
\definecolor{rs1ink}{HTML}{242424}
\definecolor{rs1inkmuted}{HTML}{616161}
\definecolor{rs1brand}{HTML}{10218B}
\definecolor{rs1linestrong}{HTML}{8A8A8A}
\definecolor{rs1info}{HTML}{0F6CBD}
\definecolor{rs1warning}{HTML}{8F4E00}
\definecolor{rs1chart1}{HTML}{10218B}
\definecolor{rs1chart2}{HTML}{B35900}
\definecolor{rs1chart3}{HTML}{00786B}
\definecolor{rs1chart4}{HTML}{6B6B6B}
\color{rs1ink}

% ---- 図表の説明：表は上、図は下。説明は 9pt
\RequirePackage{caption}
\captionsetup{font=small, labelfont=bf, labelsep=quad, skip=6pt}
\captionsetup[table]{position=top}
\captionsetup[figure]{position=bottom}

% ---- 見出し：3 階層まで（\section 章・\subsection 節・\subsubsection 項）
\setcounter{secnumdepth}{3}
\setcounter{tocdepth}{2}

% ---- 引用：番号方式、本文に出てくる順
\RequirePackage[backend=biber, style=numeric-comp, sorting=none, maxbibnames=5, minbibnames=3, giveninits=true]{biblatex}

% ---- 参考文献の並べ方（RS1 形式）
%   論文：著者（年）題名．誌名，巻（号），頁（または論文番号）．doi:…
%   書籍：著者（年）書名（第 n 版）．出版社，出版地．
%   章　：著者（年）章の題名．編者（編）書名，頁．出版社，出版地．
%   Web・データ：著者または機関（年）名称（版）．URL（最終閲覧日：YYYY年M月D日）
%   和文の文献は .bib に keywords = {ja} を書き、名前を「姓, 名」で書く。
%   著者は 5 名まで全員、6 名以上は 3 名＋「ほか」（欧文は「et al.」）。
\newtoggle{rsone@ja}
\AtEveryBibitem{\ifkeyword{ja}{\toggletrue{rsone@ja}}{\togglefalse{rsone@ja}}}
\DeclareNameFormat{rsone}{%
  \usebibmacro{name:delim}{\namepartfamily}%
  \iftoggle{rsone@ja}
    {\namepartfamily\ifdefvoid\namepartgiven{}{\addspace\namepartgiven}}
    {\namepartfamily\ifdefvoid\namepartgiveni{}{\addcomma\addspace\namepartgiveni}}%
  \usebibmacro{name:andothers}}
\DeclareNameAlias{author}{rsone}
\DeclareNameAlias{editor}{rsone}
\DeclareDelimFormat{multinamedelim}{\iftoggle{rsone@ja}{\printtext{・}}{\addcomma\space}}
\DeclareDelimFormat{finalnamedelim}{\iftoggle{rsone@ja}{\printtext{・}}{\addcomma\space}}
\DeclareDelimFormat{andothersdelim}{\iftoggle{rsone@ja}{}{\space}}
\renewcommand*{\finentrypunct}{}
\DefineBibliographyStrings{english}{andothers={\iftoggle{rsone@ja}{ほか}{et al\adddot}}}
\newcommand{\rsone@period}{\printtext{．}}
\newbibmacro{rsone:authoryear}{%
  \ifnameundef{author}{\ifnameundef{editor}{\printlist{organization}}{\printnames{editor}\printtext{（編）}}}{\printnames{author}}%
  \printtext{（\iffieldundef{year}{n.d.}{\printfield{year}}）}}
\newbibmacro{rsone:doiurl}{%
  \iffieldundef{doi}
    {\iffieldundef{url}{}{\printfield[rsoneurl]{url}%
       \iffieldundef{urlyear}{}{\printtext{（最終閲覧日：\thefield{urlyear}年\number\thefield{urlmonth}月\number\thefield{urlday}日）}}}}
    {\printtext{doi:\printfield[noformat]{doi}}}}
\newbibmacro{rsone:pub}{%
  \printlist[noformat]{publisher}%
  \iflistundef{location}{}{\printtext{，}\printlist[noformat]{location}}\rsone@period}
\newbibmacro{rsone:edition}{\iffieldundef{edition}{}{\printtext{（第\printfield[noformat]{edition}版）}}}
\DeclareBibliographyDriver{article}{%
  \usebibmacro{bibindex}\usebibmacro{rsone:authoryear}%
  \printfield[noformat]{title}\rsone@period
  \printfield[noformat]{journaltitle}%
  \iffieldundef{volume}{}{\printtext{，}\printfield[noformat]{volume}}%
  \iffieldundef{number}{}{\printtext{（\printfield[noformat]{number}）}}%
  \iffieldundef{pages}{\iffieldundef{eid}{}{\printtext{，}\printfield[noformat]{eid}}}{\printtext{，}\printfield{pages}}%
  \iffieldundef{volume}{\iffieldundef{pages}{\iffieldundef{eid}{\printtext{（早期公開）}}{}}{}}{}%
  \rsone@period\usebibmacro{rsone:doiurl}\usebibmacro{finentry}}
\DeclareBibliographyDriver{book}{%
  \usebibmacro{bibindex}\usebibmacro{rsone:authoryear}%
  \printfield[noformat]{title}\usebibmacro{rsone:edition}\rsone@period
  \usebibmacro{rsone:pub}\usebibmacro{rsone:doiurl}\usebibmacro{finentry}}
\DeclareBibliographyDriver{incollection}{%
  \usebibmacro{bibindex}\usebibmacro{rsone:authoryear}%
  \printfield[noformat]{title}\rsone@period
  \ifnameundef{editor}{}{\printnames{editor}\printtext{（編）}}%
  \printfield[noformat]{booktitle}\usebibmacro{rsone:edition}%
  \iffieldundef{pages}{}{\printtext{，}\printfield{pages}}\rsone@period
  \usebibmacro{rsone:pub}\usebibmacro{rsone:doiurl}\usebibmacro{finentry}}
\DeclareBibliographyAlias{inbook}{incollection}
\DeclareBibliographyDriver{online}{%
  \usebibmacro{bibindex}\usebibmacro{rsone:authoryear}%
  \printfield[noformat]{title}%
  \iffieldundef{version}{}{\printtext{（\printfield[noformat]{version}）}}\rsone@period
  \usebibmacro{rsone:doiurl}\usebibmacro{finentry}}
\DeclareBibliographyAlias{dataset}{online}
\DeclareBibliographyAlias{misc}{online}
\DeclareFieldFormat{pages}{\mkpageprefix[bookpagination][\mknormrange]{#1}}
\DeclareFieldFormat{bookpagination}{}
\DeclareFieldFormat{pagination}{}
\renewcommand*{\ppspace}{}
\renewcommand*{\bibfont}{\small\raggedright}
\setlength{\biblabelsep}{1\zw}
\DeclareFieldFormat{rsoneurl}{\href{#1}{\detokenize{#1}}}
\DefineBibliographyStrings{english}{page={},pages={}}

% ---- 表題ブロック：右上に講義名・提出日・氏名、中央に表題、その下に条件を 1〜2 行
\newcommand{\rsone@course}{}
\newcommand{\rsone@submitted}{}
\newcommand{\rsone@student}{}
\newcommand{\rsone@titleen}{}
\newcommand{\rsone@conditions}{}
\newcommand{\course}[1]{\renewcommand{\rsone@course}{#1}}
\newcommand{\submitted}[1]{\renewcommand{\rsone@submitted}{#1}}
\newcommand{\student}[1]{\renewcommand{\rsone@student}{#1}}
\newcommand{\titleen}[1]{\renewcommand{\rsone@titleen}{#1}}
\newcommand{\conditions}[1]{\renewcommand{\rsone@conditions}{#1}}
\newcommand{\rsonetitleblock}[1]{%
  \begingroup
  {\small\raggedleft
    \ifx\rsone@course\@empty\else\rsone@course\par\fi
    \ifx\rsone@submitted\@empty\else 提出日\quad\rsone@submitted\par\fi
    \ifx\rsone@student\@empty\else\rsone@student\par\fi}
  \vspace{24pt}
  {\centering\fontsize{18pt}{25pt}\selectfont\bfseries #1\par}
  \ifx\rsone@titleen\@empty\else{\centering\small\textcolor{rs1inkmuted}{\rsone@titleen}\par}\fi
  \ifx\rsone@conditions\@empty\else\vspace{24pt}{\small\noindent\rsone@conditions\par}\fi
  \vspace{6pt}\noindent\textcolor{rs1linestrong}{\rule{\linewidth}{0.5pt}}\par\vspace{18pt}
  \endgroup}

% ---- 要旨：囲みなし。中央に「要旨」、本文は左右 2 字下げ
\newenvironment{rsabstract}[1][要旨]{\par\vspace{12pt}{\centering\bfseries #1\par}\vspace{4pt}\begin{list}{}{\setlength{\leftmargin}{2\zw}\setlength{\rightmargin}{2\zw}}\item\relax}{\end{list}\vspace{12pt}}
\newcommand{\keywords}[1]{\par\smallskip{\small\textbf{キーワード：}#1}}

% ---- 注記：枠・色なし。行頭のラベルの語と 1 字下げで区別する
\newcommand{\rsone@callout}[2]{\par\smallskip\noindent\hspace*{1\zw}\textbf{［#1］}\hspace{1\zw}#2\par\smallskip}
\newcommand{\rsnote}[1]{\rsone@callout{注記}{#1}}
\newcommand{\rsassume}[1]{\rsone@callout{前提}{#1}}
\newcommand{\rscaution}[1]{\rsone@callout{注意}{#1}}
\newcommand{\rsopen}[1]{\rsone@callout{未解決}{#1}}

% ---- リンクと PDF の文書情報（\hypersetup{pdftitle=..., pdfauthor=...} を本文で設定）
\RequirePackage{hyperref}
\hypersetup{hidelinks, bookmarksnumbered=true, pdfdisplaydoctitle=true, pdflang=ja-JP}
\endinput
```

## rs1-report.tex

```latex
% RS1 研究レポート標準 — LaTeX テンプレート（パターン A：実験レポートの骨子）
% コンパイル：lualatex rs1-report → biber rs1-report → lualatex rs1-report ×2
% （latexmk -lualatex rs1-report でもよい）
\DocumentMetadata{pdfstandard=a-2b, lang=ja-JP}   % PDF/A-2b で出す。エラーになる古い TeX は この行を消す
\documentclass[lualatex, paper=a4paper, fontsize=10.5pt, jafontsize=10.5pt,
  baselineskip=19.5pt, line_length=160mm, head_space=25mm, foot_space=25mm]{jlreq}
\usepackage{rs1}
\addbibresource{refs.bib}

\hypersetup{pdftitle={河川水の主要溶存イオン濃度の測定}, pdfauthor={（氏名）}, pdfsubject={実験レポート}}

\course{（講義名）　実験レポート}
\submitted{2026年11月16日（月）}
\student{（学籍番号）　（氏名）}
% \titleen{Determination of major dissolved ions in river water}   % 英題は求められたときだけ
\conditions{実験日：2026年10月14日（水）\qquad 天候：晴れ\qquad 気温：20 ℃\qquad 湿度：50 \%\\
  共同実験者：（学籍番号）（氏名）}

\begin{document}
\rsonetitleblock{河川水の主要溶存イオン濃度の測定}

% 要旨は授業のレポートでは付けない。指示があるときだけ、次の 4 行の % を外して使う。
% \begin{rsabstract}
% （要旨。本文を書き終えてから最後に書く。200 字以内。）
% \keywords{（キーワード 3〜5 語）}
% \end{rsabstract}

\section{目的}
河川水の電気伝導度と Ca\textsuperscript{2+} 濃度の関係を調べ、電気伝導度から溶存イオン量を見積もれるかを確かめる。

\section{原理・背景}
試料の濃度は、検量線の傾きと切片から式~\eqref{eq:conc} で求めた。
\begin{equation}
  C = \frac{A - b}{a} \label{eq:conc}
\end{equation}
ここで、$C$ は濃度 (\si{mg/L})、$A$ は吸光度（無次元）、$a$ は検量線の傾き (\si{L/mg})、$b$ は切片である。

\rsassume{採水から測定までの 2 日間で、Ca\textsuperscript{2+} 濃度は変化しないものとする。}

\section{試料・装置・方法}
\subsection{試料}
2026 年 10 月 14 日に、地点 A・B で表層水を \qty{500}{mL} ずつ採取した。
\subsection{装置}
（機器名・型番・メーカーを書く。）
\subsection{手順}
（実際に行った手順を過去形で書く。）

\section{結果}
測定値を表~\ref{tab:water} に、電気伝導度と Ca\textsuperscript{2+} 濃度の関係を図~\ref{fig:ec} に示す。

\begin{table}[htbp]
  \centering
  \caption{各地点の水質測定値（ダミーデータ）}\label{tab:water}
  \begin{tabular}{l l S[table-format=1.1] S[table-format=2.1] S[table-format=2.1]}
    \toprule
    地点 & 採水日 & {pH} & {電気伝導度 (\si{mS/m})} & {Ca\textsuperscript{2+} (\si{mg/L})} \\
    \midrule
    A & 2026-10-14 & 7.3 & 14.2 & 17.8 \\
    B & 2026-10-14 & 7.6 & 24.9 & 31.5 \\
    \bottomrule
  \end{tabular}
\end{table}

\begin{figure}[htbp]
  \centering
  \parbox[c][40mm][c]{120mm}{\centering\textcolor{rs1inkmuted}{（図を \texttt{\textbackslash includegraphics} で入れる。PDF か SVG から変換したベクター形式を優先）}}
  \caption{電気伝導度と Ca\textsuperscript{2+} 濃度の関係（ダミーデータ）}\label{fig:ec}
\end{figure}

\section{考察}
地点 B の Ca\textsuperscript{2+} 濃度が高い理由として、流域の地質の違いが考えられる~\cite{example2020,example2025}。

\rsopen{地点 B の高い値が、地質によるのか、生活排水の影響かは区別できていない。}

\section{課題}
% 実習書・授業の設問があるときだけ。設問ごとに番号を付けて答える。
\begin{enumerate}
  \item （設問 1 への解答）
\end{enumerate}

\section{結論}
（目的への答えを文で書く。）

\nocite{*}   % 見本の文献を全部並べるための行。実際の文書では消す
\printbibliography[title=参考文献]

\end{document}
```

## refs.bib

```bibtex
% 書式の例。実在の文献ではない。実際に引いた文献に置き換える。
% 和文の文献は keywords = {ja} を付け、名前を「姓, 名」で書く（出力は「姓 名」、著者の区切りは「・」）。
% 著者 6 名以上は、出力で自動的に最初の 3 名＋「ほか」（欧文は et al.）になる。
% 頁の無い電子ジャーナルは pages の代わりに eid に論文番号を書く。号が分からなければ number を書かない。
% 巻・号・頁がまだ無い早期公開の論文は volume・number・pages を書かない（出力に「（早期公開）」が付く）。
% Web・データは @online（または @dataset）で、url と urldate（YYYY-MM-DD）を書く。
@article{example2020,
  author   = {著者, 太郎 and 著者, 花子},
  title    = {（論文の題名）},
  journal  = {（雑誌名）},
  year     = {2020},
  volume   = {12},
  number   = {3},
  pages    = {45--67},
  doi      = {10.0000/example.2020.000},
  keywords = {ja}
}

@article{example2025,
  author  = {Yamada, Taro and Suzuki, Kenji and Smith, John and Lee, Anna and Garcia, Maria and Chen, Wei},
  title   = {(Title of the article)},
  journal = {(Journal name)},
  year    = {2025},
  volume  = {12},
  number  = {3},
  eid     = {e0123456},
  doi     = {10.0000/example.2025.000}
}

@book{examplebook,
  author    = {著者, 一郎},
  title     = {（書名）},
  edition   = {2},
  publisher = {（出版社）},
  location  = {東京},
  year      = {2019},
  keywords  = {ja}
}

@incollection{examplechapter,
  author    = {著者, 次郎},
  title     = {（章の題名）},
  editor    = {編者, 三郎},
  booktitle = {（書名）},
  pages     = {101--120},
  publisher = {（出版社）},
  location  = {京都},
  year      = {2021},
  keywords  = {ja}
}

@online{exampledata,
  organization = {（データ提供機関）},
  title        = {（データセット名）},
  version      = {ver. 3.1},
  year         = {2024},
  url          = {https://example.org/dataset},
  urldate      = {2026-11-16},
  keywords     = {ja}
}
```
