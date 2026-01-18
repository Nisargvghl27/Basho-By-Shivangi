"use client";

import LottieLoader from "../../components/LottieLoader";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <LottieLoader className="w-48 h-48" text="Loading Dashboard..." />
    </div>
  );
}