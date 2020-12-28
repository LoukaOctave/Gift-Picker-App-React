import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import { fsFunc } from "../App.js";

const ReadEvent = () => {

    fsFunc.testFunction();

    const { id } = useParams();

    return (
        <div>
            <h3>{id}</h3>
        </div>
    );
};

// TODO: use useRouteMatch() to create a 404 page system

export default ReadEvent;