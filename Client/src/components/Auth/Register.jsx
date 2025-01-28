import Logo from "../../assets/Doctime.png";
import { UserIcon, MailIcon, PhoneIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useNavigate,Link } from "react-router-dom";
import { useFormik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../config/axiosInstance";
import endPoints from "../../config/endPoints";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexMobile = /^[0-9]{10}$/;

    if (!values.fullname) {
      errors.fullname = "Name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.mobile) {
      errors.mobile = "Mobile is required!";
    } else if (!regexMobile.test(values.mobile)) {
      errors.mobile = "Mobile number must be 10 digits!";
    }

    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 6) {
      errors.password = "Password should contain at least 6 characters.";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      mobile: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          endPoints.AUTH.REGISTER,
          {
            name: values.fullname,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
          }
        );
        console.log("Registration success:", response);

        toast.success("You're officially registered, Login to Continue🎉");
        console.log("Registration success:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
        const errorMessage = error.response?.data?.message || "Error registering user";
        toast.error(errorMessage);
      }
    },
  });

  return (
<div className="min-h-screen bg-blue-200 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-0">
  <div className="w-full max-w-[1150px] h-auto sm:h-[575px] bg-white rounded-2xl flex flex-col sm:flex-row overflow-hidden shadow-lg">
    {/* Left Section */}
    <div className="hidden sm:flex w-1/2 bg-blue-default flex-col justify-center items-center text-white p-8">
      <img src={Logo} alt="Doctime Logo" className="w-32 h-20 sm:w-44 sm:h-28" />
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">DOCTIME</h1>
      <p className="text-sm sm:text-lg font-semibold mb-4 text-center">
        Your Way to Expert Care.
        <br />
        Your Health, Our Priority.
      </p>
      <p className="text-xs sm:text-sm mb-4 text-center">
        Join us for an exclusive journey to better health.
      </p>
      <p className="text-sm sm:text-lg font-semibold mb-6 text-center">Register now!</p>
    </div>

    {/* Right Section */}
    <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-default mb-6 text-center">
        Sign Up
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <UserIcon className="h-6 w-6 text-gray-700 mr-2" />
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-gray-700 focus:outline-none"
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.fullname}</p>
          )}
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <MailIcon className="h-6 w-6 text-gray-700 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-gray-700 focus:outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <PhoneIcon className="h-6 w-6 text-gray-700 mr-2" />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-gray-700 focus:outline-none"
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
          )}
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <LockClosedIcon className="h-6 w-6 text-gray-700 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full text-gray-700 focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordView}
            className="h-6 w-6 text-gray-700 mr-2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 sm:py-2 px-8 sm:px-56 text-lg font-semibold mt-5 ml-2 w-full"
        />
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 text-base font-semibold">
            Sign in
          </a>
        </p>
        <p className="text-sm my-2">- OR -</p>
        <div>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const post = await axiosInstance.post("/auth/google", credentialResponse);

              const user = post.data.data;
              console.log("post user", user);
              localStorage.setItem("loggedInUser", JSON.stringify(user));
              localStorage.setItem("secretToken", JSON.stringify(user.token));
              localStorage.setItem("role", "User");
              navigate("/home");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-6">
        Your Health, Your Schedule, One Click Away
      </p>
    </div>
  </div>
  <Link to="/">
  <button className="mt-4 px-6 py-3 bg-blue-default font-bold rounded-full text-white">Back</button>
  </Link>
</div>

  );
};

export default Register;
