import React, { useState } from "react";
import GridProjectSection from "./GridProjectSection";

function ProfileSection({ belongingUser, ownerProjects, collaboratingProjects, likedProjects, dislikedProjects }) {
    const [activeTab, setActiveTab] = useState("projects");

    const renderSection = () => {
        switch (activeTab) {
            case "collaborating":
                return (<GridProjectSection search={4} key="collab" projectsFound={collaboratingProjects} belongingUser={belongingUser} onEmptyMessage={'This user isn\'t involved in any projects.'} imageEmptyVisible={true} />);
            case "feedback":
                return (<p className="fade-in">wawa</p>);
            case "liked":
                return (<GridProjectSection search={4} key="liked" projectsFound={likedProjects} belongingUser={belongingUser} onEmptyMessage={'You are so dull.'} />);
            case "disliked":
                return (<GridProjectSection search={4} key="disliked" projectsFound={dislikedProjects} belongingUser={belongingUser} onEmptyMessage={'So wholesome!'} />);
            default:
                return (<GridProjectSection search={4} key="projects" projectsFound={ownerProjects} belongingUser={belongingUser} onEmptyMessage={'This user has no projects.'} imageEmptyVisible={true} />);
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
            <div className="flex justify-center items-center bg-white w-full min-h-64">
                <div className="flex justify-between items-center pt-7 pb-10 w-10/12 mx-auto">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
