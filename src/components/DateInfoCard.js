import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import firebase from "./Firebase.js";

const DateInfoCard = () => {

    const [events, setEvents] = useState([]);

    

    const docsRef = firebase.firestore().collection("Events");
    const fetchEvents = async() => {
        const response = docsRef;
        const data = await response.get();
        data.docs.forEach(event => {
            setEvents([...events, {...event.data(), id: event.id}]);
        })
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
                            {
                                events && events.map(event => { // This will ultimately only return one <li/> element. Fix not found.
                                    return(
                                        <li key={event.id}>
                                            <Link to={`/readEvent/${event.id}`}>{event.title}</Link>
                                        </li>
                                    );
                                })
                            }   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DateInfoCard;