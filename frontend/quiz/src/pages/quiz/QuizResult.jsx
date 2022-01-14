import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../../components/header/Header';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";


const QuizResultPage = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quantity_questions, score_percentage, correct_answers, start_at, end_at, quiz_name } = state;

  const millisecondsToMinutesAndSeconds = () => {
    const dateStart = new Date(start_at);
    const dateEnd = new Date(end_at);
    const milliseconds = dateEnd - dateStart
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return (minutes < 10 ? '0' : '')
      + minutes
      + ":"
      + (seconds < 10 ? '0' : '') + seconds;

  }

  /** 
   * Score 0-2: Clueless. Don’t be discouraged! Learn some more about this topic, and come back to try again!
   * Score 3-5: Beginner. This is the level most players end up with after answering this quiz for the first time. Learn some more about this topic and come back to try again!
   * Score 5-8: Confident: This is the level players are getting pro! Continue your progress and rock it!
   * Score 8-10: Expert: This is the highest level achievable! Thanks for being awesome as you are
  */
  const getExpertiseLevel = () => {
    let expertiseLevel = 'Clueless. Don’t be discouraged! Learn some more about this topic, and come back to try again!';
    if (score_percentage >= 80) {
      expertiseLevel = 'Expert: This is the highest level achievable! Thanks for being awesome as you are';
    } else if (score_percentage >= 50) {
      expertiseLevel = 'Confident: This is the level players are getting pro! Continue your progress and rock it!';
    } else if (score_percentage >= 30) {
      expertiseLevel = 'Beginner. This is the level most players end up with after answering this quiz for the first time. Learn some more about this topic and come back to try again!';
    }

    return expertiseLevel;

  }

  const shareUri = "http://blanked.quiz.com"
  const shareMessage = `I scored ${score_percentage}% on ${quiz_name} quiz. Come learn and have fun with us`;

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <div id="quiz-result-page" className="content-margin">
      <Header title="Result" />
      <div id="quiz-result-wrapper">
        <div className="quiz-result-item">
          <h5 className="title">Time</h5>
          <p>You spend <strong>{millisecondsToMinutesAndSeconds()}</strong> to take the quiz</p>
        </div>
        <div className="quiz-result-item">
          <h5 className="title">Level</h5>
          <p>{getExpertiseLevel()}</p>
        </div>
        <div className="quiz-result-item">
          <h5 className="title">Answers</h5>
          <p>The quiz has {quantity_questions} question(s) and you got <strong>{correct_answers}</strong> correct answers</p>
        </div>
      </div>
      <div id="quiz-result-actions" className="content-center">
        <button className="btn" onClick={handleDashboard}>Go back Dashboard</button>
        <div>
          <FacebookShareButton
            url={shareUri}
            quote={shareMessage}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUri}
            title={shareMessage}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUri}
            title={shareMessage}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}

export default QuizResultPage