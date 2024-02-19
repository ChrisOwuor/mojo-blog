import React from "react";


export default function About() {
  return (
    <section className="overflow-hidden pt-39 pb-17.5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-7 xl:gap-14">
          <div className="lg:max-w-[570px] sm:w-3/5 w-full">
            <video controls width={"100%"} className="rounded-lg">
              <source
                src={`${process.env.REACT_APP_API_BASE_URL}/stream `}
                type="video/mp4"
              />
            </video>
          </div>
          <div className="lg:max-w-[490px] w-full">
            <span className="inline-flex text-primary font-medium text-xl mb-2.5">
              Who we are
            </span>
            <h1 className="font-bold text-heading-6 sm:text-heading-4 lg:text-heading-3 text-dark mb-5">
              We provide high quality Articles &amp; blogs
            </h1>
            <p>
              We cover a wide range of topics includingedication ,fitness heanth
              and others. Whether you're interested in family or politics, we
              strive to deliver engaging and informative content to our readers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
