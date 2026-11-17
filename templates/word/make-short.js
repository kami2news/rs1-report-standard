const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,AlignmentType,BorderStyle,Footer,PageNumber,HeadingLevel,DocumentGridType}=require('docx');
const F={ascii:"Noto Sans JP",hAnsi:"Noto Sans JP",eastAsia:"Noto Sans JP",cs:"Noto Sans JP"};
const INK="242424",MUTED="616161",LS="8A8A8A";
// A4・余白 25 mm・40 字×30 行（本文 10.5 pt）
const doc=new Document({features:{updateFields:true},creator:"RS1",title:"RS1 — 小レポート・論述（40 字×30 行）",
 styles:{default:{document:{run:{font:F,size:21,color:INK},paragraph:{spacing:{before:0,after:0}}},
  title:{run:{font:F,size:28,bold:true,color:INK},paragraph:{snapToGrid:false,alignment:AlignmentType.CENTER,spacing:{before:0,after:0},keepNext:true}},
  heading1:{run:{font:F,size:21,bold:true,color:INK},paragraph:{spacing:{before:240,after:0},keepNext:true,keepLines:true}}},
  paragraphStyles:[{id:"RS1Head",name:"RS1 簡易ヘッダー",basedOn:"Normal",quickFormat:true,run:{size:18,color:MUTED},paragraph:{snapToGrid:false,alignment:AlignmentType.RIGHT,border:{bottom:{style:BorderStyle.SINGLE,size:6,color:LS,space:4}}}},
   {id:"RS1Reference",name:"RS1 参考文献",basedOn:"Normal",quickFormat:true,run:{size:18},paragraph:{snapToGrid:false,indent:{left:567,hanging:567}}},
   {id:"RS1Count",name:"RS1 総文字数",basedOn:"Normal",quickFormat:true,run:{size:18,color:MUTED},paragraph:{snapToGrid:false,alignment:AlignmentType.RIGHT}}]},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1417,bottom:1417,left:1417,right:1417,header:709,footer:709}},
   grid:{type:DocumentGridType.LINES_AND_CHARS,linePitch:467,charSpace:3440}},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:["- ",PageNumber.CURRENT," -"],size:16,color:MUTED})]})]})},
  children:[
   new Paragraph({style:"RS1Head",children:[new TextRun("（科目名）　第○回　｜　（学籍番号）　（氏名）")]}),
   new Paragraph({children:[]}),
   new Paragraph({heading:HeadingLevel.TITLE,children:[new TextRun("（表題：課題文、または答えを短く表した題）")]}),
   new Paragraph({children:[]}),
   new Paragraph({indent:{firstLine:210},children:[new TextRun("（1 段落目：何について書くかと、それへの答えを先に書く。）")]}),
   new Paragraph({indent:{firstLine:210},children:[new TextRun("（2 段落目：答えを支える根拠 1。授業の内容・資料・データから。）")]}),
   new Paragraph({indent:{firstLine:210},children:[new TextRun("（3 段落目：根拠 2。論述レポート（G）では、反対の立場とそれへの応答もここに。見出しを付けるときは「見出し 1」スタイルで。）")]}),
   new Paragraph({indent:{firstLine:210},children:[new TextRun("（最後の段落：答えを言い直し、残った疑問を 1 文で。）")]}),
   new Paragraph({children:[]}),
   new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun("参考文献")]}),
   new Paragraph({style:"RS1Reference",children:[new TextRun("[1]　著者姓 名（年）（題名）．（誌名），巻（号），頁．")]}),
   new Paragraph({children:[]}),
   new Paragraph({style:"RS1Count",children:[new TextRun("（総文字数：○○字）")]}),
  ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync("rs1-short.docx",b);console.log("ok")});
