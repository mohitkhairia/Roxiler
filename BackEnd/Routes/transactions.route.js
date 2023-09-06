const express = require('express');
const { getTransactions, calculateStatistics, calculateBar, calculatePie, CombinedData} = require('../controller/transaction.controller');

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
   
       
       const statistics = await calculateStatistics(month);
   
       res.status(200).json(statistics);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });


   route.get('/bar-chart', async (req, res) => {
     try {
       const { month = '01'} = req.query; 
     const data = await calculateBar(month)

     res.status(200).json(data);
       
     } catch (err) {
       console.error('Error:', err);
       res.status(500).json({ error: err.message });
     }
   });
   

   route.get('/pie-chart', async (req, res) => {
    try {
      const { month = '01' } = req.query; 
  
      
     const pieChartData = await calculatePie(month);
     console.log(pieChartData)
     
      res.status(200).json(pieChartData);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }
  });



  route.get('/combine-data', async (req, res) => {
    try {
   

      const data = await CombinedData();
      console.log(data)
    
      res.status(200).json(data);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
    }
  });
  


module.exports ={ route};