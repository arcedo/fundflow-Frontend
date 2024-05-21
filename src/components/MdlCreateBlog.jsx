import React, { useState } from "react";
import Modal from "./Modal";
import plusDark from "../assets/icons/plusDark.svg";
import { resizeImage } from "../helpers/resize";
import { createProjectBlog } from "../services";
function MdlCreateBlog({ onClose, setProject, project }) {
    const [newBlog, setNewBlog] = useState({ title: '', content: '', image: null, previewImage: null });
    const [errorStyles, setErrorStyles] = useState({ title: '', content: '', previewImage: '' });

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
        let errors = {};

        if (!newBlog.title) errors.title = 'border-red-600 text-red-600 animate-shake';
        if (!newBlog.content) errors.content = 'border-red-600 text-red-600 animate-shake';
        if (!newBlog.image) errors.previewImage = 'border-red-600 text-red-600 animate-shake';

        setErrorStyles(errors);

        if (Object.keys(errors).length > 0) {
            setTimeout(() => {
                setErrorStyles({ title: '', content: '', previewImage: '' });
            }, 1200);
            return;
        }
        if (newBlog.title && newBlog.content) {
            await createProjectBlog(localStorage.getItem('token'), project.id, newBlog)
                .then((res) => {
                    if (res.code === 201) {
                        setProject({ ...project, blogs: [...project.blogs, res.result] });
                        onClose();
                    }
                });
        }
    }

    return (
        <Modal onClose={onClose}>
            <h2 className="text-4xl font-dmsans font-bold text-black">Create a blog post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-dmsans font-semibold mt-6 text-black" style={{ width: `${window.innerWidth < 1080 ? '30vh' : '80vh'}` }}>
                <div className="flex flex-col">
                    <label htmlFor="blogTitle">title</label>
                    <input value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className={`${errorStyles.title} rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200`} type="text" id="blogTitle" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="blogContent">content</label>
                    <textarea id="blogContent" value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} className={`${errorStyles.content} rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200 resize-none`} rows={6} />
                </div>
                <div>
                    <p>featured image</p>
                    <div className={`${errorStyles.previewImage} flex flex-col items-center justify-center border-555 border-dashed border-2 rounded-lg lg:w-6/12 h-40`}>
                        <label htmlFor="imageBlog" className="flex cursor-pointer hover:text-primary transition-colors duration-200 max-h-60 overflow-hidden flex-col items-center justify-center py-5 w-full h-full">
                            {newBlog.previewImage ?
                                <img src={newBlog.previewImage} alt="blog" className="w-full object-cover" /> :
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <img src={plusDark} alt="add image blog" />
                                    <p>add image</p>
                                </div>
                            }
                        </label>
                        <input type="file" id="imageBlog" className="hidden" onChange={handleImageUpload} />
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