package com.utoob.videostreaming.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;


@Configuration
@Lazy
public class AwsConfig {
    
    @Value("${aws.region}")
    private String region;

    @Value("${aws.accessKey}")
    private String accessKey="";

    private String secretKey="k44JPD+LRtlKZcE8aZz1QDwRyJdOHbjxgPcNnr1N";

    AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey,secretKey);

    @Bean
    AmazonS3 amazonS3(){
        return AmazonS3ClientBuilder
                    .standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(region)
                    .build();
    }


    
}


