import React from "react";
import HomeCategory from "./HomeCategory";
import art from "../assets/pictures/art.webp";
import books from "../assets/pictures/books.webp";
import dev from "../assets/pictures/dev.webp";
import games from "../assets/pictures/games.webp";
import innove from "../assets/pictures/innove.webp";
import music from "../assets/pictures/music.webp";

const artPercentage = 18;
const booksPercentage = 25;
const devPercentage = 7;
const gamesPercentage = 14;
const innovePercentage = 21;
const musicPercentage = 15;

function CategorySlider() {
    return (
        <div>
            <section className="flex justify-center items-center">
                <div className="w-11/12 py-5">
                    <div className="grid lg:grid-rows-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 w-full" style={{ height: "400px" }}>
                        <HomeCategory categoryImage={art} categoryName="art" categoryCols={3} categoryRows={3} />
                        <HomeCategory categoryImage={books} categoryName="books" categoryCols={1} categoryRows={1} />
                        <HomeCategory categoryImage={dev} categoryName="dev" categoryCols={2} categoryRows={2} />
                        <HomeCategory categoryImage={games} categoryName="games" categoryCols={1} categoryRows={1} />
                        <HomeCategory categoryImage={innove} categoryName="innove" categoryCols={2} categoryRows={1} />
                        <HomeCategory categoryImage={music} categoryName="music" categoryCols={1} categoryRows={1} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CategorySlider;
