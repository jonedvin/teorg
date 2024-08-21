import { format } from 'date-fns';

export function prettifyTime(datetime) {
    return format(datetime, "EEEE, MMMM d 'at' HH:mm");
}
