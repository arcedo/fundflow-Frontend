import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Help() {
    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 mt-40">
                <div className="flex flex-col gap-4 w-10/12">
                    <h1 className="text-4xl font-dmsans font-bold text-black">Help</h1>
                    <p className="text-black font-normal font-dmsans opacity-70">If you have any questions or need help with anything, please don't hesitate to contact us. We are here to help you in any way we can. You can reach us by email, phone, or chat. Our team is available 24/7 to assist you with any issues you may have. We are committed to providing you with the best possible experience on our platform, and we will do everything we can to make sure you are satisfied with our service.</p>
                </div>
            </div>
        </div>
    );
}

export default Help;