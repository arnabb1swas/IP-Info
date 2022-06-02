require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 5000;

app.get('/', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for']; // while using the code in local comment this line
        // const ipData = await axios.get(`${process.env.IPURL}`); // for local 
        const userIpInfo = await axios.get(`${process.env.IPDETAILSURL}${ip}${process.env.IPDETAILSOPTIONS}`); // for local change ip -> ipData.data.ip
        res.json({
            success: true,
            message: "Successfully Retrieved User IP Information.",
            data: userIpInfo.data
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Unexpected Error Occured While Retriving User IP Information.",
            data: error
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
