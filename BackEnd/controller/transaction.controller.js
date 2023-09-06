const Product = require( "../db/product.model");
const axios = require('axios');

async function getTransactions(month, search,page){
    
    try{
        const PER_PAGE = 10;
       
        const searchCriteria = {};
    
      searchCriteria.$or = [
        { title: { $regex: search, $options: 'i' } }, 
        { description: { $regex: search, $options: 'i' } }, 
        {  $expr: {
            $regexMatch: {
              input: { $toString: "$price" }, 
              regex: search, 
              options: 'i',
            },  }, }
      ]

      const regexPattern = new RegExp(`${month}`, 'i'); 
    
      const data = await Product.find({
        $and: [
          {
            dateOfSale: {
              $regex: regexPattern, 
            },
          },
          searchCriteria,
        ],
      }).skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE);;

      //  console.log(data)
       if(data.length === 0){
        return [{Message: "No Record Found"}];
       }
        return data;
    }
    catch(err){
        console.log(err)
    }
}

async function calculateStatistics(month) {
    try {
        const startDate = new Date(`01-${month}-2000`);
        const endDate = new Date(`01-${month}-2000`);
        endDate.setMonth(endDate.getMonth() + 1);
        const regexPattern = new RegExp(`${month}`, 'i'); 
    
       
        const totalSaleAmount = await Product.aggregate([
            {
                $match: {
                  dateOfSale:  {
                    $regex: regexPattern, 
                  },
                },
              },
              {
                $group: {
                  _id: null,
                  totalAmount: { $sum: '$price' },
                },
              },
        ]);
    
       
        const totalSoldItems = await Product.countDocuments({
          dateOfSale:  {
            $regex: regexPattern, 
          },
          sold: true, 
        });
    
       
        const totalNotSoldItems = await Product.countDocuments({
            dateOfSale:  {
                $regex: regexPattern, 
              },
          sold: false, 
        });
    
        
        return({
          totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalAmount : 0,
          totalSoldItems,
          totalNotSoldItems,
        });
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  }


  async function calculateBar(month) {
  try{

    const startDate = new Date(`01-${month}-2000`);
const endDate = new Date(`01-${month}-2000`);
endDate.setMonth(endDate.getMonth() + 1);
const regexPattern = new RegExp(`${month}`, 'i'); 

const priceRanges = [
  { min: 0, max: 100 },
  { min: 101, max: 200 },
  { min: 201, max: 300 },
  { min: 301, max: 400 },
  { min: 401, max: 500 },
  { min: 501, max: 600 },
  { min: 601, max: 700 },
  { min: 701, max: 800 },
  { min: 801, max: 900 },
];


const priceRangeResults = [];


for (const range of priceRanges) {
  const count = await Product.countDocuments({
    dateOfSale: {
        $regex: regexPattern, 
      },
    price: {
      $gte: range.min,
      $lte: range.max,
    },
  });

  priceRangeResults.push({
    priceRange: `${range.min}-${range.max}`,
    itemCount: count,
  });
}


const above900Count = await Product.countDocuments({
    dateOfSale: {
        $regex: regexPattern, 
      },
  price: {
    $gte: 901,
  },
});

priceRangeResults.push({
  priceRange: '901-above',
  itemCount: above900Count,
});

return priceRangeResults;


} catch (err) {
    console.error('Error:', err);
    return err;
  }

    }

  
    async function calculatePie(month) {
      try{
    const regexPattern = new RegExp(`${month}`, 'i'); 

        const categoryCounts = await Product.aggregate([
          {
            $match: {
              dateOfSale: {
                $regex: regexPattern, 
              },
            },
          },
          {
            $group: {
              _id: '$category',
              itemCount: { $sum: 1 },
            },
          },
        ]);
    
        const pieChartData = {};
        categoryCounts.forEach((category, index) => {
          pieChartData[category._id] = category.itemCount;
        });
        
        return pieChartData
      }
      catch(err){
        return err
      }
    }

    async function CombinedData(){
      const api1URL = 'http://localhost:3001/transactions';
      const api2URL = 'http://localhost:3001/statistics';
      const api3URL = 'http://localhost:3001/bar-chart';
      const api4URL = 'http://localhost:3001/pie-chart';
    
      
      const [response1, response2, response3, response4] = await Promise.all([
        axios.get(api1URL),
        axios.get(api2URL),
        axios.get(api3URL),
        axios.get(api4URL),
      ]);
    
   
      const combinedData = {
        API1: response1.data,
        API2: response2.data,
        API3: response3.data,
        API4: response4.data,
      };
    
      return combinedData;
    }
  

module.exports = {
    getTransactions,
    calculateStatistics,
    calculateBar,
    calculatePie,
    CombinedData
}