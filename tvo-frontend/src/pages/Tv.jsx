//@ts-check

import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Tv() {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const [videosource, setVideosource] = useState(localStorage.getItem('currentChannel'));

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
      <div className='d-flex'>
        <div className='d-flex flex-column altura100' style={{ overflowY: "scroll" }} >
          {
            channels.map(channel =>
              <a style={{ cursor: "pointer" }} onClick={() => setVideosource(channel.url)}>
                <Card style={{ width: "150px" }} className="" >
                  <Card.Img variant="top" src={channel.logo} />
                </Card>
              </a>
            )
          }
        </div>
        <div className='flex-fill bg-dark'>
          <iframe width="100%" height="100%" src={videosource} frameborder="0" title="myFrame" allow="autoplay; fullscreen"></iframe>
        </div>
      </div>
    </>
  );
}
