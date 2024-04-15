
import React, { useState } from "react";
import like from "../assets/icons/like.svg";
import views from "../assets/icons/views.svg";
import link from "../assets/icons/link.svg";

function RandomProject({ project }) {
    const [hoveredImage, setHoveredImage] = useState({ src: project.projectImage[0], index: 0});

    function imageDisplayed(image, index) {
        document.getElementById('projectImage'+hoveredImage.index).classList.toggle('brightness-75');
        document.getElementById('projectImage'+hoveredImage.index).classList.toggle('brightness-90');
        document.getElementById('projectImage'+index).classList.toggle('brightness-75');
        document.getElementById('projectImage'+index).classList.toggle('brightness-90');
        setHoveredImage({ src: image , index: index });
    }

    return (
    <section className="py-10 px-10 shadow-xl border-2 border-gray-200 border-opacity-50 bg-opacity-60 backdrop-blur-md gap-10 rounded-md grid grid-cols-5">
        <div className="flex gap-3 col-span-3 h-full">
            <div className="flex-1 relative overflow-hidden rounded-md">
                <div className="absolute inset-0"><img src={hoveredImage.src} alt="" className="w-full h-full object-cover" /></div>
            </div>
            <div className="w-2/12 flex flex-col gap-3">
                {project.projectImage.map((image, index) => (
                    <div className="h-24 w-full relative overflow-hidden rounded-md" key={index}>
                        <div>
                            <img
                                id={`projectImage${index}`}
                                src={image}
                                alt=""
                                className={`w-full object-cover filter ${index===0 ? 'brightness-90':'brightness-75'} hover:brightness-90 transition-all duration-300`}
                                onMouseEnter={() => imageDisplayed(image, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="h-full flex col-span-2 flex-col justify-between">
            <div className="flex flex-col gap-3.5">
                <div className="flex items-end gap-2">
                    <a href="/project" className="font-dmsans text-5xl font-bold text-black text-opacity-75 hover:text-secondary transition-all duration-300">{project.projectName}</a>
                    <a href="/profile" className="font-dmsans text-lg text-black group">by <span className="text-black  text-opacity-75 group-hover:text-primary transition-all duration-300font-semibold">{project.projectCreator}</span></a>
                </div>
                <p className="font-dmsans text-black text-normal font-medium opacity-75 select-none">{project.projectDescription}</p>
                <a href="/project" className="font-dmsans text-black text-lg font-bold flex gap-0.5 items-center select-none group hover:text-secondary transition-all duration-500">read more<img className="transition-all duration-300 w-8 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:fill-secondary" src={link} alt="" /></a>
            </div>
            <div className="flex gap-10 justify-between w-full">
                <div className="">
                    <p className="font-dmsans py-2 px-3 bg-gray-500 bg-opacity-75 text-white text-sm font-bold rounded-full select-none">{project.projectCategory}</p>
                </div>
                <div className="flex gap-7">
                    <p className="font-dmsans text-black text-normal font-medium opacity-75 flex gap-2 items-end select-none"><span className="font-bold">{project.fundedPercentage}%</span>funded</p>
                    <p className="font-dmsans text-black text-normal font-medium opacity-75 flex gap-2 items-end select-none"><img className="w-7" src={views} alt="" />{project.views}</p>
                    <p className="font-dmsans text-black text-normal font-medium opacity-75 flex gap-2 items-end select-none"><img className="w-7" src={like} alt="" />{project.likes}</p>
                </div>
            </div>
        </div>
    </section>

    );
}

/*
    
*/
export default RandomProject;
