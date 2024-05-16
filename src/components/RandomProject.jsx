import React, { useState } from "react";
import { Link } from "react-router-dom";
import like from "../assets/icons/like.svg";
import likeInteract from "../assets/icons/likeInteract.svg";
import views from "../assets/icons/views.svg";
import link from "../assets/icons/link.svg";
import logo from "../assets/icons/logoLight.png";

function RandomProject({ project }) {
    if (!project) {
        // Render some placeholder or loading state while waiting for data
        return <div className="col-span-5 flex justify-center flex-col items-center w-full h-full gap-5">
            <img src={logo} alt="" className='w-24 h-24 rounded-md' />
            <p className="text-2xl font-dmsans font-semibold">Loading...</p>
        </div>;
    }

    const [hoveredImage, setHoveredImage] = useState({ src: project?.imgs?.[0]?._id ?? '', index: 0 });

    function imageDisplayed(image, index) {
        document.getElementById('projectImage' + hoveredImage.index).classList.toggle('brightness-75');
        document.getElementById('projectImage' + hoveredImage.index).classList.toggle('brightness-90');
        document.getElementById('projectImage' + index).classList.toggle('brightness-75');
        document.getElementById('projectImage' + index).classList.toggle('brightness-90');
        setHoveredImage({ src: image._id, index: index });
    }
    return (
        <>
            <div className="w-full flex gap-3 flex-col sm:flex-row col-span-3 sm:h-full">
                <div className="flex-1 relative sm:overflow-hidden rounded-md">
                    <div className="sm:absolute inset-0">
                        <img src={hoveredImage && hoveredImage.src ? `${import.meta.env.VITE_API_URL}projects/${project.id}/image/${hoveredImage.src}` : `${import.meta.env.VITE_API_URL}projects/${project.id}/cover`} alt="" className="w-full h-60 rounded-md sm:h-full object-cover" />
                    </div>
                </div>
                <div className="sm:w-2/12 flex sm:flex-col gap-3">
                {/* Render exactly four slots */}
                {Array.from({ length: 4 }).map((_, index) => {
                    const image = project.imgs && project.imgs[index];
                    return (
                        <div className="sm:h-24 w-full relative overflow-hidden rounded-md" key={index}>
                            {image ? (
                                // If project has images, render the image
                                <img
                                    id={`projectImage${index}`}
                                    src={`${import.meta.env.VITE_API_URL}projects/${project.id}/image/${image._id}`}
                                    alt={`Project Image ${index}`}
                                    className={`w-full h-14 sm:h-full object-cover filter ${index === 0 ? 'brightness-90' : 'brightness-75'} hover:brightness-90 transition-all duration-300`}
                                    onMouseEnter={() => imageDisplayed(image, index)}
                                />
                            ) : (
                                // If project doesn't have enough images, render a placeholder
                                <div className="bg-gray-200 w-full h-full flex items-center justify-center opacity-75">
                                </div>
                            )}
                        </div>
                    );
                })}

                </div>
            </div>
            <div className="w-full h-full flex col-span-2 flex-col justify-between">
                <div className="flex flex-col gap-3.5">
                    <div className="w-full flex flex-col gap-2">
                        <Link to={`/projects/${project.projectUrl}`} className="font-dmsans text-5xl font-bold text-black text-opacity-75 hover:text-secondary transition-all duration-300">{project.title}</Link>
                        <Link to={`/profile/${project.userUrl}`} className="font-dmsans text-lg text-black group">by <span className="text-black  text-opacity-75 group-hover:text-primary transition-all duration-300font-semibold">{project.creator}</span></Link>
                    </div>
                    <p className="w-full font-dmsans text-black text-normal font-medium opacity-75 select-none">{project.description}</p>
                    <Link to={`/projects/${project.projectUrl}`} className="font-dmsans text-black text-lg font-bold flex gap-0.5 items-center select-none group w-fit">read more<img className="transition-all duration-300 w-8 group-hover:-translate-y-1 group-hover:translate-x-1 grayscale group-hover:grayscale-0" src={link} alt="" /></Link>
                    <div className="flex justify-center sm:justify-normal py-3 sm:py-0 items-center gap-6">
                        <button className="w-12 h-12 bg-gray-300 shadow-md bg-opacity-50 backdrop-blur-lg rounded-full flex justify-center items-center group"><img className="w-7/12 transition-all duration-300 grayscale group-hover:grayscale-0" src={likeInteract} alt="" /></button>
                        <button className="w-12 h-12 bg-gray-300 shadow-md bg-opacity-50 backdrop-blur-lg rounded-full flex justify-center items-center group"><img className="w-7/12 transition-all duration-300 opacity-40 -rotate-180 group-hover:opacity-100" src={like} alt="" /></button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 justify-between w-full">
                    <div className="w-fit">
                        <p className="font-dmsans py-2 px-3 bg-gray-500 bg-opacity-75 text-white text-sm font-bold rounded-full select-none lowercase">{project.category}</p>
                    </div>
                    <div className="flex gap-7">
                        <p className="font-dmsans text-black text-normal font-medium opacity-75 flex gap-2 items-end select-none"><span className="font-bold">{project.fundedPercentage ?? 0}%</span>funded</p>
                        <p className="font-dmsans text-black text-normal font-medium opacity-75 flex gap-2 items-end select-none"><img className="w-7" src={views} alt="" />{project.stats.views ?? "-"}</p>
                        <p className="font-dmsans text-black text-normal font-medium opacity-75 flex gap-2 items-end select-none"><img className="w-7" src={like} alt="" />{project.stats.likes ?? "-"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

/*
    
*/
export default RandomProject;
