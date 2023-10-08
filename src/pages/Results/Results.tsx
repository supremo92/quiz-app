import Button from "@/components/Button"
import "./Results.scss"
import { useNavigate } from "react-router-dom"

function Results() {
    const navigate = useNavigate()


    return (
        <div>
            <h1>Results</h1>
            <Button isDisabled={false} label="Return to setup" doClick={() => navigate('/')} />
        </div>
    )
}

export default Results