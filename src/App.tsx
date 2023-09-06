import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationPage from "./pages/slug";
import { Route, Routes } from "react-router-dom"
import TestPage from "./TestPage";
import LocationCardsView from "./components/views/LocationCardsView/LocationCardsView";

const queryClient = new QueryClient()


export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                    <Route path="/" element={<HomeTest />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/:slug" element={<LocationPage/>} />
            </Routes>
        </QueryClientProvider>
    );
}

function HomeTest() {
    return (
        <>
            <LocationCardsView locations={["Sandefjord", "Bergen", "Trondheim", "Trondheim sentrum", "Bærum"]} />
        </>
    );
}
