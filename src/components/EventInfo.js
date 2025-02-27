import {FaCalendarDay, FaLocationDot, FaRegCircle, FaRegCircleUser} from 'react-icons/fa6';

import styles from '../styles/event_lines.module.css';

import { prettifyTime } from '../lib/time';


export function DatetimeLine( {datetime} ) {
    return (
        <button className={styles.lineButton} disabled={true}>
            <div className="horizonal_container_left">
                <FaCalendarDay style={{ color: '#06c755', fontSize: '24px', padding: '0 10px 0 0' }}/>
                <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                    {prettifyTime(datetime)}
                </p>
            </div>
        </button>
    );
}

export function LocationLine( {location, googleMapsLink} ) {
    const disable = googleMapsLink === null ? true : false
    return (
        <button className={styles.lineButton} disabled={disable}>
            <div className="horizonal_container_left">
                <FaLocationDot style={{ color: '#06c755', fontSize: '24px', padding: '0 10px 0 0' }}/>
                <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                    {location}
                </p>
            </div>
        </button>
    );
}

export function MaxSpotsLine( {current, max} ) {
    return (
        <button className={styles.lineButton} disabled={true}>
            <div className="horizonal_container_left">
                <FaRegCircle style={{ color: '#06c755', fontSize: '24px', padding: '0 10px 0 0' }}/>
                <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                    {current}/{max} spots taken
                </p>
            </div>
        </button>
    );
}

export function MaxMenLine( {current, max} ) {
    return (
        <button className={styles.lineButton} disabled={true}>
            <div className="horizonal_container_left">
                <FaRegCircleUser style={{ color: '#06c755', fontSize: '24px', padding: '0 10px 0 0' }}/>
                <p style={{margin: '0', padding: '5px', fontSize: '1rem'}}>
                    {current}/{max} {"men's spots taken"}
                </p>
            </div>
        </button>
    );
}
