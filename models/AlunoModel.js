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
    enum: ['A', 'B', 'C', 'D', 'E'], // Apenas as turmas permitidas
    required: true
  },
  notas: {
    type: [Number],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 4 && v.every(n => n >= 0 && n <= 10);
      },
      message: props => `As notas devem ser um array de 4 números entre 0 e 10`
    }
  },
  media: {
    type: Number,
    default: function() {
      return this.calcularMedia();
    }
  }
}, { timestamps: true });

// Método para calcular a média aritmética das notas
alunoSchema.methods.calcularMedia = function() {
  return this.notas.reduce((acc, curr) => acc + curr, 0) / this.notas.length;
};

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
