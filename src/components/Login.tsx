import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface UserData {
  email: string;
  password: string;
  role: "user" | "hr" | "doctor" | "admin";
}

const Login: React.FC = () => {
  const defaultValues: UserData = {
    email: "",
    password: "",
    role: "user",
  };

  const [userData, setUserData] = useState<UserData>(defaultValues);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = ["User", "HR", "Doctor", "Admin"] as const;

  const handleRoleChange = (role: typeof roles[number]) => {
    const roleMap: Record<typeof roles[number], UserData["role"]> = {
      User: "user",
      HR: "hr",
      Doctor: "doctor",
      Admin: "admin",
    };
    setUserData({ ...userData, role: roleMap[role] });
  };

  const handleLogin = async () => {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json(); // parse only once

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // store user in AuthContext
    login(data.user);
    localStorage.setItem("token", data.token);

    // navigate by role
    switch (data.user.role) {
      case "user":
        navigate("/");
        break;
      case "hr":
        navigate("/dashboard/hr");
        break;
      case "doctor":
        navigate("/dashboard/doctor");
        break;
      case "admin":
        navigate("/dashboard/hr");
        break;
      default:
        navigate("/");
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Error logging in");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-black">Login</h1>

        {/* Role Selection */}
        <div className="flex justify-center items-center gap-8 mb-8">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`text-lg font-medium transition-all duration-200 ${
                userData.role === role.toLowerCase()
                  ? "text-black font-semibold border-b-2 border-black pb-1"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full rounded-lg border border-teal-300 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full rounded-lg border border-teal-300 p-4 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-gray-800 text-base"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-lg py-4 px-8 font-semibold shadow-lg hover:from-teal-600 hover:to-purple-600 transition-all duration-200 text-lg mt-2 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => navigate("/create-account")}
          className="text-gray-500 hover:text-gray-700 mt-6 text-sm"
        >
          Don't have an account?{" "}
          <span className="font-semibold">Register</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
