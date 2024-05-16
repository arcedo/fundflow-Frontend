import React, { useState } from "react";
import Modal from "./Modal";

function MdlEditProject({ onClose, project, projectType }) {
    const today = new Date().toISOString().split('T')[0];

    const [editedProject, setEditedProject] = useState({
        title: project.title,
        description: project.description,
        priceGoal: projectType === "funds" ? project.priceGoal || "" : "",
        collGoal: projectType === "funds" ? "" : project.collGoal || "",
        currency: project.currency || "€",
        deadlineDate: project.deadlineDate || today,
    });

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ((name === 'title' && value.length > 30) || (name === 'description' && value.length > 250)) {
            return;
        }
        if ((name === 'priceGoal' || name === 'collGoal') && parseFloat(value) <= 0) {
            setError("Goal cannot be negative or 0.");
            return;
        }
        setError("");
        setEditedProject({
            ...editedProject,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (error) {
            return;
        }
        console.log("Edited project:", editedProject);
        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4" style={{ width: "50vh" }}>
                <h2 className="text-4xl font-dmsans font-bold text-black">Edit project</h2>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="w-fit text-lg font-dmsans font-semibold text-black">project name</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                            value={editedProject.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className={`text-right font-dmsans text-md ${editedProject.title.length > 30 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{editedProject.title.length}/30</p>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="w-fit text-lg font-dmsans font-semibold text-black">description</label>
                        <textarea
                            id="description"
                            rows={6}
                            name="description"
                            className="p-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200 resize-none"
                            value={editedProject.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className={`text-right font-dmsans text-md ${editedProject.description.length > 250 ? 'text-red-500' : 'text-black text-opacity-70'}`}>{editedProject.description.length}/250</p>
                    <div className="w-full grid grid-cols-2 gap-2">
                        {projectType === "funds" && (
                            <div className="flex gap-2">
                                <div className="w-9/12">
                                    <label htmlFor="priceGoal" className="w-fit text-lg font-dmsans font-semibold text-black">fund goal</label>
                                    <input
                                        type="number"
                                        id="priceGoal"
                                        name="priceGoal"
                                        className="p-2 mb-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                        value={editedProject.priceGoal}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="w-3/12">
                                    <select
                                        id="currency"
                                        name="currency"
                                        value={editedProject.currency}
                                        onChange={handleInputChange}
                                        className="p-2 mt-7 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 w-1/8 text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                    >
                                        {['€', '$', '£', '¥'].map(currency => (
                                            <option key={currency} value={currency}>{currency}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {projectType !== "funds" && (
                            <div>
                                <label htmlFor="collGoal" className="w-fit text-lg font-dmsans font-semibold text-black">collaborators goal</label>
                                <input
                                    type="number"
                                    id="collGoal"
                                    name="collGoal"
                                    className="p-2 mb-2 bg-white rounded-lg font-montserrat border border-gray-500 border-opacity-30 w-full text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                    value={editedProject.collGoal}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <label htmlFor="deadlineDate" className="w-fit text-lg font-dmsans font-semibold text-black">deadline</label>
                            <input
                                id="deadlineDate"
                                name="deadlineDate"
                                value={editedProject.deadlineDate}
                                onChange={handleInputChange}
                                className="p-2 bg-white rounded-lg font-dmsans border border-gray-500 border-opacity-30 text-black outline-none focus:border-opacity-80 transition-all duration-200"
                                type="date"
                                min={today}
                            />
                        </div>
                    </div>
                    {error && <p className="font-dmsans text-red-500">{error}</p>}
                </div>
                <button
                    className="h-12 bg-gradient-to-r from-primary to-secondary border-none hover:opacity-75 transition-all duration-200 rounded-lg text-white font-dmsans font-bold"
                    onClick={handleSubmit}
                >
                    Save changes
                </button>
            </div>
        </Modal>
    );
}

export default MdlEditProject;
