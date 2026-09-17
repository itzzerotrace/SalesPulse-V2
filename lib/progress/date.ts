export function getCaliforniaDate() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find(
    (part) => part.type === "year"
  )?.value;

  const month = parts.find(
    (part) => part.type === "month"
  )?.value;

  const day = parts.find(
    (part) => part.type === "day"
  )?.value;

  if (!year || !month || !day) {
    throw new Error(
      "Unable to determine current California date."
    );
  }

  return `${year}-${month}-${day}`;
}

export function getMonthInfo(
  dateString?: string
) {
  const value =
    dateString || getCaliforniaDate();

  const [
    yearString,
    monthString,
    dayString,
  ] = value.split("-");

  const year =
    Number(yearString);

  const monthNumber =
    Number(monthString);

  const monthIndex =
    monthNumber - 1;

  const day =
    Number(dayString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName =
    monthNames[monthIndex];

  if (
    !monthName ||
    !Number.isFinite(year) ||
    !Number.isFinite(day)
  ) {
    throw new Error(
      `Invalid date supplied to getMonthInfo: ${value}`
    );
  }

  const daysInMonth =
    new Date(
      Date.UTC(
        year,
        monthNumber,
        0
      )
    ).getUTCDate();

  const daysRemaining =
    Math.max(
      1,
      daysInMonth - day + 1
    );

  const monthStart =
    `${yearString}-${monthString}-01`;

  return {
    year,
    monthIndex,
    monthName,
    day,
    daysInMonth,
    daysRemaining,
    monthStart,
  };
}
