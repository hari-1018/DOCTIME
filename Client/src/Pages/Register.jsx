import Logo from "../assets/Doctime.png";
// import RegImage from "../assets/RegPage.webp";
import Google from "../assets/Google.webp"
import { UserIcon, MailIcon, PhoneIcon, LockClosedIcon } from '@heroicons/react/outline';
import {useNavigate, Link} from "react-router-dom";
import {useFormik} from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const navigate = useNavigate();

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

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      mobile: "", // mobile number is kept as a string here
    },
    validate,
    onSubmit: async (values) => {
      try {
        const requestData = {
          name: values.fullname,
          email: values.email,
          password: values.password,
          mobile: values.mobile, // mobile number is passed as a string
        };

        // Use the axios instance to send data to the backend
        // const response = await axiosInstance.post(
        //   endPoints.AUTH.REGISTER,
        //   requestData
        // );

        toast.success(
          "🎉 Welcome to the family! You're officially registered."
        );
        console.log("Registration success:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);

        // Specific error message if available
        const errorMessage =
          error.response?.data?.message || "Error registering user.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen bg-blue-200 flex justify-center items-center">

      {/* Registration Form */}
      <div className="w-[1180px] h-[625px] bg-white rounded-2xl flex overflow-hidden shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 bg-blue-default flex flex-col justify-center items-center text-white p-8">
        <img src={Logo} alt="Doctime Logo" className="w-44 h-28" />
          <h1 className="text-4xl font-bold mb-4">DOCTIME</h1>
          <p className="text-lg font-semibold mb-4">Your Way to Expert Care.<br />Your Health, Our Priority.</p>
          <p className="text-sm mb-4">Join us for an exclusive journey to better health.</p>
          <p className="text-lg font-semibold mb-10">Register now!</p>
          <button className="text-lg py-3 px-[18px] rounded-full bg-white text-blue-500">
            <span>→</span> 
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-default mb-6 text-center">Sign Up</h2>
          <form 
            onSubmit={formik.handleSubmit}
            className="space-y-4">

            <div className="flex items-center border-b border-gray-300 py-2">
              <UserIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input 
              type="text" 
              name="fullname"
              placeholder="Full Name"
              value={formik.values.fullname} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-gray-700 focus:outline-none" />

            {formik.touched.fullname && formik.errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.fullname}
            </p>
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
              className="w-full text-gray-700 focus:outline-none" />

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
              className="w-full text-gray-700 focus:outline-none" />
              {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
              )}
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <LockClosedIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input 
              type="password" 
              name="password"
              placeholder="Create Password" 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-gray-700 focus:outline-none" />
              {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

          <Link to="/login">
          <input 
            type="submit"
            value="Sign Up"
            className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 px-56 text-lg font-semibold mt-5" />
          </Link>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500 text-base font-semibold">Login</a></p>
            <p className="text-sm my-2">- OR -</p>
            <button className="bg-white text-gray-600 hover:bg-gray-200 font-semibold rounded-full py-2 px-[165px] border border-gray-300 flex items-center justify-center">
              <img src={Google} alt="Google Icon" className="w-6 h-6 mr-3"/>
              Sign Up with Google
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">Your Health, Your Schedule, One Click Away</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

