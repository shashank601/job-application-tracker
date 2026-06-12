import {useState} from 'react'
import { Login } from '../services/AuthService.js';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginButton({email, password}) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const {setUser} = useAuth();

	const loginHandler = async () => {
		setLoading(true);
		try {
			const response = await Login({email, password});
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
    <button onClick={loginHandler} disabled={loading} className="p-2 bg-zinc-900 text-white  ">login</button>
  )
}