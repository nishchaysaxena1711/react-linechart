import React, { Component } from 'react';
import LineChart from "../components/LineChart";
import StairChart from "../components/StairChart";
import ScatterPlot from "../components/ScatterPlot";

import update from 'react/lib/update';
import d3 from "d3";
import { parseFlatArray, parseGroupingBy, parseStairChart } from "../businessLogic/parsers";

// Points
import { yearlyData, monthlyData } from "../../example/constants/points";
import { gsmData } from "../../example/constants/gsm";

export default class App extends Component {

	constructor(props) {
		super(props);

		const gsmFlat = parseFlatArray(gsmData, "Year", ["Glob", "NHem", "SHem"]);		
		this.state = { gsmFlat, monthlyData };
	}

	handleClick() {
		const newMonthly = update(monthlyData, { [0]: { points: { $push: [{ "x": "2016-01-31", "y": 277 }] } } });
		this.setState({ monthlyData: newMonthly });
	}

	onTextClick(name) {
		console.log(`You clicked on ${name}!`);
	}

	onTextHover(name) {
		return `<b>Name: </b>${name}`;
	}

	onPointHover(point) {
		const formatted = d3.time.format("%b %d")(d3.time.format("%Y-%m-%d").parse(point.x));
		return `<b>Date: </b>${formatted}<br /><b>Value: </b>${point.y}`;
	}

	render() {
		const { gsmFlat, monthlyData } = this.state;

		const data = [
			{ id: 1, value: 3, date: "2016-01-01" },
			{ id: 1, value: 4, date: "2016-01-03" },
			{ id: 2, value: 10, date: "2016-01-02" },
			{ id: 1, value: 6, date: "2016-01-04" },
			{ id: 2, value: 13, date: "2016-01-06" },
			{ id: 1, value: 5, date: "2016-01-08" },
			{ id: 2, value: 10, date: "2016-03-20" }
		];

		const grouped = parseGroupingBy(data, "date", "value", "id");
		console.log(grouped);

		const stair = [
			{ startDate: "2016-01-01", endDate: "2016-01-04", cd_os: "2016.001" },
			{ startDate: "2016-01-02", endDate: "2016-01-03", cd_os: "2016.002" },
			{ startDate: "2016-01-03", endDate: "2016-01-06", cd_os: "2016.003" },
			{ startDate: "2016-01-05", endDate: "2016-01-10", cd_os: "2016.004" },
			{ startDate: "2016-01-08", endDate: "2016-01-13", cd_os: "2016.005" },
			{ startDate: "2016-01-09", endDate: "2016-01-20", cd_os: "2016.006" }
		];
		const staired = parseStairChart(stair, "startDate", "endDate", "cd_os");
		console.log(staired);

		return (
			<div>
				<center>
					<h1>React LineChart</h1>
					<button type="button" onClick={this.handleClick.bind(this)}>Add Value</button>
				</center>
				<LineChart
					id="numberChart"
					width="600px"
					height="400"
					margins={{right: 100}}										
					//yMin={-100}					
					//yMax={30}
					xMin="2015-12-20"
					xMax="2016-05-01"
					ticks={5}
					drawLines
					showPoints
					pointClass="custom-point"
					labelClass="label-custom"
					onPointHover={this.onPointHover}
					//pointRadius="2"					
					showLegends					
					interpolate="linear"
					legendPosition="top-right"					
					isDate
					data={grouped} />				
				<ScatterPlot 
					width={600} 
					height={400}
					pointRadius={3} 					
					showLegends
					legendPosition="top-left" 
					data={gsmFlat} />
				<StairChart
					id="stairChart"
					width="600"
					height="300px"					
					xLabel="OS x Data"					
					//onTextClick={this.onTextClick}
					onTextHover={this.onTextHover}
					//showPoints					
					//showLegends
					legendPosition="bottom-right"
					//xDisplay={d3.time.format("%d %b")}					
					isDate					
					data={staired} />
			</div>
		);
	}
}