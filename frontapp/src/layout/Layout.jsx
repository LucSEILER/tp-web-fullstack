import Navbar from "../components/molecules/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary text-white">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
