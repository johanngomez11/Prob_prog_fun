const { loadProducts } = require('./dataAccess');

async function main() {
    try {
        const products = await loadProducts('products.txt');
        
        // Número de productos con existencia mayor a 20
        const countHighStock = products.filter(p => p.stock > 20).length;
        console.log(`Número de productos con existencia mayor a 20: ${countHighStock}`);
        
        // Número de productos con existencia menor a 15
        const countLowStock = products.filter(p => p.stock < 15).length;
        console.log(`\nNúmero de productos con existencia menor a 15: ${countLowStock}`);
        
        // Lista de productos con la misma clasificación y precio mayor a 15.50
        const groupedByClassification = products.reduce((acc, curr) => {
            acc[curr.classification] = acc[curr.classification] || [];
            acc[curr.classification].push(curr);
            return acc;
        }, {});
        
        const filteredByClassAndPrice = {};
        for (const classification in groupedByClassification) {
            filteredByClassAndPrice[classification] = groupedByClassification[classification].filter(p => p.price > 15.50);
        }
        
        console.log("\n>>>>>>>>>>> Lista de productos con precio mayor a 15.50 agrupados por clasificación: <<<<<<<<<<<");
        console.log(filteredByClassAndPrice);
        
        // Lista de productos con precio mayor a 20.30 y menor a 45.00
        const priceRangeProducts = products.filter(p => p.price > 20.30 && p.price < 45.00);
        console.log("\n>>>>>>>>>>> Lista de productos con precio entre 20.30 y 45.00: <<<<<<<<<<<");
        console.log(priceRangeProducts);
        
        // Número de productos agrupados por su clasificación
        const countByClassification = products.reduce((acc, curr) => {
            acc[curr.classification] = (acc[curr.classification] || 0) + 1;
            return acc;
        }, {});
        console.log(`\n>>>>>>>>>>> Número de productos agrupados por su clasificación: <<<<<<<<<<<
                    \n ${JSON.stringify(countByClassification, null, 2)}`);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

main();
