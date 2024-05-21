import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import purchaseCheck from "../assets/icons/purchaseCheck.svg";

function MdlProcessPurchase({ onClose, project, total }) {
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        console.log(total);
        const timer = setTimeout(() => {
            setProcessing(false);
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 2000);
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4 justify-center items-center" style={{ width: '45vh', height: "25vh" }}>
                {processing ? (
                    <>
                        <p className="text-black font-normal font-dmsans opacity-70">Processing your purchase, please wait...</p>
                    </>
                ) : (
                    <>
                        <img className="w-28 opacity-75" src={purchaseCheck} alt="" />
                        <p className="font-dmsans bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text text-3xl font-bold transition-all duration-500">Purchase completed!</p>
                        <p className="text-black font-normal font-dmsans opacity-70">{project.userUrl} thanks you for your support.</p>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default MdlProcessPurchase;

