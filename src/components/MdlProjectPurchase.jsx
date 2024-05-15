import React from "react";
import Modal from "./Modal";

function MdlProjectPurchase({ onClose, tier }) {
    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-4">
                <h2 className="text-4xl font-dmsans font-bold text-black">Purchase????</h2>
                {tier && <p className="text-black font-normal font-dmsans opacity-70">You are about to purchase the {tier.tierName} tier ({tier.tierPrice}€).</p>}
            </div>
        </Modal>
    );
}

export default MdlProjectPurchase;