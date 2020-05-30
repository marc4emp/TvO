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

  return (
    <>
      <Container className="py-5">
        {
          loading ? (
            <Loading />
          ) : (
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
                        <Link to="/tv" onClick={() => localStorage.setItem('currentChannel', channel.url)}>
                          <Card style={{ width: "150px" }} className="mb-5 rounded" >
                            <Card.Img variant="top" src={channel.logo} className="rounded" />
                          </Card>
                        </Link>
                      </OverlayTrigger>{" "}
                    </Col>
                  )
                }

              </Row>
            )
        }
      </Container>
    </>
  );
}
