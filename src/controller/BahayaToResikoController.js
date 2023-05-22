const bahayaToResikoModel = require("../models/BahayaToResikoModels")


const getDataBahayaToResiko = async (req, res) => {
    const { body } = req;
    let response = [];
    try {
        response = await bahayaToResikoModel.getDataBahayaToResiko(body);
    } catch (error) {
        console.log(error);
    }

    return response;

}

const getResikoToPenyebab = async (parameter) => {
    let response = [];
    try {
        const penyebab = await bahayaToResikoModel.getResikoToPenyebab(parameter.id,parameter.aktivitas_pekerjaan_code);
        penyebab.forEach((element) => {
            response.push(element.penyebab_desc)
        })
      
    } catch (error) {
        console.log(error);
    }
    return response;

}

const mapsBahayaToPenyebab = async (req, res) => {
    const response = [];
    try {
        const bahayaToResiko  = await getDataBahayaToResiko(req,res);
        for (const row of bahayaToResiko) {
            const resikoToPenyebab = await getResikoToPenyebab(row);
            let dataMappingAll = {
                id_map_aktivitas_untill_resiko: row.id,
                aktivitas_pekerjaan_code: row.aktivitas_pekerjaan_code,
                bahaya_code: row.bahaya_code,
                bahaya_desc: row.bahaya_desc,
                tipe_bahaya_desc: row.tipe_bahaya_desc,
                resiko_code: row.resiko_code,
                resiko_desc: row.resiko_desc,
                pengendalian_code: row.pengendalian_code,
                pengendalian_desc: row.pengendalian_desc,
                sasaran_code: row.sasaran_code,
                sasaran_desc: row.sasaran_desc,
                penyebab_desc: resikoToPenyebab
            };
            response.push(dataMappingAll);
        };


        res.json({
            message: 'true',
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        });
    }

}


module.exports = {
    mapsBahayaToPenyebab
}