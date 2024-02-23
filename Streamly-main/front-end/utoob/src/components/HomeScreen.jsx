import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axios  from "axios";
import {Row,Col} from "react-bootstrap"
import { useParams } from "react-router-dom";


const HomeScreen = () => {
    const [videos,setVideos] = useState([]);

    const {keyword} = useParams();


    const filteredVideos = keyword
        ? videos.filter((video) =>
        video.title.toLowerCase().includes(String(keyword).toLowerCase())
        )
        : videos;

    useEffect(
        () => {
            axios.get("http://localhost:8000/streamly")
                .then(response =>{
                    setVideos(response.data);
                })
                .catch(error => console.error(error));  
        }
    
    ,[]);

    return(
        <>
        <Row>
        {filteredVideos.map(
            video => (
                <Col key={video.id} sm={12} md={6} lg={4}>
                    <VideoCard 
                        title={video.title} 
                        thumbnail={video.thumbnail}
                        to={`/streamly/${video.videoName}?title=${video.title}`}
                    />
                </Col>  
            )
        )
        }
        </Row>
        </>
    )
}


export default HomeScreen;