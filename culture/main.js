const getDataApi = async() => {
    const data = await fetch('test.json')
    const data1 = await data.json()
    console.log("data",data)

}

getDataApi()