import { useSelector } from "react-redux";
import ButtonLogSub from "./ButtonLogSub/buttonLogSub";
import Logo from "./Logo/logo"
import NavBarIcon from "../NavBarIcon/navBarIcon";
import './header.scss';

function Header() {

  const isLogged = useSelector((state) => state.user.isLogged)

  return (
    <header className="header w-full flex flex-wrap justify-between bg-slate-900">
      <Logo />
      <div className="icon-header w-2/5">
        {isLogged && <NavBarIcon />}
      </div>
      {!isLogged && <ButtonLogSub />}
    </header>
  );
}

export default Header;