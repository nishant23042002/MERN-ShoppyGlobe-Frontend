import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function Auth() {

    //context of the closemodal coming from app.jsx were close modal is function that sets value of modal to false
    const { closeModal } = useOutletContext();
    //context of user coming from app.jsx which helps us to check whether user is their or not
    //which helps in checking login logout functionality
    const { setUser } = useOutletContext();


    //to handle toggle password and text on click or mousedown
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(true);
    const [error, setError] = useState()


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            name,
            email,
            password
        }

        // Choose API URL based on whether registering or logging in
        const url = isRegistering
            ? "http://localhost:3001/api/users/register"
            : "http://localhost:3001/api/users/login"
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();

            if (!res.ok) {
                // Show error if registration/login failed
                setError(data.message)
                return;
            }
            if (!isRegistering) {
                // If login is successful, store user and token in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                // Update global user state and clear form
                setUser(data.user);
                setName("");
                setEmail("");
                setPassword("");

                // Close modal on successful login
                closeModal();
            } else {
                // After registration, sending user directing to login modal and keeping email field filled with email
                setIsRegistering(false);
                setPassword("");
                setError("Registered successfully. Please log in.");
            }
        }
        catch (err) {
            console.error("Something went wrong", err)
        }
    }


    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50">

                {/* Modal content */}
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-auto">
                    <div className="flex justify-end items-center">
                        <button onClick={closeModal}
                            className="cursor-pointer font-extrabold">
                            <span className="text-gray-400 hover:text-black duration-300"><MdOutlineCancelPresentation size={"23px"} /></span>
                        </button>
                    </div>
                    <div>
                        <h2 className="text-center text-gray-500 font-bold">{isRegistering ? "Register User" : "Login User"}</h2>
                        <h2 className="text-center text-red-800 font-bold">{!isRegistering ? (<span className="text-green-600">{error}</span>) : error}</h2>

                        <form className="flex justify-center items-center flex-col px-8" onSubmit={handleSubmit}>
                            {
                                //conditoionally rendering name field if user is registering user input will be shown otherwise it won't
                                isRegistering ? (
                                    <input value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="p-3 border border-gray-400 rounded-md outline-none my-2" type="text" placeholder="Enter Your Name" required
                                    />
                                ) : ""
                            }
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 border border-gray-400 rounded-md outline-none my-2"
                                type="email" name="email" id="Email"
                                placeholder="Enter Your Email" required
                            />

                            <div className="relative">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex p-3 border border-gray-400 rounded-md outline-none my-2"
                                    type={showPassword ? "text" : "password"}
                                    name="password" id="Password" placeholder="Enter Your Password"
                                    required
                                />

                                {/* Password input with show/hide toggle */}
                                <button onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} onMouseLeave={() => setShowPassword(false)}
                                    className="absolute top-6 right-3 text-gray-600">
                                    {showPassword ? <FaEye size={"18px"} /> : <FaEyeSlash size={"18px"} />}
                                </button>
                            </div>

                            <button
                                className="cursor-pointer bg-blue-800 p-2 border border-gray-400 w-30 mb-4 rounded-xl text-white hover:bg-green-600 duration-200 font-bold"
                                type="submit">{isRegistering ? "Sign Up" : "Sign In"}
                            </button>

                            <p className="text-gray-600 text-sm">
                                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                                <span
                                    onClick={() => setIsRegistering(!isRegistering)}
                                    className="underline text-blue-600 cursor-pointer"
                                >
                                    {isRegistering ? "Log In" : "Sign Up"}
                                </span>
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Auth