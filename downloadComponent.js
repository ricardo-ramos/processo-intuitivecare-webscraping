const request = require("request");
const cheerio = require("cheerio");

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

request("https://www.gov.br/ans/pt-br/assuntos/prestadores/padrao-para-troca-de-informacao-de-saude-suplementar-2013-tiss", (err, res, body) => {
  if(err) {
    alert("Não foi possível acessar o site" + err)
  };

  const $ = cheerio.load(body);
  $(".alert-link.internal-link").each(function() {
    const currentVersion = $(this);

    if(currentVersion.text().includes("Clique aqui para acessar a versão")) {
      request(currentVersion.attr("href"), (err, res, body) => {
        if(err) {
          alert("Não foi possível acessar o site" + err)
        };

        const $ = cheerio.load(body);
        
        $(".btn-primary").each(function() {
          if($(this).text().includes("Visualizar")) {
            downloadFile($(this).attr("href"))
          };
        });
      });
    };
  });
});