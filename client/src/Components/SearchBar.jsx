import React from 'react';
import { IoSearch } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { setsearchinput } from '../Redux/slice/searchSlice';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    // Define placeholder text based on the current route
    let placeholderText = '';
    switch (path) {
        case '/':
        case '/search/multi':
            placeholderText = 'Search for movies or TV series here';
            break;
        case '/movies':
        case '/search/movies':
            placeholderText = 'Search for movies here';
            break;
        case '/tvseries':
        case '/search/tvseries':
            placeholderText = 'Search for TV series here';
            break;
        case '/bookmark':
        case '/search/bookmark':
            placeholderText = 'Search bookmarked items here';
            break;
        default:
            placeholderText = 'Search here';
            break;
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            let response;
            if (path === '/' || path === '/search/multi') {
                response = await axiosInstance.get(`/media/all/search/${values.searchQuery}`);
                dispatch(setsearchinput(response.data.searchData));
                navigate(`/search/multi`);
            } else if (path === '/movies' || path === '/search/movies') {
                response = await axiosInstance.get(`/media/movie/search/${values.searchQuery}`);
                dispatch(setsearchinput(response.data.moviedata));
                navigate(`/search/movies`);
            } else if ((path === '/tvseries' || path === '/search/tvseries')) {
                response = await axiosInstance.get(`/media/tvseries/search/${values.searchQuery}`);
                dispatch(setsearchinput(response.data.seriesdata));
                navigate(`/search/tvseries`);
            } else if ((path === '/bookmark' || path === '/search/bookmark')) {
                response = await axiosInstance.get(`/bookmark/search/${values.searchQuery}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: document.cookie,
                    }
                });
                dispatch(setsearchinput(response.data.searchData));
                navigate(`/search/bookmark`);
            } else {
                console.log("error")
            }
            resetForm(); // Clear the form values
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div className='h-20 p-2 w-full flex justify-center items-center'>
            <IoSearch className='text-white text-4xl mx-2'/>
            <div className='w-full'>
                <Formik
                    initialValues={{ searchQuery: '' }}
                    onSubmit={handleSubmit}
                >
                    <Form className='w-full'>
                        <Field
                            type="text"
                            name="searchQuery"
                            placeholder={placeholderText}
                            className='bg-leanBlue text-white w-[90%] h-3/4 rounded-md p-2 md:text-2xl'
                        />
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SearchBar;