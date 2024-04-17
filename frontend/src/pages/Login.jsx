/* eslint-disable no-unused-vars */
import { useState } from "react";
import backgroundImage from "../assets/images.png";
import { useContext } from "react";
import { AllContext } from "../App";
import { useEffect } from "react";

const Login = () => {
  const {navigate} = useContext(AllContext);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [request, setRequest] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };
  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
    setRequest({
      email: "",
      password: "",
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(
      `http://localhost:3000/api/v1/auth/${
        isLoginFormVisible ? "login" : "register"
      }`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 404) {
          toggleForm();
        } else if (res.status === 200) {
          toggleForm();
        }
        return res.json();
      })
      .then((res) => {
        setRequest({
          email: "",
          password: "",
        });
        console.log(res)
        alert(res.message);
        if (isLoginFormVisible && res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", res.email);
          localStorage.removeItem("notes");
          localStorage.removeItem("tugas");
          navigate('/')
        }
      });
  }

  useEffect(() => {
    handleSubmit;
  });

  return (
    <div
      className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="max-w-md w-full space-y-8 bg-white bg-opacity-75 rounded-lg p-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLoginFormVisible
              ? "Sign in to your account"
              : "Create a new account"}
          </h2>
          <form
            action="/login"
          >
            <input
              required
              type="email"
              name="email"
              value={request.email}
              onChange={handleChange}
              className="rounded-md shadow-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
            <input
              required
              type="password"
              name="password"
              value={request.password}
              onChange={handleChange}
              className="rounded-md shadow-sm block w-full mt-3 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
            <div>
              <button 
                onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isLoginFormVisible ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={toggleForm}
          >
            {isLoginFormVisible
              ? "Create new account"
              : "Sign in to existing account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
