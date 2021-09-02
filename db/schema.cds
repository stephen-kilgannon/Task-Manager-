namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Users : managed {
    key id        : Integer;
        firstName : String(50)@(title : '{i18n>firstName}');
        lastName  : String(50)@(title : '{i18n>lastName}');
        email     : String(50)@title : '{i18n>email}'  @assert.format : '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$';
        userId    : String(50)@(title : '{i18n>userId}');
        activity  : Composition of many Activitys
                        on activity.userId = userId;
}

entity Activitys : managed {
    key id      : Integer;
        title   : String(50)@(title : '{i18n>title}');
        dueDate : Timestamp @(title : '{i18n>dueDate}');
        status  : String(50)@(title : '{i18n>status}');
        userId  : String(50)@(title : '{i18n>userId}');
        steps   : Composition of many Steps
                      on steps.activityFK = id;
}

entity Steps : managed {
    key id         : Integer;
        title      : String(50)@(title : '{i18n>title}');
        status     : String(50)@(title : '{i18n>status}');
        activityFK : Integer;
}
