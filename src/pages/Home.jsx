import React from "react";
import { Link } from "react-router-dom";
import GridProjectSection from "../components/GridProjectSection";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import CategorySlider from "../components/CategorySlider";
import RandomSection from "../components/RandomSection";
import image1 from "../assets/pictures/main1.webp";
import image2 from "../assets/pictures/main2.webp";
import image3 from "../assets/pictures/main3.webp";
import image4 from "../assets/pictures/venom.jpg";

const belongingUser = "User1";

const projects1 = [
    {
        projectId: 1,
        projectName: "Project One",
        projectUrl: "project_one",
        projectCreator: "User1",
        creatorUrl: "user1",
        projectCategory: "art",
        projectImage: 'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 200,
        fundedPercentage: 30
    },
    {
        projectId: 2,
        projectName: "Project Two",
        projectUrl: "project_two",
        projectCreator: "User2",
        creatorUrl: "user2",
        projectCategory: "games",
        projectImage: image2,
        likes: 42,
        fundedPercentage: 65
    },
    {
        projectId: 3,
        projectName: "Project Three",
        projectUrl: "project_three",
        projectCreator: "User3",
        creatorUrl: "user3",
        projectCategory: "dev",
        projectImage: image3,
        likes: 1976,
        fundedPercentage: 43
    },
    {
        projectId: 4,
        projectName: "Project Four",
        projectUrl: "project_four",
        projectCreator: "User1",
        creatorUrl: "user1",
        projectCategory: "books",
        projectImage: image4,
        likes: 1,
        fundedPercentage: 0
    }
];

const projects2 = [
    {
        projectId: 5,
        projectName: "Project Five",
        projectUrl: "project_five",
        projectCreator: "User5",
        creatorUrl: "user5",
        projectCategory: "innove",
        projectImage: image3,
        likes: 200,
        fundedPercentage: 30
    },
    {
        projectId: 6,
        projectName: "Project Six",
        projectUrl: "project_six",
        projectCreator: "User6",
        creatorUrl: "user6",
        projectCategory: "art",
        projectImage: image4,
        likes: 42,
        fundedPercentage: 65
    },
    {
        projectId: 7,
        projectName: "Project Seven",
        projectUrl: "project_seven",
        projectCreator: "User7",
        creatorUrl: "user7",
        projectCategory: "music",
        projectImage: image2,
        likes: 1976,
        fundedPercentage: 43
    },
    {
        projectId: 8,
        projectName: "Project Eight",
        projectUrl: "project_eight",
        projectCreator: "User8",
        creatorUrl: "user8",
        projectCategory: "dev",
        projectImage: image1,
        likes: 1,
        fundedPercentage: 0
    }
];

function Home() {
    return (
        <div className=" w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <Slider />
            <div className="w-10/12 sm:w-11/12 mx-auto flex flex-col gap-16">
                <GridProjectSection sectionTitle={"New this month"} projectsFound={projects1} seeMore={true} belongingUser={belongingUser}/>
                <GridProjectSection sectionTitle={"Based on your interests"} projectsFound={projects2} seeMore={true} belongingUser={belongingUser}/>
                <CategorySlider />
                <GridProjectSection sectionTitle={"Popular"} projectsFound={projects1} seeMore={true} belongingUser={belongingUser}/>
                <RandomSection />
            </div>
            <Footer />
        </div>
    )
}

export default Home;