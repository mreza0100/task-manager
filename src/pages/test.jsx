import Calendar from "react-modern-calendar-datepicker";

import { useState } from "react";
import styled from "styled-components";

export default function Test() {
	const [selectedDays, setSelectedDays] = useState();

	return (
		<W>
			<Calendar
				value={selectedDays}
				onChange={setSelectedDays}
				calendarClassName="responsive-calendar"
				shouldHighlightWeekends
				locale="fa"
			/>
		</W>
	);
}
const W = styled.div(props => {
	return {};
});
