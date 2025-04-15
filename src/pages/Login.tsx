
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSimpleToast } from "@/components/SimpleToast";

const Login = () => {
  const navigate = useNavigate();
  const toast = useSimpleToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="space-y-1 mb-4">
              <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
              <p className="text-center text-gray-600">
                Enter your email below to access the VillageHub platform
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium">Password</label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input 
                  id="password"
                  name="password" 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox" 
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="rememberMe" className="text-sm font-normal">Remember me</label>
              </div>
              <button 
                type="submit" 
                className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-green-600 hover:underline">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
