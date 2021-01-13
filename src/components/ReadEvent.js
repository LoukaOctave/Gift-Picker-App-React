import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { typeValueToName } from "../functions.js";
import firebase from "./Firebase.js";

const ReadEvent = () => {

    const [event, setEvent] = useState({fetched: false, found: false})

    useEffect(() => { // TODO: Fix this, because it keeps giving a warning
        fetchEvent();
    }, []);

    const docRef = firebase.firestore().collection("Events").doc(useParams().id);
    const fetchEvent = async() => {
        const response = docRef;
        await response.get().then((doc) => {
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
                });
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

    const eventTimes = (startOrEnd) => {
        if (!event.allDay) {
            return(
                    <li className="collection-item"><div>{startOrEnd.charAt(0).toUpperCase() + startOrEnd.slice(1)}<span className="secondary-content">{event[startOrEnd]}</span></div></li>
            );
        }
    }

    return (
        <div>
            {
                /* Contains a loading animation. Will be visible until the event is fetched, regardless if an existing one has been found or not. */
            }
            <div className={event.fetched ? "hide" : ""}>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
            {
                /* Contains the readable event data. Will be hidden until the event is fetched and found (this means valid/non-empty). */
            }
            <div className={(event.fetched && event.found) ? "" : "hide"}>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>{event.title}</h4></li>
                    <li className="collection-item"><div>Date<span className="secondary-content">{`${event.date} ${event.allDay ? "All Day" : ""}`}</span></div></li>
                    {eventTimes("start")}
                    {eventTimes("end")}
                    <li className="collection-item"><div>Type<span className="secondary-content">
                    {typeValueToName(event.type)}
                    </span></div></li>
                    <li className="collection-item"><div>Description<span className="secondary-content">{event.description}</span></div></li>
                </ul>
                <div>
                    <Link to={`/updateEvent/${event.id}`} className="waves-effect waves-light btn"><i className="material-icons left">update</i>Update</Link>
                    <a className="waves-effect waves-light btn"><i className="material-icons left">delete</i>Delete</a>
                </div>
            </div>
            {
                /* Contains a 404 page with error message. Will be hidden until the event is fetched but no valid one is found (this means non-valid/empty OR there's a db error). */
            }
            <div className={(event.fetched && !event.found) ? "" : "hide"}>
                <h4>404: Event not found</h4>
                <p>{event.errorMessage}</p>
            </div>
            {
                /* Contains a button to return to the previous page. Will always be shown. */
            }
            <div>
                <Link to="/" className="waves-effect waves-light btn"><i className="material-icons left">arrow_back_ios</i>Back</Link>
            </div>
        </div>
    );
};

export default ReadEvent;

//TODO: Make "Go Back" button actually go back, and not route to a predetermined path.