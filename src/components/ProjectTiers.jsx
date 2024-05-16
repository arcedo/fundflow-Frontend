import React, { useState } from "react";
import MdlProjectPurchase from "./MdlProjectPurchase";

function ProjectTiers({ project }) {
    const [showProjectPurchaseModal, setShowProjectPurchaseModal] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null); // State to store the selected tier

    const openProjectPurchaseModal = (tier) => { // Accept tier object as parameter
        setSelectedTier(tier); // Set the selected tier
        setShowProjectPurchaseModal(true);
    };

    const closeProjectPurchaseModal = () => {
        setShowProjectPurchaseModal(false);
    };

    const hasMoreTiers = project.tiers.length > 3;

    return (
        <div className="w-full flex flex-col items-center justify-between gap-5 fade-in">
            {showProjectPurchaseModal && <MdlProjectPurchase onClose={closeProjectPurchaseModal} tier={selectedTier} />} {/* Pass selected tier to modal */}
            <h3 className="text-black font-dmsans font-bold py-2 self-start text-2xl text-opacity-70">Pitch your grain of sand in...</h3>
            <div className="flex gap-5 w-full justify-center items-center">
                {project.tiers.slice(0, 3).map((tier, index) => {
                    const delay = index * 0.05;
                    return (
                        <div key={tier.tierId} style={{ animationDelay: `${delay}s`, width: '350px', height: '100%' }} className="fade-in">
                            <div className="flex flex-col gap-2 rounded-lg shadow-md" style={{ height: '500px' }}>
                                <div className="flex flex-col justify-between items-center">
                                    {/* Tier image */}
                                    <div className="rounded-t-lg" style={{ backgroundImage: `url(${tier.tierImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '20vh' }}></div>
                                    {/* Tier content */}
                                    <div className="flex flex-col gap-3 w-full p-5">
                                        <div className="flex flex-col gap-1 justify-start">
                                            <h4 className="text-black font-dmsans font-semibold text-opacity-70">{tier.tierName}</h4>
                                            <p className="text-black font-dmsans font-bold text-3xl">{tier.tierPrice}€</p>
                                        </div>
                                        <button onClick={() => openProjectPurchaseModal(tier)} className="py-2 text-white font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary opacity-80 rounded-lg hover:opacity-100 transition-all duration-200">Select</button> {/* Pass tier object when button is clicked */}
                                        <p className="text-black font-dmsans font-normal text-opacity-75">{tier.tierDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {hasMoreTiers && (
                <button className="py-2 px-5 font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary border-2 border-transparent hover:border-opacity-30 bg-clip-text text-transparent rounded-lg hover:border-secondary transition-all duration-200">
                    More options
                </button>
            )}
        </div>
    );
}

export default ProjectTiers;
