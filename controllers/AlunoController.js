const { json } = require("express")
const Aluno = require("../models/AlunoModel")
const router = require("../routes/routes")

const AlunoController = {

    getAll: async (req, res) => {

        const campos = Object.keys(Aluno.schema.paths)

        const filtros = {}

        for (let campo in req.query) {
            if (campos.includes(campo)) {
                filtros[campo] = { regex: new RegExp(req.query[campo], 'i') }
            }
        }
        res.json(await Aluno.find(filtros))

    },

    get: async (req, res) => {
        try {
            const Aluno = await Aluno.findById(req.params.id);
            if (!Aluno) {
                res.status(404).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(Aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    create: async (req, res) => {
        try {
            const aluno = await Aluno.create(req.body);
            if (!aluno) {
                res.status(400).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body);
            if (!aluno) {
                res.status(404).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(Aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const aluno = await Aluno.findByIdAndDelete(req.params.id);
            if (!aluno) {
                res.status(404).json({ error: 'Aluno não encontrado' });
                return;
            }
            res.json(aluno);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = AlunoController