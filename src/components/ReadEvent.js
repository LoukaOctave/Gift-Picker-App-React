import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import firebase from "./Firebase.js";

const ReadEvent = () => {

    const [event, setEvent] = useState({fetched: false, found: false})

    useEffect(() => { // TODO: Fix this, because it keeps giving a warning
        fetchEvent();
    }, [])

    const docRef = firebase.firestore().collection("Events").doc(useParams().id);
    const fetchEvent = async() => {
        const response = docRef;
        await response.get().then(function(doc) {
            if (doc.exists) {
              setEvent({
                id: doc.id,
                title: doc.data().title,
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
          }).catch(function(error) {
            setEvent({
                fetched: true,
                found: false,
                errorMessage: `Error getting event data: ${error}`
            })
          });
    }

    return (
        <div>
            <div className={!event.fetched ? "" : "hide"}>
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
            <div className={(event.fetched && event.found) ? "" : "hide"}>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>{event.title}</h4></li>
                    <li className="collection-item"><div>Date<span className="secondary-content">{event.date}</span></div></li>
                    <li className="collection-item"><div>Start<span className="secondary-content">{event.start}</span></div></li>
                    <li className="collection-item"><div>End<span className="secondary-content">{event.end}</span></div></li>
                    <li className="collection-item"><div>Type<span className="secondary-content">{event.type}</span></div></li>
                    <li className="collection-item"><div>Description<span className="secondary-content">{event.description}</span></div></li>
                </ul>
                <div>
                    <Link to={`/updateEvent/${event.id}`} className="waves-effect waves-light btn"><i className="material-icons left">update</i>Update</Link>
                    <a className="waves-effect waves-light btn"><i className="material-icons left">delete</i>Delete</a>
                </div>
            </div>
            <div className={(event.fetched && !event.found) ? "" : "hide"}>
                <h4>404: Event not found</h4>
                <p>{event.errorMessage}</p>
            </div>
            <div>
                <Link to="/" className="waves-effect waves-light btn"><i className="material-icons left">arrow_back_ios</i>Back</Link>
            </div>
        </div>
    );
};

export default ReadEvent;

//TODO: Make "Go Back" button actually go back, and not route to a predetermined path.