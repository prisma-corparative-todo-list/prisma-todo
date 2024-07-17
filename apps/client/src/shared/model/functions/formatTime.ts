

 export function getWeedayMonthAndDay(date: Date) : string {
    if(!date) return ""

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',          
    };

    const formattedDate = date.toLocaleDateString('en-US', options);  

    return formattedDate;
  }

 export function getWeekday(date: Date) : string {
    return new Date(date).toLocaleDateString( "en-US" ,{ weekday: 'long' })
  }