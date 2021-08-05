import React, { useState } from 'react';
import { Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import CustomCollapse from '../../../components/CustomCollapse';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';

function Settings(props) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen4, setIsOpen4] = useState(false);

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen4(false);
  };

  const toggleCollapse4 = () => {
    setIsOpen4(!isOpen4);
    setIsOpen1(false);
  };

  return (
    <>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-0">Configurações</h4>
        </div>

        <div className="text-center border-bottom p-4">
          <div className="mb-4 profile-user">
            <img
              src={avatar1}
              className="rounded-circle avatar-lg img-thumbnail"
              alt="chatvia"
            />
            <Button
              type="button"
              color="light"
              className="avatar-xs p-0 rounded-circle profile-photo-edit"
            >
              <i className="ri-pencil-fill"></i>
            </Button>
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">Patricia Smith</h5>
        </div>

        <SimpleBar
          style={{ maxHeight: '100%' }}
          className="p-4 user-profile-desc"
        >
          <div id="profile-setting-accordion" className="custom-accordion">
            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Informações de Perfil"
                isOpen={isOpen1}
                toggleCollapse={toggleCollapse1}
              >
                <div className="float-end">
                  <Button color="light" size="sm" type="button">
                    <i className="ri-edit-fill me-1 align-middle"></i> Editar
                  </Button>
                </div>

                <div>
                  <p className="text-muted mb-1">Nome</p>
                  <h5 className="font-size-14">Patricia Smith</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">E-mail</p>
                  <h5 className="font-size-14">adc@123.com</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Aniversário</p>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Localização</p>
                  <h5 className="font-size-14 mb-0">California, USA</h5>
                </div>
              </CustomCollapse>
            </Card>

            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Ajuda"
                isOpen={isOpen4}
                toggleCollapse={toggleCollapse4}
              >
                <div>
                  <div className="py-3">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        FAQs
                      </Link>
                    </h5>
                  </div>
                  <div className="py-3 border-top">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        Contatos
                      </Link>
                    </h5>
                  </div>
                  <div className="py-3 border-top">
                    <h5 className="font-size-13 mb-0">
                      <Link to="#" className="text-body d-block">
                        Termos e política de privacidade
                      </Link>
                    </h5>
                  </div>
                </div>
              </CustomCollapse>
            </Card>
          </div>
        </SimpleBar>
      </div>
    </>
  );
}

export default Settings;
