import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const QuizItem = (props) => {
  const { id, name, topic } = props;
  return (
    <div className="quiz-item-wrapper" key={id}>
      <span className="quiz-item-topic">{topic}</span>
      <span className="quiz-item-link">{name}</span>
      <Link to={`/quiz/${id}/${name}`} className="btn" >
        Start
      </Link>
    </div>
  );
}

export default QuizItem