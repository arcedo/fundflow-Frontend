import React from "react";
import { Link } from "react-router-dom";
import likeInteract from "../assets/icons/likeInteract.svg";
import dislike from "../assets/icons/like.svg";
import views from "../assets/icons/views.svg";

function ProjectDetails({ project }) {

    const formattedCurrentFunding = project.currentFunding.toLocaleString('de-DE');
    const formattedGoalFunding = project.goalFunding.toLocaleString('de-DE');

    return (
        <div className="relative w-full fade-in" style={{ height: `${window.innerWidth < 640 ? '35vh' : '65vh'}` }}>
            <div className="w-full h-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${project.projectCover})` }}>
                <div className="w-10/12 grid grid-cols-2 gap-20">
                    <div className="w-10/12 p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-90 backdrop-blur-md flex flex-col gap-4">
                        <div className="flex gap-2 items-end">
                            <h2 className="font-dmsans font-bold text-5xl">{project.projectName}</h2>
                            <Link to={`/profile/${project.creatorUrl}`} className="font-dmsans text-black text-opacity-70">by {project.projectCreator}</Link>
                        </div>
                        <p className="font-dmsans">{project.shortDescription}</p>
                        <div className="flex flex-col gap-3">
                            <div className="bg-gray-300 h-3 rounded-full w-full">
                                <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: `${project.fundedPercentage}%` }}>
                                </div>
                            </div>
                            <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">{formattedCurrentFunding}€</span> funded of a {formattedGoalFunding}€ goal</p>
                            <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">{project.sponsors}</span> funders</p>
                            <div className="flex items-center justify-between">
                                <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">{project.timeLeft}</span> hours left</p>
                                <div className="flex gap-5">
                                    <p className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40" src={views} alt="" />{project.views}</p>
                                    <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 grayscale group-hover:grayscale-0" src={likeInteract} alt="" />{project.likes}</button>
                                    <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100 -rotate-180" src={dislike} alt="" />{project.dislikes}</button>
                                </div>
                            </div>
                        </div>
                        <button className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-dmsans font-bold">Help this project</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;