import "./Button.scss"

interface ButtonProps {
    isDisabled: boolean
    class?: string
    id?: string
    label: string
    doClick?: () => void

}

function Button(props: ButtonProps) {

    return (
        <button
            disabled={props.isDisabled}
            id={props.id}
            className={`button ${props.isDisabled ? "inactive" : "active"} ${props.class}`}
            onClick={props.doClick}
        >
            {props.label}
        </button>
    )
}

export default Button
