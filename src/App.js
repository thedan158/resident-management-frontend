import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/organisms/header';
import Footer from './components/organisms/footer';
import RegisterLayout from "./layout/register";
import RegisterPage from './pages/register';
import Login from "./pages/login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import ServicePage from "./pages/service";
import IdCardRepublish from "./pages/service/idCard";
import PageLoader from "./components/common/pageLoader";
import RequestStatus from "./pages/service/requestStatus";
import ChangePassword from "./pages/change-password";


function App() {
  const state = useSelector((state) => state)
  console.log('current state', state)
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterLayout><RegisterPage /></RegisterLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/addIDCard" element={<IdCardRepublish />} />
          <Route path="/requestStatus" element={<RequestStatus />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <PageLoader />
      <Footer />
    </>
  );
}

export default App;
