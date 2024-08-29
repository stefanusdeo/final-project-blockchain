import React from "react";
import Image from "next/image";
import photo1 from "@/assets/photo1.svg";
import photo2 from "@/assets/photo2.svg";
import Link from "next/link";

const Home = () => {
  return (
    <div className=" bg-gray-100 mx-auto py-10 px-12">
      <div className="grid grid-cols-2 p-6">
        <div className="my-auto">
          <h1 className="font-semibold text-gray-600 text-3xl mb-2">
            Tokenize Property
          </h1>
          <p className="text-gray-500">
            Unlock the future of real estate with our Web3 platform, where
            property ownership meets cutting-edge blockchain technology.
            Tokenize your real estate assets securely and efficiently using our
            ERC721-powered solution. Whether you're a homeowner or an investor,
            experience a new way of buying, selling, and managing property in
            the digital age. Join us in revolutionizing the property market—one
            token at a time.
          </p>
        </div>
        <div className="flex justify-center">
          <Image src={photo1} className="lg:max-w-[500px]" />
        </div>
      </div>
      <div className="grid grid-cols-2 py-8">
        <div className="flex justify-center">
          <Image src={photo2} className="lg:max-w-[500px]" />
        </div>
        <div className="my-auto">
          <h2 className="text-2xl text-gray-600 font-semibold text-right">
            Transform Your Property into a Digital Asset!
          </h2>
          <p className="text-gray-500 text-right my-6">
            Step into the future of real estate. Easily tokenize your property
            and unlock new opportunities in the digital economy. Whether you're
            looking to sell, invest, or manage real estate, our platform makes
            it seamless and secure. Join the revolution—turn your property into
            a valuable digital asset today!
          </p>
          <div className="flex justify-end">
            <Link
              href={"/register"}
              className="bg-gray-400 hover:bg-gray-600 hover:shadow-xl px-24 py-2 text-white rounded-xl "
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
