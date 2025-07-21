import { Outlet } from "react-router";

export default function LayoutAdmin() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
      <Outlet />
    </div>
  );
}
