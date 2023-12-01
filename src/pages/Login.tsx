import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../assets/style/Login.scss';
import '../assets/style/confeti.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Login = () => {
  const auth = useAuthStore((state) => state.auth);
  const logged = useAuthStore((state) => state.logged);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const onHandleEventUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onHandleEventPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth({ username, password });
  };

  useEffect(() => {
    if (logged) {
      navigate('/admin');
    }
  }, [logged, navigate]);

  return (
    <>
      <section className="section-login">
        <form id="form-login" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              required
              onChange={(e) => onHandleEventUsername(e)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              required
              onChange={(e) => onHandleEventPassword(e)}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </section>
    </>
  );
};

export default Login;
