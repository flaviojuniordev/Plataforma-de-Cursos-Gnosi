import GnosiBanner from "../assets/home_components/homeBanner";
import HomeDashboard from "../assets/home_components/homeDashboard";
import { Aside } from "../components/Aside";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/NavBar";
import "../styles/home.css";

function Home() {
    return (
        <div>
            <Navbar userName={""} />
            <main>
                <div className="flex flex-row mb-2">
                    <Aside />
                    <div className="flex flex-col items-left w-full">
                        <GnosiBanner />

                        <div className="w-full mt-6">
                            <h1 id="gnosiHomeTitle" className="font-bolder text-left sm:text-center">Gnosi - Cursos</h1>
                            <HomeDashboard />
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;