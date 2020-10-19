import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext';

const setup = ({ language, secretWord }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';

  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

it('renders without error', () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

it('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
  const mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup({});
  });

  it('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  it('currentGuess is cleared when the submit button is clicked', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

describe('languagePicker', () => {
  it('correctly renders submit string in english', () => {
    const wrapper = setup({ language: 'en' });
    const button = findByTestAttr(wrapper, 'submit-button');
    expect(button.text()).toBe('Submit');
  });
  it('correctly renders submit string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const button = findByTestAttr(wrapper, 'submit-button');
    expect(button.text()).toBe('🚀');
  });
});
