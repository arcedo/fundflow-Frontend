import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Error404() {
    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-10">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 mt-28" style={{ height: `${window.innerWidth < 640 ? '35vh' : '60vh'}` }}>
                {/* <h1 className="font-dmsans font-bold text-7xl text-black">://404</h1> */}
                <h1 className="font-dmsans font-bold text-7xl text-black bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">://404</h1>
                <h2 className="font-dmsans font-bold text-3xl text-black">Page not found</h2>
                <p className="font-dmsans text-black text-opacity-70">The page you are looking for does not exist or has been moved.</p>
            </div>
            <Footer />
        </div>
    );
    }

export default Error404;