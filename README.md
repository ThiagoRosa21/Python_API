
# 📚 Python API - Gerenciamento de Livros

Uma API RESTful feita com **Flask** para gerenciamento de uma biblioteca de livros fictícia. Permite listar, adicionar, editar, buscar e excluir livros de forma simples.

---

## 🚀 Tecnologias utilizadas

- Python 3.10+
- Flask
- Marshmallow (validação de dados)
- UUID (para IDs únicos)
- JSON como "banco de dados" temporário

---

## 📦 Instalação

```bash
git clone https://github.com/ThiagoRosa21/Python_API.git
cd Python_API
pip install -r requirements.txt
python app.py
```

A API estará disponível em:

```
http://localhost:5000/books
```

---

## 🧪 Exemplos de Uso (via Postman ou curl)

### 🔹 Listar todos os livros
```http
GET /books
```

### 🔹 Buscar livro por ID
```http
GET /books/<id>
```

### 🔹 Adicionar um novo livro
```http
POST /books
Content-Type: application/json

{
  "titulo": "Aprendendo Flask",
  "autor": "Thiago Rosa",
  "ano": 2024,
  "genero": "Tecnologia"
}
```

### 🔹 Atualizar livro
```http
PUT /books/<id>
Content-Type: application/json

{
  "titulo": "Aprendendo Flask (Atualizado)"
}
```

### 🔹 Remover livro
```http
DELETE /books/<id>
```

### 🔹 Buscar por autor e paginação
```http
GET /books?autor=Thiago&pagina=1&tamanho=2
```

---

## 📊 Estatísticas
```http
GET /books/stats
```
Retorna total de livros e número de livros por autor.

---

## 👨‍💻 Contribuindo

Sinta-se livre para abrir uma [issue](https://github.com/ThiagoRosa21/Python_API/issues) ou enviar um pull request com melhorias, novos endpoints, integrações com bancos de dados, autenticação, etc.

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 📬 Contato

Desenvolvido por **Thiago Rosa da Silva**

- GitHub: [@ThiagoRosa21](https://github.com/ThiagoRosa21)
- LinkedIn: [linkedin.com/in/thiagorosadev](https://linkedin.com/in/thiagorosadev)

