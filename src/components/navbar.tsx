import Image from "next/image";
import Link from "next/link";
import logo from "../../public/next.svg";

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full z-50 shadow bg-slate-300">
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={150} />
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link href={"/"} className="mr-5 hover:text-gray-900 cursor-pointer">
          Homa page{" "}
        </Link>
        <Link
          href={"/products"}
          className="mr-5 hover:text-gray-900 cursor-pointer"
        >
          All Products
        </Link>
      </nav>
      <Link
        href={"/shopping-card"}
        className="flex items-center space-x-2.5 text-sm "
      >
        <button className="button bg-blue-600  text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
          My bag
        </button>
      </Link>
    </header>
  );
};

export default Navbar;
