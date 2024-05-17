import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MdlEditProjectDetails from "./MdlEditProjectDetails";
import MdlEditCover from "./MdlEditCover";
import MdlProjectPurchase from "./MdlProjectPurchase";
import MdlLoginNeeded from "./MdlLoginNeeded";
import MdlVerifyUser from "./MdlVerifyUser";
import likeInteract from "../assets/icons/likeInteract.svg";
import dislike from "../assets/icons/like.svg";
import views from "../assets/icons/views.svg";
import { statsInteraction, getProjectStats } from "../services";
import image from "../assets/icons/image.svg";

function ProjectDetails({ project, editMode, setProject }) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const projectType = (project.priceGoal ? 'funds' : 'collab');

    let today = new Date();
    let deadline = new Date(project.deadlineDate);
    const timeDiff = deadline.getTime() - today.getTime();
    const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    const remainingHours = hoursDiff > 0 ? hoursDiff : 0;

    const [showEditProjectDetailsModal, setShowEditProjectDetailsModal] = useState(false);

    const openEditProjectDetailsModal = () => {
        setShowEditProjectDetailsModal(true);
    };

    const closeEditProjectDetailsModal = () => {
        setShowEditProjectDetailsModal(false);
    };

    const [showProjectPurchaseModal, setShowProjectPurchaseModal] = useState(false);

    const openProjectPurchaseModal = () => {
        if (!userData) {
            openLoginNeededModal();
        } else if (!userData.verifiedEmail) {
            openVerifyUserModal();
        } else {
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

    const [showEditCoverModal, setShowEditCoverModal] = useState(false);

    const openEditCoverModal = () => {
        setShowEditCoverModal(true);
    };

    const closeEditCoverModal = () => {
        setShowEditCoverModal(false);
    };

    const formattedCurrentFunding = project && project.currentFunding ? project.currentFunding.toLocaleString('de-DE') : 0;
    const formattedGoalFunding = project && project.priceGoal ? project.priceGoal.toLocaleString('de-DE') : 0;

    if (formattedCurrentFunding === 0) {
        project.fundedPercentage = 0;
    }

    const evaluateProject = async (evaluation) => {
        if (!userData) {
            openLoginNeededModal();
        } else if (!userData.verifiedEmail) {
            openVerifyUserModal();
        } else {
            await statsInteraction(localStorage.getItem('token'), project.id, evaluation);
            await getProjectStats(project.id)
                .then((response) => {
                    setProject({ ...project, stats: response });
                })
        }
    }
    // console.log(project);
    return (
        <div className="relative w-full" style={{ height: `${window.innerWidth < 640 ? '35vh' : '65vh'}` }}>
            {showEditProjectDetailsModal && <MdlEditProjectDetails onClose={closeEditProjectDetailsModal} projectType={projectType} project={project} />}
            {showEditCoverModal && <MdlEditCover onClose={closeEditCoverModal} project={project} />}
            {showProjectPurchaseModal && <MdlProjectPurchase onClose={closeProjectPurchaseModal} />}
            {showLoginNeededModal && <MdlLoginNeeded onClose={closeLoginNeededModal} />}
            {showVerifyUserModal && <MdlVerifyUser onClose={closeVerifyUserModal} />}
            <div className="w-full h-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}projects/${project.id}/cover)` }}>
                {editMode && (
                    <div onClick={openEditCoverModal} className="absolute bottom-0 right-0 m-8 z-20 bg-gradient-to-r from-primary to-secondary rounded-full group">
                        <div className="flex justify-center items-center p-3 bg-white shadow-xl border-none rounded-full group-hover:scale-90 transition-all duration-200">
                            <img className="h-8" src={image} alt="save button" />
                        </div>
                    </div>
                )}
                <div className="w-10/12 grid grid-cols-2 gap-20">
                    <div className="w-10/12 p-8 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-90 backdrop-blur-md flex flex-col gap-4 fade-in">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-dmsans font-bold text-5xl">{project && project.title}</h2>
                            <Link to={`/profile/${project && project.userUrl}`} className="font-dmsans text-black text-opacity-70 group">by <span className="group-hover:text-secondary font-semibold transition-colors duration-200">{project.userUrl}</span></Link>
                        </div>
                        <p className="font-dmsans">{project && project.description}</p>
                        <div className="flex flex-col gap-3">
                            <div className="bg-gray-300 h-3 rounded-full w-full">
                                <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: `${project.fundedPercentage}%` }}>
                                </div>
                            </div>
                            {projectType === 'funds' ? <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">{formattedCurrentFunding}{project.currency}</span> funded of a <span className="font-semibold">{formattedGoalFunding}{project.currency}</span> goal</p>
                                : <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">{project && project.currentProgress ? project.currentProgress : 0}</span> collaborators of a <span className="font-semibold">{project.collGoal}</span> goal</p>}
                            {projectType === 'funds' ? <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">{project && project.sponsors ? project.sponsors : '0'}</span> funders</p> : null}
                            <div className="flex items-center justify-between">
                                <p className="font-dmsans text-black text-opacity-70"><span className="font-montserrat font-bold text-4xl">{project && remainingHours ? remainingHours : '0'}</span> hours left</p>
                                <div className="flex gap-5">
                                    <p className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40" src={views} alt="" />{project && project.stats && project.stats.views ? project.stats.views : 0}</p>
                                    <button onClick={() => evaluateProject('likes')} className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 grayscale group-hover:grayscale-0" src={likeInteract} alt="likes" />{project && project.stats && project.stats.likes ? project.stats.likes : 0}</button>
                                    <button onClick={() => evaluateProject('dislikes')} className="h-8 text-black text-opacity-60 text-lg font-dmsans font-bold flex gap-2 items-center group"><img className="h-7 transition-all duration-300 opacity-40 group-hover:opacity-100 -rotate-180" src={dislike} alt="dislikes" />{project && project.stats && project.stats.dislikes ? project.stats.dislikes : 0}</button>
                                </div>
                            </div>
                        </div>
                        {editMode ? (
                            <button
                                onClick={openEditProjectDetailsModal}
                                className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none hover:opacity-75 transition-all duration-200 rounded-lg text-white font-dmsans font-bold"
                            >
                                Edit details
                            </button>
                        ) : (
                            remainingHours > 0 ? (
                                <button
                                    onClick={openProjectPurchaseModal}
                                    className="mt-2 h-12 bg-gradient-to-r from-primary to-secondary border-none hover:opacity-75 transition-all duration-200 rounded-lg text-white font-dmsans font-bold"
                                >
                                    Help this project
                                </button>
                            ) : (
                                <button className="mt-2 h-12 bg-gray-300 border-none rounded-lg text-black font-dmsans font-bold cursor-not-allowed">
                                    Project ended
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProjectDetails;