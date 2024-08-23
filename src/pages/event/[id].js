import { useEffect, useState } from 'react';

import styles from '@/styles/event.module.css';
import Layout from '@/components/layout.js';

import LoadingScreen from '@/components/LoadingScreen';
import { getEventById } from '@/lib/vercel_sql/events';
import { getAttendance } from '@/lib/vercel_sql/attending_event'
import AttendanceBlock from '@/components/AttendanceBlock.js';
import { DatetimeLine, LocationLine, MaxSpotsLine, MaxMenLine } from '@/components/EventInfo.js';
import { AttendanceModal, TabWidget, AttendeesList } from '@/components/AttendanceModal.js'


export default function Event({ event, attendance, attendanceCounts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Modal logic
    const openAttendanceModal = () => {
        setIsModalOpen(true);
    };

    const closeAttendanceModal = () => {
        setIsModalOpen(false);
    };

    // Ensure LoadingScreen is visible during navigation
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1);

        return () => clearTimeout(timer);
    }, []);

    // Ensure datetimes are in Date format
    event.datetime = new Date(event.datetime_string);
    attendance.forEach(item => {
        item.datetime = new Date(item.datetime_string);
    })

    // Return page JSX
    return (
        <>
        {loading ? <LoadingScreen /> : null}
        <Layout>
            {/* Modal */}
            {attendance && (
                <AttendanceModal isOpen={isModalOpen} onClose={closeAttendanceModal}>
                    <TabWidget contents={[
                        <AttendeesList attendance={attendance} keyword='attend' />,
                        <AttendeesList attendance={attendance} keyword='maybe' />,
                        <AttendeesList attendance={attendance} keyword={null} />,
                        <AttendeesList attendance={attendance} keyword='decline' />,
                    ]} />
                </AttendanceModal>
            )}

            {/* Event name */}
            <h1 className={styles.title}>{event.name}</h1>

            {/* Basic info */}
            <DatetimeLine datetime={event.datetime} />
            <LocationLine location={event.location} googleMapsLink={null} />
            <MaxSpotsLine current={0} max={event.max_spots} />
            {event.max_men !== null ? <MaxMenLine current={0} max={event.max_men} /> : null}

            <div style={{ height: '20px' }}></div>

            {/* Description */}
            <h3 style={{ margin: '0 0 5px 0' }}>Description</h3>
            <p>{event.description}</p>

            <div style={{ height: '20px' }}></div>

            {/* Attendance */}
            {attendanceCounts && (
                <AttendanceBlock attendanceCounts={attendanceCounts} openAttendanceModalFunction={openAttendanceModal} />
            )}

            <div style={{ height: '30px' }}></div>

            {/* Comments */}
            <h3>Comments</h3>
            <p>*Coming soon*</p>
        </Layout>
        </>
    );
}


export async function getServerSideProps(context) {
    const { id } = context.params;

    // Fetch event and attendance data on the server side
    const event = await getEventById(id);
    const attendance = await getAttendance(id);

    // Make sure event exists
    if (!event) {
        return {
            notFound: true,
        };
    }

    // Calculate attendance counts on the server side
    const attendanceCounts = {
        attend: 0,
        maybe: 0,
        decline: 0,
        null: 0
    };
    attendance.forEach(item => {
        const key = item.attending === null ? 'null' : item.attending;
        if (attendanceCounts.hasOwnProperty(key)) {
            attendanceCounts[key]++;
        }
    });

    // Pass the fetched data as props to the page component
    return {
        props: {
            event,
            attendance,
            attendanceCounts,
        },
    };
}
