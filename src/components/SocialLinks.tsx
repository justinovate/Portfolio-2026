// components/SocialLinks.tsx
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

export const SocialLinks = () => {
  return (
    <div className="hidden lg:flex flex-col top-[35%] left-0 fixed z-50">
      <ul>
        {/* LinkedIn */}
        <li className="group w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600">
          <a
            href="https://www.linkedin.com/in/j-deleon/"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center w-full text-gray-300 px-4"
          >
            LinkedIn <FaLinkedin size={30} />
          </a>
        </li>

        {/* GitHub */}
        <li className="group w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]">
          <a
            href="https://github.com/justinovate"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center w-full text-gray-300 px-4"
          >
            GitHub <FaGithub size={30} />
          </a>
        </li>

        {/* Email */}
        <li className="group w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-pink-600">
          <a
            href="mailto:deleonjustinandre@gmail.com"
            className="flex justify-between items-center w-full text-gray-300 px-4"
          >
            Email <HiOutlineMail size={30} />
          </a>
        </li>

        {/* RESUME */}
        <li className="group w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-emerald-500">
          <a
            href="/JustinDeLeon_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center w-full text-gray-300 px-4"
          >
            Resume <BsFillPersonLinesFill size={30} />
          </a>
        </li>
      </ul>
    </div>
  );
};
