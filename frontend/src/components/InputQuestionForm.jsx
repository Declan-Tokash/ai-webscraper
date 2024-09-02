import React, { useState } from 'react';
import axios from 'axios';

const InputQuestionForm = ({onQuestion}) => {
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`http://127.0.0.1:5000/analyze`, {
          params: { query: question }
      });
       onQuestion(response.data);
      } catch (error) {
        console.error('Error submitting question:', error);
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Enter Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </label>
        <button type="submit">Ask Question</button>
      </form>
    )
}

export default InputQuestionForm