import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/people">People</NavLink>
            </li>
            <li>
              <NavLink to="/planet">Planets</NavLink>
            </li>
            <li>
              <NavLink to="/films">Films</NavLink>
            </li>
            <li>
              <NavLink to="/starships">Starships</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>{<Outlet />}</main>
    </>
  );
};

export default Layout;
