import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import NotFound from "./components/layout/NotFound";
import AuthContextProvider from "./contexts/AuthContext";
import ProductContextProvider from "./contexts/ProductContext";
import BillContextProvider from "./contexts/BillContext";
import Dashboard from "./views/Dashboard";
import Product from "./views/Product";
import PrivateRoute from "./components/routing/PrivateRoute";
import NavbarMenu from "./components/layout/NavbarMenu";
import Bills from "./views/Bills";
import Setting from "./views/Setting";

function App() {
  return (
    <BillContextProvider>
      <ProductContextProvider>
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="login" element={<Auth authRoute="login" />} />
              <Route path="register" element={<Auth authRoute="register" />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <NavbarMenu activate="dashboard" />
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <NavbarMenu activate="products" />
                    <Product />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bills"
                element={
                  <PrivateRoute>
                    <NavbarMenu activate="bills" />
                    <Bills />
                  </PrivateRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <PrivateRoute>
                    <NavbarMenu activate="setting" />
                    <Setting />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthContextProvider>
      </ProductContextProvider>
    </BillContextProvider>
  );
}

export default App;
