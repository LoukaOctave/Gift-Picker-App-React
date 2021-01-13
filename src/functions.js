import { eventTypes, formSelectPlaceholder } from "./data.js";

export function currentDateToYyyyMmDd() {
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    if (mm < 10) { mm = `0${mm}` }
    var dd = date.getDate();
    return `${yyyy}-${mm}-${dd}`; 
}

export function typeValueToName(typeValue) {
    var typeName;
    eventTypes.forEach(eventType => {
        if(eventType.value === typeValue) {
            typeName = eventType.name;
        }
    })
    return typeName;
}

export function checkForm(state) {
    let emptyFields = 0;
    let passCheck = true;
    let warning;
    for (const [key, value] of Object.entries(state)) { // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        if (value === "" && key !== "status") {
            if (key === "start" || key === "end") {
                if (state.allDay === false) { // Start and end are only counted when allDay isn't checked
                    warning = `${key} time`;
                    emptyFields++;
                }
            }
            else {
                warning = key; 
                emptyFields++;
            }
        }
        if (key === "type" && value === formSelectPlaceholder) { // Type needs to be something else than "Choose your option" (=formSelectPlaceholder)
            warning = key;
            emptyFields++;
        }
    }
    if (emptyFields > 0) {
        passCheck = false;
        warning = `Please pick a ${warning}`;
        if (emptyFields > 1) { warning = "Please fill in all the fields" }
    } else if (state.allDay === false) {
        let start = state.start.split(":");
        let end = state.end.split(":");
        if (start[0] === end[0]) { // Start hour equal to end hour
            if(start[1] >= end[1]) { // Start minute greater than or equal to end minute
                passCheck = false;
                warning = "End time must be greater than start time";
            }
        }
        else if (start[0] > end[0]) { // Start hour greater than end hour
            passCheck = false;
            warning = "End time must be greater than start time";
        }
    }
    return {boolean: passCheck, message: warning};
}