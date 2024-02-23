package com.utoob.videostreaming.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.utoob.videostreaming.Domain.Video;

public interface VideoRepo extends MongoRepository<Video, String>{
    
}
