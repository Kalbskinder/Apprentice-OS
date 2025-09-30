"use client"

import { useEffect, useState } from "react";
import "./LockScreen.css"

export default function LockScreen() {
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [state, setState] = useState("lock-screen");

    const formatDate = (d: Date) => {
        const day = d.getDate();
        const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(d);
        return `${day}. ${monthYear}`;
    };

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());
    const [date, setDate] = useState(() => formatDate(new Date()));

    const triggerFormError = (error: string, type: string) => {
        switch (type) {
            case "username":
                setUsernameError(error)
                document.getElementById("username-error")?.classList.remove("hidden");
                break;
            case "password":
                setPasswordError(error)
                document.getElementById("password-error")?.classList.remove("hidden");
                document.getElementById("confirm-password-error")?.classList.remove("hidden");
                break;
        }
    }

    const toggleForm = () => {
        const loginForm = document.querySelector(".login-form") as HTMLElement | null;
        const signUpForm = document.querySelector(".signup-form") as HTMLElement | null;
        loginForm?.classList.toggle("hidden");
        signUpForm?.classList.toggle("hidden");

        if (loginForm?.classList.contains("hidden")) {
            setState("sign-up")
        } else {
            setState("login")
            if (usernameError == "") setUsernameError("Username is required")
            if (passwordError == "") setPasswordError("Password is required")
        }

    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === " ") {
                if (state !== "lock-screen") return
                const lockScreen = document.querySelector(".lock-screen") as HTMLElement | null;
                const lockScreenBg = document.querySelector(".lock-screen-bg") as HTMLElement | null;
                const loginForm = document.querySelector(".lock-screen-login-container") as HTMLElement | null;

                // Reset error messages
                document.getElementById("username-error")?.classList.add("hidden");
                document.getElementById("password-error")?.classList.add("hidden");
                document.getElementById("confirm-password-error")?.classList.add("hidden");


                if (lockScreen && lockScreenBg && loginForm) {
                    loginForm.classList.remove("hidden");
                    loginForm.style.transform = "translateY(100%)";

                    requestAnimationFrame(() => {
                        lockScreen.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
                            { duration: 250, fill: "forwards", easing: "ease-in-out" }
                        );

                        lockScreenBg.animate([{ filter: "brightness(1)" },{ filter: "brightness(0.6)" }],
                            { duration: 250, fill: "forwards", easing: "ease-in-out" }
                        );

                        loginForm.animate([{ transform: "translateY(100%)" },{ transform: "translateY(-90%)" }],
                            { duration: 250, fill: "forwards", easing: "ease-in-out" }
                        );
                    });
                    setState("login")
                }
            }
            if (event.key === "Escape") {
                if (state !== "login" && state !== "sign-up") return
                const lockScreen = document.querySelector(".lock-screen") as HTMLElement | null;
                const lockScreenBg = document.querySelector(".lock-screen-bg") as HTMLElement | null;
                const loginForm = document.querySelector(".lock-screen-login-container") as HTMLElement | null;

                if (lockScreen && lockScreenBg && loginForm) {
                    loginForm.classList.add("hidden");
                    loginForm.style.transform = "translateY(100%)";

                    requestAnimationFrame(() => {
                        lockScreen.animate([{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
                            { duration: 250, fill: "forwards", easing: "ease-in-out" }
                        );

                        lockScreenBg.animate([{ filter: "brightness(0.6)" }, { filter: "brightness(1)" }],
                            { duration: 250, fill: "forwards", easing: "ease-in-out" }
                        );

                        loginForm.animate([{ transform: "translateY(-90%)" }, { transform: "translateY(100%)" }],
                            { duration: 250, fill: "forwards", easing: "ease-in-out" }
                        );
                    });
                    setState("lock-screen")

                }
            }
            if (event.key === "Enter") {
                if (state === "login") {
                    if (username === "") triggerFormError("Username is required", "username");
                    if (password === "") triggerFormError("Password is required", "password");

                    // TODO: Make api request to backend
                }
                if (state === "sign-up") {
                    if (username === "") triggerFormError("Username is required", "username");
                    if (password === "") triggerFormError("Password is required", "password");
                    if (password !== confirmPassword) triggerFormError("Passwords do not match", "password");
                    if (password.length < 8) triggerFormError("Password must be at least 8 characters", "password");

                    // TODO: Make api request to backend
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [state, password, confirmPassword, username]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
            setDate(formatDate(now));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className="lock-screen-bg"></div>    
            <div className="lock-screen">
                <div className="lock-clock">
                    <div className="time">{time}</div>
                    <div className="date">{date}</div>
                </div>
                <div className="input-prompt">Press [Space] to continue</div>
            </div>
            <div className="lock-screen-login-container hidden">
                { /* Login Form */}
                <div className="lock-screen-login login-form">
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <div className="hidden error" id="username-error">{usernameError}</div>

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="hidden error" id="password-error">{passwordError}</div>

                    <div className="align-left">
                        <a className="no-acc" onClick={toggleForm}>Don't have an account?</a>
                    </div>
                </div>

                {/* Sign-Up Form */}
                <div className="lock-screen-login hidden signup-form">
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <div className="hidden error" id="username-error">{usernameError}</div>

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="hidden error" id="password-error">{passwordError}</div>

                    <input
                        type="password"
                        placeholder="Retype Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    <div className="hidden error" id="confirm-password-error">{passwordError}</div>
                    
                    <div className="align-left">
                        <a className="no-acc" onClick={toggleForm}>Already have an account?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}