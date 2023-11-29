import React from "react";

export default function About () {

  return (
    <section className="overflow-hidden pt-39 pb-17.5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-7 xl:gap-14">
          <div className="lg:max-w-[570px] sm:w-3/5 w-full">
            <video controls width={"100%"} className="rounded-lg">
              <source
                src=" http://127.0.0.1:8000/api/stream"
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
              Sed ullamcorper dui at risus viverra, nec cursus leo ullamcorper.
              className aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos congue dui nec dui lobortis
              maximus.
            </p>
            <p className="mt-4.5">
              Curabitur pretium, libero vitae pharetra rhoncus, tellus urna
              auctor orci, eu dictum diam diam nec neque. Pellentesque.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


