import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Food from "./pages/Food";
import FoodFormCreate from "./pages/FoodFormCreate";
import FoodFormEdit from "./pages/FoodFormEdit";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import OrderFormEdit from "./pages/OrderFormEdit";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />

                    {/* Private Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/foods" element={<Food />} />
                    <Route path="/foods/create" element={<FoodFormCreate />} />
                    <Route path="/foods/edit/:id" element={<FoodFormEdit />} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/orders/:id" element={<OrderDetail />} />
                    <Route
                        path="/orders/:id/edit"
                        element={<OrderFormEdit />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
