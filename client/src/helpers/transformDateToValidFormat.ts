import { parse } from 'date-fns';
export const transformDate = (date: Date) => { 
    const parsedDate = parse(date.toString(), 'dd/MM/yyyy HH:mm:ss', new Date());
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();
   // 11/07/2023 00:00:00'
    const newDate = month + '/'+ day + '/' + year + ' 00:00:00'    
  
   return newDate
 };
