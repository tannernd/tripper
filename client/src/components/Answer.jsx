import { useState, useEffect } from "react";
import moment from "moment";
import Avatar from "../components/Avatar";
import VoteButton from "../components/VoteButton";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_ANSWER_VOTE, DELETE_ANSWER_VOTE } from "../utils/mutations";
import { GET_SINGLE_ANSWER_VOTE } from "../utils/queries";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Answer(props) {
  const {
    answer,
    questionId,
    loggedIn,
    handleSingleQuestionLoad,
    refetch,
    user,
  } = props;

  const [answerVoted, setAnswerVoted] = useState();
  const [answerVote] = useMutation(SAVE_ANSWER_VOTE);
  const [deleteAnswerVote] = useMutation(DELETE_ANSWER_VOTE);

  const handleAnswerVote = async (questionId, answerId = null) => {
    const user = Auth.getProfile();

    try {
      const { data } = await answerVote({
        variables: {
          userId: user.data._id,
          questionId: questionId,
          answerId: answerId,
        },
      });
      setAnswerVoted(true);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAnswerVote = async (questionId, answerId = null) => {
    const user = Auth.getProfile();

    try {
      const { data } = await deleteAnswerVote({
        variables: {
          userId: user.data._id,
          questionId: questionId,
          answerId: answerId,
        },
      });
      setAnswerVoted(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const singleAnswerVote = useQuery(GET_SINGLE_ANSWER_VOTE, {
    variables: {
      userId: user.data?._id || "1",
      questionId: questionId,
      answerId: answer._id,
    },
  });
  useEffect(() => {
    if (singleAnswerVote.data) {
      setAnswerVoted(
        singleAnswerVote.data.getSingleAnswerVote.votes.length !== 0
      );
    }
  }, [singleAnswerVote.data]);

  return (
    <div className="rounded-xl border p-5 shadow-md w-full md:w-9/12 bg-white">
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <Avatar   
            avatarImg={answer.answerUserId.avatarImg || ''}
            username={answer.answerUserId.username || ''}/>
          <div className="flex items-center text-lg font-bold text-slate-700">
            <div className="text-lg font-bold text-slate-700">
              <Link to={`/profile/${answer.answerUserId.username}`}>{answer.answerUserId.username}</Link>
            </div>
            {answer.answerUserId.verified && <MdVerified class="ml-1" />}
            <div className="text-sm font-thin ml-2 text-slate-500">says:</div>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          {/* <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">Category</button> space for TAGS */}
          <div className="text-xs hidden md:flex text-neutral-500">
            {moment(parseInt(answer.createdAt)).fromNow()}
          </div>
        </div>
      </div>

      <div className="mt-4 mb-6">
        {/* <div className="mb-3 text-xl font-bold">Nulla sed leo tempus, feugiat velit vel, rhoncus neque?</div>  title ??? */}
        <div className="text-md text-neutral-600">{answer.textContent}</div>
      </div>

      <div>
        <div className="flex items-center justify-between text-slate-500">
          <div className="flex space-x-4 md:space-x-8">
            {singleAnswerVote.data !== undefined && (
              <VoteButton
                voted={answerVoted}
                handleVote={handleAnswerVote}
                handleDeleteVote={handleDeleteAnswerVote}
                voteCount={answer.answerVote}
                loggedIn={loggedIn}
                questionId={questionId}
                answerId={answer._id}
              />
            )}
          </div>
          <div className="text-xs text-neutral-500 self-end md:hidden">
            {moment(parseInt(answer.createdAt)).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
}
