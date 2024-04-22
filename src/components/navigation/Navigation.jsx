import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Navigation = (props) => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        {props.children}
      </main>
    </div>
  );
};
export default Navigation;
