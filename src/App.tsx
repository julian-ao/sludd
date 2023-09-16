import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationPage from "./pages/slug";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom"

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/project1/" element={<HomePage />} />
                <Route path="/project1/:slug" element={<LocationPage />} />
            </Routes>
        </QueryClientProvider>
    );
}
