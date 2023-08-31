import { useEffect, useState } from "react";
import "./Playground.scss"

type Trivia = {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

function Playground() {
    const [trivia, setTrivia] = useState<Trivia[]>([]); //Why is this a const if it changes? Or is a new "trivia" being created on each API call?

    // const [amount, setAmount] = useState(8);
    // const [category, setCategory] = useState(9);
    // const [difficulty, setDifficulty] = useState("easy");
    // const [type, setType] = useState("multiple");

    useEffect(() => {
        const getRequest = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=8&category=9&difficulty=easy&type=multiple`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.results);
                setTrivia(data.results);
            } catch (err) {
                console.log(err)
            }

        }
        getRequest()
    }, []);


    return (
        <div className="Playground">
            <div className="outer-container">
                <div className="header">Header</div>
                {trivia.length &&
                    <div className="body">
                        <div className="question">
                            <h3>{trivia[0].question}</h3>
                        </div>
                        <div>
                            <div>
                                1. {trivia[0].incorrect_answers[0]}
                            </div>
                            <div>
                                2. {trivia[0].incorrect_answers[1]}
                            </div>
                            <div>
                                3. {trivia[0].incorrect_answers[2]}
                            </div>
                            <div>
                                4. {trivia[0].correct_answer}
                            </div>
                        </div>
                    </div>
                }
                <div className="footer">
                    Question 2 of 10
                </div>
            </div>
        </div>
    )
}

export default Playground


///Next Steps
// Check how many incorrect answeers there are per question.
// Randomise the order of questions.
//

//Notes - Code runs twice when using React.StrictMode as a safeguard to ensure code doesn't rely on running once.