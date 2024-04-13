const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  turma: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],
    required: true
  },
  media: {
    type: Number
  }
})

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
