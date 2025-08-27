// src/pages/PublishPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThoughtCreateForm from "../components/ThoughtCreateForm";

export default function PublishPage(){
    return(
        <>
            <Header />
            <main>
                <ThoughtCreateForm />
            </main>
            <Footer />
        </>
    )
}