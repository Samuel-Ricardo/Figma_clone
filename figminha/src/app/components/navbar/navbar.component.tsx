import './navbar.style.scss';

import Image from 'next/image';
import Logo from '../../../../public/assets/logo.svg';

export const Navbar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <nav id="navbar--container">
      <Image src={Logo} alt="logo" width={58} height={20} />
      {children}
    </nav>
  );
};
