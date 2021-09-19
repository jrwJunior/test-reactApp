import React from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { useAppState, useAppDispatch } from '../../context';
import 'react-virtualized/styles.css';
import './style.scss'

const Channel = () => {
  const dispatch = useAppDispatch()

  const state = useAppState();
  const [value, setValue] = React.useState('');
  const [isTyping, setTyping] = React.useState(false);
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const handleChange = (evt) => {
    const { target: { value } } = evt;
    setValue(value);
  }

  const getShortName = (name) => {
    const nameSplit = name.split(" ");
    return nameSplit[0].charAt(0).toUpperCase() + nameSplit[1]?.charAt(0).toUpperCase()
  }

  const handleLogout = () => {
    dispatch({type: 'LOGOUT' })
    sessionStorage.removeItem('user');
  }

  const handleSendMessage = () => {
    if (!value) {
      return;
    }

    const payload = {
      author: `${state.get('user').fName} ${state.get('user').lName}`,
      message: value,
      created: new Date(),
      isBoot: false,
    }
    dispatch({type: 'SET_MESSAGES', payload })
    setTyping(true);
    setValue('');
  }

  const handleBootAnswer = () => {
    const payload = {
      author: 'Bot Iriska',
      message: `Hi how are you ${state.get('user').fName} ${state.get('user').lName}?`,
      createdDate: new Date(),
      isBoot: true
    }

    dispatch({type: 'SET_MESSAGES', payload });
    setTyping(false);
  }

  React.useEffect(() => {
    if (isTyping) {
      const idTimeout = setTimeout(handleBootAnswer, 3500);
      return () => clearTimeout(idTimeout);
    }
  }, [isTyping])

  return (
    <div className="container">
      <div className="head">
        <div>
          <div className="head__title">{state.get('channel').title}</div>
          <div className="head__desc">{state.get('channel').description}</div>
        </div>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="bubbles">
        <AutoSizer className="foo">
          {({height}) => (
            <List
            className='list'
              width={800} 
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={state.get('messages').length} 
              rowRenderer={({ key, index, style }) => {
                const res = state.get('messages')[index];

                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div 
                      key={key} 
                      style={style} 
                      className={!res.isBoot ? 'bubble bubble-me' : 'bubble'}
                    >
                      <Avatar 
                        className="avatar"
                        src={!res.isBoot ? state.get('user')?.avatar : ''}
                        alt="your avatar"
                      >
                        {getShortName(res.author)}
                      </Avatar>
                      <div className="bubble-text">{res.message}</div>
                    </div>
                  </CellMeasurer>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
      {isTyping && (
          <div className="typing-wrap">
            <div className="typing">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        )}
      <div className="channel-editor">
        <input 
          placeholder="Enter your message ..." 
          value={value}
          onChange={handleChange}
        />
        <Button color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default Channel;