import React from "react";
import { Link } from "react-router-dom";
import GridProjectSection from "../components/GridProjectSection";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import CategorySlider from "../components/CategorySlider";
import RandomSection from "../components/RandomSection";

const server = import.meta.env.VITE_API_URL;

async function getLatestsProjects(skip, limit) {
    return await (await fetch(`${server}projects?startIndex=${skip}&limit=${limit}`, {
        method: 'GET',
        mode: 'cors'
    })).json();
}

// async function getProjectsByCategory(idCategory, skip, limit) {
//     return await (await fetch(`${server}projects/byCategory/${idCategory}?startIndex=${skip}&limit=${limit}`, {
//         method: 'GET',
//         mode: 'cors'
//     })).json();
// }

async function getRandomProjects(skip, limit) {
    return await (await fetch(`${server}projects/random?startIndex=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
    })).json();
}

const latestsProjects = await getLatestsProjects(0, 4);
const byInterestProjects = await getRandomProjects(0, 4);
const popularProjects = await getRandomProjects(0, 4);
console.log(byInterestProjects);
function Home() {
    return (
        <div className=" w-full bg-white min-h-screen overflow-hidden h-fit flex flex-col gap-16">
            <Header />
            <Slider />
            <div className="w-10/12 sm:w-11/12 mx-auto flex flex-col gap-16">
                <GridProjectSection sectionTitle={"New this month"} projectsFound={latestsProjects} seeMore={true} />
                <GridProjectSection sectionTitle={"Based on your interests"} projectsFound={byInterestProjects} seeMore={true} />
                <CategorySlider />
                <GridProjectSection sectionTitle={"Popular"} projectsFound={popularProjects} seeMore={true} />
                <RandomSection />
            </div>
            <Footer />
        </div>
    )
}

export default Home;