import DoctorLogin from "../../assets/DoctorLogin.png";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { MailIcon, LockClosedIcon } from "@heroicons/react/outline";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import axiosInstance from "../../config/axiosInstance";
import doctorEndPoints from "../../config/doctors/doctorApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { SignIn } from "../../redux/authSlice";

const LoginDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      setError("");
      try {
        const response = await axiosInstance.post(doctorEndPoints.DOCTOR.LOGIN, {
          email: values.email,
          password: values.password,
        });

        if (response.data) {
          const user = response.data.data;
          console.log("doctor", user);
          console.log("user role", user.user.role);

          dispatch(SignIn(user));
          window.dispatchEvent(new Event("loginChange"));
          toast.success("Great to see you again, Doctor! ");

            if (user.user.role === "doctor") {
              navigate("/doctor/dashboard");
            }
        } else {
          toast.error("Incorrect Email or Password. Please Try Again");
        }
      } catch (err) {
        const errorMsg =
          err.response && err.response.status === 401
            ? "Incorrect Email or Password. Please Try Again."
            : "An error occurred while logging in. Please try again.";
        toast.error(errorMsg);
      }
    },
  });

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("loggedInUser");
  //   if (loggedInUser) {
  //     const user = JSON.parse(loggedInUser);
  //     formik.setValues({ email: user.email || "", password: user.password || "" });
  //   }
  // }, []);

  return (
    <div className="min-h-screen bg-blue-regBg flex flex-col justify-center items-center px-4 sm:px-8 lg:px-0">
      {/* Registration Form */}
      <div className="w-full max-w-[1150px] h-auto sm:h-[575px] bg-white rounded-2xl flex flex-col sm:flex-row overflow-hidden">
                <div className="hidden sm:flex w-1/2 flex-col justify-center items-center">
          <img src={DoctorLogin} alt="Doctime Logo" className="sm:w-96 sm:h-96" />
        </div>
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-default mb-6 text-center">
            Sign In As Doctor
          </h2>

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
                className="w-full text-gray-700 focus:outline-none"
              />
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
                className="w-full text-gray-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordView}
                className="h-6 w-6 text-gray-700 mr-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p>
              <a href="/forgot-password" className="text-base">
                Reset Password?
              </a>
            </p>

            <input
              type="submit"
              value="Sign In"
              className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 px-8 sm:px-56 text-lg font-semibold mt-5 w-full"
            />
          </form>

          <div className="text-center mt-4">
            <p className="text-sm my-2 mb-4">- OR -</p>
            <div>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const post = await axios.post(
                    "http://localhost:5555/api/auth/google",
                    credentialResponse
                  );

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
          <p className="text-sm mt-4 text-center">
            New Here? Join us today by{" "}
            <a
              href="/register"
              className="text-blue-500 text-base font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>

      </div>
      <Link to="/">
      <button className="mt-4 px-4 py-3 bg-blue-default font-bold rounded-full text-white">Back To Home 🏠︎ </button>
      </Link>
    </div>
  );
};

export default LoginDoctor;
