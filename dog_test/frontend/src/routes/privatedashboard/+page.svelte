<script>
	import { authStore } from '../../stores/authStore';
	
	let toggle = true;

	const apiUrl = 'https://dog.ceo/api/breeds/image/random';
	
	let email;
	authStore.subscribe((curr) => {
		console.log('CURR', curr);
		email = curr?.currentUser?.email;
	});

async function fetchDogImage() {
  try {
    // Using await to make the asynchronous fetch request
    const response = await fetch(apiUrl);

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Using await to parse the JSON response
    const data = await response.json();
	const dogImageElement = document.getElementById('dogImage');
	dogImageElement.src = data.message;
    // Handle the data received from the API
    console.log('Dog Image URL:', data.message);
    // You can now use the data as needed, for example, display the image on your webpage
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  }
}

// Call the async function
async function sendData() {
		try {
			// Prepare the data to be sent in the POST request
			const postData = {
				email: email,
				dogImageUrl: document.getElementById('dogImage').src,
			};

			// Make the POST request to http://localhost:8383/
			const response = await fetch('http://localhost:8383/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});

			// Check if the request was successful (status code 200)
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			console.log('Data sent successfully:', postData);
		} catch (error) {
			// Handle any errors that occurred during the POST request
			console.error('POST error:', error);
		}
	}

</script>

<div class="flex flex-col ">
	<div class="flex flex-row justify-center">
		<button class="btn btn-xl variant-filled mx-1">Nuevos</button>
		<button class="btn btn-xl variant-filled mx-1">Guardados</button>
	</div>
	<div class="flex items-center justify-center flex-col">
		<div class="card p-4 mt-6 h-1/3 w-1/3">
			<!--<img src="https://images.dog.ceo/breeds/terrier-russell/iguet5.jpg" alt="">-->
			<img id="dogImage" alt="Random Dog" class="fit">
		</div>
		<div class="flex flex-row mt-6">
			<div><button on:click={sendData} type="button" class="btn btn-xl variant-filled mx-2">Guardar</button></div>
			<div><button on:click={fetchDogImage} type="button" class="btn btn-xl variant-filled mx-2">Siguiente</button></div>
		</div>
	</div>
</div>