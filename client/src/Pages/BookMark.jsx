import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import SingleCard from '../Components/SingleCard'
import { Link } from 'react-router-dom';

const BookMark = () => {
    const [bookmarkData, setBookmarkData] = useState({ bookmarkmovie: [], bookmarkseries: [] });

    useEffect(() => {
        const getBookmarkData = async () => {
            try {
                const response = await axiosInstance.get('/bookmark', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: document.cookie,
                    }
                });
                setBookmarkData(response.data.bookmark);
            } catch (error) {
                console.error("Error while getting bookmark:", error);
            }
        };
        getBookmarkData();
    }, []);

    const { bookmarkmovie, bookmarkseries } = bookmarkData;

    // Callback function to remove item from bookmark list
    const removeItemFromBookmark = (id) => {
        setBookmarkData(prevData => ({
            ...prevData,
            bookmarkmovie: prevData.bookmarkmovie.filter(item => item._id !== id),
            bookmarkseries: prevData.bookmarkseries.filter(item => item._id !== id)
        }));
    };

    return (
        <div className="w-full h-full overflow-y-hidden overflow-x-hidden">
            {bookmarkmovie.length === 0 && bookmarkseries.length === 0 ? (
                <div className="flex flex-col w-full h-screen bg-leanBlue text-white text-center mt-10 p-5">
                    <p className='text-xl md:text-2xl lg:text-3xl mb-5'>No items bookmarked yet.</p>
                    <Link to="/" >
                        <button className="md:text-xl p-3 md:p-4 font-semibold bg-red-500 rounded-md mt-5">
                            Go to main page
                        </button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="mx-auto bg-leanBlue flex w-full">
                        <div className='w-full'>
                            <h1 className="text-xl md:text-3xl text-white font-semibold ml-5 mt-4 mb-4">Bookmarked Movies</h1>
                            <div className="w-full ml-5 flex flex-wrap gap-5">
                                {bookmarkmovie.map((item) => (
                                    <div key={item._id} className="flex-none w-[45%] md:w-[30%] lg:w-[22%] h-40 md:h-48 mb-12">
                                        <SingleCard
                                            item={item}
                                            fieldType='bookmark'
                                            removeItem={removeItemFromBookmark}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto bg-leanBlue flex">
                        <div className='w-full'>
                            <h1 className="text-xl md:text-3xl text-white font-semibold ml-5 mt-4 mb-4">Bookmarked Series</h1>
                            <div className="ml-5 flex flex-wrap gap-5">
                                {bookmarkseries.map((item) => (
                                    <div key={item._id} className="flex-none w-[45%] md:w-[30%] lg:w-[22%] h-40 md:h-48 mb-12">
                                        <SingleCard
                                            item={item}
                                            fieldType='bookmark'
                                            removeItem={removeItemFromBookmark}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookMark;
