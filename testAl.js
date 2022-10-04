async function Time() {
  while (true) {
    const date = new Date();
    await setTimeout(
    () => console.log( date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()), 1000);
    console.clear();
  }
}

Time();
console.log("Time");
