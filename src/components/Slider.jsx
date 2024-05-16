import React, { useState, useEffect } from 'react';
import Main1 from '../assets/pictures/main1.webp';
import Main2 from '../assets/pictures/main2.webp';
import Main3 from '../assets/pictures/main3.webp';

const items = [
    {
        html: <p>Let's fund it <span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text pb-1'>together</span></p>,
        image: Main3
    },
    {
        html: <p><span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text pb-1'>Unleash</span> your creativity</p>,
        image: Main1
    },
    {
        html: <p>Find your <span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text pb-1'>flow</span></p>,
        image: Main2
    },
];

function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === items.length - 1 ? 0 : prevSlide + 1));
        }, 5500);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <section className='mt-30 bg-black'>
            <div className="relative w-full" style={{ height: `${window.innerWidth < 640 ? '40vh' : '70vh'}` }}>
                {items.map((item, index) => (
                    <div key={index} className="absolute inset-0">
                        <img
                            src={item.image}
                            alt={item.text}
                            className={`w-full h-full object-cover brightness-50 ${index === currentSlide ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
                        />
                        {index === currentSlide && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center pt-24 fade-in">
                                <h2 className='font-dmsans text-3xl sm:text-6xl font-bold text-white select-none'>
                                    {item.html}
                                </h2>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Slider;



