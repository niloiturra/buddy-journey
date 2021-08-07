import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Alert,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
} from 'reactstrap';

import logodark from '../../assets/images/logo-dark.png';
import logolight from '../../assets/images/logo-light.png';
import { bindActionCreators } from 'redux';
import { Creators } from '../../redux/auth/duck';

const ForgotPassword = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('O email é obrigatório'),
    }),
    onSubmit: (values) => {
      props.forgotPassword(values.email);
    },
  });

  if (localStorage.getItem('authUser')) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <Link to="/" className="auth-logo mb-5 d-block">
                  <img
                    src={logodark}
                    alt=""
                    height="30"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="30"
                    className="logo logo-light"
                  />
                </Link>

                <h4>Recuperar Senha</h4>
                <p className="text-muted mb-4">
                  Recuperar senha com BuddyJourney.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <div className="p-3">
                    {props.passwordResetStatus ? (
                      <Alert variant="success" className="text-center mb-4">
                        {props.passwordResetStatus}
                      </Alert>
                    ) : (
                      <Alert variant="success" className="text-center mb-4">
                        Informe seu email e siga as intruções que enviaremos
                        para você!
                      </Alert>
                    )}
                    <Form onSubmit={formik.handleSubmit}>
                      <FormGroup className="mb-4">
                        <Label className="form-label">Informe o Email</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span className="input-group-text border-light text-muted">
                            <i className="ri-mail-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            invalid={
                              formik.touched.email && formik.errors.email
                                ? true
                                : false
                            }
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <FormFeedback type="invalid">
                              {formik.errors.email}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </FormGroup>

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className="waves-effect waves-light"
                          type="submit"
                        >
                          Recuperar
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Lembrou a senha ?{' '}
                  <Link to="login" className="font-weight-medium text-primary">
                    {' '}
                    Entrar{' '}
                  </Link>{' '}
                </p>
                <p>
                  © 2021 BuddyJourney. Criado com{' '}
                  <i className="mdi mdi-heart text-danger"></i> por Nilo Alan
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { user, loading, passwordResetStatus } = state.Auth;
  return { user, loading, passwordResetStatus };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
