import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Form,
  Label,
  InputGroup,
  Input,
  FormFeedback,
} from 'reactstrap';
import CustomCollapse from '../../../../components/CustomCollapse';
import airplane_tourism from '../../../../assets/images/users/airplane_tourism.svg';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../../redux/profile/duck';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import './profile-style.css';
import {
  parseToShortDate,
  parseToLocaleDateString,
  toBase64,
} from '../../../../helpers/utils';
import {
  isExtensionValid,
  isSizeValid,
} from '../../../../helpers/imageValidators';
import sideBarMenus from '../../../../layouts/AuthLayout/sideBarMenus';

function Profile({
  fetchProfile,
  updateProfileImage,
  setEditing,
  profile,
  activeTab,
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  touched,
}) {
  useEffect(() => {
    if (activeTab === sideBarMenus.PROFILE) {
      fetchProfile();
    }
  }, [fetchProfile, activeTab]);

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
    const uriImage = profile.picture;

    updateProfileImage(name, base64, uriImage);
  };

  return (
    <>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-0">Meu perfil</h4>
        </div>

        <div className="text-center border-bottom p-4">
          <div
            className="mb-4 circular--portrait"
            style={{
              backgroundImage: `url("${profile.picture || airplane_tourism}")`,
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
          <h5 className="font-size-16 mb-1 text-truncate">{profile.name}</h5>
        </div>

        <div className="p-4 user-profile-desc">
          <div id="profile-user-accordion-1" className="custom-accordion">
            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Informações"
                iconClass="ri-user-2-line"
                isOpen
                hideToggleOption
                toggleCollapse={false}
                customIconToggle={
                  <i
                    onClick={() => setEditing()}
                    hidden={profile.editing}
                    className="mdi mdi-content-save-edit float-end accor-plus-icon"
                  ></i>
                }
              >
                {!profile.editing && (
                  <div>
                    <div>
                      <p className="text-muted mb-1">Nome</p>
                      <h5 className="font-size-14">{profile.name}</h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">E-mail</p>
                      <h5 className="font-size-14">{profile.email}</h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Aniversário</p>
                      <h5 className="font-size-14">
                        {parseToLocaleDateString(profile.birthDay)}
                      </h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Localização</p>
                      <h5 className="font-size-14 mb-0">{profile.location}</h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Melhor Viagem</p>
                      <h5 className="font-size-14 mb-0">{profile.bestTrip}</h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Biografia</p>
                      <h5 className="font-size-14 mb-0 text-muted">
                        <i>{profile.biography}</i>
                      </h5>
                    </div>
                  </div>
                )}

                {profile.editing && (
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <Label className="form-label">Nome Completo</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Informe seu nome completo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          invalid={touched.name && errors.name ? true : false}
                        />
                        {touched.name && errors.name ? (
                          <FormFeedback type="invalid">
                            {errors.name}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Aniversário</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="date"
                          id="birthDay"
                          name="birthDay"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Insira a data do seu aniversário"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.birthDay}
                          invalid={
                            touched.birthDay && errors.birthDay ? true : false
                          }
                        />
                        {touched.birthDay && errors.birthDay ? (
                          <FormFeedback type="invalid">
                            {errors.birthDay}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Localização</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="text"
                          id="location"
                          name="location"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Insira sua localização atual"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.location}
                          invalid={
                            touched.location && errors.location ? true : false
                          }
                        />
                        {touched.location && errors.location ? (
                          <FormFeedback type="invalid">
                            {errors.location}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Melhor Viagem</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="textarea"
                          id="bestTrip"
                          name="bestTrip"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Insira aqui sua melhor viagem"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bestTrip}
                          invalid={
                            touched.bestTrip && errors.bestTrip ? true : false
                          }
                        />
                        {touched.bestTrip && errors.bestTrip ? (
                          <FormFeedback type="invalid">
                            {errors.bestTrip}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Biografia</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="textarea"
                          id="biography"
                          name="biography"
                          className="form-control form-control-lg bg-soft-light border-light"
                          placeholder="Insira uma breve biografia sobre você"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.biography}
                          invalid={
                            touched.biography && errors.biography ? true : false
                          }
                        />
                        {touched.biography && errors.biography ? (
                          <FormFeedback type="invalid">
                            {errors.biography}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="d-grid">
                      <Button
                        color="primary"
                        block
                        className=" waves-effect waves-light"
                        type="submit"
                      >
                        Salvar
                      </Button>
                    </div>
                  </Form>
                )}
              </CustomCollapse>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

const formikEnhancer = withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object({
    name: Yup.string()
      .max(200, 'O nome deve ter no máximo 200 caracteres')
      .required('Por favor, informe seu nome'),
    birthDay: Yup.string().test('underAgeValidate', function (value) {
      const { path, createError } = this;

      if (!value) {
        return createError({
          path,
          message: 'Por favor, informe a sua idade',
        });
      }

      const optimizedBirthday = value.replace(/-/g, '/');
      const birthDay = new Date(optimizedBirthday);

      const currentDate = new Date();

      const age = ~~((Date.now(currentDate) - birthDay) / 31557600000);

      if (age < 18) {
        return createError({
          path,
          message: 'A idade não pode ser inferior a 18 anos',
        });
      } else {
        return true;
      }
    }),
    location: Yup.string().max(
      200,
      'A localização deve ter no máximo 200 caracteres'
    ),
    bestTrip: Yup.string().max(
      200,
      'Sua melhor viagem deve ter no máximo 200 caracteres'
    ),
    biography: Yup.string().max(
      500,
      'Sua biografia deve ter no máximo 500 caracteres'
    ),
  }),
  mapPropsToValues: ({ profile }) => {
    return {
      name: profile.name,
      picture: profile.picture,
      birthDay: parseToShortDate(profile.birthDay),
      location: profile.location,
      biography: profile.biography,
      bestTrip: profile.bestTrip,
      editing: profile.editing,
      loading: profile.loading,
      errors: profile.errors,
    };
  },
  handleSubmit: (values, { props }) => {
    props.updateProfile(values);
  },
})(Profile);

const mapStateToProps = (state) => {
  const {
    Profile,
    Layout: { activeTab },
  } = state;

  return {
    profile: {
      name: Profile.name,
      email: Profile.user.email || '',
      picture: Profile.picture,
      birthDay: Profile.birthDay,
      location: Profile.location,
      biography: Profile.biography,
      bestTrip: Profile.bestTrip,
      editing: Profile.editing,
      loading: Profile.loading,
      errors: Profile.errors,
    },
    activeTab: activeTab,
  };
};

const { fetchProfile, setEditing, updateProfile, updateProfileImage } =
  Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchProfile, setEditing, updateProfile, updateProfileImage },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(formikEnhancer);
