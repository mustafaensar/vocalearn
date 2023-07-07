import React from 'react';

const Question = ({ question, options, handleAnswer }) => {
  return (
    <div>
      <h3 className='word'>{question}</h3>
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
