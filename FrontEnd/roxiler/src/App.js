import logo from './logo.svg';
import './App.css';
import TransctionsTable from './Components/Transctions';
import TransactionsStatistics from './Components/TransactionsStatistics';
import TransactionsBarChart from './Components/TransactionsBarChart';
function App() {
  return (
    <div className="App">
    <TransctionsTable/>
    <TransactionsStatistics/>
    <TransactionsBarChart/>
    </div>
  );
}

export default App;
