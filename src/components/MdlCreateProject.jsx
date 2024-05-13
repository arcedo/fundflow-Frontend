import React from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import funds from "../assets/icons/funds.svg";
import collaborators from "../assets/icons/collaborators.svg";

function MdlCreateProject({ onClose }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-4xl font-dmsans font-bold text-black">Create a new project</h2>
                    <p className="text-black font-normal font-dmsans opacity-70">Start a new project and share it with the community.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-dmsans font-bold text-black">What is the target?</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link onClick={onClose} to="/new/funds" className="flex flex-col gap-3 justify-center items-center py-7 px-10 border-2 border-primary border-opacity-50 rounded-lg hover:scale-105 transition-all duration-200">
                            <div className="bg-white shadow-xl bg-opacity-40 backdrop-blur-xl p-4 rounded-full">
                                <img className="w-16 rotate-90" src={funds} alt="" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-black font-bold font-dmsans text-2xl">Funding</h3>
                                <p className="text-black opacity-70 font-normal font-dmsans">Get financial support for your project.</p>
                            </div>
                        </Link>
                        <Link onClick={onClose} to="/new/collaborators" className="flex flex-col gap-3 justify-center items-center py-7 px-10 border-2 border-secondary border-opacity-50 rounded-lg hover:scale-105 transition-all duration-200">
                            <div className="bg-white shadow-xl bg-opacity-40 backdrop-blur-xl p-4 rounded-full">
                                <img className="w-16" src={collaborators} alt="" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-black font-bold font-dmsans text-2xl">Collaborators</h3>
                                <p className="text-black opacity-70 font-normal font-dmsans">Find people to work on your project.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default MdlCreateProject;
