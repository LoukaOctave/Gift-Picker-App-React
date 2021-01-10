export function currentDateToYyyyMmDd() {
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    if (mm < 10) { mm = `0${mm}` }
    var dd = date.getDate();
    return `${yyyy}-${mm}-${dd}`; 
} 