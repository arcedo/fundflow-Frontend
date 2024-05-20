import React, { useState, useEffect, useRef } from "react";
import plusDark from "../assets/icons/plusDark.svg";
import MdlCreateBlog from "./MdlCreateBlog";
import cross from "../assets/icons/cross.svg"
import { deleteProjectBlog } from "../services";

function calculateReadingTime(wordCount) {
    // Step 1: Divide the total word count by 200 to get a decimal number
    const decimalTime = wordCount / 200;

    // Step 2: The integer part is the minutes
    const minutes = Math.floor(decimalTime);

    // Step 3: The decimal part is the seconds calculation
    const decimalPart = decimalTime - minutes;
    const seconds = Math.round(decimalPart * 60);

    return {
        minutes: minutes,
        seconds: seconds
    };
}

function ProjectBlogs({ project, editMode, setProject }) {
    const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
    return (
        <div className="w-full flex flex-col">
            {showCreateBlogModal && <MdlCreateBlog onClose={() => setShowCreateBlogModal(false)} setProject={setProject} project={project} />}
            <div className="flex flex-col gap-8 justify-center items-center py-5 min-h-56">
                {editMode && (
                    <button onClick={() => setShowCreateBlogModal(true)} className="w-8/12 group focus:outline-none outline-none hover:shadow-lg transition-all duration-300 border-black border-opacity-50 border-2 rounded-lg py-10 border-dashed flex flex-col justify-center items-center">
                        <img className="w-10" src={plusDark} alt="create new blog" />
                        <p className="font-dmsans text-xl group-hover:text-secondary transition-all duration-200">new entry</p>
                    </button>
                )}
                {project.blogs && project.blogs.length > 0 ? project.blogs.map((blog, index) => (
                    <BlogEntry key={blog._id} blog={blog} index={index} project={project} editMode={editMode} setProject={setProject} />
                )) : (!editMode && <p className="fade-in text-black font-dmsans font-bold text-lg text-opacity-70">no blogs available</p>)
                }
            </div>
        </div>
    );
}

function BlogEntry({ blog, index, project, editMode, setProject }) {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            const current = contentRef.current;
            if (current) {
                setIsOverflowing(current.scrollHeight > current.clientHeight);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, []);

    const handleDelete = async (blogId) => {
        try {
            await deleteProjectBlog(localStorage.getItem('token'), project.id, blogId)
                .then((res) => {
                    if (res.code === 200) {
                        setProject({ ...project, blogs: project.blogs.filter((blog) => blog._id !== blogId) });
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }

    const delay = index * 0.05;
    const contentClass = isOverflowing ? "blogMask text-black font-dmsans font-normal text-opacity-70 overflow-hidden" : "text-black font-dmsans font-normal text-opacity-70 overflow-hidden";

    const dateObj = new Date(blog.creationDate);
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' });

    const suffix = (d) => ['th', 'st', 'nd', 'rd'][((d % 100) > 3 && (d % 100) < 21) || (d % 10) > 3 ? 0 : d % 10] || 'th';

    const formattedDate = `${month} ${day}${suffix(day)} ${year}`;
    const readingTime = calculateReadingTime(blog.content.length);
    return (
        <div style={{ animationDelay: `${delay}s` }} className="fade-in w-8/12 cursor-pointer p-6 flex flex-col gap-4 rounded-lg shadow-md border-2 border-gray-300 border-opacity-20 hover:bg-gray-400 hover:bg-opacity-30 transition-all duration-200 relative">
            {editMode && (
                <div className="absolute top-2.5 right-2.5 flex justify-center items-center gap-5">
                    <button onClick={() => handleDelete(blog._id)} className="bg-red-600 rounded-full group">
                        <div className="flex justify-center items-center p-2.5 bg-white shadow-xl border-none rounded-full group-hover:scale-90 transition-all duration-200">
                            <img className="h-6 grayscale group-hover:grayscale-0 transition-all duration-200" src={cross} alt="edit button" />
                        </div>
                    </button>
                </div>
            )}
            <div className="flex flex-col">
                <p className="text-black font-dmsans font-normal text-opacity-70">{formattedDate}</p>
                <div className="flex gap-2 items-end">
                    <h3 className="text-black font-dmsans font-bold text-3xl">{blog.title}</h3>
                    <p className="text-black font-dmsans font-normal text-opacity-70 pb-0.5">/ {`${readingTime.minutes ? readingTime.minutes + ' minutes' : readingTime.seconds + ' seconds'}`} read</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded-lg shadow-xl" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}projects/${project.id}/blogs/${blog._id}/image)`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '30vh' }}></div>
                <div className="flex flex-col gap-3" style={{ height: '30vh' }}>
                    <p ref={contentRef} className={contentClass}>{blog.content}</p>
                    {isOverflowing && (
                        <div className="flex justify-center items-center gap-3">
                            <hr className="w-6/12 border-black border-opacity-25" />
                            <div className="font-dmsans w-4/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">read more</div>
                            <hr className="w-6/12 border-black border-opacity-25" />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default ProjectBlogs;
