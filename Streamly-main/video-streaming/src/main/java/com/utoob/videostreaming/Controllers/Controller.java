package com.utoob.videostreaming.Controllers;

import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.utoob.videostreaming.Domain.Video;
import com.utoob.videostreaming.Service.VideoService;


@RestController
@RequestMapping("streamly")
public class Controller {
    @Autowired
    private AmazonS3 amazonS3Client;

    @Autowired
    private VideoService videoService;

    @Value("${aws.bucket}")
    private String bucket;

    @PostMapping("/upload")
    public String postVideo(@RequestPart("title") String title,
                                @RequestPart("videoName") String videoName,
                                @RequestPart("thumbnail") MultipartFile thumbnail ) throws IOException {

        Video video = new Video(title,videoName,thumbnail.getBytes());
        videoService.saveVideo(video); 

        System.out.println(bucket+"______________________________");

        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 15; 

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucket, videoName)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(new Date(expTimeMillis));


        URL url = amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);

        return url.toString();

    }

    @GetMapping()
    public List<Video> getAllVideos(){
        List<Video> videos = videoService.getAllVideos();
        return videos;
    }

    
}
