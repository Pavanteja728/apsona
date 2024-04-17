import pool from "../../db.js";

export const addNotes = async (req, res) => {
  const { title, content} = req.body;
  try {
    const user = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [req.params.email]
    );
    await pool.query(
      "INSERT INTO notes (title, content, user) VALUES (?, ?, ?)",
      [title, content, user[0].id]
    );
    res.status(200).json({ message: "Note Telah Ditambahkan." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const editNotes = async (req, res) => {
  const { title, content} = req.body;
  try {
    const user = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [req.params.email]
    );
    await pool.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user = ?",
      [title, content, req.params.id, user[0].id]
    );
    res.status(200).json({ message: "Note Telah Diedit." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const user = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [req.params.email]
    );
    const result = await pool.query("SELECT * FROM notes where user = ?", [
      user[0].id,
    ]);
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export async function deleteNotes(req, res) {
  try {
    await pool.query(`DELETE FROM notes WHERE id = ?`, [req.params.id]);
    res.status(200).json({ message: "Note telah dihapus." });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
