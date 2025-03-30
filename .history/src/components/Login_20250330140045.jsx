import React, { useState } from "react";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container flex justify-center items-center min-h-screen bg-purple-200 ">
    <div className=" bg-transparent p-10 rounded-lg shadow-2xl h-96 md:w-60 lg:w-96 sm:w- flex-col justify-center items-center">
      <h2 className=" text-4xl font-bold text-purple-900 mb-5">Login</h2>
      <form onSubmit={handleSubmit} className="flex-col justify-center items-center space-y-4">
       <div><span>Email : </span> <input className="border-2 border-purple-300 rounded-md p-1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /></div>
        <div><span>Password : </span> <input className="border-2 border-purple-300 rounded-md p-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /></div>
        <div className="flex w-full justify-center "><button className="shadow-lg w-40 p-3 rounded-2xl bg-purple-100 font-semibold hover:cursor-pointer" type="submit">Login</button></div>
      </form>
    </div>
    </div>
  );
};

export default Login;
