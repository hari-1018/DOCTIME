import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <>
    <footer className="bg-blue-default py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-4">
        <div>
          <h2 className="text-lg text-blue-800 font-bold mb-4 text-center">DOCTIME</h2>
          <p className="text-sm font-bold text-white hover:text-blue-700">
            Trusted partner in health, providing seamless access to expert care, advanced treatments, and personalized support anytime, anywhere, for your well-being.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-800">Quick Links</h3>
          <ul>
            <li className="mb-2 font-bold text-white"><a href="/" className="hover:text-blue-700">Home</a></li>
            <li className="mb-2 font-bold text-white"><a href="/products" className="hover:text-blue-700">Shop</a></li>
            <li className="mb-2 font-bold text-white"><a href="/about" className="hover:text-blue-700">About Us</a></li>
            <li className="mb-2 font-bold text-white"><a href="/contact" className="hover:text-blue-700">Contact Us</a></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-800">Help</h3>
          <ul>
            <li className="mb-2 font-bold text-white"><a href="/return-policy" className="hover:text-blue-700">How to Book ?</a></li>
            <li className="mb-2 font-bold text-white"><a href="/payment-methods" className="hover:text-blue-700">Payment Methods</a></li>
            <li className="mb-2 font-bold text-white"><a href="/security" className="hover:text-blue-700">Security</a></li>
            <li className="mb-2 font-bold text-white"><a href="/faq" className="hover:text-blue-700">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-800">Contact</h3>
          <p className="text-sm font-bold text-white hover:text-blue-700">Wellness Street, Health City</p>
          <p className="text-sm font-bold text-white hover:text-blue-700">567890</p>
          <p className="text-sm font-bold text-white hover:text-blue-700">Email: doctime@support.com</p>
          <p className="text-sm font-bold text-white hover:text-blue-700">Phone: +91 9876543210</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-800">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-xl text-white hover:text-blue-800 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-xl text-white hover:text-blue-800 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <BsTwitterX className="text-xl text-white hover:text-blue-800 transition duration-300" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-300 pt-4">
        <p className="text-sm font-bold text-white transition duration-300">© 2025 DOCTIME. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Footer