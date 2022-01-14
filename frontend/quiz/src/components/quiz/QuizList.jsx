import React, { useEffect, useState } from 'react';
import { retrieveQuizzes } from '../../services/api';
import QuizItem from './QuizItem';
import './style.css';

const QuizList = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    (async () => {
      const quizzes = await retrieveQuizzes();
      setQuizzes(quizzes.data);
      setIsLoading(false);
    })();

  }, []);

  return (
    <div>
      <h1 className="title">Quizzes</h1>
      {isLoading ? (<div className="loading">Loading...</div>) : (
        <div id="quizzes-wrapper">
          {quizzes.map((quiz) => (<QuizItem key={quiz.id} id={quiz.id} name={quiz.name} topic={quiz.topic.name} />))}
        </div>
      )}
    </div>
  );
}

export default QuizList