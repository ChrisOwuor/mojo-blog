import React from "react";

export default function Footer() {
  return (
    <div className="w-full flex justify-center">
      <div className="relative z-10  w-5/6 py-8 border-t border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-center flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between">
            <div>
              <p className="text-custom-sm">
                © 2023 Mojo Blogs . All rights reserved
              </p>
            </div>
            <div>
              <ul className="flex flex-wrap items-center gap-2.5">
                <li>
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Privacy
                  </span>
                </li>
                <li>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                </li>
                <li>
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Terms
                  </span>
                </li>
                <li>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                </li>
                <li>
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Contact
                  </span>
                </li>
                <li>
                  <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                </li>
                <li>
                  <span className="bg-gradient-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Contribute
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-medium text-custom-sm text-dark">
                  Follow Us:
                </p>

                <div className="flex items-center gap-1.5">
                  <a
                    id="linkedinFooterBtn"
                    aria-label="linkedin social link"
                    href="https://www.linkedin.com/in/chrispine-owuor-23363525b"
                    className="flex items-center justify-center w-7.5 h-7.5 rounded-full hover:bg-gray-2 lg:transition-all lg:ease-linear lg:duration-300 hover:text-dark"
                  >
                    <svg
                      className="fill-current"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.50004 3.50068C5.49976 4.11141 5.12924 4.661 4.56318 4.89028C3.99713 5.11957 3.34858 4.98277 2.92335 4.54439C2.49812 4.10601 2.38114 3.45359 2.62755 2.89478C2.87397 2.33597 3.43458 1.98236 4.04504 2.00068C4.85584 2.02502 5.5004 2.68951 5.50004 3.50068ZM5.54504 6.11068H2.54504V15.5007H5.54504V6.11068ZM10.2851 6.11068H7.30004V15.5007H10.2551V10.5732C10.2551 7.82816 13.8326 7.57316 13.8326 10.5732V15.5007H16.7951V9.55316C16.7951 4.92568 11.5001 5.09818 10.2551 7.37066L10.2851 6.11068Z"
                        fill=""
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
