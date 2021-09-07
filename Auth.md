## Authentication

Documentation [Capire-Auth]([Capire-Auth](https://cap.cloud.sap/docs/node.js/authentication)
)

### Mocked Auth 

Mocked authentication camn be used in development. To add this you must place this either in the .cdsrc.json 

``` json {
  "requires": {
    "auth": {
      "strategy": "mock",
      "users": {
        "<YOUR_USER>": {
          "password": "YOUR PASSWORD",
          "roles": [
            "YOUR-ROLE",
            "ADMIN"
          ]
        }
      }
    }
  }
}
```

or in the package.json under the cds section 

``` json 
  "cds": {
    "requires": {
      "db": {
        "kind": "hana"
      },
    "auth": {
      "strategy": "mock",
      "users": {
        "<YOUR_USER>": {
          "password": "YOUR PASSWORD",
          "roles": [
            "YOUR-ROLE",
            "ADMIN"
          ]
        }
      }
    }
```

In the mocked authentication you are creating users and providing a passowrd. However in production this would not suffice.

### Add Authentication to your CAP project. 

In the srv folder we have our service definition. On this service definition you need to use annotations to "Turn on and configure" the authentication. 

``` js
@(requires : 'authenticated-user') // Turns on Auth
service UserService {

    entity Users @readonly @(restrict : [{ // restrict defines specific rules 
        grant : ['READ'], //Operations ['READ','WRITE', etc....]
        to    : 'EndUser', // This is a role
        where : 'createdBy = $user' // $user is the cuurrent user
    }]) as projection on my.Users;
```


### JWT based Authentication 

As seen above we are manually providing users and roles to our application. BTP has a service called  [user account and authentication’ service]([https://link](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/6373bb7a96114d619bfdfdc6f505d1b9.html)) (UAA). This can be configured in SAP BTP at the subaccount level.
![BTP-Security](/Images/BTP-security.png) 

Now that we have our service defined with authentication annotations we can now use the cds compile command which will take our service definition and extract all the required info and write this to a file called xs-security.json that is just like a descripter file for creating the uaa service. 

1. Open a terminal at the root of your project 
2. `cds compile srv/ --to xsuaa > ./xs-security.json`<br>
 This creates a file in the root of the project and it describes all the roles that we outlined in the service

3. `npm install @sap/xssec @sap/xsenv`<br>This installs the sap provided packages and lists this information in the package.json file
4. `cf create-service xsuaa application CAP-kt-uaa -c xs-security.json`<br>Using the cloud foundry CLI you can create the xsuaa in such a way. <br> **OR** <br>
Add configuration in the mta.yaml file (this file is a configuration file for cf)
``` yaml
 - name: CAP-kt-uaa
   type: com.sap.xs.uaa-space
   parameters:
      path: ./xs-security.json
      service: xsuaa

```

*NOTE: Make sure you indent the mta.yaml file correctly or you will get errors*

In the mta.yaml requires of the service add CAP-kt-uaa to the srv module like so 
```yaml
 # --------------------- SERVER MODULE ------------------------
 - name: CAP-kt-srv
 # ------------------------------------------------------------
   type: nodejs
   path: gen/srv
   parameters:
     buildpack: nodejs_buildpack
   requires:
    - name: CAP-kt-uaa #HERE
    - name: CAP-kt-hdi
   provides:
    - name: srv-api      # required by consumers of CAP services (e.g. approuter)
      properties:
        srv-url: ${default-url}
        
```

In you package.json we now need to update the authentication to use the UAA service

```json
"cds": {
  "requires": {
 "uaa": {
   "kind": "xsuaa"
 }
  }
}
```

1. `mta build`
2. cd into mta_archive and run `cf deploy .\CAP-kt_1.0.0.mtar`

*We now see a service instance for UAA and it is bound to our CAP modules*

### Set Roles in BTP for your Application

once you have deployed the above you can see the roles that were created by the xs-security.json file. 
![view rolse](/Images/viewRoles.png)

make a collection and add user

![add collection](/Images/createRoleCollection.png)

![config](/Images/configCollection.png)

Navigating to security -> Trust Configuration on inputting your email you can see the assigned collections to your user. 

![check roles](/Images/checkRoles.png)



### Adding the application Router

The approuter component implements the necessary handshake with XSUAA to let the user log in interactively. The resulting JWT token is sent to the application where it’s used to enforce authorization.

![tst](/)