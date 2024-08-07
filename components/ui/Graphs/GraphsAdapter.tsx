import Chart from "react-apexcharts";
import { COLORS20, ProptypesAdapter } from "./GraphsTypes";
import { useEffect, useState } from "react";
import GraphAdapterBar from "./GraphAdapterBar";
import GraphAdapterRadialBar from "./GraphAdapterRadialbar";
import GraphAdapterLine from "./GraphAdapterLine";
import GraphAdapterPie from "./GraphAdapterPie";
import { formatNumber } from "@/mk/utils/numbers";

const GraphsAdapter = ({ data, chartType, options }: ProptypesAdapter) => {
  const [optionsChart, setOptionsChart]: any = useState(null);
  const [dataChart, setDataChart]: any = useState(null);

  const iconDownload = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 15.504V16.5C4 17.2956 4.31607 18.0587 4.87868 18.6213C5.44129 19.1839 6.20435 19.5 7 19.5H17C17.7956 19.5 18.5587 19.1839 19.1213 18.6213C19.6839 18.0587 20 17.2956 20 16.5V15.5M12 4V15M12 15L15.5 11.5M12 15L8.5 11.5" stroke="white" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  `;
  const colorWhite = "#A7A7A7";

  const o = {
    chart: {
      theme: {
        mode: "dark",
      },
      stackOnlyBar: true,
      redrawOnParentResize: true,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      type: chartType || "bar",
      toolbar: {
        show: true,
        tools: {
          download: iconDownload,
        },
      },
      zoom: {
        enabled: true,
      },
    },
    colors: options?.colors || COLORS20,
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      formatter: function (val: any, opts: any) {
        return " ";
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      fontFamily: "Inter",
      labels: {
        colors: colorWhite,
      },
      position: "right",
      offsetY: 65,
    },
    xaxis: {
      labels: {
        style: {
          colors: colorWhite,
          fontSize: "12px",
          fontWeight: 400,
          fontFamily: "Inter, Arial,",
        },
      },
    },
    tooltip: {
      enabled: true,
      followCursor: false,
      theme: true,
      style: {
        fontSize: "12px",
        fontFamily: "Inter",
      },

      y: {
        formatter: function (val: any) {
          return formatNumber(val) + " Bs"; // Personaliza el modal cunado hacen hover
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [colorWhite],
          fontSize: "10px",
          fontFamily: "Inter, Arial,",
        },
        formatter: (value: any) => {
          return formatNumber(value) + " Bs";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: options?.title || "",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: 900,
        fontFamily: "Inter",
        color: "#a7a7a7",
      },
    },
  };

  const factory = async () => {
    let datos: any = {};
    switch (chartType) {
      case "bar":
        datos = await GraphAdapterBar(data, options, o);
        break;
      case "radialBar":
        datos = await GraphAdapterRadialBar(data, options, o);
        break;
      case "line":
        datos = await GraphAdapterLine(data, options, o);
        break;
      case "pie":
        datos = await GraphAdapterPie(data, options, o);
        break;

      default:
        break;
    }
    setDataChart(datos.data);
    setOptionsChart({ ...o, ...datos.options });
  };
  useEffect(() => {
    if (!data) return;
    factory();
  }, [data, chartType]);

  return (
    <>
      {dataChart && optionsChart && (
        <>
          <Chart
            options={optionsChart}
            series={dataChart}
            type={chartType as any}
            height={options?.height || "auto"}
            width={options?.width || "100%"}
          />
        </>
      )}
    </>
  );
};

export default GraphsAdapter;
