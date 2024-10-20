import { Hero } from "@/components/landing/Hero";

export default function LandingPage() {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col">
      <Hero />
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Event Request</h3>
            <p className="text-gray-700">
              Easily manage and request events through our streamlined system,
              designed to simplify the process.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Sports Equipment Request
            </h3>
            <p className="text-gray-700">
              Request and track sports equipment with ease, ensuring you have
              the resources needed for activities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Certificate Request</h3>
            <p className="text-gray-700">
              Request certificates efficiently, with an easy-to-use system that
              manages all your certification needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Admissions</h3>
            <p className="text-gray-700">
              Manage admissions seamlessly, with a system that simplifies the
              application and review process.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Department Management
            </h3>
            <p className="text-gray-700">
              Efficiently handle department students, penalties, events and
              attendance all in one place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Career Guidance</h3>
            <p className="text-gray-700">
              Notify OJT and Graduating Students for job oppurtunities and
              seminars.
            </p>
          </div>
        </div>
      </section>
      <section
        className="text-white py-32 text-center bg-cover bg-top bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.389), rgba(0, 0, 0, 0.573)), url("/0.jpg")`,
        }}
      >
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6">
          Join us today and experience the benefits of OSAS.
        </p>
        <button className="px-6 py-3 bg-white text-red-950 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
          Sign Up Now
        </button>
      </section>
    </main>
  );
}
