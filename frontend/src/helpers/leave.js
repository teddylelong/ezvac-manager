export const countLeaveDays = (date1, date2) => {
  const differenceInTime =
    new Date(date2).getTime() - new Date(date1).getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};
