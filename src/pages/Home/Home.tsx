import Header from "../../components/Header/Header.tsx"
import "./Home.scss"
import Playground from "../../components/Playground/Playground.tsx"
// import Setup from "../../components/Setup/Setup.tsx"
function Home() {
    return (
        <div className="Home">
            <Header />
            <div className="page-body" >
                {/* <Setup /> */}
                <Playground />
            </div>
        </div>
    )
}

export default Home