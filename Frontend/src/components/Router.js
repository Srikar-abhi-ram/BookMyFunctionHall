import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./UserInterface/Contact";
import Home from "./UserInterface/Home";
import NoPage from "./UserInterface/NoPage";
import Layout from "./Layout";

const WeddingRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default WeddingRouter