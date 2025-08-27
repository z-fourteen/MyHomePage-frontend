// src/pages/MessagePage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import Messages from "../components/Messages";

export default function MessagePage() {
    return (
        <>
            <Header />
            <main>
                <Messages />
            </main>
            <Footer />
        </>
    );   
}