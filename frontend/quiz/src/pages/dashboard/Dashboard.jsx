import React from 'react';
import Header from '../../components/header/Header';
import RankingList from '../../components/ranking/RankingList';
import QuizList from '../../components/quiz/QuizList';

const DashboardPage = () => {

  return (
    <div id="dashboard-page" className="content-margin">
      <Header title="Dashboard" />
      <QuizList />
      <RankingList />
    </div >
  );
}

export default DashboardPage