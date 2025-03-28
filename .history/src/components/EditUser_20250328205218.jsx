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
    <div className="edit-user-container flex flex-col justify-center items-center bg-white py-3 rounded-lg shadow-lg w-1/4">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={user.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={user.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;