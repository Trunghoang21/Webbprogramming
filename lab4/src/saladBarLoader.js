export async  function inventoryLoader(){
    const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
    await new Promise(resolve => setTimeout(resolve, 500));
    return inventory;
}