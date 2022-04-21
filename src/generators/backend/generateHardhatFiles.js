import inquirer from "inquirer";
import path from "path";
import Handlebars from "handlebars";
import { readFileSync, writeFileSync } from "fs";
import { toPascalCase } from "../../helpers/helpers";
const chalk = require("chalk");

 
 const generateHardhatFiles = async (
    network,
    contract,
    openzeppelinConfirmation,
    tokenType = '',
    tokenName = '',
    tokenSymbol = ''
  ) =>{
    const hardhatConfigTemplateContent = Handlebars.compile(
        readFileSync(
          path.join(__dirname, "../../templates/backend/hardhat.config.hbs"),
          "utf-8"
        )
      )({ network });

    const deployTemplateContent = Handlebars.compile(
      readFileSync(
        path.join(__dirname, "../../templates/backend/deploy.hbs"),
        "utf-8"
      )
    )({ contract });
  
    const contractTemplateContent = Handlebars.compile(
      readFileSync(
        path.join(__dirname, "../../templates/backend/contract.hbs"),
        "utf-8"
      )
    )({ contract, openzeppelinConfirmation,tokenType ,tokenName, tokenSymbol });
  
    const dotEnvTemplateContent = Handlebars.compile(
      readFileSync(
        path.join(__dirname, "../../templates/backend/env.hbs"),
        "utf-8"
      )
    )({ network });
  
    const hardhatPath = path.join(process.cwd())
  
 
  
    try {
        const {confirmation} = await inquirer.prompt([
            {
              name: "confirmation",
              type: "confirm",
              message: "Do you want to replace the common files to auto generate the essential code?",
              default: true
            }
          ])
        if(confirmation){
            writeFileSync(`contracts/${toPascalCase(contract)}.sol`, contractTemplateContent)
            writeFileSync('.env', dotEnvTemplateContent)
            writeFileSync('hardhat.config.js', hardhatConfigTemplateContent)
            writeFileSync(`scripts/deploy.js`, deployTemplateContent) 

            let contractFileName = toPascalCase(contract)
            console.log(chalk.greenBright('\n✅ The following files created successfully!'))
            console.log(path.join(hardhatPath, 'contracts', contractFileName + ".sol"));
            console.log(path.join(hardhatPath, '.env'));
            console.log(path.join(hardhatPath, 'hardhat.config.js'));
            console.log(path.join(hardhatPath, 'scripts', 'deploy.js'));

        
        }
     
    } catch (error) {
      console.error(error)
    }
  
  }
  
  export default generateHardhatFiles;