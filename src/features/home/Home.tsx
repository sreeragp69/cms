import React from "react";
import PageBreadcrumb from "./PageBreadcrumb";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

const Home = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Dashboard
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <CardBox 
            title="Total Users" 
            icon={<Users size={22} />} 
            totalNumbers="1,234" 
            color="from-blue-500 to-cyan-500"
          />
          <CardBox 
            title="Orders" 
            icon={<ShoppingCart size={22} />} 
            totalNumbers="567" 
            color="from-orange-500 to-red-500"
          />
          <CardBox 
            title="Revenue" 
            icon={<DollarSign size={22} />} 
            totalNumbers="$12,345" 
            color="from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

interface CardBoxProps {
  title: string;
  icon: React.ReactNode;
  totalNumbers: string | number;
  color?: string; // optional: to customize icon background
}

const CardBox: React.FC<CardBoxProps> = ({ title, icon, totalNumbers, color = "from-indigo-500 to-purple-500" }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-transform duration-200 hover:scale-[1.02] dark:border-gray-800 dark:bg-white/[0.05]">
      <div className="flex items-center justify-between">
        {/* Left side with icon */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${color} text-white shadow-md`}
          >
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
            <p className="text-2xl font-bold text-gray-800 dark:text-white/90">{totalNumbers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
