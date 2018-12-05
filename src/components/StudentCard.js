import React from 'react';
import "./style.css";
import image from '../images/student.png';
import { Card, Image } from 'semantic-ui-react';

const BookCard = (props) => (
  <Card onclick={props.clicked}>
    <Image src={image} />
    <Card.Content>
      <Card.Header>Students</Card.Header>
    </Card.Content>
  </Card>
)

export default BookCard;