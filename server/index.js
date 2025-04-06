const http = require("http");
const fs = require("fs");

const options = {
//	key: fs.readFileSync("./certs/private-key.pem"),
//	cert: fs.readFileSync("./certs/certificate.pem")
};

const server = http.createServer(options, (req, res) => {
	console.log(req.method, req.url);
	if (req.method === "GET") {
		let url = req.url;
		if (url === "/") {
			url = "/index.html";
		}
		console.log(url, "../docs" + url, fs.existsSync("../docs" + url));
		if (fs.existsSync("../docs" + url)) {
			res.writeHead(200);
			res.end(fs.readFileSync("../docs" + url));
		} else if (req.url.startsWith("/public/") && fs.existsSync("./public" + req.url)) {
			res.writeHead(200);
			res.end(fs.readFileSync("./public" + req.url));
		} else {
			res.writeHead(404);
			res.end("<h1>404 Error: Page Not Found!</h1>");
		}
	}
});

server.listen(80, () => {
	console.log("Server Listening Local Port 80");
});