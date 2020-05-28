import React from "react";
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";

type Props = {}
type State = {
    open: boolean,
    dateRange: DateRange
}

class Duration extends React.Component<Props, State> {
	state = {
		open: true,
		dateRange: {}
	};

	render() {
		return (
			<DateRangePicker
				open={this.state.open}
				onChange={range => this.setState({ dateRange: range })}
			/>
		);
	}
}

export default Duration;