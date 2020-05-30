//@ts-check

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  let myWatchList = [];

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/channels/');
        setChannels(response.data.channels)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  function wList(id) {
    let esta = false;
    myWatchList.forEach((value) => {
      if (value == id) { esta = true };
    });
    esta ?
      myWatchList = myWatchList.filter(value => value != id)
      : myWatchList.push(id);
    console.log(myWatchList);
  }

  return (
    <>
      <Container className="py-5">
        {
          loading ? (
            <Loading />
          ) : (
              <>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <Link to="/tv/watchlist" className="btn btn-primary" onClick={() => localStorage.setItem('myWatchList', JSON.stringify(myWatchList))} >
                    Ver Favoritos
                  </Link>
                </div>
                <Row xs={2} md={4} lg={6}>
                  {
                    channels.map(channel =>
                      <Col>
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="bottom"
                          overlay={
                            <Popover id="1" className="">
                              <Popover.Title as="h3" className="font-weight-bold">{channel.name}</Popover.Title>
                              <Popover.Content>
                                {channel.description}
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <div>
                            <Card style={{ width: "150px" }} className="mb-5 rounded" >
                              <label htmlFor={channel._id}>
                                <Card.Img variant="top" src={channel.logo} className="rounded" />
                              </label>
                              <input type="checkbox" className="form-check-input" id={channel._id}
                                onChange={(e) => wList(e.target.id)}
                                style={{
                                  position: 'absolute',
                                  top: 1,
                                  right: 5,
                                }} />
                            </Card>
                          </div>
                        </OverlayTrigger>{" "}
                      </Col>
                    )
                  }

                </Row>
              </>
            )
        }
      </Container>
    </>
  );
}
