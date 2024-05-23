import React from 'react';
import { useSelector } from 'react-redux';
import { TiStarFullOutline } from "react-icons/ti";


const DetailsPage = () => {
    // Getting the detail from redux-store
    const detail = useSelector(state => state.detail.content);

    // function for generating stars for rating
    const renderStarRating = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating);
        for (let i = 0; i < roundedRating; i++) {
            stars.push(<TiStarFullOutline  className="text-xl md:text-2xl text-yellow-500" />);
        }
        return stars;
    };

    return (
        <div className="container mx-auto p-4 w-full h-full bg-leanBlue text-white flex flex-col justify-center lg:items-start items-center lg:flex-row gap-10">
            <div className='lg:ml-10 w-64 h-80 md:w-1/2 lg:w-1/3 md:h-1/2 p-4'>
                <img src={detail.big_image} alt={detail.title} className="w-full md:w-full h-full lg:rounded-xl" />
            </div>
            <div className="w-full lg:w-1/2 p-5 pt-5">
                <div className="md:w-full md:pl-8">
                    <h2 className="text-2xl md:text-3xl font-bold">{detail.title}</h2>

                    <div className='my-3 lg:my-5 md:text-lg'>{detail.type}</div>

                    <div className="flex items-center">
                        {renderStarRating(parseFloat(detail.rating))}
                        <span className="ml-2 text-xl">{detail.rating}</span>
                    </div>
                    <div className='font-semibold mt-3 text-xl md:text-3xl'>Description</div>
                    <p className="md:text-lg mt-4">{detail.description}</p>
                    <div className="mt-8 text-lg md:text-xl">
                        <span className="font-semibold">Genres: </span>
                        {detail.genre.join(', ')}
                    </div>
                    <div className="mt-6 text-lg md:text-xl">
                        <span className="font-semibold">Year: </span>
                        {detail.year}
                    </div>
                    <div className="mt-5 text-md md:text-xl">
                        <span className="font-semibold">IMDb Rating: </span>
                        {detail.rating}
                    </div>
                    <div className="mt-10 text-lg md:text-xl">
                        <a href={detail.imdb_link} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
                            View on IMDb
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;