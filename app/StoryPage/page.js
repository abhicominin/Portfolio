import React from "react";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const StoryPage = () => {
  return (
    <div>
      {/* Main Story Section */}
      <div className="relative h-[100vh] w-[100vw] bg-neutral-600 overflow-hidden mb-[20vh] ">
        {/* Background Image */}
        <div className="absolute inset-0 z-[10]">
          <Image
            className="object-cover w-full h-full"
            src={"/STORY_IMG_DUMMY.png"}
            width={1700}
            height={1000}
            alt="Background Image"
          />
        </div>

        {/* Clouds */}
        <div className="clouds absolute top-10 left-0 h-[100%] w-[100%] z-[20]">
          {/* Cloud 1 - Slow Speed */}
          <Image
            className="cloudsimage"
            src="/cloud1.png"
            style={{ "--i": 1 }}
            width={2100}
            height={100}
            alt="Cloud 1"
          />
          {/* Cloud 2 - Fast Speed */}
          <Image
            className="cloudsimage"
            src="/cloud2.png"
            style={{ "--i": 2 }}
            width={2100}
            height={100}
            alt="Cloud 2"
          />
          {/* Cloud 3 - Medium Speed */}
          <Image
            className="cloudsimage"
            src="/cloud3.png"
            style={{ "--i": 3 }}
            width={2100}
            height={100}
            alt="Cloud 3"
          />
          {/* Cloud 4 - Reverse Slow */}
          <Image
            className="cloudsimage"
            src="/cloud4.png"
            style={{ "--i": 4 }}
            width={2100}
            height={100}
            alt="Cloud 4"
          />
          {/* Cloud 5 - Slow Speed */}
          <Image
            className="cloudsimage"
            src="/cloud5.png"
            style={{ "--i": 5 }}
            width={2100}
            height={100}
            alt="Cloud 5"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-4 z-[40] relative top-12 w-[100vw] items-center pt-52 mt-0 border-0 border-green-500">
          <div className="w-fit basis-1/2">
            <Image src={"/LOGO_WH.png"} width={150} height={30} alt="logo" />
          </div>
          <p className="text-6xl text-slate-50 basis-1/2 ml-3">STORY</p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute left-[50%] bottom-2 z-[50]">
          <p className="en-vertical-text-scroll scroll-text text-white">
            scroll
          </p>
          <Image
            className="scroll-img"
            src={"/SCROLL_DROP_ELEMENT.png"}
            width={20}
            height={100}
            alt="Scroll Indicator"
          />
        </div>

        {/* Mist Image at the Bottom */}
        <div className="absolute -bottom-40 left-0 w-full z-[20]">
          <Image
            className="object-cover w-full"
            src={"/MIST_IMG.png"}
            width={1700}
            height={200}
            alt="Mist Image"
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative h-[50vh] w-[80vw] left-[10%] bg-white border-t border-gray-500  justify-center items-center mb-[50vh] ">
        {/* Footer Content */}
        <div className="footer-content w-[80vw] flex justify-between items-start gap-6 px-6 py-10">
          
          {/* Left Logo Section */}
          <Image
            className=" mt-20 ml-2 "
            src="/SEt_LOGO_BK.png"
            width={300}
            height={100}
            alt="Cloud 3"
          />

       
          <div className="flex ml-38 mt-12">

       
          <p className="vertical-text text-sm mr-3 mt-6 text-stone-400">見飽きることはありません︒</p>
          <p className="vertical-text text-sm mr-3 mt-6 text-stone-400">毎日眺めていても</p>
          <p className="vertical-text text-sm mr-3 mt-6 text-stone-400">東側から望む富士の稜線はたおやかで︑</p>
          <p className="vertical-text text-sm mr-3 mt-6 text-stone-400">富士山をつねに見上げる御殿場︒</p>
          <p className="vertical-text text-sm mr-7 mt-6 text-stone-400">酒造りを</p>
            

            <p
              className="vertical-text text-black mr-10 text-xl font-semibold "
            >
              <span className="en-vertical-text">ABOUT US</span>
            </p>

            <p className="vertical-text text-sm -ml-3 mr-5 mt-6 text-stone-400">酒造りを</p>
            <span className="en-vertical-text text-sm -ml-3 mr-5 mt-6 text-stone-400">ONLINE  STORE</span>
            <p className="vertical-text text-sm -ml-3 mr-5 mt-6 text-stone-400">毎日眺めていても</p>

            <p
              className="vertical-text text-black mr-8 text-xl font-semibold "
            >
              <span className="en-vertical-text">SHOP INFO</span> 御厨榮蔵
            </p>
            <p
              className="vertical-text text-black mr-8 text-xl font-semibold "
            >
              <span className="en-vertical-text">NEWS</span> お知らせ
            </p>
            <p
              className="vertical-text text-black mr-8 text-xl font-semibold "
            >
              <span className="en-vertical-text">ENJOY</span>{" "}
              お酒を楽しく美味しく
            </p>
            <p
              className="vertical-text text-black mr-8 text-xl font-semibold "
            >
              <span className="en-vertical-text">PRODUCTS</span>{" "}
              わたしたちのお酒
            </p>
            <p
              className="vertical-text text-black mr-8 text-xl font-semibold "
            >
              <span className="en-vertical-text">LOCATION</span> 郷土
            </p>
            <p
              className="vertical-text text-black mr-8 text-xl font-semibold "
            >
              <span className="en-vertical-text">STORY</span> ものがたり
            </p>



          </div>

          

          {/* Right Section (Social Icons or Additional Info) */}
          <div className=" absolute flex flex-row gap-5 right-[55%] -bottom-[16%]">
          <p className=" grid cursor-pointer place-items-center text-2xl mr-0">
              <FaInstagram />
            </p>
            <p className=" grid cursor-pointer place-items-center text-2xl mr-0">
              <FaXTwitter />
            </p>
            <p className=" grid cursor-pointer place-items-center text-2xl mr-0">
              <FaFacebook />
            </p>
            <p className=" grid cursor-pointer place-items-center text-2xl mr-0">
              <FaYoutube />
           </p>
           </div> 

        </div>

        
      </div>
    </div>
  );
};

export default StoryPage;
