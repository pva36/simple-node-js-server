const http = require("node:http");
const fs = require("node:fs");
function main() {
  http
    .createServer((req, res) => {
      let url = new URL(req.url, `http://${req.headers.host}`);
      if (req.method === "GET") {
        if (url.pathname === "/") {
          res.writeHead(200, { "Content-Type": "text/html" });
          serveFile(res, "./index.html");
        } else if (url.pathname === "/contact-me") {
          res.writeHead(200, { "Content-Type": "text/html" });
          serveFile(res, "./contact-me.html");
        } else if (url.pathname === "/about") {
          res.writeHead(200, "./about.html");
          serveFile(res, "./about.html");
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          serveFile(res, "./404.html");
        }
      }
    })
    .listen(8080, () => {
      console.log("Server Running. Listening to port 8080.");
    });
}

function serveFile(response, filepath) {
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      // TODO: serve the 404 html page maybe?
      // serveFile(response, "./404.html");
    } else {
      response.end(data);
    }
  });
}

main();
