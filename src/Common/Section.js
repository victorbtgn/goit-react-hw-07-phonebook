import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
  <>
    {title && <h2 className="feedback-title">{title}</h2>}

    <section className="section">{children}</section>
  </>
);

Section.defaultProps = {
  title: '',
};

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
