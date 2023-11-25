import React from "react";
import Hero from "../components/Hero";
import Blogs from "../components/Blogs";
import Top from "../components/Top";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Blogs />
      <Top />
      <Contact />

      <Footer />
    </>
  );
}
