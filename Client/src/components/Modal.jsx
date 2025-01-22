import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Modal = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center w-96 h-56 flex flex-col justify-center items-center">
        {type === "success" ? (
          <FaCheckCircle className="text-green-500 text-4xl mb-2" />
        ) : (
          <FaExclamationTriangle className="text-red-500 text-4xl mb-2" />
        )}
        <h2
          className={`text-lg font-bold ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "success" ? "Success" : "Error"}
        </h2>
        <p className="text-base mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
