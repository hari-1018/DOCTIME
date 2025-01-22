import Logo from "../assets/Doctime.png";
import Google from "../assets/Google.webp"
import { MailIcon, LockClosedIcon } from '@heroicons/react/outline';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";
import Modal from "../components/Modal";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [modalMessage, setModalMessage] = useState(null);

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(""); 
      try {
        const response = await axiosInstance.post(
          endPoints.AUTH.LOGIN, 
        {
          email: values.email,
          password: values.password,
        });      

        if (response.data) {
          const user = response.data.data;
          // console.log("user", user)
          if (user.user.isBlocked) {
            setModalMessage({ message: "Your account is temporarily blocked. Try again later.", type: "error" });
            return;
          }
          console.log("user role", user.user.role)



          localStorage.setItem("loggedInUser", JSON.stringify(user));
          localStorage.setItem("secretToken", JSON.stringify(user.token));
          window.dispatchEvent(new Event("loginChange"));


          setModalMessage({ message: "Sign in Successful!", type: "success"});
          
          setTimeout(() => {
            navigate(user.user.role === "admin" ? "/admin/dashboard" : "/home");
          }, 1000);
        } else {
          setModalMessage({ message: "Incorrect Email or Password. Please Try Again.", type: "error" });
        }
      } catch (err) {
        const errorMsg = err.response && err.response.status === 401 
          ? "Incorrect Email or Password. Please Try Again." 
          : "An error occurred while logging in. Please try again.";
        setModalMessage({ message: errorMsg, type: "error" });
      }
    },
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      formik.setValues({ email: user.email, password: user.password });
    }
  }, []);



  return (
    <div className="min-h-screen bg-blue-200 flex justify-center items-center">

      {/* Registration Form */}
      <div className="w-[1180px] h-[625px] bg-white rounded-2xl flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-blue-default mb-6 text-center">Sign In</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            value="Sign In" 
            className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 px-56 ml-2 text-lg font-semibold mt-5" />
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
      {modalMessage && <Modal message={modalMessage.message} type={modalMessage.type} onClose={() => setModalMessage("")} />}
    </div>
  );
};

export default Login;


