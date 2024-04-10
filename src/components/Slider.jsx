import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Main1 from '../assets/pictures/main1.webp';
import Main2 from '../assets/pictures/main2.webp';
import Main3 from '../assets/pictures/main3.webp';

const items = [
    {
        name: <h2 className='font-dmsans text-3xl sm:text-6xl font-bold text-white select-none'>Let's fund it <span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text py-2'>together.</span></h2>,
        image: Main3
    },
    {
        name: <h2 className='font-dmsans text-3xl sm:text-6xl font-bold text-white select-none'><span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text py-2'>Unleash </span> your creativity.</h2>,
        image: Main1
    },
    {
        name: <h2 className='font-dmsans text-3xl sm:text-6xl font-bold text-white select-none'>Find your <span className='bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text py-2'>flow.</span></h2>,
        image: Main2
    },
];

function Item(props){
    return (
        <Paper>
            <div className="relative w-full" style={{height: `${window.innerWidth < 640 ? '40vh' : '70vh'}`}}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-50" style={{ backgroundImage: `url(${props.item.image})` }} />
                <div className="absolute inset-0 flex flex-col justify-center items-center pt-24">
                    {props.item.name}
                </div>
            </div>
        </Paper>
    )
    
}

function Slider(props){
    return (
        <section className='mt-30 mb-12'>
            <Carousel 
            navButtonsProps={{
                style: {
                    marginTop: '2.9rem'
                }
            }} animation='slide' swipe={false} interval={5000} duration={1200} indicators={false} stopAutoPlayOnHover={false}>{
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
            </Carousel>
        </section>
    )
}

export default Slider;