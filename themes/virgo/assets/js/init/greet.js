export default function greet () {
	let year = new Date().getFullYear();
	console.log(
		`---------------------
		\n\tHello puwei 😎, ${year} !\n
		---------------------`
	);
	document.querySelector('#info-date').innerHTML = year;
}