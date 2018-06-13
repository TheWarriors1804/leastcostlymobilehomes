/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import store from '../../store'
import HomeSearchCard from './home-search-card'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('HomeSearchCard', () => {
  let homeSearchCard

  beforeEach(() => {
    homeSearchCard = shallow(<HomeSearchCard store={store} />)
  })

  it('returns the home search card component', () => {
    expect(homeSearchCard.exists()).to.be.equal(true)
  })
})
