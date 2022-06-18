import { Outlet } from "react-router-dom";



export default function ProtectedLayer() {
    return (
        <>
            <Outlet />
        </>
    );
  }