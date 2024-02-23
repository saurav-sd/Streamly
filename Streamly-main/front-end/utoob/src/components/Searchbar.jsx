import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Searchbar() {
  const [keyword,setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      if(keyword){
          navigate(`/streamly/search/${keyword}`)
      }
      else{
          navigate('/')
      }
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="auto">
          <Form.Control 
            onChange={e => setKeyword(e.target.value)}
            type="text" 
            placeholder="Search" 
            className=" mr-sm-2" />
        </Col>
        <Col xs="auto">
          <Button variant="dark" type="submit" >Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}
