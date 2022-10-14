import moment from "moment";

export const getTotalTime = (time: string) => moment(time).format('YYYY-MM-DD HH:mm:ss');

export const getTimeToNow = (time: string) => moment(time).toNow()