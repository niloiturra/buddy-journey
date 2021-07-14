import React from 'react';
import Routes from './routes/';
import ReduxToastr from 'react-redux-toastr';

//Import Scss
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './assets/scss/themes.scss';

function App() {
  return (
    <>
      <Routes />
      <ReduxToastr
        newestOnTop={false}
        position="bottom-right"
        closeOnToastrClick
        preventDuplicates
      />
    </>
  );
}

export default App;
