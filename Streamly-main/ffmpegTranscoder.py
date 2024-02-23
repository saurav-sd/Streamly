import os
import subprocess
import tempfile
import boto3
import mimetypes

# Initialize the S3 clients
s3 = boto3.client('s3')

# Destination S3 bucket
destination_bucket = 'destination_bucket'

def lambda_handler(event, context):

    source_bucket = event['Records'][0]['s3']['bucket']['name']
    source_key = event['Records'][0]['s3']['object']['key']

    output_key1 = os.path.splitext(source_key)[0] + '_1280x720.mp4'
    output_key2 = os.path.splitext(source_key)[0] + '_840x480.mp4'
    output_key3 = os.path.splitext(source_key)[0] + '_480x360.mp4'
    
    output_keys = [output_key1,output_key2,output_key3]
    
    resolutions = ['1280:720', '840:480', '480:360']

    with tempfile.TemporaryDirectory() as temp_dir:
        
        input_path = os.path.join(temp_dir, source_key)
        s3.download_file(source_bucket, source_key, input_path)
    
        for res, key in zip(resolutions, output_keys):
        
            output_path = os.path.join(temp_dir, key)
            ffmpeg_cmd = [
                "/opt/ffmpeglib/ffmpeg", 
                '-i', input_path,
                '-vf', 'scale='+res,
                '-c:a', 'copy',
                output_path
            ]
            subprocess.run(ffmpeg_cmd, check=True)
            
            content_type, _ = mimetypes.guess_type(output_path)
            if not content_type:
                content_type = 'video/mp4' 
    
    
            s3.upload_file(output_path, destination_bucket, key,ExtraArgs={'ContentType': content_type})
        

    return {
        'statusCode': 200,
        'body': 'Video resized and uploaded successfully.'
    }
