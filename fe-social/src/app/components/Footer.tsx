// src/app/components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative footer w-full h-[158px] flex flex-col items-center justify-start gap-[48px] px-[15px] pt-[24px] bg-color-light text-[12px] text-color-dark-gray z-[1000]">
      <nav className="flex gap-[50px]">
        <Link href="#" className="">Home</Link>
        <Link href="#" className="">Search</Link>
        <Link href="#" className="">Explore</Link>
        <Link href="#" className="">Messages</Link>
        <Link href="/#" className="">Notifications</Link>
        <Link href="#" className="">Create</Link>
      </nav>
      <span>&copy; 2024 ICHgram</span>
    </footer>
  );
};

export default Footer;
