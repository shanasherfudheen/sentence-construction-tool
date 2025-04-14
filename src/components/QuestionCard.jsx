import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";

export default function QuestionCard({question, onNext, total, current}) {

    const [filled, setFilled] = useState(Array(question.blanks).fill(null));
    const [selectedWords, setSelectedWords] =  useState([])
    const [time, setTime] = useState(30)

    useEffect(() => {
      setFilled(Array(question.blanks).fill(null));
      setSelectedWords([]);
      setTime(30);
    }, [question]);

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(prev => {
          if (prev === 1) {
            clearInterval(timer)
            onNext()
          }
          return prev - 1
        })
        
      }, 1000)
      return () => clearInterval(timer)
    }, [onNext])

    const handleSelect = (word) => {
        const index = filled.findIndex(f => f === null);
        if (index !== -1) {
          const newFilled = [...filled];
          newFilled[index] = word;
          setFilled(newFilled);
          setSelectedWords([...selectedWords, word]);

        } 
      };

      const handleUnselect = (index) => {
        const word = filled[index];
        if (word) {
          setFilled(filled.map((w, i) => i === index ? null : w));
          setSelectedWords(selectedWords.filter(w => w !== word));
        }
      };

      const renderedSentence = question.question.split(' ').map((word, index) => {
        
        if (word === "_____________") {
            const blankIndex = filled.findIndex((f, i) => 
                question.question.split(' ').slice(0, index).filter(w => w === "_____________").length === i
              );
            return (
                <span key={index} className="blank" onClick={() => handleUnselect(blankIndex)}>
                  {filled[blankIndex] || "_____________"}
                </span>
              );
             
        }
        return <span key={index}> {word} </span>;
        
      })

      const getUserSentence = () => {
        const parts = question.question.split(" ");
        let filledIndex = 0;
        return parts.map(word => {
          if (word === "_____________") {
            return filled[filledIndex++];
          }
          return word;
        }).join(" ");
      };
      
  return (
    <div className="question-card">
      <div className="top-bar">
        <Timer time={time} />
        <button className="quit-btn" onClick={() => window.location.reload()}>Quit</button>
      </div>
      <ProgressBar current={current} total={total} />
        <h6 className="card-title">Select the missing words in the correct order</h6>
        <div id="sentence" className="sentence">{renderedSentence}</div>
        <div className="options">
            {
                question.options.map((word, index) => 
                  selectedWords.includes(word) ? null : (
                    <button
                      key={index}
                      className="option-btn"
                      onClick={() => handleSelect(word)}
                    >
                      {word}
                    </button>
                  )
                )
            }
        </div>
        <button 
        className="next-btn" 
        onClick={() => {
          const userSentence = getUserSentence();
    onNext(userSentence); // Send back to QuestionsPage
        }} 
        disabled={filled.includes(null)}
      >
       <FontAwesomeIcon icon={faArrowRight} className="arrowRight" />
      </button>
      
    </div>
  )
}