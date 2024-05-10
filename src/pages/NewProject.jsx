import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NewProject() {
    return (
        <div className="relative w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header categoriesDisabled={true}/>
            <div className="w-full min-h-screen flex flex-col justify-between items-center">
                <div className="mt-56 p-8 bg-gray-200 rounded-md">
                    <h1 className="text-4xl font-dmsans font-bold text-black">Create a new project</h1>
                    <p className="text-black font-normal font-dmsans opacity-70">Start a new project and share it with the community.</p>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default NewProject;