import http from "http";
import { parse } from "url";
import fs from "fs/promises";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "url";
import HelloRouter from "./helloRouter.js"; // Імпорт роута

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SimpleServer {
  async handleRequest(req, res) {
    const { pathname } = parse(req.url, true);

    if (pathname === "/hello") {
      const helloRouter = new HelloRouter();
      helloRouter.handleRequest(req, res);
      return;
    }

    try {
      // обробка статичних файлів або інших запитів за потреби.
      const filePath = path.join(__dirname, pathname);
      const fileData = await fs.readFile(filePath);
      
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(fileData);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  }
}

const serverHandler = async (req, res) => {
  const simpleServer = new SimpleServer();
  await simpleServer.handleRequest(req, res);
};

const server = http.createServer(serverHandler);

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server is listening on port ${PORT}");
});

process.on("SIGINT", () => {
  console.log("Server is shutting down...");
  server.close(() => {
    console.log("Server has shut down.");
    process.exit(0);
  });
});
