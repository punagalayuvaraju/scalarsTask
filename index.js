const request = require('request');
const Promise = require('bluebird');
let concurrencyCount = 2; // depends on system config

const serverList =
    [{
        "url": "http://doesNotExist.boldtech.co",
        "priority": 1
    },
    {
        "url": "http://boldtech.co",
        "priority": 7
    },
    {
        "url": "http://offline.boldtech.co",
        "priority": 2
    },
    {
        "url": "http://google.com",
        "priority": 4
    },
    {
        "url": "http://google.com",
        "priority": 5
    },
    {
        "url": "http://google.com",
        "priority": 1
    },
    ]

initial(serverList);

async function initial(serverList) {
    try {
        console.log(await findServer(serverList)); // demo purpose
    } catch (error) {
        console.log("Error: ", error);
    }
}

  async function findServer(serverList) {
    try {
        const results = await Promise.map(serverList, function (server) { return checkStatus(server); }, { concurrency: concurrencyCount });
        const filterResults = results.filter(element => {
            return element;
        })
        if (!filterResults?.length) throw Error('No Servers are online...!!!');
        const minimumPriorityServer = filterResults.reduce(function (prev, curr) {
            return prev.priority < curr.priority ? prev : curr;
        });
        console.log(minimumPriorityServer);
        return minimumPriorityServer.url;
    } catch (error) {
        throw error;
    }
}

function checkStatus({ url, priority }) {
    console.log("checking for : " + url);
    return new Promise((resolve) => {
        const options = {
            url: url,
            timeout: 1000 * 10,
            encoding: null
        }
        request(options, async function (err, res, body) {
            console.log("response for : " + url, err);
            if (err) {
                resolve(false);
                return;
            }
            if (res?.statusCode >= 200 && res?.statusCode <= 299) resolve({ url, priority });
            else resolve(false);
        })
    })
}

