
//This app will require the following modules to work
//NPM Init first then insall these two
var mysql = require ("mysql");
var inquirer = require ("inquirer");

//Here we make our database connection
var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "root1234!",
    database: "bamazonDB"
})

//This will log a message if the database connects
connection.connect(function(err){
    if (err) throw err;
    console.log("This connection works!");
    productTable();
})

//We are going to query the bamazonDB table called "products"
//We will loop through each product result and console log each until we reach the end. 
var productTable = function (){

    connection.query("SELECT * FROM bamazondb.products", function(err, res){
        
        for(var i=0; i < res.length; i++){
            console.log(res[i].item_id +".  " + res[i].product_name + "  |  " + res[i].department_name + "  |  " +              res[i].price + "  |  " + res[i].stock_quantity + "\n"); //Line break
        }
    customerPrompt(res);
    })
}

//This is the fucntion that will prompt the customer
//This uses inquirer promts which can be found here https://www.npmjs.com/package/inquirer#prompt
var customerPrompt = function (res){
     
    inquirer.prompt
                ([{type:"input", 
                   name:"choice", 
                   message:"Hi! What do you want to buy?"
                }]).then(function(answer){  
                       var connect = false;
                       for(var i=0; i<res.length; i++){
                           if(res[i].product_name==answer.choice){
                           correct=true;
                           var product=answer.choice;
                           var id = i;
                           inquirer.prompt({
                               type:"input",
                               name:"quant",
                               message:"How many do you want?",
                               validate: function(value){
                                   if(isNaN(value)===false){
                                       return true;
                                   } else {
                                       return false;
                                   }
                               }
                           }).then(function(answer){ //If the remaining stock will be greater than zero, then we allow the transaction
                               if((res[id].stock_quantity-answer.quant)>0){
                                   connection.query("UPDATE products SET stock_quantity='"+(res[id]. stock_quantity-answer.quant)+"' WHERE product_name='" + product + "'", 
                                   function(err,res2){
                                        console.log("Great! Thanks for your business!");
                                        productTable();
                                   })
                               } else { //If the amount takes the quantity below zero then we console log this
                                   console.log("We don't have that many. Check the quantity above :)");
                                   customerPrompt(res);
                               }
                           })
                       }
                       }

                   })



}
