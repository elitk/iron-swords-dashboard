import { useCallback, useEffect, useState, useMemo } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import TotalRevenueChart from "../../components/TotalAlarmsChart/TotalAlarmsChart";
import ProfitThisWeekChart from "../../components/WeeklyAlarmsChart/WeeklyAlarmsChart";
import MyPieChart from "../../components/AlarmPieChart/AlarmPieChart";
import MapChart from "../../components/MapChart /MapChart";
import HeatmapChart from "../../components/HeatmapChart/HeatmapChart";
import { useAlarmsContext } from "../../context/AlarmsContext";
import { LiaRocketSolid } from "react-icons/lia";
import { GiJetFighter } from "react-icons/gi";
import PeriodSelector from "../../components/PeriodSelector/PeriodSelector";
import React from "react";
import { AlarmPeriod } from "../../types/alarms";
import { comparePeriods } from "../../utils/comparePeriods";

const MemoizedTotalRevenueChart = React.memo(TotalRevenueChart);
const MemoizedProfitThisWeekChart = React.memo(ProfitThisWeekChart);
const MemoizedMyPieChart = React.memo(MyPieChart);
const MemoizedMapChart = React.memo(MapChart);
const MemoizedHeatmapChart = React.memo(HeatmapChart);
const MemoizedDashboardCard = React.memo(DashboardCard);

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<AlarmPeriod>(
    AlarmPeriod.WEEKLY
  );
  const { currentAlarms, historicalAlarms, isLoading, fetchAlarms } =
    useAlarmsContext();

  const handlePeriodChange = useCallback((period: AlarmPeriod) => {
    setSelectedPeriod(period);
  }, []);


  useEffect(() => {
    fetchAlarms(selectedPeriod);
  }, [selectedPeriod, fetchAlarms]);

  const getCurrentAlarmsCount = useCallback(
    (desc: string) => {
      if (!currentAlarms || !Array.isArray(currentAlarms)) return 0;
      return currentAlarms.filter((alarm) => alarm.category_desc === desc)
        .length;
    },
    [currentAlarms]
  );

  const getHistoricalAlarmsCount = useCallback(
    (desc: string) => {
      if (!historicalAlarms || !Array.isArray(historicalAlarms)) return 0;
      return historicalAlarms.filter((alarm) => alarm.category_desc === desc)
        .length;
    },
    [historicalAlarms]
  );

  // Current period counts
  const currentMissilesLength = useMemo(
    () => getCurrentAlarmsCount("Missiles"),
    [getCurrentAlarmsCount]
  );
  const currentHostileLength = useMemo(
    () => getCurrentAlarmsCount("Hostile aircraft intrusion"),
    [getCurrentAlarmsCount]
  );
  const currentAlarmsLength = useMemo(
    () => (Array.isArray(currentAlarms) ? currentAlarms.length : 0),
    [currentAlarms]
  );

  // Historical counts
  const historicalMissilesLength = useMemo(
    () => getHistoricalAlarmsCount("Missiles"),
    [getHistoricalAlarmsCount]
  );
  const historicalHostileLength = useMemo(
    () => getHistoricalAlarmsCount("Hostile aircraft intrusion"),
    [getHistoricalAlarmsCount]
  );
  const historicalAlarmsLength = useMemo(
    () => (Array.isArray(historicalAlarms) ? historicalAlarms.length : 0),
    [historicalAlarms]
  );

  const dashboardCardsData = useMemo(
    () => [
      {
        title: "Total Alarms",
        amount: currentAlarmsLength,
        isLoading,
        Icons: [LiaRocketSolid, GiJetFighter],
        percentage: comparePeriods(currentAlarmsLength, historicalAlarmsLength),
      },
      {
        title: "Total Missiles",
        amount: currentMissilesLength,
        isLoading,
        Icons: [LiaRocketSolid],
        percentage: comparePeriods(
          currentMissilesLength,
          historicalMissilesLength
        ),
      },
      {
        title: "Hostile Aircraft",
        amount: currentHostileLength,
        isLoading,
        Icons: [GiJetFighter],
        percentage: comparePeriods(
          currentHostileLength,
          historicalHostileLength
        ),
      },
    ],
    [
      currentAlarmsLength,
      currentMissilesLength,
      currentHostileLength,
      isLoading,
      historicalAlarmsLength,
      historicalMissilesLength,
      historicalHostileLength,
    ]
  );

  const renderDashboardCards = useCallback(
    () =>
      dashboardCardsData.map((card, index) => (
        <MemoizedDashboardCard key={index} {...card} />
      )),
    [dashboardCardsData]
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {renderDashboardCards()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <MemoizedTotalRevenueChart />
        <MemoizedProfitThisWeekChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <MemoizedMyPieChart
          title="Alarms by Category"
          category="category_desc"
        />
        <MemoizedMapChart />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <MemoizedHeatmapChart title="Alarms by Hour" />
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
