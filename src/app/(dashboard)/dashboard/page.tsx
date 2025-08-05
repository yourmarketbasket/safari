"use client";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Main Dashboard</h1>
      <div className="mt-8">
        <p className="text-gray-600">
          Welcome to your Safari dashboard.
        </p>
        <p className="mt-4 text-gray-600">
          You can navigate to the different sections of the application using the sidebar on the left.
        </p>
        {/* The user info and logout button are now in the shared header */}
      </div>
    </div>
  );
}
