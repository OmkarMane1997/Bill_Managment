// Date and Time Common code  
const TodayDate = new Date();
const dateOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};
export const formattedDate = TodayDate.toLocaleString("en-US", dateOptions);
export const formattedTime = TodayDate.toLocaleTimeString("en-US", timeOptions);

