export async  function inventoryLoader(){
    // fix late
    const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
    const url = 'http://localhost:8080/foundations';
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 500));
        const fetchedData = await Promise.all(data.map(item => fetIngredient('foundations',item)))
        // the returned value from Promise.all is an array of objects, so we need to merge them into one object
        // the reduce method and the spread operator are used to merge the objects into a single one.
        const result = fetchedData.reduce((acc, item) => {
            return {...acc, ...item};
        }, {});
        console.log(`From inventoryLoader: ${JSON.stringify(result)}`);
        return result;
    }catch(error){
        console.error(error.message);
    }
}

async function fetIngredient(type,name){
    const url = `http://localhost:8080/${type}/${name}`;
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`From fetIngredient: ${name} value: ${JSON.stringify(data)}`);
        return {[name]: data};
    }catch(error){
        console.error(error.message);
    }
}