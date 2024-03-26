import express from "express";
import cors from "cors";
import type { Connection } from "mongoose";
// Config
import { connectDatabase } from "config";
import { environment } from "config/environment.config";
import routes from "./routes/index";

import cron from "node-cron";
import axios from "axios";

const startServer = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  // app.set("trust proxy", 1);

  const [api] = await Promise.allSettled([
    connectDatabase({ connectTo: "API" }),
  ]).then((results) =>
    results
      .filter(({ status }) => status === "fulfilled")
      .map((res) => (res as PromiseFulfilledResult<Connection>).value)
  );

  app.on("error", (error) => {
    console.error(`❌ Server error: ${error}`);
  });

  process.on("unhandledRejection", (error) => {
    console.error(`❌ Unhandled rejection: ${error}`);
  });

  process.on("uncaughtException", (error) => {
    console.error(`❌ Uncaught exception: ${error}`);
  });

  process.on("exit", () => {
    console.log("👋 Bye bye!");
  });

  process.on("SIGINT", () => {
    console.log("👋 Bye bye!");
  });

  process.on("SIGTERM", () => {
    console.log("👋 Bye bye!");
  });

  app.use("/api/v1", routes);

  app.get("/", (req, res) => {
    res.send("Running success 🚀");
  });

  cron.schedule("*/12 * * * *", () => {
    axios.get("https://cms-fest-api.onrender.com/")
      .then(() => {
        console.log("Job executed successfully");
      })
      .catch((error: any) => {
        console.error("Error executing job:", error);
      });
  });
  

  app.listen(environment.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${environment.PORT}`);
  });
};

startServer();
