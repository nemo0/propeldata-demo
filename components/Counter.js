// Path: components\Counter.js

import { Counter } from '@propeldata/react-counter';
import { useAccessToken } from '../context/accessTokenContext';

function CounterComponent() {
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

  const styles = {
    font: {
      size: '24px',
      weight: 'bold',
      color: '#000000',
      family: 'Arial',
    },
  };

  return (
    <>
      {accessToken ? (
        <Counter query={queryOptions} styles={styles} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default CounterComponent;
