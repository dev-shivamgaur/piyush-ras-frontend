const Time = (time) => {
    const now = Date.now();
    const givenDate = new Date(time).getTime();
  
    const diff = now - givenDate;
  
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);
    const month = Math.floor(day / 30);
    const year = Math.floor(day / 365);
  
    if (sec < 60) return `${sec} sec ago`;
    if (min < 60) return `${min} min ago`;
    if (hour < 24) return `${hour} hour ago`;
    if (day < 30) return `${day} day ago`;
    if (month < 12) return `${month} month ago`;
  
    return `${year} year ago`;
  };

  export {
    Time,
  }