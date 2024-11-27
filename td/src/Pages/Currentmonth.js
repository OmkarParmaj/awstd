// currentMonth.js

const getCurrentMonth = () => {
    // Get the current date
    const now = new Date();
  
    // Array of month names
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Get the current month index
    const currentMonthIndex = now.getMonth();
  
    // Get the current month name
    return months[currentMonthIndex];
  };
  
  export default getCurrentMonth;
  