import './globals.scss';
import { Live } from './components/live/live.component';
import { Navbar } from './components/navbar/navbar.component';
import { NavbarToolbar } from './components/navbar/toolbar/toolbar.component';
import { ActiveUsers } from './components/user/active/active.component';
import { LeftSidebar } from './components/sidebar/left/lef.component';
import { RightSidebar } from './components/sidebar/right/right.component';
import { ElementLayers } from './components/sidebar/left/layers/layers.component';

export default function Page() {
  return (
    <div className="app-root-container">
      <Navbar>
        <NavbarToolbar />
        <ActiveUsers />
      </Navbar>
      <section id="main-section--container">
        <LeftSidebar>
          <ElementLayers />
        </LeftSidebar>
        <Live />
        <RightSidebar />
      </section>
    </div>
  );
}
