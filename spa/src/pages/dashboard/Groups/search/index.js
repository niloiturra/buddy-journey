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

const GroupsSearch = ({ searchGroup, menuGroup }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOnSearch(e);
    }
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchGroup(searchTerm);
  };

  return (
    <>
      <Container className="container-list">
        <Fade>
          <Row className="mt-4">
            <Col xs="12">
              <h4 className="text-center">Buscar um Grupo</h4>
              <i
                className="ri-arrow-go-back-fill arrow-back"
                onClick={() => menuGroup()}
              ></i>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={{ size: 8, offset: 2 }}>
              <InputGroup>
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Informe um destino para a busca..."
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="primary"
                    className=" waves-effect waves-light"
                    onClick={(e) => handleOnSearch(e)}
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
};

const { searchGroup, menuGroup } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ searchGroup, menuGroup }, dispatch);

export default connect(null, mapDispatchToProps)(GroupsSearch);
