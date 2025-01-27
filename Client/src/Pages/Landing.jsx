import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Image from "../assets/ImageHero.png";
import { BsFacebook, BsFillTelephoneFill, BsInstagram, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { MdEmail, MdLocationOn} from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Review1 from "../assets/Review_1.jpg"
import Review2 from "../assets/Review_2.jpg"
import Review3 from "../assets/Review_3.jpg"
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

    const reviews = [
        {
          name: "James.P",
          text: "The doctors and staffs at here are incredibly compassionate and professional. They made me feel comfortable and cared for throughout my treatment.",
          image: Review1,
        },
        {
          name: "Emily John",
          text: "From the moment I walked in, I knew I was in the right place. The attention to detail and patient care at the hospital is outstanding. They made me feel comfortable throughout the treatment.",
          image: Review2, // Replace with actual image URL
        },
        {
          name: "Rajesh Madhav",
          text: "The 24/7 medical services offered by them have been a blessing for my family. We know we can rely on them anytime, day or night. I am so grateful for their dedication and support.",
          image: Review3,
        },
      ];

    return (
        <>
        <Navbar />

            {/* Hero Section */}
            <div id="home" className="w-full min-h-screen bg-blue-default flex items-center justify-center">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className="text-white p-4 mt-16 md:ml-16">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            Take Care Your Health <span className='text-blue-700'>With Us !</span>
                        </h1>
                        <p className="text-lg mb-6 text-center">Where the right time meets the right care.</p>
                        <p className="text-sm mb-8 text-center">
                            Medicine treats the present, prevention secures the future, together they craft the path to lasting health.
                        </p>
                        <Link to="/register">
                        <div className='flex justify-center items-center'>
                        <button className="bg-white text-blue-default font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200">
                            Get Started
                        </button>
                        </div>
                        </Link>
                    </div>

                    <div className="hidden md:block w-1/2 ">
                        <img src={Image} alt="Doctor" className="w-[600px] h-[585px] mt-[90px]" />
                    </div>
                </div>
            </div>

            {/* Specialities */}
            <section className="w-full py-8 bg-white">
                <div className="flex flex-col items-center gap-12">
                    <h2 className="text-3xl text-center font-bold text-blue-default">
                        Top Specialities
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
                        {specialties.map((specialty) => (
                            <div key={specialty.id} className="border-none">
                                <div className="flex flex-col items-center gap-6 p-0">
                                    <div
                                        className="w-[180px] h-[180px] md:w-[225px] md:h-[225px] rounded-[50px] shadow-lg bg-cover bg-center"
                                        style={{ backgroundImage: `url(${specialty.image})` }}
                                    />
                                    <h3 className="font-bold text-xl md:text-xl text-blue-default text-center">{specialty.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link to="/register">
                    <button className="bg-blue-default text-white rounded-full px-6 py-2 font-bold text-lg hover:bg-blue-300 mb-16">
                        View More
                    </button>
                    </Link>
                </div>
            </section>

            {/* Join Us */}
            <div id="join" className='w-full h-[450px]'>
                <div className='w-[90%] md:w-[1335px] h-[400px] mx-auto bg-blue-default rounded-[30px] border-none flex flex-col items-center justify-center p-4'>
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

            <div className="px-4 py-8 bg-white">
                <h2 className="text-center text-3xl font-bold text-blue-default mb-4">People Impressions</h2>
                <p className="text-center text-lg text-blue-default mb-8">
                    Here&apos;s what our patients are saying about their experience with us.
                </p>
                <Carousel
                    showArrows
                    infiniteLoop
                    autoPlay
                    showThumbs={false}
                    showStatus={false}
                    className="max-w-4xl mx-auto"
                >
                {reviews.map((review, index) => (
                <div
                    key={index}
                    className="bg-blue-default text-white rounded-lg p-6 md:p-8 flex flex-col items-center"
                >
                <FaQuoteLeft className="text-2xl" />
                <p className="text-sm md:text-base my-4 text-center">{review.text}</p>
                <FaQuoteRight className="text-2xl" />
                <div className='w-16 h-16'>
                    <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-full mt-4"
                    />
                    </div>
                        <p className="mt-4 font-semibold mb-2">{review.name}</p>
                    </div>
        ))}
      </Carousel>
      <Link to="/register">
      <button className="mt-8 mx-auto block font-bold bg-blue-default text-white py-2 px-4 rounded-full">
        Read More...
      </button>
      </Link>
    </div>


            {/* Footer */}
            <div id="contact" className='flex flex-col md:flex-row w-full h-auto md:h-[575px]'>
                <div className='w-full h-80 md:w-[700px] md:h-full bg-blue-default flex flex-col items-center justify-center text-white p-4'>
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
                    <h1 className='text-3xl font-bold text-blue-default text-center mb-4 md:mb-20'>Get In Touch With Us Right Now!</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] md:w-[700px] mx-auto'>
                        <div className="flex flex-col items-center p-5 space-y-4 border-b-4 md:border-r-4 border-blue-default">
                            <h3 className='text-2xl font-bold text-blue-default'><BsFillTelephoneFill /></h3>
                            <p className='text-base font-bold text-blue-default'>Phone Number</p>
                            <p className='text-sm text-blue-default'>+91 9876543210</p>
                        </div>

                        <div className='flex flex-col items-center p-5 space-y-4 border-b-4 md:border-l-4 border-blue-default'>
                            <h3 className='text-3xl font-bold text-blue-default'><MdEmail /></h3>
                            <p className='text-base font-bold text-blue-default'>Email</p>
                            <p className='text-sm text-blue-default'>doctime@support.com</p>
                        </div>

                        <div className='flex flex-col items-center p-5 space-y-4 md:border-r-4 md:border-t-4 border-blue-default'>
                            <h3 className='text-3xl font-bold text-blue-default'><MdLocationOn /></h3>
                            <p className='text-base font-bold text-blue-default'>Location</p>
                            <p className='text-sm text-blue-default'>123 Wellness Street, Health City<br/>Mediland, 567890</p>
                        </div>

                        <div className="flex flex-col items-center p-5 space-y-4 border-t-4 md:border-l-4 md:border-t-4 border-blue-default">                            
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