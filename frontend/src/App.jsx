import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { createContext } from "react";
export const AllContext = createContext();
export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return (
    <AllContext.Provider value={{token, user, navigate }}>
      <Header />
      <Outlet />
      <Footer />
    </AllContext.Provider>
  );
}
