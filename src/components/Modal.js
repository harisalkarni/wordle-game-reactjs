import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You Win</h1>
                <p className='solution'>{solution}</p>
                <p>you found the word in {turn} guessses</p>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>You Lose</h1>
                <p className='solution'>{solution}</p>
                <p>better luck next time!!</p>
            </div>
        )}
    </div>
  )
}
