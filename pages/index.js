// Path: pages\index.js

import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import { useAccessToken } from '../context/accessTokenContext';
import CounterComponent from '../components/Counter';
import TimeSeriesComponent from '../components/TimeSeries';
import LeaderboardComponent from '../components/LeaderBoard';

export default function Home() {
  const { accessToken, setAccessToken } = useAccessToken();

  const getAccessToken = async () => {
    const { data } = await axios.get('/api/token');

    setAccessToken(data.accessToken);
  };

  useEffect(() => {
    if (!accessToken) {
      getAccessToken();
      console.log('getting access token');
    }
  }, [accessToken]);

  return (
    <div>
      <nav>
        <div className='navbar-brand'>
          <Link href='/'>Propelify</Link>
        </div>
        <div className='navbar-menu'>
          <Link href='/features'>Features</Link>
          <Link href='/pricing'>Pricing</Link>
          <Link href='/about'>About</Link>
          <Link href='/contact'>Contact</Link>
        </div>
      </nav>
      <div className='container'>
        <div className='counter'>
          <CounterComponent />
        </div>

        <div className='timeseries'>
          <TimeSeriesComponent />
        </div>
        <div className='leaderboard'>
          <LeaderboardComponent />
        </div>
      </div>
    </div>
  );
}
