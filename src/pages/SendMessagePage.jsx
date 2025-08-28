import Header from "../components/Header";
import Footer from "../components/Footer";
import MessageCreateForm from "../components/MessageCreateForm";

export default function SendMessagePage() {
    return (
        <>
            <Header />
            <main >
                <MessageCreateForm />
            </main>
            <Footer />
        </>
    );
}