import React from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

function Home(){
    return (
        <div className="w-full bg-white min-h-screen">
            <Header />
            <Slider />
            <section className="flex justify-center align-center">
                <div className="w-11/12 py-16">
                    <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4">New this month</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex justify-center align-center">
                <div className="w-11/12 pb-16">
                    <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 mb-4">Based on your interests</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-52 w-full rounded-md">
                            
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home;