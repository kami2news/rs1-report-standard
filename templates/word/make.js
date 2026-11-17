const fs=require('fs');
const d=require('docx');
const {Document,Packer,Paragraph,TextRun,AlignmentType,LevelFormat,Table,TableRow,TableCell,WidthType,BorderStyle,ShadingType,Footer,PageNumber,SequentialIdentifier,HeadingLevel,TabStopType}=d;
const F={ascii:"Noto Sans JP",hAnsi:"Noto Sans JP",eastAsia:"Noto Sans JP",cs:"Noto Sans JP"};
const MONO={ascii:"Noto Sans Mono",hAnsi:"Noto Sans Mono",eastAsia:"Noto Sans JP"};
const INK="242424",MUTED="616161",BRAND="10218B",LS="8A8A8A";
const sp=(b,a)=>({before:b,after:a});
const LINE={line:390,lineRule:"exact"}; // 19.5pt 固定
const styles={
 default:{document:{run:{font:F,size:21,color:INK},paragraph:{spacing:{...LINE,after:120}}},
  title:{run:{font:F,size:36,bold:true,color:INK},paragraph:{alignment:AlignmentType.CENTER,spacing:{before:480,after:0,line:500,lineRule:"exact"},keepNext:true}},
  heading1:{run:{font:F,size:30,bold:true,color:INK},paragraph:{spacing:{before:480,after:180,line:450,lineRule:"exact"},keepNext:true,keepLines:true}},
  heading2:{run:{font:F,size:24,bold:true,color:INK},paragraph:{spacing:{before:360,after:120,line:390,lineRule:"exact"},keepNext:true,keepLines:true}},
  heading3:{run:{font:F,size:21,bold:true,color:INK},paragraph:{spacing:{before:240,after:60,...LINE},keepNext:true,keepLines:true}},
 },
 paragraphStyles:[
  {id:"Caption",name:"Caption",basedOn:"Normal",next:"Normal",quickFormat:true,run:{font:F,size:18,color:MUTED},paragraph:{spacing:{before:120,after:240,line:300,lineRule:"exact"},alignment:AlignmentType.CENTER}},
  {id:"RS1TitleHead",name:"RS1 頭書き",basedOn:"Normal",quickFormat:true,run:{size:18},paragraph:{alignment:AlignmentType.RIGHT,spacing:{after:0,line:300,lineRule:"exact"}}},
  {id:"RS1Cond",name:"RS1 条件",basedOn:"Normal",quickFormat:true,run:{size:18},paragraph:{spacing:{after:0,line:300,lineRule:"exact"}}},
  {id:"RS1Abstract",name:"RS1 要旨",basedOn:"Normal",quickFormat:true,run:{size:21},paragraph:{indent:{left:420,right:420},spacing:{after:0}}},
  {id:"RS1Note",name:"RS1 注記",basedOn:"Normal",quickFormat:true,run:{size:21},paragraph:{indent:{left:210},spacing:{before:120,after:120}}},
  {id:"RS1Reference",name:"RS1 参考文献",basedOn:"Normal",quickFormat:true,run:{size:18},paragraph:{indent:{left:567,hanging:567},spacing:{after:80,line:300,lineRule:"exact"}}},
  {id:"RS1TableText",name:"RS1 表の文字",basedOn:"Normal",quickFormat:true,run:{size:18},paragraph:{spacing:{before:60,after:60,line:280,lineRule:"exact"}}},
  {id:"RS1Code",name:"RS1 コード",basedOn:"Normal",quickFormat:true,run:{font:MONO,size:18},paragraph:{spacing:{after:0,line:300,lineRule:"exact"}}},
  {id:"RS1Footnote",name:"RS1 脚注",basedOn:"Normal",quickFormat:true,run:{size:16,color:MUTED},paragraph:{spacing:{after:0,line:270,lineRule:"exact"}}},
 ]};
const numbering={config:[{reference:"rs1-headings",levels:[
 {level:0,format:LevelFormat.DECIMAL,text:"%1",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:0,hanging:0}}}},
 {level:1,format:LevelFormat.DECIMAL,text:"%1.%2",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:0,hanging:0}}}},
 {level:2,format:LevelFormat.DECIMAL,text:"%1.%2.%3",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:0,hanging:0}}}}]}]};
const H=(lvl,t)=>new Paragraph({heading:[HeadingLevel.HEADING_1,HeadingLevel.HEADING_2,HeadingLevel.HEADING_3][lvl],numbering:{reference:"rs1-headings",level:lvl},children:[new TextRun(t)]});
const HU=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(t)]});
const P=(t,o={})=>new Paragraph({...o,children:[new TextRun(t)]});
const S=(st,t,label)=>new Paragraph({style:st,children:[...(label?[new TextRun({text:label+"　",bold:true})]:[]),new TextRun(t)]});
const cap=(kind,t)=>new Paragraph({style:"Caption",keepNext:kind==="表",children:[new TextRun({text:kind+" ",bold:true,color:INK}),new SequentialIdentifier(kind),new TextRun({text:"　"+t})]});
const W=[1300,1700,1100,2400,2571]; // 9071 = 160mm
const thick={style:BorderStyle.SINGLE,size:12,color:INK},thin={style:BorderStyle.SINGLE,size:6,color:INK},none={style:BorderStyle.NONE,size:0,color:"FFFFFF"};
const cell=(t,i,{head=false,last=false,first=false}={})=>new TableCell({width:{size:W[i],type:WidthType.DXA},margins:{left:113,right:113},
 borders:{top:first?thick:none,bottom:last?thick:(head?thin:none),left:none,right:none},
 children:[new Paragraph({style:"RS1TableText",alignment:i>=2?AlignmentType.RIGHT:AlignmentType.LEFT,children:[new TextRun({text:t,bold:head})]})]});
const rows=[["地点","採水日","pH","電気伝導度 (mS/m)","Ca²⁺ (mg/L)"],["A","2026-10-14","7.3","14.2","17.8"],["B","2026-10-14","7.6","24.9","31.5"]];
const table=new Table({width:{size:9071,type:WidthType.DXA},columnWidths:W,borders:{top:none,bottom:none,left:none,right:none,insideHorizontal:none,insideVertical:none},
 rows:rows.map((r,ri)=>new TableRow({tableHeader:ri===0,children:r.map((t,i)=>cell(t,i,{head:ri===0,first:ri===0,last:ri===rows.length-1}))}))});
const doc=new Document({features:{updateFields:true},creator:"RS1",title:"RS1 — Word テンプレート",styles,numbering,
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1417,bottom:1417,left:1417,right:1417,header:709,footer:709}}},
 footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:["- ",PageNumber.CURRENT," -"],size:16,color:MUTED})]})]})},
 children:[
  new Paragraph({style:"RS1TitleHead",children:[new TextRun("（講義名）　実験レポート")]}),
  new Paragraph({style:"RS1TitleHead",children:[new TextRun("提出日　2026年11月16日（月）")]}),
  new Paragraph({style:"RS1TitleHead",children:[new TextRun("（学籍番号）　（氏名）")]}),
  new Paragraph({heading:HeadingLevel.TITLE,children:[new TextRun("河川水の主要溶存イオン濃度の測定")]}),
  new Paragraph({style:"RS1Cond",spacing:{before:480},children:[new TextRun("実験日：2026年10月14日（水）　　天候：晴れ　　気温：20 ℃　　湿度：50 %")]}),
  new Paragraph({style:"RS1Cond",spacing:{after:360},border:{bottom:{style:BorderStyle.SINGLE,size:4,color:LS,space:6}},children:[new TextRun("共同実験者：（学籍番号）（氏名）")]}),
  H(0,"目的"),P("河川水の電気伝導度と Ca²⁺ 濃度の関係を調べ、電気伝導度から溶存イオン量を見積もれるかを確かめる。"),
  H(0,"原理・背景"),P("試料の濃度は、検量線の傾き a と切片 b から、C = (A − b) / a　(1) で求めた。式は Word の数式エディタ（Alt + =）で入れ、右端に式番号を付ける。"),
  S("RS1Note","採水から測定までの 2 日間で、Ca²⁺ 濃度は変化しないものとする。","［前提］"),
  H(0,"試料・装置・方法"),H(1,"試料"),P("2026 年 10 月 14 日に、地点 A・B で表層水を 500 mL ずつ採取した。"),H(1,"装置"),P("（機器名・型番・メーカーを書く。）"),H(1,"手順"),P("（実際に行った手順を過去形で書く。）"),
  H(0,"結果"),P("測定値を表 1 に、電気伝導度と Ca²⁺ 濃度の関係を図 1 に示す。"),
  cap("表","各地点の水質測定値（ダミーデータ）"),table,
  new Paragraph({style:"RS1Footnote",spacing:{before:80,after:240},children:[new TextRun("3 回測定の平均。出典：自分の測定。")]}),
  new Paragraph({alignment:AlignmentType.CENTER,keepNext:true,spacing:{before:480,after:480},children:[new TextRun({text:"（図を挿入。行内に配置し、グラフは SVG、写真は PNG・JPEG）",color:MUTED,size:18})]}),
  cap("図","電気伝導度と Ca²⁺ 濃度の関係（ダミーデータ）"),
  H(0,"考察"),P("地点 B の Ca²⁺ 濃度が高い理由として、流域の地質の違いが考えられる [1]。"),
  S("RS1Note","地点 B の高い値が、地質によるのか、生活排水の影響かは区別できていない。","［未解決］"),
  H(0,"課題"),P("（実習書・授業の設問があるときだけ。設問ごとに番号を付けて答える。）"),
  H(0,"結論"),P("（目的への答えを文で書く。）"),
  HU("参考文献"),
  S("RS1Reference","著者姓 名・著者姓 名（2020）（論文の題名）．（雑誌名），12（3），45–67．doi:（DOI）","[1]"),
 ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync("rs1-report.docx",b);console.log("ok")});
