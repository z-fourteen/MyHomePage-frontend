import Footer from "../components/Footer";
import Header from "../components/Header";
import Form from "../components/Form";
import "../static/Form.css"

export default function MessagePage() {
    return (
        <>
            <Header />
            <main>
                <div className="form-wrapper">
                    <Form 
                        method="register"
                        route="/api/user/register/"
                        />
                </div>
            </main>
            <Footer></Footer>
        </>
        
    )   
}