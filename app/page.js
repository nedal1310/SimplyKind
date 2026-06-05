"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      {/* //hero section */}
      <div className="relative w-full min-h-[91vh] flex flex-col justify-center items-center text-white">
        {/* Background Image */}
        <Image
          src="/herosection.avif"
          alt="hero"
          fill
          style={{ opacity: 0.8 }}
          className="object-cover "
          priority
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-b 
from-background/40 
via-background/30 
to-background/20 "
        ></div>
        {/* Content */}
        <div className="flex flex-col items-center gap-4 text-center px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Donate and Educate a Child!
          </h1>

          <p className="text-xl md:text-2xl">
            Because every child deserves a chance to learn
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            <button
              type="button"
              onClick={() => router.push("/donate")}
              className="px-6 py-2.5 rounded-2xl font-medium text-white bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110 hover:cursor-pointer active:scale-95"
            >
              Donate Now ❤️
            </button>

            <button
              type="button"
              onClick={() => router.push("/about")}
              className="px-6 py-2.5 rounded-2xl font-medium text-white
              bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))]
              shadow-lg transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:brightness-110 hover:cursor-pointer
              active:scale-95"
            >
              Read More
            </button>
          </div>
        </div>
      </div>


      {/* learn more about us */}
      <div className="lastpara  bg-white/30 backdrop-blur-md  min-h-[90vh] py-6 ">
        <h2 className="text-3xl text-textcolor font-semibold text-center  mb-0 ">
          Learn More About Us
        </h2>
        <div className="secondCardsContainer flex  flex-wrap justify-center items-center gap-10">
          <div
            className="card flex flex-col my-10 justify-center items-center max-w-sm p-6 rounded-2xl 
shadow-xl backdrop-blur-md 
bg-white/70 border border-white/30 
text-textcolor transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              className="  rounded-xl "
              src="/childstudy.jpg"
              alt="children"
            />
            <h5 className="mt-6 mb-2 text-2xl font-semibold ">Our Mission</h5>
            <p className="mb-6 text-center text-textcolor/80">
              We are committed to providing quality education and essential
              resources to underprivileged children, helping them build a
              strong foundation for a better future.
            </p>
            <button
              onClick={() => router.push("/about/mission")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white
  bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))]
  transition-all duration-300
  hover:scale-105 hover:shadow-lg hover:brightness-110 hover:cursor-pointer"
            >
              Learn More
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
          <div
            className="card flex flex-col my-10 justify-center items-center max-w-sm p-6 rounded-2xl 
shadow-xl backdrop-blur-md 
bg-white/70 border border-white/30 
text-textcolor transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img className="rounded-xl" src="/support.jpg" alt="children" />

            <h5 className="mt-6 mb-2 text-2xl font-semibold ">What We Do</h5>

            <p className="mb-6 text-center text-textcolor/80">
              Through donations, community support, and dedicated volunteers,
              we provide learning materials, guidance, and opportunities that
              empower children to grow and succeed.
            </p>

            <button
              onClick={() => router.push("/about/work")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white
  bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))]
  transition-all duration-300
  hover:scale-105 hover:shadow-lg hover:brightness-110 hover:cursor-pointer"
            >
              Our Work
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
          <div
            className="card flex flex-col my-10 justify-center items-center max-w-sm p-6 rounded-2xl 
shadow-xl backdrop-blur-md 
bg-white/70 border border-white/30 
text-textcolor transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img className="rounded-xl" src="/children.jpg" alt="children" />

            <h5 className="mt-6 mb-2 text-2xl font-semibold ">Our Vision</h5>

            <p className="mb-6 text-center text-textcolor/80">
              We envision a world where every child, regardless of their
              background, has access to education, the confidence to dream
              big. We shape a future filled with hope.
            </p>
            <button
              onClick={() => router.push("/about/vision")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white
      bg-[linear-gradient(135deg,var(--color-accent),var(--color-primary))]
      transition-all duration-300
      hover:scale-105 hover:shadow-lg hover:brightness-110 hover:cursor-pointer"
            >
              Our Story
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </>
  );
}
