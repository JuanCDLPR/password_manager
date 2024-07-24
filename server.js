const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 4001;

const contentTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const getContentType = (filePath) => {
  const ext = path.extname(filePath);
  return contentTypes[ext] || "text/html";
};

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "build",
    req.url === "/" ? "index.html" : req.url
  );

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    res.writeHead(200, { "Content-Type": getContentType(filePath) });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
