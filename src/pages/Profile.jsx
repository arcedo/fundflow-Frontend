import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";

const projects1 = [
    {
        projectName: "Project One",
        projectCreator: "User1",
        projectCategory: "art",
        projectImage: 'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 200,
        fundedPercentage: 30
    }
];

function Profile() {
    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 mt-30">
                <div className="flex justify-center items-start w-full bg-black" style={{ height: `${window.innerWidth < 640 ? '25vh' : '58vh'}` }}>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-10/12">
                    <img className="absolute -top-44 flex flex-col w-2/12 bg-white rounded-full shadow-xl" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" ></img>
                    <div className="flex justify-between items-start gap-20">
                        <div className="w-2/12">                            
                        </div>
                        <div className="flex flex-col gap-3 w-8/12">
                            <h2 className="text-6xl font-dmsans font-extrabold text-black">User1</h2>
                            <div className="flex gap-5">
                                <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">87.6%</span> positive rating</p>
                                <p className="text-black font-normal font-dmsans text-opacity-70"><span className="text-black font-bold text-opacity-100">9</span> followers</p>
                            </div>
                            <p className="font-dmsans text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="w-2/12">
                            <button className="w-36 h-12 bg-gray-300 rounded-full text-black font-semibold font-dmsans shadow">follow</button>
                            {/* <button className="w-36 h-12 bg-gray-300 rounded-full text-black font-semibold font-dmsans shadow">edit profile</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <ProfileSection projects={projects1} />
            <Footer />
        </div>
    );
}

export default Profile;