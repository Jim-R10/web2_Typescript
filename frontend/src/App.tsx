import { useEffect, useState, type SubmitEvent } from 'react';
import { authService } from './services/authService';
import { studentService, type Student } from './services/studentService';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadStudents();
    }
  }, [isLoggedIn]);

  async function loadStudents() {
    try {
      setStudents(await studentService.getAll());
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    setError('');
    try {
      await authService.login({ email, password });
      setIsLoggedIn(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function handleLogout() {
    authService.logout();
    setIsLoggedIn(false);
    setStudents([]);
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Se connecter</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="students-container">
      <div className="header">
        <h1>Liste des étudiants</h1>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.firstName} {s.lastName} — {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;