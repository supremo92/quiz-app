import "./Home.scss"
import { useState } from "react"
import Playground from "@components/Playground"
import Setup from "@components/Setup"

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
                {
                    isOnSetup ?
                        <Setup onFormDataSubmit={handleFormData} />
                        :
                        <Playground settingsUrl={selectedOptionsUrl} />
                }
            </div>
        </div>
    )
}

export default Home