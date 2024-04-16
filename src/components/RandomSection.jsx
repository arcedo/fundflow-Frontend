import React, { useState } from "react";
import RandomProject from "./RandomProject";

function RandomSection() {
    const projects = [
        {
            projectName: "Project One",
            projectCreator: "User One",
            projectCategory: "art",
            projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            projectImage: [
                'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 200,
            views: 150,
            fundedPercentage: 30
        },
        {
            projectName: "Project Two",
            projectCreator: "User Two",
            projectCategory: "games",
            projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            projectImage: [
                'https://images.unsplash.com/photo-1713190190659-22fe536876f5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1713188702314-3adb3d686a50?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1712884504011-a1ebe9960938?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1712841607084-3c8dabe07818?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 42,
            views: 150,
            fundedPercentage: 65
        },
        {
            projectName: "Project Three",
            projectCreator: "User Three",
            projectCategory: "dev",
            projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            projectImage: [
                'https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 1976,
            views: 150,
            fundedPercentage: 43
        },
        {
            projectName: "Project Four",
            projectCreator: "User Four",
            projectCategory: "books",
            projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            projectImage: [
                'https://images.unsplash.com/photo-1713145868370-0b9c9bb58465?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1707046369773-8c781712d079?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1713107101542-164858b1e836?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            likes: 1,
            views: 150,
            fundedPercentage: 0
        }
    ];

    const [randomIndex, setRandomIndex] = useState(0);
    function randomClick() {
        // Generate a new random index
        const newIndex = Math.floor(Math.random() * projects.length);
        // Update the random index state
        setRandomIndex(newIndex);
    }

    return (
        <section className="flex justify-center items-center">
            <div className="flex flex-col gap-5 w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 w-9/12">Discover what others are up to</h3>
                <section id="randomProject" className="w-full overflow-hidden py-5 px-5 sm:py-10 sm:px-10 shadow-xl border-2 border-gray-200 border-opacity-50 bg-opacity-60 backdrop-blur-md gap-10 rounded-md flex flex-col sm:grid sm:grid-cols-5">
                    <RandomProject project={projects[randomIndex]} />
                </section>
                <div className="flex w-full items-center justify-center">
                    <button onClick={randomClick} className="w-full sm:w-2/12 bg-gradient-to-r from-primary to-secondary text-white font-dmsans font-semibold text-lg py-2 px-4 rounded-lg border-0">Randomize</button>
                </div>
            </div>
        </section>
    );
}

export default RandomSection;
