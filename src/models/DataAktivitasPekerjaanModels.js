const pool = require('../config/postgresConfig');


const getDataAktivitasPekerjaan = () => {
    const PGSQLQuery = 'SELECT id,aktivitas_pekerjaan_code,aktivitas_pekerjaan_desc FROM alvia_km_k3.mst_aktivitas_pekerjaan  WHERE deleted = FALSE ORDER BY id ASC';
    
    const mapWbsQuery ='SELECT MWB.id,MWB.level_2_desc,MWB.level_3_desc,MWB.level_4_desc,MWB.alternatif_design_desc,MWB.aktivitas_pekerjaan_code,(SELECT AP.aktivitas_pekerjaan_desc FROM alvia_km_k3.mst_aktivitas_pekerjaan AP WHERE AP.aktivitas_pekerjaan_code = MWB.aktivitas_pekerjaan_code) AS aktivitas_pekerjaan_desc,AB.bahaya_code, (SELECT B.bahaya_desc FROM alvia_km_k3.mst_bahaya B WHERE B.bahaya_code = AB.bahaya_code),AB.id as id_map_aktivitas_to_bahaya FROM alvia_km_k3.mst_map_wbs_to_bahaya MWB RIGHT JOIN alvia_km_k3.mst_aktivitas_bahaya AB ON MWB.aktivitas_pekerjaan_code = AB.aktivitas_pekerjaan_code ORDER BY AB.id';

    return new Promise((resolve, reject) => {
        pool.query(mapWbsQuery, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        });
    });
}

const closeConnection = () => {
    pool.end();
};
module.exports = {
    getDataAktivitasPekerjaan,
    closeConnection
}
