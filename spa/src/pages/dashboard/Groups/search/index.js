import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../../redux/groups/duck';
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

function GroupsSearch({ searchedGroups, searchGroup }) {
  const [searchTerm, setSearchTerm] = useState('');

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
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Informe um destino para a busca..."
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="primary"
                    className=" waves-effect waves-light"
                    onClick={() => searchGroup(searchTerm)}
                  >
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

const { searchGroup } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ searchGroup }, dispatch);

export default connect(null, mapDispatchToProps)(GroupsSearch);
