import Image from "next/image";

import { Hero } from "../components/home/Hero";
import LandingPage from "../components/shared/LandingPages";


export default function Home() {
  return (
    <div>

      <Hero/>
      <LandingPage/>

    </div>
  );
}
