import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { fsFunc } from "../App.js";

const DateInfoCard = () => {

    const selectedDate = Date();

    // Write function that returns this (id and name)
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