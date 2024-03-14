import React from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard"; // Adjust the import path as necessary
import TotalRevenueChart from "../../components/TotalAlarmsChart/TotalAlarmsChart";
import ProfitThisWeekChart from "../../components/WeeklyAlarmsChart/WeeklyAlarmsChart";
import { useAlarms } from "../../hooks/useAlarms";
import MyPieChart from "../../components/AlarmPieChart/AlarmPieChart";
import { comparePeriods } from "../../utils/comparePeriods";
import { Alarm } from "../../types";

const Dashboard: React.FC = () => {
  const { alarms, isLoading } = useAlarms("weekly");
  const { alarms: lastWeekAlarms } = useAlarms("last-week");

  const alarmsAnalysis = (alarms: Alarm[], desc: string) => {
    return alarms.filter((alarm) => alarm.category_desc === desc).length;
  };
  const missilesLength = alarmsAnalysis(alarms, "Missiles");
  const hostileLength = alarmsAnalysis(alarms, "Hostile aircraft intrusion");
  const lastWeekMissilesLength = alarmsAnalysis(lastWeekAlarms, "Missiles");
  const lastWeekHostileLength = alarmsAnalysis(
    lastWeekAlarms,
    "Hostile aircraft intrusion"
  );

  const alarmsLength = alarms.length;
  const lastWeekAlamrsLength = lastWeekAlarms.length;
  console.log({ alarmsLength, lastWeekAlamrsLength });

  return (
    <div className="p-5 space-y-5">
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Repeat the component for each stat card you need */}
        <DashboardCard
          title="Total Alarms"
          amount={alarmsLength}
          isLoading={isLoading}
          icon="👁️"
          percentage={comparePeriods(alarmsLength, lastWeekAlamrsLength)}
        />
        <DashboardCard
          title="Total Missiles"
          amount={missilesLength}
          isLoading={isLoading}
          icon="👁️"
          percentage={comparePeriods(missilesLength, lastWeekMissilesLength)}
        />
        <DashboardCard
          title="Total Hostile"
          amount={hostileLength}
          isLoading={isLoading}
          icon="👁️"
          percentage={comparePeriods(hostileLength, lastWeekHostileLength)}
        />
        <DashboardCard
          title="Total Views"
          amount={0}
          isLoading={isLoading}
          icon="👁️"
          percentage="0.43% ↑"
        />
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
          <MyPieChart />
        </div>
        <div className="w-3/5">{/*
        add the map chart here
        <MapChart /> */}</div>
      </div>
      {/* second section */}

      {/* third section */}
      <div className="flex flex-row w-full p-5">
        {/* add more charts here  */}
      
      </div>
      {/* third section */}
    </div>
  );
};

export default Dashboard;
