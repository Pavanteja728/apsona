/* eslint-disable no-unused-vars */
import { Home, LogIn } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AllContext } from "../App";
import { LogOut } from "lucide-react";

export default function Header() {
  const { token, user, navigate } = useContext(AllContext);
  const logout = async () => {
    await fetch(`http://localhost:3000/api/v1/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      });
  };
  return (
    <header className="flex justify-between items-center shadow-lg py-4 px-6 bg-yellow-400">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-4 w-1/2">
          <img src="/src/assets/kepp.png" alt="" className="w-14" />
          <h1 className="text-2xl">Keep !!!</h1>
        </div>
        <nav className=" flex w-1/2 ">
          <ul className="flex w-full justify-evenly">
            <li className=" flex items-center gap-2 cursor-pointer">
              <Home size={30} />
              <Link to="/" className=" text-black text-xl">
                Beranda
              </Link>
            </li>
            <li className=" flex items-center gap-2 cursor-pointer">
              <NotebookPen />{" "}
              <Link to="/tugas" className=" text-black text-xl">
                Tugas
              </Link>
            </li>
            <li className=" flex items-center gap-2 cursor-pointer">
              {token ? (
                <Link
                onClick={ logout}
                  to="/"
                  className=" text-black text-xl flex items-center"
                >
                  <LogOut /> Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className=" text-black text-xl flex items-center"
                >
                  <LogIn /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
