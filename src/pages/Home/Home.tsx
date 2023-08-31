import Header from "../../components/Header/Header.tsx"
import "./Home.scss"
import Playground from "../../components/Playground/Playground.tsx"
function Home() {
    return (
        <div className="Home">
            {/* <img className="background" src="src/assets/textura.png" /> */}
            <>
                <Header />
                <Playground />
            </>
        </div>
    )
}

export default Home