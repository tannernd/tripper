import VoteButton from "./VoteButton";
import UserAnswer from "./UserAnswer";
import Answer from "./Answer";
import moment from "moment";
import Avatar from "../components/Avatar";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

export default function QuestionComp(props) {
  const {
    question,
    handleQuestionVote,
    handleDeleteQuestionVote,
    questionVoted,
    loggedIn,
    singleQuestionVote,
    user,
    singleAnswerVoteHandler,
    handleSingleQuestionLoad,
    refetch,
  } = props;
  return (
    <div>
      <div className="flex items-center justify-center m-2">
        <div className="rounded-xl border p-5 shadow-md w-full md:w-9/12 bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <Avatar   
                        avatarImg={question.userId.avatarImg || ''}
                        username={question.userId.username || ''} />
              <div className="text-lg font-bold text-slate-700">
                <Link to={`/profile/${question.userId.username}`}>{question.userId.username}</Link>
              </div>
              {question.userId.verified && <MdVerified className="ml-1" />}
              <div className="text-sm font-thin text-slate-500">asks:</div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-xs hidden md:flex text-neutral-500">
                {moment(parseInt(question.createdAt)).fromNow()}
              </div>
            </div>
          </div>

          <div className="mt-4 mb-6">
            {/* <div className="mb-3 text-xl font-bold">Nulla sed leo tempus, feugiat velit vel, rhoncus neque?</div>  title ??? */}
            <div className="text-md text-neutral-600">
              {question.textContent}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex space-x-4 md:space-x-8">
                {singleQuestionVote.data !== undefined && (
                  <VoteButton
                    voted={questionVoted}
                    handleVote={handleQuestionVote}
                    handleDeleteVote={handleDeleteQuestionVote}
                    voteCount={question.questionVote}
                    loggedIn={loggedIn}
                    questionId={question._id}
                    answerId={null}
                    id={question._id}
                  />
                )}
              </div>
              <div className="text-xs text-neutral-500 self-end md:hidden">
                {moment(parseInt(question.createdAt)).fromNow()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loggedIn ? (
        <UserAnswer
          questionId={question._id}
          userId={user.data._id}
          refetch={refetch}
        />
      ) : (
        ""
      )}
      {question.answer.map((answer) => {
        return (
          <div
            key={answer._id}
            className="flex items-center justify-center m-2"
          >
            <Answer
              className="bg-gray-100"
              answer={answer}
              questionId={question._id}
              singleAnswerVoteHandler={singleAnswerVoteHandler}
              handleSingleQuestionLoad={handleSingleQuestionLoad}
              loggedIn={loggedIn}
              refetch={refetch}
              user={user}
            />
          </div>
        );
      })}
    </div>
  );
}
