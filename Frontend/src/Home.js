
 import Navbar from "./Navbar";
 import Hero from "./Hero";
 import Footer from "./Footer";
 import Features from "./Features";
// import Home component

import Info from "./Info";
import Tech from "./Tech";
// import About component
 
function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Info />
            <Features/>
            <Tech/>
            <Footer/>
        </div>
    );
}
 
export default Home;