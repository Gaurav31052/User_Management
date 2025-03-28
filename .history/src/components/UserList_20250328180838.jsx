import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersList = ({ onLogout }) => {
  const [allUsers, setAllUsers] = useState([]);  // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const usersPerPage = 6;

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1); // Reset to page 1 when searching
  }, [search, allUsers]);

  useEffect(() => {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    setCurrentUsers(filteredUsers.slice(startIndex, endIndex));
  }, [filteredUsers, page]);

  const fetchAllUsers = async () => {
    try {
      let allUsersData = [];
      for (let i = 1; i <= 2; i++) {  // Fetch both pages
        const response = await axios.get(`https://reqres.in/api/users?page=${i}`);
        allUsersData = [...allUsersData, ...response.data.data];
      }
      setAllUsers(allUsersData);
      setFilteredUsers(allUsersData);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      const updatedUsers = allUsers.filter(user => user.id !== id);
      setAllUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-200 ">
    <div className="flex justify-around items-center p-5">
      <h2 className=" text-4xl font-bold text-purple-900 ">Users List</h2>
      <input className="border-2 border-purple-300 rounded-full p-1 w-96 bg-white "
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
      />
      <button onClick={onLogout} className="bg-white w-30 p-3 hover:cursor-pointer rounded-full">Logout</button>
      </div>
    <div className="users-list-container flex flex-col items-center">
     
      <div className="users-grid ">
        {currentUsers.map(user => (
          <div key={user.id} className="user-card min-w-4/4 h-auto p-5 rounded-lg shadow-lg m-5 flex flex-col items-center justify-center from-bg-purple-400 to-bg-purple-200 ">
            <div ><img className="border-purple-400 border-2 rounded-full" src={user.avatar} alt="Avatar" /></div>
            <div><h3 className="font-semibold">{user.first_name} {user.last_name}</h3></div>
            <div><p><span className="font-semibold">Email: </span>{user.email}</p></div>
            <div><button className="edit-btn w-30  shadow-2xl px-3 m-6 bg-purple-300 rounded-lg hover:scale-105 duration-300 p-2" ><Link to={`/edit/${user.id}`} >Edit</Link></button>
            <button onClick={() => handleDelete(user.id)} className="edit-btn w-30  shadow-2xl px-3 m-6 bg-purple-300 rounded-lg hover:scale-105 duration-300 p-2">Delete</button></div>
          </div>
        ))}
      </div>
      <div className="pagination flex justify-around items-center w-1/4">
        <button className="bg-white mx-5 p-3 mb-7 rounded-full" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span className="font-semibold mx-5 p-3 mb-7 rounded-full">Page {page}</span>
        <button className="bg-white mx-5 p-3 mb-7 rounded-full" onClick={() => setPage(page + 1)} disabled={page * usersPerPage >= filteredUsers.length}>Next</button>
      </div>
    </div>
    </div>
  );
};

export default UsersList;
