import React, { useState, useEffect } from 'react';

function TransactionsStatistics() {
  const [statistics, setStatistics] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('01'); 

  
  useEffect(() => {
    
    const apiUrl = `http://localhost:3001/statistics?month=${selectedMonth}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error('Error fetching statistics:', error));
  }, [selectedMonth]);

 
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transactions Statistics</h2>
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
        <p>Total Sale Amount: ${statistics.totalSaleAmount || 0}</p>
        <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
        <p>Total Unsold Items: {statistics.totalNotSoldItems || 0}</p>
      </div>
    </div>
  );
}

export default TransactionsStatistics;
