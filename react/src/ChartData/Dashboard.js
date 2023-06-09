import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const Dashboard = () => {
  // State variables
  const [chart, setChart] = useState("column"); // Current chart type
  const [chartOptions, setChartOptions] = useState({}); // Chart options
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Selected year
  const [usersData, setUsersData] = useState(null); // Data for users

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/users");
        const data = await response.json();
        setUsersData(data);

        // Filter data based on the selected year
        const filteredData = data.filter((item) => {
          const createdAtYear = new Date(item.created_at).getFullYear();
          return createdAtYear === selectedYear;
        });

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // Generate categories and series data for the chart
        const categories = months.map((month) => `${month}`);
        const seriesData = months.map((month) => {
          const monthData = filteredData.filter(
            (item) =>
              new Date(item.created_at).getMonth() === months.indexOf(month)
          );
          return monthData.length;
        });

        // Configure the chart options
        const options = {
          chart: {
            type: chart,
          },
          title: {
            text: "Signed-up Users by Month",
          },
          xAxis: {
            categories: categories,
          },
          yAxis: {
            title: {
              text: "User Count",
            },
          },
          series: [
            {
              name: "Users",
              data: seriesData,
              color: "#016025",
            },
          ],
        };

        setChartOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  // Event handler for year selection change
  const handleYearChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedYear(selectedValue);
  };

  // Event handler for chart type selection change
  const handleChartTypeChange = (event) => {
    const selectedChartType = event.target.value;
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        type: selectedChartType,
      },
    }));
    setChart(event.target.value);
  };

  // Generate chart options for the pie chart
  const generatePieChartOptions = () => {
    if (!usersData) return null;

    // Count the number of users in each status category
    const activeUsers = usersData.filter((user) => user.status === "active").length;
    const inactiveUsers = usersData.filter((user) => user.status === "inactive").length;
    const disabledUsers = usersData.filter((user) => user.status === "disabled").length;

    // Configure the chart options
    const options = {
      chart: {
        type: "pie",
      },
      title: {
        text: "User Status",
      },
      series: [
        {
          name: "Status",
          data: [
            { name: "Active", y: activeUsers },
            { name: "Inactive", y: inactiveUsers },
            { name: "Disabled", y: disabledUsers },
          ],
        },
      ],
    };

    return options;
  };

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <br></br>
      <div className="selection">
        <label htmlFor="year">Select Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
      </div>
      <br></br>
      <div className="selection">
        <label htmlFor="chartType">Select Chart Type:</label>
        <select id="chartType" onChange={handleChartTypeChange}>
          <option value="column">Column Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div>
        {usersData ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={generatePieChartOptions()}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
