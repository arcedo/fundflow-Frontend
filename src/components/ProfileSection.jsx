import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectSection from "./ProjectSection";
// import FeedbackSection from "./FeedbackSection";
import image1 from "../assets/pictures/main1.webp";
import image2 from "../assets/pictures/main2.webp";
import image3 from "../assets/pictures/main3.webp";
import image4 from "../assets/pictures/venom.jpg";

const projects2 = [
    {
        projectName: "Project Five",
        projectCreator: "User5",
        projectCategory: "innove",
        projectImage: image3,
        likes: 200,
        fundedPercentage: 30
    },
    {
        projectName: "Project Six",
        projectCreator: "User6",
        projectCategory: "art",
        projectImage: image4,
        likes: 42,
        fundedPercentage: 65
    },
    {
        projectName: "Project Seven",
        projectCreator: "User7",
        projectCategory: "music",
        projectImage: image2,
        likes: 1976,
        fundedPercentage: 43
    },
    {
        projectName: "Project Eight",
        projectCreator: "User8",
        projectCategory: "dev",
        projectImage: image1,
        likes: 1,
        fundedPercentage: 0
    }
];

function ProfileSection({ projects }) {
    const [activeTab, setActiveTab] = useState("projects");

    const renderSection = () => {
        switch (activeTab) {
            case "projects":
                return <ProjectSection projectsFound={projects} />;
            case "collaborating":
                return <ProjectSection projectsFound={projects2} />;
            case "feedback":
                return (<p>wawa</p>);
            default:
                return <ProjectSection projectsFound={projects} />;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full gap-5">
            <div className="flex justify-start items-end gap-8 w-10/12">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`text-black font-dmsans font-semibold border-b-2 border-transparent hover:border-black transition-all duration-200 ${activeTab === "projects" ? "border-black" : ""}`}
                >
                    projects
                </button>
                <button
                    onClick={() => setActiveTab("collaborating")}
                    className={`text-black font-dmsans font-semibold border-b-2 border-transparent hover:border-black transition-all duration-200 ${activeTab === "collaborating" ? "border-black" : ""}`}
                >
                    collaborating
                </button>
                <button
                    onClick={() => setActiveTab("feedback")}
                    className={`text-black font-dmsans font-semibold border-b-2 border-transparent hover:border-black transition-all duration-200 ${activeTab === "feedback" ? "border-black" : ""}`}
                >
                    feedback
                </button>
            </div>
            <div className="flex justify-center items-center bg-white w-full">
                <div className="flex justify-center items-center py-5 w-10/12">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
