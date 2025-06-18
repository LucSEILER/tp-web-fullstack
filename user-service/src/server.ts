import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response, NextFunction } from "express";
// import httpProxy from "http-proxy";
// import cors from "cors";
import { setupRoutes } from "./routes";
import { setupLogging } from "./logging";
import { generateRoutes } from "./routes/serveRoutes";

const app: Express = express();
const port = process.env.PORT || 7000;
// const apiProxy = httpProxy.createProxyServer();

// app.use(cors());

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send({ message: "User service" });
// });

console.log("hello")

setupLogging(app);

generateRoutes(app);

// setupRoutes(app);

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`API Gateway is running at http://localhost:${port}`);
});
