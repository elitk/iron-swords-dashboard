interface DashboardCardProps {
  title: string;
  amount: number;
  isLoading: boolean;
  icon: string;
  percentage: string;
}

const DashboardCard = ({
  title,
  amount,
  isLoading,
  icon,
  percentage,
}: DashboardCardProps) => {
  const percentageColor = percentage.startsWith("-")
    ? "text-red-500"
    : "text-green-500";

  return isLoading ? (
    <div>loading..</div>
  ) : (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
      {/* <div className="flex items-center space-x-4"> */}
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-2xl">{amount}</p>
      <div className="flex items-center justify-between w-full">
        <span className="text-3xl">{icon}</span>
        <p className={`text-sm ${percentageColor}`}>{percentage}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default DashboardCard;
