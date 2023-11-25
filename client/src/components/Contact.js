import React from "react";

export default function Contact() {
  return (
    <div>
      <section className="py-12 bg-gray-200 relative overflow-hidden z-10">
        <div className="absolute left-0 top-0 w-full h-full -z-10">
          <img
            src="https://clarity-tailwind.preview.uideck.com/images/bg-dots.svg"
            alt="dot"
          />
        </div>
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8  xl:px-0">
          <div className="bg-white shadow-1 rounded-[10px] py-9 px-4 sm:px-8 xl:px-10">
            <div className="flex flex-wrap items-center justify-between gap-10">
              <div className="max-w-[455px] w-full">
                <h3 className="font-semibold text-heading-6 text-dark mb-3">
                  Subscribe to Newsletter
                </h3>
                <p>
                  Provide your email to get email notification when we launch
                  new products or publish new articles
                </p>
              </div>
              <div className="max-w-[494px] w-full">
                <form>
                  <div className="flex items-center gap-5">
                    <div className="max-w-[350px] w-full">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        className="rounded-md border border-gray-3 bg-white placeholder:text-dark-5 w-full py-3.5  px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-dark-4/20 focus:border-transparent"
                      />
                    </div>
                    <button className="font-medium rounded-md text-white bg-dark flex py-3.5 px-5.5 hover:opacity-90 transition-all ease-linear duration-300">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
