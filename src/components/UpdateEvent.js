import React, {useState, useEffect} from "react";
import M from "materialize-css";
import { useParams, Link } from "react-router-dom";
import { eventTypes } from "../data.js";
import { checkForm, typeValueToName } from "../functions.js";
import firebase from "./Firebase.js";

const UpdateEvent = () => {

    const [event, setEvent] = useState({
        id: "",
        title: "",
        allDay: false,
        date: "",
        start: "",
        end: "",
        type: "",
        description: "",
        fetched: false,
        found: false
    })

    useEffect(() => { // TODO: Fix this, because it keeps giving a warning
        fetchEvent();
        var selects = document.querySelectorAll('select');
        var options = document.querySelectorAll('option');
        M.FormSelect.init(selects, options); // Initializes the MaterilizeCSS object
    }, [])

    const docRef = firebase.firestore().collection("Events").doc(useParams().id);
    const fetchEvent = async() => {
        const response = docRef;
        await response.get()
        .then((doc) => {
            if (doc.exists) {
                setEvent({
                    id: doc.id,
                    title: doc.data().title,
                    allDay: doc.data().allDay,
                    date: doc.data().date,
                    start: doc.data().start,
                    end: doc.data().end,
                    type: doc.data().type,
                    description: doc.data().description,
                    fetched: true,
                    found: true
                })
            } else {
              // doc.data() will be undefined in this case
                setEvent({
                    fetched: true,
                    found: false,
                    errorMessage: "Event does not exist"
                })
            }
        }).catch((error) => {
            setEvent({
                fetched: true,
                found: false,
                errorMessage: `Error getting event data: ${error}`
            })
          });
    }

    //TODO: only activate button after 1 onchange has been triggered
    function updateEvent(e) {
        e.preventDefault();
        const checkResults = checkForm(event);
        if (checkResults.boolean === true) {
            firebase.firestore().collection("Events").add({
                title: event.title,
                allDay: event.allDay,
                date: event.date,
                start: event.start,
                end: event.end,
                type: event.type,
                description: event.description
            })
            .then(() => {
                    setEvent({ ...event, status: "Event updated succesfully" });
                    document.getElementById("back-button").click()
            }, (reject) => { setEvent({ ...event, status: reject }); })
        } else {
            setEvent({ ...event, status: checkResults.message });
        }
    }

    const updateInput = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
            status: ""
        });
    }

    const updateAllDay = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.checked,
            status: ""
        });
    }

    return (
        <div>
                <h2>Update Event</h2>
                <form onSubmit={updateEvent}>
                    <div>
                        <label>Title</label>
                        <input name="title" 
                            type="text" 
                            placeholder="Event title..."
                            onChange={updateInput}
                            value={event.title}
                        />
                    </div>
                    <div className="switch">
                        <label>
                        All Day?
                        <input name="allDay"
                            type="checkbox"
                            onChange={updateAllDay}
                            checked={event.allDay}
                        />
                        <span className="lever"></span>
                        </label>
                    </div>           
                    <div>
                        <label>Date</label>
                        <input name="date"
                            type="date"
                            onChange={updateInput}
                            value={event.date}
                        />
                    </div>
                    <div>
                        <label>Start time</label>
                        <input name="start"
                            type="time"
                            onChange={updateInput}
                            value={event.start}
                            disabled={event.allDay ? true : false}
                        />
                    </div>
                    <div>
                        <label>End time</label>
                        <input name="end"
                            type="time"
                            onChange={updateInput}
                            value={event.end}
                            disabled={event.allDay ? true : false}
                        />
                    </div>
                    <div>
                        <label>Type</label>
                        <select name="type"
                            defaultValue={event.type}
                            onChange={updateInput}
                        >
                            <option value={event.type} disabled={true}>{event.type}</option>
                            {// TODO: Fix selected value
                                eventTypes.map((option) => {
                                    return (
                                        <option name={option.name}
                                            key={option.name}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Description</label>
                        <input name="description"
                            type="text"
                            placeholder="Description..."
                            onChange={updateInput}
                            value={event.description}
                        />
                    </div> 
                    <button type="submit">Submit</button>
                    <p className="status-message">{event.status}</p>
                </form>
                <div>
                    <Link to={`/readEvent/${event.id}`} className="waves-effect waves-light btn"><i className="material-icons left">arrow_back_ios</i>Back</Link>
                </div>
            </div>
    );
};

export default UpdateEvent;

//TODO: Make "Go Back" button actually go back, and not route to a predetermined path.