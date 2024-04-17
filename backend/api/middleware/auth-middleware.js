import jwt from "jsonwebtoken";
import "dotenv/config";

// export const verifyToken = async (req, res, next) => {
//   // console.log(req.headers);
//   if (req.headers.cookie) {
//     const token = req.headers.cookie.split("=")[1];
//     try {
//       const user = jwt.verify(token, process.env.SECRET_KEY);
//       req.user = user;
//       next();
//     } catch {
//       res.status(401);
//       res.send("Token salah.");
//     }
//   } else {
//     res.status(401);
//     res.send("Tidak ada token.");
//   }
// };

// Middleware otentikasi
export const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    if (authorization.startsWith("Bearer ")) {
      const token = authorization.split(" ")[1];
      try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
      } catch (error) {
        res.send("Token tidak valid.");
      }
    } else {
      res.send('Otorisasi tidak valid (harus "Bearer").');
    }
  } else {
    res.send("Anda belum login (tidak ada otorisasi).");
  }
};