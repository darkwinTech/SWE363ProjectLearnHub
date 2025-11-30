import {useState} from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({email: "", password: ""});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate(); 

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm((f) => ({...f, [name]: value}) );
    };

    const validate = () => {
        const errors = {};
        if (!form.email.trim()) errors.email = "Email is required";
        if (!form.password) errors.password = "Password is required";
        return errors;
    };
    const errors = validate();

    const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

	// onSubmit calls backend
	const onSubmit = async (e) => {
		e.preventDefault();
		setTouched({ email: true, password: true });
		if (Object.keys(errors).length) return;

		const { email, password } = form;

		try {
			const res = await fetch("http://localhost:5000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email, 
					password,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message || "Invalid credentials");
				return;
			}

			// Save token and role from backend
			localStorage.setItem("token", data.token);
			localStorage.setItem("userType", data.user.role);
			localStorage.setItem("userId", data.user.id);

			// Redirect based on role
			if (data.user.role === "admin") {
				navigate("/admin");
			} else if (data.user.role === "tutor") {
				navigate("/tutor");
			} else {
				// student
				navigate("/student");
			}
		} catch (err) {
			console.error(err);
			alert("Server error. Please try again.");
		}
	};
    return (
        <div className="login-page">
            <div className="card login-card shadow-sm rounded-4 overflow-hidden">
                {/* Header image + title */}
                <div className="position-relative login-hero">
                    <img
                        src="/visit-kfupm-img.jpg"
                        alt="Learn Hub"
                        className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-success opacity-75"></div>
                    <h1 className="position-absolute top-50 start-50 translate-middle text-white fw-bold m-0 text-center">
                        LEARN HUB
                    </h1>
                </div>

                <div className="card-body p-5">
                    <p className="text-center mb-4 text-muted">
                        Sign in with your KFUPM account
                    </p>

                    <form onSubmit={onSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                inputMode="email"
                                placeholder="email"
                                className={`form-control ${
                                    touched.email && errors.email ? "is-invalid" : ""
                                }`}
                                value={form.email}
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete="email"
                            />
                            <div className="invalid-feedback">{errors.email}</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                                className={`form-control ${
                                    touched.password && errors.password ? "is-invalid" : ""
                                }`}
                                value={form.password}
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete="current-password"
                            />
                            <div className="invalid-feedback">{errors.password}</div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success btn-lg rounded-pill">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
