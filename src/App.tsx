import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom"
import TestPage from "./TestPage";
import Card from "./components/Card/Card";
import LocationPage from "./pages/slug";

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

    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            //SEND POST REQUEST TO 
            fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60&lon=11")
                .then((res) => res.json())
    });

    if (error) return <p>
        Error: {error && <> {error.toString()} </>}
    </p>

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <div>
                <button onClick={() => navigate("/test")}>Test</button>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <Card>  <h1>Test</h1> </Card>

            </div>
        </>
    );
}
