// Path: components\TimeSeries.js

import { useEffect, useState } from 'react';
import { TimeSeries } from '@propeldata/react-time-series';
import { gql } from '@apollo/client';
import client from '../graphql/client';
import { useAccessToken } from '../context/accessTokenContext';

function TimeSeriesComponent() {
  const { accessToken } = useAccessToken();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (accessToken) {
      getSalesData();
    }
  }, [accessToken]);

  const getSalesData = async () => {
    try {
      const query = gql`
        query TimeSeriesQuery($metricId: ID!, $input: TimeSeriesInput!) {
          metric(id: $metricId) {
            timeSeries(input: $input) {
              labels
              values
            }
          }
        }
      `;

      const variables = {
        metricId: 'MET01GVS13BBD2TM2CFFE185JVJ2D',
        input: {
          granularity: 'DAY',
          timeRange: {
            relative: 'LAST_N_DAYS',
            n: 30,
          },
          filters: [],
        },
      };

      const { data } = await client(accessToken).query({
        query: query,
        variables: variables,
      });

      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
      setData(null);
    }
  };

  return (
    <div>
      {data ? (
        <TimeSeries
          labels={data?.metric?.timeSeries?.labels}
          values={data?.metric?.timeSeries?.values}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default TimeSeriesComponent;
