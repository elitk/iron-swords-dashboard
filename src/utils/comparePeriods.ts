export const comparePeriods = (current: number, previos: number) => {
    return current === previos
      ? "0%"
      : current > previos
      ? `${(((current - previos) / previos) * 100).toFixed(0)}% ↑`
      : `-${(((previos - current) / previos) * 100).toFixed(0)}% ↓`;
  };