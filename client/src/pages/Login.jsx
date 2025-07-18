import React, { useState } from "react";

const Login = () => {
  const [agreed, setAgreed] = useState(false);

  const handleGoogleLogin = () => {
    if (!agreed) {
      alert("Please agree to the Terms & Conditions before continuing.");
      return;
    }
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleGitHubLogin = () => {
    if (!agreed) {
      alert("Please agree to the Terms & Conditions before continuing.");
      return;
    }
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e0f2fe] to-[#dbeafe]"
      style={{ backgroundImage: "url('/images/login_bg.jpg')" }}
    >
      <div className="bg-gradient-to-br from-[#e0f2ff] to-[#dbeafe] shadow-xl p-10 rounded-2xl flex flex-col items-center gap-6 max-w-md w-full border border-blue-200">
        <h1 className="text-3xl font-bold text-[#1d4ed8]">Job Tracker</h1>
        <p className="text-gray-700 text-center">
          Log in to manage your job applications easily.
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border border-gray-300 px-6 py-3 rounded-md shadow hover:shadow-md transition bg-white w-full"
        >
          <img
            src="/images/google-logo.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* GitHub Login */}
        <button
          onClick={handleGitHubLogin}
          className="flex items-center justify-center gap-3 border border-gray-300 px-6 py-3 rounded-md shadow hover:shadow-md transition bg-white w-full"
        >
          <img
            src="/images/github-logo.svg"
            alt="GitHub Logo"
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700">
            Continue with GitHub
          </span>
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 text-sm text-gray-600 mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mt-1"
          />
          <label htmlFor="terms" className="cursor-pointer">
            I agree to the{" "}
            <a href="#" className="text-blue-600 underline">
              Terms & Conditions
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
