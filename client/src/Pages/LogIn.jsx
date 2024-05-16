import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import Cookies from 'js-cookie';
import { MdMovie } from "react-icons/md";
import {successToast, errorToast} from '../utils/customToasts.js'

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axiosInstance.post('/user/login', values);
            if (response.data.success) {
                // Set cookie with user authentication token
                Cookies.set('UserAuth', response.data.loginToken, { expires: 7 });
                // Redirect to home page or dashboard after successful login
                navigate('/');
                // Show success toast message
                successToast('User Login successfully');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Show error toast message based on the error response
            if (error.response && error.response.data && error.response.data.message) {
                errorToast(error.response.data.message);
            } else {
                errorToast('Error logging in');
            }
        }
        setSubmitting(false);
    };


    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-leanBlue">
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Email is required';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <div className='flex w-[90%] md:w-1/2 lg:w-1/4 flex-col justify-center items-center'>
                        <div className='mb-3'>
                            <MdMovie className='text-5xl lg:text-7xl mb-2 text-red-500' />
                        </div>
                        <Form className="bg-deepBlue p-5 w-full rounded-lg shadow-lg flex flex-col items-center">
                            <h2 className="text-3xl md:text-4xl text-white mb-8">Login</h2>
                            <Field type="email" name="email" placeholder="Email"
                                className="bg-deepBlue text-white mb-8 p-2 border border-deepBlue w-full text-white::placeholder"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 mb-2" />
                            <Field type="password" name="password" placeholder="Password"
                                className="bg-deepBlue text-white mb-8 p-2 border border-deepBlue w-full text-white::placeholder"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 mb-2" />
                            <button type="submit" className="w-full rounded-md bg-red-500 text-white px-4 py-2 font-semibold mb-8" disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'Log in'}
                            </button>
                            <p className='text-white'>Don't have an account?
                                <Link to="/signup" className="ml-2 text-red-500">Sign up</Link>
                            </p>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default Login