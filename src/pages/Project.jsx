import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Project() {

    const belongingUser = false;
    const project = {
        projectId: 1,
        projectName: "Project One",
        projectUrl: "project_one",
        projectCreator: "User1",
        creatorUrl: "user1",
        projectCreatorId: 1,
        projectCategory: "art",
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        projectCover: 'https://images.unsplash.com/photo-1712673535607-d3586895d914?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        projectImage: [
            'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        sponsors: 27,
        timeLeft: 187,
        currentFunding: 1023,
        goalFunding: 4000,
        views: 150,
        likes: 200,
        dislikes: 50,
        fundedPercentage: 64
    };

    const formattedCurrentFunding = project.currentFunding.toLocaleString('de-DE');
    const formattedGoalFunding = project.goalFunding.toLocaleString('de-DE');

    return (
        <div className="w-full bg-gray-200 min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 mt-28">
                <div className="relative w-full" style={{ height: `${window.innerWidth < 640 ? '35vh' : '65vh'}` }}>
                    <div className="w-full h-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1712673535607-d3586895d914?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}>
                        <div className="w-10/12 grid grid-cols-2 gap-20">
                            <div className="w-10/12 p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-90 backdrop-blur-md flex flex-col gap-4">
                               <div className="flex gap-2 items-end">
                                    <h2 className="font-dmsans font-bold text-5xl">{project.projectName}</h2>
                                    <Link to={`/profile/${project.projectCreatorId}`} className="font-dmsans text-black text-opacity-70">by {project.projectCreator}</Link>
                               </div>
                               <p className="font-dmsans">{project.shortDescription}</p>
                               <div className="flex flex-col gap-3">
                                    <div className="bg-gray-300 h-3 rounded-full w-full">
                                        <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: `${project.fundedPercentage}%` }}>
                                        </div>
                                    </div>
                                    <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">{formattedCurrentFunding}€</span> funded of a {formattedGoalFunding}€ goal</p>
                                    <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">{project.sponsors}</span> funders</p>
                                    <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">{project.timeLeft}</span> hours left</p>
                               </div>
                               <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-dmsans font-bold">Help this project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Project;