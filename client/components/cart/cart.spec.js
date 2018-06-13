/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CardSection from './CardSection'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CardSection', () => {
  let cardSection
  const value = 1000

  beforeEach(() => {
    cardSection = shallow(<CardSection orderTotal={value} />)
  })

  it('returns the order total', () => {
    expect(cardSection.find('orderTotal')).to.have.length('0')
  })
})
