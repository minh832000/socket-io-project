import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.118.17:3001');

const App = () => {
  const [message, setMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSendMessage = () => {
    socket.emit('send-message', { message });
  };

  useEffect(() => {
    socket.on('receive-message', (payload) => {
      setReceiveMessage(payload.forwardMessage);
    });
  }, [socket]);

  return (
    <>
      <div style={{ display: 'flex', width: '450px', margin: '50px auto' }}>
        <input
          placeholder="Message..."
          value={message}
          onChange={handleMessageChange}
          autoFocus={true}
          style={{ width: '70%', margin: '0 5px', padding: '7px 5px' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ width: '30%', margin: '0 5px', padding: '7x 0' }}>
          Send
        </button>
      </div>
      <div style={{ width: '450px', margin: '50px auto' }}>
        <p>Receive Message: {receiveMessage}</p>
      </div>
    </>
  );
};

export default App;
