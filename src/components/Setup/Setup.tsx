import { useEffect, useState } from "react"
import "./Setup.scss"
import Button from "../Button/Button"

interface Category {
    id: number
    name: string
}

function Setup() {
    const [quizCategories, setQuizCategories] = useState<Category[]>([])
    //https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple


    // useEffect(() => {
    //     const fetchQuizCategories = () => {
    //         const respo = fetch("https://opentdb.com/api_category.php")
    //             .then(() => { console.log(respo) })

    //     }
    //     fetchQuizCategories()


    // }, [])
    const handleSubmit = () => {
        console.log("Submit")
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
                <form>
                    <label>Select genre: </label><select name="trivia_category" id="trivia_category" className="form-control">
                        {quizCategories.length ? quizCategories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>) : <option value={""}>Loading...</option>}
                    </select><br />

                    <label>Select number of questions: </label><input type="number" name="trivia_amount" id="trivia_amount" className="form-control" min="1" max="50" value="10"></input><br />
                    <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                    <select name="trivia_difficulty" className="form-control">
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select><br />
                    <label htmlFor="trivia_type">Select Type: </label>
                    <select name="trivia_type" className="form-control">
                        <option value="any">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select><br />
                    <Button label="Submit" isDisabled={false} doClick={handleSubmit} />

                </form>
            </div>
        </div>
    )
}

export default Setup