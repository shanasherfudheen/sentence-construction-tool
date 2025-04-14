import icon from "./icon.png";
import React from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import "./App.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import data from './data/data.json'
import QuestionCard from "./components/QuestionCard.jsx";
import { useState } from "react";
import Score from "./components/Score.jsx";

function Home() {

  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/questions')
  }
  
  return (
    <div className="App">
      <nav className="navbar">
        <p>Sentence Construction</p>
        <FontAwesomeIcon icon={faEllipsisVertical} className="dots" />
      </nav>
      <header className="App-header">
        <img src={icon} className="App-icon" alt="icon" />
        <h3>Sentence Construction</h3>
        <p className="subtitle">Select the correct words to complete the sentence by arranging the provided options in the right order.</p>

        <div className="App-header-content">
          <div>
            <h4 className="title">Time Per Question</h4>
            <p className="title-content">30 sec</p>
          </div>
          <div>
          <h4 className="title">Total Questions</h4>
          <p className="title-content">10</p>
          </div>
          <div>
          <h4 className="title">Coins</h4>
          <div className="coin"></div>
          <p className="title-content coins">0</p>
          </div>
        </div>

        <div className="App-button">
        <button className="back-btn">Back</button>
        <button onClick={handleStart} className="start-btn">Start</button>
        </div>
      </header>

    </div>
  );
}

function QuestionsPage() {
  const [dataList] = useState(data)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userResponses, setUserResponses] = useState([]);

  const navigate = useNavigate()

  const nextQuestion = (userSentence) => {
    setUserResponses(prev => [...prev, userSentence]);
    if (currentIndex < dataList.data.questions.length - 1) {
      console.log("Questions" + dataList.data.questions.length)
      setCurrentIndex(prev => prev + 1)
    } else {
      navigate("/result", { state: { responses: [...userResponses, userSentence] } });
    }
  }

  return (
    <QuestionCard question={dataList.data.questions[currentIndex]}
  onNext={nextQuestion} total={dataList.data.questions.length} current={currentIndex + 1}
   />
  )
}

function ResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { responses } = location.state || { responses: [] };
  const [dataList] = useState(data)
  const correctAnswers = dataList.data.questions.map(q => q.correctAnswer)

  let correctCount = 0;

dataList.data.questions.forEach((q, index) => {
  let correctFilled = q.question;

  // Fill all blanks with correct answers
  q.correctAnswer.forEach(answer => {
    correctFilled = correctFilled.replace("_____________", answer);
  });

  // Compare filled prompt to user response (case-insensitive, trimmed)
  const userResponse = responses[index]?.trim().toLowerCase();
  const correctResponse = correctFilled.trim().toLowerCase();

  if (userResponse === correctResponse) {
    correctCount++;
  }
});

const totalQuestions = dataList.data.questions.length;
const score = Math.round((correctCount / totalQuestions) * 100);

  
  
  // const totalQuestions = dataList.data.questions.length;
  // const score = Math.round((correctCount / totalQuestions) * 100);


  const handleDashboardRedirect = () => {
    navigate('/')
  }
  
  return (
    <Score score={score} responses={responses} onGoToDashboard={handleDashboardRedirect} correctAnswers={correctAnswers}/>
  )
}

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/result" element={<ResultsPage />} />
      </Routes>
    </Router>
  )
  
}

export default App;
