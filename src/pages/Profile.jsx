import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";
import logout from "../assets/icons/logout.svg";
import edit from "../assets/icons/edit.svg";
import notFollowing from "../assets/icons/follow.svg";
import following from "../assets/icons/check.svg";

const belongingUser = false;

function Profile() {
    const [isFollowing, setIsFollowing] = useState(false);

    function handleFollow() {
        setIsFollowing(true);
    }
    
    function handleUnfollow() {
        setIsFollowing(false);
    }

    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header categoriesDisabled={true}/>
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="flex justify-center items-start w-full bg-black" style={{ height: `${window.innerWidth < 640 ? '25vh' : '50vh'}` }}>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center fade-in">
                <div className="relative w-10/12">
                    <img className="absolute -top-44 flex flex-col w-2/12 bg-white rounded-full shadow-xl" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" ></img>
                    <div className="flex justify-between items-start gap-20">
                        <div className="w-2/12">                            
                        </div>
                        <div className="flex flex-col gap-4 w-8/12 fade-in" style={{ animationDelay: `0.05s` }}>
                            <h2 className="text-6xl font-montserrat font-extrabold text-black">User1</h2>
                            <div className="flex gap-5">
                                <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">87.6%</span> positive rating</p>
                                <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">9</span> followers</p>
                            </div>
                            <p className="font-dmsans text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="w-2/12 fade-in" style={{ animationDelay: `0.1s` }}>
                            {belongingUser ? (
                                <div className="flex flex-col gap-3">
                                    <button className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">edit<img className="w-7" src={edit} alt="edit" /></button>
                                    <button className="px-4 flex gap-3 justify-center items-center w-36 h-12 bg-gray-300 hover:bg-gray-400 hover:bg-opacity-70 rounded-md text-black font-semibold font-dmsans shadow transition-all duration-200">log out<img className="w-7" src={logout} alt="logout" /> </button>
                                </div>
                            ) : (
                                <div onClick={isFollowing ? handleUnfollow : handleFollow}>
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
            <ProfileSection belongingUser={belongingUser}/>
            <Footer />
        </div>
    );
}

export default Profile;