import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import wordpress from "../assets/icons/wordpress.svg";
import logoLight from "../assets/icons/logoLight.png";
import cross from "../assets/icons/cross.svg";
import { getUsersAdmin, getProjectsAdmin, deleteProject, deleteUserAdmin } from "../services";

function AdminPanel() {
    let navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        if (!userData || !userData.role) {
            navigate('/');
        } else {
            getUsers();
        }
    }, []);

    const getUsers = async () => {
        await getUsersAdmin(localStorage.getItem("token"), 0, 100)
            .then((data) => {
                if (data.length > 0) {
                    setUsers(data);
                } else if (data.message === "Not allowed") {
                    navigate('/');
                }
            });
        await getProjectsAdmin(localStorage.getItem("token"), 0, 100)
            .then((data) => {
                if (data.length > 0) {
                    setProjects(data);
                } else if (data.message === "Unauthorized") {
                    navigate('/');
                }
            });
    }
    console.log(users);
    console.log(projects);
    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header categoriesDisabled={true} />
            <div className="flex flex-col items-center justify-center gap-10 pt-28 fade-in">
                <div className="w-full flex flex-col items-center justify-center mt-10 gap-5">
                    <div className="w-2/3 flex gap-2 items-center justify-start">
                        <img src={wordpress} alt="WordPress logo" className="w-16 h-16 lg:w-20 lg:h-20" />
                        <img src={cross} alt="Cross icon" className="w-8 h-8 grayscale" />
                        <img src={logoLight} alt="Fundflow logo" className="rounded-lg ml-3 w-16 h-16 lg:w-18 lg:h-18" />
                    </div>
                    <div className="w-2/3 flex flex-col items-start justify-center gap-3">
                        <h2 className="font-dmsans font-bold text-2xl lg:text-3xl">Admin Panel</h2>
                    </div>
                    <div className="w-2/3 flex flex-row items-center justify-center gap-6">
                        <div className="w-full flex flex-col items-start justify-center gap-3">
                            <h3 className="font-dmsans font-bold text-xl lg:text-2xl text-center">Manage Users</h3>
                            <p className="font-dmsans text-sm lg:text-base text-center text-gray-500">View and delete user accounts.</p>
                            <div className="w-full h-96 max-h-96 overflow-y-auto bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 text-black outline-none">
                                <table className="w-full h-full">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 bg-gray-200 rounded-tl-lg">username</th>
                                            <th className="py-2 px-4 bg-gray-200">email</th>
                                            <th className="py-2 px-4 bg-gray-200 rounded-tr-lg">actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => {
                                            return (
                                                <tr key={user.email}>
                                                    <td className="py-2 px-4">{user.username}</td>
                                                    <td className="py-2 px-4">{user.email}</td>
                                                    <td className="py-2 px-4">
                                                        <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white rounded-lg px-2 py-1">Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-3">
                            <h3 className="font-dmsans font-bold text-xl lg:text-2xl text-center">Manage Projects</h3>
                            <p className="font-dmsans text-sm lg:text-base text-center text-gray-500">View and delete projects.</p>
                            <div className="w-full h-96 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 text-black outline-none">
                                <table className="w-full h-full">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 bg-gray-200 rounded-tl-lg">name</th>
                                            <th className="py-2 px-4 bg-gray-200">creator</th>
                                            <th className="py-2 px-4 bg-gray-200 rounded-tr-lg">actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Add table rows here */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminPanel;