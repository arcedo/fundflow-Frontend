import React, { useState, useEffect, useRef } from "react";

function ProjectBlogs({ project }) {
    return (
        <div className="w-full flex flex-col py-4">
            <div className="flex flex-col gap-8 justify-center items-center">
                {project.blog.map((blog, index) => (
                    <BlogEntry key={blog.blogId} blog={blog} index={index} />
                ))}
            </div>
        </div>
    );
}

function BlogEntry({ blog, index }) {
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

    const delay = index * 0.05;
    const contentClass = isOverflowing ? "blogMask text-black font-dmsans font-normal text-opacity-70 overflow-hidden" : "text-black font-dmsans font-normal text-opacity-70 overflow-hidden";

    return (
        <div style={{ animationDelay: `${delay}s` }} className="fade-in w-8/12 cursor-pointer p-6 flex flex-col gap-4 rounded-lg shadow-md border-2 border-gray-300 border-opacity-20 hover:bg-gray-200 hover:bg-opacity-40 transition-all duration-200">
            <div className="flex flex-col">
                <p className="text-black font-dmsans font-normal text-opacity-70">{blog.blogDate}</p>
                <div className="flex gap-2 items-end">
                    <h3 className="text-black font-dmsans font-bold text-3xl">{blog.blogTitle}</h3>
                    <p className="text-black font-dmsans font-normal text-opacity-70 pb-0.5">/ {blog.timeRead} read</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded-lg shadow-xl" style={{ backgroundImage: `url(${blog.blogImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '30vh' }}></div>
                <div className="flex flex-col gap-3" style={{ height: '30vh' }}>
                    <p ref={contentRef} className={contentClass}>{blog.blogContent}</p>
                    {isOverflowing && (
                        <div className="flex justify-center items-center gap-3">
                            <hr className="w-6/12 border-black border-opacity-25" />
                            <div className="font-dmsans w-3/12 text-black text-opacity-75 font-semibold text-lg text-center bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">read more</div>
                            <hr className="w-6/12 border-black border-opacity-25" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectBlogs;
