import contact from "../../assets/5124556.jpg"

const Contact = () => {
  return (
    <>
    <section id="contact" className="bg-white py-[630px] md:py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-default mb-2">Contact Us</h2>
        <p className="text-lg text-center text-blue-default mb-6">Get In Touch with Our Team</p>
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
            {/* Left Form Section */}
            <div className="bg-white rounded-lg p-4 md:ml-20">
            <p className="text-lg text-blue-default mb-6 text-center">
              Fill the form, so that our team can reach out to you.
            </p>
            <form className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-blue-default focus:outline-none focus:ring-2 focus:ring-blue-default"
                />
              </div>
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-blue-default focus:outline-none focus:ring-2 focus:ring-blue-default"
                />
              </div>
              {/* Message Input */}
              <div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-blue-default focus:outline-none focus:ring-2 focus:ring-blue-default"
                ></textarea>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-default hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
    
          {/* Right Image Section */}
          <div className="flex justify-center">
            <img
              src={contact}
              alt="Contact Us"
              className="w-full max-w-md md:max-w-lg"
            />
          </div>
    
    
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact;