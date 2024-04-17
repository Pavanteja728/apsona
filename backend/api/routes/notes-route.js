import express from "express";
import { addNotes, deleteNotes, editNotes, getNotes } from "../controllers/notes-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/notes/addNotes/:email",verifyToken, addNotes);
router.get("/notes/getNotes/:email",verifyToken, getNotes);
router.delete("/notes/deleteNotes/:id",verifyToken, deleteNotes);
router.put("/notes/editNotes/:email/:id",verifyToken, editNotes);

export default router;