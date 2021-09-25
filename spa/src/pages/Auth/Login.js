import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/images/tourism/backpack.svg';
import { bindActionCreators } from 'redux';
import { Creators } from '../../redux/auth/duck';
import AlertMultipleErrors from '../../components/AlertMultipleErrors';

const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Por favor, informe seu usuário'),
      password: Yup.string().required('Por favor, informe sua senha'),
    }),
    onSubmit: (values) => {
      props.login(values.email, values.password, props.history);
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
                  <img src={logo} alt="Logo" className="logo logo-dark" />
                </Link>

                <h4>Entrar</h4>
                <p className="text-muted mb-4">
                  Faça login para continuar no BuddyJourney.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <div className="p-3">
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">Usuário</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon3"
                          >
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Informe seu email"
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
                      </div>

                      <FormGroup className="mb-4">
                        <div className="float-end">
                          <Link
                            to="forgot-password"
                            className="text-muted font-size-13"
                          >
                            Esqueceu sua senha?
                          </Link>
                        </div>
                        <Label className="form-label">Senha</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Informe sua senha"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            invalid={
                              formik.touched.password && formik.errors.password
                                ? true
                                : false
                            }
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <FormFeedback type="invalid">
                              {formik.errors.password}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </FormGroup>

                      {props.errors && props.errors.login && (
                        <AlertMultipleErrors
                          color="danger"
                          errors={props.errors.login}
                        />
                      )}

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light"
                          type="submit"
                        >
                          Entrar
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Não tem uma conta ?
                  <Link
                    to="register"
                    className="font-weight-medium text-primary"
                  >
                    {' '}
                    Registre-se agora
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
  const { user, loading, errors } = state.Auth;
  return { user, loading, errors };
};

const { login } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
