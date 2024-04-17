import pool from "../../db.js";

export const addTugas = async (req, res) => {
  const { name, status } = req.body;
  console.log(req.body);
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = ?", [
      req.params.email,
    ]);
    await pool.query(
      "INSERT INTO tugas (name, status, user) VALUES (?, ?, ?)",
      [name, status, user[0].id]
    );
    res.status(200).json({ message: "Tugas Telah Ditambahkan." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export async function deleteTugas(req, res) {
  try {
    await pool.query(`DELETE FROM tugas WHERE id = ?`, [req.params.id]);
    res.status(200).json({ message: "Tugas telah dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export const editTugas = async (req, res) => {
  const { name, status } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = ?", [
      req.params.email,
    ]);
    await pool.query(
      "UPDATE tugas SET name = ?, status = ? WHERE id = ? AND user = ?",
      [name, status, req.params.id, user[0].id]
    );
    res.status(200).json({ message: "Tugas Telah Diedit." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
export const clickTugas = async (req, res) => {
  const { STATUS } = req.body;
  try {
    await pool.query(
      "UPDATE tugas SET STATUS = ? WHERE id = ?",
      [STATUS == true ? false : true, req.params.id]
    );
    res.STATUS(200).json({ message: STATUS == false ? "Tugas Telah Selesai." : "Tugas Belum Selesai." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getTugas = async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = ?", [
      req.params.email,
    ]);
    const result = await pool.query("SELECT * FROM tugas where user = ?", [
      user[0].id,
    ]);
    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
