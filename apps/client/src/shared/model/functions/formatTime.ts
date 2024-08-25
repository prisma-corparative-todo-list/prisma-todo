export function getWeedayMonthAndDay(date: Date): string {
  if (!date) return '';

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  return formattedDate;
}

export function getMonthAndDayAndTime(date: Date): string {
  if (!date) return '';

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  return formattedDate;
}

export function getHoursAndMinutes(date: Date): string {
  if (!date) return '';

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };


  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();

  const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedDate;
}

export function getWeekday(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
}
