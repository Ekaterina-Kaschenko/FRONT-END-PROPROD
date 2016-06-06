#Task: Upload files to the server with drag and drop.

###Requirements
1. Create interface elements: "Dropzone", "Uploaded files", progress bar and "Start/Pause" button according to ```wireframe.png```.
 
2. Provide visual feedback on Dropzone element when image files are dragged over dropzone, dragged outside or dropped.
 
3. When files (images only) from desktop are dropped on Dropzone:

    a. Remove all previews from dropzone that are left from previous upload (if any).
     
	b. Create small previews for each image dragged from desktop and insert them into Dropzone block with filename and size(in kB) info.
	 
	c. Send all files(one by one) in chunks via POST request to endpoint stored in global variable ```ENDPOINT_URL```

	d. Update progress bar after success response each chunk.

	e. Stop sending chunks when "Start/Pause" button is clicked while upload. Start upload from next chunk when it is licked while upload is paused.

	f. Prevent drop and feedback for another dragged files until upload isn't finished. Also prevent navigating from page when files are released above Dropzone element in this case
	
4. Use links from server response to append scaled down images to Uploaded files block.
    a. Click on image should show them in full size in new tab.

### Communication with the server
Use global variable ```ENDPOINT_URL``` to setup ```url``` parameter for ```XMLHttpRequest```

Send files one by one.

Files should be sent in chunks (Size of chunk is defined as global variable ```CHUNK_SIZE```).

Sent next chunk one by one (only after successful callback from previous request).
You can use ```expectedStart``` parameter from the response to get start position of next chunk in file.

**Request should contain next fields:**
 - ```name``` - ```String```. original file name
 - ```start``` - ```Integer```. Position of chunk in original file
 - ```lastChunk``` - ```Boolean``` - indicates if this is last chunk to the file. ```true``` - for last chunk in file and ```false``` otherwise.
 - ```chunk``` - ```Blob``` object that represents chunk of the file

**Server will return next responses:**
For all chunks but last it will return expected ```start``` value for next chunk

```json
{
    "expectedStart":1024
}
```

for last chunk it returns image url (use it for 4th requirement)

```json
{
    "fileUrl":"uploads/test`.jpeg"
}
```

###Server setup: 

1. Download and install Node.js from http://nodejs.org/
2. Open folder with ```package.json``` in console
3. Run ```npm install```
4. Run ```npm start```
5. Open http://localhost:3001/ in browser