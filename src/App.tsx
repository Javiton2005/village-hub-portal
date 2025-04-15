
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Villages from "./pages/Villages";
import VillageDetails from "./pages/VillageDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/villages" element={<Villages />} />
      <Route path="/village/:id" element={<VillageDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
