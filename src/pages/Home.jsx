import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GridProjectSection from "../components/GridProjectSection";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import CategorySlider from "../components/CategorySlider";
import RandomSection from "../components/RandomSection";
import { getLatestsProjects, getRandomProjects, getProjectsByInterest } from "../services/index";

function Home() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [latestsProjects, setLatestsProjects] = useState([]);
    const [byInterestProjects, setByInterestProjects] = useState([]);
    const [popularProjects, setPopularProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const latestProjectsData = await getLatestsProjects(0, 4);
            let byInterestProjectsData = [];
            if (userData) {
                byInterestProjectsData = await getProjectsByInterest(localStorage.getItem('token'), 0, 4);
            }
            if (byInterestProjectsData.length === 0) {
                byInterestProjectsData = await getRandomProjects(0, 4);
            }
            const popularProjectsData = await getRandomProjects(0, 4);

            setLatestsProjects(latestProjectsData);
            setByInterestProjects(byInterestProjectsData);
            setPopularProjects(popularProjectsData);
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <Slider />
            <div className="w-10/12 sm:w-11/12 mx-auto flex flex-col gap-16">
                <GridProjectSection search={4} sectionTitle={"New this month"} projectsFound={latestsProjects} seeMore={true} />
                <GridProjectSection search={4} sectionTitle={userData ? "Based on your interests" : "Discover"} projectsFound={byInterestProjects} seeMore={true} />
                <CategorySlider />
                <GridProjectSection search={4} sectionTitle={"Popular"} projectsFound={popularProjects} seeMore={true} />
                <RandomSection />
            </div>
            <Footer />
        </div>
    )
}

export default Home;