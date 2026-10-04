const doGetUrl = require("./main");

var express = require("express");
const bodyParser = require('body-parser');
var app = express();

app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "16kb" }));

app.all("/getXhsPicUrl", async function (req, res) {
  res.set("Content-Type", "application/json");
  const shareText = req.query.shareText || req.body.shareText;
  const xhsCookie = req.body.xhsCookie;
  if (!shareText) {
    res.send(JSON.stringify({
      error: "缺少shareText参数",
    }));
    return;
  }
  try {
    const result = await doGetUrl(
      {
        shareText: shareText,
        xhsCookie: xhsCookie,
      },
      null
    );
    res.send(JSON.stringify(result));
  } catch (e) {
    res.send(JSON.stringify({
      error: e.message,
    }));
  }
});

app.get("/healthz", (req, res) => res.send("ok"));

app.listen(7776);
