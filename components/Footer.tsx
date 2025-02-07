import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const bebas_neue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="bg-white/30 text-gray-800 py-6"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <Link href={"/"} className="mb-8 md:mb-0 text-center ">
          <h1 className={` ${bebas_neue.className} text-xl font-bold`}>
            SmartForms <span className="text-cyan-600">AI</span>
          </h1>
          <p className="text-sm">Revolutionizing form building with AI.</p>
        </Link>

        {/* Navigation Links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="#about"
                className="text-sm hover:underline hover:text-cyan-600 cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="text-sm hover:underline hover:text-cyan-600 cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="text-sm hover:underline hover:text-cyan-600 cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-cyan-600"
          >
            <Twitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-cyan-600"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-cyan-600"
          >
            <Github />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-white/50 pt-4 text-center text-sm text-gray-700">
        &copy; {new Date().getFullYear()} SmartForm AI. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
