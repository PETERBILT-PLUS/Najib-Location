import { Route, createRoutesFromElements, RouterProvider,createBrowserRouter } from "react-router-dom"
import "./App.css";
import Layout from "./Layout/Layout.tsx";
import Home from "./Pages/Home/Home.tsx";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.tsx";
import AdminLayout from "./AdminLayout/AdminLayout.tsx";
import GetSingleCar from "./Pages/GetSingleCar/GetSingleCar.tsx";
import LoginAdmin from "./Pages/LoginAdmin/LoginAdmin.tsx";
import RegisterAdmin from "./Pages/RegisterAdmin/RegisterAdmin.tsx";
import AdminCars from "./Pages/AdminCars/AdminCars.tsx";
import AdminReservations from "./Pages/AdminReservations/AdminReservations.tsx";
import AdminCreateCar from "./Pages/AdminCreateCar/AdminCreateCar.tsx";
import AdminEditCar from "./Pages/AdminEditCar/AdminEditCar.tsx";
import Service from "./Pages/Service/Service.tsx";
import Contact from "./Pages/Contact/Contact.tsx";


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      {/* For The User */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/car/:carId" element={<GetSingleCar />} />
        <Route path="login" element={<LoginAdmin />} />
        <Route path="register-admin" element={<RegisterAdmin />} />
        <Route path="service" element={<Service />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* For The Admin */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="cars" element={<AdminCars />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route  path="create-car" element={<AdminCreateCar />} />
        <Route path="update-car/:car_id" element={<AdminEditCar />} />
      </Route>
    </Route>

  ));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;