import Logo from "../assets/Doctime.png";
// import RegImage from "../assets/RegPage.webp";
import Google from "../assets/Google.webp"
import { MailIcon, LockClosedIcon } from '@heroicons/react/outline';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(""); // Reset any existing errors
      try {
        const response = await axiosInstance.post(endPoints.AUTH.LOGIN, {
          email: values.email,
          password: values.password,
        });

        const user = response.data;
        const { role } = response.data;

        // Handle the response from your backend
        if (user) {
          if (user.isBlocked) {
            setError("Your account is temporarily blocked. Try again later.");
            return;
          }

          // localStorage.setItem("loggedInUser", JSON.stringify(user));
          // localStorage.setItem("cart", JSON.stringify(user.cart || []));
          // localStorage.setItem("wishlist", JSON.stringify(user.wishlist || []));
          // window.dispatchEvent(new Event("loginChange"));

          if (role === "admin") {
            toast.success(
              <div
                style={{
                  backgroundColor: "#ffe5b4",
                  border: "1px solid #ffcc00",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Welcome Back Admin! Ready to manage things? 🛠️✨
                </span>
              </div>
            );
            navigate("/admin/dashboard");
          } else {
            toast.success(
              <div
                style={{
                  backgroundColor: "#ffe5b4",
                  border: "1px solid #ffcc00",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <span style={{ fontWeight: "bold", color: "black" }}>
                  You&apos;re in! Time to explore all baby things! ✨🎉
                </span>
              </div>
            );
            navigate("/");
          }
        } else {
          setError("Incorrect Email or Password. Please Try Again.");
        }
      } catch (err) {
        // Check if the error is related to incorrect credentials
        if (err.response && err.response.status === 401) {
          setError("Incorrect Email or Password. Please Try Again.");
        } else {
          setError("An error occurred while logging in. Please try again.");
        }
      }
    },
  });


  return (
    <div className="min-h-screen bg-blue-200 flex justify-center items-center">

      {/* Registration Form */}
      <div className="w-[1180px] h-[625px] bg-white rounded-2xl flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-blue-default mb-6 text-center">Log In</h2>
          <form className="space-y-4">
            <div className="flex items-center border-b border-gray-300 py-2 bg-white">
              <MailIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input 
              type="email" 
              name="email"
              placeholder="Enter Your E-mail" 
              value={formik.values.email}
              onChange={formik.handleChange}
              required
              className="w-full text-gray-700 focus:outline-none" />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <LockClosedIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Enter Your Password" 
              value={formik.values.password}
              onChange={formik.handleChange}
              required
              className="w-full text-gray-700 focus:outline-none" />
              <button 
              type="button"
              onClick={togglePasswordView}
              className="h-6 w-6 text-gray-700 mr-2">
                {showPassword? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p><a href="/login" className="text-base">Forgot Password ?</a></p>

            <input
            type="submit"
            value="Log In"
            disabled={!formik.isValid} 
            className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 px-56 text-lg font-semibold" />
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm my-2 mb-4">- OR -</p>
            <button className="bg-white text-gray-600 hover:bg-gray-200 font-semibold rounded-full py-2 px-[165px] border border-gray-300 flex items-center justify-center">
              <img src={Google} alt="Google Icon" className="w-6 h-6 mr-3"/>
              Sign Up with Google
            </button>
          </div>
          <p className="text-sm mt-4 ml-40">New Here? Join us today by <a href="/register" className="text-blue-500 text-base font-semibold">Sign Up</a></p>
          </div>

        {/* Right Section */}
        <div className="w-1/2 bg-blue-default flex flex-col justify-center items-center text-white p-8">
        <img src={Logo} alt="Doctime Logo" className="w-44 h-28" />
          <h1 className="text-4xl font-bold mb-4">Good to see you again..!</h1>
          <p className="text-lg font-semibold mb-4">Welcome !</p>
          <p className="text-sm">We&apos;re here to care your health and well-being.</p>
          <p className="text-sm mb-4">Schedule your appointment today for a healthier tommorrow.</p>
          <p className="text-lg font-semibold mb-4">Login now!</p>
          <button className="text-lg py-3 px-[18px] rounded-full bg-white text-blue-500">
            <span>←</span> 
          </button>
        </div>



      </div>
    </div>
  );
};

export default Login;


