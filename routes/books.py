from flask import Blueprint, jsonify, request
from schema import BookSchema
from models import books
import uuid
import logging

books_bp = Blueprint('books', __name__, url_prefix='/books')
book_schema = BookSchema()
book_list_schema = BookSchema(many=True)

logging.basicConfig(level=logging.INFO)


@books_bp.route('/', methods=['GET'])
def get_books():
    autor = request.args.get('autor')
    pagina = int(request.args.get('pagina', 1))
    tamanho = int(request.args.get('tamanho', 5))

    filtrados = books
    if autor:
        filtrados = [b for b in books if autor.lower() in b['autor'].lower()]

    inicio = (pagina - 1) * tamanho
    fim = inicio + tamanho
    paginados = filtrados[inicio:fim]

    return jsonify({
        'pagina': pagina,
        'tamanho': tamanho,
        'total': len(filtrados),
        'livros': book_list_schema.dump(paginados)
    })

@books_bp.route('/<id>', methods=['GET'])
def get_book(id):
    for book in books:
        if book['id'] == id:
            return book_schema.jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

@books_bp.route('/', methods=['POST'])
def add_book():
    data = request.get_json()
    errors = book_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    data['id'] = str(uuid.uuid4())
    books.append(data)
    return book_schema.jsonify(data), 201

@books_bp.route('/<id>', methods=['PUT'])
def update_book(id):
    data = request.get_json()
    errors = book_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400

    for book in books:
        if book['id'] == id:
            book.update(data)
            return book_schema.jsonify(book)
    return jsonify({'error': 'Book not found'}), 404

@books_bp.route('/<id>', methods=['DELETE'])
def delete_book(id):
    global books
    books = [b for b in books if b['id'] != id]
    return jsonify({'message': 'Book deleted successfully'})

@books_bp.route('/stats', methods=['GET'])
def stats():
    total = len(books)
    por_autor = {}
    for b in books:
        por_autor[b['autor']] = por_autor.get(b['autor'], 0) + 1

    return jsonify({
        'total_livros': total,
        'livros_por_autor': por_autor
    })
