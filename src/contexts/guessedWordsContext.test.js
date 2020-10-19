import React from 'react';
import { shallow, mount } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
};

it('useGuessedWords throws error when not wrapped in GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});

it('useGuessedWords does not throw error when wrapped in GuessedWordsProvider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow();
});
