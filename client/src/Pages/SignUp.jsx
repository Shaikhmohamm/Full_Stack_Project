import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import { MdMovie } from "react-icons/md";
import { errorToast, successToast } from '../utils/customToasts.js';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosInstance.post('/user/signup', values);
      console.log("success")
      if (response.data.success) {
        // Redirect to login page after successful sign up
        navigate('/login');
        // Reset the form
        resetForm();
        // Show success toast message
        successToast('User registered successfully');
      } else {
        // Show error toast message
        errorToast(response.data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Show error toast message
      errorToast('Error signing up');
    }
    setSubmitting(false);
  };


  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-leanBlue">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
          repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Repeat Password is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <div className='flex w-[90%] md:w-1/2 lg:w-1/4 flex-col justify-center items-center'>
              <div className='mb-3'>
                <MdMovie className='text-5xl lg:text-7xl mb-2 text-red-500' />
              </div>
              <Form className="bg-deepBlue p-5 w-full rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl text-white mb-5">Sign Up</h2>
                <Field type="email" name="email" placeholder="Email"
                  className="bg-deepBlue text-white mb-6 p-2 border border-deepBlue w-full text-white::placeholder"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mb-2" />
                <Field type="password" name="password" placeholder="Password"
                  className="bg-deepBlue text-white mb-6 p-2 border border-deepBlue w-full text-white::placeholder"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mb-2" />
                <Field type="password" name="repeatPassword" placeholder="Repeat Password"
                  className="bg-deepBlue text-white mb-6 p-2 border border-deepBlue w-full text-white::placeholder"
                />
                <ErrorMessage name="repeatPassword" component="div" className="text-red-500 mb-2" />
                <button type="submit" className="w-full rounded-md bg-red-500 text-white px-4 py-2 font-semibold mb-4" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create Account'}
                </button>
                <p className='text-white'>
                  Already have an account?
                  <Link to="/login" className="md:ml-2 text-red-500">
                    Login
                  </Link>
                </p>
              </Form>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;