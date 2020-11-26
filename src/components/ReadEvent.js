import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

const ReadEvent = () => {
    const { id } = useParams();

    return (
        <div>
            <h3>{id}</h3>
        </div>
    );
};

// TODO: use useRouteMatch() to create a 404 page system

export default ReadEvent;