
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSimpleToast } from "@/components/SimpleToast";

const Register = () => {
  const navigate = useNavigate();
  const toast = useSimpleToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear errors when user types
    if (name === 'password' || name === 'confirmPassword') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
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
              <h2 className="text-2xl font-bold text-center">Create an account</h2>
              <p className="text-center text-gray-600">
                Enter your information to get started with VillageHub
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  placeholder="John Doe" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
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
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input 
                  id="password"
                  name="password" 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                <input 
                  id="confirmPassword"
                  name="confirmPassword" 
                  type="password" 
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox" 
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="agreeTerms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link to="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-green-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <button 
                type="submit" 
                className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                disabled={isLoading || !formData.agreeTerms}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
