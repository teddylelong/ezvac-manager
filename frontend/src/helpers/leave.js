import { isSameDay, addDays } from "date-fns";

export const countLeaveDays = (date1, date2, excludedDates = []) => {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the total number of days between the two dates
  let totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );

  let currentDay = new Date(startDate);
  let excludedDaysCount = 0;

  while (currentDay <= endDate) {
    const dayToCheck = new Date(currentDay);
    const isExcluded = excludedDates.some((excludedDate) =>
      isSameDay(dayToCheck, new Date(excludedDate))
    );

    if (isExcluded) {
      excludedDaysCount++;
    }

    currentDay = addDays(currentDay, 1);
  }

  console.log(excludedDates, totalDays, excludedDaysCount);

  return totalDays - excludedDaysCount;
};
