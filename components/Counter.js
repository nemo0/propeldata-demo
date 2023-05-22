// Path: components\Counter.js

import { Counter } from '@propeldata/react-counter';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useAccessToken } from '../context/accessTokenContext';
import client from '../graphql/client';

function CounterComponent() {
  const { accessToken } = useAccessToken();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (accessToken) {
      getCounterData();
    }
  }, [accessToken]);

  const getCounterData = async () => {
    try {
      const query = gql`
        query CounterQuery($metricId: ID!, $input: CounterInput!) {
          metric(id: $metricId) {
            counter(input: $input) {
              value
            }
          }
        }
      `;

      const variables = {
        metricId: 'MET01GVS13BBD2TM2CFFE185JVJ2D',
        input: {
          timeRange: {
            relative: 'TODAY',
            n: null,
          },
          filters: [],
        },
      };

      const { data } = await client(accessToken).query({
        query: query,
        variables: variables,
      });

      console.log(data);
      setValue(data.metric.counter.value);
    } catch (error) {
      setValue(null);
      console.log(error);
    }
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
      {value ? (
        <Counter value={value} styles={styles} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default CounterComponent;
