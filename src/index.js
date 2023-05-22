const express = require('express');

const app = express();

const port = 4000;

const dataAktivitasPekerjaanRoutes = require('./routes/DataAktivitasPekerjaanRoutes.js')
const BahayaToResikoRoutes = require('./routes/BahayaToResikoRoutes.js')
const MatriksProgramRoutes = require('./routes/MatriksProgramRoutes.js')


app.use(express.json());

app.use("/mapWbsBahaya", dataAktivitasPekerjaanRoutes);

app.use("/dataAktivitasToSasaran", BahayaToResikoRoutes);

app.use("/matriksProgram", MatriksProgramRoutes);


app.listen(port, () => {
    console.log('Server berhasil di running di port ' + port)
})