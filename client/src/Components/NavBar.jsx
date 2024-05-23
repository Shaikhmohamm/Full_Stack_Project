import React from 'react';
import { MdMovie } from "react-icons/md";
import { AiFillAppstore } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { NavLink, useLocation } from 'react-router-dom';
import { HiBookmark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import Cookies from 'js-cookie';
import { successToast } from '../utils/customToasts.js';


const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    // function to logout user
    const logOutUser = async () => {
        try {
            
            const response = await axiosInstance.get('/user/logout', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: document.cookie,
                },
            });
            // once the user logged out remove the cookie
            Cookies.remove('UserAuth');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return (
        <div className='w-full sm:w-screen lg:w-20 p-5 flex lg:flex-col justify-center items-center lg:h-screen'>
            <div className="w-full sm:w-screen lg:h-full h-16 flex justify-between md:gap-3 sm:gap-12 lg:flex-col items-center lg:w-16 bg-deepBlue rounded-lg p-4">
                <div className='flex lg:flex-col items-center w-[70%] md:w-[60%] justify-between lg:justify-start h-full lg:gap-10'>
                    <div className="relative left-[0] text-red-500 text-2xl sm:text-4xl lg:mb-5">
                        <MdMovie/> 
                    </div>
                    <div className="flex lg:flex-col gap-1 md:gap-5 text-waikawaGrey">
                        <NavLink to="/" className={`text-2xl sm:text-3xl hover:text-white ${location.pathname === '/' && 'text-red-500'}`}>
                            <AiFillAppstore />
                        </NavLink>
                        <NavLink to="/movies" className={`text-2xl sm:text-3xl hover:text-white ${location.pathname === '/movies' && 'text-red-500'}`}>
                            <MdLocalMovies />
                        </NavLink>
                        <NavLink to="/tvseries" className={`text-2xl sm:text-3xl hover:text-white ${location.pathname === '/tvseries' && 'text-red-500'}`}>
                            <TbDeviceTvOld />
                        </NavLink>
                        <button >
                            <NavLink to="/bookmark" className={`text-2xl sm:text-3xl hover:text-white ${location.pathname === '/bookmark' && 'text-red-500'}`}>
                                <HiBookmark />
                            </NavLink>
                        </button>
                    </div>
                </div>
                <div className='lg:mb-4 mt-1 transition-all duration-300 hover:text-white hover:font-bold'>
                    <button onClick={() => {
                        // Redirect to signup if user is not logged in, otherwise logout user
                        if (!document.cookie) {
                            navigate("/signup");
                            return;
                        };
                        logOutUser();
                        successToast("User Log out successfully")
                        navigate('/')
                    }}>
                        <NavLink to="/login" className={`text-xl text-waikawaGrey sm:text-3xl hover:text-white ${location.pathname === '/bookmark' && 'text-red-500'}`}>
                            <img
                                className="ring-darkRed ring-2 rounded-full h-6 w-6 md:h-8 md:w-8 "
                                src="https://www.fakepersongenerator.com/Face/male/male20141085936910461.jpg"
                                alt=""
                            />
                        </NavLink>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default NavBar;
