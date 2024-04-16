import React from "react";
import ProjectThumb from "./ProjectThumb";

function ProjectSection({ sectionTitle, projectsFound }) {
    return (
        <section className="flex justify-center items-center">
            <div className="w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4">{sectionTitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {/* {projectsFound.map((project, index) => (
                        <ProjectThumb
                            key={index}
                            projectName={project.projectName}
                            projectCreator={project.projectCreator}
                            projectCategory={project.projectCategory}
                            projectImage={project.projectImage}
                            likes={project.likes}
                            fundedPercentage={project.fundedPercentage}
                        />
                    ))} */}
                    {projectsFound.map((project, index) => (
                    (window.innerWidth < 640 && index >= 2) ? null : (
                        <ProjectThumb
                            key={index}
                            projectName={project.projectName}
                            projectCreator={project.projectCreator}
                            projectCategory={project.projectCategory}
                            projectImage={project.projectImage}
                            likes={project.likes}
                            fundedPercentage={project.fundedPercentage}
                        />
                    )))}
                </div>
                <div className="flex justify-center items-center mt-6 gap-3">
                    <hr className="w-6/12 border-black border-opacity-25" />
                    <a href="/projects" className="font-dmsans w-6/12 sm:w-1/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">see more</a>
                    <hr className="w-6/12 border-black border-opacity-25" />
                </div>
            </div>
        </section>
    );
}


export default ProjectSection;