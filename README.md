# lw3-cli
Micro CLI for web3 developers to automate the dependencies installation process and generate essential code required by common projects in both backend and frontend.

![lw3-cli](https://user-images.githubusercontent.com/29048917/165274595-a44bcbfa-aded-4154-9e61-b4f1b6a84641.png)

# Getting Started 
[![npm version](https://badge.fury.io/js/lw3-cli.svg)](https://badge.fury.io/js/lw3-cli)

## Introduction

**lw3-cli** is a micro CLI that makes the life of web3 developers easier who use hardhat in the backend and next.js in the frontend.
To set up a project using hardhat in the backend and next.js in the frontend we need to install a bunch of dependencies and generate some essential common code used in almost every project for both hardhat and next.js repetitively.
This is why **lw3-cli** is made to avoid such repetition to save time and instead spend more time on the core functionality of our project.

>Anything that you do more than twice has to be automated.
>
> *-Adam Stone, CEO, D-Tools*

The cli is developed using the following tools:
- arg 
- chalk
- clear
- esm
- figlet
- handlebars
- inquirer
- listr
- pkg-install

## Prerequisites
- You need to install node.js before using the CLI. If you don't have it installed in your computer, download it from [here](https://nodejs.org/en/download/) 

## Installation 
To install the package execute the following command

- `npm install -g lw3-cli`

**Note:** Run the command with sudo permission if you are using linux/macOS operating system and open up CMD with administrator permission if you are using windows operating system.

## CLI Usage
 Once the cli npm package is installed globally, Run the following command to use the CLI.
  
-  `lw3-cli!`

 After the execution of the command you should be able to see 5 commands shown in the following image:

<img width="1440" alt="Screen Shot 2022-05-12 at 9 19 55 AM" src="https://user-images.githubusercontent.com/78753275/167994247-8ebc1c2f-9414-43e8-8aaa-466b3a54b533.png">

### Option 1

 Choosing the first option will install hardhat with essential dependencies.

 After the execution of this command you will be asked whether if you want to install the other dependencies which consist of:

 - Your hardhat folder name which you can either choose the custom one or change it to whatever you want.

 - You will also be asked if you want to install the dotenv package. Pressing Y/y or enter will result in dotenv package's installation wheras pressing 
 N will not.

 - And the openzeppelin package.



After the installation of the packages and folder creation you should see something like this on your terminal screen.

<img width="1440" alt="Screen Shot 2022-05-12 at 9 30 21 AM" src="https://user-images.githubusercontent.com/78753275/167995393-ca718e97-5ffb-4cc2-a973-c97c5ada6825.png">

 You can now begin by typing the following commands to initiate the hardhat project as shown in the image above:

-    `cd hardhat-tutorial`

-   `npx hardhat`

Once the hardhat project is initiated,You can either run `lw3-cli` again and choose the 2nd option or type the following shortcut command to generate common files!

- `lw3-cli --gen:hardhat`

### Option 2

 Now that you have installed hardhat you need to generate the hardhat common files which you can do with the second option.

 Similarly like the first option, You need to provide your contract name, and the network you want to deploy your contract to.

 And now the following files will be created.

- contract
-.env
- hardhat.config.js/ts
- deploy.js/ts

 Here's how your terminal screen should look like: 

<img width="1440" alt="Screen Shot 2022-05-12 at 9 51 36 AM" src="https://user-images.githubusercontent.com/78753275/167997592-0dad92d1-4bbf-4e1a-a23c-5a099469e997.png">

### Option 3

  Now you need to generate your front end and selecting this option will again trigger some questions such as providing your folder name, and whether if
  you want to add tailwind css to your project.

  And now the following dependencies will be installed.

- Next.js/ts
- ethers
- web3modal
- tailwind if selected by the user

- Here's how the terminal screen should look like: 

<img width="1440" alt="Screen Shot 2022-05-12 at 9 58 13 AM" src="https://user-images.githubusercontent.com/78753275/167998290-af7ceef3-9e18-43ad-a19b-df3d6a404896.png">

### Option 4

 After entering the folder which in the picture above is (my-app) you need to install Next.js common files with the fourth option.

 You will again be asked about the deployed contract and the network name and your screen should look like this after the creation of the two files:

<img width="1440" alt="Screen Shot 2022-05-12 at 10 03 56 AM" src="https://user-images.githubusercontent.com/78753275/167998933-cb52cf36-7751-44a5-b0ad-3d7d1806092d.png">

  Well here's your dapp-starter pack :)

  But that's not all.  There's also an option for people who just want to get things done even faster.

### Option 5

  For people who will get used to the CLI option 5 will show all the shortcut commands to save even more time.

  <img width="1440" alt="Screen Shot 2022-05-12 at 10 08 25 AM" src="https://user-images.githubusercontent.com/78753275/167999444-bb84284d-8ac6-4493-9928-c8b399b085ad.png">





## Contribution

- CLI Developer -> [Ehsan Qaderi](https://github.com/qaderi-coding)
- Content Writer -> [Abbas Khan](https://github.com/Abbas-Khann)



## Licence
