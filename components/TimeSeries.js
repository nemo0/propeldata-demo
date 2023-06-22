// Path: components\TimeSeries.js

import { TimeSeries } from '@propeldata/react-time-series';
import { useAccessToken } from '../context/accessTokenContext';

function TimeSeriesComponent() {
  const { accessToken } = useAccessToken();

  const queryOptions = {
    accessToken: accessToken,
    metric: 'sales',
    timeRange: {
      relative: 'LAST_N_DAYS',
      n: 30,
    },
    granularity: 'DAY',
  };

  return (
    <div>
      {accessToken ? (
        <TimeSeries query={queryOptions} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default TimeSeriesComponent;
