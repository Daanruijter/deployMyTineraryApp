import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import Landing from './Landing';
import toJson from 'enzyme-to-json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("what is the unit under test?", () => {
  it("renders without crashing", () => {  
    //write your test here
  });
  it("Landing component should render without crashing", () => {
    //write your test here
  });
  it("Landing component snapshot with Enzyme", () => {  
    //write your test here
  });
});

it('Landing component should render without crashing', () => {
    shallow(<Landing />);
});

it("landing component snapshot with Enzyme", () => {
    const wrapper = shallow(<Landing />);
    expect(toJson(wrapper)).toMatchSnapshot();
});


