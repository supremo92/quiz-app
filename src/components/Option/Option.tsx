import "./Option.scss"
import correctIcon from './assets/check.png'
import incorrectIcon from './assets/remove.png'

interface OptionProps {
    isDisabled: boolean
    label: string
    clickEvent: () => void
    isSelected: boolean
    isCorrect: boolean
    highlightTime: boolean
}

function Options(props: OptionProps) {

    /*Moved logic out of the JSX*/
    let highlight = ""
    const isSelected = props.isSelected ? "selected" : "not-selected"

    //we only want to highlight incorrect when 1) it's time to highlight. 2) and the options is selected. 3) And the option is NOT correct.
    const highlightIncorrect = props.highlightTime && props.isSelected && !props.isCorrect

    //We want to highlight as correct when 1) it's time to highlight. 2) ANd this option is correct.
    const highlightCorrect = props.highlightTime && props.isCorrect

    if (props.highlightTime && (props.isSelected || props.isCorrect)) {
        highlight = props.isCorrect ? "selected-correct" : "selected-incorrect"
    }

    return (
        <button
            disabled={props.isDisabled}
            className={`question-option ${isSelected} ${highlight}`}
            // data-iscorrect={props.isCorrect ? "correct" : "incorrect"}
            onClick={props.clickEvent}
        >
            {
                highlightCorrect && <img src={correctIcon} />
            }
            {
                highlightIncorrect && <img src={incorrectIcon} />
            }
            {props.label}
        </button>
    )
}
export default Options