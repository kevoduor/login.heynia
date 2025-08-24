"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800">
      {!submitted ? (
        <div className="w-full max-w-md space-y-6 p-8 rounded-2xl shadow-lg bg-white">
          <h1 className="text-2xl font-bold text-center">Welcome to HeyNia</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSubmitted(true)}
            className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      ) : (
        <h2 className="text-3xl font-semibold">Welcome, {name || "Guest"} 👋</h2>
      )}
    </main>
  );
}
