import React, { useEffect, useState } from 'react';
import { retrieveRanking } from '../../services/api';
import RankingItem from './RankingItem';
import './style.css';

const RankingList = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    (async () => {
      const rankings = await retrieveRanking();
      setRankings(rankings.data);
      setIsLoading(false)
    })();

  }, []);

  return (
    <div className="horizontal-line-top">
      <h1 className="title">Ranking</h1>
      {isLoading ?
        (<div className="loading">Loading...</div>) : (
          <div id="ranking-wrapper">
            {Object.keys(rankings).map(ranking => (<RankingItem key={ranking} name={ranking} attempts={rankings[ranking]} />))}
          </div>
        )
      }
    </div>
  );
}

export default RankingList