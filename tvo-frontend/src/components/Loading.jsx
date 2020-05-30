//@ts-check

import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Navbar() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
        </div>
    );
}