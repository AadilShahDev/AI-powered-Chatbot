import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Models() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">AI-Powered Chatbots</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            to="gemini"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-medium transition"
          >
            Chatbot (Gemini)
          </Link>
          <Link
            to="openrouter"
            className="px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-medium transition"
          >
            Chatbot (OpenRouter)
          </Link>
        </div>

        <div className="pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Models;
