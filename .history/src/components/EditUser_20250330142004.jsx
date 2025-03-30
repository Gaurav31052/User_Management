import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      alert("User updated successfully");
     
      
      navigate("/users");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    
    <div className="min-h-screen bg-purple-200 flex justify-center items-center">
    <div className="edit-user-container flex flex-col justify-center items-center bg-white py-4 rounded-lg shadow-2xl w-64 md:w-64 lg:w-96">
      <h2 className="text-2xl font-semibold mb-2">Edit User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
      
      <div className="flex justify-center items-center flex-col md:flex- "><span>First_Name: </span> <input
        className="border-2 border-purple-300 rounded-full p-1 w-full bg-white m-1"
          type="text"
          name="first_name"
          placeholder="First Name"
          value={user.first_name}
          onChange={handleChange}
          required
        /></div>
        <div className="flex justify-center items-center "><span>Last_Name: </span> <input
        className="border-2 border-purple-300 rounded-full p-1 w-full bg-white m-1"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={user.last_name}
          onChange={handleChange}
          required
        /></div>
        <div className="flex justify-center items-center "><span>Email: </span>
        <input
        className="border-2 border-purple-300 rounded-full p-1 w-full bg-white m-1"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        /></div>
        <button className="w-2/4 bg-purple-300 p-2 rounded-3xl font-semibold hover:cursor-pointer" type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;