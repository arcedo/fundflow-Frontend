import React from "react";
import { Link } from "react-router-dom";
import noDataFound from "../assets/icons/no_data_found.svg";
import ProjectThumb from "./ProjectThumb";
//TODO: load more liked and disliked
function GridProjectSection({ sectionTitle, projectsFound, seeMore, search, loggedUserId, onEmptyMessage, imageEmptyVisible }) {
    const numberOfColumns = search;
    const placeholdersCount = projectsFound ? projectsFound.length % numberOfColumns : 0;
    const placeholdersNeeded = placeholdersCount > 0 ? numberOfColumns - placeholdersCount : 0;
    return (
        <section className="flex justify-center items-center fade-in w-full">
            <div className="w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4 fade-in">{sectionTitle}</h3>
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${search == 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 w-full`}>
                    {projectsFound && !projectsFound.message && projectsFound.length > 0 ? projectsFound.map((project, index) => {
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
                                    projectType={project.collGoal ? 'collab' : 'fund'}
                                    likes={project.stats.likes ?? 0}
                                    dislikes={project.stats.dislikes ?? 0}
                                    fundedPercentage={project.percentageDone ?? 0}
                                    views={project.stats.views ?? 0}
                                    belongingUser={loggedUserId === project.creator ? project.creator : null}
                                />
                            </div>
                        );
                    }) : <div className="col-span-4 flex flex-col gap-2.5 justify-center items-center fade-in">
                        {imageEmptyVisible ? <img src={noDataFound} alt="No projects found" className="w-72" /> : null}
                        <p className="text-black text-opacity-75 font-dmsans py-10 font-semibold text-xl">{onEmptyMessage ?? 'No projects found'}</p>
                    </div>
                    }
                    {Array.from({ length: placeholdersNeeded }).map((_, index) => {
                        const delay = (projectsFound.length + index) * 0.05;
                        return (
                            <div key={`placeholderProject-${index}`} style={{ animationDelay: `${delay}s` }} className="fade-in flex flex-col w-full rounded-lg">
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
                        );
                    })}
                </div>
                {seeMore && (
                    <div className="flex justify-center items-center mt-6 gap-3">
                        <hr className="w-6/12 border-black border-opacity-25" />
                        <Link to={"/search?query="} className="font-dmsans w-6/12 md:w-2/12 lg:w-1/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">see more</Link>
                        <hr className="w-6/12 border-black border-opacity-25" />
                    </div>
                )}
            </div>
        </section >
    );
}

export default GridProjectSection;
