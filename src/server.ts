import type {Server} from "http";
import app from "./app";
import env from "./config/env";

let server: Server 

const bootstrap = async ()=>{
    try {
        server = app.listen(env.port, ()=>{
    console.log(`server is running on port ${env.port}`);   
})
    } catch (error) {
        console.log("Error form server",error);
    }
}

(async ()=>{
    await bootstrap()
}) ();


//shutdown server gracefully

//handle unhandled promise rejections
process.on("unhandledRejection", (err)=>{
    console.log("unhandledRejection", err);
    if (server) {
        server.close(()=>{
            console.log("Server closed due to unhandledRejection");
             process.exit(1);
        })
    }
    process.exit(1);
})


//handle uncaught exceptions
process.on("uncaughtException", (err)=>{
    console.log("uncaughtException", err);
    if (server) {
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})

//handle SIGINT and SIGTERM for graceful shutdown
process.on("SIGTERM", ()=>{
    console.log("SIGTERM received, shutting down gracefully");
    if (server) {
        server.close(()=>{
            process.exit(0);
        })
    }
})

//handle SIGINT for graceful shutdown
process.on("SIGINT", ()=>{
    console.log("SIGINT received, shutting down gracefully");   
    if (server) {
        server.close(()=>{
            process.exit(0);
        })
    }
})

