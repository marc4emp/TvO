//@ts-check

import React, { useState } from 'react';
import axios from "axios";
import Loading from "../components/Loading";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';

export default function Cms() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [key, setKey] = useState("1");

    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const payload = new FormData();
            payload.append("name", name);
            payload.append("url", url);
            payload.append("description", description);
            payload.append("logo", logo);


            const response = await axios.post("http://localhost:3001/channels/", payload);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            toggleShowB();
            setName("");
            setUrl("");
            setDescription("");
            setLogo("");
            setKey(Math.random().toString());
        }
    };

    const logoUrl = logo && URL.createObjectURL(logo);


    return (
        <>
            <div className="d-flex justify-content-center align-items-center altura100">
                <div className="card border-primary" >
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            aria-describedby="nameHelp"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="url">Url:</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="url"
                                            aria-describedby="urlHelp"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Descripcion:</label>
                                        <textarea key={key} className="form-control" id="description" onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-group">
                                        <label htmlFor="logo">Logo:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="logo"
                                            onChange={(e) => setLogo(e.target.files[0])}
                                            key={key} />

                                        {
                                            logo &&
                                            <Card style={{ width: "150px" }} className="mt-2" >
                                                <Card.Img variant="top" src={logoUrl} />
                                            </Card>
                                        }
                                    </div>

                                </Col>
                            </Row>

                            {loading ? (
                                <Loading />
                            ) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button type="submit" className="btn btn-primary">Crear</button>
                                    </div>
                                )
                            }
                        </form>

                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: 83,
                        right: 5,
                    }}
                >
                    <Toast onClose={toggleShowB} show={showB} animation={true} className="border-primary">
                        <Toast.Header>
                            <strong className="mr-auto">Canal creado con exito!</strong>
                        </Toast.Header>
                    </Toast>
                </div>
            </div>
        </>
    );
}
