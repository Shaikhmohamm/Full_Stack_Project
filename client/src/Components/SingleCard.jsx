import React, { useState, useEffect } from 'react';
import { MdPlayCircleFilled } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { setcontent } from '../Redux/slice/detailSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToBookMark, removeBookMark } from '../service/bookmark.service.js';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance.js';
import { setTvbookmarkdata, setmbookmarkdata } from '../Redux/slice/detailSlice.js';
import {successToast, errorToast} from '../utils/customToasts.js'

function SingleCard({ item, fieldType, removeItem }) {

    let id = item._id
    let mediaType = item.type

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // getting from redux store
    const movieData = useSelector(state => state.detail.moviebookmarkdata)
    const seriesData = useSelector(state => state.detail.seriesbookmarkdata)

    // created a state to check for bookmarked or not
    const [isBookmarked, setIsBookmarked] = useState(false);

    // for authentication
    const [isAuth, setIsAuth] = useState(true);


    // dispatching to redux store using use effect
    useEffect(() => {
        const handleBookmarkStatus = async () => {
          try {
            // Check if the authentication token cookie exists
            const authToken = document.cookie.includes('your_auth_cookie_name_here');
    
            if (authToken) {
              // If token exists, proceed with bookmark status check
              const { data } = await axiosInstance.get(`/bookmark/check`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: document.cookie,
                }
              });
    
              if (data.success) {
                setIsAuth(true); // User is authenticated
                if (mediaType === "movie") {
                  dispatch(setmbookmarkdata(data.bookmarkmovie));
                } else if (mediaType === "series") {
                  dispatch(setTvbookmarkdata(data.bookmarkseries));
                }
              } else {
                setIsAuth(false); // User is not authenticated
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        handleBookmarkStatus(); // Always call the function to check bookmark status
    
      }, [dispatch, mediaType]);

    // Function to check status of bookmark after dispatching.
    useEffect(() => {
        const checkBookmarkStatus = (id, mediaType) => {
            if (mediaType === 'movie') {
                if (id && movieData.includes(id)) {
                    setIsBookmarked(true); // Movie is bookmarked
                } else {
                    setIsBookmarked(false); // Movie is not bookmarked
                }
            } else {
                if (id && seriesData.includes(id)) {
                    setIsBookmarked(true); // Movie is bookmarked
                } else {
                    setIsBookmarked(false); // Movie is not bookmarked
                }
            }
        };

        if (isAuth) {
            checkBookmarkStatus(id, mediaType); // Check bookmark status if user is authenticated
        }
    }, [id, movieData, isAuth, mediaType, seriesData]);

    const handleBookmarkToggle = async (mediaType, id) => {
        try {
            const isLoggedIn = document.cookie.includes("UserAuth");
            if (!isLoggedIn) {
                errorToast('Log in first to add to bookmark');
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
                return;
            }

            // check for bookmark 
            if (isBookmarked) {
                const data = await removeBookMark(id, mediaType);
                if (data.success) {
                    successToast('Removed from bookmark'); // Show toast message
                    setIsBookmarked(false); // Update state to remove the bookmarked card
                    // Call removeItem function to remove the item from the bookmark list in the parent component
                    removeItem(id);
                    
                } else {
                    console.log('error occurred');
                }
            } else {
                const data = await addToBookMark(mediaType, id);
                if (data.success) {
                    setIsBookmarked(true); // Update state to add the bookmarked card
                    successToast('Added to bookmark'); // Show toast message
                } else {
                    console.log('error occurred');
                }
            }
        } catch (error) {
            console.error("Error while toggling bookmark:", error);
        }
    };

    // for play button
    const handlePlayClick = () => {
        dispatch(setcontent(item));
        navigate('/detail');
    };

    return (
        <>
            {fieldType === "trending" ? (
                <div className="relative h-40 md:h-60 w-full p-1">
                    <img className="w-full rounded-xl h-full object-fill" src={item.image} alt={item.title} />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-75">
                        <button onClick={() => handleBookmarkToggle(item.type, item._id)} className="focus:outline-none">
                            {isBookmarked ? (
                                <IoMdBookmark
                                    className="rounded-full text-xl md:text-3xl text-white mb-2 cursor-pointer hover:bg-white hover:fill-black"
                                />
                            ) : (
                                <CiBookmark
                                    className="rounded-full text-xl md:text-3xl text-white mb-2 cursor-pointer hover:bg-white hover:fill-black"
                                />
                            )}
                        </button>
                        <button onClick={handlePlayClick} className='text-white'>
                            <MdPlayCircleFilled className="text-3xl md:text-5xl text-white mb-2 cursor-pointer" />
                        </button>
                        <div className="text-white mb-2">{item.type === 'movie' ? 'Movie' : 'Series'}</div>
                    </div>
                    <div className="px-6 py-4">
                        <div className="text-balance text-white lg:text-HeadingXS mb-2">{item.title}</div>
                    </div>
                </div>
            ) : (
                <div className="relative h-full w-full">
                    <img className="w-full rounded-xl h-full object-fill" src={item.image} alt={item.title} />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-75">
                        <button onClick={() => handleBookmarkToggle(item.type, item._id)} className="focus:outline-none">
                            {isBookmarked ? (
                                <IoMdBookmark className="rounded-full text-2xl lg:text-3xl text-white mb-2 cursor-pointer hover:bg-white hover:fill-black" />
                            ) : (
                                <CiBookmark className="rounded-full text-2xl lg:text-3xl text-white mb-2 cursor-pointer hover:bg-white hover:fill-black" />
                            )}
                        </button>
                        <MdPlayCircleFilled onClick={handlePlayClick} className="text-3xl lg:text-5xl text-white mb-2 cursor-pointer" />
                        <div className="text-white text-md lg:text-lg mb-2">{item.type === 'movie' ? 'Movie' : 'Series'}</div>
                    </div>
                    <div className="p-3 md:px-6 md:py-4">
                        <div className="text-balance font-light text-white text-xs lg:text-HeadingXS mb-2">{item.title}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SingleCard;