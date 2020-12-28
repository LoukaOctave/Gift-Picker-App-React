import React from 'react';
import M from "materialize-css";
import { eventTypes } from "../data.js";
import db from "../App.js";

class CreateEvent extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            allDay: false,
            date: "",
            start: "",
            end: "",
            type: "",
            description: ""
        };
    }

    createEvent = e => {
        e.preventDefault();
        // Check if inputs are all non-empty
        // Add rule for AllDay events not needing start and end
        // Add rule where start can't be greater than end
        db.settings({
          timestampsInSnapshots: true
        });
        const userRef = db.collection("Events").add({
            title: this.state.title,
            allDay: this.state.allDay,
            date: this.state.date,
            start: this.state.start,
            end: this.state.end,
            type: this.state.type,
            description: this.state.description
        });  
        this.setState({ // Resets the form to all of its original values
            title: "",
            allDay: false,
            date: "",
            start: "",
            end: "",
            type: "",
            description: ""
        });
      };

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

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
        console.log("test");
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
                            defaultValue="Choose your option"
                            onChange={this.updateInput}
                        >
                            <option value="Choose your option" disabled={true}>Choose your option</option>
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
                </form>
            </div>
        );
    }
   }
export default CreateEvent;