import React, { useState, useEffect } from "react";

function ProjectGallery({ project }) {
    const [hoveredImage, setHoveredImage] = useState(project.projectImage[0]);

    function handleImageHover(image) {
        setHoveredImage(image);
    }

    return (
        <div className="w-10/12 flex flex-col gap-3 mt-5 fade-in" style={{ animationDelay: `0.1s` }}>
            <h3 className="font-dmsans font-bold text-3xl text-black text-opacity-70">Gallery</h3>
            <div className="w-full flex flex-col gap-3 sm:flex-row col-span-3 sm:h-full" style={{ height: '55vh' }}>
                <div className="flex-1 relative sm:overflow-hidden rounded-md">
                    <div className="sm:absolute inset-0">
                        {project.projectImage.length === 0 ? (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center  rounded-md">
                                <p className="text-black font-dmsans font-semibold text-2xl text-opacity-75">No images available</p>
                            </div>
                        ) : (
                            <img src={hoveredImage} alt="" className="w-full rounded-md sm:h-full object-cover" />
                        )}
                    </div>
                </div>
                <div className="sm:w-2/12 flex sm:flex-col gap-3">
                    {Array.from({ length: 4 }).map((_, index) => {
                        const image = project.projectImage[index];
                        return (
                            <div className="sm:h-1/4 w-full relative overflow-hidden rounded-md" key={index}>
                                {image ? (
                                    <img
                                        src={image}
                                        alt={`Project Image ${index}`}
                                        className={`w-full h-14 sm:h-full object-cover filter ${hoveredImage === image ? 'brightness-90' : 'brightness-75'} hover:brightness-90 transition-all duration-300`}
                                        onMouseEnter={() => handleImageHover(image)}
                                    />
                                ) : (
                                    <div className="bg-gray-300 w-full h-full flex items-center justify-center opacity-75">
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProjectGallery;



// import React, { useState, useEffect } from "react";
// import plusDark from "../assets/icons/plusDark.svg";

// function ProjectGallery({ project, editMode }) {
//     const [hoveredImage, setHoveredImage] = useState(project.projectImage[0]);
//     const [uploadedImages, setUploadedImages] = useState(Array(4).fill(null));

//     useEffect(() => {
//         setHoveredImage(project.projectImage[0]);
//     }, [project]);

//     const handleImageUpload = (event, index) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const newUploadedImages = [...uploadedImages];
//                 newUploadedImages[index] = reader.result;
//                 setUploadedImages(newUploadedImages);

//                 // Update hovered image if replaced
//                 setHoveredImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleImageClick = (index) => {
//         if (editMode) {
//             document.getElementById(`projectImageInput${index}`).click();
//         } else {
//             setHoveredImage(project.projectImage[index]);
//         }
//     };

//     return (
//         <div className="w-10/12 flex flex-col gap-3 mt-5 fade-in" style={{ animationDelay: `0.1s` }}>
//             <h3 className="font-dmsans font-bold text-3xl text-black text-opacity-70">Gallery</h3>
//             <div className="w-full flex flex-col gap-3 sm:flex-row col-span-3 sm:h-full" style={{ height: `${window.innerWidth < 640 ? '35vh' : '55vh'}` }}>
//                 <div className="flex-1 relative sm:overflow-hidden rounded-md">
//                     <div className="sm:absolute inset-0">
//                         {project.projectImage.length === 0 ? (
//                             <div className="w-full h-full bg-gray-300 flex items-center justify-center opacity-75 rounded-md">
//                                 <p className="text-black font-dmsans font-semibold text-2xl">No images available</p>
//                             </div>
//                         ) : (
//                             <img src={hoveredImage} alt="" className="w-full rounded-md sm:h-full object-cover" />
//                         )}
//                     </div>
//                 </div>
//                 <div className="sm:w-2/12 flex sm:flex-col gap-3">
//                     {project.projectImage.map((image, index) => (
//                         <div className="sm:h-1/4 w-full relative overflow-hidden rounded-md" key={index} onClick={() => handleImageClick(index)}>
//                             <img
//                                 src={image}
//                                 alt={`Project Image ${index}`}
//                                 className="w-full h-full object-cover"
//                             />
//                             {editMode && (
//                                 <input type="file" id={`projectImageInput${index}`} className="hidden" onChange={(event) => handleImageUpload(event, index)} />
//                             )}
//                         </div>
//                     ))}
//                     {editMode && Array.from({ length: 4 - project.projectImage.length }).map((_, index) => (
//                         <div className="sm:h-1/4 w-full relative overflow-hidden rounded-md" key={index} onClick={() => handleImageClick(index + project.projectImage.length)}>
//                             <label htmlFor={`projectImageInput${index}`} className="w-full h-full flex items-center justify-center bg-gray-300 rounded-md cursor-pointer">
//                                 {uploadedImages[index + project.projectImage.length] ? (
//                                     <img src={uploadedImages[index + project.projectImage.length]} alt="Uploaded" className="w-full h-full object-cover" />
//                                 ) : (
//                                     <img src={plusDark} alt="Add" className="w-10 h-10 opacity-75" />
//                                 )}
//                             </label>
//                             <input type="file" id={`projectImageInput${index}`} className="hidden" onChange={(event) => handleImageUpload(event, index + project.projectImage.length)} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProjectGallery;