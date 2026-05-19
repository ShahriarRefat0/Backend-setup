import { Server } from "http";
import app from "./app";
import { config } from "dotenv";
import { connectMongooDb } from "./config/mongoose";
import env from "./config/env";

let server: Server;

const bootstrap = async () => {
  try {
    await connectMongooDb();
    server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

(async () => {
  await bootstrap();
})();

// --server close --

//  unhandled promise Rejection

process.on("unhandledRejection", (err) => {
  console.log("Unhandle Rejection Decected");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//unhandled exception
process.on("uncaughtException", (err) => {
  console.log("Unhandle uncaughtException Decected");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//sigterm
process.on("SIGTERM", (err) => {
  console.log("sigterm signal - server shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});
