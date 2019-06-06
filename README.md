Technologies Used
CSS3
Bootstrap
JavaScript
Rails
Heroku
React.js

Planning
My initial plan in wireframes looks ultimately the same as Version1 of this
project. There is a resource in my ERD that says 'Buyers' when it really
ended up being 'Unauthorized Viewers.'

Wireframe
Wireframe

User Stories
Authorization Features:
As a music shop owner, I would like to sign in with email and password and
create/edit items that are for sale or for rent.
---As a signed in user, I would like to change password.
---As a signed in user, I would like to sign out.
Main Features:
As a musician, I would like to rent gear.
As an unregistered user, I would like to see all of the products.
As a shopper I would like to see gear and instruments that are for sale.

POST /sign-up users#signup
POST /sign-in users#signin
DELETE /sign-out users#sign-out
PATCH /change-password users#changepw

Custom routes in rails:
PATCH '/instruments/:id/edit' 'instruments#patch'
POST '/create-instrument' 'instruments#create'
GET '/instruments/:id' 'instruments#show'

Challenges
  Rendering 'For Sale' or 'For Rent'
  I had a hard time getting my boolean information to display. I tried a couple
  of different ternary operators in the Instrument component, but they still
  rendered blanks for both unauthorized and authorized users. What ultimately
  worked was setting a checkbox in my create form, toggling the boolean with
  event.target.checked, and mounting that component to the state.

  Update Button
  A persistent but minor issue is the edit button for authorized users. Right
  now, it's displaying a warning for an unauthorized user who hits the edit
  button on an item that isn't their own yet it still displays the edit form.
  In Version 2 I plan on having a "My Items" route in the header where authorized
  users can see their posts; that way, the edit button won't even display unless
  the user is in the "My Items" tab.

Future Thinking
Future improvements:
-Images and contact information on each item, perhaps a hyperlink for
"email owner."
-Logo in title.
-More interactive less rigid interface.

Deployed app: https://awf825.github.io/capstone-client/
Rails repo: https://github.com/awf825/capstone-api
Deployed Heroku DB: https://pure-sea-43931.herokuapp.com
