
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
function TransactionsBarChart() {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('01'); 

  useEffect(() => {

    const apiUrl = `http://localhost:3001/bar-chart?month=${selectedMonth}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => console.error('Error fetching bar chart data:', error));
  }, [selectedMonth]);


  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <div>
        <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div>
        {chartData.length > 0 ? (
          <Bar
            data={{
              labels: chartData.map((item) => item.priceRange),
              datasets: [
                {
                  label: 'Number of Items',
                  data: chartData.map((item) => item.itemCount),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Price Range',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Items',
                  },
                },
              },
            }}
          />
        ) : (
          <p>No data available for the selected month.</p>
        )}
      </div>
    </div>
  );
}

export default TransactionsBarChart;
