import { Link, useNavigate } from 'react-router-dom';
import NavLogo from "../assets/Doctime_Logo.png"
import { RxDashboard } from "react-icons/rx";
import Image from "../assets/ImageHero.png"
import { BsFacebook, BsFillTelephoneFill, BsInstagram, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { MdEmail, MdLocationOn} from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
const Landing = () => {
    const navigate = useNavigate();

    const specialties = [
        {
            id: 1,
            title: "General Physician",
            image: "https://img.freepik.com/free-vector/medical-treatment-tools-composition_1284-16379.jpg",
        },
        {
            id: 2,
            title: "Neurology",
            image: "https://img.freepik.com/free-vector/human-nervous-system_53876-93187.jpg?semt=ais_hybrid",
        },
        {
            id: 3,
            title: "Cardiology",
            image: "https://www.adityabirlacapital.com/healthinsurance/active-together/wp-content/uploads/2021/09/Importance-of-early-heart-check-ups_1.jpg",
        },
        {
            id: 4,
            title: "Orthopedist",
            image: "https://img.freepik.com/premium-photo/man-with-his-hands-pain-bottom-his-legs-are-visible_1112423-2199.jpg",
        },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full h-[90px] z-50 bg-white text-white p-2 flex justify-between items-center ">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <img className="w-56 h-[90px]" src={NavLogo} alt="Doctime Logo" />
                </div>

                {/* Menu */}
                <ul className="items-center gap-10 font-bold hidden md:flex">
                    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default"><Link to="/">HOME</Link></li>
                    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default"><Link to="/register">DOCTORS</Link></li>
                    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default"><Link to="/register">APPOINTMENTS</Link></li>
                    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default"><Link to="#">ABOUT US</Link></li>
                    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default"><Link to="/#">CONTACT US</Link></li>
                </ul>

                {/* Dashboard Button */}
                <button className="w-10 h-10 text-blue-default text-2xl -mr-64">
                    <RxDashboard />
                </button>

                {/* SignUp Button */}
                <button className="w-[100px] h-10 bg-blue-default rounded-[20px] font-bold">
                    SignUp
                </button>
            </nav>

            {/* Hero Section */}
            <div className="w-full min-h-screen bg-blue-default flex items-center justify-center">
                <div className="flex items-center justify-between ">
                    <div className="text-white p-2 ml-16 mt-24">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            Take care your health with <span className="text-blue-700">DOCTIME.</span>
                        </h1>
                        <p className="text-lg mb-6 text-center">Where the right time meets the right care.</p>
                        <p className="text-sm mb-8 text-center">
                            Medicine treats the present, prevention secures the future—together, they craft the path to lasting health.
                        </p>
                        <Link to="/register">
                        <button className="bg-white text-blue-default font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200 ml-64">
                            Get Started
                        </button>
                        </Link>
                    </div>

                    <div className="w-1/2 ">
                        <img src={Image} alt="Doctor" className="w-[600px] h-[585px] mt-24 ml-20" />
                    </div>
                </div>
            </div>

            {/* Specialities */}
            <section className="w-full h-[550px] py-8 bg-white mx-auto">
                <div className="flex flex-col items-center gap-12">
                    <h2 className="text-[38px] text-center font-bold text-blue-default">
                        Top Specialities
                    </h2>

                    <div className="grid grid-cols-4 gap-8 px-4">
                        {specialties.map((specialty) => (
                            <div key={specialty.id} className="border-none">
                                <div className="flex flex-col items-center gap-6 p-0">
                                    <div
                                        className="w-[225px] h-[225px] rounded-[50px] shadow-lg bg-cover bg-center"
                                        style={{ backgroundImage: `url(${specialty.image})` }}
                                    />
                                    <h3 className="font-bold text-[22px] text-[#2ba2ed] text-center">{specialty.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link to="/register">
                    <button className="bg-blue-default text-white rounded-full px-6 py-2 font-bold text-lg hover:bg-blue-300 mb-20">
                        View More
                    </button>
                    </Link>
                </div>
            </section>

            {/* Join Us */}
            <div className='w-full h-[450px]'>
                <div className='w-[1335px] h-[400px] mx-auto bg-blue-default rounded-[30px] border-none flex flex-col items-center justify-center p-4'>
                        <h1 className="text-center text-white text-4xl mb-8 font-bold">Join Our Community Today</h1>
                        <p className="text-center text-white text-lg mb-4 font-extralight">
                        Become a part of our community today, gain access to exclusive health tips, expert advice, and a support network dedicated to helping you achieve your wellness goals. Your journey to better health starts here!
                        </p>
                        <Link to="/register">
                        <button className="bg-white text-blue-default font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-200">
                            Sign Up for Free
                        </button>
                        </Link>
                </div>
            </div>


            {/* Footer */}
            <div className='flex w-full h-[575px]'>
                <div className='w-[700px] bg-blue-default flex flex-col items-center justify-center text-white p-4'>
                    <h1 className='text-3xl font-bold mb-4'>Stay Connect With Us!</h1>
                    <p className='text-lg text-center mb-8'>Feel free to reach out us. We&apos;re here to assist you with any questions and concerns.</p>
                    <div className='flex gap-6'>
                        <button className='cursor-pointer text-2xl'><BsWhatsapp /></button>
                        <button className='cursor-pointer text-2xl'><BsFacebook /></button>
                        <button className='cursor-pointer text-2xl'><BsInstagram /></button>
                        <button className='cursor-pointer text-2xl'><BsTwitterX /></button>
                    </div>
                </div>

                <div className='flex-1 bg-slate-100 p-6'>
                    <h1 className='text-3xl font-bold text-blue-default text-center mb-20'>Get In Touch With Us Right Now!</h1>
                    <div className='grid grid-cols-2 gap-8 w-[700px] mx-auto'>
                        <div className='flex flex-col items-center p-5 space-y-4 border-b-4 border-r-4 border-blue-default'>
                            <h3 className='text-2xl font-bold text-blue-default'><BsFillTelephoneFill /></h3>
                            <p className='text-base font-bold text-blue-default'>Phone Number</p>
                            <p className='text-sm text-blue-default'>+91 9876543210</p>
                        </div>

                        <div className='flex flex-col items-center p-5 space-y-4 border-b-4 border-l-4 border-blue-default'>
                            <h3 className='text-3xl font-bold text-blue-default'><MdEmail /></h3>
                            <p className='text-base font-bold text-blue-default'>Email</p>
                            <p className='text-sm text-blue-default'>doctime@support.com</p>
                        </div>

                        <div className='flex flex-col items-center p-5 space-y-4 border-r-4 border-t-4 border-blue-default'>
                            <h3 className='text-3xl font-bold text-blue-default'><MdLocationOn /></h3>
                            <p className='text-base font-bold text-blue-default'>Location</p>
                            <p className='text-sm text-blue-default'>123 Wellness Street, Health City<br/>Mediland, 567890</p>
                        </div>

                        <div className='flex flex-col items-center p-5 space-y-4 border-l-4 border-t-4 border-blue-default'>
                            <h3 className='text-3xl font-bold text-blue-default'><FaThumbsUp /></h3>
                            <p className='text-base font-bold text-blue-default'>Follow Us On</p>
                            <div className='flex gap-6 text-blue-default'>
                                <button className='cursor-pointer text-2xl'><BsWhatsapp /></button>
                                <button className='cursor-pointer text-2xl'><BsFacebook /></button>
                                <button className='cursor-pointer text-2xl'><BsInstagram /></button>
                                <button className='cursor-pointer text-2xl'><BsTwitterX /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}

export default Landing;