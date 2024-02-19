import React, { useState, useContext } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import AuthContext from "../contexts/AuthContext";
import mpesa from "../assets/mpesa.png";
export default function PayModal({ id, no }) {
  const [loading, setLoading] = useState(false);
  let { AuthTokens } = useContext(AuthContext);
  const [amount, setAmount] = useState(619);
  const [message, setMessage] = useState("");
  const [paid, setPaid] = useState(false);

  const pay = async (event, id) => {
    event.preventDefault();
    console.log(loading);
    console.log(id);

    const formdata = new FormData();
    formdata.append("amount", amount);

    setLoading(true);

    const response = await fetch(
      `http://192.168.43.55:8000/api/billing/${id}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(AuthTokens.access),
        },
        body: formdata,
      }
    );

    // Check if the response is okay
    if (response.status === 202) {
      const result = await response.json();
      setMessage(result);

      setTimeout(() => {
        setLoading(false);
        setPaid(true);
      }, 5000);
    } else {
      // Handle HTTP errors
      console.error(`HTTP error! Status: ${response.status}`);
    }

    // Set loading to false after the API call, regardless of success or failure
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button type="button" onClick={() => setShowModal(true)}>
          Buy Premium
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Upgrade to Premium{" "}
              </h3>

              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <XMarkIcon color="primary" />
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div class="relative p-4  ">
                <div class=" flex space-x-3 lg:mt-0">
                  y<p>{message.message}</p>
                  <h1 class="text-base font-semibold leading-6 text-red-400">
                    All-access
                  </h1>
                  <span class="rounded-full bg-slate-300/25 px-3 text-xs font-semibold leading-6 text-slate-500">
                    Personal license
                  </span>
                  <span>
                    <img className="h-8 w-max" src={mpesa} alt="" />
                  </span>
                </div>
                <div class="mt-4 flex items-center space-x-3">
                  <p class="text-4xl font-bold text-slate-900">KES 499.00</p>
                  <p class="text-sm font-semibold text-slate-500">
                    one-time payment
                  </p>
                </div>
                <p class="mt-6 text-base leading-7 text-slate-700">
                  Includes access to all premium blogs and our Ai blog generator
                </p>

                <p class="mt-6 text-sm leading-6 text-slate-600">
                  Checkout Phone {no}
                </p>
                <p class="mt-6 text-sm leading-6 text-slate-600">
                  All transactions are secure and 100% rufundable{" "}
                </p>
                <dl class="mt-16  divide-y divide-slate-900/5 text-base leading-6 text-slate-700 lg:block">
                  <div class="flex justify-between pb-4">
                    <dt>Subtotal</dt>
                    <dd class="font-semibold text-slate-900">KES 499.00</dd>
                  </div>
                  <div class="flex justify-between py-4">
                    <dt>Taxes</dt>
                    <dd class="text-slate-700">KES 120</dd>
                  </div>
                  <div class="flex justify-between pt-4 font-semibold text-slate-900">
                    <dt>Total price</dt>
                    <dd>KES 619.00</dd>
                  </div>
                </dl>
              </div>
            </TEModalBody>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={(e) => {
                  pay(e, id);
                }}
                data-modal-hide="default-modal"
                type="button"
                class="text-white bg-red-400     font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {loading
                  ? "Processing"
                  : paid
                  ? "Payment successful"
                  : "Proceed to pay"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                data-modal-hide="default-modal"
                type="button"
                class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                close
              </button>
            </div>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
