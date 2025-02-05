import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../config/axiosInstance";
import doctorEndPoints from "../../config/doctors/doctorApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const {token} = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try{
        const response = await axiosInstance.post(doctorEndPoints.DOCTOR.RESET_PASSWORD.replace(":token", token),
        { password: values.password });
        if(response.status === 200){
          formik.resetForm();
          toast.success("Password Updated Successfully")
        }
      } catch(error){
        console.error("Error updating password:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "An error occurred while updating password. Please try again.")
    }
  },
});

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-regBg px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-blue-default text-center">Set a new password</h2>
        <p className="text-gray-600 text-sm mt-2 text-center">
          Create a new password. Ensure it differs from previous ones.
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-4">
          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Update Password Button */}
          <button
            type="submit"
            className="w-full mt-4 group relative px-4 py-2 flex justify-center bg-blue-default text-base font-bold rounded-md text-white hover:bg-[#13D4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13D4F6] transition duration-150 ease-in-out"
          >
            Update Password
          </button>

          {/* Back to Login Button */}
          <Link to="/doctor-login">
            <button
              type="button"
              className="w-full mt-4 group relative px-4 py-2 flex justify-center bg-blue-default text-base font-bold rounded-md text-white hover:bg-[#13D4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13D4F6] transition duration-150 ease-in-out"
            >
              Back To Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
