import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./SocialIcons.css";
import { FC } from "react";
import { SocialIconsProps } from "../../Store/types";

const SocialIcons: FC<SocialIconsProps> = ({ borderRadius }) => {
  const border = borderRadius
    ? "rounded-full bg-cyan-200 text-lg p-3"
    : "rounded-md bg-white/30 text-xl p-4";

  return (
    <ul className="social-icons__container flex gap-3">
      <li>
        <a className={`${border}`} href="#" title="Linkedin">
          <FaLinkedin />
        </a>
      </li>
      <li>
        <a
          className={`${border}`}
          href="#"
          title={borderRadius ? "GitHub" : "Facebook"}
        >
          {borderRadius ? <FaGithub /> : <FaFacebook />}
        </a>
      </li>
      <li>
        <a className={`${border}`} href="#" title="Instagram">
          <FaInstagram />
        </a>
      </li>
    </ul>
  );
};

export default SocialIcons;
