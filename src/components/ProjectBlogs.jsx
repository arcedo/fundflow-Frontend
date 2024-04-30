import React from "react";

function ProjectBlogs({ project }) {
    return (
        <div className="w-full flex flex-col gap-5 fade-in">
            <h3 className="text-black font-dmsans font-semibold">Blogs</h3>
            <div className="flex flex-col gap-5">
                {project.blog.map((blog, index) => {
                    const delay = index * 0.05;
                    return (
                        <div key={blog.blogId} style={{ animationDelay: `${delay}s` }} className="fade-in">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-3">
                                    <img src={blog.blogImage} alt={blog.blogTitle} className="w-16 h-16 object-cover rounded-lg" />
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-black font-dmsans font-semibold">{blog.blogTitle}</h4>
                                        <p className="text-black font-dmsans font-normal text-opacity-75">{blog.blogDate}</p>
                                    </div>
                                </div>
                                <p className="text-black font-dmsans font-normal text-opacity-75">{blog.blogDescription}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectBlogs;