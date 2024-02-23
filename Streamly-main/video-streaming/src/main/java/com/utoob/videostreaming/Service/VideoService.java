package com.utoob.videostreaming.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utoob.videostreaming.Domain.Video;
import com.utoob.videostreaming.Repository.VideoRepo;

@Service
public class VideoService {
    @Autowired
    VideoRepo videoRepo;

    public void saveVideo(Video video){
        videoRepo.save(video);
    }

    public List<Video> getAllVideos(){
        return videoRepo.findAll();
    }
}
