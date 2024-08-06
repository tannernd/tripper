import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      username
    }
  }
}
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_QUESTION = gql`
mutation SaveQuestion($userId: String!, $textContent: String!) {
  saveQuestion(userId: $userId, textContent: $textContent) {
    _id
    createdAt
    questionVote
    textContent
  }
}
`
export const SAVE_ANSWER = gql`
mutation SaveAnswer($userId: ID!, $questionId: ID!, $textContent: String!) {
  saveAnswer(userId: $userId, questionId: $questionId, textContent: $textContent) {
    _id
    answer {
      _id
      createdAt
      answerVote
      textContent
    }
  }
}
`


export const SAVE_QUESTION_VOTE = gql`
mutation SaveQuestionVote($questionId: String!, $userId: String!) {
  saveQuestionVote(questionId: $questionId, userId: $userId) {
    _id
    votes {
      userId
    }
  }
}
`

export const DELETE_QUESTION_VOTE = gql`
mutation DeleteQuestionVote($questionId: String!, $userId: String!) {
  deleteQuestionVote(questionId: $questionId, userId: $userId) {
    _id
    votes {
      userId
    }
  }
}
`

export const SAVE_ANSWER_VOTE = gql`
mutation SaveAnswerVote($questionId: String!, $answerId: String!, $userId: String!) {
  saveAnswerVote(questionId: $questionId, answerId: $answerId, userId: $userId) {
    answer {
      answerVote
      votes {
        userId
      }
    }
  }
}
`

export const DELETE_ANSWER_VOTE = gql`
mutation DeleteAnswerVote($questionId: String!, $userId: String!, $answerId: String!) {
  deleteAnswerVote(questionId: $questionId, userId: $userId, answerId: $answerId) {
    answer {
      answerVote
      votes {
        userId
      }
    }
  }
}
`

export const SAVE_USER_INFO = gql`
mutation SaveUserInfo($userId: String!, $username: String, $email: String, $bio: String, $avatarImg: String) {
  saveUserInfo(userId: $userId, username: $username, email: $email, bio: $bio, avatarImg: $avatarImg) {
    _id
    avatarImg
    bio
    email
    username
    verified
  }
}
`

export const UPLOAD_FILE = gql`
mutation UploadFile($file: Upload!, $userId: String!) {
  uploadFile(file: $file, userId: $userId ) {
    filename
    mimetype
  }
}
`
