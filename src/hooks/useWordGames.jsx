import {useState, useEffect, useRef} from 'react'

function useWordGames(startingTime = 60) {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)

    function handleChange(event) {
        const {value} = event.target
        setText(value)
    }
    
    function countWords(str) {
        return str.trim().split(' ').filter(word => word !== '').length
    }

    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText('')
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setWordCount(countWords(text))
        setIsTimeRunning(false)
    }

    useEffect(() => {
        setTimeout(() => {
            if (timeRemaining > 0 && isTimeRunning) {
                setTimeRemaining(prevTime => prevTime - 1)
            } else if (timeRemaining === 0) {
                endGame()
            }
        }, 1000);
    }, [timeRemaining, isTimeRunning])  

    return [text, 
        timeRemaining, 
        isTimeRunning, 
        wordCount, 
        handleChange, 
        startGame, 
        textBoxRef]
}
export default useWordGames



