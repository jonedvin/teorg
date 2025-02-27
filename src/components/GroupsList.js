import styles from '@/styles/groups.module.css';


export function GroupsList( {groups }) {
    if (!groups) {
        return null;
    }

    const groups_elements = groups
        .map((group, index) => (
            <p style={{ margin: '0 0 0 0' }} key={index}>{group.name}</p>
        ));

    return (
        <div className={styles.groups_list_container}>
            {groups_elements}
        </div>
    )
}
