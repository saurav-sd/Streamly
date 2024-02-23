import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';


export default function VideoCard({title,thumbnail, to}) {

  const imageUrl = `data:image/jpeg;base64,${thumbnail}`;

  

  return (
    <Container className='mx-2 my-3' >
      <Link to={to} style={{textDecoration: 'none'}}>
        <Card style={{ width: '100%', height:'310px' }}>
          <Card.Img 
            variant="top" 
            
            src={imageUrl} 
            alt="Video Thumbnail"/>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Container>
    
  );
}
