// HW035587.local
const express = require('express')
const app = express()

const PORT = 4444

app.get('/', (req, res) => {
    res.status(200).send('cool response')
})

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
