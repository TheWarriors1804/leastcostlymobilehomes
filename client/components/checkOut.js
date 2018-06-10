import {Link} from 'react-dom'
import React from 'react'
import {HomeSearchCard} from './index'

const CheckOut = props => {
  return (
    <div>
      Hello
      {console.log('props', props)}
      {console.log('localStorage', localStorage)}
      {/* <div>CheckOut!!!</div>
      <hr />
      <div>
        <HomeSearchCard />
      </div> */}
    </div>
  )
}

export default CheckOut
