import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MdlDeleteProject from "./MdlDeleteProject";
import like from "../assets/icons/like.svg";
import projectSettings from "../assets/icons/projectSettings.svg";

function ProjectThumb({ projectId, projectName, projectUrl, projectCreator, creatorUrl, projectCategory, likes, fundedPercentage, belongingUser }) {
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);

    const optionsRef = useRef(null);

    const toggleOptions = () => setShowOptionsMenu(prev => !prev);

    const handleOptionClick = (action) => {
        setShowOptionsMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptionsMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const openDeleteProjectModal = () => {
        handleOptionClick('Delete');
        setShowDeleteProjectModal(true);
    };

    const closeDeleteProjectModal = () => {
        setShowDeleteProjectModal(false);
    };

    return (
        <div className="flex flex-col group/project" ref={optionsRef}>
            {showDeleteProjectModal && <MdlDeleteProject onClose={closeDeleteProjectModal} projectName={projectName} />}
            <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary h-44 sm:h-60 w-full rounded-md">
                <p className="absolute font-dmsans top-3 right-3 z-30 py-2 px-3 bg-gray-500 bg-opacity-75 text-white text-sm font-bold rounded-full group-hover/project:translate-x-1.5 group-hover/project:-translate-y-1.5 transition-all duration-200 lowercase">{projectCategory}</p>
                {belongingUser && (
                    <div>
                        <div className="absolute flex items-center justify-center font-dmsans top-3 left-3 z-30 p-1 bg-white rounded-full cursor-pointer group-hover/project:translate-x-1.5 group-hover/project:-translate-y-1.5 transition-all duration-200">
                            <img onClick={toggleOptions} src={projectSettings} className="w-7 opacity-70 hover:opacity-100"></img>
                        </div>
                        {showOptionsMenu && (
                            <div className="absolute top-12 left-3 mt-2 bg-white shadow-lg rounded-lg p-2 z-30 group-hover/project:translate-x-1.5 group-hover/project:-translate-y-1.5 transition-all duration-200">
                                <ul>
                                    <li onClick={() => handleOptionClick('Edit')} className="p-2 cursor-pointer font-medium font-dmsans text-black text-opacity-80 hover:text-opacity-100 transition-colors duration-200">Edit</li>
                                    <li onClick={openDeleteProjectModal} className="p-2 cursor-pointer font-medium font-dmsans text-black text-opacity-80 hover:text-opacity-100 hover:text-red-600 transition-colors duration-200">Delete</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                <Link to={`/projects/${projectUrl}`} className="flex flex-col justify-center items-center h-full w-full bg-gray-300 rounded-md group-hover/project:translate-x-1.5 group-hover/project:-translate-y-1.5 transition-all duration-200 filter brightness-75 group-hover/project:brightness-100">
                    <img className="h-full w-full rounded-md object-cover" src={`${import.meta.env.VITE_API_URL}projects/${projectId}/cover`} alt={`Project ${projectName} Cover Image`} />
                </Link>
            </div>
            <div className="flex items-center justify-between gap-3 pt-3">
                <div className="flex items-center justify-between gap-3">
                    <Link to={`/profile/${creatorUrl}`} className="h-12 w-12 rounded-full overflow-hidden bg-black">
                        <img src={`${import.meta.env.VITE_API_URL}users/${creatorUrl}/profilePicture`} alt={`Project ${projectName} Cover Image`} />
                    </Link>
                    <div className="flex flex-col">
                        <Link to={`/projects/${projectUrl}`} className="font-dmsans text-2xl font-bold text-black group-hover/project:text-secondary transition duration-300 text-opacity-75 cursor-pointer">{projectName}</Link>
                        <Link to={`/profile/${creatorUrl}`} className="font-dmsans text-black transition duration-300 text-opacity-75 text-sm cursor-pointer group/user">by <span className="group-hover/user:text-primary hover:border-b hover:border-b-black transition duration-300">{projectCreator}</span></Link>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-right">
                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold cursor-pointer flex items-center justify-end gap-1">
                        <img className="w-5 opacity-75" src={like} alt="Like Icon" />
                        {likes}
                    </p>
                    <p className="font-dmsans text-black text-opacity-75 text-sm font-semibold cursor-pointer">{fundedPercentage}% funded</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectThumb;
