import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

const DateInfoCard = () => {

    const selectedDate = Date();

    const eventsThatDay = [{id: '500', name: 'five-hundred'}];

    const linkList = eventsThatDay.map((event) => {
        return (
            <li key={event.id}>
                <Link to={`readEvent/${event.id}`}>{event.name}</Link>
            </li>
        );
    });

    return (
        <div>
            <h3>{selectedDate.toString()}</h3>    
            <ul>{linkList}</ul>
        </div>
    );
};

export default DateInfoCard;