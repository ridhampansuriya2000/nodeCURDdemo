
exports.getHTMLPage = async (req, res) => {
    try{
        res.sendFile(__dirname + '/index.html');
    }catch (e) {
        res.status(500).send({error:e});
    }
};