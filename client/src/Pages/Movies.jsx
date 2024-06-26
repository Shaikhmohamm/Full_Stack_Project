import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import SingleCard from '../Components/SingleCard';
import { RotatingLines } from 'react-loader-spinner';

const Movies = () => {
    // state for movies 
    const [movies, setMovies] = useState([]);
    // state to track loading status
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const response = await axiosInstance.get('/media/movies');
                setMovies(response.data.moviedata);
            } catch (error) {
                console.error('Error fetching movies data:', error);
            } finally {
                setLoading(false); // Set loading state to false when fetching is complete
            }
        };
        setTimeout(()=>{
            fetchMoviesData();
        },2000)
    }, []);

    return (
        <>
            {loading ? ( // If data is loading, render the RotatingLines
                <div className="absolute top-0 w-full h-full flex items-center justify-center bg-leanBlue">
                    <RotatingLines
                        height="80"
                        width="80"
                        strokeColor="red"
                    />
                </div>
            
            ) : (
                    <div className='w-full'>
                        <h1 className="text-xl md:text-3xl text-white font-semibold ml-5 mt-4 mb-4">Movies</h1>
                        <div className="mx-3 flex flex-wrap gap-6 justify-center">
                            {movies.map((item) => (
                                <div key={item._id} className="flex-none w-[45%] md:w-[30%] lg:w-[23%] h-40 md:h-48 mb-12">
                                    <SingleCard
                                        item={item}
                                        fieldType='recommended'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
            )}
        </>
    );
};

export default Movies;
