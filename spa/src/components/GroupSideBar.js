import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Form,
  Label,
  InputGroup,
  Input,
  FormFeedback,
  Badge,
} from 'reactstrap';
import { Creators as LayoutCreators } from '../redux/layout/duck';
import { Creators as GroupCreators } from '../redux/groups/duck';
import { bindActionCreators } from 'redux';
import SimpleBar from 'simplebar-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
  parseToShortDate,
  parseToLocaleDateString,
  toBase64,
} from '../helpers/utils';
import CustomCollapse from './CustomCollapse';
import { Creators } from '../redux/chatGroups/duck';
import { isExtensionValid, isSizeValid } from '../helpers/imageValidators';
import './style.css';

function GroupSideBar({
  groupSideBar,
  user,
  setEditing,
  deleteGroup,
  updateGroupImage,
  disassociateUser,
  closeGroupSideBar,
  groupSelected,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
}) {
  const [isOpenMembers, setIsOpenMembers] = useState(false);

  const isGroupAdministrator = () => {
    return (
      groupSelected &&
      groupSelected.administrator &&
      user.userToken.email === groupSelected.administrator.email
    );
  };

  const toggleCollapseMembers = () => {
    setIsOpenMembers(!isOpenMembers);
  };

  const clickInputImageFile = () => {
    document.getElementById('upload-file-group').click();
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
    const uriImage = groupSelected.picture;

    updateGroupImage(name, base64, uriImage, groupSelected.id);
  };

  return (
    <>
      <div
        style={{ display: groupSideBar === true ? 'block' : 'none' }}
        className="user-profile-sidebar"
      >
        <div className="px-3 px-lg-4 pt-3 pt-lg-4">
          <div className="user-chat-nav  text-end">
            <Button
              color="none"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                closeGroupSideBar();
              }}
              className="nav-btn"
              id="user-profile-hide"
            >
              <i className="ri-close-line"></i>
            </Button>
          </div>
        </div>

        <div className="text-center p-4 border-bottom">
          <div
            className="mb-4 circular--portrait"
            style={{
              backgroundImage: `url("${groupSelected.picture}")`,
            }}
          >
            {isGroupAdministrator() && (
              <div>
                <Button
                  type="button"
                  color="light"
                  className="avatar-xs p-0 rounded-circle icon-portrait"
                  onClick={() => {
                    clickInputImageFile();
                  }}
                >
                  <i className="ri-camera-2-fill"></i>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-file-group"
                  onChange={(e) => {
                    handleImageInput(e);
                  }}
                  hidden
                />
              </div>
            )}
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">
            {groupSelected.name}
          </h5>
        </div>

        <SimpleBar
          style={{ maxHeight: '100%' }}
          className="p-4 user-profile-desc"
        >
          <div id="profile-user-accordion" className="custom-accordion">
            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Sobre"
                iconClass="ri-user-2-line"
                isOpen
                hideToggleOption
                customIconToggle={
                  isGroupAdministrator() && (
                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        setEditing();
                      }}
                      className="mdi mdi-content-save-edit float-end accor-plus-icon"
                    ></i>
                  )
                }
              >
                {!groupSelected.editing ? (
                  <div>
                    <div>
                      <p className="text-muted mb-1">Nome</p>
                      <h5 className="font-size-14">{groupSelected.name}</h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Descrição</p>
                      <h5 className="font-size-14">
                        {groupSelected.description}
                      </h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Destino</p>
                      <h5 className="font-size-14">
                        {groupSelected.destination}
                      </h5>
                    </div>

                    <div className="mt-4">
                      <p className="text-muted mb-1">Data de viagem</p>
                      <h5 className="font-size-14">
                        {parseToLocaleDateString(groupSelected.travelDate)}
                      </h5>
                    </div>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <Label className="form-label">Nome do Grupo</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          autoComplete="off"
                          type="text"
                          id="name"
                          name="name"
                          className="form-control form-control-lg border-light bg-soft-light"
                          placeholder="Informe um nome para seu grupo"
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
                      <Label className="form-label">Descrição</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          autoComplete="off"
                          type="textarea"
                          id="description"
                          name="description"
                          className="form-control form-control-lg border-light bg-soft-light"
                          placeholder="Informe uma descrição"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          invalid={
                            touched.description && errors.description
                              ? true
                              : false
                          }
                        />
                        {touched.description && errors.description ? (
                          <FormFeedback type="invalid">
                            {errors.description}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Destino</Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          autoComplete="off"
                          type="text"
                          id="destination"
                          name="destination"
                          className="form-control form-control-lg border-light bg-soft-light"
                          placeholder="Informe o destino de viagem do grupo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.destination}
                          invalid={
                            touched.destination && errors.destination
                              ? true
                              : false
                          }
                        />
                        {touched.destination && errors.destination ? (
                          <FormFeedback type="invalid">
                            {errors.destination}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">
                        Data prevista da viagem
                      </Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="date"
                          id="travelDate"
                          name="travelDate"
                          className="form-control form-control-lg border-light bg-soft-light"
                          placeholder="Informe a data prevista da viagem"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.travelDate}
                          invalid={
                            touched.travelDate && errors.travelDate
                              ? true
                              : false
                          }
                        />
                        {touched.travelDate && errors.travelDate ? (
                          <FormFeedback type="invalid">
                            {errors.travelDate}
                          </FormFeedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">
                        Quantidade máxima de membros
                      </Label>
                      <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                        <Input
                          type="number"
                          id="numberMaxOfMembers"
                          name="numberMaxOfMembers"
                          className="form-control form-control-lg border-light bg-soft-light"
                          placeholder="Número máximo de membros"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.numberMaxOfMembers}
                          invalid={
                            touched.numberMaxOfMembers &&
                            errors.numberMaxOfMembers
                              ? true
                              : false
                          }
                        />
                        {touched.numberMaxOfMembers &&
                        errors.numberMaxOfMembers ? (
                          <FormFeedback type="invalid">
                            {errors.numberMaxOfMembers}
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

            <Card className="mb-1 shadow-none border">
              <CustomCollapse
                title="Integrantes"
                iconClass="ri-group-line"
                isOpen={isOpenMembers}
                toggleCollapse={toggleCollapseMembers}
              >
                <Card className="p-2 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="chat-avatar">
                      <img
                        src={
                          groupSelected && groupSelected.administrator
                            ? groupSelected.administrator.picture
                            : ''
                        }
                        className="rounded-circle chat-user-img avatar-xs me-3"
                        alt="chatvia"
                      />
                    </div>
                    <div>
                      <div className="text-left">
                        <h5 className="font-size-14 mb-1">
                          {groupSelected && groupSelected.administrator
                            ? groupSelected.administrator.name
                            : ''}
                          <Badge
                            color="danger"
                            className="badge-soft-danger float-end"
                            style={{ marginLeft: '6px' }}
                          >
                            Admin
                          </Badge>
                        </h5>
                      </div>
                    </div>
                  </div>
                </Card>

                {groupSelected &&
                  groupSelected.members &&
                  groupSelected.members.map((member, key) => (
                    <Card key={key} className="p-2 mb-2">
                      <div className="d-flex align-items-center">
                        <div className="chat-avatar">
                          <img
                            src={member.picture}
                            className="rounded-circle chat-user-img avatar-xs me-3"
                            alt="chatvia"
                          />
                        </div>
                        <div>
                          <div className="text-left">
                            <h5 className="font-size-14 mb-1">{member.name}</h5>
                          </div>
                        </div>
                        {isGroupAdministrator() && (
                          <i
                            className="ri-delete-bin-2-fill"
                            style={{ marginLeft: '6px', cursor: 'pointer' }}
                            onClick={(e) => {
                              e.preventDefault();
                              disassociateUser(
                                groupSelected.id,
                                member.userIdHash
                              );
                            }}
                          ></i>
                        )}
                      </div>
                    </Card>
                  ))}
              </CustomCollapse>
            </Card>

            {isGroupAdministrator() && (
              <div className="d-grid">
                <Button
                  color="danger"
                  block
                  className=" waves-effect waves-light"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteGroup(groupSelected.id);
                  }}
                >
                  Excluir Grupo
                </Button>
              </div>
            )}
          </div>
        </SimpleBar>
      </div>
    </>
  );
}

const formikEnhancer = withFormik({
  enableReinitialize: true,
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
  mapPropsToValues: ({ groupSelected }) => {
    return {
      name: groupSelected.name,
      description: groupSelected.description,
      travelDate: parseToShortDate(groupSelected.travelDate),
      destination: groupSelected.destination,
      numberMaxOfMembers: groupSelected.numberMaxOfMembers,
    };
  },
  handleSubmit: (values, { props }) => {
    const model = {
      description: values.description,
      destination: values.destination,
      name: values.name,
      numberMaxOfMembers: values.numberMaxOfMembers,
      travelDate: values.travelDate,
      id: props.groupSelected.id,
      administrator: props.groupSelected.administrator,
    };

    props.updateGroup(model);
  },
})(GroupSideBar);

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { groupSideBar } = state.Layout;
  const { groupSelected } = state.ChatGroups;
  return { groupSideBar, groupSelected, user };
};

const { closeGroupSideBar } = LayoutCreators;
const { setEditing, updateGroupImage, updateGroup } = Creators;
const { disassociateUser, deleteGroup } = GroupCreators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeGroupSideBar,
      setEditing,
      updateGroupImage,
      updateGroup,
      disassociateUser,
      deleteGroup,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(formikEnhancer);
