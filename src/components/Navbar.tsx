import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16">
      <Link to="/" className="font-display text-lg font-bold tracking-tight">
        GQuant
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/agreement" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Agreement
        </Link>
        <Link
          to="/agreement"
          className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
