const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')
const Readable = require('stream').Readable;

const pyParseKml = (req, res) => {
    const { kml } = req.body
    //    const fileName = __dirname + kml
    const sendStream = new Readable();
    const newStream = new Readable();
    newStream._read = () => { }; // redundant? see update below
    newStream.push(kml);
    newStream.push(null);

    const subprocess = spawn('python', [
        path.join(__dirname, 'readKml.py')])
    res.set('Content-Type', 'text/plain')

    //const fileStream = fs.createReadStream(fileName)
    //fileStream.pipe(subprocess.stdin)
    newStream.pipe(subprocess.stdin)

    /* subprocess.stdout.on('data', data => {
        sendStream._read = () => { }; // redundant? see update below
        sendStream.push(data);
        sendStream.push(null);
        sendStream.pipe(res)
    }) */
    subprocess.stdout.pipe(res)

    //subprocess.stderr.pipe(res)

}

module.exports = { pyParseKml }