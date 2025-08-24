import './left.style.scss';

export const LeftSidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => (
  <section id="left-sidebar--container" className="max-sm:hidden">
    <h3>Layers</h3>
    <div className="left-sidebar--layers-container">{children}</div>
  </section>
);
