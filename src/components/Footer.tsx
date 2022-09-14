import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer: FC = () => {
  return (
    <footer className="sticky bottom-0 mt-10 bg-white p-4">
      <div className="flex items-center justify-between">
        <p>Copyright © 2022 - All right reserved</p>
        <div className="flex gap-4 md:place-self-center">
          <a
            href="https://github.com/ryota-sb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
