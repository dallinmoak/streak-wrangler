import React from "react";

export default function Footer() {
  return (
    <>
      <footer className='bg-plum-900 text-anti-plum-50 p-6 mt-8'>
        {/* Main Content */}
        <div className='flex justify-between items-center'>
          {/* Branding */}
          <div>
            <h1 className='font-serif font-bold text-3xl'>I see you!</h1>
            <h2 className='text-lg font-light'>Don't touch my copyright!</h2>
          </div>

          {/* Quick Links or Navigation */}
          <nav className='flex space-x-4'>
            <a
              href="#about"
              className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
              aria-label="About"
            >
              About
            </a>
            <a
              href="#terms"
              className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <a
              href="#privacy"
              className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a
              href="#contact"
              className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
              aria-label="Contact"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Social Media or Secondary Links */}
        <div className='mt-4 flex justify-center space-x-4'>
          {/* Social Media Placeholder Icons */}
          <a
            href="#twitter"
            className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="#instagram"
            className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="#github"
            className='text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded'
            aria-label="GitHub"
          >
            GitHub
          </a>
        </div>

        {/* Copyright and Fine Print */}
        <div className='mt-4 text-center text-sm'>
          <p>&copy; {new Date().getFullYear()} Streak Wrangler. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
