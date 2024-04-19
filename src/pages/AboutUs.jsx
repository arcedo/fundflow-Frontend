import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutUs() {
    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <div className="flex flex-col items-center justify-center gap-10 mt-30">
                <div className="relative w-full bg-black" style={{ height: `${window.innerWidth < 640 ? '30vh' : '60vh'}` }}>
                    <div className="absolute inset-0 flex flex-col justify-center items-center pt-24">
                        <h2 className='font-dmsans text-3xl sm:text-7xl font-bold text-white select-none'>We are <span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text py-2'>fundflow.</span></h2>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center w-6/12 gap-5">
                    <div className="relative w-full">
                        <div className="absolute -bottom-20 flex flex-col p-8 gap-4 bg-white rounded-lg shadow-xl border border-gray-200 border-opacity-60 bg-opacity-80 backdrop-blur-xl">
                            <h2 className="text-5xl font-dmsans font-bold text-black">A crowdfunding platform</h2>
                            <p className="text-black font-normal font-dmsans opacity-70">We are a group of developers who have come together to create a platform where people can share their ideas and get funded for them.</p>
                            <p className="text-black font-normal font-dmsans opacity-70">We believe that everyone should have the opportunity to make their dreams come true. We are committed to making this platform the best place for creators and funders to meet.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-24 px-8">
                        <h2 className="text-3xl font-dmsans font-bold text-black">Our Mission</h2>
                        <p className="text-black font-normal font-dmsans opacity-70">Our mission is to help people turn their ideas into reality. We want to make it easy for creators to find funding and for funders to find projects that they are passionate about. We believe that everyone has the potential to create something amazing, and we want to help them do it.</p>
                    </div>
                    <div className="flex flex-col gap-1 px-8">
                        <h2 className="text-3xl font-dmsans font-bold text-black">Our Team</h2>
                        <p className="text-black font-normal font-dmsans opacity-70">Our team is made up of developers, designers, and creatives who are passionate about helping others. We are dedicated to making this platform the best it can be, and we are always looking for ways to improve. If you have any suggestions or feedback, please let us know!</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;