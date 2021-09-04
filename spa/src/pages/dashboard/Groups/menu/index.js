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
import imageSearch from '../../../../assets/images/tourism/search.jpg';
import '../style.css';

function GroupsMenu({ setSearchMode, setCreateMode }) {
  return (
    <>
      <div className="div-container">
        <Container>
          <Row className="rowCustom">
            <Fade>
              <div className="mb-4 mt-4">
                <Col xs="12">
                  <h3 className="text-center">Grupos</h3>
                </Col>
              </div>
            </Fade>

            <Col xs="6" sm="4">
              <Fade timeout={350}>
                <Card className="card-shadow">
                  <CardImg
                    top
                    width="100%"
                    src={imageSearch}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle tag="h5">PROCURAR UM GRUPO</CardTitle>
                    <CardText>
                      Procure aqui um novo grupo para se unir a uma viagem com
                      novas pessoas!
                    </CardText>
                    <Button onClick={setSearchMode}>Buscar</Button>
                  </CardBody>
                </Card>
              </Fade>
            </Col>

            <Col xs="6" sm="4">
              <Fade timeout={650}>
                <Card className="card-shadow">
                  <CardImg
                    top
                    width="100%"
                    src={imageTourism}
                    alt="Imagem Ilustrativa de viagem - Machu Picchu"
                  />
                  <CardBody>
                    <CardTitle tag="h5">CRIAR UM NOVO GRUPO</CardTitle>
                    <CardText>
                      Ao selecionar essa opção, você se torna administrador de
                      um novo grupo de turismo para um local definido. Comece a
                      organizar sua viagem com novas pessoas!
                    </CardText>
                    <Button onClick={setCreateMode}>Começar</Button>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const { setSearchMode, setCreateMode } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setSearchMode, setCreateMode }, dispatch);

export default connect(null, mapDispatchToProps)(GroupsMenu);
