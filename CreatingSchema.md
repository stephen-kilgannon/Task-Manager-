### Schema 

As we are aware we have three modulas in our project db, srv, app. Lets get a model built. 

In the db folder create a file called schema.cds call it what you like so long as the prefix .cds is there.  


Provide a namespace so you can use this to referance this model easily. 

Import common aspects provided by SAP by using the using command. 

Define an entity use upper case and plural to describe the entity. For the attributes use singular names using whatever case styling your desire reccomended is camelCasing. 

*Think about it an entity is a set of data but each record(attributes) are a singular representation of the data. 

![data model](/Images/dataModel.png)

*Managed is pulling the aspect from sap common to extend your model with fields navigate to the file by pressing ctrl click on @sap/cds/common to see*

### Adding Initial Data

In a terminal run `cds add data` notice this creates a data folder with all files for initial data for each entity you described as well as the heddings. 

Notice the sap managed fields also get populated ;)


Adding this in the package.json allows you to use the quoated names otherwise this is uppercase
 
"data": {
      "sql_mapping": "quoted"
    }

*Use inital data for development or only system configuraton NEVER for tables that will be written to by the application as you WILL lose application data as these hdbtable artifactes that get created will take ownership and leave you with a data loss. Best bet just use it for development*



### Data modeling 

Data can be related, for example in our to-do app we have a User this user can have many activies each activity in turn can have a number of steps to complete. 

users -> Activities 1:m
Activities -> steps 1:m 

**Types of relationships**

1:m one-to-many (most common) a team has one manager but the manager has multiple employees. 

m:m many to many (rare) - A team needs to learn new skills. Each skill can be learned by many employees so Employee learns Skills M:n

1:1 one-to-one (rare) - A team has a manager a manager can only manage one team (lets just say its policy) at a time so. Manager to Team is 1:1 

*Note m:m relationships are not supported directly in relational databases you create a Bridge Entity (an entity soley to handle the relationship) to break M:n int two 1:m relationships*
