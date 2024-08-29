const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold">PropertyApp</h2>
        <p className="mt-2">© 2024 PropertyApp. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-300">
            About Us
          </a>
          <a href="#" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
