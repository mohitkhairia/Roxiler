const express = require('express');
const { getTransactions, calculateStatistics, calculateBar, calculatePie} = require('../controller/transaction.controller');

const route = express.Router();


route.get('/transactions', async (req,res)=>{
     try{
     let {month = '01', search = '', page = 1} =  req.query;
     
     let response = await getTransactions(month, search, page);
     
     res.status(200).json(response);
     }
     catch(err){
          res.status(500).json({ error: err.message });
     }
})


route.get('/statistics', async (req, res) => {
     try {
       const { month = '01'} = req.query;
   
       // Calculate statistics using the controller function
       const statistics = await calculateStatistics(month);
   
       res.status(200).json(statistics);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });


   route.get('/bar-chart', async (req, res) => {
     try {
       const { month = '01'} = req.query; // Get the month from the query parameter
     const data = await calculateBar(month)

     res.status(200).json(data);
       
     } catch (err) {
       console.error('Error:', err);
       res.status(500).json({ error: err.message });
     }
   });
   

   route.get('/pie-chart', async (req, res) => {
    try {
      const { month = '01' } = req.query; // Get the month from the query parameter
  
      
     const pieChartData = await calculatePie(month);
     console.log(pieChartData)
      // Send the pie chart data as a JSON response
      res.status(200).json(pieChartData);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }
  });


module.exports ={ route};