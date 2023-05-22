const pool = require('../config/postgresConfig');

const getMatriksProgram = (parameter) => {
    const matriks_map_program_query = `SELECT id,sasaran_code,sasaran_desc,sumber_daya_desc,jangka_waktu_desc,indikator_pencapaian_desc,monitoring_desc,penanggung_jawab_desc 
    FROM alvia_km_k3.mst_map_program 
    WHERE sasaran_code = '${parameter.sasaran_code}'`;


    return new Promise((resolve, reject) => {
        pool.query(matriks_map_program_query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    getMatriksProgram
}
