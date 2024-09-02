import './App.css';
import InputQuestionForm from './components/InputQuestionForm';
import InputUrlForm from './components/InputUrlForm';
import React, { useState } from 'react';

function App() {
  const [content, setContent] = useState('');
  const [results, setResults] = useState('');
  return (
    <div className="App">
      <h1>AI Web Scraper</h1>
      <InputUrlForm onScrape={(data) => setContent(data.content)}/>
      {content && 
        <InputQuestionForm onQuestion={(data) => setResults(data.content)}/>
      }
      {results}
    </div>
  );
}

export default App;
