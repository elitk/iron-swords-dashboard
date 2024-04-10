import React, { useCallback, useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard"; // Adjust the import path as necessary
import TotalRevenueChart from "../../components/TotalAlarmsChart/TotalAlarmsChart";
import ProfitThisWeekChart from "../../components/WeeklyAlarmsChart/WeeklyAlarmsChart";
import { useAlarms } from "../../hooks/useAlarms";
import MyPieChart from "../../components/AlarmPieChart/AlarmPieChart";
import { comparePeriods } from "../../utils/comparePeriods";
import { Alarm } from "../../types";
import MapChart from "../../components/MapChart /MapChart";
import HeatmapChart from "../../components/HeatmapChart/HeatmapChart";
import { useAlarmsContext } from "../../context/AlarmsContext";
import { LiaRocketSolid } from "react-icons/lia";
import { GiJetFighter } from "react-icons/gi";

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly"); // Default to weekly
  // const [selectedPeriod, setSelectedPeriod] = useState<Period>('weekly'); // Default to weekly
  const { alarms, isLoading, fetchAlarms } = useAlarmsContext();
  // const { alarms, isLoading } = useAlarms("weekly");
  const { alarms: customDateAlarms } = useAlarms(selectedPeriod);

  useEffect(() => {
    fetchAlarms(selectedPeriod);
  }, [selectedPeriod]);

  const alarmsAnalysis = (alarms: Alarm[], desc: string) => {
    return alarms.filter((alarm) => alarm.category_desc === desc).length;
  };
  const missilesLength = alarmsAnalysis(alarms, "Missiles");
  const hostileLength = alarmsAnalysis(alarms, "Hostile aircraft intrusion");
  const customDateMissilesLength = alarmsAnalysis(customDateAlarms, "Missiles");
  const customDateHostileLength = alarmsAnalysis(
    customDateAlarms,
    "Hostile aircraft intrusion"
  );

  const alarmsLength = alarms.length;
  const customDateAlamrsLength = customDateAlarms.length;

  const dashboardCardsData = [
    {
      title: "Total Alarms",
      amount: alarmsLength,
      isLoading,
      icons: [LiaRocketSolid, GiJetFighter],
      percentage: comparePeriods(alarmsLength, customDateAlamrsLength),
    },
    {
      title: "Total Missiles",
      amount: missilesLength,
      isLoading,
      icons: [LiaRocketSolid],
      percentage: comparePeriods(missilesLength, customDateMissilesLength),
    },
    {
      title: "Total Hostile",
      amount: hostileLength,
      isLoading,
      icons: [GiJetFighter],
      percentage: comparePeriods(hostileLength, customDateHostileLength),
    },
    // {
    //   title: "Total Views",
    //   amount: 0,
    //   isLoading,
    //   icon: "👁️",
    //   percentage: "0.43% ↑",
    // },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
  };
  const handleSubmit = async () => {
    // await fetchData(selectedPeriod);
  };

  const options = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];
  console.log({ selectedPeriod });
  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center mb-4">
        <label htmlFor="period" className="text-sm mr-2 font-medium">
          Period:
        </label>
        <LiaRocketSolid />
        <select
          id="period"
          name="period"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3"
          onChange={handleChange}
          value={selectedPeriod}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div
        className={`p-5 grid grid-cols-1 md:grid-cols-${dashboardCardsData.length} lg:grid-cols-${dashboardCardsData.length} gap-4`}
      >
        {dashboardCardsData.map((cardData, index) => (
          <DashboardCard
            key={index}
            title={cardData.title}
            amount={cardData.amount}
            isLoading={cardData.isLoading}
            Icons={cardData.icons}
            percentage={cardData.percentage}
          />
        ))}
      </div>
      {/* first section */}
      <div className="flex flex-row w-full p-5">
        <div className="w-2/3 mr-4">
          <TotalRevenueChart />
        </div>
        <div className="w-1/3">
          <ProfitThisWeekChart />
        </div>
      </div>
      {/* first section */}
      {/* second section */}
      <div className="flex flex-row w-full p-5">
        <div className="w-2/5 mr-4">
          <MyPieChart
            title="Total Alarm by category"
            category="category_desc"
          />
        </div>
        <div className="w-3/5">
          <MapChart />
        </div>
      </div>
      {/* second section */}

      {/* third section */}
      <div className="flex flex-row w-full p-5">
        <div className="w-2/5 mr-4">
          <MyPieChart title="Total Alarm by city" category="data" />
        </div>
        <div className="w-3/5">
          <HeatmapChart title="Total Alarm by hour" />
        </div>
      </div>
      {/* third section */}
    </div>
  );
};

export default Dashboard;
