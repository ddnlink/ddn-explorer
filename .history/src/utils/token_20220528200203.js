async function getPeerInfo () {
    let url = `http://${localStorage.getItem(
        "servicePeer"
    ) || "http://47.94.144.216:8000"}/api/network`;
    try{
        const response = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json()
        console.log("data",data)
        if (data.success) {
            await localStorage.setItem("tokenName", data.tokenName)
        } else {
            await localStorage.setItem("tokenName", "")
        }
    }catch(err){
        console.log("err", err)
        await localStorage.setItem("tokenName", "DDN")
    }
}
getPeerInfo ()

export let getTokenName =  getPeerInfo
export let tokenName = localStorage.getItem("tokenName")