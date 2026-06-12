import { useState } from "react";
import { Register } from "../services/AuthService.js";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/Token.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterButton({ username, email, password }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const registerHandler = async () => {
    setLoading(true);
    try {
      const response = await Register({ username, email, password });
      setToken(response.token);
      setUser(response.user);

      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={registerHandler} disabled={loading} className="p-2 bg-zinc-900 text-white">register</button>
  )
}