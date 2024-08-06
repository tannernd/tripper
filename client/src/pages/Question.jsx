import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import QuestionComp from "../components/QuestionComp";

import Loading from "../components/Loading";

import { GET_SINGLE_QUESTION, 
  GET_SINGLE_QUESTION_VOTE} from "../utils/queries";
import { SAVE_QUESTION_VOTE, 
  DELETE_QUESTION_VOTE, 
   } from "../utils/mutations";
import Auth from "../utils/auth";

const Question = () => {
  const [questionVoted, setQuestionVoted] = useState();
  const {id:questionId} = useParams("id");
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  let user = {};
  let loggedIn = false;
  if (token) {
    user = Auth.getProfile();
    loggedIn = true;
    };
 
  
  const singleQuestionVote = useQuery(GET_SINGLE_QUESTION_VOTE, {
    variables:{userId:user.data?._id || '1',questionId: questionId  }})
    useEffect(() => {
      if (singleQuestionVote.data) {
        setQuestionVoted(singleQuestionVote.data.getSingleQuestionVote.votes.length !== 0);
      }
    }, [singleQuestionVote.data]); 
  
 
    const { loading, data, refetch } = useQuery(GET_SINGLE_QUESTION, {
      variables: { questionId: questionId },
    });
    const question = data?.getSingleQuestion || [];
 
  
  
  const [questionVote] = useMutation(SAVE_QUESTION_VOTE, {
    refetchQueries: [
      {
        query: GET_SINGLE_QUESTION,
        variables: { questionId: questionId },        
      }
    ]
  });
  const [deleteQuestionVote ] = useMutation(DELETE_QUESTION_VOTE, {
    refetchQueries: [
      {
        query: GET_SINGLE_QUESTION,
        variables: { questionId: questionId },        
      }
    ]
  });
  if (loading || singleQuestionVote.loading) {
    return (
      <Loading/>
      )
  }
  const  handleQuestionVote = async (questionId, answerId = null) => {
    const user = Auth.getProfile();
    
    try {
      const { data } = await questionVote({ variables:{userId:user.data._id, questionId: questionId}},
      );
      setQuestionVoted(true);
    } catch (err) {
      console.error(err);
    }
  }

  const  handleDeleteQuestionVote = async (questionId, answerId = null) => {
    const user = Auth.getProfile();
    
    try {
      const { data } = await deleteQuestionVote({ variables:{userId:user.data._id, questionId: questionId}},
      );
      setQuestionVoted(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <QuestionComp
    question={question}
    handleQuestionVote={handleQuestionVote}
    handleDeleteQuestionVote={handleDeleteQuestionVote}
    questionVoted={questionVoted}
    loggedIn={loggedIn}
    singleQuestionVote={singleQuestionVote}
    user={user}
    refetch={refetch}
    />
  );
};

export default Question;
