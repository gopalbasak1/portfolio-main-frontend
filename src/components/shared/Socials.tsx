import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter, FaFacebook } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/gopalbasak1" },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/gopal-basak-me",
  },
  { icon: <FaFacebook />, path: "https://www.facebook.com/gopalbasak.0" },
  { icon: <FaTwitter />, path: "https://x.com/gopalbasakdip" },
];

const Socials = ({ containerStyles = "", iconStyles = "" }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
