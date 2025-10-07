
import { Outlet } from "react-router-dom";
import Backdrop from "../components/Backdrop";
import { SidebarProvider, useSidebar } from "../../Context/SidebarContext";
import AppHeader from "../components/header/Header";
import AppSidebar from "../components/AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className=" lg:p-4 lg:pl-0  xl:flex dark:bg-themeBGDark">
     {/* <div className="min-h-screen bg-gradient-to-br xl:flex dark:from-themeBGDark dark:via-themeBGDarkLight dark:to-themeBGDarkLight from-blue-50 via-purple-50 to-pink-50 p-8 "> */}
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <div className="p-0 flex flex-col lg:p-6 lg:rounded-4xl from-blue-50 via-purple-50 to-pink-50 bg-gradient-to-br xl:flex dark:from-themeBGDark dark:via-themeBGDarkLight dark:to-themeBGDarkLight 
        
        
        mx-auto max-w-(--breakpoint-3xl) ">
        <AppHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
