
import PageBreadcrumb from "../home/PageBreadcrumb";
import Card from "../../shared/components/cards/Card";

const Dashboard = () => {
  return (
    <div className="w-full h-[60rem]">
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className=" p-5  lg:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* <GlowCard title="Total Blogs" value="128" badge="Published" /> */}

          <Card
            data={{
              balance: 1000,
              cardNumber: "4567 8901 2345 6789",
              validThru: "12/25",
              cardHolder: "John Doe",
            }}
          />
          <Card
            data={{
              balance: 1000,
              cardNumber: "4567 8901 2345 6789",
              validThru: "12/25",
              cardHolder: "John Doe",
            }}
          />
          <Card
            data={{
              balance: 1000,
              cardNumber: "4567 8901 2345 6789",
              validThru: "12/25",
              cardHolder: "John Doe",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
