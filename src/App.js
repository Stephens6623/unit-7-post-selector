import './App.css';
import Display from './Display';
import List from './List';
import { useState } from 'react';

function App() {
  const [postId, setPostId] = useState(null);
  return (
    <div className="app-container">
      <List setPostId={setPostId}/>
      <Display postId={postId}/>
    </div>
  );
} 

export default App;
