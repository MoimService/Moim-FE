import '@testing-library/jest-dom';

jest.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('fetchPriority')) {
    return;
  }
});
