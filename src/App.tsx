import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocationPage from "./pages/slug";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()


export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:slug" element={<LocationPage/>} />
            </Routes>
        </QueryClientProvider>
    );
}

