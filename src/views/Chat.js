import React, {useEffect, useState} from 'react';
import {OTPublisher, OTSubscriber, createSession as createOpenTokSession} from 'opentok-react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import AppConfig from "../AppConfig";
import restClient from "../providers/rest";
import {CREATE} from 'react-admin';

export const Chat = ({userId}) => {
  const [sessionHelper, setSessionHelper] = useState(undefined);
  const [streams, setStreams] = useState([]);

  const createSession = (sId, sToken) => {
    setSessionHelper(createOpenTokSession({
      apiKey: AppConfig.opentokApiKey,
      sessionId: sId,
      token: sToken,
      onStreamsUpdated: streams => {
        setStreams(streams);
      }
    }));
  };

  useEffect(() => {
    restClient(CREATE, 'chat/token', {
      data: {
        id: Math.random(),
        user: userId
      }
    })
      .then(({response: {token, session}}) => {
        createSession(session, token);
      });

    return () => {
      if (sessionHelper) sessionHelper.disconnect();
    }
  }, []);

  if (!sessionHelper) {
    return <div/>;
  }

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
  }}>
    <Card style={{width: '50%', marginRight: '1em'}}>
      <CardContent>
        <OTPublisher properties={{
          width: '100%',
          height: '600px'
        }} session={sessionHelper.session}/>
      </CardContent>
    </Card>

    <Card style={{width: '50%', marginLeft: '1em'}}>
      <CardContent>
        {streams.map(stream => {
          return (
            <OTSubscriber
              properties={{
                width: '100%',
                height: '600px'
              }}
              key={stream.id}
              session={sessionHelper.session}
              stream={stream}
            />
          );
        })}
      </CardContent>
    </Card>
  </div>;
};
