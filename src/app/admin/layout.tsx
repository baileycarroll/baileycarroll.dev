"use client";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import FloatingElements from "@/components/background/FloatingElements";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout min-h-screen text-slate-100 grid grid-rows-[auto_1fr]">
      {/* Keep the existing background */}
      <div id="background-container" className="h-[100dvh] w-full bg-enhanced fixed inset-0 -z-10">
        <div className="h-full w-full overflow-hidden">
          <FloatingElements />
        </div>
      </div>
      
      {/* Admin Header */}
      <AdminHeader />
      
      {/* Admin Content Area */}
      <div className="grid grid-cols-[auto_1fr] min-h-0">
        {/* Admin Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
