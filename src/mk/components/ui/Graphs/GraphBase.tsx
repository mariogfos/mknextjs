"use client";
import React, { useEffect } from "react";
import { ChartType, ProptypesBase } from "./GraphsTypes";
import dynamic from "next/dynamic";
import Select from "../../forms/Select/Select";
const GraphsAdapter = dynamic(() => import("./GraphsAdapter"), { ssr: false });

type LChartType = {
  id: ChartType;
  name: string;
};
const GraphBase = ({
  chartTypes = null,
  data,
  options,
  background = "#333536",
}: ProptypesBase) => {
  const [chartType, setChartType] = React.useState<ChartType>("bar");
  const [lChartType, setLChartType] = React.useState<LChartType[]>([
    { id: "bar", name: "Barra" },
  ]);
  const onChange = (e:any) => {
    setChartType(e.target.value);
  };

  useEffect(() => {
    if (chartTypes) {
      const lChartT: LChartType[] = [];
      chartTypes.forEach((type) => {
        lChartT.push({
          id: type,
          name:
            type == "bar"
              ? "Barra"
              : type == "radialBar"
              ? "Circular"
              : type == "pie"
              ? "Torta"
              : "Linea",
        });
      });
      if (lChartT.length == 1) setChartType(lChartT[0].id);
      setLChartType(lChartT);
    }
  }, [chartTypes]);

  return (
    <div className={`bg-[${background}] rounded-3xl my-4 p-8`}>
      {chartTypes && chartTypes.length > 1 && (
        <Select
          label="Tipo de gráfica"
          value={chartType}
          name="type"
          className="w-[180px] "
          onChange={onChange}
          options={lChartType}
          required
        />
      )}
      <GraphsAdapter data={data} chartType={chartType} options={options} />
    </div>
  );
};

export default GraphBase;
