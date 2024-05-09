



export const changeDateFormat=(date)=>{
    let a = new Date(date* 1000);
    let b = new Date(date* 1000).toISOString();
    let month = a.toLocaleString('default', {month: 'short'})
    b = b.split('T')[0]
    let finalDate = b.split('-')
    finalDate = finalDate[2] + " " + month 
    return finalDate
    
  } 
  export const  msToTime=(b)=> {
    b = new Date(b * 1000).getTime()
    let duration = b - new Date().getTime();
    console.log(duration, "duration")
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}