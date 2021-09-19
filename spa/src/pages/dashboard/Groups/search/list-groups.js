import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../../redux/groups/duck';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
  Fade,
} from 'reactstrap';
import imageTourism from '../../../../assets/images/tourism/machu_picchu_tourism.jpg';
import '../style.css';

function ListGroups({ searchedGroups, associateUser }) {
  return (
    <Container>
      <Fade>
        <Row>
          {searchedGroups && searchedGroups.length > 0 ? (
            searchedGroups.map((group, i) => {
              return (
                <Col xs="3" key={i}>
                  <Card className="card-shadow">
                    <CardImg
                      top
                      width="200px"
                      src={group.picture || imageTourism}
                      alt="Card image cap"
                      height="200px"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{group.name}</CardTitle>
                      <CardText>{group.description}</CardText>
                      {!group.userIncluded ? (
                        <Button
                          className="mt-4"
                          onClick={associateUser(group.id)}
                        >
                          Ingressar
                        </Button>
                      ) : (
                        <Button className="mt-4" disabled>
                          Já ingressou
                        </Button>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col xs="3">
              <Card className="card-shadow">
                <CardImg
                  top
                  width="100%"
                  src={imageTourism}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">PROCURE GRUPOS</CardTitle>
                  <CardText>
                    Conheça novas pessoas que vão para o mesmo destino que você!
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </Fade>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { searchedGroups } = state.Groups;
  return { searchedGroups };
};

const { associateUser } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ associateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListGroups);
