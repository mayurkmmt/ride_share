import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <main className="flex flex-grow mx-auto px-4 py-6">
      <div className="w-96 mx-auto bg-black/60 rounded-xl shadow-lg backdrop-blur-md text-white">
        <Outlet />
      </div>
    </main>
  );
};

export default DefaultLayout;
