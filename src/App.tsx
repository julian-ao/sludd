import { useQuery } from "@tanstack/react-query";
import { Route, Routes, Link, useNavigate } from "react-router-dom"
import TestPage from "./TestPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeTest />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
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

    return (
        <>
            <Link to="/test">
                <button className="bg-primary-500 text-white absolute rounded-md px-2 py-1">
                    Go to test page
                </button>
            </Link>

            <div className="w-full h-screen flex justify-center  items-center">
                <div className="text-center flex flex-col gap-5 w-80">
                    <pre className="text-neutral-400 text-left">
                        {isLoading
                            ? "Loading..."
                            : JSON.stringify(data.properties.timeseries[0].data.next_1_hours, null, 2)
                        }
                    </pre>
                    <div className="text-neutral-400">
                        {import.meta.env.VITE_ENV_TEST
                            ? <p className="text-green-500">
                                Environment variable found
                            </p>
                            :
                            <p className="text-red-500">
                                Environment variable not found
                            </p>
                        }
                    </div>
                    <form
                        onSubmit={(e) => {
                            localStorage.setItem("name", (e.target as HTMLInputElement).value);

                            navigate("/test")
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="border border-neutral-300 text-black rounded-md px-2 py-1"
                        />
                        <button
                            type="submit"
                            className="bg-primary-500 text-white rounded-md px-2 py-1"
                        >
                            Submit
                        </button>
                    </form>
                    <p>
                        current name: {localStorage.getItem("name") ?? "No name found"}
                    </p>
                </div>

            </div>
        </>
    );
}
