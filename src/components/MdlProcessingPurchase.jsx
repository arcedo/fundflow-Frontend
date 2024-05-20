import React, { useState, useEffect } from "react";
import Modal from "./Modal";

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
            <div className="flex flex-col gap-4 justify-center items-center" style={{ width: '40vh', height: "20vh" }}>
                {processing ? (
                    <>
                        <h2 className="text-4xl font-dmsans font-bold text-black">{total}</h2>
                        <p className="text-black font-normal font-dmsans opacity-70">Processing your purchase, please wait...</p>
                    </>
                ) : (
                    <>
                        <p className="text-black font-normal font-dmsans opacity-70">Purchase completed!</p>
                        <p className="text-black font-normal font-dmsans opacity-70">{project.userUrl} thanks you for your support.</p>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default MdlProcessPurchase;

