document.getElementById('scanButton').addEventListener('click', async () => {
    try {
        const devices = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['heart_rate'] // Adjust the service UUID as needed
        });

        const deviceList = document.getElementById('deviceList');
        deviceList.innerHTML = ''; // Clear previous entries

        devices.forEach(device => {
            if (device.name && device.name.toUpperCase().startsWith('ACR')) {
                const listItem = document.createElement('li');
                listItem.textContent = device.name;
                listItem.addEventListener('click', async () => {
                    try {
                        const server = await device.gatt.connect();
                        // Now you can interact with the device's services and characteristics
                        console.log('Connected to:', device.name);
                    } catch (error) {
                        console.error('Error connecting to device:', error);
                    }
                });
                deviceList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error scanning for devices:', error);
    }
});
