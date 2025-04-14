import React, {useState} from 'react';
import data from '../data/data.json'

export default function Score({score, onGoToDashboard, responses, correctAnswers}) {
  const [dataList] = useState(data)
  
    return (
        <div className="score-container">
            <div className="score-circle">
            <div className="circle">
                <span>{score}</span>
                <p>Overall Score</p>
            </div>
            </div>

            <p className="feedback">
        While you correctly formed several sentences, there are a couple of
        areas where improvement is needed. Pay close attention to sentence
        structure and word placement to ensure clarity and correctness. Review
        your responses below for more details.
      </p>

      <button className="dashboard-btn" onClick={onGoToDashboard}>
        Go to Dashboard
      </button>

      <div className="results">
      {
      dataList.data.questions.map((q, index) => {
    let correctFilled = q.question
    q.correctAnswer.forEach(answer => {
      correctFilled = correctFilled.replace("_____________", answer);
    });

   

        return (
          <div key={index} className="score-card">
            <p className="prompt"><strong className="prompt-title">Prompt:</strong> {correctFilled}</p>
            {
              correctFilled === responses[index] ? <span className='correct'>Correct</span> : <span className='incorrect'>Incorrect</span>
            }
            <p className="response"><strong className="response-title">Your Response:</strong> {responses[index]}</p>
          </div>
        )
      })}
      
      </div>

      <h3>Answer Booklet</h3>
      <div className="answers">
      
      {correctAnswers.map((correctAnswer, index) =>  {
        console.log(typeof correctAnswer)
        return (
          <div key={index}>
            <ul className="answers-list">
              { 
                      <li><span>{index+1}</span>
                        <ol type="a">
                          {
                      correctAnswer.map((c, index) => {
                        return(
                          
                            <li key={index}>{c}</li>
                          
                        )
                      })
                    }
                      </ol>
                      </li>                                                       
              }
            </ul>
            </div>
        )
      }
            
          )}
      </div>
        </div>
    )
}