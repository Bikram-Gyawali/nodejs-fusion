
# Crypto Balance Calculator Backend Nodejs

This is a task assigned for me while on interview .
I have mentioned the task here :

    1. Get a free api key from https://bscscan.com/

    2. Get a few crypto wallets with balance from the internet

    3. Store them in a mongoDB collection separately.

    4. Create a NodeJS service to :
    
        1.Fetch balance data from the saved crypto wallets periodically every 5 minutes and save it in the database.
        2.Move historical data to another collection on the next fetch.
        3.Create an API to fetch the saved data from database calculating the daily, weekly and monthly balance change (amount and percentage)
        4.Show the data in form of a chart in any JS framework (Optional)

    5.  Handle bscscan api response errors
    


### To run this in your system  
```bash
git clone 
```


   ## Installation
```bash
$ npm install
```

## Running the app
```bash
$ npm start
````

## Before you run the server :
Get API from https://bscscan.com/ store it as API_KEY=(YOUR API KEY HERE) . in .env file (create yours) at root level folder and store mongodb uri as DB=YOUR_URI

Also follow as mentioned below : 

In the `utils/addressList.js` file you can put your required
wallet account address to obeseve the changes. In the array `walletAddress` of file `utils/addressList.js` conains
addresslist array which I have taken is from bscscan.com/accounts these are the top 100 accounts there .
But their balance were constant while I was on this task so I have to changed their balance in database 
to see the balance difference and percentage at different time period. 
This api also moves the old wallets and balance into another collection : ``history`` from collection : ``walletsBalance `` .
You need to have some data in the database before so make a post request once you edit the ``addressList`` then you can uncomment the ``schduleTask()`` function in ``index.js`` to move the old data to another collection and store new data in the original collection ``walletsBalance`` 



    
    
## Packages Used:
```bash
    "axios": "^1.2.2",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "moment": "^2.29.4",
    "mongoose": "^6.8.2",
    "node-cron": "^3.0.2",
    "nodemon": "^2.0.20"
```
## Database Used : `MongoDb`

## NodeJS Version 
     v16.14.2

## API Reference

#### 1 . Get balance of accounts :

```http
 GET http://localhost:8000/api/getWalletsAndBalance
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your BSC Scan  API key |

#### 2 . Upload Wallets And Balance To Database 

```http
 POST http://localhost:8000/api/getWalletsAndBalance
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `accounts addreess`      | `array` | **Required**. |


#### 3 . Get Daily Balance Status of accounts in database

```http
 GET http://localhost:8000/api/getDailyBalanceStatus
```

response :
  
    [{ 
        "accountNo": "0x0000000000000000000000000000000000001004",
        "currentBalance": "2152182258580301644903222489",
        "previousBalance": "102182258580301644903222489",
        "balanceDiff": "2049999999999999848568848384",
        "percentage": "2006%"
    }]


#### 4 . Get Weekly Balance Status of accounts in database

```http
 GET http://localhost:8000/api/getWeeklyBalanceStatus
```

response :
    
    [{
        "accountNo": "0x0000000000000000000000000000000000001004",
        "currentBalance": "2152182258580301644903222489",
        "previousBalance": "152182258580301644903222489",
        "balanceDiff": "2000000000000000026575110144",
        "percentage": "1314%"
    }]



#### 5 . Get Monthly Balance Status of accounts in database

```http
 GET http://localhost:8000/api/getMonthlyBalanceStatus
```

response :
   
    [{
        "accountNo": "0x0000000000000000000000000000000000001004",
        "currentBalance": "102182258580301644903222489",
        "previousBalance": "100102262046874954903222489",
        "balanceDiff": "2079996533426699502616576",
        "percentage": "2%"
    }]


##  Lets get in touch .
- Author - [Bikram Gyawali](https://github.com/Bikram-Gyawali)
- Portfolio - [Bikram ](https://bikramgyawali.netlify.app/)
- LinkedIn - [Bikram Gyawali](https://www.linkedin.com/in/bikram-gyawali-4069461a0/)
- email: bikramgyawali57@gmail.com

