// index.ts or server.ts (your entry point)
import "./config.js";
import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";

//connections and listeneres
const PORT = process.env.PORT || 5000;

connectToDatabase().then(()=>{
  app.listen(PORT,()=>console.log("server open and Connected to Database "));  
}).catch((err)=>console.log(err));

