import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './style.css';


const RankingItem = (props) => {
  const { name, attempts } = props;

  const { user } = useContext(AuthContext);

  return (
    <div className="ranking-item-wrapper">
      <h1 className="ranking-title">{name}</h1>
      <table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Points</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((data, index) => (
            <tr key={index} className={(user.username === data[0]) ? "hightligth" : ""}>
              <td>{index}</td>
              <td>{data[1]}</td>
              <td>{data[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingItem