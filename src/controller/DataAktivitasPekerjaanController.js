const aktivitasPekerjaanModel = require("../models/DataAktivitasPekerjaanModels")


const getDataAktivitasPekerjaan = async (req, res) => {
    try {
        const data = await aktivitasPekerjaanModel.getDataAktivitasPekerjaan();
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
    finally{
        // aktivitasPekerjaanModel.closeConnection();
    }
}

module.exports = {
    getDataAktivitasPekerjaan
}