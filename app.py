from flask import Flask, jsonify, request

app = Flask(__name__)

books =[
    {
        'id':1,
        'título':'Harry Potter',
        'autor': 'Thiago Rosa'
    },
    
    {
        'id':2,
        'título':'Among us',
        'autor':'Lucas Augusto'
        
    },
    
    {
        'id':3,
        'título':'Diário de um aluno do CESUPA',
        'autor':'Renato Xavier'
        
    },
    {
        'id':4,
        'titulo':'Calculo 1'
        'autor':'João Dário'
    }
]


#consulta de todos os livros
@app.route('/books',methods=['GET'])
def get_books():
    return jsonify(books)


# Consulta por ID
@app.route('/books/<int:id>', methods=['GET'])
def get_book_id(id):
    for book in books: 
        if book.get('id') == id:
            return jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

# edição de livro id
@app.route('/books/<int:id>', methods=['PUT'])
def book_edit(id):
    changed_book = request.get_json()  
    for index, book in enumerate(books):
        if book.get('id') == id:
            books[index].update(changed_book)  
            return jsonify(books[index]) 
    return jsonify({'error': 'Book not found'}), 404 

# Adicionar Livros
@app.route('/books',methods=['POST'])
def add_book():
    new_book = request.get_json()
    books.append(new_book) 
    return jsonify(books)

@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    for index, book in enumerate(books):
        if book.get('id') == id:
            del books[index] 
            return jsonify({'message': 'Book deleted successfully!', 'books': books})
    return jsonify({'error': 'Book not found'}), 404


if __name__ == '__main__':
    app.run(port=5000, host='localhost', debug=True)