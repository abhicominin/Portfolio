'use client'
import React,{useEffect,useRef} from 'react'
import Image from "next/image";
import Link from 'next/link';


import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
const Nav = () => {
const nav = useRef(null);
const navBtns = useRef(null);

useEffect(() => {
  if (navBtns.current) {
    navBtns.current.style.display = "none";
  }
  if (typeof window !== "undefined") {

    if(window.scrollY/ window.innerHeight > 1){
      navBtns.current.style.display = "flex";
      nav.current.style.filter = `invert(1)`;
        navBtns.current.style.opacity = 1;
    }

    const handleScroll = (e) => {
      const scrollTop = window.scrollY; // Current scroll position
      const windowHeight = window.innerHeight;
      const scrollPercentage = scrollTop / windowHeight;

      if (scrollPercentage <= 1) {
        if (scrollPercentage > 0.75) {
          navBtns.current.style.display = "flex";
        }
        if (scrollPercentage < 0.75) {
          navBtns.current.style.display = "none";
        }
        nav.current.style.filter = `invert(${scrollPercentage})`;
        navBtns.current.style.opacity = scrollPercentage;
      }
    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on component unmount
    };


  }
}, []);
  return (
    <nav
    ref={nav}
    className="flex text-white z-[1000000] fixed top-0 w-[100%] items-center p-5 border-0 border-red-600"
  >
    <div>
      <Image
        className="ourlogo cursor-pointer logo"
        src={"/logo.png"}
        width={50}
        height={50}
        alt="logo"
      />
    </div>

    <div className="ml-auto flex relative">
      {/* <div className="grid place-items-center">
        <Image
          className="mr-6 cursor-pointer"
          src={"/INSTAGRAM_ICON_WH.png"}
          width={20}
          height={100}
          alt="logo"
        />
      </div>
      <div className="grid place-items-center">
        <Image
          className="mr-6 cursor-pointer"
          src={"/X_ICON_WH.png"}
          width={20}
          height={100}
          alt="logo"
        />
      </div>
      <div className="grid place-items-center">
        <Image
          className="mr-6 cursor-pointer"
          src={"/FACEBOOK_ICON_WH.png"}
          width={20}
          height={100}
          alt="logo"
        />
      </div>
      <div className="grid place-items-center">
        <Image
          className="mr-6 cursor-pointer"
          src={"/YOUTUBE_ICON_WH.png"}
          width={30}
          height={10}
          alt="logo"
        />
      </div> */}

      <div ref={navBtns} className="opacity-0 flex items-center">
        <Link href="/StoryPage" passHref>
           <p className="mr-5 cursor-pointer">STORY</p>
        </Link>
        <Link href="/LocationPage" passHref>
           <p className="mr-5 cursor-pointer">LOCATION</p>
        </Link>
        <Link href="/ProductsPage" passHref>
           <p className="mr-5 cursor-pointer">PRODUCTS</p>
        </Link>
        <p className="mr-5 cursor-pointer">ENJOY</p>
        <p className="mr-5 cursor-pointer">NEWS</p>
        <p className="mr-5 cursor-pointer">SHOP INFO</p>
      </div>

      <p className=" grid cursor-pointer place-items-center text-2xl mr-5">
        <FaInstagram />
      </p>
      <p className=" grid cursor-pointer place-items-center text-2xl mr-5">
        <FaXTwitter />
      </p>
      <p className=" grid cursor-pointer place-items-center text-2xl mr-5">
        <FaFacebook />
      </p>
      <p className=" grid cursor-pointer place-items-center text-2xl mr-5">
        <FaYoutube />
      </p>

     

      {/* <div className="grid place-items-center"> */}
      {/* <Image
          className="mr-6 cursor-pointer"
          src={"/LANGUAGE_PULLDOWN_ELEMENT_WH.png"}
          width={15}
          height={10}
          alt="logo"
        /> */}
    
      {/* </div> */}
    </div>
  </nav>
  )
}

export default Nav
