import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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
import AlertMultipleErrors from '../../components/AlertMultipleErrors';

const Register = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(200, 'O e-mail deve ter no máximo 200 caracteres')
        .email('Por favor, informe um email válido')
        .required('Por favor, informe um email'),
      name: Yup.string()
        .max(200, 'O nome deve ter no máximo 200 caracteres')
        .required('Por favor, informe seu nome'),
      password: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(100, 'A senha deve ter no máximo 100 caracteres')
        .required('Por favor, informe uma senha'),
      confirmPassword: Yup.string()
        .required('Por favor, informe a confirmação da senha')
        .test('comparePasswords', function (value) {
          const { path, createError } = this;
          const { password } = formik.values;

          if (password !== value) {
            return createError({ path, message: 'Senhas não coincidem' });
          }

          return true;
        }),
    }),
    onSubmit: (values) => {
      props.register(values);
    },
  });

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

                <h4>Registre-se</h4>
                <p className="text-muted mb-4">
                  Obtenha sua conta BuddyJourney agora.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  {props.user && (
                    <Alert variant="success">
                      Obrigado por se registrar conosco! Clique aqui e{' '}
                      <Link
                        to="/login"
                        className="font-weight-medium text-primary"
                      >
                        Acesse agora
                      </Link>
                    </Alert>
                  )}
                  <div className="p-3">
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">Nome Completo</Label>
                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-mail-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Informe seu nome completo"
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
                        <Label className="form-label">Email</Label>
                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                          <span className="input-group-text text-muted">
                            <i className="ri-mail-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Informe um email"
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

                      <div className="mb-3">
                        <Label className="form-label">Senha</Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span className="input-group-text border-light text-muted">
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Informe uma senha"
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
                      </div>

                      <FormGroup className="mb-4">
                        <Label className="form-label">
                          Confirmação de senha
                        </Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span className="input-group-text border-light text-muted">
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Informe a confirmação de senha"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            invalid={
                              formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                                ? true
                                : false
                            }
                          />
                          {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword ? (
                            <FormFeedback type="invalid">
                              {formik.errors.confirmPassword}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </FormGroup>

                      {props.errors && props.errors.register && (
                        <AlertMultipleErrors
                          color="danger"
                          errors={props.errors.register}
                        />
                      )}

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light"
                          type="submit"
                        >
                          Registrar
                        </Button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          Ao registrar-se, você concorda com os{' '}
                          <Link to="#" className="text-primary">
                            Termos de Uso
                          </Link>{' '}
                          do BuddyJourney
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Já tem uma conta ?{' '}
                  <Link to="/login" className="font-weight-medium text-primary">
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
  const { user, loading, errors } = state.Auth;
  return { user, loading, errors };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
