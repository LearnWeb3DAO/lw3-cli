import inquirer from 'inquirer';
import { boilerplateGenerator } from './generators/boilerplates';
import {selectFrontendOrBackend} from './generators/common-files'
/**
 * selectGeneratorType is going to prompt user 
 * to select one out of 3 options:
 * 
 * First option: Boilerplate generator
 * this option is going to prepare
 * The learnWeb3DAO projects that whatever level you chose
 * 
 * Second option: Project setup
 * This option is going to setup your project to install
 * the required dependencies along with common code
 * 
 * Third option:Openzeppelin token standards generator
 * This option is going to generate whatever token standard you want to implement
 * and whatever functions you want to override in your contract
 */
async function selectGeneratorType() {
    const options = []
    options.push({
        type: "list",
        name: "option",
        message: "select generator type: ",
        choices: [
            "Boilerplate generator",
            "Project setup",
            "Openzeppelin token standards generator"
        ]
    });
    
    const answers = await inquirer.prompt(options);
    
    // generate track levels boilerplate
    if (answers.option == "Boilerplate generator") {
        boilerplateGenerator()
    }

    // preparing backend and frontend of the project
    else if (answers.option == "Project setup") {
        selectFrontendOrBackend()
    }

    // will generate the overriding methods of Openzeppelin token standards
    else {
        console.log('Openzeppelin token standards')
    }

}

export async function cli() {
    await selectGeneratorType()
}