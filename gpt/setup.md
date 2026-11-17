# RS1 を GPT で使う手順（GitHub 直結版）

1. ChatGPT で「GPT を探す」→「作成する」→「構成」。
2. 「指示」に `gpt/instructions.txt` の中身を貼る。
3. 「知識」に `templates/word/rs1-report.docx`・`rs1-short.docx`・`templates/latex/rs1-report-sample.pdf` を入れる。規定の写し（予備）として `rules/README.md`・`patterns/00-chooser.md` も入れておくと、読み込みに失敗したときに使える。
4. 「機能」で「ウェブ検索」と「コードインタープリターとデータ分析」をオン。
5. 「アクションを作成する」→ 認証は「なし」→ スキーマに `gpt/openapi.yaml` の中身を貼る。プライバシーポリシーの URL はこのリポジトリの URL でよい。
6. プレビューで「実験レポートの骨子を作って」と送り、アクション getRs1File が呼ばれて規定が読まれるか確かめる。

RS1 を直したら、このリポジトリを更新すれば GPT は次の会話から新しい規定を読む（知識ファイルの差し替えは不要。Word テンプレートを変えたときだけ差し替える）。
