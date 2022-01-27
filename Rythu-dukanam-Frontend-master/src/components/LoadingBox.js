import React from "react";

function LoadingBox() {
  return (
    <div className="w-full h-screen justify-center items-center border border-lightBlue-300 shadow rounded-md p-4 mx-auto space-y-8">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-900 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded"></div>
            <div className="h-4 bg-gray-900 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-900 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded"></div>
            <div className="h-4 bg-gray-900 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-900 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded"></div>
            <div className="h-4 bg-gray-900 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-900 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded"></div>
            <div className="h-4 bg-gray-900 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-900 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded"></div>
            <div className="h-4 bg-gray-900 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingBox;
