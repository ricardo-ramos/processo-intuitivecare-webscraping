const https = require("https");
const fs = require("fs");
const path = require("path")

const downloadFile = (url, callback) => {
  const fileName = path.basename(url)

  const req = https.get(url, (res) => {
    const fileStream = fs.createWriteStream(fileName);
    res.pipe(fileStream);

    fileStream.on("error", (err) => {
      alert("Erro ao processar dados")
    });

    fileStream.on("finish", () => {
      fileStream.close(callback);
    });
  });

  req.on("error", (err) => {
    alert("Erro ao baixar o arquivo")
  });
};

downloadFile("https://www.gov.br/ans/pt-br/arquivos/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-tiss/padrao-tiss/padrao-tiss_componente-organizacional_202111.pdf")