import React, { useState } from "react";
import Modal from "./Modal";
import plusDark from "../assets/icons/plusDark.svg";
import { createProjectTier } from "../services";
import { resizeImage } from "../helpers/resize";
function MdlCreateTier({ onClose, project, setProject }) {
    const [newTier, setNewTier] = useState({ title: '', description: '', price: 0, image: '', previewImage: '' });
    const handleCreateTier = async (e) => {
        e.preventDefault();
        if (newTier.title && newTier.description && newTier.price) {
            await createProjectTier(localStorage.getItem('token'), project.id, newTier)
                .then((res) => {
                    if (res.code === 201) {
                        setProject({ ...project, tiers: [...project.tiers || [], res.result] });
                        onClose();
                    }
                })
        }
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const resizedImage = await resizeImage(file, 700, 700, 100);
        reader.onloadend = () => {
            setNewTier({ ...newTier, image: resizedImage, previewImage: reader.result });
        };
        reader.readAsDataURL(resizedImage);
    }
    return (
        <Modal onClose={onClose}>
            <form onSubmit={handleCreateTier} className="flex flex-col gap-3 font-dmsans font-semibold mt-6 text-black" style={{ width: "50vh" }}>
                <div className="flex flex-col items-center justify-center border-555 border-dashed border-2 rounded-lg">
                    <label htmlFor="imageTier" className="flex cursor-pointer hover:text-primary transition-colors duration-200 max-h-32 object-cover overflow-hidden flex-col items-center justify-center py-5 w-full h-full">
                        {newTier.previewImage ?
                            <img src={newTier.previewImage} alt="tier" className="w-full h-full" /> :
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <img src={plusDark} alt="add image tier" />
                                <p>add image</p>
                            </div>
                        }
                    </label>
                    <input type="file" id="imageTier" className="hidden" onChange={handleImageUpload} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tierName">title</label>
                    <input value={newTier.title} onChange={(e) => setNewTier({ ...newTier, title: e.target.value })} className="rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200" type="text" id="tierName" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tierDescription">description</label>
                    <textarea id="tierDescription" value={newTier.description} onChange={(e) => setNewTier({ ...newTier, description: e.target.value })} className="rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200 resize-none" rows={6} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tierPrice">contribution</label>
                    <input value={newTier.price} onChange={(e) => setNewTier({ ...newTier, price: e.target.value })} className="rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200" type="number" id="tierPrice" />
                </div>
                <button type="submit" className="w-full h-14 bg-gradient-to-r from-primary to-secondary rounded-lg text-white hover:opacity-75 transition-all duration-300">
                    Create tier
                </button>
            </form>
        </Modal>
    );
}

export default MdlCreateTier;