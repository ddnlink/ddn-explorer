async function getPeerInfo () {
    let url = `http://${localStorage.getItem(
        "servicePeer"
    ) || "peer.ebookchain.org"}/api/network`;

    try{
        const response = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json()
        console.log("url= ", url)
        console.log("data",data)
        if (data.success) {
            await localStorage.setItem("tokenName", data.tokenName)
        } else {
            await localStorage.setItem("tokenName", "HBL")
        }
    }catch(err){
        console.log("err", err)
        await localStorage.setItem("tokenName", "HBL")
    }
}
getPeerInfo ()

export let getTokenName =  getPeerInfo
export let tokenName = localStorage.getItem("tokenName")
