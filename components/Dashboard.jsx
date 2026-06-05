"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile, fetchpayments } from "@/actions/useractions";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: ""
  });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else {
      getData();
    }
  }, [session, router]);

  const getData = async () => {
    if (!session?.user?.email) return;

    setIsLoading(true);
    try {
      let u = await fetchuser(session.user.email);
      setCurrentUser(u);
      setForm({
        name: u?.name || "",
        email: u?.email || session.user.email,
        username: u?.username || "",
        profilepic: u?.profilepic || "",
        coverpic: u?.coverpic || "",
        razorpayid: u?.razorpayid || "",
        razorpaysecret: u?.razorpaysecret || ""
      });

      let dbpayments = await fetchpayments(session.user.email);
      setPayments(dbpayments || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      const res = await updateProfile(formData);

      if (res?.error) {
        setSaveMessage(res.error);
      } else {
        setSaveMessage("Profile updated successfully! ✅");
        await getData();
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch (error) {
      setSaveMessage("Error updating profile");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">

      {/* Hero Section with Cover Photo */}

      <div className="relative h-64 md:h-80 lg:h-80 w-full overflow-hidden bg-linear-to-r from-blue-600 to-purple-600">
        {form?.coverpic ? (
          <img
            src={form?.coverpic || "https://picsum.photos/1200/400"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}

        {/* Profile Picture Overlay */}
        <div className="absolute bottom-1 left-1/2 md:left-20 transform -translate-x-1/2 md:transform-none rounded-full object-cover">
          <div className="relative">
            <img
              src={form?.profilepic || "https://avatar.iran.liara.run/public"}
              alt="Profile"
              className="w-28 h-28  rounded-full border-4 border-white shadow-xl object-cover bg-white"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-2 border-white">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Welcome back,  {currentUser?.name || "there"}!
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage your profile and payment settings
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/donate")}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium text-sm hover:cursor-pointer"
                >
                  View Public Page
                </button>
                <button
                  onClick={() => {
                    const confirmLogout = window.confirm(
                      "Are you sure you want to sign out?"
                    );

                    if (confirmLogout) {
                      signOut();
                    }
                  }}
                  className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium text-sm hover:cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-linear-to-r from-primary to-secondary px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Profile Settings
              </h2>
              <p className="text-gray-100 text-sm mt-1">
                Update your personal information and payment details
              </p>
            </div>

            {/* Save Message Toast */}
            {saveMessage && (
              <div
                className={`mx-6 mt-4 p-3 rounded-lg ${saveMessage.includes("successfully")
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {saveMessage.includes("successfully") ? (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                  <span>{saveMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        value={currentUser?.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        value={form.email || ""}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id="email"
                        readOnly
                        className="block w-full pl-10 pr-3 py-2 text-gray-500 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <input
                      value={form.username || ""}
                      onChange={handleChange}
                      type="text"
                      name="username"
                      id="username"
                      className="block w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder="username"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Your unique public profile URL: /{form.username || "username"}
                  </p>
                </div>

                {/* Profile & Cover Pictures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="profilepic"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Profile Picture URL
                    </label>
                    <input
                      value={form.profilepic || ""}
                      onChange={handleChange}
                      name="profilepic"
                      type="text"
                      id="profilepic"
                      className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="coverpic"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Cover Picture URL
                    </label>
                    <input
                      value={form.coverpic || ""}
                      onChange={handleChange}
                      name="coverpic"
                      type="text"
                      id="coverpic"
                      className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                </div>
              </div>


              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full font-medium text-white bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] hover:scale-105 hover:shadow-lg hover:brightness-110 hover:cursor-pointer py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Profile Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;