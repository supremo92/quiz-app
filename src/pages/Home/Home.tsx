// import Header from "../../components/Header/Header.tsx"
import "./Home.scss"
import Playground from "../../components/Playground/Playground.tsx"
import Setup from "../../components/Setup/Setup.tsx"
import { useState } from "react"
function Home() {
    const [isOnSetup, setIsOnSetup] = useState<boolean>(true)
    const [selectedOptionsUrl, setSelectedOptionsUrl] = useState<string>("failed")

    const handleFormData = (incomingURL: string) => {
        setSelectedOptionsUrl(incomingURL)
        setIsOnSetup(false)
    }
    return (
        <div className="Home">
            <div className="page-body" >
                {isOnSetup ?
                    <Setup onFormDataSubmit={handleFormData} />
                    :
                    <Playground settingsUrl={selectedOptionsUrl} />}

            </div>
        </div>
    )
}

export default Home