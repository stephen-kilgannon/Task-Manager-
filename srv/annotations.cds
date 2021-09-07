annotate UserService.Users with @(

UI : {
    SelectionFields : [
        userId,
        email
    ],
    LineItem        : [
        {Value : id},
        {Value : firstName},
        {Value : lastName},
        {Value : email}
    ]
});

annotate UserService.UserActivities with @(UI : {

    SelectionFields  : [activity.status],
    FieldGroup #Main : {Data : [
        {Value : activity.id},
        {
            Value       : prio,
            Criticality : criticality
        },
        {
            Value       : impact,
            Criticality : criticality
        }
    ]}
}, ) {

};
