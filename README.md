# Restaurant-Backend

The backend of a restaurant website and management app to handle content updates

The admin website and API of a fictitious restuarant. Provides menu and event data that can be fetched by the separate public site and provides content management functionality to registered admins. User permissions are set by role, with admins having the ability to create, update and delete all types of content and employees only allowed to view information specific to them. Authorization is handled using JSON Web Tokens sent through secure, HttpOnly cookies and passwords are hashed using Bcrypt.

Made with NodeJS, MongoDB, HTML and CSS.
