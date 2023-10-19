import "./Setup.scss"
import { useEffect, useState } from "react"
import Button from "@components/Button"
import logo from "@assets/toriva.png"
import setupImage from "@assets/rainbow.jpg"
import { useNavigate } from "react-router-dom"

function Setup() {
    const navigate = useNavigate()
    const grabbedQuizSettings = JSON.parse(localStorage.getItem("quizSettings") ?? '{}')
    const [quizCategories, setQuizCategories] = useState([{ id: 0, name: 'Loading...' }])

    const [triviaCategory, setTriviaCategory] = useState(grabbedQuizSettings.category ?? 9)
    const [triviaDifficulty, setTriviaDifficulty] = useState(grabbedQuizSettings.difficulty ?? "any")
    const [triviaType, setTriviaType] = useState(grabbedQuizSettings.type ?? "any")
    const [triviaAmount, setTriviaAmount] = useState(grabbedQuizSettings.amount ?? 10)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const fetchData = async () => {
            try {
                //We need to build up the url to remove unncessary items:
                const requestedDifficulty = (triviaDifficulty === "any" ? "" : `&difficulty=${triviaDifficulty}`)
                const requestedType = (triviaType === "any" ? "" : `&type=${triviaType}`)
                const res = await fetch(`https://opentdb.com/api.php?category=${triviaCategory}&amount=${triviaAmount}${requestedDifficulty}${requestedType}`)
                // const res = await fetch(`https://opentdb.com/api.php?amount=${triviaAmount}&category=${triviaCategory}&difficulty=${triviaDifficulty}&type=${triviaType}`)
                const dataFromApi = await res.json()
                if (dataFromApi.response_code === 1) {
                    alert("There are not enough questions of the selected criteria.")
                }
                else if (dataFromApi.response_code === 2) {
                    alert("Response code error: 2")
                }
                else {
                    const quizSettings = {
                        category: triviaCategory,
                        difficulty: triviaDifficulty,
                        type: triviaType,
                        amount: triviaAmount,
                    }
                    localStorage.setItem('quizSettings', JSON.stringify(quizSettings))
                    localStorage.setItem('quizSettingsString', `https://opentdb.com/api.php?category=${triviaCategory}&amount=${triviaAmount}${requestedDifficulty}${requestedType}`)
                    navigate("/home")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }

    useEffect(() => {
        const fetchQuizCategories = async () => {
            const res = await fetch("https://opentdb.com/api_category.php")
            if (!res.ok) throw new Error('Network response was not ok')
            const data = await res.json()
            setQuizCategories(data.trivia_categories)
        }
        fetchQuizCategories()
    }, [])


    return (
        <div className="Setup">
            <div className="outer-container">
                <div >
                    <img src={setupImage} style={
                        { objectFit: 'cover', height: '100%', width: '100%' }
                    }></img>
                </div>
                <div>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <img src={logo} style={
                            { margin: '0 auto 1rem auto' }
                        }></img>
                        <h2>Set up the session</h2>
                        <div className="form-options">
                            <div className="setup-form-section">
                                <label>Select genre: </label>
                                {quizCategories.length > 0 ? (
                                    <select
                                        name="trivia_category"
                                        id="trivia_category"
                                        className="form-control"
                                        onChange={(event) => setTriviaCategory(parseInt(event.target.value))}
                                        defaultValue={triviaCategory} //Not working
                                    >
                                        {quizCategories.map((category, index) => <option key={index} value={category.id} selected={triviaCategory === category.id}>{category.name}</option>)}
                                    </select>
                                ) :
                                    (
                                        <p>Loading categories...</p>
                                    )
                                }
                            </div>
                            <div className="setup-form-section">
                                <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                                <select
                                    name="trivia_difficulty"
                                    className="form-control"
                                    onChange={(event) => setTriviaDifficulty(event.target.value)}
                                    defaultValue={triviaDifficulty}
                                >
                                    <option value="any">Any Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div className="setup-form-section">
                                <label htmlFor="trivia_type">Select Type: </label>
                                <select
                                    name="trivia_type"
                                    className="form-control"
                                    onChange={(event) => setTriviaType(event.target.value)}
                                    defaultValue={triviaType}
                                >
                                    <option value="any" >Any Type</option>
                                    <option value="multiple">Multiple Choice</option>
                                    <option value="boolean" >True / False</option>
                                </select>
                            </div>
                            <div className="setup-form-section">
                                <label>Select number of questions: </label>
                                <input
                                    type="number"
                                    name="trivia_amount"
                                    id="trivia_amount"
                                    className="form-control"
                                    min="1"
                                    max="50"
                                    value={triviaAmount}
                                    onChange={(event) => setTriviaAmount(parseInt(event.target.value))}
                                ></input>
                            </div>
                        </div>
                        <div className="form-submit">
                            <Button id="setup-submit" class="setup-submit" label="Submit" isDisabled={false} />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Setup
//Additional options://Timer option//Sounds//50-50 Lifeline

//
