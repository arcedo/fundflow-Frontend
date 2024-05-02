import React from "react";

function ProjectBlogs({ project }) {
    return (
        <div className="w-full flex flex-col py-4">
            <div className="flex flex-col gap-8 justify-center items-center">
                {project.blog.map((blog, index) => {
                    const delay = index * 0.05;
                    return (
                        <div key={blog.blogId} style={{ animationDelay: `${delay}s` }} className="fade-in w-8/12">
                            {/* <div className="flex flex-col gap-2">
                                <div style={{ backgroundImage: `url(${blog.blogImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '30vh', borderRadius: '10px 10px 0 0' }}></div>
                                <div className="flex flex-col gap-2 p-5">
                                    <h3 className="text-black font-dmsans font-bold text-2xl text-opacity-70">{blog.blogTitle}</h3>
                                    <div className="flex justify-between items-center gap-5">
                                        <p className="text-black font-dmsans font-normal text-opacity-75">{blog.blogDate}</p>
                                        <p className="text-black font-dmsans font-normal text-opacity-75">{blog.timeRead} read</p>
                                    </div>
                                    <p className="text-black font-dmsans font-normal text-opacity-75">{blog.blogContent}</p>
                                </div>
                            </div> */}
                            <div className="cursor-pointer p-6 flex flex-col gap-4 rounded-lg shadow-md border-2 border-gray-300 border-opacity-20 hover:bg-gray-200 hover:bg-opacity-40 transition-all duration-200">
                                <div className="flex flex-col">
                                    <p className="text-black font-dmsans font-normal text-opacity-70">{blog.blogDate}</p>
                                    <div className="flex gap-2 items-end">
                                        <h3 className="text-black font-dmsans font-bold text-3xl">{blog.blogTitle}</h3>
                                        <p className="text-black font-dmsans font-normal text-opacity-70 pb-0.5">/ {blog.timeRead} read</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="rounded-lg shadow-xl" style={{ backgroundImage: `url(${blog.blogImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '30vh' }}></div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-black font-dmsans font-normal text-opacity-70">{blog.blogContent}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectBlogs;