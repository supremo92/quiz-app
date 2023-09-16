import "./Playground.scss"
import { decode } from "html-entities"
import { useEffect, useState } from "react"
import Button from "@components/Button" //short file path because of the index.tsx.
import NoQuestionsScreen from "@components/NoQuestionsScreen"
import Option from "@components/Option"
import { useNavigate } from "react-router-dom"

interface Question {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

function Playground() {
    const navigate = useNavigate()
    const quizSettings = localStorage.getItem("quizSettingsString") ?? "amount=10"
    const URL = `https://opentdb.com/api.php?${quizSettings}`

    const [questions, setQuestions] = useState<Question[]>([])
    const [responseCode, setResponseCode] = useState<number>()
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true)
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [areOptionsDisabled, setAreOptionsDisabled] = useState<boolean>(false)
    const [highlightNow, setHighlightNow] = useState<boolean>(false)
    const [currentQuestionText, setQuestionText] = useState<string>("...Loading")

    const handleOptionSelection = (selectedOptionText: string) => {
        setSelectedOption(selectedOptionText)
        setIsSubmitDisabled(false)
    }

    const handleSubmit = () => {
        setAreOptionsDisabled(true)
        setIsSubmitDisabled(true)
        setIsNextDisabled(false)
        setHighlightNow(true)
    }

    const handleNext = () => {
        setSelectedOption(null)
        setHighlightNow(false)
        setAreOptionsDisabled(false)
        if (currentQuestion < 9) {
            setCurrentQuestion(currentQuestion + 1)
            setIsNextDisabled(true)
        } else {
            setIsNextDisabled(true)

            alert("Add in ending screen here")
        }
    }

    useEffect(() => {
        console.log("useEffect")
        const fetchData = async () => {
            try {
                const resp = await fetch(URL)
                const dataFromApi = await resp.json()
                setResponseCode(dataFromApi.response_code)
                setQuestions(dataFromApi.results)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [URL])

    useEffect(() => {
        //We have has to use mutliple useStates because
        //  we want the above fetchData to run only on component mounting,
        //  while the below, shufflling the options for the current question,
        //  needs to re-render whenever currentQuestion or questions updates.
        if (questions.length === 0) return
        const options = [
            ...questions[currentQuestion].incorrect_answers,
            questions[currentQuestion].correct_answer
        ]
        options.sort(() => Math.random() - 0.5)
        setShuffledOptions(options);
        setQuestionText(decode(questions[currentQuestion].question))
    }, [currentQuestion, questions])

    return (
        <div className="Playground">
            <Button label="Return to Setup" isDisabled={false} doClick={() => navigate('/')} />
            <div className="outer-container">
                <div className="question-count">Question {currentQuestion + 1} of {questions.length}</div>
                <div className="question-header">
                    <div className="question-header-question">{currentQuestionText}</div>
                </div>
                {responseCode === 1 && <NoQuestionsScreen />}
                <ul className="question-options">

                    {shuffledOptions.map((ans, key) =>
                        <Option
                            isDisabled={areOptionsDisabled}
                            key={key}
                            label={decode(ans)}
                            clickEvent={() => handleOptionSelection(decode(ans))}
                            isSelected={selectedOption === decode(ans) ? true : false}
                            isCorrect={decode(ans) === decode(questions[currentQuestion].correct_answer) ? true : false}
                            highlightTime={highlightNow}
                        />
                    )}
                </ul>

                <div className="question-footer">
                    <Button
                        label="Submit"
                        isDisabled={isSubmitDisabled}
                        doClick={handleSubmit}
                    />
                    <Button
                        label="Next"
                        isDisabled={isNextDisabled}
                        doClick={handleNext}
                    />
                </div>

            </div>
        </div>
    )
}

export default Playground

//Step 6: Create a new Setup component that lets a user choose: Genre, difficulty, and amount of questions



//Improvments:
//Reduce the number of decode calls. decode once, and store the results as variables.
//Use Destructuring: Destructure the questions array and the current question object to avoid repetitive usage of questions[currentQuestion].
//Conditional Rendering: Instead of using ternary conditions inside the JSX, consider using short-circuit evaluation for better readability.

//Step ?: Add score.
//Step ? :Add try catch for when API request is unsuccessful

//Step 1: How can i decode the text I get back grom the API call. RESOVLED
//Step 2: How can i set the state of other instances of the Option component? When i click on one option, it should be highlighted, and all other options should be un-highlighted. RESOLVED:
//Step 3: When an option is selected, enable the Submit button. Then when the Submit button is selected, we start the resolution if the question.
//Step 4: When an answer is submitted: if the user is correct, the clicked options becomes green. If the user is incorrect, the correct answer will be highlighted as green, and the clicked incorrect  options will be red.
//Step 5: Add icons to the options when question is submitted


//Bugs - Correct Tick covers text