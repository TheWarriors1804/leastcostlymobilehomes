/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar'
export {default as HomePage} from './homepage'
export {default as Login} from './login-form'
export {default as Signup} from './signup-form'
export {default as CheckOut} from './checkOut'

// User components

export {default as UserHome} from './user/user-home'
export {default as UserInfo} from './user/user-info'
export {default as UserEdit} from './user/user-edit'
export {default as UserOrder} from './user/user-order'
export {default as HomeUserInfo} from './user/user-order-info'

// Single home components

export {default as SingleHome} from './singleHome/single-home'
export {default as HomeInfo} from './singleHome/home-info'
export {default as HomeTitle} from './singleHome/home-title'
export {default as HomeContent} from './singleHome/home-content'

// Home search components

export {default as HomeSearch} from './filterHomes/home-search'
export {default as HomeSearchCard} from './filterHomes/home-search-card'
