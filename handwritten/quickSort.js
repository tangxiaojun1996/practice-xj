function quickSort(arr) {
	if(arr.length <= 1) {
			return arr; 
	}

	let pivot = arr.splice(Math.floor((arr.length - 1)/2), 1);

	arr.forEach(item => {
		if(item < pivot) {
			left.push(item)
		} else {
			right.push(item)
		}	
	});

	return [...quickSort(left), pivot, ...quickSort(right)];
}
