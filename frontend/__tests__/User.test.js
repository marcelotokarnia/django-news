import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import User from '../src/pages/User'

const mockStore = configureStore()
const dispatch = jest.fn()
const state = {
  Categories: {
    categories: [{ color: '#353535', name: 'POLITICS' }],
    isFetching: false,
  },
  User: {
    isFetching: false,
    isMutating: false,
    categories: [{ name: 'POLITICS' }],
    mutatePreferences: jest.fn(),
    username: 'marcelotokarnia',
  },
}

describe('User component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<User dispatch={dispatch} store={mockStore({ ...state })} />)
  })

  it('should render correctly', () => {
    expect(wrapper.dive().find('.font-display')).toMatchSnapshot()
  })

  it('should be a div element', () => {
    expect(wrapper.dive().find('.font-display').is('div')).toBe(true)
  })

  it('should not have class o-20 if not mutating', () => {
    expect(wrapper.dive().find('.user-category__radius').hasClass('o-20')).toBe(false)
  })

  it('should have class o-20 if mutating', () => {
    const wrapperMutating = shallow(<User dispatch={dispatch} store={mockStore({ ...state, User: { ...state.User, isMutating: true } })} />)
    expect(wrapperMutating.dive().find('.user-category__radius').hasClass('o-20')).toBe(true)
  })

  it('should render correctly when is mutating', () => {
    const wrapperMutating = shallow(<User dispatch={dispatch} store={mockStore({ ...state, isMutating: true })} />)
    expect(wrapperMutating.dive().find('.font-display')).toMatchSnapshot()
  })
})
