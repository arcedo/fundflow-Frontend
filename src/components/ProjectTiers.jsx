import React, { useState } from "react";
import MdlProjectPurchase from "./MdlProjectPurchase";
import MdlLoginNeeded from "./MdlLoginNeeded";
import MdlVerifyUser from "./MdlVerifyUser";
import plusDark from "../assets/icons/plusDark.svg";
import MdlCreateTier from "./MdlCreateProjectTier";
import cross from '../assets/icons/cross.svg'
import { deleteProjectTier } from "../services";

function ProjectTiers({ project, editMode, setProject }) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [showProjectPurchaseModal, setShowProjectPurchaseModal] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null);
    const [showCreateTierModal, setShowCreateTierModal] = useState(false);

    const openProjectPurchaseModal = (tier, project) => {
        if (!userData) {
            openLoginNeededModal();
        } else if (!userData.verifiedEmail) {
            openVerifyUserModal();
        } else {
            setSelectedTier(tier, project);
            setShowProjectPurchaseModal(true);
        }
    };

    const closeProjectPurchaseModal = () => {
        setShowProjectPurchaseModal(false);
    };

    const [showLoginNeededModal, setShowLoginNeededModal] = useState(false);

    const openLoginNeededModal = () => {
        setShowLoginNeededModal(true);
    };

    const closeLoginNeededModal = () => {
        setShowLoginNeededModal(false);
    };

    const [showVerifyUserModal, setShowVerifyUserModal] = useState(false);

    const openVerifyUserModal = () => {
        setShowVerifyUserModal(true);
    };

    const closeVerifyUserModal = () => {
        setShowVerifyUserModal(false);
    };

    const handleDeleteTier = async (tierId) => {
        await deleteProjectTier(localStorage.getItem('token'), project.id, tierId)
            .then((res) => {
                if (res.code === 200) {
                    setProject({ ...project, tiers: project.tiers.filter(tier => tier._id !== tierId) });
                }
            })
    }

    const hasMoreTiers = project.tiers && project.tiers.length > 4;
    return (
        <div className="w-full flex flex-col items-center justify-between gap-5 py-5 min-h-56 fade-in">
            {showProjectPurchaseModal && <MdlProjectPurchase onClose={closeProjectPurchaseModal} tier={selectedTier} project={project} setProject={setProject} />}
            {showLoginNeededModal && <MdlLoginNeeded onClose={closeLoginNeededModal} />}
            {showVerifyUserModal && <MdlVerifyUser onClose={closeVerifyUserModal} />}
            {showCreateTierModal && <MdlCreateTier onClose={() => setShowCreateTierModal(false)} project={project} setProject={setProject} />}
            <h3 className="text-black font-dmsans font-bold py-2 self-start text-2xl text-opacity-70">{editMode ? 'add tiers to your project' : 'pitch your grain of sand in...'}</h3>
            {!editMode && project.tiers && project.tiers.length === 0 && <p className="text-black font-dmsans font-bold text-lg text-opacity-70">no tiers available</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 sm:gap-8 lg:gap-5 w-full justify-center items-center">
                {project.tiers && project.tiers.slice(0, editMode ? 3 : 4).map((tier, index) => {
                    const delay = index * 0.05;
                    return (
                        <div key={tier && tier._id} style={{ animationDelay: `${delay}s`, width: '325px', height: '100%' }} className="fade-in">
                            <div className="flex flex-col gap-2 rounded-lg shadow-md" style={{ height: '500px' }}>
                                <div className="flex flex-col justify-between items-center relative">
                                    {editMode && (<div className="absolute top-2.5 right-2.5 flex justify-center items-center gap-5">
                                        <button onClick={() => handleDeleteTier(tier && tier._id)} className="bg-red-600 rounded-full group">
                                            <div className="flex justify-center items-center p-2.5 bg-white shadow-xl border-none rounded-full group-hover:scale-90 transition-all duration-200">
                                                <img className="h-6 grayscale group-hover:grayscale-0 transition-all duration-200" src={cross} alt="edit button" />
                                            </div>
                                        </button>
                                    </div>)}
                                    {/* Tier image */}
                                    <div className="rounded-t-lg" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}projects/${project.id}/tiers/${tier && tier._id}/image)`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '20vh' }}></div>
                                    {/* Tier content */}
                                    <div className="flex flex-col gap-3 w-full p-5">
                                        <div className="flex flex-col gap-1 justify-start">
                                            <h4 className="text-black font-dmsans font-semibold text-opacity-70">{tier && tier.title}</h4>
                                            <p className="text-black font-dmsans font-bold text-3xl">{tier && tier.price}{project.currency}</p>
                                        </div>
                                        <button onClick={() => openProjectPurchaseModal(tier, project)} className="py-2 text-white font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary opacity-80 rounded-lg hover:opacity-100 transition-all duration-200">Select</button> {/* Pass tier object when button is clicked */}
                                        <p className="text-black font-dmsans font-normal text-opacity-75">{tier && tier.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {editMode && (
                    <button onClick={() => setShowCreateTierModal(true)} className="fade-in group border-black hover:shadow-xl border-opacity-50 transition-all focus:outline-none duration-300 border-2 border-dashed rounded-lg flex flex-col justify-center items-center" style={{ height: '500px', width: '325px' }}>
                        <img className="w-14" src={plusDark} alt="" />
                        <p className="font-dmsans font-semibold group-hover:text-secondary transition-all duration-200">add tier</p>
                    </button>
                )}
            </div>
            {
                hasMoreTiers && (
                    <button className="py-2 px-5 font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary border-2 border-transparent hover:border-opacity-30 bg-clip-text text-transparent rounded-lg hover:border-secondary transition-all duration-200">
                        More options
                    </button>
                )
            }
        </div >
    );
}

export default ProjectTiers;
