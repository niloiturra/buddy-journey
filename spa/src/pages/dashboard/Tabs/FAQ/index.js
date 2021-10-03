import React from 'react';
import faqLogo from '../../../../assets/images/faq.svg';

const FAQ = () => {
  return (
    <div
      className="d-flex flex-column max-height-vh"
      style={{ justifyContent: 'center', textAlign: 'center' }}
    >
      <div className="align-self-center">
        <img
          src={faqLogo}
          className="filter-color"
          width="100"
          alt="buddy journey logo"
        />
      </div>

      <div className="p-4 align-self-center">
        <p className="text-muted mb-4">
          Para quaisquer dúvidas ou denúncias, por favor, envie um e-mail para:
        </p>

        <a href="mailto:buddy_journey_@outlook.com">
          buddy_journey_@outlook.com
        </a>
      </div>
    </div>
  );
};

export default FAQ;
