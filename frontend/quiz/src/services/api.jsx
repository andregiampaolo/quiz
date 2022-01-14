import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const createUser = async (email, username, password) => {
  return await api.post('/account/register/', { email, username, password });
}

export const createSession = async (username, password) => {
  return await api.post('/token/', { username, password });
}

export const retrieveQuizzes = async () => {
  return await api.get('/quiz?fields=id,name,topic');
}

export const retrieveQuizWithQuestions = async (quizId) => {
  return await api.get(`/quiz/${quizId}/`);
}

export const startQuizAttempt = async (quizId) => {
  return await api.post(`/attempt/`, { "quiz": quizId });
}

export const finishQuizAttempt = async (attemptId, formData) => {
  return await api.patch(`/attempt/${attemptId}/finish/`, { "answers": formData });
}

export const retrieveRanking = async () => {
  return await api.get('/ranking/');
}

