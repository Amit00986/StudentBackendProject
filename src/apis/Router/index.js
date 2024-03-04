const express = require('express');

const router = express.Router();

const v1Routes = require('./v1');

router.get('/healthcheck', (req, res) => {
  const data = {
    ts: new Date(),
    msg: "Inside HealthCheck Apis Route",
  };
  console.log('inside health check API');
  res.json({
    success: true,
    data: data
  });
});


router.use('/v1', v1Routes);

module.exports = router;
