import app from "./app.mjs"

app.listen(app.get("port"), () => {
  console.log(
    `✅ Server is running at ${app.get("host")} : ${app.get("port")}`,
  );
});
