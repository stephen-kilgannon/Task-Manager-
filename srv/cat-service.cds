using {db as my} from '../db/schema';

@(requires : 'Admin')
service AdminService {

    entity Users      as projection on my.Users;
    entity Activities as projection on my.Activitys;
    entity Steps      as projection on my.Steps;

}

@(requires : 'authenticated-user')
service UserService {

    entity Users @readonly @(restrict : [{
        grant : ['READ'],
        to    : 'EndUser',
        where : 'createdBy = $user'
    }]) as projection on my.Users;

    entity Activities @(restrict : [{
        grant : [
            'READ',
            'WRITE'
        ],
        to    : 'EndUser',
        where : 'createdBy = $user'
    }]) as projection on my.Activitys;


    entity UserActivities @readonly @(restrict : [{
        grant : 'READ',
        to    : 'EndUser',
        where : 'createdBy = $user'
    }]) as
        select from Users {
            userId,
            createdBy,
            createdAt,
            activity.title,
            activity.status,
            activity.id
        };


    entity UserActivitieSteps @readonly @(restrict : [{
        grant : 'READ',
        to    : 'EndUser',
        where : 'createdBy = $user'
    }]) as
        select from Activities {
            userId,
            createdBy,
            createdAt,
            steps.id,
            steps.title,
            steps.status
        }
        where
            steps.id is not null

}
