const {db, User, Order, Product, OrderItem} = require('./models/index')

const users = [
  {
    firstName: 'Dolores',
    lastName: 'Abernathy',
    imageUrl: 'dolores.jpg',
    email: 'dolores@westworld.com',
    phone: '555-389-2341',
    address: '3 Sweetwater',
    state: 'Utah',
    city: 'Westworld',
    zip: '06660',
    password: 'abernathy'
  },
  {
    firstName: 'Teddy',
    lastName: 'Flood',
    imageUrl: 'teddy.jpg',
    email: 'teddy@westworld.com',
    phone: '555-230-3691',
    address: '8 Sweetwater',
    address2: 'Apt 3',
    state: 'Utah',
    city: 'Westworld',
    zip: '06660',
    password: 'flood'
  },
  {
    firstName: 'Maeve',
    lastName: 'Millay',
    imageUrl: 'maeve.jpg',
    email: 'maeve@westworld.com',
    phone: '555-923-1283',
    address: '2 Sweetwater',
    address2: 'Ground floor',
    state: 'Utah',
    city: 'Westworld',
    zip: '06660',
    password: 'millay'
  },
  {
    firstName: 'Bernard',
    lastName: 'Lowe',
    imageUrl: 'bernard.jpg',
    email: 'bernard@westworld.com',
    phone: '555-023-1102',
    address: '9 Corporate',
    address2: 'Suite 4',
    state: 'Utah',
    city: 'Westworld',
    zip: '06660',
    password: 'lowe'
  }
]

const orders = [
  {
    userId: 1,
    complete: true,
    initiatedDate: '2018-06-03 12:40:23',
    purchaseDate: '2018-06-04 10:20:20'
  },
  {
    userId: 1,
    complete: true,
    initiatedDate: '2018-06-03 09:40:13',
    purchaseDate: '2018-06-04 08:20:20'
  },
  {
    userId: 3,
    complete: false,
    initiatedDate: '2018-06-02 10:40:23',
    purchaseDate: '2018-06-04 09:50:20'
  },
  {
    userId: 1,
    complete: false,
    initiatedDate: '2018-06-02 10:40:23',
    purchaseDate: '2018-06-04 09:50:20'
  },
  {
    userId: 4,
    complete: false,
    initiatedDate: '2018-06-01 10:40:23',
    purchaseDate: '2018-06-04 09:20:20'
  },
  {
    userId: 2,
    complete: false,
    initiatedDate: '2018-06-04 12:40:23',
    purchaseDate: '2018-06-04 10:20:20'
  }
]

const products = [
  {
    price: 70825.94,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/Manufactured-ABSOLUTE-VALUE-38SLT28764AH-20170309-1224356555225.jpg',
    location: 'Fayetteville, North Carolina',
    length: 89,
    type: 'Double Wide',
    description: `The CMH Ace 3/2 double wide mobile home is truly spacious, featuring a fancy kitchen, 3 large bedrooms and 2 bathrooms. Check it out on our lot today or contact us for more information!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2016,
    bedrooms: 3,
    bathrooms: 1,
    width: 24,
    manufacturer: 'Clayton Homes',
    model: 'SLT28443A'
  },
  {
    price: 86259.53,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/Manufactured-ABSOLUTE-VALUE-38SLT28764AH-20170309-1224356555225.jpg',
    location: 'Chesapeake, Virginia',
    length: 76,
    type: 'Double Wide',
    description: `The CMH Ace 3/2 double wide mobile home is truly spacious, featuring a fancy kitchen, 3 large bedrooms and 2 bathrooms. Check it out on our lot today or contact us for more information!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2018,
    bedrooms: 2,
    bathrooms: 2,
    width: 26,
    manufacturer: 'Clayton Homes',
    model: 'SLT26543B'
  },
  {
    price: 68515.05,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/Manufactured-ABSOLUTE-VALUE-38SLT28764AH-20170309-1224356555225.jpg',
    location: 'Hialeah, Florida',
    length: 84,
    type: 'Double Wide',
    description: `The CMH Ace 3/2 double wide mobile home is truly spacious, featuring a fancy kitchen, 3 large bedrooms and 2 bathrooms. Check it out on our lot today or contact us for more information!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2013,
    bedrooms: 3,
    bathrooms: 1,
    width: 22,
    manufacturer: 'TRU Mobile Homes',
    model: 'TRU45563A'
  },
  {
    price: 84159.03,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/6b9c984c-ffe2-4745-b685-2c07a86e1803.jpg',
    location: 'Lexington, Kentucky',
    length: 77,
    type: 'Single Wide',
    description: `This beautiful 2/1 (or optional 1/1) single wide mobile home not only has the space your family needs, but the modern style you are looking for as well. Check out this spacious floor plan. Call or contact us today for more information on this model!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2017,
    bedrooms: 2,
    bathrooms: 1,
    width: 17,
    manufacturer: 'Clayton Homes',
    model: 'XTM14462A'
  },
  {
    price: 51396.52,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/6b9c984c-ffe2-4745-b685-2c07a86e1803.jpg',
    location: 'Montgomery, Alabama',
    length: 80,
    type: 'Single Wide',
    description: `This beautiful 2/1 (or optional 1/1) single wide mobile home not only has the space your family needs, but the modern style you are looking for as well. Check out this spacious floor plan. Call or contact us today for more information on this model!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2014,
    bedrooms: 2,
    bathrooms: 1,
    width: 18,
    manufacturer: 'Clayton Homes',
    model: 'XTM18395E'
  },
  {
    price: 63755.49,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/6b9c984c-ffe2-4745-b685-2c07a86e1803.jpg',
    location: 'Baton Rouge, Louisiana',
    length: 76,
    type: 'Single Wide',
    description: `This beautiful 2/1 (or optional 1/1) single wide mobile home not only has the space your family needs, but the modern style you are looking for as well. Check out this spacious floor plan. Call or contact us today for more information on this model!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2016,
    bedrooms: 1,
    bathrooms: 1,
    width: 17,
    manufacturer: 'TRU Mobile Homes',
    model: 'TRU14562A'
  },
  {
    price: 79224.93,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/6b9c984c-ffe2-4745-b685-2c07a86e1803.jpg',
    location: 'Birmingham, Alabama',
    length: 81,
    type: 'Single Wide',
    description: `This beautiful 2/1 (or optional 1/1) single wide mobile home not only has the space your family needs, but the modern style you are looking for as well. Check out this spacious floor plan. Call or contact us today for more information on this model!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2019,
    bedrooms: 2,
    bathrooms: 1,
    width: 19,
    manufacturer: 'TRU Mobile Homes',
    model: 'TRU17962B'
  },
  {
    price: 98042.34,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/6b9c984c-ffe2-4745-b685-2c07a86e1803.jpg',
    location: 'Atlanta, Georgia',
    length: 84,
    type: 'Single Wide',
    description: `This beautiful 2/1 (or optional 1/1) single wide mobile home not only has the space your family needs, but the modern style you are looking for as well. Check out this spacious floor plan. Call or contact us today for more information on this model!
    Our factories offer hundreds of options to allow our customers true customization with their home. Available options vary from factory to factory, and there are way too many to list in full here. We have listed the most popular options with pricing for this factory to give you a better idea of the final price of your home.
    Our team at Mobile Homes Direct does our best to stay on top of the most current factory option lists, but pricing does fluctuate due to current market conditions. Your housing consultant can provide you with an itemized factory spec sheet for your home to confirm pricing. Please note that the pricing listed for each option does NOT include the state sales tax for that option.`,
    year: 2016,
    bedrooms: 2,
    bathrooms: 1,
    width: 18,
    manufacturer: 'TRU Mobile Homes',
    model: 'TRU14284B'
  },
  {
    price: 89500.0,
    imageUrl:
      'https://static1.squarespace.com/static/556def68e4b0fb59709c7d04/5a03b1aa53450abf28d426ba/5a03b5f6085229e18a9840e7/1510198301579/DSCF5972.jpg?format=1500w',
    location: 'Jackson, Wyoming',
    length: 26,
    type: 'Tiny Home',
    description: `The Silhouette is a 26' x 8' tiny house that balances rustic charm and industrial chic seamlessly. This home was designed with the panoramic views of Vermont in mind. Two massive fixed windows in the living area and an oversized round window in the shower area will make you feel like you're living as close to the great outdoors as possible. This home is as crammed full of customizations on the outside as it is on the inside. Take a hot shower outdoors with the swiveling outdoor shower made of exposed copper. Skip the gym and get your Crossfit workout on right in your own living room with a custom olympic squat/bench rack and gymnastics rings hanging from the ceiling. Sit down in the custom reading nook by the wood burning stove to read your favorite book. Step into the kitchen and notice the folding prep space and custom chopping board sink insert that nests in the fireclay farmhouse sink or hangs on the wall. Enjoy a long hot shower after a day hiking or skiing in the oversized shower with custom doors and tile and endless hot water from the Stiebel Eltron electric tankless hot water heater. This gorgeous home blurs the line between form and function and is the definition of affordable custom luxury. This home costs $89,500 as pictured. If you're interested in owning your own version of The Silhouette get in touch with us through our contact page.`,
    year: 2019,
    bedrooms: 1,
    bathrooms: 1,
    width: 8,
    manufacturer: 'Wind River Tiny Homes',
    model: 'THE SILHOUETTE'
  },
  {
    price: 69000.0,
    imageUrl:
      'https://static1.squarespace.com/static/556def68e4b0fb59709c7d04/5934305837c581fea8458aa5/593433d9d2b85729114d95a9/1496608025080/DSCF4278.jpg?format=1500w',
    location: 'Aspen, Colorado',
    length: 28,
    type: 'Tiny Home',
    description: `The Ironclad tiny house started as a hybrid of two of our past builds, The Chimera and The Rook, but ended up taking on a life of it's own. This sleek and modern tiny house won't stand up to canon balls like the Civil War ships that inspired its name, but the 40-year warranty metal siding and roofing are incredibly durable and low maintenance. Step inside and you'll find the interior has a modern feel with industrial and rustic accents. White shiplap walls, light natural pine ceiling, and subway tiles are offset by the brooding and dark tone of the trim, hardware, fixtures, and floor. The Ironclad tiny home also has a larger than standard bathroom, large shower (48"x32"), and full sized appliances which allow the space to feel and operate like a much larger home. The cost of the Ironclad as pictured is around $69,000. If you want your very own custom version, contact us here!`,
    year: 2019,
    bedrooms: 2,
    bathrooms: 0,
    width: 10,
    manufacturer: 'Wind River Tiny Homes',
    model: 'THE IRONCLAD'
  },
  {
    price: 59500.0,
    imageUrl:
      'https://static1.squarespace.com/static/556def68e4b0fb59709c7d04/59f7cf8c0d92972b61a51365/59f7dd146926704f35548f70/1509901300163/DSCF4735.jpg?format=1500w',
    location: 'Seattle, Washington',
    length: 24,
    type: 'Tiny Home',
    description: `The Acadia takes inspiration from the rugged beauty of the national park in Maine that is it's namesake. This 24' tiny home shares some rustic DNA with our original Wind River Bungalow, but with a modern twist. It features a traditional gable roof, maxed out loft dormers, and a small front porch.  The interior has a modern/rustic feel with subtle industrial tweaks. The layout is open and spacious and gives it a bright airy feel with white ship lap walls and custom wood accent finishes.  There is also a large exterior closet located on the hitch end of the home which houses the breaker box, electric tankless hot water heater, and a ton of space for gear (there's even room for a bike). This gorgeous tiny is one of our most affordable models to date and can be purchased as pictured for $59,500. Contact us if you'd like your very own Acadia.`,
    year: 2019,
    bedrooms: 2,
    bathrooms: 1,
    width: 9,
    manufacturer: 'Wind River Tiny Homes',
    model: 'THE ACADIA'
  }
]

const orderItems = [
  {
    orderId: 1,
    productId: 5,
    quantity: 1
  },
  {
    orderId: 1,
    productId: 3,
    quantity: 10
  },
  {
    orderId: 2,
    productId: 10,
    quantity: 3
  },
  {
    orderId: 3,
    productId: 5,
    quantity: 2
  },
  {
    orderId: 4,
    productId: 9,
    quantity: 1
  },
  {
    orderId: 4,
    productId: 2
  },
  {
    orderId: 4,
    productId: 6,
    quantity: 3
  },
  {
    orderId: 4,
    productId: 7,
    quantity: 2
  },
  {
    orderId: 5,
    productId: 1,
    quantity: 1
  },
  {
    orderId: 5,
    productId: 11,
    quantity: 1
  }
]

const seed = async () => {
  await Promise.all(users.map(user => User.create(user)))
  await Promise.all(orders.map(order => Order.create(order)))
  await Promise.all(products.map(product => Product.create(product)))
  await Promise.all(orderItems.map(item => OrderItem.create(item)))
  console.log('db seeding completed')
}

const main = () => {
  console.log('db syncing')
  db
    .sync({force: true})
    .then(() => {
      console.log('db seeding')
      return seed()
    })
    .catch(err => {
      console.log('error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      db.close()
      return null
    })
}

main()
