const matriksProgramModels = require("../models/MatriksProgramModels")


const getDataMatriksProgram = async (req, res) => {
    const { body } = req;
    // console.log(req);

    try {
        const data = await matriksProgramModels.getMatriksProgram(body);
        res.json({
            message: 'true',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message : 'Server Error',
            serverMessage : error
        });
    }
}

module.exports = {
    getDataMatriksProgram
}