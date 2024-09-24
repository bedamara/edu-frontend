import {
    Class,
    ClassEntity,
    School,
    SchoolEntity,
    UsersPermissionsUser,
    UsersPermissionsUserEntity,
} from '@/shared/api/cms-service/graphql/types';

export type SchoolType = Pick<SchoolEntity, 'id'> & Pick<School, 'Name'>;

export type StudentType = Pick<UsersPermissionsUserEntity, 'id'> &
    Pick<UsersPermissionsUser, 'firstName' | 'lastName' | 'email'>;

export type TeacherType = Pick<UsersPermissionsUserEntity, 'id'> &
    Pick<
        UsersPermissionsUser,
        'firstName' | 'lastName' | 'middleName' | 'email'
    >;

export type SchoolClass = Pick<ClassEntity, 'id'> &
    Pick<Class, 'Name'> & {
        School: SchoolType;
        Students: Array<StudentType>;
        Teacher: TeacherType;
    };
