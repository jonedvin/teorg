import { useState } from 'react';
import {FaCircleCheck, FaCircleQuestion, FaCommentSlash, FaCircleXmark} from 'react-icons/fa6';

import styles from '../styles/attendance_block.module.css';


export default function AttendanceBlock({attendanceCounts, openAttendanceModalFunction}) {
    const [attendButtonIsDisabled, setAttendButtonIsDisabled] = useState(false);
    const [maybeButtonIsDisabled, setMaybeButtonIsDisabled] = useState(false);
    const [declineButtonIsDisabled, setDeclineButtonIsDisabled] = useState(false);

    const handleAttendClick = () => {
        console.log("AttendButton clicked")
        setAttendButtonIsDisabled(true);
        setMaybeButtonIsDisabled(false);
        setDeclineButtonIsDisabled(false);
    };

    const handleMaybeClick = () => {
        console.log("MaybeButton clicked")
        setAttendButtonIsDisabled(false);
        setMaybeButtonIsDisabled(true);
        setDeclineButtonIsDisabled(false);
    };

    const handleDeclineClick = () => {
        console.log("DeclineButton clicked")
        setAttendButtonIsDisabled(false);
        setMaybeButtonIsDisabled(false);
        setDeclineButtonIsDisabled(true);
    };

    return (
        <div style={{margin: '0', padding: '0'}}>
            <h3 style={{margin: '0 0 5px 0'}}>Attendance</h3>
            <div className={styles.horizonal_container_wide} style={{margin: '0', padding: '0'}}>
                <button onClick={handleAttendClick} disabled={attendButtonIsDisabled} className={styles.attendButton}>Attend</button>
                <button onClick={handleMaybeClick} disabled={maybeButtonIsDisabled} className={styles.maybeButton}>Maybe</button>
                <button onClick={handleDeclineClick} disabled={declineButtonIsDisabled} className={styles.declineButton}>Decline</button>
            </div>

            <button className={styles.countButton} onClick={openAttendanceModalFunction}>
                <div className="horizonal_container_left">
                    <FaCircleCheck style={{ color: '#06c755', fontSize: '24px', padding: '0 10px 0 0' }}/>
                    <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                        {attendanceCounts['attend']} attending
                    </p>
                </div>
                <div className="horizonal_container_left">
                    <FaCircleQuestion style={{ color: '#f0c818', fontSize: '24px', padding: '0 10px 0 0' }}/>
                    <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                        {attendanceCounts['maybe']} maybe
                    </p>
                </div>
                <div className="horizonal_container_left">
                    <FaCircleXmark style={{ color: '#d9564a', fontSize: '24px', padding: '0 10px 0 0' }}/>
                    <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                        {attendanceCounts['decline']} declined
                    </p>
                </div>
                <div className="horizonal_container_left">
                    <FaCommentSlash style={{ color: '#7a7571', fontSize: '24px', padding: '0 10px 0 0' }}/>
                    <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                        {attendanceCounts[null]} unanswered
                    </p>
                </div>
            </button>
        </div>
    );
}
