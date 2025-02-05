import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../config/axiosInstance";
import doctorEndPoints from "../../config/doctors/doctorApi";

const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post(doctorEndPoints.DOCTOR.FORGOT_PASSWORD, {
                    email: values.email,
                });

                if (response.status === 200) {
                    toast.success("Password reset link has been sent. Check your email!");
                }
            } catch (err) {
                const errorMsg =
                    err.response && err.response.status === 404
                        ? "Email not found. Please enter a registered email."
                        : "An error occurred while processing your request. Please try again.";
                toast.error(errorMsg);
                console.log(err)
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-regBg py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-blue-default">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your email to reset the password
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Email</label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-blue-default hover:bg-[#13D4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13D4F6] transition duration-150 ease-in-out"
                        >
                            Reset Password
                        </button>

                        <Link to="/doctor-login">
                            <button
                                type="button"
                                className="w-full mt-4 group relative px-4 py-2 flex justify-center bg-blue-default text-base font-bold rounded-md text-white hover:bg-[#13D4F6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13D4F6] transition duration-150 ease-in-out"
                            >
                                Back To Login
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
