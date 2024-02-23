import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Searchbar } from './Searchbar';
import Button from 'react-bootstrap/Button';

export default function Header() {
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/streamly" style={{fontWeight:"bold",fontFamily:"tahoma"}}>Streamly</Navbar.Brand>
        <Searchbar />
        <Button variant="dark" href="/upload">Upload</Button>
      </Container>
    </Navbar>
  );
}
