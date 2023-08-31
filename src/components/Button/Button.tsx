
import "./Button.scss"

interface ButtonProps {
    isDisabled: boolean
    doClick: () => void
    label: string
}

function Button(props: ButtonProps) {

    return (
        <>
            <button disabled={props.isDisabled} className={`button ${props.isDisabled ? "inactive" : "active"}`} onClick={props.doClick}>{props.label}</button>
        </>
    )
}

export default Button
