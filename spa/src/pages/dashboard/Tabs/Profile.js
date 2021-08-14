import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'reactstrap';
import CustomCollapse from '../../../components/CustomCollapse';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import { bindActionCreators } from 'redux';
import { Creators } from '../../../redux/profile/duck';

function Profile({ fetchProfile, profile, activeTab }) {
  useEffect(() => {
    if (activeTab === 'profile') {
      fetchProfile();
    }
  }, [fetchProfile, activeTab]);

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
              >
                <div>
                  <p className="text-muted mb-1">Nome</p>
                  <h5 className="font-size-14">{profile.name}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">E-mail</p>
                  <h5 className="font-size-14">{profile.user.email}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Aniversário</p>
                  <h5 className="font-size-14">{profile.birthDay}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Localização</p>
                  <h5 className="font-size-14 mb-0">{profile.location}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Biografia</p>
                  <h5 className="font-size-14 mb-0 text-muted">
                    <i>{profile.biography}</i>
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

const mapStateToProps = (state) => {
  const {
    Profile,
    Layout: { activeTab },
  } = state;

  return {
    profile: {
      name: Profile.name,
      user: Profile.user,
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

const { fetchProfile } = Creators;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
