import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";

// Home page component
export default function Home() {
    return (
        <>
            <Nav />
            <main className="flex-1">
                <Hero />
                <Features />
            </main>
            <Footer />
        </>
    );
}