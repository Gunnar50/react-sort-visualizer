interface BarProps {
	barValue: number;
	active: boolean;
	sorted: boolean;
	swapping: boolean;
}

function Bar({ barValue, active, sorted, swapping }: BarProps) {
	let barStyles = `w-3 transition-all duration-500 ease-in-out transform `;
	let barBackground = "bg-blue-500";
	let boxShadow = "shadow-md"; // Regular shadow for 3D effect
	let transform = ""; // Regular transform

	if (sorted || swapping) {
		if (swapping) {
			transform = "scale-x-110"; // Reset transform for sorted bars
		} else {
			transform = "scale-x-100"; // Reset transform for sorted bars
		}
		barBackground = "bg-green-500";
		boxShadow = "shadow"; // Subtle shadow for sorted bars
	} else if (active) {
		barBackground = "bg-red-500";
		boxShadow = "shadow-lg"; // Larger shadow for active bars
		transform = "scale-x-110"; // Slightly scale up active bars
	}

	barStyles += `${barBackground} ${boxShadow} ${transform}`;

	return <div style={{ height: barValue + "px" }} className={barStyles}></div>;
}

export default Bar;
