import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const App = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSendMessage = () => {
    socket.emit('send-message', { message });
  };

  useEffect(() => {}, [socket]);
  return (
    <div>
      <input
        placeholder="Message..."
        value={message}
        onChange={handleMessageChange}
        autoFocus={true}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default App;
