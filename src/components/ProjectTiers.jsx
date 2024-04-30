import React from "react";

function ProjectTiers({ project }) {
    // Determine if there are more than three tiers
    const hasMoreTiers = project.tiers.length > 3;

    return (
        <div className="w-full flex flex-col items-center justify-between gap-5 fade-in">
            <h3 className="text-black font-dmsans font-semibold">Tiers</h3>
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
                                            <h4 className="text-black font-dmsans font-semibold">{tier.tierName}</h4>
                                            <p className="text-black font-dmsans font-bold text-3xl">{tier.tierPrice}€</p>
                                        </div>
                                        <button className="py-2 text-white font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary opacity-80 rounded-lg hover:opacity-100 transition-all duration-200">Select</button>
                                        <p className="text-black font-dmsans font-normal text-opacity-75">{tier.tierDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Conditionally render the "More Options" button */}
            {hasMoreTiers && (
                <button className="py-2 px-5 text-white font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary rounded-lg hover:bg-opacity-90 transition-opacity duration-200">
                    More Options
                </button>
            )}
        </div>
    );
}

export default ProjectTiers;
