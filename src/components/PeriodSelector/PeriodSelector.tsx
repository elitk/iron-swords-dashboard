import React, { memo } from 'react';
import { AlarmPeriod } from '../../types/alarms';

interface PeriodSelectorProps {
  selectedPeriod: AlarmPeriod;
  onPeriodChange: (period: AlarmPeriod) => void;
}

const PeriodButton = memo(({ 
  period, 
  selectedPeriod, 
  onPeriodChange 
}: { 
  period: AlarmPeriod; 
  selectedPeriod: AlarmPeriod; 
  onPeriodChange: (period: AlarmPeriod) => void;
}) => (
  <button
    className={`px-4 py-2 rounded ${
      selectedPeriod === period ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
    onClick={() => onPeriodChange(period)}
  >
    {period.charAt(0).toUpperCase() + period.slice(1)}
  </button>
));

const PeriodSelector = memo(({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) => {
  return (
    <div className="flex gap-2">
      <PeriodButton period={AlarmPeriod.DAILY} selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
      <PeriodButton period={AlarmPeriod.WEEKLY} selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
      <PeriodButton period={AlarmPeriod.MONTHLY} selectedPeriod={selectedPeriod} onPeriodChange={onPeriodChange} />
    </div>
  );
});

export default PeriodSelector; 