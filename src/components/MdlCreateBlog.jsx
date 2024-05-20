import React, { useState } from "react";
import Modal from "./Modal";
import plusDark from "../assets/icons/plusDark.svg";
import { resizeImage } from "../helpers/resize";
import { createProjectBlog } from "../services";
function MdlCreateBlog({ onClose, setProject, project }) {
    const [newBlog, setNewBlog] = useState({ title: '', content: '', image: null, previewImage: null });
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const resizedImage = await resizeImage(file, 700, 700, 100);
        reader.onloadend = () => {
            setNewBlog({ ...newBlog, image: resizedImage, previewImage: reader.result });
        };
        reader.readAsDataURL(resizedImage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newBlog.title && newBlog.content) {
            await createProjectBlog(localStorage.getItem('token'), project.id, newBlog)
                .then((res) => {
                    console.log(res);
                    if (res.code === 201) {
                        setProject({ ...project, blogs: [...project.blogs, res.result] });
                        onClose();
                    }
                });
        }
    }

    console.log(project);

    return (
        <Modal onClose={onClose}>
            <h2 className="text-4xl font-dmsans font-bold text-black">Create a blog post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-dmsans font-semibold mt-6 text-black" style={{ width: "80vh" }}>
                <div className="flex flex-col">
                    <label htmlFor="tierName">title</label>
                    <input value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className="rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200" type="text" id="tierName" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tierDescription">content</label>
                    <textarea id="tierDescription" value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} className="rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200 resize-none" rows={6} />
                </div>
                <div>
                    <p>featured image</p>
                    <div className="flex flex-col items-center justify-center border-555 border-dashed border-2 rounded-lg w-2/3">
                        <label htmlFor="imageTier" className="flex cursor-pointer hover:text-primary transition-colors duration-200 max-h-60 object-cover overflow-hidden flex-col items-center justify-center py-5 w-full h-full">
                            {newBlog.previewImage ?
                                <img src={newBlog.previewImage} alt="tier" className="w-full h-full" /> :
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <img src={plusDark} alt="add image tier" />
                                    <p>add image</p>
                                </div>
                            }
                        </label>
                        <input type="file" id="imageTier" className="hidden" onChange={handleImageUpload} />
                    </div>
                </div>
                <button type="submit" className="w-full h-14 bg-gradient-to-r from-primary to-secondary rounded-lg text-white hover:opacity-75 transition-all duration-300">
                    Create blog
                </button>
            </form>
        </Modal>
    );
}

export default MdlCreateBlog;