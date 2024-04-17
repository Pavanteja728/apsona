import { addTugas, clickTugas, deleteTugas, editTugas, getTugas } from "../controllers/tugas-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import express from "express";
const router = express.Router();

router.post("/tugas/addTugas/:email",verifyToken, addTugas);
router.get("/tugas/getTugas/:email",verifyToken, getTugas);
router.put("/tugas/editTugas/:email/:id",verifyToken, editTugas);
router.put("/tugas/clickTugas/:id",verifyToken, clickTugas);
router.delete("/tugas/deleteTugas/:id",verifyToken, deleteTugas);

export default router;