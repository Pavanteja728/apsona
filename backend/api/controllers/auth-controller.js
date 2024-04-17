import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../db.js";

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (result.length > 0) {
      const passwordExist = await bcrypt.compare(password, result[0].PASSWORD);
      if (passwordExist) {
        const token = jwt.sign(result[0], process.env.SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.status(200).json({
          message: "Login berhasil !!!",
          token,
          email: email,
        });
      } else {
        return res.status(400).json({ message: "Password salah !!!" });
      }
    } else {
      return res.status(404).json({ message: "User tidak ditemukan !!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
export const logout = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ message: "Logout berhasil" });
};

export async function register(req, res) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "Username Atau Email Sudah terdaftar !!!" });
    } else {
      await pool.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hash]
      );
      return res.status(200).json({ message: "Berhasil Daftar User!!!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}