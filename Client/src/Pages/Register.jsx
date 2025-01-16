import Logo from "../assets/Doctime.png";
// import RegImage from "../assets/RegPage.webp";
import Google from "../assets/Google.webp"
import { UserIcon, MailIcon, PhoneIcon, LockClosedIcon } from '@heroicons/react/outline';
const Register = () => {
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
          <form className="space-y-4">
            <div className="flex items-center border-b border-gray-300 py-2">
              <UserIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input type="text" placeholder="Full Name" className="w-full text-gray-700 focus:outline-none" />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <MailIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input type="email" placeholder="E-mail" className="w-full text-gray-700 focus:outline-none" />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <PhoneIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input type="text" placeholder="Mobile" className="w-full text-gray-700 focus:outline-none" />
            </div>

            <div className="flex items-center border-b border-gray-300 py-2">
              <LockClosedIcon className="h-6 w-6 text-gray-700 mr-2" />
              <input type="password" placeholder="Create Password" className="w-full text-gray-700 focus:outline-none" />
            </div>

            <button className="bg-blue-default hover:bg-blue-500 text-white rounded-full py-2 px-56 text-lg font-semibold">Sign Up</button>
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

