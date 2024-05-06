import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";
import logout from "../assets/icons/logout.svg";
import edit from "../assets/icons/edit.svg";
import notFollowing from "../assets/icons/follow.svg";
import following from "../assets/icons/check.svg";
import { getUserByUrl, getProjectByCreator } from "../services/index";

function Profile() {
    const skip = 0;
    const limit = 8;
    const location = useLocation();
    let navigate = useNavigate();
    const viewUser = location.pathname.split('/profile/')[1];
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isFollowing, setIsFollowing] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchUserAndProjects = async () => {
            await getUserByUrl(viewUser)
                .then(async (data) => {
                    if (data.message) {
                        navigate('/not-found');
                        return;
                    } else {
                        setUser(data[0]);
                        await getProjectByCreator(data[0].id, skip, limit)
                            .then(projects => {
                                setProjects(projects);
                            });
                    }
                });
        }
        fetchUserAndProjects();
    }, [viewUser]);

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/login');
    }

    function handleFollow() {
        setIsFollowing(true);
    }

    function handleUnFollow() {
        setIsFollowing(false);
    }
    console.log(user);
    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header categoriesDisabled={true} />
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="flex justify-center items-start object-contain object-center overflow-hidden w-full bg-black" style={{ height: `${window.innerWidth < 640 ? '25vh' : '50vh'}` }}>
                    <img className="" src={user ? `${import.meta.env.VITE_API_URL}users/${user.url}/profileBanner` : ''} alt="" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center fade-in">
                <div className="relative w-10/12">
                    <img className="absolute -top-44 flex flex-col w-2/12 bg-gradient-to-r from-primary to-secondary rounded-full shadow-xl" src={user ? `${import.meta.env.VITE_API_URL}users/${user.url}/profilePicture` : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'} />
                    <div className="flex justify-between items-start gap-20">
                        <div className="w-2/12">
                        </div>
                        <div className="flex flex-col gap-4 w-8/12 fade-in" style={{ animationDelay: `0.05s` }}>
                            <h2 className="text-6xl font-montserrat font-extrabold text-black">{user ? user.username : ''}</h2>
                            <div className="flex gap-5">
                                <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">{user && user.stats ? user.stats.rating : '-'}</span> positive rating</p>
                                <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">{user && user.stats ? user.stats.followers : 0}</span> followers</p>
                            </div>
                            <p className="font-dmsans text-black">{user && user.biography ? user.biography : ''}</p>
                        </div>
                        <div className="w-2/12 fade-in" style={{ animationDelay: `0.1s` }}>
                            {userData && userData.userUrl === viewUser ? (
                                <div className="flex flex-col gap-3">
                                    <Link to={"/settings"} className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">
                                        edit
                                        <img className="w-7" src={edit} alt="edit" />
                                    </Link>
                                    <button className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-red-600 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200" onClick={logoutUser}>
                                        log out
                                        <img className="w-7" src={logout} alt="logout" />
                                    </button>
                                </div>
                            ) : (
                                <div onClick={isFollowing ? handleUnFollow : handleFollow}>
                                    {isFollowing ? (
                                        <button className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gradient-to-r opacity-70 from-primary to-secondary rounded-md text-white font-semibold font-dmsans shadow hover:opacity-100 transition-all duration-200">
                                            following<img className="w-6" src={following} alt="following" />
                                        </button>
                                    ) : (
                                        <button className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">
                                            follow<img className="w-6" src={notFollowing} alt="not following" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ProfileSection belongingUser={userData && userData.userUrl === viewUser ? true : false} ownerProjects={projects} />
            <Footer />
        </div>
    );
}

export default Profile;