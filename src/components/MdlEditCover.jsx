import React, { useState } from "react";
import Modal from "./Modal";
import { putProjectCover } from "../services";
import { resizeImage } from "../helpers/resize";

function MdlEditCover({ onClose, project }) {
    const [coverPicture, setCoverPicture] = useState({ file: null, cover: `${import.meta.env.VITE_API_URL}projects/${project.id}/cover` });

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const resizedImage = await resizeImage(file, 1900, 750, 90);
        reader.onloadend = () => {
            setCoverPicture({
                cover: reader.result,
                file: resizedImage,
            });
        };
        reader.readAsDataURL(resizedImage);
    };

    const handleSubmit = async () => {
        await putProjectCover(localStorage.getItem('token'), project.id, coverPicture.file)
            .then((res) => {
                if (res.code === 200) {
                    onClose();
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    console.error("Error updating cover.");
                }
            })
            .catch((err) => console.error("Error updating cover:", err));
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <h2 className="text-4xl font-dmsans font-bold text-black">Change cover</h2>
                    <div>
                        <div
                            className="bg-cover bg-center rounded-lg flex justify-center items-center hover:brightness-110 transition-all duration-200 cursor-pointer"
                            style={{ backgroundImage: `url(${coverPicture.cover})`, width: '70vh', height: '32vh' }}
                            onClick={() => document.getElementById('coverInput').click()}
                        >
                            <input
                                type="file"
                                id="coverInput"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileInputChange}
                            />
                        </div>
                        <p className="font-dmsans text-md text-black text-opacity-70 text-right">1920x700 recommended</p>
                    </div>
                    <button
                        className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-semibold font-dmsans rounded-lg hover:opacity-75 transition-all duration-200"
                        onClick={() => handleSubmit()}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default MdlEditCover;
