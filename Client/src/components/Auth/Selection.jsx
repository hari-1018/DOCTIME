import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorSelection from "../../assets/DoctorSelection.jpg"
import UserSelection from "../../assets/UserSelection.jpg"
const Selection = () => {
  const [selected, setSelected] = useState(null);

  const handleSelection = (type) => {
    setSelected(type);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-regBg">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-blue-default">Sign In As ?</h2>

        <div className="flex justify-center gap-6 mt-6">
          {/* Doctor */}
          <Link to="/doctor-login">
          <div
            onClick={() => handleSelection("doctor")}
            className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all ${
              selected === "doctor"
                ? "border-blue-500 shadow-lg bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <img
              src={DoctorSelection} // Replace with actual doctor image
              alt="Doctor"
              className="w-28 h-28"
            />
            <p className="mt-2 font-semibold text-gray-700">Doctor</p>
          </div>
          </Link>

          {/* Patient */}
          <Link to="/login">
          <div
            onClick={() => handleSelection("patient")}
            className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all ${
              selected === "patient"
                ? "border-blue-500 shadow-lg bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <img
              src={UserSelection} // Replace with actual patient image
              alt="Patient"
              className="w-28 h-28"
            />
            <p className="mt-2 font-semibold text-gray-700">Patient</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Selection;
