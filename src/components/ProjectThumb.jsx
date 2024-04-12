import React from "react";
import like from "../assets/icons/like.svg";

function ProjectThumb({projectName, projectCreator, projectCategory, projectImage, likes, fundedPercentage}) {
    return (
        <div className="flex flex-col group/project">
            <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary h-52 w-full rounded-md">
                <p className="absolute font-dmsans top-3 right-3 z-30 py-2 px-3 bg-gray-500 bg-opacity-75 text-white text-sm font-bold rounded-full group-hover/project:translate-x-1.5 group-hover/project:-translate-y-1.5 transition-all duration-200">{projectCategory}</p>
                <a href="#" className="flex flex-col justify-center items-center h-full w-full bg-gray-300 rounded-md group-hover/project:translate-x-1.5 group-hover/project:-translate-y-1.5 transition-all duration-200 filter brightness-75 group-hover/project:brightness-100">
                    <img className="h-full w-full rounded-md" src={projectImage} alt="" />
                </a>
            </div>
            <div className="flex items-center justify-between gap-3 pt-3">
                <div className="flex items-center justify-between gap-3">
                    <a href="/login" className="h-12 w-12 rounded-full bg-black group/user"></a>
                    <div className="flex flex-col">
                        <a className="font-dmsans text-2xl font-bold text-black group-hover/project:text-secondary transition duration-300 text-opacity-75 cursor-pointer">{projectName}</a>
                        <a className="font-dmsans text-black transition duration-300 text-opacity-75 text-sm cursor-pointer group/user">by <span className="group-hover/user:text-primary hover:border-b hover:border-b-black transition duration-300">{projectCreator}</span></a>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-right">
                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold cursor-pointer flex items-center justify-end gap-1"><img className="w-5 opacity-75" src={like} alt="" /> {likes}</p>
                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold cursor-pointer">{fundedPercentage}% funded</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectThumb;
