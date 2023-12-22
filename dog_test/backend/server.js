require("appdynamics").profile({
    controllerHostName: 'pracso-nfr.saas.appdynamics.com',
    controllerPort: 443,
    
    // If SSL, be sure to enable the next line
    controllerSslEnabled: true,
    accountName: 'pracso-nfr',
    accountAccessKey: 'z2r3csvvco4n',
    applicationName: 'Test',
    tierName: 'Test_tier',
    nodeName: 'process' // The controller will automatically append the node name with a unique number
   });

const express = require('express')
const app = express()
const port = 8383

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    const { dynamic } = req.params
    const { key } = req.query
    console.log(dynamic, key)
    res.status(200).json({ info: 'preset text 🐶' })
})

app.post('/', (req, res) => {
    const parcel = req.body
    if(!parcel){
        return res.status(400).send({ status: 'failed'})
    }
    res.status(200).send({status: 'received' })
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))