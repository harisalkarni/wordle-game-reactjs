import {useState} from 'react'

export const useWordle = (solution) => {

  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
      let solutionArray = [...solution]
      let formattedGuess = [...currentGuess].map((l) => {
        return {key: l, color: "grey"}
      })

      //make the letter green if the letter match
      formattedGuess.forEach((l, i) => {
        if(solutionArray[i] === l.key) {
          formattedGuess[i].color = "green"
          solutionArray[i] = null
        }
      })
         //make the letter yellow if the letter include in the word
         formattedGuess.forEach((l, i) => {
          if(solutionArray.includes(l.key) && l.color !== "green"){
            formattedGuess[i].color = 'yellow'
            solutionArray[solutionArray.indexOf(l.key)] = null
          }
         })

      return formattedGuess
      
    }

   // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
    const addNewGuess = (formattedGuess) => {
      if(currentGuess === solution){
        setIsCorrect(true)
      }
      setGuesses((prevGuesses) => {
        let newGuesses = [...prevGuesses]
        newGuesses[turn] = formattedGuess
        return newGuesses
      })
      setHistory((prevHistory) => {
        return [...prevHistory, currentGuess]
      })
      setTurn((prevTurn)=> {
        return prevTurn + 1
      })
      setCurrentGuess('')
    }

    // handle keyup event & track current guess
  // if user presses enter, add the new guess
    const handleKeyup = ({key}) => {

        if( key === "Enter"){
          
          // the turn have to be 5
          if(turn > 5) {
            console.log("your turn is over")
            return
          }
          //avoid duplicate guess
          if(history.includes(currentGuess)){
            console.log("you already used the word")
            return
          }
          //guess must 5 character length
          if(currentGuess.length !== 5){
            console.log("the word must be 5 character long")
            return
          }
          const formatted = formatGuess()
          addNewGuess(formatted)
        }

        if (key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1))
        return
        }
        if (/^[A-Za-z]$/.test(key)) {
        if (currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key)
          }
        }
    }

  return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}
