import Header from "@/components/layout/header";
import SplashWrapper from "@/components/SplashWrapper";
import FloatingElements from "@/components/background/FloatingElements";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SplashWrapper showHeader={false}>
      <div className="min-h-screen text-slate-100">
        {/* Background Container */}
        <div id="background-container" className="h-[100dvh] w-full bg-enhanced fixed inset-0 -z-10">
          <FloatingElements />
          <div className="h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar">
          </div>
        </div>
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>
      </div>
    </SplashWrapper>
  );
}
