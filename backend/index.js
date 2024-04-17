import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import AuthRoutes from "./api/routes/auth-route.js";
import NotesRoutes from "./api/routes/notes-route.js";
import TugasRoutes from "./api/routes/tugas-route.js"
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({origin : ["http://localhost:5173"], credentials: true}))
app.use((req,res,next) => {
    if (req.path.startsWith("/api")){
        next();
    }else{
        res.send('URL tidak valid (URL harus diawali "/api")')
    }
})
  
app.use(express.static("public"));

app.use("/api/v1",AuthRoutes);
app.use("/api/v1",NotesRoutes);
app.use("/api/v1",TugasRoutes);

app.listen(3000,() => console.log("Server berhasil dijalankan."))