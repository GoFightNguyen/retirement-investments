import logo from "./logo.svg";
import "./App.css";
import LabeledCurrencyControl from "./LabeledCurrencyControl";

function App() {
  return (
    <div className="App">
      <LabeledCurrencyControl id="annualSalary" labelText='Annual Salary'/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
