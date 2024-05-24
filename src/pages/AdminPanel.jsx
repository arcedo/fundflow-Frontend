import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import wordpress from "../assets/icons/wordpress.svg";
import logoLight from "../assets/icons/logoLight.png";
import cross from "../assets/icons/cross.svg";
import { getUsersAdmin, getProjectsAdmin, deleteProject, deleteUserAdmin } from "../services";

function AdminPanel() {
    let navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const startIndex = 8;
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [limitProjects, setLimitProjects] = useState({ start: 0, end: startIndex });
    const [limitUsers, setLimitUsers] = useState({ start: 0, end: startIndex });


    useEffect(() => {
        if (!userData || !userData.role) {
            navigate('/');
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        await getUsersAdmin(localStorage.getItem("token"), limitUsers.start, limitUsers.end)
            .then((data) => {
                if (data.length > 0) {
                    setUsers(data);
                } else if (data.message === "Not allowed") {
                    navigate('/');
                }
            });
        await getProjectsAdmin(localStorage.getItem("token"), limitProjects.start, limitProjects.end)
            .then((data) => {
                if (data.length > 0) {
                    setProjects(data);
                } else if (data.message === "Unauthorized") {
                    navigate('/');
                }
            });
    }

    const handleDeleteProject = async (id) => {
        await deleteProject(localStorage.getItem("token"), id)
            .then((data) => {
                if (data.code === 200) {
                    setProjects(projects.filter(project => project.id !== id));
                }
            });
    }

    const handleDeleteUser = async (id) => {
        await deleteUserAdmin(localStorage.getItem("token"), id)
            .then((data) => {
                if (data.id) {
                    setUsers(users.filter(user => user.id !== id));
                }
            });
    }

    const handleLoadMoreProjects = async () => {
        setLimitProjects({ start: limitProjects.start, end: limitProjects.end + 8 })
        await getProjectsAdmin(localStorage.getItem("token"), limitProjects.start, limitProjects.end + 8)
            .then((data) => {
                if (data.length > 0) {
                    setProjects({ ...projects, data });
                }
            });
    }

    const handleLoadMoreUsers = async () => {
        setLimitUsers({ start: limitUsers.start, end: limitUsers.end + 8 })
        await getUsersAdmin(localStorage.getItem("token"), limitUsers.start, limitUsers.end + 8)
            .then((data) => {
                if (data.length > 0) {
                    setUsers({ ...users, data });
                }
            });
    }
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
                    <div className="xl:w-2/3 w-10/12 flex flex-col lg:flex-row items-center justify-center gap-6">
                        <div className="w-full flex flex-col items-start justify-center gap-3">
                            <h3 className="font-dmsans font-bold text-xl lg:text-2xl text-center">Manage Users</h3>
                            <p className="font-dmsans text-sm lg:text-base text-center text-gray-500">View and delete user accounts.</p>
                            <div className="w-full h-96 max-h-96 overflow-y-auto bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 text-black outline-none">
                                <table className="w-full h-full relative">
                                    <thead className="sticky top-0 left-0 right-0">
                                        <tr className="text-left">
                                            <th className="py-2 px-4 bg-gray-200 rounded-tl-lg">username</th>
                                            <th className="py-2 px-4 bg-gray-200">email</th>
                                            <th className="py-2 px-4 bg-gray-200 rounded-tr-lg">actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => {
                                            if (user.url !== userData.userUrl) {
                                                return (
                                                    <tr key={user.url}>
                                                        <td className="py-2 px-4"><Link className="underline" target="_blank" to={'/profile/' + user.url}>{user.username}</Link></td>
                                                        <td className="py-2 px-4">{user.email}</td>
                                                        <td className="py-2 px-4">
                                                            <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white rounded-lg px-2 py-1" onClick={() => handleDeleteUser(user.id)} >Delete</button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {users && users.length % startIndex === 0 && (<div className="w-full flex justify-end">
                                <button className="bg-gray-200 hover:bg-gray-300 font-dmsans transition-all duration-300 text-black rounded-lg px-2 py-1" onClick={() => handleLoadMoreUsers}>Load more</button>
                            </div>)}
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-3">
                            <h3 className="font-dmsans font-bold text-xl lg:text-2xl text-center">Manage Projects</h3>
                            <p className="font-dmsans text-sm lg:text-base text-center text-gray-500">View and delete projects.</p>
                            <div className="w-full max-h-96 h-96 overflow-y-auto bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 text-black outline-none">
                                <table className="w-full h-full relative">
                                    <thead className="sticky top-0 left-0 right-0">
                                        <tr className="text-left">
                                            <th className="py-2 px-4 bg-gray-200 rounded-tl-lg">name</th>
                                            <th className="py-2 px-4 bg-gray-200">creator</th>
                                            <th className="py-2 px-4 bg-gray-200 rounded-tr-lg">actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {projects.map((project) => {
                                            return (
                                                <tr key={project.url}>
                                                    <td className="py-2 px-4"><Link className="underline" target="_blank" to={'/projects/' + project.url}>{project.title}</Link></td>
                                                    <td className="py-2 px-4">{project.username}</td>
                                                    <td className="py-2 px-4">
                                                        <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white rounded-lg px-2 py-1" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {projects && projects.length % startIndex === 0 && (<div className="w-full flex justify-end">
                                <button className="bg-gray-200 hover:bg-gray-300 font-dmsans transition-all duration-300 text-black rounded-lg px-2 py-1" onClick={() => handleLoadMoreProjects()}>Load more</button>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default AdminPanel;