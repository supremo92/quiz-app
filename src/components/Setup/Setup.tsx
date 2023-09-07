import { useEffect, useState, } from "react"
import "./Setup.scss"
import Button from "../Button/Button"
// import setupImageMini from "@/assets/rainbow-mini-min.png"
import setupImage from "@/assets/rainbow.jpg"

interface Category {
    id: number
    name: string
}
// interface FormData {
//     category: number
//     difficulty: string
//     type: string
//     amount: number
// }
interface onSubmitFunc {
    onFormDataSubmit: (formURL: string) => void
}

function Setup(props: onSubmitFunc) {
    const [quizCategories, setQuizCategories] = useState<Category[]>([{ id: 0, name: 'Loading...' }])
    const [triviaCategory, setTriviaCategory] = useState<string>("9")
    const [triviaDifficulty, setTriviaDifficulty] = useState<string>("")
    const [triviaType, setTriviaType] = useState<string>("")
    const [triviaAmount, setTriviaAmount] = useState<string>("10")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.onFormDataSubmit(
            `amount=${triviaAmount}&category=${triviaCategory}${triviaDifficulty}${triviaType}`
        )
    }
    const handleTriviaCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTriviaCategory(event.target.value)
    }
    const handleTriviaDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const diffcultySlug = event.target.value !== "any" ? `&difficulty=${event.target.value}` : ""
        setTriviaDifficulty(diffcultySlug)
    }
    const handleTriviaTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const typeSlug = event.target.value !== "any" ? `&type=${event.target.value}` : ""
        setTriviaType(typeSlug)
    }
    const handleTriviaAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTriviaAmount(event.target.value)
    }

    useEffect(() => {
        const fetchQuizCategories = () => {
            fetch("https://opentdb.com/api_category.php")
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return resp.json();
                })
                .then((data) => {
                    setQuizCategories(data.trivia_categories)
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        };
        fetchQuizCategories();
    }, []);


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
                        <h2>Set up the session</h2>
                        <div className="form-options">
                            <div className="setup-form-section">
                                <label>Select genre: </label>
                                <select
                                    name="trivia_category"
                                    id="trivia_category"
                                    className="form-control"
                                    onChange={handleTriviaCategoryChange}
                                >
                                    {quizCategories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div className="setup-form-section">
                                <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                                <select
                                    name="trivia_difficulty"
                                    className="form-control"
                                    onChange={handleTriviaDifficultyChange}
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
                                    onChange={handleTriviaTypeChange}
                                >
                                    <option value="any">Any Type</option>
                                    <option value="multiple">Multiple Choice</option>
                                    <option value="boolean">True / False</option>
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
                                    onChange={handleTriviaAmountChange}
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

//Additional options:
//Timer option
//Sounds
//50-50 Lifeline
