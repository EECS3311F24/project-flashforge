import Navbar from '../components/Navbar';

export default function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <h2>New User</h2>
      <form>
        <input type="text" placeholder="New Username" />
        <input type="password" placeholder="New Password" />
        <button type="submit">Sign Up</button>
      </form>
      <div className="sidebar"><Navbar></Navbar></div>
    </div>
  );
}
