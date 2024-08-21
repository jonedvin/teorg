import { useState, useEffect, useRef } from 'react';

import styles from '../styles/attendance_modal.module.css';


export function AttendanceModal( { isOpen, onClose, children } ) {

  const modalRef = useRef(null);

  useEffect(() => {
    // Function to handle click outside of modal
    const handleClickOutside = (event) => {
      console.log("Close modal")
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener on unmount or when modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={modalRef}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}


export function TabWidget( {contents} ) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Attending', 'Maybe', 'Declined', 'Unanswered'];
  const tabColors = ['#06c755', '#f0c818', '#d9564a', '#7a7571']

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
            onClick={() => setActiveTab(index)}
            style={{ color: activeTab === index ? tabColors[index] : undefined }} // Apply color for active tab
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {contents[activeTab]}
      </div>
    </div>
  );
};


export function AttendeesList( {attendance, keyword }) {
  if (!attendance) {
    return null;
  }

  const users = attendance
    .filter(user => user.attending === keyword)
    .map((user, index) => (
      <p style={{ margin: '0 0 0 0' }} key={index}>{user.userName}</p>
    ));

  return (
    <div className={styles.attendees_list_container}>
      {users}
    </div>
  )
}