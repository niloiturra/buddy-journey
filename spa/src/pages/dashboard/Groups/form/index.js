import React, { useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../../redux/groups/duck';
import * as Yup from 'yup';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
  Fade,
} from 'reactstrap';
import { toBase64 } from '../../../../helpers/utils';
import {
  isExtensionValid,
  isSizeValid,
} from '../../../../helpers/imageValidators';
import airplane_tourism from '../../../../assets/images/users/airplane_tourism.svg';
import '../style.css';

function GroupsForm({ createGroup, menuGroup }) {
  const [pictureName, setPictureName] = useState(null);
  const [pictureBase64, setPictureBase64] = useState(null);
  const [picture, setPicture] = useState(null);

  const clickInputImageFile = () => {
    document.getElementById('upload-file').click();
  };

  const handleImageInput = async (event) => {
    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (!isExtensionValid(image)) {
      alert(
        'Por favor, insira uma extensão de arquivo válida! Arquivos suportados: jpeg, jpg e png'
      );

      return;
    }

    if (!isSizeValid(image)) {
      alert('Por favor, insira um arquivo menor que 10mb');
      return;
    }

    const name = image.name;
    const base64 = await toBase64(image);

    setPictureName(name);
    setPictureBase64(base64);
    setPicture(base64);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      destination: '',
      travelDate: '',
      numberMaxOfMembers: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(200, 'O nome do grupo deve ter no máximo 200 caracteres')
        .required('Por favor, informe o nome do grupo'),
      description: Yup.string()
        .min(10, 'A descrição deve ter no mínimo 10 caracteres')
        .max(500, 'A descrição deve ter no máximo 100 caracteres')
        .required('Por favor, informe uma descrição para o grupo'),
      destination: Yup.string()
        .max(200, 'O destino deve ter no máximo 200 caracteres')
        .required('Por favor, informe o destino do grupo'),
      travelDate: Yup.date().required('Por favor, informe uma data de viagem'),
      numberMaxOfMembers: Yup.number().required(
        'Por favor, informe o número máximo de membros para o grupo'
      ),
    }),
    onSubmit: (values) => {
      values.imageBase64 = pictureBase64;
      values.imageName = pictureName;

      createGroup(values);
    },
  });

  return (
    <>
      <div className="div-container-start">
        <Container>
          <Fade>
            <Row className="justify-content-center">
              <div className="mb-4 mt-4">
                <Col xs="12">
                  <h3 className="text-center">Criar um grupo</h3>
                  <i
                    class="ri-arrow-go-back-fill arrow-back"
                    onClick={() => menuGroup()}
                  ></i>
                </Col>
              </div>
              <Col md={8} lg={6} xl={6}>
                <Card>
                  <CardBody className="p-4">
                    <div className="p-3">
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                          <Label className="form-label">Nome do Grupo</Label>
                          <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <span
                              className="input-group-text text-muted"
                              id="basic-addon3"
                            >
                              <i className="ri-flight-takeoff-line"></i>
                            </span>
                            <Input
                              autoComplete="off"
                              type="text"
                              id="name"
                              name="name"
                              className="form-control form-control-lg border-light bg-soft-light"
                              placeholder="Informe um nome para seu grupo"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.name}
                              invalid={
                                formik.touched.name && formik.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <FormFeedback type="invalid">
                                {formik.errors.name}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Descrição</Label>
                          <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <span
                              className="input-group-text text-muted"
                              id="basic-addon3"
                            >
                              <i className="ri-file-list-line"></i>
                            </span>
                            <Input
                              autoComplete="off"
                              type="textarea"
                              id="description"
                              name="description"
                              className="form-control form-control-lg border-light bg-soft-light"
                              placeholder="Informe uma descrição"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.description}
                              invalid={
                                formik.touched.description &&
                                formik.errors.description
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.description &&
                            formik.errors.description ? (
                              <FormFeedback type="invalid">
                                {formik.errors.description}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Destino</Label>
                          <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <span
                              className="input-group-text text-muted"
                              id="basic-addon3"
                            >
                              <i className="ri-flight-takeoff-line"></i>
                            </span>
                            <Input
                              autoComplete="off"
                              type="text"
                              id="destination"
                              name="destination"
                              className="form-control form-control-lg border-light bg-soft-light"
                              placeholder="Informe o destino de viagem do grupo"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.destination}
                              invalid={
                                formik.touched.destination &&
                                formik.errors.destination
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.destination &&
                            formik.errors.destination ? (
                              <FormFeedback type="invalid">
                                {formik.errors.destination}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">
                            Data prevista da viagem
                          </Label>
                          <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <Input
                              type="date"
                              id="travelDate"
                              name="travelDate"
                              className="form-control form-control-lg border-light bg-soft-light"
                              placeholder="Informe a data prevista da viagem"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.travelDate}
                              invalid={
                                formik.touched.travelDate &&
                                formik.errors.travelDate
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.travelDate &&
                            formik.errors.travelDate ? (
                              <FormFeedback type="invalid">
                                {formik.errors.travelDate}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">
                            Quantidade máxima de membros
                          </Label>
                          <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <span
                              className="input-group-text text-muted"
                              id="basic-addon3"
                            >
                              <i className="ri-group-line"></i>
                            </span>
                            <Input
                              type="number"
                              id="numberMaxOfMembers"
                              name="numberMaxOfMembers"
                              className="form-control form-control-lg border-light bg-soft-light"
                              placeholder="Número máximo de membros"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.numberMaxOfMembers}
                              invalid={
                                formik.touched.numberMaxOfMembers &&
                                formik.errors.numberMaxOfMembers
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.numberMaxOfMembers &&
                            formik.errors.numberMaxOfMembers ? (
                              <FormFeedback type="invalid">
                                {formik.errors.numberMaxOfMembers}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>
                        <div className="text-center border-bottom p-4">
                          <div
                            className="mb-4 rectangle--portrait"
                            style={{
                              backgroundImage: `url("${
                                picture || airplane_tourism
                              }")`,
                            }}
                          >
                            <Button
                              type="button"
                              color="light"
                              className="avatar-xs p-0 rounded-circle icon-portrait"
                              onClick={clickInputImageFile}
                            >
                              <i className="ri-camera-2-fill"></i>
                            </Button>
                            <input
                              type="file"
                              accept="image/*"
                              id="upload-file"
                              onChange={handleImageInput}
                              hidden
                            />
                          </div>
                        </div>

                        <div className="d-grid">
                          <Button
                            color="primary"
                            block
                            className=" waves-effect waves-light"
                            type="submit"
                            disabled={!formik.isValid || !picture}
                          >
                            Finalizar
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Fade>
        </Container>
      </div>
    </>
  );
}

const { createGroup, menuGroup } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ createGroup, menuGroup }, dispatch);

export default connect(null, mapDispatchToProps)(GroupsForm);
