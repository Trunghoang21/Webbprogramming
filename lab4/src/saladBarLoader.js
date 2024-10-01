export async function inventoryLoader() {

    const endpoints = [
        'http://localhost:8080/foundations',
        'http://localhost:8080/proteins',
        'http://localhost:8080/extras',
        'http://localhost:8080/dressings'
    ];
    try {
        const fetchedData = await Promise.all(endpoints.map(endpoint => fetchInventory(endpoint)));
        const finalInventory = fetchedData.reduce((acc, data) => ({...acc, ...data}), {});
        console.log(`From inventoryLoader: ${JSON.stringify(finalInventory)}`);
        return finalInventory;
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchInventory(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const fetchedData = await Promise.all(data.map(item => fetIngredient(url, item)))
        // the returned value from Promise.all is an array of objects, so we need to merge them into one object
        // the reduce method and the spread operator are used to merge the objects into a single one.
        const result = fetchedData.reduce((acc, item) => {
            return {...acc, ...item};
        }, {});
        console.log(`From fetchInventory: ${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

async function fetIngredient(url_temp, name) {
    const url = url_temp + '/' + name;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        //console.log(`From fetIngredient: ${name} value: ${JSON.stringify(data)}`);
        return {[name]: data};
    } catch (error) {
        console.error(error.message);
    }
}