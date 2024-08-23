import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '../styles/home.module.css';
import Layout from '../components/layout.js';

import LoadingScreen from '../components/LoadingScreen';
import EventsList from '../components/EventsList.js'
import { getProfile } from '../lib/liff.js';
import { getEventsForUser } from '../lib/vercel_sql/events.js';



export default function Home({ profile, events }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState('upcoming');

  // Ensure LoadingScreen is visible during navigation
  const handleNavigate = (url) => {
    setLoading(true);
    setTimeout(() => {
      router.push(url);
    }, 1);
  };

  // Ensure datetimes are in Date format
  events.forEach(event => {
    event.datetime = new Date(event.datetime_string);
  })

  // Filter and sort events
  const now = new Date();
  const filteredEvents = events
    .filter(event => {
      const eventDate = new Date(event.datetime);
      return timePeriod === 'upcoming' ? eventDate >= now : eventDate < now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);
      return timePeriod === 'upcoming' ? dateA - dateB : dateB - dateA;
    });

  // Time period event handler
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  // Return page JSX
  return (
    <div>
      <Layout>

        {/* New event and time select */}
        <div className="horizonal_container_wide">
          <div className={styles.button_group}>
            <button onClick={() => handleNavigate(`/event/new`)}>New Event</button>
            <button>My groups</button>
          </div>
          <select name="time_period" id="time_period" onChange={handleTimePeriodChange}>
            <option value="upcoming">Upcoming</option>
            <option value="previous">Previous</option>
          </select>
        </div>

        {/* Events */}
        <EventsList events={filteredEvents} handleNavigate={handleNavigate}></EventsList>

        {/* Profile */}
        <h2>getProfile:</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

      </Layout>

      {loading && <LoadingScreen />} {/* Ensure LoadingScreen is visible during navigation */}
    </div>
  );
}



export async function getServerSideProps(context) {
  const profile = await getProfile();
  const events = await getEventsForUser(profile.userId);

  // Pass the fetched data as props to the page component
  return {
      props: {
        profile,
        events,
      },
  };
}