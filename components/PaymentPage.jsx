"use client";

import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchpayments, fetchuser, initiate } from "@/actions/useractions";
import { UserCircleIcon, CurrencyDollarIcon, UsersIcon, ChatBubbleLeftRightIcon, HeartIcon, } from "@heroicons/react/24/outline";
const PaymentPage = () => {

  const router = useRouter();

  const [currentUser, setcurrentUser] = useState({
    profilepic: "",
    coverpic: ""
  });
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const [payments, setPayments] = useState([]);
  const { data: session, status } = useSession();

  const amountRef = useRef(null);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserData();
    }

    getData();

    const params = new URLSearchParams(window.location.search);
    if (params.get("paymentdone")) {
      setTimeout(() => getData(), 1000);
    }

  }, [session]);

  const fetchUserData = async () => {
    let u = await fetchuser(session.user.email);
    setcurrentUser(u);
  };

  const getData = async () => {
    let dbpayments = await fetchpayments(); 
    setPayments(dbpayments || []);
  };

  console.log("Current User:", currentUser);
  console.log("Session:", session);
  console.log("Donor Name:", currentUser?.name);

  const totalDonated = payments
    .filter(p => p.donor_email === session?.user?.email)
    .reduce((sum, p) => sum + p.amount, 0);
  console.log(totalDonated)

  const pay = async (amount) => {
    if (!session?.user?.email) {
      alert("Please login to donate");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }


    let a = await initiate(amount, {
      ...paymentform,
      donor_name: session?.user?.name,
      donor_email: session.user.email,
    }); // 
    let orderId = a.id;

    var options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "SimplyKind Foundation",
      order_id: orderId,
      callback_url: `${window.location.origin}/api/razorpay`,
      prefill: {
        name: currentUser?.name || session?.user?.name || "Guest",
        email: session.user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePay = (amount) => {
    if (!currentUser) {
      alert("Please log in before making a donation.");
      router.push("/login");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    pay(amount);
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-white text-textcolor">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-125 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/herosection.avif"
              alt="Poor kids studying"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
                Help Us Change Lives Through Education
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Every child deserves quality education. Your donation can make a
                difference in someone's future.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    amountRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });

                    setTimeout(() => {
                      amountRef.current?.focus();
                      amountRef.current?.classList.add("ring-2", "ring-accent");

                      setTimeout(() => {
                        amountRef.current?.classList.remove("ring-2", "ring-accent");
                      }, 1500);
                    }, 500);
                  }}
                  className=" px-6 py-2.5 rounded-full font-medium text-white
              bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))]
              shadow-lg transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:brightness-110
              active:scale-95 hover:cursor-pointer"
                >
                  Donate Now ❤️
                </button>

                <Link
                  href="/about/mission"
                  className="px-8 py-3 rounded-full font-semibold
border border-white/40 text-white backdrop-blur-sm
hover:bg-white/10 transition-all duration-300  hover:scale-105 hover:shadow-xl hover:brightness-110
              active:scale-95 hover:cursor-pointer"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* User Info Section */}
        <section className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={currentUser?.profilepic || "/childstudy.jpg"}
                    alt={"User profile"}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-white">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clirule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {currentUser?.name || "Guest"}
                  </h2>
                  <span className="text-gray-700 text-2xl">@{currentUser?.username || "guest"}</span>
                </div>
                <p className="text-gray-600 mb-4">{currentUser?.email || "Welcome to SimplyKind 💙"}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Donated</p>
                      <p className="text-xl font-bold text-gray-800">
                        ₹{totalDonated.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-linear-to-r bg-[linear-gradient(90deg,var(--color-secondary),var(--color-primary))] h-2 rounded-full transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Messages & Donation Form */}
        <section className="container mx-auto px-4 py-12 max-w-[80vw]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Messages Box */}
            <div className="bg-secondary/20 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
              <div className=" bg-[linear-gradient(90deg,var(--color-secondary),var(--color-primary))]  text-white px-6 py-4">
                <div className="flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">
                    Recent Supporters
                  </h3>
                </div>
              </div>

              <div className="h-100 px-7 text-primary py-4 overflow-y-auto text-base font-semibold flex flex-col items-start gap-2">
                {payments.length === 0 && (
                  <div className="flex gap-1 items-center">No payments yet</div>
                )}
                {payments.map((p) => (
                  <div key={p._id} className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {" "}
                      {p.donor_name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message "{p.message}"
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Form */}
            <div
              id="donation-form"
              className="bg-secondary/20 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
              <div className=" bg-[linear-gradient(90deg,var(--color-secondary),var(--color-primary))]  text-white px-6 py-4">
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">
                    Make a Donation
                  </h3>
                </div>
                <p className="text-white text-sm mt-1">
                  Your contribution can change a life today
                </p>
              </div>

              <div className="payment p-6">
                <div className="flex flex-col gap-3">
                  <input
                    value={currentUser?.name || "Anonymous"}
                    readOnly
                    name="name"
                    className="bg-white text-black px-6 py-3  w-full rounded-2xl cursor-not-allowed"
                    type="text"
                    placeholder={currentUser?.name}
                  />
                  <input
                    onChange={handleChange}
                    value={paymentform.message}
                    name="message"
                    className="bg-white text-black px-6 py-3  w-full rounded-2xl"
                    type="text"
                    placeholder="Enter Message"
                  />
                  <div className="flex flex-wrap gap-3 w-full">
                    {" "}
                    <input
                      onChange={handleChange}
                      value={paymentform.amount}
                      ref={amountRef}
                      name="amount"
                      className="bg-white text-black px-6 py-3  w-full rounded-2xl"
                      type="text"
                      placeholder="Enter Payment Amount"
                    />
                    <button
                      onClick={() => handlePay(Number.parseInt(paymentform.amount))}
                      type="button"
                      className="w-full px-6 py-2.5 rounded-full font-medium text-white
              bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))]
              shadow-lg transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:brightness-110
              active:scale-95 hover:cursor-pointer"
                    >
                      Pay
                    </button>
                  </div>
                  <p className="text-center">or you can pay</p>
                </div>
                <div className="mt-5 button-grp flex flex-wrap gap-3  items-center justify-center">
                  <button
                    type="button"
                    className=" px-6 py-2.5 rounded-full font-medium text-white
              bg-[linear-gradient(135deg,var(--color-accent),var(--color-secondary))]
              shadow-lg transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:brightness-110
              active:scale-95 hover:cursor-pointer"
                    onClick={() => handlePay(10)}
                  >
                    Pay ₹10
                  </button>
                  <button
                    type="button"
                    className=" px-6 py-2.5 rounded-full font-medium text-white
              bg-[linear-gradient(135deg,var(--color-accent),var(--color-secondary))]
              shadow-lg transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:brightness-110
              active:scale-95 hover:cursor-pointer"
                    onClick={() => handlePay(20)}
                  >
                    Pay ₹20
                  </button>
                  <button
                    type="button"
                    className=" px-6 py-2.5 rounded-full font-medium text-white
              bg-[linear-gradient(135deg,var(--color-accent),var(--color-secondary))]
              shadow-lg transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:brightness-110
              active:scale-95 hover:cursor-pointer"
                    onClick={() => handlePay(30)}
                  >
                    Pay ₹30
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default PaymentPage;
