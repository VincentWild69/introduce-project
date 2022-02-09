import s from './Quote.module.css';
import { PropTypes } from 'prop-types';
import React from 'react';


const Quote = ({quote}) => {
  
  return (
    <div className={s.quoteContainer}>
      <blockquote>
        <p className={s.quoteText}>{quote.body}</p>
        <cite>{quote.author}</cite>
      </blockquote>
    </div>
  );
}


Quote.propTypes = {
  quote: PropTypes.object
}

export default React.memo(Quote);
