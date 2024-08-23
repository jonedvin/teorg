import { useEffect, useState } from 'react';

import styles from '@/styles/new_event.module.css';
import Layout from '@/components/layout.js';

import { FaUserGroup, FaT, FaCalendarDay, FaLocationDot, FaAlignJustify, FaRegCircle, FaRegCircleUser } from "react-icons/fa6";

import LoadingScreen from '@/components/LoadingScreen';
import { getProfile } from '@/lib/liff.js';
import { addEvent } from '@/lib/vercel_sql/events';
import { getGroupsForUser } from '@/lib/vercel_sql/groups';



export default function NewEvent({ groups }) {
    const [loading, setLoading] = useState(true);
    const [showMaxMen, setShowMaxMen] = useState(false);
    const [eventDetails, setEventDetails] = useState({
        groupId: null,
        title: null,
        datetime: null,
        location: null,
        description: null,
        maxSpots: null,
        maxMen: null
    });

    // Ensure LoadingScreen is visible during navigation
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1);

        return () => clearTimeout(timer);
    }, []);

    // Handle changes to the form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setShowMaxMen(checked);
        } else {
            setEventDetails({
                ...eventDetails,
                [name]: value,
            });
        }
    };

    // Handle submition of the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        alert(`
            handleSubmit!
            ${JSON.stringify(eventDetails)}
        `);
        return;


        const response = await addEvent(eventDetails);
        if (response.success) {
            alert('Successfully created event!');
        } else {
            alert('There was an error creating the event.');
        }
    };

    // Return page JSX
    return (
        <>
        {loading ? <LoadingScreen /> : null}
        <Layout>
            <h1 className={styles.title}>Create New Event</h1>
            <form onSubmit={handleSubmit} className={styles.form}>

                {/* group */}
                <div className={styles.formGroup}>
                    <label htmlFor="groupId">
                        <FaUserGroup className={styles.icon}/>
                        Group:
                    </label>
                    <select
                        id="groupId"
                        name="groupId"
                        value={eventDetails.groupId}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    >
                        <option value="">Select a group</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* title */}
                <div className={styles.formGroup}>
                    <label htmlFor="title">
                        <FaT className={styles.icon}/>
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventDetails.title}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                {/* datetime */}
                <div className={styles.formGroup}>
                    <label htmlFor="datetime">
                        <FaCalendarDay className={styles.icon}/>
                        Date and time:
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        value={eventDetails.datetime}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                {/* location */}
                <div className={styles.formGroup}>
                    <label htmlFor="location">
                        <FaLocationDot className={styles.icon}/>
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventDetails.location}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                {/* description */}
                <div className={styles.formGroup}>
                    <label htmlFor="description">
                        <FaAlignJustify className={styles.icon}/>
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                {/* maxSpots */}
                <div className={styles.formGroup}>
                    <label htmlFor="maxSpots">
                        <FaRegCircle className={styles.icon}/>
                        Maximum attendees:
                    </label>
                    <input
                        type="number"
                        id="maxSpots"
                        name="maxSpots"
                        value={eventDetails.maxSpots}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        required
                        className={styles.input}
                    />
                </div>

                {/* maxMen */}
                <div className={styles.formGroupCheckbox}>
                    <label htmlFor="showMaxMen">
                        <FaRegCircleUser className={styles.icon}/>
                        Limit men?
                    </label>
                    <input
                        type="checkbox"
                        id="showMaxMen"
                        name="showMaxMen"
                        checked={showMaxMen}
                        onChange={handleChange}
                        style={{ marginLeft: '8px' }}
                    />
                </div>
                {showMaxMen && (
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            id="maxMen"
                            name="maxMen"
                            value={eventDetails.maxMen}
                            onChange={handleChange}
                            min="0"
                            step="1"
                            required
                            className={styles.input}
                        />
                    </div>
                )}

                <button type="submit" className={styles.submitButton}>Save</button>
            </form>
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