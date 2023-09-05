import { Link } from 'react-router-dom'

const TestPage = () => {

    const name = localStorage.getItem("name")
    return (
        <>
            <Link to="/">
                <button className="bg-primary-500 text-white absolute rounded-md px-2 py-1">
                    Go back
                </button>
            </Link>
            <div className="w-full h-screen flex justify-center  items-center">
                <div className="text-center flex flex-col gap-5 w-80">
                    <h1 className="text-4xl font-medium">Test Page</h1>
                    <p className="text-2xl font-extralight">Hello, {name}</p>
                </div>
            </div>
        </>
    )
}

export default TestPage