import React, { useState, useEffect } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

export default function ModalDialogScrollable() {
  const [showModal, setShowModal] = useState(false);
  const [received, setReceived] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (e) => {
    setLoading(true);
    let response = await fetch(
      `http://127.0.0.1:8000/api/search/?q=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + String(AuthTokens.access),
        },
      }
    );
    let data = await response.json();

    if (response.status === 200) {
      setSearchResults(data);
      setReceived(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else if (response.statusText === "Unauthorized") {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button type="button" onClick={() => setShowModal(true)}>
          <SearchIcon />
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => {
                  setShowModal(false);
                }}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className="mb-3 xl:w-full w-full">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />

                  {/* <!--Search icon--> */}
                  <button
                    className="input-group-text flex items-center outline-1 outline whitespace-nowrap ml-2 rounded px-1 py-1.5 text-center bg-slate-200 text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2"
                    onClick={(e) => fetchSearchResults(e)}
                  >
                    search
                  </button>
                </div>
              </div>
              <div className="result ">
                <div className="singleresult m-2 space-y-3">
                  <>
                    {loading ? (
                      <div class="text-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {received && searchResults.length === 0 ? (
                          <p>No results found</p>
                        ) : (
                          searchResults.map((result) => (
                            <div className="border-b p-3 ">
                              {" "}
                              <NavLink
                                to={`single/${result.uid}`}
                                className={``}
                                onClick={() => setShowModal(false)}
                              >
                                <h1 className="font-semibold underline">
                                  {" "}
                                  {result.title}
                                </h1>
                                <p>{result.content.slice(0, 100)}...</p>
                              </NavLink>
                            </div>
                          ))
                        )}
                      </>
                    )}
                  </>
                </div>{" "}
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
