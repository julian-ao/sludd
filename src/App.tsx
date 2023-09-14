import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationPage from "./pages/slug";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom"
import SearchPage from "./pages/SearchPage";

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/location/:locationName/:slug?" element={<LocationPage />} />
                {/* <Route path="/search/:search" element={<p></p>} /> */}
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </QueryClientProvider>
    );
}
