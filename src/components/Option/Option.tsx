import "./Option.scss"
import correct from './assets/check.png'
import incorrect from './assets/remove.png'

interface OptionProps {
    isDisabled: boolean
    key: string
    label: string
    clickEvent: () => void
    isSelected: boolean
    isCorrect: boolean

    highlight: boolean | null

}

function Options(props: OptionProps) {
    return (
        <button disabled={props.isDisabled} className={`question-option ${props.isSelected ? "selected" : "not-selected"} ${props.isCorrect ? "correct" : "incorrect"} ${props.highlight != null ? props.highlight ? "selected-correct" : "selected-incorrect" : ""}`} key={props.key} data-key={props.key} data-iscorrect={props.isCorrect ? "correct" : "incorrect"} onClick={props.clickEvent}>
            {
                props.highlight != null ? (props.highlight ?
                    <img src={correct}></img> :
                    <img src={incorrect}></img>) : null
            }
            {props.label}
        </button>
    )
}

export default Options
// setIsSelected(prev => !prev); //use this to toggle the state.