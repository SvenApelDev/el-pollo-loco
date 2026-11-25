class IntervalHub {
	static allIntervals = [];
	/**
	 * Starts an interval and stores its id for later cleanup.
	 * @param {Function} func - function to run repeatedly
	 * @param {number} timer - interval in milliseconds
	 */
	static startInterval(func, timer) {
		const newInterval = setInterval(func, timer);
		IntervalHub.allIntervals.push(newInterval);
	}

	/**
	 * Stops all registered intervals and clears the list.
	 */
	static stopAllIntervals() {
		IntervalHub.allIntervals.forEach(clearInterval);
		IntervalHub.allIntervals = [];
	}
}
