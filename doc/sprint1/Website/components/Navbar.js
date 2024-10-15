import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/create">Create Deck</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
