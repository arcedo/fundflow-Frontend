import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RandomProject from "./RandomProject";
import logo from "../assets/icons/logoLight.png";

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
            projectDescription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
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
            projectDescription: "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
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
            projectDescription: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
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

    const [flipped, setFlipped] = useState(false);

    const [randomIndex, setRandomIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);

    function generateRandomIndex() {
        let newIndex = randomIndex;
        while (newIndex === randomIndex) {
            newIndex = Math.floor(Math.random() * projects.length);
        }
        return newIndex;
    }

    function randomClick() {
        const newIndex = generateRandomIndex();
        setFlipped(true);
        setTimeout(() => {
            setPrevIndex(randomIndex);
            setRandomIndex(newIndex);
        }, 300);
        console.log("flip");
        setTimeout(() => {
            setFlipped(false);
            console.log("flop");
        }, 1000);
    }

    useEffect(() => {
        setRandomIndex(generateRandomIndex());
    }, []);

    return (
        <section className={`flex justify-center items-center`}>
            <div className="flex flex-col gap-5 w-full">
                <h3 className="text-black text-2xl font-dmsans font-bold text-opacity-75 w-9/12">Discover what others are up to</h3>
                <div className={`flip-card`}>
                    <div className={`flip-card-inner  ${flipped ? 'flipped' : ''}`}>
                        <section id="randomProject" className={`flip-card-front w-full overflow-hidden py-5 px-5 sm:py-10 sm:px-10 shadow-xl border-2 border-gray-200 border-opacity-50 bg-gray-100 backdrop-blur-md gap-10 rounded-md flex flex-col sm:grid sm:grid-cols-5 `}>
                            <RandomProject project={projects[randomIndex]} />
                        </section>
                        <section className={`flip-card-back w-full overflow-hidden py-5 px-5 sm:py-10 sm:px-10 shadow-xl border-2 border-gray-200 border-opacity-50 bg-gray-100 backdrop-blur-md gap-10 rounded-md flex flex-col justify-center items-center`}>
                            <div className='flex gap-8 justify-center items-center'>
                                <img src={logo} alt="" className='w-20 h-20 rounded-md' />
                                {/* <h1 className='font-dmsans text-black text-7xl font-bold' >fundflow.</h1> */}
                            </div>
                        </section>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <button onClick={randomClick} className="w-full sm:w-2/12 bg-gradient-to-r from-primary to-secondary text-white font-dmsans font-semibold text-lg py-2 px-4 rounded-lg border-0">Randomize</button>
                </div>
            </div>
        </section>
    );
}

export default RandomSection;
