import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import purchaseCheck from "../assets/icons/purchaseCheck.svg";
import { statsInteraction, getProjectStats } from "../services";

function MdlProcessPurchase({ onClose, project, total, setProject, setTotal, userStats, setUserStats }) {
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        const purchase = async () => {
            try {
                const res = await statsInteraction(localStorage.getItem('token'), project.id, null, null, total, null);
                setTotal(0);
                if (res.code === 200) {
                    const stats = await getProjectStats(project.id);
                    setProject({ ...project, stats, percentageDone: (stats.funded / project.priceGoal) * 100 });
                    setUserStats({ ...userStats, funded: userStats.funded + Number(total) });
                    setProcessing(false);
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                }
            } catch (error) {
                console.error('Purchase failed', error);
                setProcessing(false);
            }
        };

        purchase();
    }, [onClose, project, total, setProject, setTotal, userStats, setUserStats]);

    const modalStyles = {
        width: window.innerWidth < 1080 ? '30vh' : '45vh',
        height: window.innerWidth < 1080 ? '30vh' : '25vh',
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4 justify-center items-center" style={modalStyles}>
                {processing ? (
                    <p className="text-black font-normal font-dmsans opacity-70">Processing your purchase, please wait...</p>
                ) : (
                    <>
                        <img className="w-28 opacity-75" src={purchaseCheck} alt="Purchase completed" />
                        <p className="font-dmsans bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text text-3xl font-bold transition-all duration-500">Purchase completed!</p>
                        <p className="text-black font-normal font-dmsans opacity-70">{project.userUrl} thanks you for your support.</p>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default MdlProcessPurchase;
