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
                        method="login"
                        route="/api/token/"
                        />
                </div>
                
             </main>
            <Footer />
        </>
        
    )   
}