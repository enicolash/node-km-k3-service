const pool = require('../config/postgresConfig');


const getDataBahayaToResiko = (parameter) => {
    const mapAktivitasToResikoQuery = `SELECT MAUR.id,MAUR.aktivitas_pekerjaan_code,MAUR.bahaya_code,(SELECT B.bahaya_desc 
        FROM  alvia_km_k3.mst_bahaya B
        WHERE B.bahaya_code = MAUR.bahaya_code) AS bahaya_desc,
        (SELECT B.tipe_bahaya_desc 
        FROM  alvia_km_k3.mst_bahaya B
        WHERE B.bahaya_code = MAUR.bahaya_code) AS tipe_bahaya_desc,
        MAUR.resiko_code,(SELECT R.resiko_desc 
        FROM  alvia_km_k3.mst_resiko R
        WHERE R.resiko_code = MAUR.resiko_code) AS resiko_desc,
        MAUR.pengendalian_code,(SELECT PR.pengendalian_desc FROM alvia_km_k3.mst_pengendalian_resiko PR 
        WHERE PR.pengendalian_code = MAUR.pengendalian_code) AS pengendalian_desc,
        MAUR.sasaran_code,(SELECT S.sasaran_desc FROM alvia_km_k3.mst_sasaran S
        WHERE S.sasaran_code = MAUR.sasaran_code) AS sasaran_desc
        FROM alvia_km_k3.mst_map_aktivitas_until_resiko MAUR  
        WHERE MAUR.aktivitas_pekerjaan_code = '${parameter.aktivitas_pekerjaan_code}'
       AND MAUR.bahaya_code = '${parameter.bahaya_code}'
       ORDER BY MAUR.id`;


    return new Promise((resolve, reject) => {
        pool.query(mapAktivitasToResikoQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        });
    });
}

const getResikoToPenyebab = (id,aktivitas_pekerjaan_code) => {
    const query = `SELECT MARP.penyebab_code,(SELECT P.penyebab_desc 
        FROM  alvia_km_k3.mst_penyebab P
        WHERE P.penyebab_code = MARP.penyebab_code) AS penyebab_desc
        FROM alvia_km_k3.mst_map_resiko_to_penyebab MARP  
        WHERE MARP.aktivitas_pekerjaan_code =  '${aktivitas_pekerjaan_code}'
        AND MARP.id_map_aktivitas_untill_resiko = '${id}'
        ORDER BY MARP.id;`;
    return new Promise((resolve, reject) => {
        pool.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        });
    });
}


module.exports = {
    getDataBahayaToResiko,
    getResikoToPenyebab
}
