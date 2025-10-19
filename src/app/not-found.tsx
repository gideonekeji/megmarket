"use client";

import Image from "next/image";
import Link from "next/link";
import notfound from "../../public/assets/Image/notfound.png";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 text-center">
      <Image
        src={notfound}
        alt="Not Found"
        width={600}
        height={600}
        className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] object-contain"
      />
      <Link href="/">
        <button className="mt-4 px-6 py-2 md:px-10 md:py-3 bg-[#164997] font-medium text-white rounded-lg transition duration-300 hover:bg-[#133b7b]">
        Back To Home
        </button>
      </Link>
    </div>
  );
}
