require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    try {
        const ipData = await axios.get(`${process.env.IPURL}`);
        const userIpInfo = await axios.get(`${process.env.IPDETAILSURL}${ipData.data.ip}${process.env.IPDETAILSOPTIONS}`);
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