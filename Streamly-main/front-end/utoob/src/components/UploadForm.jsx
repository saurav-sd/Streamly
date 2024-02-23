import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from 'axios';

const UploadForm = () => {
	const [selectedFile,setSelectedFile] = useState(null);
	const [title,setTitle] = useState("");
	const [thumbnail,setThumbnail] = useState(null);

	const fileInputRef = useRef(null);
	const navigate = useNavigate();

	const handleInput= (e) => {
		const value = e.target.value;
		setTitle(value);
	}

	const handleFileSelect = () => {
		if(fileInputRef){
			fileInputRef.current.click();
		}
		
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if(file){
			setSelectedFile(file);
		}
	}

	const handleUpload = async() =>{
		const date = new Date();
		const videoName = selectedFile.name.split(".")[0]+"-"+date.getTime()+".mp4";

		const formData = new FormData();
		formData.append("title", title);
		formData.append("videoName",videoName);
		formData.append("thumbnail",thumbnail);

		try{
			const response = await axios
				.post("http://localhost:8000/streamly/upload", 
						formData,
						{headers: {
							'Content-Type': 'multipart/form-data',
						},}
					);
			const preSignedUrl = response.data;
			
			if(preSignedUrl && selectedFile){
				uploadToS3(preSignedUrl,selectedFile);
			}
		}
		catch(error){
			console.log(error);
		}

	}

	const uploadToS3 = async (preSignedUrl,selectedFile) => {
		await axios
      		.put(preSignedUrl, selectedFile, {
        		headers: {
          		'Content-Type': selectedFile.type,
        	},
      	})
      	.then((response) => {
        	console.log('File uploaded successfully');
			navigate("/streamly");

      	})
      	.catch((error) => {
        	console.error('File upload failed:', error);
      	});
	}

	const handleThumbnail = (e) => {
		setThumbnail(e.target.files[0]);
	}


	return (
		<div className="d-flex justify-content-center py-5">
		<Form>
			<Form.Group className="my-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					required
					onChange = {handleInput} 
					type="text" placeholder="Enter a video title"
				></Form.Control>
			</Form.Group>

			<Form.Group className="my-3">
				<Form.Label>Select Thumbnail</Form.Label>
				<Form.Control
					required
					type="file"
					onChange={handleThumbnail}
				></Form.Control>
			</Form.Group>
			<Form.Group className="my-3">
				{selectedFile==null &&
				<Button variant="dark" onClick={handleFileSelect}>Select Video</Button>
				}
				{selectedFile && (
					<div>
						<p>Selected File: {selectedFile.name}</p>
						<Button onClick={handleUpload}>Submit</Button>
				  	</div>
				)
				}
				<input
					type="file"
        			ref={fileInputRef}
        			style={{ display: 'none' }}
        			onChange={handleFileChange}
      			/>		
			</Form.Group>
		</Form>
		</div>
	);

}

export default UploadForm;