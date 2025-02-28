import Logo from "../../../../assets/morent-logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-10 px-4 md:flex shadow-xl justify-between items-start border-t border-gray-200">
      {/* Logo & Description */}
      <div className="md:w-1/3">
        <img src={Logo} alt="Morent Logo" className="w-28" />
        <p className="text-gray-500 mt-4 leading-relaxed">
          Our vision is to provide convenience and help increase your sales business.
        </p>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-6 md:mt-0">
        {/* About */}
        <div>
          <h2 className="font-semibold text-lg pb-3 text-gray-800">About</h2>
          {["How it works", "Featured", "Partnership", "Business Relation"].map((text) => (
            <a
              key={text}
              className="block text-sm text-gray-500 hover:text-blue-600 transition-colors cursor-pointer pb-2"
            >
              {text}
            </a>
          ))}
        </div>

        {/* Community */}
        <div>
          <h2 className="font-semibold text-lg pb-3 text-gray-800">Community</h2>
          {["Event", "Blog", "Podcast", "Invite a friend"].map((text) => (
            <a
              key={text}
              className="block text-sm text-gray-500 hover:text-blue-600 transition-colors cursor-pointer pb-2"
            >
              {text}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div>
          <h2 className="font-semibold text-lg pb-3 text-gray-800">Socials</h2>
          {["Discord", "Instagram", "Twitter", "Facebook"].map((text) => (
            <a
              key={text}
              className="block text-sm text-gray-500 hover:text-blue-600 transition-colors cursor-pointer pb-2"
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
