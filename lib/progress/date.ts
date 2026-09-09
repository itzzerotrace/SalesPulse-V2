export function getCaliforniaDate() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());

  const year =
    parts.find((part) => part.type === "year")?.value || "2026";

  const month =
    parts.find((part) => part.type === "month")?.value || "01";

  const day =
    parts.find((part) => part.type === "day")?.value || "01";

  return `${year}-${month}-${day}`;
}

export function getMonthInfo(dateString?: string) {
  const value = dateString || getCaliforniaDate();

  const [yearString, monthString, dayString] =
    value.split("-");

  const year = Number(yearString);
  const monthIndex = Number(monthString) - 1;
  const day = Number(dayString);

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "America/Los_Angeles",
  }).format(new Date(Date.UTC(year, monthIndex, 1)));

  const daysInMonth =
    new Date(year, monthIndex + 1, 0).getDate();

  // Morning tracker: today is still available to make progress.
  const daysRemaining =
    Math.max(1, daysInMonth - day + 1);

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
