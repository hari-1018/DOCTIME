import { useState } from 'react';
import { Star } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../config/axiosInstance';
import userEndPoints from '../../config/users/userApi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
const FeedbackForm = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const { doctorId } = useParams();
  console.log("dID", doctorId);

  const patientId = localStorage.getItem("patientId"); 
  console.log("pID", patientId);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    rating: Yup.number()
      .max(5, 'Rating cannot exceed 5')
      .required('Rating is required'),
    comments: Yup.string().optional(),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comments: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(!doctorId || !patientId){
        toast.error("Invalid Information");
        return;
      }
      try{
        const response = await axiosInstance.post(
          userEndPoints.USER.POST_REVIEW, 
          {
            patientId,
            doctorId,
            rating: values.rating,
            comments: values.comments,
          }
        );
        console.log('Form submitted:', response.data);
        toast.success("Thank You for Your Valuable Feedback ");
        console.log("first time submitted", response)
        // navigate("/doctors");
        setTimeout(()=>{
                navigate("/doctors");
        }, 2000);
      } catch(error){
        console.error('Failed to submit feedback:', error);
        const errorMessage = error.response?.data?.message || "Error in submitting";
        toast.error(errorMessage);
      }


      // Handle form submission here (e.g., send data to the backend)
    },
  });

  return (
    <div className="min-h-screen w-full bg-blue-regBg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-2xl font-semibold text-blue-default mb-2 text-center">
          Share Your Experience
        </h1>
        <p className="text-sm font-normal text-gray-700 mb-4 text-center">
          Your insights help us to improve and provide better services.
        </p>

        {/* Formik Form */}
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Rating Field */}
          <div>
            <label className="block text-sm font-semibold text-blue-default mb-2">
              Share your experience in scaling
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    formik.setFieldValue('rating', star); // Update Formik state
                  }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 md:w-8 md:h-8 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.rating}</div>
            ) : null}
          </div>

          {/* Comments Field */}
          <div>
            <label htmlFor="comments" className="block text-sm font-semibold text-blue-default mb-2">
              Comments
            </label>
            <textarea
              id="comments"
              rows={4}
              placeholder="Add your comments..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              {...formik.getFieldProps('comments')}
            />
            {formik.touched.comments && formik.errors.comments ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.comments}</div>
            ) : null}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium transition"
              onClick={() => formik.resetForm()} // Reset form on cancel
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
              disabled={formik.isSubmitting} // Disable button while submitting
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;