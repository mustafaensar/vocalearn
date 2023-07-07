import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import data from './data.js';
import "./App.css"

const App = () => {
  const [questions, setQuestions] = useState(data);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestion !== null) {
      setOptions(getRandomOptions(currentQuestion));
    }
  }, [currentQuestion]);

  const shuffleQuestions = () => {
    const shuffledData = shuffleArray([...questions]);
    setQuestions(shuffledData);
    setCurrentQuestion(0);
    setResult(null);
  };

  const handleAnswer = (selectedOption) => {
    const currentQ = questions[currentQuestion];
    const answer = {
      question: currentQ.word,
      selectedOption,
      correctOption: currentQ.mean,
    };

    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    if (selectedOption === currentQ.mean) {
      setResult('correct');
    } else {
      setResult('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setResult(null);
    } else {
      console.log('Tüm sorular tamamlandı:', answers);
    }
  };

  const getRandomOptions = (questionIndex) => {
    const currentQ = questions[questionIndex];
    const unusedOptions = questions
      .filter((item) => item !== currentQ)
      .map((item) => item.mean);

    const randomOptions = [currentQ.mean];

    while (randomOptions.length < 4) {
      const randomOption = unusedOptions[Math.floor(Math.random() * unusedOptions.length)];
      if (!randomOptions.includes(randomOption)) {
        randomOptions.push(randomOption);
      }
    }

    return shuffleArray(randomOptions);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className='question'>
      {result && (
        <div style={{ color: result === 'correct' ? 'green' : 'red' }}>
          {result === 'correct' ? 'Doğru!' : 'Yanlış!'}
          Doğru Cevap: {questions[currentQuestion].mean}
        </div>
      )}
      {currentQuestion !== null && (
        <Question
          question={questions[currentQuestion].word}
          options={options}
          handleAnswer={handleAnswer}
        />
      )}
      <button className='nextButton' onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default App;
