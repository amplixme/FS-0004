import { Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-2">
        <h1 className="text-2xl font-bold text-600">Blog</h1>

        <nav className="hidden md:flex items-center gap-4">
          <Link to="/" className="hover:text-600">
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Register
          </Link>
        </nav>

        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? (
            <XMarkIcon className="w-8 h-8" />
          ) : (
            <Bars3Icon className="w-8 h-8" />
          )}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link to="/register" onClick={() => setOpen(false)}>
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
