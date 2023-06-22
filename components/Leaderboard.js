// Path: components\Leaderboard.js

import { Leaderboard } from '@propeldata/react-leaderboard';
import { useAccessToken } from '../context/accessTokenContext';

function LeaderboardComponent() {
  const { accessToken } = useAccessToken();

  const queryOptions = {
    accessToken: accessToken,
    metric: 'sales',
    timeRange: {
      relative: 'TODAY',
      n: null,
    },
    granularity: 'DAY',
  };

  return (
    <>
      {accessToken ? (
        <Leaderboard query={queryOptions} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default LeaderboardComponent;
