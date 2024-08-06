import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LOGIN } from '../utils/mutations';
import {useMutation } from "@apollo/client";
import Auth from '../utils/auth';
 
 const Login = () => {
    
  const [createUser, { error, data }] = useMutation(LOGIN);  
  const [showAlert, setShowAlert] = useState(false);

    return (
   <div>
    <div className="flex items-center justify-center"><h1 className='text-6xl font-normal leading-normal mt-0 mb-2 block'>Login</h1>
        
    </div>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         } else if (!values.password) {
            errors.password = 'Please Enter a Password'
         }

         return errors;
       }}
       onSubmit={ async (userFormData, { setSubmitting }) => {
        try {
            const { data } = await createUser({
              variables: { ...userFormData },
            });
            
            Auth.login(data.login.token);
          } catch (err) {
            console.error(err);
            setShowAlert(true);
          }
       }}
     >
       {({ isSubmitting }) => (
        <div className="flex items-center justify-center">
            
         <Form className="block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         <div className={`${!showAlert ? 'hidden' : ''} block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`} role="alert">
            <span className="block sm:inline">Login Failed</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
           <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email Address" type="email" name="email" />
           <ErrorMessage name="email" component="div" />           
           <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
           <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
         </div>
       )}
     </Formik>
   </div>
 )};
 
    export default Login