import { useEffect, useState } from 'react';

import styles from '@/styles/groups.module.css';
import Layout from '@/components/layout.js';

import LoadingScreen from '@/components/LoadingScreen';
import { getProfile } from '@/lib/liff.js';
import { getGroupsForUser } from '@/lib/vercel_sql/groups';
import { GroupsList } from '@/components/GroupsList';



export default function NewEvent({ groups }) {
    const [loading, setLoading] = useState(true);

    // Ensure LoadingScreen is visible during navigation
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1);

        return () => clearTimeout(timer);
    }, []);

    // Return page JSX
    return (
        <>
        {loading ? <LoadingScreen /> : null}
        <Layout>
            <button className='small_button'>Create new group</button>
            <h1 className={styles.title}>Your groups</h1>
            <GroupsList groups={groups} />
        </Layout>
        </>
    );
}



export async function getServerSideProps(context) {
    const profile = await getProfile();
    const groups = await getGroupsForUser(profile.userId);

    // Pass the fetched data as props to the page component
    return {
        props: {
          groups,
        },
    };
  }