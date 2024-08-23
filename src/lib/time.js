import { format } from 'date-fns';

export function prettifyTime(datetime) {
    return format(datetime, "EEEE, MMMM d 'at' HH:mm");
}

export function getDatetimeDate({datetime}) {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0');
    const day = String(datetime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getDatetimeTime({datetime}) {
    const hours = String(datetime.getHours()).padStart(2, '0');
    const minutes = String(datetime.getMinutes()).padStart(2, '0');
    const seconds = String(datetime.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}