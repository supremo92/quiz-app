import "./Option.scss"
import correctIcon from '@assets/check.png'
import incorrectIcon from '@assets/remove.png'

interface OptionProps {
    isDisabled: boolean
    label: string
    isSelected: boolean
    isCorrect: boolean
    highlight: boolean
    clickEvent: () => void
}

function Options(props: OptionProps) {

    let highlight = ""

    const isSelected = props.isSelected ? "selected" : "not-selected"
    const isCorrect = props.isCorrect ? "correct" : "incorrect"

    const showIncorrect = props.highlight && props.isSelected && !props.isCorrect
    const showCorrect = props.highlight && props.isCorrect

    if (props.highlight && (props.isSelected || props.isCorrect)) {
        highlight = props.isCorrect ? "selected-correct" : "selected-incorrect"
    }

    return (
        <button
            disabled={props.isDisabled}
            className={`question-option ${isSelected} ${isCorrect} ${highlight}`}
            onClick={props.clickEvent}
        >
            {
                showCorrect && <img src={correctIcon} />
            }
            {
                showIncorrect && <img src={incorrectIcon} />
            }
            {props.label}
        </button>
    )
}

export default Options