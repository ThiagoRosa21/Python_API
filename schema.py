from marshmallow import Schema, fields

class BookSchema(Schema):
    id = fields.Str(dump_only=True)
    titulo = fields.Str(required=True)
    autor = fields.Str(required=True)
    ano = fields.Int(required=True)
    genero = fields.Str(required=True)
