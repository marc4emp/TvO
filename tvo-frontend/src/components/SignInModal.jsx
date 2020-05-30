//@ts-check

import React, { useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Loading from "../components/Loading";

export default (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const payload = {
                email,
                password,
            };
            console.log(payload)
            const response = await axios.post("http://localhost:3001/users/", payload);
            props.onHide();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {loading ? (
                            <Loading />
                        ) : (
                                <button type="submit" className="btn btn-primary">Submit</button>
                            )
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}