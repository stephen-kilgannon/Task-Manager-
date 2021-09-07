## Cloud application Programing Model 

<hr>

## Development Platforms 
### Business Application Studio: 
 *note: Business Application Studio = BAS*

setup: 

1. From the BTP cokpit navigate to you subaccount
2. Click on Entitlements
3. Configure Entitlements
4. Add Service Plans 
5. Search Business Application Studio (BAS)
![BAS](/Images/BAS.png)
6. Navigate to Services -> Instances and Subscriptions
7. Select BAS to access
8. ![BAS](/Images/BAS-access.png)
9. Select "Create Dev Space"
![BAS Space](/Images/BAS-space.png)


<br>

## Visual Studio Code:

*note: Visual Studio Code = VS code*

Check out the developer mission on [this](https://developers.sap.com/tutorials/btp-app-set-up-local-development.html)

<br> 

setup: 
1. Install [VS code](https://code.visualstudio.com/download)
2. Install [Node](https://nodejs.org/en/download/) -> ensure you add this to the user enviromental variables for [help](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8-and-10)
3. Open VS code and run a terminal - check instilations with the -v as below
![VS Code](/Images/VS-code.png)
4. Open Extensions and add SAP CDS Language Support
![VS-EXT](/Images/vs-ext.png)
<br>

<hr>

<br>

## Getting Started 
1. Run command `npm install -g @sap/cds-dk`<br>
   *This instals the development kit for cap globally*

2. In the terminal run `cds init`
   
Welcome to your new project.

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`         | content for UI frontends goes here   |
| `db/`          | your domain models and data go here  |
| `srv/`         | your service models and code go here |
| `package.json` | project metadata and configuration   |
| `readme.md`    | this getting started guide           |


### Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


### Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.


