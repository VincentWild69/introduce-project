import s from './Quote.module.css';
import { PropTypes } from 'prop-types';


const Quote = ({quote, ...props}) => {

  
  return (
    <div className={s.quoteContainer}>
      <blockquote>
        <p className={s.quoteText}>{quote.quoteText}</p>
        <cite>{quote.quoteAuthor}</cite>
      </blockquote>
    </div>
  );
}


Quote.propTypes = {
  quote: PropTypes.object
}

export default Quote;