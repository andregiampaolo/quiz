import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { retrieveQuizWithQuestions, startQuizAttempt, finishQuizAttempt } from '../../services/api';
import './style.css';
import { useNavigate } from "react-router-dom";
import Header from '../../components/header/Header';


const QuizPage = (props) => {
  let valitedDiv = '';
  let params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [attempt, setAttempt] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, updateFormData] = useState([]);

  useEffect(() => {
    (async () => {
      const quiz = await retrieveQuizWithQuestions(params.id);
      setQuiz(quiz.data);
      setLoading(false);
    })();

    (async () => {
      const attempt = await startQuizAttempt(params.id);
      setAttempt(attempt.data);
    })();
  }, [params.id]);

  if (loading) {
    return <div className="loading">Carregando</div>
  }

  if (!isFormValid) {
    valitedDiv = (<div className="form-error">Answer all question</div>);
  }

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault()

    const questionsId = quiz.questions.map((question) => { return question.id.toString() });
    const questionsAnswered = Object.keys(formData);
    const questionsNotAnswered = questionsId.filter((question) => !questionsAnswered.includes(question));
    if (questionsNotAnswered.length > 0) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      const finishedQuiz = await finishQuizAttempt(attempt.id, formData)
      finishedQuiz.data['quiz_name'] = params.name;
      navigate('/quiz-result', { state: finishedQuiz.data })
    }
  };

  return (
    <div id="quiz-page" className="content-margin">
      <Header title="Quiz" />
      <div>
        <h1 className="title">{params.name}</h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="questions-wrapper">
            {quiz.questions.map((question, index) => (
              <div className="question-wrapper" key={question.id} id={"question-" + question.id}>
                <h4 className="sub-title">{index}. {question.question}</h4>
                {question.answers.map((answer) => (
                  <div key={answer.id}><input type="radio" name={question.id} value={answer.id} onChange={handleChange} />{answer.answer}</div>
                ))}
              </div>
            ))}
          </div>
          {valitedDiv}
          <div className="actions">
            <button className="btn" type="submit">Finish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizPage