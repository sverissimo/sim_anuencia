const path = require('path')
const { spawn } = require('child_process')
const Readable = require('stream').Readable;

const pyParseKml = (req, res) => {
    const { kml } = req.body    
    const newStream = new Readable();
    newStream._read = () => { };
    newStream.push(kml);
    newStream.push(null);

    const subprocess = spawn('python', [
        path.join(__dirname, 'readKml.py')])
    res.set('Content-Type', 'text/plain')
    
    newStream.pipe(subprocess.stdin)
    subprocess.stdout.pipe(res)

    //subprocess.stderr.pipe(res)
}

module.exports = { pyParseKml }
