import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import MdlProcessPurchase from "./MdlProcessingPurchase";
import { Link } from "react-router-dom";
import { statsInteraction, getProjectStats } from "../services";

function MdlProjectPurchase({ onClose, tier, project, setProject, userStats, setUserStats }) {
    // TODO handle collaborator application
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [showProcessPurchaseModal, setShowProcessPurchaseModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [selectedTier, setSelectedTier] = useState(tier ? tier : null);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedTier) {
            setTotal(selectedTier.price);
        } else {
            setTotal(amount);
        }
    }, [selectedTier, amount]);

    const closeProcessPurchaseModal = () => {
        setShowProcessPurchaseModal(false);
        onClose();
    }

    const handleSubmit = () => {
        if (parseFloat(total) <= 0 || total === '') {
            setError('Please enter a valid contribution amount.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        setShowProcessPurchaseModal(true);
    }

    const handleTierChange = (event) => {
        const selectedTierIndex = event.target.value;
        const selectedTier = project.tiers[selectedTierIndex];
        setSelectedTier(selectedTier);
        if (selectedTier) {
            setAmount(0);
        }
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        setSelectedTier(null);
    }

    const handleCollaboratorApplication = async () => {
        await statsInteraction(localStorage.getItem('token'), project.id, null, null, null, true)
            .then(async (res) => {
                if (res.code === 200) {
                    await getProjectStats(project.id)
                        .then((stats) => {
                            setProject({ ...project, stats, percentageDone: (stats.collaborators / project.collGoal) * 100 });
                            setUserStats({ ...userStats, collaborator: true });
                            setTimeout(() => {
                                onClose();
                            }, 2000);
                        });
                }
            });
    }
    if (userData.userUrl === project.userUrl) {
        return (
            <Modal onClose={onClose}>
                <div className="flex flex-col gap-4" style={{ width: `${window.innerWidth < 1080 ? '30vh' : '35vh'}` }}>
                    <h2 className="text-4xl font-dmsans font-bold text-black">Contribute</h2>
                    <p className="text-black font-normal font-dmsans opacity-70">You cannot contribute to your own project.</p>
                </div>
            </Modal>
        );
    } else if (project.collGoal === null) {
        return (
            <Modal onClose={onClose}>
                <div className="flex flex-col gap-4" style={{ width: `${window.innerWidth < 1080 ? '30vh' : '70vh'}` }}>
                    {showProcessPurchaseModal && <MdlProcessPurchase onClose={closeProcessPurchaseModal} project={project} total={total} setProject={setProject} userStats={userStats} setUserStats={setUserStats} setTotal={setTotal} />}
                    <h2 className="text-4xl font-dmsans font-bold text-black">Contribute</h2>
                    <div>
                        <p className="text-black font-normal font-dmsans opacity-70">
                            Contributing to this project will send your contribution <span>directly</span> to the owner of the project.
                        </p>
                        {tier ? (
                            <p className="text-black font-normal mt-3 font-dmsans text-opacity-70">
                                You have selected the tier: <span className="font-bold text-black text-opacity-100">{tier.title} ({tier.price}{project.currency})</span>
                            </p>
                        ) : (
                            <p className="text-black font-normal font-dmsans opacity-70">You can contribute any amount you want, or choose a reward tier:</p>
                        )}
                    </div>
                    {!tier && (
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:justify-between lg:items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    className={`lg:w-64 font-dmsans rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200 ${error && 'border-red-600 text-red-600 animate-shake'}`}
                                    placeholder="0.00"
                                    onChange={handleAmountChange}
                                    disabled={selectedTier !== null}
                                />
                                <p className="text-black text-2xl font-md font-dmsans opacity-70">{project.currency}</p>
                            </div>
                            <p className="text-black font-bold font-dmsans opacity-70">or</p>
                            <select
                                className={`font-dmsans w-64 rounded-lg focus:outline-none bg-white px-2.5 py-2 border border-gray-500 border-opacity-30 outline-none focus:border-opacity-80 transition-all duration-200 ${error && 'border-red-600 text-red-600 animate-shake'}`}
                                onChange={handleTierChange}
                                disabled={amount > 0}
                            >
                                <option value={null}>Select a tier...</option>
                                {project.tiers && project.tiers.map((projectTier, index) => (
                                    <option key={index} value={index}>
                                        {projectTier.title} ({projectTier.price}{project.currency})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {error && <p className="text-red-600 font-dmsans font-semibold">{error}</p>}
                    {total >= 0 && (
                        <div className="flex flex-col gap-2 min-h-32 justify-end">
                            <h3 className="text-2xl font-dmsans font-bold text-black">Checkout</h3>
                            {selectedTier && (
                                <div className="flex justify-between">
                                    <p className="text-black font-normal font-dmsans opacity-70">Your contribution:</p>
                                    <p className="text-black font-bold font-dmsans">{selectedTier.title} ({selectedTier.price}{project.currency})</p>
                                </div>
                            )}
                            {amount > 0 && (
                                <div className="flex justify-between">
                                    <p className="text-black font-normal font-dmsans opacity-70">Your contribution:</p>
                                    <p className="text-black font-bold font-dmsans">{amount}{project.currency}</p>
                                </div>
                            )}
                            <hr className="border-black border-opacity-10" />
                            <p className="text-black font-normal text-right font-dmsans text-opacity-70">
                                Total: <span className="font-bold text-3xl text-black text-opacity-100">{(total)}{project.currency}</span>
                            </p>
                        </div>
                    )}
                    <button
                        onClick={handleSubmit}
                        className="p-3 font-dmsans bg-gradient-to-r from-primary to-secondary border-none rounded-lg text-white font-bold hover:opacity-75 transition-all duration-200"
                    >
                        Purchase
                    </button>
                </div>
            </Modal>
        );
    } else {
        return (
            <Modal onClose={onClose}>
                <div className="flex flex-col gap-4" style={{ width: `${window.innerWidth < 1080 ? '30vh' : '70vh'}` }}>
                    <h2 className="text-4xl font-dmsans font-bold text-black">Contribute</h2>
                    <p className="text-black font-normal font-dmsans text-opacity-70">
                        You are signing up to collaborate with <Link to={`/profile/${project && project.userUrl}`}>
                            <span className="text-black font-semibold underline text-opacity-100 hover:text-secondary transition-all duration-200">{project.userUrl}</span>
                        </Link> on this project ({project.title}).
                    </p>
                    <p className="text-black font-normal font-dmsans text-opacity-70">
                        By signing up, you agree to the terms and conditions of the project, if they have been specified. Otherwise, you agree to the general terms and conditions of the platform.
                    </p>
                    <p className="text-black font-normal font-dmsans text-opacity-70">
                        This declaration is final and cannot be canceled unless the owner of this project removes you from the collaborators list.
                        <span className="text-black font-semibold text-opacity-100"> Be sure you want to commit before applying. </span>
                    </p>
                    <button
                        onClick={handleCollaboratorApplication}
                        className="p-3 font-dmsans bg-gradient-to-r from-primary to-secondary border-none rounded-lg text-white font-bold hover:opacity-75 transition-all duration-200">Apply as collaborator</button>
                </div>
            </Modal>
        );
    }
}

export default MdlProjectPurchase;
