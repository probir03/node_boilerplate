var ObjectId = require('mongodb').ObjectId

module.exports = function(app, db) {
    const collection = db.collection('notes');
    
    app.get('/notes/:id', (req, res) => {
        id = req.params.id;
        const query = {'_id' : new ObjectId(id)};
        collection.findOne(query, (err, item) => {
            if(err) return res.send({'error' : 'An error occured'});
            res.send(item)
        });
        
    });

    app.post('/notes', (req, res) => {
        const note = {
            text : req.body.body,
            title : req.body.title
        }
        collection.insert(note, (err, result ) => {
            if(err) return res.send({'error' : 'An error occured'});
            res.send(result.ops[0])
        });
    });

    app.put('/notes/:id', (req, res) => {
        id = req.params.id;
        const query = {'_id' : new ObjectId(id)};
        const note = {
            text : req.body.body,
            title : req.body.title
        }
        collection.update(query, note, (err, item) => {
            if(err) return res.send({'error' : 'An error occured'});
            res.send({'message' : 'updated successfully'});
        });
        
    });

    app.delete('/notes/:id', (req, res) => {
        id = req.params.id;
        const query = {'_id' : new ObjectId(id)};
        collection.remove(query, (err, item) => {
            if(err) return res.send({'error' : 'An error occured'});
            res.send({'message' : `Note ${id} deleted`});
        });
        
    });
};