import RNHTMLtoPDF from "react-native-html-to-pdf";

const holerite = {
  nome: "João",
  salario: 3000,
};

const htmlContent = `
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <title>Holerite</title>
       <style>
           body {
               font-size: 16px;
           }
           h1 {
               text-align: center;
           }
       </style>
   </head>
   <body>
       <h1>Holerite de ${holerite.nome}</h1>
       <p>Salário: ${holerite.salario}</p>
       <!-- Adicione mais informações conforme necessário -->
   </body>
   </html>
`;

export function RenderReport() {
  console.log("chegou na funçao");
  RNHTMLtoPDF.convert({
    html: htmlContent,
    fileName: "holerite-setembro/2023",
    directory: "Documents",
  })
    .then((res) => {
      console.log(res.filePath);
    })
    .catch((err) => {
      console.error(err);
    });
}
