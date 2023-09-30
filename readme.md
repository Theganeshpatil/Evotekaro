# Evotekaro - A secure voting system

Uses FastAPI - a python framework to create a backend

### How to start a application

0. Create and start virtual environment
1. Download required libraries `pip install -r requirements.txt`
2. Start a uvicorn server using `uvicorn main:app`
3. visit `http://127.0.0.1:8000` to access a api
4. `http://127.0.0.1:8000/docs` has api documentation

# User Details to use:

Admin user:
email: `ganesh@iiitk.com`
password: `pass`

# Routes only admin can access

1. `GET` - /user
2. `GET` - /user/{id}
3. `POST` - /user
4. `DELETE` - /user
5. `PUT` - /user
