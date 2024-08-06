import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
  query GetQuestion {
    getQuestion {
      _id
      answer {
        _id
      }
      createdAt
      questionVote
      textContent
      userId {
        username
        verified
        avatarImg
      }
    }
  }
`;
export const GET_SINGLE_QUESTION = gql`
  query GetSingleQuestion($questionId: String!) {
    getSingleQuestion(questionId: $questionId) {
      _id
      answer {
        _id
        answerVote
        createdAt
        textContent
        answerUserId {
          username
          verified
          avatarImg
        }
      }
      createdAt
      questionVote
      textContent
      userId {
        username
        verified
        avatarImg
      }
    }
  }
`;

export const GET_SINGLE_QUESTION_VOTE = gql`
query GetSingleQuestionVote($questionId: String!, $userId: String!) {
  getSingleQuestionVote(questionId: $questionId, userId: $userId) {
    votes {
      userId
    }
  }
}
`

export const GET_SINGLE_ANSWER_VOTE = gql`
query GetSingleAnswerVote($questionId: String!, $answerId: String!, $userId: String!) {
  getSingleAnswerVote(questionId: $questionId, answerId: $answerId, userId: $userId) {
    votes {
      userId
    }
  }
}
`
export const GET_USER = gql`
query GetUser($username: String!) {
  getUser(username: $username) {
    _id
    avatarImg
    bio
    email
    username
    verified
  }
}
`