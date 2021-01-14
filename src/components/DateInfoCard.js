import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import firebase from "./Firebase.js";

const DateInfoCard = () => {

    const [events, setEvents] = useState([]);

    const tempEvents = [];

    const docsRef = firebase.firestore().collection("Events");
    const fetchEvents = async() => {
        const response = docsRef;
        const data = await response.get();
        data.docs.forEach(event => {
            tempEvents.push({...event.data(), id: event.id});
        })
        setEvents([...tempEvents]);
    }

    useEffect(() => { // TODO: Fix this, because it keeps giving a warning
        fetchEvents();
    }, [])

    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{Date()}</span>
                        <p>{Date()}</p>
                    </div>
                    <div className="card-action">
                        <ul>
                            {events.map(event => (<li key={event.id}><Link to={`/readEvent/${event.id}`}>{event.title}</Link></li>))}   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DateInfoCard;