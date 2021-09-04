import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Fade,
  Input,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';
import ListGroups from './list-groups';
import '../style.css';

function GroupsSearch() {
  return (
    <>
      <Container className="container-list">
        <Fade>
          <Row className="mt-4">
            <Col xs="12">
              <h4 className="text-center">Buscar um Grupo</h4>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={{ size: 8, offset: 2 }}>
              <InputGroup>
                <Input placeholder="Informe um destino para a busca..." />
                <InputGroupAddon addonType="append">
                  <Button color="primary" className=" waves-effect waves-light">
                    <i className="ri-search-2-line"></i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Fade>
        <div className="p-8">
          <ListGroups></ListGroups>
        </div>
      </Container>
    </>
  );
}

export default GroupsSearch;
