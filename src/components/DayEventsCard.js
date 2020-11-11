import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

const ReadEvent = () => { //TODO: make this a page component -> ReadEvent
    const { name } = useParams();

    return (
        <div>
            <h3>{name}</h3>
        </div>
    );
}

const DayEventsCard = () => {
    const { url, path } = useRouteMatch();

    const selectedDate = null; // date selected on the calendar

    const eventsThatDay = null; // collection of events on selected date

    /*
    const linkList = eventsThatDay.map((event) => {
        return (
            <li key={event.id}>
            <Link to={`${url}/${event.id}`}>{event.name}</Link>
            </li>
        );
    });
    */

    return (
        <div>
            <h3>{selectedDate}</h3>    
            {/*<ul>{linkList}</ul>*/}
            <Route path={`readEvent/:name`}>
                <ReadEvent />
            </Route>
        </div>
    );
};

export default DayEventsCard;