// Path: components\Leaderboard.js

import { Leaderboard } from '@propeldata/react-leaderboard';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useAccessToken } from '../context/accessTokenContext';
import client from '../graphql/client';

function LeaderboardComponent() {
  const { accessToken } = useAccessToken();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (accessToken) {
      getLeaderboardData();
    }
  }, [accessToken]);

  const getLeaderboardData = async () => {
    try {
      const query = gql`
        query LeaderboardQuery($metricId: ID!, $input: LeaderboardInput!) {
          metric(id: $metricId) {
            leaderboard(input: $input) {
              headers
              rows
            }
          }
        }
      `;

      const variables = {
        metricId: 'MET01GVS13BBD2TM2CFFE185JVJ2D',
        input: {
          sort: 'DESC',
          timeRange: {
            relative: 'TODAY',
            n: null,
          },
          rowLimit: 10,
          dimensions: [
            {
              columnName: 'PRODUCT_CATEGORY',
            },
          ],
          filters: [],
        },
      };

      const { data } = await client(accessToken).query({
        query: query,
        variables: variables,
      });

      console.log(data);
      setValue(data);
    } catch (error) {
      setValue(null);
      console.log(error);
    }
  };

  return (
    <>
      {value ? (
        <Leaderboard rows={value.metric.leaderboard.rows} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default LeaderboardComponent;
