import React from 'react';

const Question = ({ question, options, handleAnswer }) => {
  return (
    <div>
      <h1 className='word'>{question}</h1>
      <div className='options'>
      {options.map((option) => (
        <button className='option' key={option} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
      </div>
    </div>
  );
};

export default Question;
