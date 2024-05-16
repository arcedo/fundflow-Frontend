import React, { useState } from "react";
import { useEffect } from "react";

function ProjectGallery({ project, editMode }) {
    const [hoveredImage, setHoveredImage] = useState({ src: project.projectImage[0], index: 0 });
    const [uploadedImages, setUploadedImages] = useState(Array.from({ length: project.projectImage.length }, () => null));

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

    const handleImageUpload = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const newUploadedImages = [...uploadedImages];
            newUploadedImages[index] = reader.result;
            setUploadedImages(newUploadedImages);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-10/12 flex flex-col gap-3 mt-5 fade-in" style={{ animationDelay: `0.1s` }}>
            <h3 className="font-dmsans font-bold text-3xl text-black text-opacity-70">Gallery</h3>
            <div className="w-full flex flex-col gap-3 sm:flex-row col-span-3 sm:h-full" style={{ height: `${window.innerWidth < 640 ? '35vh' : '55vh'}` }}>
                <div className="flex-1 relative sm:overflow-hidden rounded-md">
                    <div className="sm:absolute inset-0">
                        {project.projectImage.length === 0 || uploadedImages.some(image => image !== null) ? <div className="w-full h-full bg-gray-300 flex items-center justify-center opacity-75 rounded-md">
                            <p className="text-black font-dmsans font-semibold text-2xl">No images available</p>
                        </div> : <img src={hoveredImage.src} alt="" className="w-full rounded-md sm:h-full object-cover" />}
                    </div>
                </div>
                <div className="sm:w-2/12 flex sm:flex-col gap-3">
                    {project.projectImage.map((image, index) => (
                        <div className="sm:h-1/4 w-full relative overflow-hidden rounded-md" key={index}>
                            <img
                                id={`projectImage${index}`}
                                src={image}
                                alt={`Project Image ${index}`}
                                className={`w-full h-14 sm:h-full object-cover filter ${index === 0 ? 'brightness-90' : 'brightness-75'} hover:brightness-90 transition-all duration-300`}
                                onMouseEnter={() => imageDisplayed(image, index)}
                            />
                        </div>
                    ))}
                    {editMode ? (
                        <>
                            {Array.from({ length: Math.max(0, 4 - project.projectImage.length) }).map((_, index) => (
                            <div className="sm:h-1/4 w-full relative overflow-hidden rounded-md" key={index}>
                                <label htmlFor={`projectImage${index}`} className="w-full h-full flex items-center justify-center bg-gray-300 rounded-md cursor-pointer">
                                    {uploadedImages[index] ? (
                                        <img src={uploadedImages[index]} alt="Uploaded" className="w-full h-full object-cover" />
                                    ) : (
                                        <p className="text-black font-dmsans font-semibold text-2xl text-opacity-75">Add image</p>
                                    )}
                                </label>
                                <input type="file" id={`projectImage${index}`} className="hidden" onChange={(event) => handleImageUpload(event, index)} />
                            </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {Array.from({ length: Math.max(0, 4 - project.projectImage.length) }).map((_, index) => (
                                <div className="sm:h-1/4 w-full relative overflow-hidden rounded-md" key={index}>
                                    <div className="bg-gray-300 w-full h-full flex items-center justify-center opacity-75">
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectGallery;
