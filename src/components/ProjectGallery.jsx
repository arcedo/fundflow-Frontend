import React, { useState, useEffect } from "react";
import plusDark from "../assets/icons/plusDark.svg";
import { postProjectImage, getProjectImages, deleteProjectImage } from "../services";
import { resizeImage } from "../helpers/resize";

function ProjectGallery({ project, editMode, setProject }) {
    const [hoveredImage, setHoveredImage] = useState(() => {
        if (project && Array.isArray(project.imgs) && project.imgs.length > 0 && project.imgs[0]._id) {
            return { src: project.imgs[0]._id, index: 0 };
        }
        return { src: '', index: 0 };
    });

    useEffect(() => {
        if (project && Array.isArray(project.imgs) && project.imgs.length > 0 && project.imgs[0]._id) {
            setHoveredImage({ src: project.imgs[0]._id, index: 0 });
        }
    }, [project]);
    function imageDisplayed(image, index) {
        document.getElementById('projectImage' + hoveredImage.index).classList.toggle('brightness-75');
        document.getElementById('projectImage' + hoveredImage.index).classList.toggle('brightness-90');
        document.getElementById('projectImage' + index).classList.toggle('brightness-75');
        document.getElementById('projectImage' + index).classList.toggle('brightness-90');
        setHoveredImage({ src: image._id, index: index });
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const resizedImage = await resizeImage(file, 1000, 1000, 100);
            await postProjectImage(localStorage.getItem('token'), project.id, resizedImage)
                .then(async (response) => {
                    if (response.id) {
                        await getProjectImages(project.id)
                            .then((imagesSrc) => {
                                setProject({ ...project, imgs: imagesSrc });
                            });
                    }
                })
        }
    };

    const handleDeleteImage = async (imageId) => {
        await deleteProjectImage(localStorage.getItem('token'), project.id, imageId)
            .then(async (response) => {
                if (response.code === 200) {
                    await getProjectImages(project.id)
                        .then((imagesSrc) => {
                            setProject({ ...project, imgs: imagesSrc });
                            if (imagesSrc.code === 400) {
                                setHoveredImage({ src: '', index: 0 });
                            }
                        });
                }
            });
    };

    return (
        <div className="w-10/12 flex flex-col gap-3 mt-96 lg:mt-5 fade-in" style={{ animationDelay: `0.1s` }}>
            <h3 className="font-dmsans font-bold text-3xl text-black text-opacity-70">Gallery</h3>
            <div className="w-full flex flex-col gap-3 md:flex-row col-span-3" style={{ height: `${window.innerWidth < 680 ? 'auto' : '50vh'}` }}>
                <div className="flex-1 relative overflow-hidden rounded-md h-full">
                    <div className="h-72 lg:h-auto lg:absolute inset-0">
                        {project?.imgs?.length === 0 || !hoveredImage.src ? (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
                                <p className="text-black font-dmsans font-semibold text-2xl text-opacity-75">{editMode ? 'upload some images' : 'no images available'}</p>
                            </div>
                        ) : (
                            <img src={`${import.meta.env.VITE_API_URL}projects/${project.id}/image/${hoveredImage.src}`} alt="" className="w-full rounded-md h-full object-cover" />
                        )}
                    </div>
                </div>
                <div className="sm:w-2/12 flex sm:flex-col gap-2 sm:gap-4 h-full">
                    {Array.from({ length: 4 }).map((_, index) => {
                        const image = project.imgs && project.imgs[index];
                        return (
                            <div className={`w-full h-20 md:h-30 relative ${editMode ? '' : 'overflow-hidden'} rounded-md`} key={index}>
                                {image ? (editMode ?
                                    <button onClick={() => handleDeleteImage(image._id)} className="w-full hover:bg-red-600 transition-all duration-200 group shake overflow-hidden h-full rounded-md">
                                        <img
                                            id={"projectImage" + index}
                                            src={`${import.meta.env.VITE_API_URL}projects/${project.id}/image/${image._id}`}
                                            alt={`Project Image ${index}`}
                                            className={`w-full sm:h-full object-cover filter ${hoveredImage === image ? 'brightness-90' : 'brightness-75'} hover:brightness-90 transition-all duration-300 group-hover:opacity-70`}
                                            onMouseEnter={() => imageDisplayed(image, index)}
                                        />
                                    </button>
                                    :
                                    <img
                                        id={"projectImage" + index}
                                        src={`${import.meta.env.VITE_API_URL}projects/${project.id}/image/${image._id}`}
                                        alt={`Project Image ${index}`}
                                        className={`w-full h-full sm:h-full object-cover filter ${hoveredImage === image ? 'brightness-90' : 'brightness-75'} hover:brightness-90 transition-all duration-300`}
                                        onMouseEnter={() => imageDisplayed(image, index)}
                                    />
                                ) : (editMode ?
                                    <div className="w-full h-full bg-gray-300 rounded-md opacity-75">
                                        <label htmlFor={`projectImageInput${index}`} className="w-full h-full flex justify-center items-center flex-col cursor-pointer">
                                            <img className="w-10 h-full" src={plusDark} alt="add new image" />
                                        </label>
                                        <input type="file" onChange={handleImageUpload} id={`projectImageInput${index}`} name={`projectImageInput${index}`} className="hidden" accept="image/*" />
                                    </div>
                                    :
                                    <div className="bg-gray-300 w-full h-full flex items-center justify-center opacity-75"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}

export default ProjectGallery;