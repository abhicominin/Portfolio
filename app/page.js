"use client";
// import Video from 'next-video';
import { useEffect, useRef, useState } from "react";
import Nav from "../components/Navbar/page";
import Location from "@/components/Location/page";


import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import('@/components/LandingPage/page'),{
   loading: () => <p>Loading...</p>,
   ssr: false
})



export default function Home() {
  return (
    <>
    
      <LandingPage />


      {/* <p className="mt-[90vh] text-3xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident illum
        aut, unde voluptates repudiandae nemo esse labore expedita, consequuntur
        rerum quaerat, porro obcaecati distinctio deserunt maiores facere
        exercitationem repellat suscipit consequatur! Explicabo dolor porro illo
        tempora quia deserunt, molestias voluptatibus rem. Culpa aliquam tempora
        iste reprehenderit sapiente fugit illum minima eius. At modi fugit
        veniam! Corrupti beatae molestias distinctio, at labore earum, cumque
        aut reprehenderit repudiandae iusto nihil. Voluptate consequuntur
        maiores vel assumenda sunt eum! Cum aperiam fuga maiores natus unde?
        Saepe illum harum ab maiores repudiandae non ipsa, cupiditate expedita
        veniam aperiam perspiciatis deserunt sapiente similique blanditiis vitae
        fugit!
      </p> */}
    </>
  );
}
