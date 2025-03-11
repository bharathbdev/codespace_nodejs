const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected: hi'))
.catch(err => console.error('Connection error:', err));

const DataSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const DataModel = mongoose.model('Data', DataSchema);

app.post('/insert', async (req, res) => {
    try {
        const { name, age } = req.body;
        const newData = new DataModel({ name, age });
        await newData.save();
        res.json({ message: 'Data inserted successfully', data: newData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/get', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));