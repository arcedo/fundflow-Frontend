import React, { useState } from "react";
import { Link } from "react-router-dom";
import GridProjectSection from "./GridProjectSection";
// import FeedbackSection from "./FeedbackSection";
import image1 from "../assets/pictures/main1.webp";
import image2 from "../assets/pictures/main2.webp";
import image3 from "../assets/pictures/main3.webp";
import image4 from "../assets/pictures/venom.jpg";

const belongingUser = "User6";

const projects1 = [
    {
        id: 1,
        title: "Project One",
        projectUrl: "project-one",
        creator: "arcedo",
        userUrl: "arcedo",
        category: "art",
        stats: {
            likes: 200 ,
            fundedPercentage: 30
        }
    }
];

const projects2 = [
    {
        projectName: "Project Five",
        projectUrl: "project_five",
        projectCreator: "User5",
        creatorUrl: "user5",
        projectCategory: "innove",
        projectImage: image3,
        stats: {
            likes: 1029 ,
            fundedPercentage: 26
        }
    },
    {
        projectName: "Project Six",
        projectUrl: "project_six",
        projectCreator: "User6",
        creatorUrl: "user6",
        projectCategory: "art",
        projectImage: image2,
        stats: {
            likes: 243 ,
            fundedPercentage: 45
        }
    },
    {
        projectName: "Project Seven",
        projectUrl: "project_seven",
        projectCreator: "User7",
        creatorUrl: "user7",
        projectCategory: "music",
        projectImage: image2,
        stats: {
            likes: 1976 ,
            fundedPercentage: 3
        }
    },
    {
        projectName: "Project Eight",
        projectUrl: "project_eight",
        projectCreator: "User8",
        creatorUrl: "user8",
        projectCategory: "dev",
        projectImage: image1,
        stats: {
            likes: 1 ,
            fundedPercentage: 0
        }
    },
    {
        projectName: "Project Nine",
        projectUrl: "project_nine",
        projectCreator: "User9",
        creatorUrl: "user9",
        projectCategory: "dev",
        projectImage: image1,
        stats: {
            likes: 0 ,
            fundedPercentage: 0
        }
    }
];

function ProfileSection({ projects }) {
    const [activeTab, setActiveTab] = useState("projects");

    const renderSection = () => {
        switch (activeTab) {
            case "projects":
                return <GridProjectSection projectsFound={projects1} belongingUser={belongingUser}/>;
            case "collaborating":
                return <GridProjectSection projectsFound={projects2} belongingUser={belongingUser}/>;
            case "feedback":
                return (<p className="fade-in">wawa</p>);
            case "liked":
                return <GridProjectSection projectsFound={projects1} belongingUser={belongingUser}/>;
            case "disliked":
                return <GridProjectSection projectsFound={projects2} belongingUser={belongingUser}/>;
            default:
                return <GridProjectSection projectsFound={projects} belongingUser={belongingUser}/>;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full gap-5 mt-7 fade-in" style={{ animationDelay: `0.15s` }}>
            <div className="flex justify-start items-end gap-8 w-10/12">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "projects" ? "border-black" : "border-transparent"}`}
                >
                    projects
                </button>
                <button
                    onClick={() => setActiveTab("collaborating")}
                    className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "collaborating" ? "border-black" : "border-transparent"}`}
                >
                    collaborating
                </button>
                <button
                    onClick={() => setActiveTab("feedback")}
                    className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "feedback" ? "border-black" : "border-transparent"}`}
                >
                    feedback
                </button>
                {belongingUser && (
                    <>
                        <button
                            onClick={() => setActiveTab("liked")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "liked" ? "border-black" : "border-transparent"}`}
                        >
                            liked
                        </button>
                        <button
                            onClick={() => setActiveTab("disliked")}
                            className={`text-black font-dmsans font-semibold border-b-2 hover:border-black transition-all duration-200 ${activeTab === "disliked" ? "border-black" : "border-transparent"}`}
                        >
                            disliked
                        </button>
                    </>
                )}
            </div>
            <div className="flex justify-center items-center bg-white w-full">
                <div className="flex justify-between items-center py-5">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
