import Navbar from "../components/Navbar"
import {Link} from 'react-router-dom';
import cardiology from "../assets/Cardiology.jpeg";
import neurology from "../assets/Neurology.jpg";
import gynecology from "../assets/Gynecology.jpg";
import dermatology from "../assets/Dermatology.jpg";

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
  <div className="w-full h-[750px] text-center py-24 px-4">
    <h2 className="text-xl text-blue-default uppercase font-bold mb-4">Welcome to DOCTIME</h2>
    <h1 className="text-3xl font-bold text-blue-home mb-4">A Great Place to Receive Care</h1>
    <p className="text-lg text-blue-500">
      We&apos;re here for you around the clock, ready to assist with any urgent medical needs. Committed to providing the highest quality care 24/7.
    </p>

    <div className="relative w-full h-[525px] flex justify-center items-center bg-image">
    <div className="absolute top-8">
      <Link to="/doctors" className="px-4 py-4 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-700">
        Make Appointment
      </Link>
    </div>
  </div>
</div>

<section className="bg-white py-4">
  <div className="container mx-auto w-full">
  <h2 className="text-3xl font-bold text-center text-blue-default mb-4">Services of Specialists</h2>
  <p className="text-lg text-center text-blue-default mb-16">
    Our promise to your health is beyond everyday care, focusing on your long-term well-being.
  </p>
  </div>

  <div className="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
    {dept.map((item) => (
      <div key={item.id} className="bg-blue-dept hover:bg-blue-default rounded-lg p-4 text-center">
        <div className="w-28 h-28 mx-auto mb-2 -mt-16">
          <img src={item.image} alt={item.name} className="rounded-[100%]"/>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
        <p className="text-white text-sm font-bold mb-6">{item.description}</p>
        <Link to={`/departments/${item.id}`} className="bg-white text-blue-default font-bold py-2 px-4 rounded-full">Book Now</Link>
      </div>
    ))}
  </div>
 
</section>


</>
  )
}

export default Home