const http = require("http");
const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuid/v1");

const pageDownload = (url = "http://nodeprogram.com") => {
  console.log(`downloading ${url}`);
  const fetchPage = (urlF, callback) => {
    http
      .get(urlF, (response) => {
        let buffer = "";
        response.on("data", (chunk) => {
          buffer += chunk;
        });
        response.on("end", () => {
          callback(null, buffer);
        });
      })
      .on("error", (err) => {
        console.error(` Ah man, we got an error: ${err.message}`);
        callback(err);
      });
  };
  const folderName = uuidv1();

  fs.mkdirSync(folderName);
  fetchPage(url, (error, data) => {
    if (error) return console.log(error);
    fs.writeFileSync(path.join(__dirname, folderName, "url.txt"), url);
    fs.writeFileSync(path.join(__dirname, folderName, "file.html"), data);
    console.log("downloaded to folder ", folderName);
  });
};

pageDownload(process.argv[2]);
