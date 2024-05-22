import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import SingleCard from '../Components/SingleCard'
import { RotatingLines } from 'react-loader-spinner';

function Home() {
    // state for trending media
    const [trendingData, setTrendingData] = useState([]);

    // state for recommended media
    const [recommendedData, setRecommendedData] = useState([]);

    // state to track loading status
    const [loading, setLoading] = useState(true);

    // for fetching trending and recommended media
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingResponse = await axiosInstance.get('/media/trending');
                const recommendedResponse = await axiosInstance.get('/media/recommended');
                setTrendingData(trendingResponse.data.data);
                setRecommendedData(recommendedResponse.data.recommended);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading state to false when fetching is complete
            }
        };

        setTimeout(() => {
            fetchData();
        }, 2000);
    }, []);

    return (
        <>
            {loading ? ( // If data is loading, render the ProgressBar
                <div className="absolute top-0 w-full h-full flex items-center justify-center bg-leanBlue">
                    <RotatingLines
                        visible={true}
                        height="80"
                        width="80"
                        strokeColor="red"
                    />
                </div>
            ) : (
                <div className="mx-auto bg-leanBlue flex w-full h-full overflow-y-scroll overflow-x-hidden">
                    <div className='w-full h-full'>
                        <h1 className="text-xl md:text-3xl text-white ml-4 font-semibold my-2">Trending</h1>
                        <div className='w-full h-full overflow-x-scroll scrollbar-none'>
                            <div className="mx-3 h-full w-full flex ">
                                {trendingData.map((item) => (
                                    <div key={item._id} className="overflow-y-hidden flex-none h-60 md:h-80 w-[85%] md:w-[60%] lg:w-1/3 p-1 md:p-4 lg:p-2">
                                        <SingleCard
                                            item={item}
                                            fieldType='trending'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='w-full overflow-y-hidden'>
                            <h1 className="text-xl md:text-3xl text-white font-semibold ml-7 mt-4 mb-4">Recommended for you</h1>
                            <div className=" mx-3 flex flex-wrap gap-6 justify-center">
                                {recommendedData.map((item) => (
                                    <div key={item._id} className="flex-none w-[45%] md:w-[30%] lg:w-[22%] h-40 md:h-48 mb-12">
                                        <SingleCard
                                            item={item}
                                            fieldType='recommended'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
