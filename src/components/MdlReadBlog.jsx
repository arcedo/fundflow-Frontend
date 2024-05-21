import React, { useState } from "react";
import Modal from "./Modal";

function MdlReadBlog({ onClose, blog, date, readingTime, project }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col" style={{ width: `${window.innerWidth < 1080 ? '30vh' : '70vh'}` }}>
                <p className="text-black font-dmsans font-normal text-opacity-70">{date}</p>
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-end">
                    <h3 className="text-black font-dmsans font-bold text-4xl">{blog.title}</h3>
                    <p className="text-black font-dmsans font-normal text-opacity-70 pb-0.5">/ {`${readingTime.minutes ? readingTime.minutes + ' minutes' : readingTime.seconds + ' seconds'}`} read</p>
                </div>
            <div className="rounded-lg shadow-xl my-5" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}projects/${project.id}/blogs/${blog._id}/image)`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '25vh' }}></div>
            <div className="flex flex-col mt-3 overflow-y-auto" style={{ maxHeight: '30vh' }}>
                <p className="text-black font-dmsans font-normal text-opacity-70">{blog.content}</p>
            </div>
            </div>
        </Modal>
    );
}

export default MdlReadBlog;