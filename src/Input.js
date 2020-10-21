import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

const Input = ({ secretWord }) => {
  const language = useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState('');

  if (success) {
    return null;
  }

  const onClick = e => {
    e.preventDefault();
    setCurrentGuess('');
  };

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={`${stringsModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}`}
          value={currentGuess}
          onChange={e => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={onClick}
          className="btn btn-primary mb-2"
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
