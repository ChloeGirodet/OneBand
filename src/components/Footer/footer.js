import { NavLink } from "react-router-dom";
import NavBarIcon from "../NavBarIcon/navBarIcon";
import { useSelector } from 'react-redux';

function Footer() {

  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <>
      <div className='clear'></div>
      <div className="footer">
        <div className="icon-footer">
          {isLogged && <NavBarIcon />}
        </div>
        <footer className="">

          <span className="text-sm text-emerald-500 sm:text-center"></span>
          <ul className="flex flex-col sm:flex-row flex-wrap items-center text-sm text-emerald-500">
            <li className="mr-4 hover:text-gray-500 md:mr-6">
              <NavLink to="contact">Contact</NavLink>
            </li>
            <li className="mr-4 hover:text-gray-500 md:mr-6">
              <NavLink to="CGU">Mentions légales - CGU</NavLink>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Footer;