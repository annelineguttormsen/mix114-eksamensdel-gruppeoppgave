fetch("https://trialmix.infomedia.uib.no/andregrader/9999/671/4/json")
.then(response => response.json())
.then(data => console.log(data));