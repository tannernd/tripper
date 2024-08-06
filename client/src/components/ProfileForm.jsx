import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Upload from "./Upload";
import { SAVE_USER_INFO } from "../utils/mutations";
import Avatar from "./Avatar";

export default function ProfileForm(props) {
  const { username, bio, user, setShowForm } = props;
  const [saveUserInfo, { error, data }] = useMutation(SAVE_USER_INFO);
  return (
    <>
      <Formik
        initialValues={{ username: username, bio: bio, email: user.data.email }}
        validate={(values) => {
          const errors = {};
          if (!values.bio) {
            errors.bio = "Required";
          } else if (!values.email) {
            errors.bio = "Required";
          } else if (!values.username) {
            errors.username = "Required";
          }
          return errors;
        }}
        onSubmit={async (userFormData, { setSubmitting }) => {          
          try {
            const { data } = await saveUserInfo({
              variables: {
                userId: user.data._id,
                bio: userFormData.bio,
                email: userFormData.email,
                username:userFormData.username
              },
            })
            setShowForm(false);
            window.location = '/profile/'+userFormData.username;
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ isSubmitting }) => (
          // 
          <Form className="flex flex-col rounded-xl border p-5 shadow-md w-full max-w-2xl mx-auto bg-slate-200">
            <div className="mb-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <Field name="username" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <Field name="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-900">
                Bio
              </label>
              <Field as="textarea" name="bio" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />
              <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Avatar className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <Upload userId={user.data._id} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6">
              <button onClick={() => setShowForm(false)} type="button" className="text-sm font-semibold text-gray-900">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
