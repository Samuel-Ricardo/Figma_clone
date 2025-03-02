import './globals.scss';
import { Live } from './components/live/live.component';
import { Navbar } from './components/navbar/navbar.component';
import { NavbarToolbar } from './components/navbar/toolbar/toolbar.component';
import { ActiveUsers } from './components/user/active/active.component';

export default function Page() {
  return (
    <div className="app-root-container">
      <Navbar>
        <NavbarToolbar />
        <ActiveUsers />
      </Navbar>
      <Live />
    </div>
  );
}
