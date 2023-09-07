import { Route, Routes } from "react-router-dom"
import TestPage from "./TestPage";
import LocationCardsView from "./components/views/LocationCardsView/LocationCardsView";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeTest />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    );
}

function HomeTest() {
    return (
        <>
            <LocationCardsView locations={["Sandefjord", "harstad", "Trondheim", "Trondheim sentrum", "Bærum", "Moss", "elverum", "tromsø"]} />
        </>
    );
}
