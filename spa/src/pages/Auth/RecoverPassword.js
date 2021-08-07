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
  InputGroup,
  Label,
  Alert,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import logodark from '../../assets/images/logo-dark.png';
import logolight from '../../assets/images/logo-light.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../redux/auth/duck';

function RecoverPassword(props) {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      email: props.match.params.email,
      code: props.match.params.code,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(100, 'A senha deve ter no máximo 100 caracteres')
        .required('Por favor, informe uma senha'),
      confirmPassword: Yup.string()
        .required('Por favor, informe a confirmação de senha')
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
      props.recoverPassword(values);
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

                <h4>Recuperar senha</h4>
                <p className="text-muted mb-4">
                  Insira uma nova senha para o seu usuário
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  <div className="p-3">
                    {props.passwordRecoverStatus && (
                      <Alert variant="success" className="text-center mb-4">
                        {props.passwordRecoverStatus}
                      </Alert>
                    )}
                    <Form onSubmit={formik.handleSubmit}>
                      <FormGroup className="mb-4">
                        <div className="mb-3">
                          <Label className="form-label">Senha</Label>
                          <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                            <span className="input-group-text border-light text-muted">
                              <i className="ri-lock-2-line"></i>
                            </span>
                            <Input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control form-control-lg bg-soft-light"
                              placeholder="Informe a nova senha"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              invalid={
                                formik.touched.password &&
                                formik.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <FormFeedback type="invalid">
                                {formik.errors.password}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </div>

                        <div className="mb-3">
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
                              className="form-control form-control-lg bg-soft-light"
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
                        </div>
                      </FormGroup>

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light"
                          type="submit"
                        >
                          Alterar senha
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-3 text-center">
                <p>
                  Ou{' '}
                  <Link to="login" className="font-weight-medium text-primary">
                    Volte para o login
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
}

const mapStateToProps = (state) => {
  const { passwordRecoverStatus } = state.Auth;
  return { passwordRecoverStatus };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecoverPassword)
);
