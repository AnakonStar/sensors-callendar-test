export function formaDate(dateString: string) {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hour, minute, second] = timePart.split(":");

  const start = new Date();
  const end = new Date();

  start.setDate(parseInt(day));
  start.setMonth(parseInt(month));
  start.setFullYear(parseInt(year));
  start.setHours(parseInt(hour));
  start.setMinutes(parseInt(minute));

  end.setDate(parseInt(day));
  end.setMonth(parseInt(month));
  end.setFullYear(parseInt(year));
  end.setHours(parseInt(hour));
  end.setMinutes(parseInt(minute) + 30);

  return { start, end };
}
