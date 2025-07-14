import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Uvarsity</h1>
              <span className="ml-2 text-lg">🌍</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition">Courses</a>
              <a href="#mentorship" className="text-gray-700 hover:text-blue-600 transition">Mentorship</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Africa's Future
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              through Design & Tech Education
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-100">
              World-class digital education made affordable, accessible, and localized for African learners — 
              regardless of internet speed, device quality, or financial background.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Start Learning Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to build employable skills and advance your career in design and technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Beginner to Intermediate Courses</h3>
              <p className="text-gray-600">
                Design, Development, Marketing, and Motion courses tailored for African learners
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live + Downloadable Learning</h3>
              <p className="text-gray-600">
                Perfect for offline and low-data environments, learn at your own pace
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Mentorship</h3>
              <p className="text-gray-600">
                One-on-one guidance and community support to help you succeed
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Job-Ready Certification</h3>
              <p className="text-gray-600">
                Build impressive project portfolios and earn industry-recognized certificates
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Money Payments</h3>
              <p className="text-gray-600">
                Flexible payment options including installments and local mobile money
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Internships & Job Matching</h3>
              <p className="text-gray-600">
                Direct pathways to internships and employment opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To make world-class digital education affordable, accessible, and localized 
                for the African learner — regardless of internet speed, device quality, or financial background.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Low-bandwidth and offline-friendly learning environment</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Multilingual platform support (Swahili, Hausa, French)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Integrated Mobile Money payments and local pricing</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span className="text-gray-700">Live mentorship and local community engagement</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Impact Vision</h3>
              <p className="mb-6">
                Bridging the gap between potential and opportunity for African youth through 
                expert-led courses, mentorship, internships, and job pathways.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm text-blue-100">Students Enrolled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-100">Expert Mentors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm text-blue-100">Countries Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-blue-100">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of African youth building careers in design and technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Courses
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Talk to a Mentor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Uvarsity 🌍</h3>
              <p className="text-gray-400 mb-4">
                Learning designed for Africa, powered by community, and driven by opportunity.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition">UI/UX Design</a>
                <a href="#" className="block hover:text-white transition">Web Development</a>
                <a href="#" className="block hover:text-white transition">Digital Marketing</a>
                <a href="#" className="block hover:text-white transition">Motion Design</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition">Help Center</a>
                <a href="#" className="block hover:text-white transition">Community</a>
                <a href="#" className="block hover:text-white transition">Mentorship</a>
                <a href="#" className="block hover:text-white transition">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition">About Us</a>
                <a href="#" className="block hover:text-white transition">Careers</a>
                <a href="#" className="block hover:text-white transition">Partners</a>
                <a href="#" className="block hover:text-white transition">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Uvarsity. All rights reserved. Licensed under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
