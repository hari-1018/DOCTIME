import { useState } from 'react';
import { Star } from 'lucide-react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  
  return (
    <div className="min-h-screen w-full bg-blue-regBg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-2xl font-semibold text-blue-default mb-2 text-center">
          
        </h1>
        <p className='text-sm font-normal text-gray-700 mb-4 text-center'>Your insights helps us to improve and provide better services.</p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-blue-default mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-default mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-blue-default mb-2">
              Share your experience in scaling
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
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
          </div>
          
          <div>
            <label htmlFor="comments" className="block text-sm font-semibold text-blue-default mb-2">
              Comments
            </label>
            <textarea
              id="comments"
              rows={4}
              placeholder="Add your comments..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>
          
          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
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