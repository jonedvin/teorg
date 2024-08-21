import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '../styles/home.module.css';

import { prettifyTime } from '../lib/time';


export default function EventsList( {events, handleNavigate} ) {
    let lastMonth = null;

    const eventComponents = events.map((event) => {
        const eventMonth = new Date(event.datetime).toLocaleString('default', { month: 'long' });

        let components = [];
        if (eventMonth !== lastMonth) {
            components.push(
                <EventSpacer key={`spacer-${eventMonth}`} monthName={eventMonth} />
            );
            lastMonth = eventMonth;
        }
        components.push(
            <div key={event.id}>
                <EventButton event={event} handleNavigate={handleNavigate}/>
            </div>
        );

        return components;
    });

    return (
        <div className={styles.event_container}>
            {eventComponents.flat()}
        </div>
    );
}


function EventButton({ event, handleNavigate }) {

    const handleClick = async () => {
        handleNavigate(`/event/${event.id}`);
    };

    return (
        <button className={styles.event_button} onClick={handleClick}>
            <h4 style={{ margin: '0 0 10px 0' }}>{event.groupName}</h4>
            <h2>{event.name}</h2>
            <h3>{prettifyTime(event.datetime)}</h3>
        </button>
    );
}


function EventSpacer({ monthName }) {
    return (
        <div>
            <h2></h2>
            <h3>{monthName}</h3>
        </div>
    );
}
