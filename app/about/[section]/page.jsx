// app/about/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function AboutPage() {
    const params = useParams();          
    const router = useRouter();
    const activeSection = params.section || "mission";

    const sections = {
        mission: {
            title: "Our Mission",
            icon: "🎯",
            image: "/school.avif",
            content: {
                overview: "At SimplyKind, we believe that education is the most powerful tool to break the cycle of poverty. Our mission is to provide quality education and essential resources to underprivileged children, helping them build a strong foundation for a better future.",
                goals: [
                    "Provide free educational materials to 10,000+ children by 2025",
                    "Build 50 digital learning centers in rural areas",
                    "Train 1,000 teachers in modern teaching methodologies",
                    "Create scholarship programs for meritorious students"
                ],
                impact: "Since our founding, we've helped over 5,000 children access quality education, distributed 50,000+ books, and established 20 learning centers across the country.",
                quote: "Every child deserves a chance to dream, and education is the key that unlocks that dream."
            }
        },
        work: {
            title: "What We Do",
            icon: "🤝",
            image: "/schoolstudents.avif",
            content: {
                overview: "Through donations, community support, and dedicated volunteers, we provide learning materials, guidance, and opportunities that empower children to grow and succeed. Our comprehensive approach ensures holistic development of every child we serve.",
                activities: [
                    "Distribute free textbooks, notebooks, and stationery to underprivileged students",
                    "Organize weekend mentoring sessions with volunteer teachers",
                    "Provide nutritious meals to support healthy learning",
                    "Conduct career guidance and skill development workshops",
                    "Offer digital literacy programs and computer access"
                ],
                impact: "Last year alone, we conducted 500+ mentoring sessions, distributed 10,000+ learning kits, and helped 2,000+ students improve their academic performance.",
                quote: "Small acts of kindness, when multiplied by millions, can transform the world."
            }
        },
        vision: {
            title: "Our Vision",
            icon: "👁️",
            image: "/middaymeal.avif",
            content: {
                overview: "We envision a world where every child, regardless of their background, has access to quality education, the confidence to dream big, and the opportunity to shape a future filled with hope and prosperity.",
                longTerm: [
                    "Create a self-sustaining educational ecosystem across all underserved communities",
                    "Establish partnerships with governments and NGOs worldwide",
                    "Develop innovative learning technologies for remote areas",
                    "Build a global community of changemakers and educators"
                ],
                impact: "By 2030, we aim to reach 1 million children, establish 1,000 learning centers, and create a replicable model for educational equity worldwide.",
                quote: "Education is not just about learning facts, but about training the mind to think, to dream, and to create a better world."
            }
        }
    };

        if (!sections[activeSection]) {  
        notFound();
    }

    const currentSection = sections[activeSection];

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-100 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/herosection.avif"
                        alt="About Us"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeInUp">
                            About SimplyKind
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                            Empowering children through education, one donation at a time
                        </p>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-2 md:gap-4 py-4">
                        <button
                            onClick={() => router.push("/about/mission")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${activeSection === "mission"
                                    ? "bg-linear-to-r from-accent to-primary text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-textcolor hover:bg-gray-200"
                                }`}
                        >
                            <span className="mr-2">🎯</span> Our Mission
                        </button>
                        <button
                            onClick={() => router.push("/about/work")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${activeSection === "work"
                                    ? "bg-linear-to-r from-accent to-primary text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-textcolor hover:bg-gray-200"
                                }`}
                        >
                            <span className="mr-2">🤝</span> What We Do
                        </button>
                        <button
                            onClick={() => router.push("/about/vision")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${activeSection === "vision"
                                    ? "bg-linear-to-r from-accent to-primary text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-textcolor hover:bg-gray-200"
                                }`}
                        >
                            <span className="mr-2">👁️</span> Our Vision
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Hero Card */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden mb-8 group">
                        <div className="relative h-64 md:h-112.5 w-full overflow-hidden">
                            <Image
                                src={currentSection.image}
                                alt={currentSection.title}
                                fill
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-cover transition-transform duration-1200 group-hover:scale-105"
                                style={{
                                    filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
                                    objectPosition: "center 30%"
                                }}
                            />

                            {/* Enhanced Gradient Overlay for better text visibility */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Vibrant Color Overlay */}
                            <div className="absolute inset-0 bg-linear-to-r from-accent/20 to-primary/20 mix-blend-overlay"></div>


                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-textcolor/80 text-lg leading-relaxed mb-8">
                                {currentSection.content.overview}
                            </p>

                            {currentSection.content.goals && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-textcolor mb-4 flex items-center gap-2">
                                        <span className="text-accent">📋</span> Key Goals
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {currentSection.content.goals.map((goal, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-accent text-sm font-bold">{index + 1}</span>
                                                </div>
                                                <span className="text-textcolor/80">{goal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentSection.content.activities && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-textcolor mb-4 flex items-center gap-2">
                                        <span className="text-accent">⭐</span> Our Activities
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {currentSection.content.activities.map((activity, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-textcolor/80">{activity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentSection.content.longTerm && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-textcolor mb-4 flex items-center gap-2">
                                        <span className="text-accent">🚀</span> Long-term Vision
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {currentSection.content.longTerm.map((item, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-primary text-sm font-bold">{index + 1}</span>
                                                </div>
                                                <span className="text-textcolor/80">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-textcolor mb-4 flex items-center gap-2">
                                    <span className="text-accent">📊</span> Our Impact
                                </h3>
                                <div className="bg-linear-to-r from-primary/10 to-secondary/10 p-6 rounded-xl">
                                    <p className="text-textcolor/80 leading-relaxed">
                                        {currentSection.content.impact}
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-8">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-accent to-primary"></div>
                                <div className="pl-6">
                                    <p className="text-textcolor italic text-lg">
                                        "{currentSection.content.quote}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 mb-8">
                        <h3 className="text-2xl font-bold text-textcolor text-center mb-8">
                            Our Impact in Numbers
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">5,000+</div>
                                <div className="text-textcolor/70 text-sm">Children Educated</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
                                <div className="text-textcolor/70 text-sm">Books Distributed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">20+</div>
                                <div className="text-textcolor/70 text-sm">Learning Centers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
                                <div className="text-textcolor/70 text-sm">Volunteer Teachers</div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Join Us in Making a Difference
                        </h3>
                        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                            Every contribution, no matter how small, helps us get closer to a world where every child has access to quality education.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => router.push("/donate")}
                                className="px-8 py-3 bg-accent hover:bg-accent/90 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                Donate Now
                            </button>
                            <button
                                onClick={() => router.push("/about")}
                                className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full font-semibold transition-all duration-300 border border-white/30"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
        </>
    );
}