package com.utoob.videostreaming.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Video")
public class Video {
    @Id
    private String id;

    private byte[] thumbnail;

    private String videoName;

    private String title;

    public Video(String title, String videoName, byte[] thumbnail){
        this.title=title;
        this.thumbnail=thumbnail;
        this.videoName=videoName;
    }


    public String getVideoName(){
        return this.videoName;
    }

    public String getTitle(){
        return this.title;
    }

    public byte[] getThumbnail(){
        return this.thumbnail;
    }

    public String getId(){
        return this.id;
    }


}
