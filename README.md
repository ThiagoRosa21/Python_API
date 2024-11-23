
<h1 align="center" style="font-weight: bold;"> API BOOKS 📚</h1>


<div align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff" alt="Python Badge" width="100">
    <img src="https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=fff" alt="Flask Badge" width="100">
  </a>
</div>

<br>
<p align="center">
   <strong>
This project is a simple REST API developed in Python using the Flask framework. The API manages a list of books, allowing basic CRUD operations (Create, Read, Update, Delete). It is an excellent resource for learning about APIs and data manipulation.
   </strong>
</p>

---

## **Features**
- 📖 **Retrieve All Books**: Get a list of all books in the system.
- 🔍 **Retrieve a Book by ID**: Fetch details of a specific book using its ID.
- ✏️ **Update a Book**: Modify details of an existing book.
- ❌ **Delete a Book**: Remove a book from the system.

---

## **Technologies Used 💻**
- **Flask**: A lightweight web framework for Python, used for handling routes and HTTP requests.
- **JSON**: Format for exchanging data between the API and clients.
- **Postman**: A testing tool used to interact with and test API endpoints, including:
  - **GET**: To retrieve books.
  - **POST**: To add a new book.
  - **PUT**: To update book details.
  - **DELETE**: To remove a book.

---

## **Getting Started**

### **Install Flask**
Run the following command to install Flask in your environment:
```bash
pip install flask
```

---

### **Install Postman**
[Click Here](https://www.postman.com/downloads/)


## **Usage**
1. Clone this repository to your local machine.
2. Run the `app.py` file to start the API server:
   ```bash
   python app.py
   ```
3. Use **Postman** or your preferred HTTP client to interact with the API. The server runs at `http://localhost:5000` by default.

---

## **Example Endpoints**
- **GET `/books`**: Retrieve all books.
- **GET `/books/<id>`**: Retrieve a specific book by ID.
- **PUT `/books/<id>`**: Update details of a book.
- **DELETE `/books/<id>`**: Delete a book.

---


## 4. Clone This Repository

To clone this repository, run the following command in your terminal:

```bash
git clone https://github.com/ThiagoRosa21/Python_API
  ```

---

### **License**
This project is open-source and available under the [MIT License](LICENSE).

---

