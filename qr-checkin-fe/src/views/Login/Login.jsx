import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    document.title = "Login";

    const [credentials, setCredentials] = useState({
        name: undefined,
        password: undefined,
    });

    // const { setAuth } = useAuth();

    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    // const userRef = useRef();
    // const errRef = useRef();

    // const [name, setUser] = useState('');
    // const [password, setPwd] = useState('');
    // const [errMsg, setErrMsg] = useState('');

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    // useEffect(() => {
    //     setErrMsg('');
    // }, [name, password]);

    // // Organize for clean code
    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         debugger;
    //         const res = await axios.post(
    //             "https://qr-code-checkin.vercel.app/api/auth/manage-admin/login-admin", 
    //             JSON.stringify({ name, password }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }, 
    //         );
    //         const accessToken = res?.data?.accessToken;
    //         const role = res?.data?.details?.role;
    //         setAuth({ name, password, role, accessToken });
    //         setUser('');
    //         setPwd('');
    //         navigate(from, { replace: true });
    //     } catch (err) {
    //         console.log(err);
    //         if (!err?.res) {
    //             setErrMsg('No Server Response');
    //         } else if (err.res?.status === 400) {
    //             setErrMsg('Missing Username or Password');
    //         } else if (err.res?.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg('Login Failed');
    //         }
    //         // errRef.current.focus();
    //     }finally{
    //         navigate("/")
    //     }
    // };

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInput = (e) => {
        // debugger;
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLogin = async (e) => {
        // debugger;
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://qr-code-checkin.vercel.app/api/auth/manage-admin/login-admin", credentials, { withCredentials: true });
            if (res?.data?.details?.name) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                navigate("/employee");
            }
        } catch (err) {
            console.log(err);
            dispatch({ type: "LOGIN_FAILURE", payload: "errr" });
        }
    }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                        Sign in
                    </h1>
                    <form className="mt-6">
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Username
                            </label>
                            <input
                                id="name"
                                onChange={handleInput}
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                onChange={handleInput}
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button
                                onClick={handleLogin}
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {/* 
                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="font-medium text-purple-600 hover:underline"
                        >
                            Sign up
                        </a>
                    </p> 
                    */}
                </div>
            </div>
        </>
    )
}

export default Login;

