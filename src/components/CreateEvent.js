import React from 'react';
import M from "materialize-css";
import { eventTypes, formSelectPlaceholder } from "../data.js";
import firebase from "./Firebase.js";

class CreateEvent extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            allDay: false,
            date: "",
            start: "",
            end: "",
            type: formSelectPlaceholder,
            description: "",
            status: ""
        };
    }

    // Performs data checks
    checkForm() {
        let emptyFields = 0;
        let passCheck = true;
        let warning;
        for (const [key, value] of Object.entries(this.state)) { // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            if (value === "" && key !== "status") {
                if (key === "start" || key === "end") {
                    if (this.state.allDay === false) { // Start and end are only counted when allDay isn't checked
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
            warning = `Please pick a ${warning}`
            if (emptyFields > 1) { warning = "Please fill in all the fields" }
        } else if (this.state.allDay === false) {
            let start = this.state.start.split(":");
            let end = this.state.end.split(":");
            if (start[0] === end[0]) { // Start hour equal to end hour
                if(start[1] >= end[1]) { // Start minute greater than or equal to end minute
                    passCheck = false;
                    warning = "End time must be greater than start time";
                }
            }
            if (start[0] >= end[0]) {// Start hour greater than or equal to end hour
                passCheck = false;
                warning = "End time must be greater than start time";
            }
        }
        this.setState({
            status: warning
        });
        return passCheck;
    }

    // Resets the form to all of its original values
    resetState() {
        this.setState({
            title: "",
            allDay: false,
            date: "",
            start: "",
            end: "",
            type: formSelectPlaceholder, // Does not actually reset the select to this value. Look for fix.
            description: ""
        });
    }

    createEvent = e => {
        e.preventDefault();
        if (this.checkForm() === true) {
            firebase.firestore().collection("Events").add({
                title: this.state.title,
                allDay: this.state.allDay,
                date: this.state.date,
                start: this.state.start,
                end: this.state.end,
                type: this.state.type,
                description: this.state.description
            });
            this.setState({
                status: "Event created succesfully"
            });
            this.resetState();
        }
    }

    // Updates the state of the component according to changes brought to the form input fields
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Updates the state of the component according to changes brought to the form checkbox input field(s)
    updateAllDay = e => {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    componentDidMount() {
        var selects = document.querySelectorAll('select');
        var options = document.querySelectorAll('option');
        M.FormSelect.init(selects, options); // Initializes the MaterilizeCSS object
    }

    render() {
        const options = eventTypes.map((option) => {
            return (
                <option name={option.name}
                    key={option.name}
                    value={option.value}
                >
                    {option.name}
                </option>
            );
        });

        return (
            <div>
                <h2>Create Event</h2>
                <form onSubmit={this.createEvent}>
                    <input name="title" 
                        type="text" 
                        placeholder="Event title..."
                        onChange={this.updateInput}
                        value={this.state.title}
                    />
                    <div className="switch">
                        <label>
                        All Day?
                        <input name="allDay"
                            type="checkbox"
                            onChange={this.updateAllDay}
                            checked={this.state.allDay}
                        />
                        <span className="lever"></span>
                        </label>
                    </div>           
                    <input name="date"
                        type="date"
                        onChange={this.updateInput}
                        value={this.state.date}
                    />
                    <input name="start"
                        type="time"
                        onChange={this.updateInput}
                        value={this.state.start}
                        disabled={this.state.allDay ? true : false}
                    />
                    <input name="end"
                        type="time"
                        onChange={this.updateInput}
                        value={this.state.end}
                        disabled={this.state.allDay ? true : false}
                    />
                    <div className="input-field col s12">
                        <select name="type"
                            defaultValue={this.state.type}
                            onChange={this.updateInput}
                        >
                            <option value={this.state.type} disabled={true}>Choose your option</option>
                            {options}
                        </select>
                        <label>Type</label>
                    </div>
                    <input name="description"
                        type="text"
                        placeholder="Description..."
                        onChange={this.updateInput}
                        value={this.state.description}
                    />
                                    
                    <button type="submit">Submit</button>
                    <p className="status-message">{this.state.status}</p>
                </form>
            </div>
        );
    }
}

export default CreateEvent;