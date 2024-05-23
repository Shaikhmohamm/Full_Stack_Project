import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import SingleCard from '../Components/SingleCard';
import { RotatingLines } from 'react-loader-spinner';

const TvSeries = () => {
    const [tvseries, setTvSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTvSeriesData = async () => {
            try {
                const response = await axiosInstance.get('/media/tvseries');
                setTvSeries(response.data.tvseriesdata);
            } catch (error) {
                console.error('Error fetching TV series data:', error);
            } finally {
                setLoading(false); 
            }
        };
        setTimeout(()=>{
            fetchTvSeriesData();
        },2000)
    }, []);

    return (
        <>
            {loading ? ( // If data is loading, render the RotatingLines spinner
                <div className="absolute top-0 w-full h-full flex items-center justify-center bg-leanBlue">
                    <RotatingLines
                        height="80"
                        width="80"
                        strokeColor="red"
                    />
                </div>
            ) : (
                    <div className='w-full'>
                        <h1 className="text-xl md:text-3xl text-white font-semibold ml-5 mt-4 mb-4">Tv Series</h1>
                        <div className="mx-3 flex flex-wrap gap-6 justify-center">
                            {tvseries.map((item) => (
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

export default TvSeries;
