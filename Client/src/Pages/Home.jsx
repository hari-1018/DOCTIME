import Navbar from "../components/Navbar"
import {Link} from 'react-router-dom';
import cardiology from "../assets/Cardiology.jpeg";
import neurology from "../assets/Neurology.jpg";
import gynecology from "../assets/Gynecology.jpg";
import dermatology from "../assets/Dermatology.jpg";
import Doctor1 from "../assets/Doctor1.jpg";
import Doctor2 from "../assets/Doctor2.jpg";
import Doctor3 from "../assets/Doctor3.jpg";
import { Ri24HoursLine } from "react-icons/ri";
import { FaSuitcaseMedical, FaUserDoctor, FaHeartPulse } from "react-icons/fa6";

const Home = () => {

  const dept = [
    {
      id: 1,
      name: "Cardiology",
      image: cardiology,
      description:
        "Our Cardiology Department leads in heart health, providing advanced diagnostics, thorough assessments, and personalized treatments to meet your cardiovascular care needs."
    },
    {
      id: 2,
      name: "Neurology",
      image: neurology,
      description:"Our Neurology Department focuses on offering precise diagnostics, and specialized treatments for a wide range of neurological conditions, supporting patients at every stage of their journey."
    },
    {
      id: 3,
      name: "Gynecology",
      image: gynecology,
      description:
        "Our Gynecology Department is dedicated providing comprehensive care, advanced diagnostics, and personalized treatments to support every stage of a woman’s life, from adolescence to maternity and beyond."
    },
    {
      id: 4,
      name: "Dermatology",
      image: dermatology,
      description:
        "Our Dermatologist Department is dedicated to maintaining healthy skin, providing comprehensive care, advanced diagnostics, and personalized treatments for all skin types and conditions."
    }
  ]
  return (
<>
  <Navbar />
  <div id="home1" className="w-full h-[750px] text-center py-24 px-4">
    <h2 className="text-xl text-blue-default uppercase font-bold mb-4">Welcome to DOCTIME</h2>
    <h1 className="text-3xl font-bold text-blue-home mb-4">A Great Place to Receive Care</h1>
    <p className="text-lg text-blue-500 mb-2">
      We&apos;re here for you around the clock, ready to assist with any urgent medical needs. Committed to providing the highest quality care 24/7.
    </p>

    <div className="relative w-full h-[525px] flex justify-center items-center bg-image">
    <div className="absolute top-1 md:top-10">
      <Link to="/doctors" className="px-4 py-3 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-700">
        Make Appointment
      </Link>
    </div>
  </div>
</div>

<section className="bg-white py-2 -mt-64 md:mt-0">
  <div className="container mx-auto w-full">
  <h2 className="text-3xl font-bold text-center text-blue-default mb-4">Services of Specialists</h2>
  <p className="text-lg text-center text-blue-default mb-16">
    Our promise to your health is beyond everyday care, focusing on your long-term well-being.
  </p>
  </div>

  <div className="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
    {dept.map((item) => (
      <div key={item.id} className="bg-blue-dept hover:bg-blue-default rounded-lg p-4 text-center">
        <div className="w-28 h-28 mx-auto mb-2 md:-mt-16">
          <img src={item.image} alt={item.name} className="rounded-[100%]"/>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
        <p className="text-white text-sm font-bold mb-6">{item.description}</p>
        <Link to={`/departments/${item.id}`} className="bg-white text-blue-default font-bold py-2 px-4 rounded-full">Book Now</Link>
      </div>
    ))}
  </div> 
</section>

<div className="bg-blue-400 py-6 px-6">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-white mb-4">Our Best Doctors</h2>
    <p className="text-lg text-white">
      Experience unparalleled medical expertise with our team of best-in-className doctors.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={Doctor1} alt="Dr. Jonathan" className="w-full h-72 object-contain"/>
      <div className="p-6 text-center bg-blue-500">
        <h3 className="text-lg font-bold text-white">Dr. Jonathan (MD, PhD, MBBS)</h3>
        <p className="text-white text-sm">Neurology</p>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={Doctor2} alt="Dr. Ashok Seth" className="w-full h-72 object-contain"/>
      <div className="p-6 text-center bg-blue-500">
        <h3 className="text-lg font-bold text-white">Dr. Ashok Seth (MD, MBBS)</h3>
        <p className="text-white text-sm">Cardiology</p>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={Doctor3} alt="Dr. Sophie Devine" className="w-full h-72 object-contain"/>
      <div className="p-6 text-center bg-blue-500">
        <h3 className="text-lg font-bold text-white">Dr. Sophie Devine (MD, MBBS)</h3>
        <p className="text-white text-sm">Pediatricians</p>
      </div>
    </div>
  </div>

  <div className="flex justify-center mt-8">
    <button className="bg-white text-blue-default font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition">
      View All
    </button>
  </div>
</div>

<div id="about" className="bg-white py-6 px-6">
  <div className="max-w-8xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center  h-[500px]">
      <div className="relative flex-shrink-0 w-full lg:w-1/2 mb-10 lg:mb-0">
        <div className="relative -ml-4 md:mx-auto w-96 h-96 bg-blue-default text-white rounded-full flex flex-col justify-center items-center text-center shadow-lg md:mt-8">
          <h3 className="text-2xl font-bold">Your Health,<br/> Our Priority</h3>
          <p className="mt-2 text-sm px-6">
            Your Trusted Destination for Comprehensive Healthcare and Compassionate Service.
          </p>
          <button className="mt-4 text-blue-default font-bold py-2 px-4 rounded-full bg-white hover:bg-gray-300">
            Book Now
          </button>
        </div>
        <div className="hidden sm:block absolute inset-0 w-[450px] h-[450px] rounded-full border-dashed border-2 border-blue-default mx-auto"></div>
      </div>

      <div className="flex-1 -ml-6 lg:pl-8 text-center lg:text-left px-16">
        <h2 className="text-3xl font-bold text-blue-default mb-2 text-center">What We Offer?</h2>
        <p className="text-blue-default mb-8 text-center">
          We strive to ensure you feel cared for every step of the way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 text-blue-500 rounded-full flex justify-center items-center">
              <Ri24HoursLine className="w-10 h-10"/>
            </div>
            <div className="ml-4">
              <h4 className="text-lg -ml-2 font-bold text-blue-500">24 Hours Service</h4>
              <p className="text-sm -ml-2 text-blue-default">
                Available at 24/7 to provide you with continuous care and support whenever you need it.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 text-blue-500 rounded-full flex justify-center items-center">
            <FaSuitcaseMedical className="w-10 h-10" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg -ml-2 font-bold text-blue-500">Modern Equipment</h4>
              <p className="text-sm -ml-2 text-blue-default">
                Equipped with the latest medical technology to ensure precise diagnostics and effective treatments in healthcare.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 text-blue-500 rounded-full flex justify-center items-center">
            <FaUserDoctor className="w-10 h-10"/>

            </div>
            <div className="ml-4">
              <h4 className="text-lg font-bold -ml-2 text-blue-500">Quality Doctors</h4>
              <p className="text-sm -ml-2 text-blue-default">
                Experienced, skilled, and compassionate doctors dedicated to delivering the highest standard of care.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 text-blue-500 rounded-full flex justify-center items-center">
            <FaHeartPulse className="w-10 h-10"/>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-bold -ml-2 text-blue-500">Comprehensive Care</h4>
              <p className="text-sm -ml-2 text-blue-default">
                Offering a wide range of services, from preventive care to advanced treatments, all under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




</>
  )
}

export default Home