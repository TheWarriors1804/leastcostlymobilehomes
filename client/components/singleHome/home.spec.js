/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {HomeContent} from './home-content'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('HomeContent', () => {
  let homeContent
  const description = {description: 'Cozy'}

  beforeEach(() => {
    homeContent = shallow(<HomeContent description={description} />)
  })

  xit('renders the name in an h3', () => {
    expect(homeContent.find('div').text()).to.be.equal('Cozy')
  })
})
