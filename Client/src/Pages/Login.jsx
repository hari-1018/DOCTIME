import Logo from "../assets/Doctime.png";
// import RegImage from "../assets/RegPage.webp";
import Google from "../assets/Google.webp"
import { MailIcon, LockClosedIcon, EyeOffIcon } from '@heroicons/react/outline';
const Login = () => {
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
              <input type="email" placeholder="Enter Your E-mail" className="w-full text-gray-700 focus:outline-none" />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <LockClosedIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input type="password" placeholder="Enter Your Password" className="w-full text-gray-700 focus:outline-none" />
              <EyeOffIcon className="h-6 w-6 text-gray-700 mr-2" />
            </div>
            <p><a href="/login" className="text-base">Forgot Password ?</a></p>

            <button className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 px-56 text-lg font-semibold">Log In</button>
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


