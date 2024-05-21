import React from "react";
import { Link } from "react-router-dom";
import HomeCategory from "./HomeCategory";
import art from "../assets/pictures/art.webp";
import books from "../assets/pictures/books.webp";
import dev from "../assets/pictures/dev.webp";
import games from "../assets/pictures/games.webp";
import innove from "../assets/pictures/innove.webp";
import music from "../assets/pictures/music.webp";

//TODO: random size grid
//const categories = await getCategories();
function CategorySlider() {
    return (
        <section className="flex justify-center items-center w-full sm:w-11/12 sm:mx-auto">
            <div className="grid lg:grid-rows-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 w-full" style={{ height: `${window.innerWidth < 640 ? 'auto' : '500px'}` }}>
                <HomeCategory categoryImage={art} categoryName="art" categoryCols={3} categoryRows={3} />
                <HomeCategory categoryImage={books} categoryName="books" categoryCols={1} categoryRows={1} />
                <HomeCategory categoryImage={dev} categoryName="dev" categoryCols={2} categoryRows={2} />
                <HomeCategory categoryImage={games} categoryName="games" categoryCols={1} categoryRows={1} />
                <HomeCategory categoryImage={innove} categoryName="innove" categoryCols={2} categoryRows={1} />
                <HomeCategory categoryImage={music} categoryName="music" categoryCols={1} categoryRows={1} />
            </div>
        </section>
    )
}

export default CategorySlider;
