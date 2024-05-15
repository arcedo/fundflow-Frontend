import React from "react";
import { useState } from "react";
import MdlProjectPurchase from "./MdlProjectPurchase";
import likeInteract from "../assets/icons/likeInteract.svg";
import dislike from "../assets/icons/like.svg";
import ProjectAbout from "./ProjectAbout";
import ProjectTiers from "./ProjectTiers";
import ProjectBlogs from "./ProjectBlogs";

function ProjectSection({ project, editMode }) {
    const [showProjectPurchaseModal, setShowProjectPurchaseModal] = useState(false);

    const openProjectPurchaseModal = () => {
        setShowProjectPurchaseModal(true);
    };

    const closeProjectPurchaseModal = () => {
        setShowProjectPurchaseModal(false);
    };

    const [activeTab, setActiveTab] = useState("about");

    const renderSection = () => {
        switch (activeTab) {
            case "about":
                return <ProjectAbout project={project} editMode={editMode} />;
            case "tiers":
                return <ProjectTiers project={project} editMode={editMode} />;
            case "blog":
                return <ProjectBlogs project={project} editMode={editMode} />;
            case "feedback":
                return (<p className="fade-in">feedback</p>);
            case "contact":
                return (<p className="fade-in">contact</p>);
            default:
                return (<p className="fade-in">que</p>);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {showProjectPurchaseModal && <MdlProjectPurchase onClose={closeProjectPurchaseModal} />}
            <div id="sectionHeader" className="w-full h-16 bg-grey-300 flex justify-center items-center sticky top-40 z-10">
                <div className="w-10/12 flex justify-between">
                    <div className="flex justify-start items-end gap-8">
                        <button
                            onClick={() => setActiveTab("about")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "about" ? "border-black" : "border-transparent"}`}
                        >
                            about
                        </button>
                        <button
                            onClick={() => setActiveTab("tiers")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "tiers" ? "border-black" : "border-transparent"}`}
                        >
                            tiers
                        </button>
                        <button
                            onClick={() => setActiveTab("blog")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "blog" ? "border-black" : "border-transparent"}`}
                        >
                            blog
                        </button>
                        <button
                            onClick={() => setActiveTab("feedback")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "feedback" ? "border-black" : "border-transparent"}`}
                        >
                            feedback
                        </button>
                        <button
                            onClick={() => setActiveTab("contact")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "contact" ? "border-black" : "border-transparent"}`}
                        >
                            contact
                        </button>
                    </div>
                    <div className="w-4/12 flex justify-end gap-8">
                        <button onClick={openProjectPurchaseModal} className="py-1 px-4 h-8 bg-gradient-to-r from-primary to-secondary border-none bg-opacity-50 rounded-lg text-white font-dmsans font-bold">Help this project</button>
                        <div className="flex gap-6">
                            <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 grayscale group-hover:grayscale-0" src={likeInteract} alt="" />{project.likes}</button>
                            <button className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100 -rotate-180" src={dislike} alt="" />{project.dislikes}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-white w-full">
                <div className="flex justify-center items-center py-5 w-10/12 fade-in">
                    {renderSection()}
                </div>
            </div>
        </div>
    );

}

export default ProjectSection;