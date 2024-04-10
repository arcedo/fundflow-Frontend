import React from "react";
import ProjectSection from "../components/ProjectSection";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import image1 from "../assets/pictures/main1.webp";
import image2 from "../assets/pictures/main2.webp";
import image3 from "../assets/pictures/main3.webp";
import image4 from "../assets/pictures/venom.jpg";

const projects1 = [
    {
        projectName: "Project One",
        projectCreator: "User1",
        projectCategory: "art",
        projectImage: 'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 200,
        fundedPercentage: 30
    },
    {
        projectName: "Project Two",
        projectCreator: "User2",
        projectCategory: "games",
        projectImage: image2,
        likes: 42,
        fundedPercentage: 65
    },
    {
        projectName: "Project Three",
        projectCreator: "User3",
        projectCategory: "dev",
        projectImage: image3,
        likes: 1976,
        fundedPercentage: 43
    },
    {
        projectName: "Project Four",
        projectCreator: "User4",
        projectCategory: "books",
        projectImage: image4,
        likes: 1,
        fundedPercentage: 0
    }
];

const projects2 = [
    {
        projectName: "Project Five",
        projectCreator: "User5",
        projectCategory: "innove",
        projectImage: image3,
        likes: 200,
        fundedPercentage: 30
    },
    {
        projectName: "Project Six",
        projectCreator: "User6",
        projectCategory: "art",
        projectImage: image4,
        likes: 42,
        fundedPercentage: 65
    },
    {
        projectName: "Project Seven",
        projectCreator: "User7",
        projectCategory: "music",
        projectImage: image2,
        likes: 1976,
        fundedPercentage: 43
    },
    {
        projectName: "Project Eight",
        projectCreator: "User8",
        projectCategory: "dev",
        projectImage: image1,
        likes: 1,
        fundedPercentage: 0
    }
];

function Home(){
    return (
        <div className="w-full bg-white min-h-screen">
            <Header />
            <Slider />
            <ProjectSection sectionTitle={"New this month"} projectsFound={projects1}/>
            <ProjectSection sectionTitle={"Based on your interests"} projectsFound={projects2}/>
            <section className="flex justify-center items-center">
                <div className="w-11/12 py-16">
                    
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home;