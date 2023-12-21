class HelloRouter {
    handleRequest(req, res) {
      console.log("Handling /hello request");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello, World!");
    }
  }
  
  export default HelloRouter;
  
  