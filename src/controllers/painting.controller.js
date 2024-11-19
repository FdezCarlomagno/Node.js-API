const paintingModel = require('../models/painting.model');
const PaintingModel = require('../models/painting.model');

class PaintingController {
    async getPaintings(req, res) {
        try {
            const { sold, price, name } = req.query; 
            const paintings = await PaintingModel.getPaintings(sold, price, name);
            if (!paintings || paintings.length == 0) {
                return res.status(404).json({ error: 'error no paintings found' });
            }
            res.json(paintings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getPaintingByID(req, res) {
        try {
            const id = req.params.id;
            const painting = await paintingModel.getPaintingByID(id);

            if (!painting) {
                return res.status(404).json({ error: `the painting with id = ${id} doesnt exist` });
            }

            return res.json(painting);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deletePainting(req, res) {
        try {
            const id = req.params.id;
            const painting = await paintingModel.getPaintingByID(id);

            if (!painting) {
                return res.status(404).json({ error: `the painting with id = ${id} doesnt exist` });
            }

            await paintingModel.deletePainting(id);
            res.json({ message: "Painting deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addPainting(req, res) {
        try {
            const { name, image_url, description, price, height, width } = req.body;
            const sold = req.body.sold || false;
            const discount = req.body.discount || 0;

            if (!name || !image_url || !price || !height || !width) {
                return res.status(400).json({ error: 'missing mandatory fields' });
            }

            const id = await paintingModel.addPainting(name, image_url, price, description, sold, height, width, discount);
            const painting = await paintingModel.getPaintingByID(id);

            return res.json(painting);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updatePainting(req, res){
        try {
            const id = req.params.id;
            const painting = await paintingModel.getPaintingByID(id);

            if (!painting) {
                return res.status(404).json({ error: `the painting with id = ${id} doesnt exist` });
            }

            const { name, image_url, description, price, height, width } = req.body;
            const sold = req.body.sold || false;
            const discount = req.body.discount || 0;

            await paintingModel.updatePainting(id, name, image_url, price, description, sold, height, width, discount);

            return res.json({ msg: 'Painting updated succesfully'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PaintingController();