import React from "react";

function ProjectTiers({ project }) {
    return (
        <div className="w-full flex flex-col gap-5 fade-in">
            <h3 className="text-black font-dmsans font-semibold">Tiers</h3>
            <div className="flex gap-5">
                {project.tiers.map((tier, index) => {
                    const delay = index * 0.05;
                    return (
                        <div key={tier.tierId} style={{ animationDelay: `${delay}s` }} className="fade-in">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3">
                                        <img src={tier.tierImage} alt={tier.tierName} className="w-16 h-16 object-cover rounded-lg" />
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-black font-dmsans font-semibold">{tier.tierName}</h4>
                                            <p className="text-black font-dmsans font-normal text-opacity-75">${tier.tierPrice}</p>
                                        </div>
                                    </div>
                                    <button className="text-black font-dmsans font-semibold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Select</button>
                                </div>
                                <p className="text-black font-dmsans font-normal text-opacity-75">{tier.tierDescription}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectTiers;
