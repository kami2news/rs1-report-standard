# このリポジトリについて

RS1（研究レポート標準）の正本。利用者（kami2news）の指示により、RS1 の変更はすべてここを先に直す。

## 変更の手順
1. ここで該当ファイルを直す（規定は `rules/`・`patterns/`・`typeset/`、部品の見本とトークンは `design-system/`、テンプレートは `templates/`）。
2. LaTeX テンプレートを変えたら LuaLaTeX でコンパイルして確かめ、`templates/latex/rs1-report-sample.pdf` と `typeset/13-latex-source.md` の全文を更新する。
3. Word テンプレートは `templates/word/make.js`・`make-short.js` から作り直す。
4. コミットして push する（コミットの言葉は日本語でよい）。
5. claude.ai のデザインシステム「RS1」（https://claude.ai/artifact/TbgsY7E9AvVJEytRERuz7E）に同じ内容を反映する。`rules/README.md` は `project/README.md`、`patterns/`・`typeset/` は `project/` の同名フォルダ、`design-system/` の中身は `project/` 直下に当たる。
6. GPT は規定をこのリポジトリから直接読むので作業不要。Word テンプレートを変えたときだけ、利用者に知識ファイルの差し替えを伝える。

## 決まり（要点）
- 文書の装飾は最小限：色は黒と灰色だけ（グラフを除く）、囲み・背景色・色付きラベルは使わない。
- 書体は Noto Sans JP（LaTeX は原ノ味角ゴシック）、太さは 400 と 700。
- 授業・提出先の指定は常に RS1 より優先する。
