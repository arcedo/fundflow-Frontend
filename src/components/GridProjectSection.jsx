import React from "react";
import { Link } from "react-router-dom";
import ProjectThumb from "./ProjectThumb";

function GridProjectSection({ sectionTitle, projectsFound, seeMore, belongingUser }) {
    return (
        <section className="flex justify-center items-center">
            <div className="w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4">{sectionTitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {projectsFound.map((project, index) => {
                        const delay = index * 0.1;
                        return (
                            (window.innerWidth < 640 && index >= 2) ? null : (
                            <div key={project.projectUrl} style={{ animationDelay: `${delay}s` }} className="fade-in">
                                <ProjectThumb
                                    projectId={project.projectId}
                                    projectName={project.projectName}
                                    projectUrl={project.projectUrl}
                                    projectCreator={project.projectCreator}
                                    creatorUrl={project.creatorUrl}
                                    projectCategory={project.projectCategory}
                                    projectImage={project.projectImage}
                                    likes={project.likes}
                                    fundedPercentage={project.fundedPercentage}
                                    belongingUser={belongingUser}
                                />
                            </div>
                        ));
                    })}
                </div>
                {seeMore && (
                <div className="flex justify-center items-center mt-6 gap-3">
                    <hr className="w-6/12 border-black border-opacity-25" />
                    <Link to={"/projects"} className="font-dmsans w-6/12 sm:w-1/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">see more</Link>
                    <hr className="w-6/12 border-black border-opacity-25" />
                </div>
                )}
            </div>
        </section>
    );
}


export default GridProjectSection;