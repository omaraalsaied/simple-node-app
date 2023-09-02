const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemp = require('./modules/replaceTemp');
const slugify = require('slugify');

// FILES: SYNC & ASYNC EXECUTION
    // Sync
// let textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// let textOut = `This is what we know about avocado: ${textIn} .\n Created at ${Date.now()} .\n Created by Omar`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file created !');

    // Async

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR !');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', (err) => {
//                 console.log('file has been written !!');
//             });
//         });
//     });
// });
// console.log('reading file ...');

// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const products = JSON.parse(data);
const temp_overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const temp_card = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const temp_product = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

console.log(products.map(el => slugify(el.productName,{lower:true})))
const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url,true);
    
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cards_view = products.map(el => replaceTemp(temp_card, el)).join('');
        const output = temp_overview.replace('{%product_card%}', cards_view);
        res.end(output);


    } else if (pathname === '/product') {
        const product = products[query.id];
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const output = replaceTemp(temp_product, product);

        res.end(output);
        // console.log(product);
    } else if (pathname === '/api') {
    
        res.writeHead(200, {
            'Content-type' : 'application/json'
        })
        res.end(products);


    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1> page not found </h1>' )
    }        
    });

server.listen(8000, '127.0.0.1', () => {
    console.log('server up & running on port 8000');
})