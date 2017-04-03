var scanButton = document.getElementById("scanBTButton");
var scanResult = document.getElementById("scanResult");

scanButton.addEventListener("click", function() {
	navigator.bluetooth.requestDevice({
		acceptAllDevices: true,
		optionalServices: ['battery_service']
	}).then(device => {
		console.log(device.name);
		// Attempts to connect to remote GATT Server.
		return device.gatt.connect();
	}).then(server => {
		return server.getPrimaryService('battery_service');
	})
	.then(service => {
		return service.getCharacteristic('battery_level');
	})
	.then(characteristic => {
		return characteristic.readValue();
	})
	.then(value => {
		console.log('Battery percentage is ' + value.getUint8(0));
	}).catch(error => { 
		console.log(error); 
	});
});
