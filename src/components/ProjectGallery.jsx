import React from "react";
import { useState, useEffect } from "react";

function ProjectGallery({ project }) {

    const [hoveredImage, setHoveredImage] = useState({ src: project.projectImage[0], index: 0 });

    useEffect(() => {
        setHoveredImage({ src: project.projectImage[0], index: 0 });
    }, [project]);

    function imageDisplayed(image, index) {
        document.getElementById('projectImage' + hoveredImage.index).classList.toggle('brightness-50');
        document.getElementById('projectImage' + hoveredImage.index).classList.toggle('brightness-90');
        document.getElementById('projectImage' + index).classList.toggle('brightness-50');
        document.getElementById('projectImage' + index).classList.toggle('brightness-90');
        setHoveredImage({ src: image, index: index });
    }

    return (
        <div className="w-10/12 flex flex-col gap-3 mt-5 fade-in">
            <h3 className="font-dmsans font-bold text-3xl text-black text-opacity-70">Gallery</h3>
            <div className="w-full flex flex-col gap-3 sm:flex-row col-span-3 sm:h-full" style={{ height: `${window.innerWidth < 640 ? '35vh' : '55vh'}` }}>
                <div className="flex-1 relative sm:overflow-hidden rounded-md">
                    <div className="sm:absolute inset-0">
                        <img src={hoveredImage.src} alt="" className="w-full rounded-md sm:h-full object-cover" />
                    </div>
                </div>
                <div className="sm:w-2/12 grid grid-cols-1 gap-2">
                    {project.projectImage.map((image, index) => (
                        <div className="w-full relative overflow-hidden rounded-md" key={index}>
                            <div>
                                <img
                                    id={`projectImage${index}`}
                                    src={image}
                                    alt=""
                                    className={`w-full sm:h-full filter ${index === 0 ? 'brightness-90' : 'brightness-50'} hover:brightness-90 transition-all duration-300`}
                                    onMouseEnter={() => imageDisplayed(image, index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectGallery;