This is a Todo App I have made progressively from v1 to v5.

The original requirement was to make a basic Todo App as v1 then add complexities, such as: Routing, Middleware, Logging, Configuration, Caching.

As per the task, I have made 5 versions of this Todo App from v1 to v5, adding 1 complexity in each version:

V1: Basic Todo App
Built the Todo REST API with GET, POST, and PUT endpoints. Added basic Todo validation.

V2: Added routing : 
Introduced Express routing and moved Todo routes into routes/todoRoutes.js. This improved the organization of the backend.

V3: Added middleware : 
Introduced custom middleware for validation, request logging, and request timing. This demonstrated the Express middleware execution flow.

V4: Added logging and configuration : 
Added centralized configuration through config/config.js. Improved request logging and added environment information.

V5: Added caching : 
Added an in memory cache for GET /api/todos. Implemented cache hit/miss handling and cache clearing after data changes.

Testing : 
The application was tested at each version by running the Node.js server and checking the frontend and REST API functionality. CRUD operations, input validation, middleware, logging and caching were verified through browser requests.
