import React, { useState } from 'react';
import { Card, Button } from 'reactstrap';
import CustomCollapse from '../../../components/CustomCollapse';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';

function Profile(props) {
  const [isOpen1, setIsOpen1] = useState(true);

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };

  return (
    <>
      <div>
        <div className="px-4 pt-4">
          <h4 className="mb-0">Meu perfil</h4>
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

          <h5 className="font-size-16 mb-1 text-truncate">Fulano</h5>
        </div>

        <div className="p-4 user-profile-desc">
          <div id="profile-user-accordion-1" className="custom-accordion">
            <Card className="shadow-none border mb-2">
              <CustomCollapse
                title="Informações"
                iconClass="ri-user-2-line"
                isOpen
                hideToggleOption
                toggleCollapse={toggleCollapse1}
              >
                <div>
                  <p className="text-muted mb-1">Nome</p>
                  <h5 className="font-size-14">Fulano</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">E-mail</p>
                  <h5 className="font-size-14">adc@123.com</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Aniversário</p>
                  <h5 className="font-size-14">01/01/0001</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Localização</p>
                  <h5 className="font-size-14 mb-0">São Paulo, SP</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Biografia</p>
                  <h5 className="font-size-14 mb-0 text-muted">
                    <i>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec vel laoreet dui. Nullam non dolor et libero
                      imperdiet scelerisque quis id sem. Vestibulum vel massa eu
                      felis tempor aliquet at in diam. Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices posuere cubilia
                      curae; Proin eget neque a lectus maximus aliquet a ut leo.
                      Nam vestibulum accumsan efficitur. Curabitur convallis
                      lacus nec urna faucibus malesuada.
                    </i>
                  </h5>
                </div>
              </CustomCollapse>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
