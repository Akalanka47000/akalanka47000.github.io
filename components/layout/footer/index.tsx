import { AiFillLinkedin } from 'react-icons/ai'
import { FaGithubSquare } from 'react-icons/fa'
import { SiHackerrank } from 'react-icons/si'
import Link from 'next/link'
import Spectrum from '@/components/common/audio/spectrum'

const Footer = (): JSX.Element => {
  return (
    <footer className="relative bottom-0 z-20 flex flex-col w-full h-44 justify-between items-center bg-black-see-through transition duration-500 ease">
      <div className="w-full h-[0.5px] bg-primary shadow-red"></div>
      <div className="h-full flex flex-col justify-center sticky z-10">
        <div className=" flex flex-col justify-center items-center rounded-full bg-black-normal shadow-black-blur py-4 px-12 ">
          <div className="flex row justify-center items-center">
            <Link href="https://www.linkedin.com/in/akalanka-perera-50899a1b3/">
              <a target="_blank">
                <AiFillLinkedin
                  size={38}
                  className="mr-2 fill-current-color text-white hover:text-primary transition ease-in"
                />
              </a>
            </Link>
            <Link href="https://github.com/Akalanka47000">
              <a target="_blank">
                <FaGithubSquare
                  size={34}
                  className="fill-current-color text-white hover:text-primary transition ease-in"
                />
              </a>
            </Link>
            <Link href="https://www.hackerrank.com/IT21072642">
              <a target="_blank">
                <SiHackerrank
                  size={29}
                  className="ml-3 fill-current-color text-white hover:text-primary transition ease-in"
                />
              </a>
            </Link>
          </div>
          <div className="text-white mt-4">Connect with me</div>
          <div className="text-white mt-2">© {new Date().getFullYear()} Akalanka Perera</div>
        </div>
      </div>
      <Spectrum />
    </footer>
  )
}

export default Footer
