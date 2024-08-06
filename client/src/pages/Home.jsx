import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery, useMutation } from "@apollo/client";
import { GET_QUESTIONS } from "../utils/queries";
import { SAVE_QUESTION } from "../utils/mutations";
import pluralize from "pluralize";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import Auth from "../utils/auth";
import { GiPalmTree } from "react-icons/gi";
import { FaAnchor } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";




const Home = () => {
  const { loading, data } = useQuery(GET_QUESTIONS);
  const questions = data?.getQuestion || [];
  const [showAlert, setShowAlert] = useState(false);
  const [saveQuestion, { error }] = useMutation(SAVE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONS,
      },
    ],
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-100">
      {Auth.loggedIn() ? (
        <Formik
          initialValues={{ question: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.question) {
              errors.question = "Required";
            }
            return errors;
          }}
          onSubmit={async (userFormData, { setSubmitting, resetForm }) => {
            const user = Auth.getProfile();
            try {
              const { data } = await saveQuestion({
                variables: {
                  userId: user.data._id,
                  textContent: userFormData.question,
                },
              });
              resetForm();
            } catch (err) {
              console.error(err);
              setShowAlert(true);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <div className="flex items-center justify-center m-2">
            <Form className="rounded-xl border p-5 shadow-md w-full md:w-9/12 bg-white">
              <div
                className={`${
                  !showAlert ? "hidden" : ""
                } block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
                role="alert"
              >
                <span className="block sm:inline">Question Failed</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
              <label
                htmlFor="question"
                className="block text-slate-700 text-sm font-bold mb-2"
              >
                Question:
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ask the ghost of Anthony Bourdain about Travel!"
                type="question"
                name="question"
                as="textarea"
              />
              <ErrorMessage name="question" component="div" />
              <button
                className=" bg-blue-400 hover:bg-blue-500 text-white font-normal py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                
              <span className="mr-2">Ask</span><span> </span><GiPalmTree size={20} />
                
              </button>
            </Form>
          </div>
          )}
        </Formik>
      ) : (
        ""
      )}
      {questions.map((item) => {
        console.log(item);
        return (
          <div key={item._id} className="flex items-center justify-center m-2 ">
            <div className="rounded-xl border p-5 shadow-md w-full md:w-9/12 bg-white">
              <div className="flex w-full items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar  
                        avatarImg={item.userId.avatarImg || ''}
                        username={item.userId.username || ''}/>
                  <div className="flex items-center text-lg font-bold text-slate-700">
                    <Link to={`/profile/${item.userId.username}`}>{item.userId.username}</Link> 
                    {item.userId.verified && <MdVerified className="ml-1"/>}
                  <div className="text-sm font-thin text-slate-500 ml-2">asks:</div>
                  </div>
                </div>
                <div className="flex items-center space-x-8 ">
                  {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">Category</button> This is for tags if we add them */}
                  <div className="text-xs hidden md:flex text-slate-500">
                    {moment(parseInt(item.createdAt)).fromNow()}
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-6">
                {/* <div className="mb-3 text-xl font-bold">
                  Nulla sed leo tempus, feugiat velit vel, rhoncus neque?
                </div> */}
                <div className="text-md text-neutral-600">
                  <p>{item.textContent}<Link className="gap-2 text-xs text-blue-400" to={`/question/${item._id}`}> View</Link></p>
                  
                </div>
              </div>

              <div>
                <div className="flex flex-col justify-between text-slate-500">
                  <div className="flex space-x-4 md:space-x-8 ">
                    {pluralize("Answer", item.answer.length, true)}
                    <br />
                    {pluralize("Vote", item.questionVote, true)}
                  </div>
                  <div className="text-xs text-slate-500 self-end md:hidden">
                    {moment(parseInt(item.createdAt)).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
