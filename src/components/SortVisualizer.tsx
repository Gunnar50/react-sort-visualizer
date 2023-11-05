import { useEffect, useState } from "react";
import { generateRandomInt } from "../utils/randomInt";
import { sleep } from "../utils/sleep";
import Bar from "./Bar";

const WIN_HEIGHT = window.innerHeight;
const ANIMATION_SPEED: number = 1000;
const arraySize: number = 20;
const MAX_SIZE: number = WIN_HEIGHT - 100;

function SortVisualizer() {
	const [sortArray, setSortArray] = useState<number[]>([]);

	const [activeIndices, setActiveIndices] = useState<number[]>([]);
	const [sortedIndex, setSortedIndex] = useState<number>(-1);
	const [isSwapping, setIsSwapping] = useState<number[]>([]);

	const resetSortArray = () => {
		const emptyArray: number[] = [];
		for (let i = 0; i < arraySize; i++) {
			emptyArray.push(generateRandomInt(10, MAX_SIZE));
		}
		setSortArray(emptyArray);
		setSortedIndex(-1);
		setActiveIndices([]);
	};

	useEffect(() => {
		resetSortArray();
	}, []);

	const bubbleSort = async () => {
		let n = sortArray.length;
		let swapped;
		let newArray = [...sortArray]; // Create a copy of the array to manipulate

		do {
			swapped = false;
			for (let i = 0; i < n - 1; i++) {
				setActiveIndices([i, i + 1]);
				await sleep(ANIMATION_SPEED); // Visual delay for the comparison

				if (newArray[i] > newArray[i + 1]) {
					setIsSwapping([i, i + 1]); // Highlight the bars being swapped
					await sleep(ANIMATION_SPEED); // Visual delay for the swap indication

					// Perform the swap
					let temp = newArray[i];
					newArray[i] = newArray[i + 1];
					newArray[i + 1] = temp;
					swapped = true;

					setSortArray([...newArray]); // Update the array in the state

					await sleep(ANIMATION_SPEED / 2); // Wait for the bar swap animation
					setIsSwapping([]); // Remove highlight from the bars AFTER animation delay
				}

				setActiveIndices([]);
			}
			n--; // The last element is now sorted
			setSortedIndex((sortedIndex) => sortedIndex + 1);
		} while (swapped);
		setSortedIndex(sortArray.length - 1); // All items are sorted
	};

	if (sortArray.length === 0) return "Loading...";

	return (
		<div className="h-screen flex flex-col justify-between">
			<div>
				<button
					className="bg-blue-600 px-4 py-2 rounded-md border hover:border-blue-500 "
					onClick={bubbleSort}
				>
					Start Sorting
				</button>
				<button onClick={resetSortArray}>Genera new array</button>
			</div>
			<div
				className={`flex gap-1 justify-center items-end`}
				style={{ height: MAX_SIZE + "px" }}
			>
				{sortArray.map((barValue, i) => {
					const isActive = activeIndices.includes(i);
					const isSorted = sortArray.length - 1 - i <= sortedIndex;
					const isCurrentlySwapping = isSwapping.includes(i);

					return (
						<Bar
							key={i}
							barValue={barValue}
							active={isActive}
							sorted={isSorted}
							swapping={isCurrentlySwapping}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default SortVisualizer;
