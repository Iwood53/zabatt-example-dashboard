import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {  }
  }
  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    let machines = generateMachineData(15);

    this.state = {
      machines: machines,
      currentMachine: machines[0],
    };
  }

  changeMachine(e) {
    const machine = this.state.machines.find(
      (machine) => machine.name === e.target.value
    );
    this.setState({ currentMachine: machine });
  }

  render() {
    const machines = this.state.machines.map((machine) => (
      <button
        key={machine.name}
        value={machine.name}
        type="button"
        className="list-group-item list-group-item-action machine-button"
        onClick={(e) => this.changeMachine(e, "value")}
      >
        {machine.name}
      </button>
    ));
    return (
      <div>
        <header>Ian Woood - Zabatt Example Dashboard</header>
        <div className="my-grid">
          <aside>{machines}</aside>
          <div className="graph1">
            <DataPane currentMachine={this.state.currentMachine} />
          </div>
          <div className="graph2">
            <PieChart currentMachine={this.state.currentMachine} />
          </div>
          <div className="graph3">
            <BarChart currentMachine={this.state.currentMachine} />
          </div>
          <div className="graph4">
            <LineGraph currentMachine={this.state.currentMachine} />
          </div>
        </div>
        <footer>Ian Woood - Zabatt Example Dashboard</footer>
      </div>
    );
  }
}

class BarChart extends React.Component {
  render() {
    let labels = [];
    let data = [];
    if (this.props.currentMachine) {
      labels = this.props.currentMachine.runtimeData.map((x) =>
        x.date.time.toDateString()
      );
      data = this.props.currentMachine.runtimeData.map((y) => y.runHours);
    }
    return (
      <div>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Runtime in Hours",
                data: data,
                backgroundColor: "#383e56",
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            responsiveness: true,
            maintainAspectRatio: false,
            scales: {
              xaxes: [
                {
                  type: "time",
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

class LineGraph extends React.Component {
  render() {
    let labels = [];
    let data = [];
    if (this.props.currentMachine) {
      labels = this.props.currentMachine.alarmData.map((x) =>
        x.date.time.toDateString()
      );
      data = this.props.currentMachine.alarmData.map((y) => y.alarms);
    }
    return (
      <div>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Alarms",
                data: data,
                backgroundColor: "#fb743e",
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            responsiveness: true,
            maintainAspectRatio: false,
            scales: {
              xaxes: [
                {
                  type: "time",
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

class PieChart extends React.Component {
  render() {
    let labels = [];
    let data = [];
    if (this.props.currentMachine) {
      labels = ["Running", "StandBy", "Caution", "Error"];
      data = [
        this.props.currentMachine.statusHours.running,
        this.props.currentMachine.statusHours.standBy,
        this.props.currentMachine.statusHours.cautionState,
        this.props.currentMachine.statusHours.error,
      ];
    }
    return (
      <div>
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                label: "Alarms",
                data: data,
                backgroundColor: ["green", "#9fb8ad", "yellow", "red"],
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            responsiveness: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

class DataPane extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.currentMachine.name}</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Name</td>
              <td>{this.props.currentMachine.name}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Serial Number</td>
              <td>{this.props.currentMachine.serialNumber}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Install Date</td>
              <td>{this.props.currentMachine.bornOnDate}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Owner</td>
              <td>{this.props.currentMachine.owner}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Hour Meter</td>
              <td>{this.props.currentMachine.hourMeter}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

//Data Generation
function generateMachineData(num) {
  let machineArray = [];
  for (let i = 1; i < num; i++) {
    let machineName = "Machine " + i;
    let serialNumber = Math.floor(Math.random() * 1000000000);
    let bornOnDate = Math.floor(Math.random() * (2020 - 1985 + 1)) + 1985;
    let owner = "RandOwner" + Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    let hourMeter = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    let runtimeData = getRuntimeData(30, 15, 6);
    let alarmsData = getAlarmsData(30, 5, 0);
    let statusHours = getpieChartData();

    machineArray.push({
      name: machineName,
      serialNumber: serialNumber,
      bornOnDate: bornOnDate,
      owner: owner,
      hourMeter: hourMeter,
      runtimeData: runtimeData,
      alarmData: alarmsData,
      statusHours: statusHours,
    });
  }
  return machineArray;
}

function getDateArray(numItems) {
  let data = [];
  let baseTime = new Date("2021-01-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

function getRuntimeData(numOfDataPoints, maxHours, minHours) {
  let dates = getDateArray(numOfDataPoints);
  let uptimeData = [];

  dates.forEach((date) => {
    let randomHours =
      Math.floor(Math.random() * (maxHours - minHours + 1)) + minHours;
    uptimeData.push({
      date: date,
      runHours: randomHours,
    });
  });
  return uptimeData.sort((a, b) => b.date - a.date);
}

function getAlarmsData(numOfDataPoints, maxAlarms, minAlarms) {
  let dates = getDateArray(numOfDataPoints);
  let alarmData = [];

  dates.forEach((date) => {
    let randomAlarms =
      Math.floor(Math.random() * (maxAlarms - minAlarms + 1)) + minAlarms;
    alarmData.push({
      date: date,
      alarms: randomAlarms,
    });
  });
  return alarmData.sort((a, b) => b.date - a.date);
}

function getpieChartData() {
  let running = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
  let standBy = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
  let cautionState = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  let error = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  return {
    running: running,
    standBy: standBy,
    cautionState: cautionState,
    error: error,
  };
}

//---------------------------------------

ReactDOM.render(<App />, document.getElementById("root"));