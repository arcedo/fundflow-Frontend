import React from "react";
import { Link } from "react-router-dom";
import ProjectThumb from "./ProjectThumb";

function GridProjectSection({ sectionTitle, projectsFound, seeMore, loggedUserId }) {
    const numberOfColumns = 4;

    const placeholdersCount = projectsFound.length % numberOfColumns;
    // console.log(placeholdersCount);
    const placeholdersNeeded = placeholdersCount > 0 ? numberOfColumns - placeholdersCount : 0;
    return (
        <section className="flex justify-center items-center">
            <div className="w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4 fade-in">{sectionTitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {projectsFound.map((project, index) => {
                        const delay = index * 0.05;
                        return (
                            <div key={project.id + '-' + project.projectUrl} style={{ animationDelay: `${delay}s` }} className="fade-in">
                                <ProjectThumb
                                    projectId={project.id}
                                    projectName={project.title}
                                    projectUrl={project.projectUrl}
                                    projectCreator={project.creator}
                                    creatorUrl={project.userUrl}
                                    projectCategory={project.category}
                                    likes={project.stats.likes ?? '--'}
                                    fundedPercentage={project.fundedPercentage ?? 0}
                                    belongingUser={loggedUserId === project.creator ? project.creator : null}
                                />
                            </div>
                        );
                    })}
                    {Array.from({ length: placeholdersNeeded }).map((_, index) => {
                        const delay = (projectsFound.length + index) * 0.05;
                        return (
                            <div key={`placeholder-${projectsFound.length + index}`} style={{ animationDelay: `${delay}s` }} className="fade-in flex flex-col w-full rounded-lg">
                                <div className="h-44 sm:h-60 w-full rounded-md bg-gray-200"></div>
                                <div className="flex items-center justify-between gap-3 pt-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                        <div className="flex flex-col gap-2">
                                            <div className="h-6 w-56 bg-gray-200 rounded-md"></div>
                                            <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            // <div key={`placeholder-${projectsFound.length + index}`} style={{ animationDelay: `${delay}s` }} className="fade-in w-full rounded-lg">
                            //     <div className="h-44 sm:h-60 w-full rounded-md border-2 border-gray-300"></div>
                            // </div>
                        );
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
