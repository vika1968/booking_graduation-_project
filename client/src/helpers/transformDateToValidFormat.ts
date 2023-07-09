import { format, parse } from 'date-fns';
import { DateRangeInterface } from './dateRange';

export const transformDate = (date: Date) => { 
    const parsedDate = parse(date.toString(), 'dd/MM/yyyy HH:mm:ss', new Date());
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();
    const newDate = month + '/'+ day + '/' + year + ' 00:00:00'    
  
    return newDate
 };

 export const formatDatesToString  = (dates: DateRangeInterface[]) => {
  const formattedDates = dates.map((date) => ({
  startDate: format(date.startDate, "dd/MM/yyyy HH:mm:ss"),   
  endDate: date.startDate.getDate() !== date.endDate.getDate() ? format(date.endDate, "dd/MM/yyyy HH:mm:ss") : format(date.endDate.setDate(date.endDate.getDate() + 1), "dd/MM/yyyy HH:mm:ss"),
  }));
  
  return formattedDates
}

