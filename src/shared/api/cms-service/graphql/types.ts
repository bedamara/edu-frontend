export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    DateTime: { input: any; output: any };
    JSON: { input: any; output: any };
    Upload: { input: any; output: any };
};

export type Attempt = {
    AttemptTaskValues?: Maybe<AttemptTaskValueRelationResponseCollection>;
    CompletedAt?: Maybe<Scalars['DateTime']['output']>;
    Status?: Maybe<Enum_Attempt_Status>;
    Student?: Maybe<UsersPermissionsUserEntityResponse>;
    Test?: Maybe<TestEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AttemptAttemptTaskValuesArgs = {
    filters?: InputMaybe<AttemptTaskValueFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AttemptEntity = {
    attributes?: Maybe<Attempt>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type AttemptEntityResponse = {
    data?: Maybe<AttemptEntity>;
};

export type AttemptEntityResponseCollection = {
    data: Array<AttemptEntity>;
    meta: ResponseCollectionMeta;
};

export type AttemptFiltersInput = {
    AttemptTaskValues?: InputMaybe<AttemptTaskValueFiltersInput>;
    CompletedAt?: InputMaybe<DateTimeFilterInput>;
    Status?: InputMaybe<StringFilterInput>;
    Student?: InputMaybe<UsersPermissionsUserFiltersInput>;
    Test?: InputMaybe<TestFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<AttemptFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<AttemptFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<AttemptFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AttemptInput = {
    AttemptTaskValues?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    CompletedAt?: InputMaybe<Scalars['DateTime']['input']>;
    Status?: InputMaybe<Enum_Attempt_Status>;
    Student?: InputMaybe<Scalars['ID']['input']>;
    Test?: InputMaybe<Scalars['ID']['input']>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
};

export type AttemptRelationResponseCollection = {
    data: Array<AttemptEntity>;
};

export type AttemptTaskValue = {
    Attempt?: Maybe<AttemptEntityResponse>;
    IsCorrect?: Maybe<Scalars['Boolean']['output']>;
    Task?: Maybe<TaskEntityResponse>;
    Value?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AttemptTaskValueEntity = {
    attributes?: Maybe<AttemptTaskValue>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type AttemptTaskValueEntityResponse = {
    data?: Maybe<AttemptTaskValueEntity>;
};

export type AttemptTaskValueEntityResponseCollection = {
    data: Array<AttemptTaskValueEntity>;
    meta: ResponseCollectionMeta;
};

export type AttemptTaskValueFiltersInput = {
    Attempt?: InputMaybe<AttemptFiltersInput>;
    IsCorrect?: InputMaybe<BooleanFilterInput>;
    Task?: InputMaybe<TaskFiltersInput>;
    Value?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<AttemptTaskValueFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<AttemptTaskValueFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<AttemptTaskValueFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AttemptTaskValueInput = {
    Attempt?: InputMaybe<Scalars['ID']['input']>;
    IsCorrect?: InputMaybe<Scalars['Boolean']['input']>;
    Task?: InputMaybe<Scalars['ID']['input']>;
    Value?: InputMaybe<Scalars['String']['input']>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AttemptTaskValueRelationResponseCollection = {
    data: Array<AttemptTaskValueEntity>;
};

export type BooleanFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
    contains?: InputMaybe<Scalars['Boolean']['input']>;
    containsi?: InputMaybe<Scalars['Boolean']['input']>;
    endsWith?: InputMaybe<Scalars['Boolean']['input']>;
    eq?: InputMaybe<Scalars['Boolean']['input']>;
    eqi?: InputMaybe<Scalars['Boolean']['input']>;
    gt?: InputMaybe<Scalars['Boolean']['input']>;
    gte?: InputMaybe<Scalars['Boolean']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
    lt?: InputMaybe<Scalars['Boolean']['input']>;
    lte?: InputMaybe<Scalars['Boolean']['input']>;
    ne?: InputMaybe<Scalars['Boolean']['input']>;
    nei?: InputMaybe<Scalars['Boolean']['input']>;
    not?: InputMaybe<BooleanFilterInput>;
    notContains?: InputMaybe<Scalars['Boolean']['input']>;
    notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
    startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Class = {
    Name: Scalars['String']['output'];
    School?: Maybe<SchoolEntityResponse>;
    Students?: Maybe<UsersPermissionsUserRelationResponseCollection>;
    Teacher?: Maybe<UsersPermissionsUserEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ClassStudentsArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ClassEntity = {
    attributes?: Maybe<Class>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type ClassEntityResponse = {
    data?: Maybe<ClassEntity>;
};

export type ClassEntityResponseCollection = {
    data: Array<ClassEntity>;
    meta: ResponseCollectionMeta;
};

export type ClassFiltersInput = {
    Name?: InputMaybe<StringFilterInput>;
    School?: InputMaybe<SchoolFiltersInput>;
    Students?: InputMaybe<UsersPermissionsUserFiltersInput>;
    Teacher?: InputMaybe<UsersPermissionsUserFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<ClassFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<ClassFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<ClassFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClassInput = {
    Name?: InputMaybe<Scalars['String']['input']>;
    School?: InputMaybe<Scalars['ID']['input']>;
    Students?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    Teacher?: InputMaybe<Scalars['ID']['input']>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ClassRelationResponseCollection = {
    data: Array<ClassEntity>;
};

export type DateTimeFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
    contains?: InputMaybe<Scalars['DateTime']['input']>;
    containsi?: InputMaybe<Scalars['DateTime']['input']>;
    endsWith?: InputMaybe<Scalars['DateTime']['input']>;
    eq?: InputMaybe<Scalars['DateTime']['input']>;
    eqi?: InputMaybe<Scalars['DateTime']['input']>;
    gt?: InputMaybe<Scalars['DateTime']['input']>;
    gte?: InputMaybe<Scalars['DateTime']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
    lt?: InputMaybe<Scalars['DateTime']['input']>;
    lte?: InputMaybe<Scalars['DateTime']['input']>;
    ne?: InputMaybe<Scalars['DateTime']['input']>;
    nei?: InputMaybe<Scalars['DateTime']['input']>;
    not?: InputMaybe<DateTimeFilterInput>;
    notContains?: InputMaybe<Scalars['DateTime']['input']>;
    notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
    startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Enum_Attempt_Status =
    | 'completed'
    | 'in_progress'
    | 'not_passed'
    | 'not_started';

export type Enum_Orderedtasktheme_Blockcolor =
    | 'BLACK'
    | 'BROWN'
    | 'CYAN'
    | 'GREEN'
    | 'TEAL';

export type FileInfoInput = {
    alternativeText?: InputMaybe<Scalars['String']['input']>;
    caption?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
    contains?: InputMaybe<Scalars['Float']['input']>;
    containsi?: InputMaybe<Scalars['Float']['input']>;
    endsWith?: InputMaybe<Scalars['Float']['input']>;
    eq?: InputMaybe<Scalars['Float']['input']>;
    eqi?: InputMaybe<Scalars['Float']['input']>;
    gt?: InputMaybe<Scalars['Float']['input']>;
    gte?: InputMaybe<Scalars['Float']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
    lt?: InputMaybe<Scalars['Float']['input']>;
    lte?: InputMaybe<Scalars['Float']['input']>;
    ne?: InputMaybe<Scalars['Float']['input']>;
    nei?: InputMaybe<Scalars['Float']['input']>;
    not?: InputMaybe<FloatFilterInput>;
    notContains?: InputMaybe<Scalars['Float']['input']>;
    notContainsi?: InputMaybe<Scalars['Float']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
    startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph =
    | Attempt
    | AttemptTaskValue
    | Class
    | I18NLocale
    | OrderedTaskTheme
    | School
    | Task
    | TaskTheme
    | Test
    | UploadFile
    | UploadFolder
    | UsersPermissionsPermission
    | UsersPermissionsRole
    | UsersPermissionsUser;

export type I18NLocale = {
    code?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    name?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
    attributes?: Maybe<I18NLocale>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
    data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
    data: Array<I18NLocaleEntity>;
    meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    code?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<I18NLocaleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    contains?: InputMaybe<Scalars['ID']['input']>;
    containsi?: InputMaybe<Scalars['ID']['input']>;
    endsWith?: InputMaybe<Scalars['ID']['input']>;
    eq?: InputMaybe<Scalars['ID']['input']>;
    eqi?: InputMaybe<Scalars['ID']['input']>;
    gt?: InputMaybe<Scalars['ID']['input']>;
    gte?: InputMaybe<Scalars['ID']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    lt?: InputMaybe<Scalars['ID']['input']>;
    lte?: InputMaybe<Scalars['ID']['input']>;
    ne?: InputMaybe<Scalars['ID']['input']>;
    nei?: InputMaybe<Scalars['ID']['input']>;
    not?: InputMaybe<IdFilterInput>;
    notContains?: InputMaybe<Scalars['ID']['input']>;
    notContainsi?: InputMaybe<Scalars['ID']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    contains?: InputMaybe<Scalars['Int']['input']>;
    containsi?: InputMaybe<Scalars['Int']['input']>;
    endsWith?: InputMaybe<Scalars['Int']['input']>;
    eq?: InputMaybe<Scalars['Int']['input']>;
    eqi?: InputMaybe<Scalars['Int']['input']>;
    gt?: InputMaybe<Scalars['Int']['input']>;
    gte?: InputMaybe<Scalars['Int']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    lt?: InputMaybe<Scalars['Int']['input']>;
    lte?: InputMaybe<Scalars['Int']['input']>;
    ne?: InputMaybe<Scalars['Int']['input']>;
    nei?: InputMaybe<Scalars['Int']['input']>;
    not?: InputMaybe<IntFilterInput>;
    notContains?: InputMaybe<Scalars['Int']['input']>;
    notContainsi?: InputMaybe<Scalars['Int']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
    startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
    contains?: InputMaybe<Scalars['JSON']['input']>;
    containsi?: InputMaybe<Scalars['JSON']['input']>;
    endsWith?: InputMaybe<Scalars['JSON']['input']>;
    eq?: InputMaybe<Scalars['JSON']['input']>;
    eqi?: InputMaybe<Scalars['JSON']['input']>;
    gt?: InputMaybe<Scalars['JSON']['input']>;
    gte?: InputMaybe<Scalars['JSON']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
    lt?: InputMaybe<Scalars['JSON']['input']>;
    lte?: InputMaybe<Scalars['JSON']['input']>;
    ne?: InputMaybe<Scalars['JSON']['input']>;
    nei?: InputMaybe<Scalars['JSON']['input']>;
    not?: InputMaybe<JsonFilterInput>;
    notContains?: InputMaybe<Scalars['JSON']['input']>;
    notContainsi?: InputMaybe<Scalars['JSON']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
    startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
    /** Change user password. Confirm with the current password. */
    changePassword?: Maybe<UsersPermissionsLoginPayload>;
    createAttempt?: Maybe<AttemptEntityResponse>;
    createAttemptTaskValue?: Maybe<AttemptTaskValueEntityResponse>;
    createClass?: Maybe<ClassEntityResponse>;
    createOrderedTaskTheme?: Maybe<OrderedTaskThemeEntityResponse>;
    createSchool?: Maybe<SchoolEntityResponse>;
    createTask?: Maybe<TaskEntityResponse>;
    createTaskTheme?: Maybe<TaskThemeEntityResponse>;
    createTest?: Maybe<TestEntityResponse>;
    createUploadFile?: Maybe<UploadFileEntityResponse>;
    createUploadFolder?: Maybe<UploadFolderEntityResponse>;
    /** Create a new role */
    createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
    /** Create a new user */
    createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    deleteAttempt?: Maybe<AttemptEntityResponse>;
    deleteAttemptTaskValue?: Maybe<AttemptTaskValueEntityResponse>;
    deleteClass?: Maybe<ClassEntityResponse>;
    deleteOrderedTaskTheme?: Maybe<OrderedTaskThemeEntityResponse>;
    deleteSchool?: Maybe<SchoolEntityResponse>;
    deleteTask?: Maybe<TaskEntityResponse>;
    deleteTaskTheme?: Maybe<TaskThemeEntityResponse>;
    deleteTest?: Maybe<TestEntityResponse>;
    deleteUploadFile?: Maybe<UploadFileEntityResponse>;
    deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
    /** Delete an existing role */
    deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
    /** Delete an existing user */
    deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    /** Confirm an email users email address */
    emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
    /** Request a reset password token */
    forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
    login: UsersPermissionsLoginPayload;
    multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
    /** Register a user */
    register: UsersPermissionsLoginPayload;
    removeFile?: Maybe<UploadFileEntityResponse>;
    /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
    resetPassword?: Maybe<UsersPermissionsLoginPayload>;
    updateAttempt?: Maybe<AttemptEntityResponse>;
    updateAttemptTaskValue?: Maybe<AttemptTaskValueEntityResponse>;
    updateClass?: Maybe<ClassEntityResponse>;
    updateFileInfo: UploadFileEntityResponse;
    updateOrderedTaskTheme?: Maybe<OrderedTaskThemeEntityResponse>;
    updateSchool?: Maybe<SchoolEntityResponse>;
    updateTask?: Maybe<TaskEntityResponse>;
    updateTaskTheme?: Maybe<TaskThemeEntityResponse>;
    updateTest?: Maybe<TestEntityResponse>;
    updateUploadFile?: Maybe<UploadFileEntityResponse>;
    updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
    /** Update an existing role */
    updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
    /** Update an existing user */
    updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
    upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
    currentPassword: Scalars['String']['input'];
    password: Scalars['String']['input'];
    passwordConfirmation: Scalars['String']['input'];
};

export type MutationCreateAttemptArgs = {
    data: AttemptInput;
};

export type MutationCreateAttemptTaskValueArgs = {
    data: AttemptTaskValueInput;
};

export type MutationCreateClassArgs = {
    data: ClassInput;
};

export type MutationCreateOrderedTaskThemeArgs = {
    data: OrderedTaskThemeInput;
};

export type MutationCreateSchoolArgs = {
    data: SchoolInput;
};

export type MutationCreateTaskArgs = {
    data: TaskInput;
};

export type MutationCreateTaskThemeArgs = {
    data: TaskThemeInput;
};

export type MutationCreateTestArgs = {
    data: TestInput;
};

export type MutationCreateUploadFileArgs = {
    data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
    data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
};

export type MutationDeleteAttemptArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteAttemptTaskValueArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteClassArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteOrderedTaskThemeArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteSchoolArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteTaskArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteTaskThemeArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteTestArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteUploadFileArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteUploadFolderArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
    id: Scalars['ID']['input'];
};

export type MutationDeleteUsersPermissionsUserArgs = {
    id: Scalars['ID']['input'];
};

export type MutationEmailConfirmationArgs = {
    confirmation: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
    input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
    field?: InputMaybe<Scalars['String']['input']>;
    files: Array<InputMaybe<Scalars['Upload']['input']>>;
    ref?: InputMaybe<Scalars['String']['input']>;
    refId?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationRegisterArgs = {
    input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
    id: Scalars['ID']['input'];
};

export type MutationResetPasswordArgs = {
    code: Scalars['String']['input'];
    password: Scalars['String']['input'];
    passwordConfirmation: Scalars['String']['input'];
};

export type MutationUpdateAttemptArgs = {
    data: AttemptInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateAttemptTaskValueArgs = {
    data: AttemptTaskValueInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateClassArgs = {
    data: ClassInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateFileInfoArgs = {
    id: Scalars['ID']['input'];
    info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateOrderedTaskThemeArgs = {
    data: OrderedTaskThemeInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateSchoolArgs = {
    data: SchoolInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateTaskArgs = {
    data: TaskInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateTaskThemeArgs = {
    data: TaskThemeInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateTestArgs = {
    data: TestInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateUploadFileArgs = {
    data: UploadFileInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateUploadFolderArgs = {
    data: UploadFolderInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
    data: UsersPermissionsRoleInput;
    id: Scalars['ID']['input'];
};

export type MutationUpdateUsersPermissionsUserArgs = {
    data: UsersPermissionsUserInput;
    id: Scalars['ID']['input'];
};

export type MutationUploadArgs = {
    field?: InputMaybe<Scalars['String']['input']>;
    file: Scalars['Upload']['input'];
    info?: InputMaybe<FileInfoInput>;
    ref?: InputMaybe<Scalars['String']['input']>;
    refId?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderedTaskTheme = {
    BlockColor?: Maybe<Enum_Orderedtasktheme_Blockcolor>;
    ExamPosition?: Maybe<Scalars['Int']['output']>;
    Title?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug: Scalars['String']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderedTaskThemeEntity = {
    attributes?: Maybe<OrderedTaskTheme>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type OrderedTaskThemeEntityResponse = {
    data?: Maybe<OrderedTaskThemeEntity>;
};

export type OrderedTaskThemeEntityResponseCollection = {
    data: Array<OrderedTaskThemeEntity>;
    meta: ResponseCollectionMeta;
};

export type OrderedTaskThemeFiltersInput = {
    BlockColor?: InputMaybe<StringFilterInput>;
    ExamPosition?: InputMaybe<IntFilterInput>;
    Title?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<OrderedTaskThemeFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<OrderedTaskThemeFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<OrderedTaskThemeFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderedTaskThemeInput = {
    BlockColor?: InputMaybe<Enum_Orderedtasktheme_Blockcolor>;
    ExamPosition?: InputMaybe<Scalars['Int']['input']>;
    Title?: InputMaybe<Scalars['String']['input']>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
    page: Scalars['Int']['output'];
    pageCount: Scalars['Int']['output'];
    pageSize: Scalars['Int']['output'];
    total: Scalars['Int']['output'];
};

export type PaginationArg = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    pageSize?: InputMaybe<Scalars['Int']['input']>;
    start?: InputMaybe<Scalars['Int']['input']>;
};

export type PublicationState = 'LIVE' | 'PREVIEW';

export type Query = {
    attempt?: Maybe<AttemptEntityResponse>;
    attemptTaskValue?: Maybe<AttemptTaskValueEntityResponse>;
    attemptTaskValues?: Maybe<AttemptTaskValueEntityResponseCollection>;
    attempts?: Maybe<AttemptEntityResponseCollection>;
    class?: Maybe<ClassEntityResponse>;
    classes?: Maybe<ClassEntityResponseCollection>;
    i18NLocale?: Maybe<I18NLocaleEntityResponse>;
    i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
    me?: Maybe<UsersPermissionsMe>;
    orderedTaskTheme?: Maybe<OrderedTaskThemeEntityResponse>;
    orderedTaskThemes?: Maybe<OrderedTaskThemeEntityResponseCollection>;
    school?: Maybe<SchoolEntityResponse>;
    schools?: Maybe<SchoolEntityResponseCollection>;
    task?: Maybe<TaskEntityResponse>;
    taskTheme?: Maybe<TaskThemeEntityResponse>;
    taskThemes?: Maybe<TaskThemeEntityResponseCollection>;
    tasks?: Maybe<TaskEntityResponseCollection>;
    test?: Maybe<TestEntityResponse>;
    tests?: Maybe<TestEntityResponseCollection>;
    uploadFile?: Maybe<UploadFileEntityResponse>;
    uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
    uploadFolder?: Maybe<UploadFolderEntityResponse>;
    uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
    usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
    usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
    usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
    usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryAttemptArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryAttemptTaskValueArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryAttemptTaskValuesArgs = {
    filters?: InputMaybe<AttemptTaskValueFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryAttemptsArgs = {
    filters?: InputMaybe<AttemptFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryClassArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryClassesArgs = {
    filters?: InputMaybe<ClassFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryI18NLocaleArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryI18NLocalesArgs = {
    filters?: InputMaybe<I18NLocaleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryOrderedTaskThemeArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryOrderedTaskThemesArgs = {
    filters?: InputMaybe<OrderedTaskThemeFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QuerySchoolArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QuerySchoolsArgs = {
    filters?: InputMaybe<SchoolFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryTaskArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryTaskThemeArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryTaskThemesArgs = {
    filters?: InputMaybe<TaskThemeFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryTasksArgs = {
    filters?: InputMaybe<TaskFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryTestArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryTestsArgs = {
    filters?: InputMaybe<TestFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUploadFileArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUploadFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUploadFolderArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUploadFoldersArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUsersPermissionsRoleArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUsersPermissionsRolesArgs = {
    filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUsersPermissionsUserArgs = {
    id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUsersPermissionsUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
    pagination: Pagination;
};

export type School = {
    Classes?: Maybe<ClassRelationResponseCollection>;
    Name?: Maybe<Scalars['String']['output']>;
    Students?: Maybe<UsersPermissionsUserRelationResponseCollection>;
    Teachers?: Maybe<UsersPermissionsUserRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug: Scalars['String']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SchoolClassesArgs = {
    filters?: InputMaybe<ClassFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SchoolStudentsArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SchoolTeachersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SchoolEntity = {
    attributes?: Maybe<School>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type SchoolEntityResponse = {
    data?: Maybe<SchoolEntity>;
};

export type SchoolEntityResponseCollection = {
    data: Array<SchoolEntity>;
    meta: ResponseCollectionMeta;
};

export type SchoolFiltersInput = {
    Classes?: InputMaybe<ClassFiltersInput>;
    Name?: InputMaybe<StringFilterInput>;
    Students?: InputMaybe<UsersPermissionsUserFiltersInput>;
    Teachers?: InputMaybe<UsersPermissionsUserFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<SchoolFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<SchoolFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<SchoolFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SchoolInput = {
    Classes?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    Name?: InputMaybe<Scalars['String']['input']>;
    Students?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    Teachers?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilterInput = {
    and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    contains?: InputMaybe<Scalars['String']['input']>;
    containsi?: InputMaybe<Scalars['String']['input']>;
    endsWith?: InputMaybe<Scalars['String']['input']>;
    eq?: InputMaybe<Scalars['String']['input']>;
    eqi?: InputMaybe<Scalars['String']['input']>;
    gt?: InputMaybe<Scalars['String']['input']>;
    gte?: InputMaybe<Scalars['String']['input']>;
    in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    lt?: InputMaybe<Scalars['String']['input']>;
    lte?: InputMaybe<Scalars['String']['input']>;
    ne?: InputMaybe<Scalars['String']['input']>;
    nei?: InputMaybe<Scalars['String']['input']>;
    not?: InputMaybe<StringFilterInput>;
    notContains?: InputMaybe<Scalars['String']['input']>;
    notContainsi?: InputMaybe<Scalars['String']['input']>;
    notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    notNull?: InputMaybe<Scalars['Boolean']['input']>;
    null?: InputMaybe<Scalars['Boolean']['input']>;
    or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Task = {
    Answer?: Maybe<Scalars['String']['output']>;
    AnswerDescription?: Maybe<Scalars['JSON']['output']>;
    AttemptTaskValues?: Maybe<AttemptTaskValueRelationResponseCollection>;
    Description?: Maybe<Scalars['JSON']['output']>;
    File?: Maybe<UploadFileEntityResponse>;
    Theme?: Maybe<TaskThemeEntityResponse>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TaskAttemptTaskValuesArgs = {
    filters?: InputMaybe<AttemptTaskValueFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TaskEntity = {
    attributes?: Maybe<Task>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type TaskEntityResponse = {
    data?: Maybe<TaskEntity>;
};

export type TaskEntityResponseCollection = {
    data: Array<TaskEntity>;
    meta: ResponseCollectionMeta;
};

export type TaskFiltersInput = {
    Answer?: InputMaybe<StringFilterInput>;
    AnswerDescription?: InputMaybe<JsonFilterInput>;
    AttemptTaskValues?: InputMaybe<AttemptTaskValueFiltersInput>;
    Description?: InputMaybe<JsonFilterInput>;
    Theme?: InputMaybe<TaskThemeFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<TaskFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<TaskFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<TaskFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TaskInput = {
    Answer?: InputMaybe<Scalars['String']['input']>;
    AnswerDescription?: InputMaybe<Scalars['JSON']['input']>;
    AttemptTaskValues?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    Description?: InputMaybe<Scalars['JSON']['input']>;
    File?: InputMaybe<Scalars['ID']['input']>;
    Theme?: InputMaybe<Scalars['ID']['input']>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
};

export type TaskRelationResponseCollection = {
    data: Array<TaskEntity>;
};

export type TaskTheme = {
    Description?: Maybe<Scalars['String']['output']>;
    OrderedTaskTheme?: Maybe<OrderedTaskThemeEntityResponse>;
    Title: Scalars['String']['output'];
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug: Scalars['String']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TaskThemeEntity = {
    attributes?: Maybe<TaskTheme>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type TaskThemeEntityResponse = {
    data?: Maybe<TaskThemeEntity>;
};

export type TaskThemeEntityResponseCollection = {
    data: Array<TaskThemeEntity>;
    meta: ResponseCollectionMeta;
};

export type TaskThemeFiltersInput = {
    Description?: InputMaybe<StringFilterInput>;
    OrderedTaskTheme?: InputMaybe<OrderedTaskThemeFiltersInput>;
    Title?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<TaskThemeFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<TaskThemeFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<TaskThemeFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TaskThemeInput = {
    Description?: InputMaybe<Scalars['String']['input']>;
    OrderedTaskTheme?: InputMaybe<Scalars['ID']['input']>;
    Title?: InputMaybe<Scalars['String']['input']>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
};

export type Test = {
    AssignedTo?: Maybe<UsersPermissionsUserRelationResponseCollection>;
    Attempts?: Maybe<AttemptRelationResponseCollection>;
    AvailableAttempts?: Maybe<Scalars['Int']['output']>;
    CompleteTestBefore?: Maybe<Scalars['DateTime']['output']>;
    MadeBy?: Maybe<UsersPermissionsUserEntityResponse>;
    Tasks?: Maybe<TaskRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    publishedAt?: Maybe<Scalars['DateTime']['output']>;
    slug?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TestAssignedToArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TestAttemptsArgs = {
    filters?: InputMaybe<AttemptFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TestTasksArgs = {
    filters?: InputMaybe<TaskFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TestEntity = {
    attributes?: Maybe<Test>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type TestEntityResponse = {
    data?: Maybe<TestEntity>;
};

export type TestEntityResponseCollection = {
    data: Array<TestEntity>;
    meta: ResponseCollectionMeta;
};

export type TestFiltersInput = {
    AssignedTo?: InputMaybe<UsersPermissionsUserFiltersInput>;
    Attempts?: InputMaybe<AttemptFiltersInput>;
    AvailableAttempts?: InputMaybe<IntFilterInput>;
    CompleteTestBefore?: InputMaybe<DateTimeFilterInput>;
    MadeBy?: InputMaybe<UsersPermissionsUserFiltersInput>;
    Tasks?: InputMaybe<TaskFiltersInput>;
    and?: InputMaybe<Array<InputMaybe<TestFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<TestFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<TestFiltersInput>>>;
    publishedAt?: InputMaybe<DateTimeFilterInput>;
    slug?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TestInput = {
    AssignedTo?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    Attempts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    AvailableAttempts?: InputMaybe<Scalars['Int']['input']>;
    CompleteTestBefore?: InputMaybe<Scalars['DateTime']['input']>;
    MadeBy?: InputMaybe<Scalars['ID']['input']>;
    Tasks?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
    slug?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFile = {
    alternativeText?: Maybe<Scalars['String']['output']>;
    caption?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    ext?: Maybe<Scalars['String']['output']>;
    formats?: Maybe<Scalars['JSON']['output']>;
    hash: Scalars['String']['output'];
    height?: Maybe<Scalars['Int']['output']>;
    mime: Scalars['String']['output'];
    name: Scalars['String']['output'];
    previewUrl?: Maybe<Scalars['String']['output']>;
    provider: Scalars['String']['output'];
    provider_metadata?: Maybe<Scalars['JSON']['output']>;
    related?: Maybe<Array<Maybe<GenericMorph>>>;
    size: Scalars['Float']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    url: Scalars['String']['output'];
    width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
    attributes?: Maybe<UploadFile>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
    data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
    data: Array<UploadFileEntity>;
    meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
    alternativeText?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
    caption?: InputMaybe<StringFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    ext?: InputMaybe<StringFilterInput>;
    folder?: InputMaybe<UploadFolderFiltersInput>;
    folderPath?: InputMaybe<StringFilterInput>;
    formats?: InputMaybe<JsonFilterInput>;
    hash?: InputMaybe<StringFilterInput>;
    height?: InputMaybe<IntFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    mime?: InputMaybe<StringFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UploadFileFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
    previewUrl?: InputMaybe<StringFilterInput>;
    provider?: InputMaybe<StringFilterInput>;
    provider_metadata?: InputMaybe<JsonFilterInput>;
    size?: InputMaybe<FloatFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    url?: InputMaybe<StringFilterInput>;
    width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
    alternativeText?: InputMaybe<Scalars['String']['input']>;
    caption?: InputMaybe<Scalars['String']['input']>;
    ext?: InputMaybe<Scalars['String']['input']>;
    folder?: InputMaybe<Scalars['ID']['input']>;
    folderPath?: InputMaybe<Scalars['String']['input']>;
    formats?: InputMaybe<Scalars['JSON']['input']>;
    hash?: InputMaybe<Scalars['String']['input']>;
    height?: InputMaybe<Scalars['Int']['input']>;
    mime?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    previewUrl?: InputMaybe<Scalars['String']['input']>;
    provider?: InputMaybe<Scalars['String']['input']>;
    provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
    size?: InputMaybe<Scalars['Float']['input']>;
    url?: InputMaybe<Scalars['String']['input']>;
    width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
    data: Array<UploadFileEntity>;
};

export type UploadFolder = {
    children?: Maybe<UploadFolderRelationResponseCollection>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    files?: Maybe<UploadFileRelationResponseCollection>;
    name: Scalars['String']['output'];
    parent?: Maybe<UploadFolderEntityResponse>;
    path: Scalars['String']['output'];
    pathId: Scalars['Int']['output'];
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UploadFolderChildrenArgs = {
    filters?: InputMaybe<UploadFolderFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderFilesArgs = {
    filters?: InputMaybe<UploadFileFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
    attributes?: Maybe<UploadFolder>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
    data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
    data: Array<UploadFolderEntity>;
    meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
    children?: InputMaybe<UploadFolderFiltersInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    files?: InputMaybe<UploadFileFiltersInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UploadFolderFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
    parent?: InputMaybe<UploadFolderFiltersInput>;
    path?: InputMaybe<StringFilterInput>;
    pathId?: InputMaybe<IntFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
    children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    name?: InputMaybe<Scalars['String']['input']>;
    parent?: InputMaybe<Scalars['ID']['input']>;
    path?: InputMaybe<Scalars['String']['input']>;
    pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
    data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
    ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
    ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
    identifier: Scalars['String']['input'];
    password: Scalars['String']['input'];
    provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
    jwt?: Maybe<Scalars['String']['output']>;
    user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
    blocked?: Maybe<Scalars['Boolean']['output']>;
    confirmed?: Maybe<Scalars['Boolean']['output']>;
    email?: Maybe<Scalars['String']['output']>;
    firstName?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    lastName?: Maybe<Scalars['String']['output']>;
    middleName?: Maybe<Scalars['String']['output']>;
    role?: Maybe<UsersPermissionsMeRole>;
    username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
    ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
    action: Scalars['String']['output'];
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
    attributes?: Maybe<UsersPermissionsPermission>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
    action?: InputMaybe<StringFilterInput>;
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
    data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    description?: Maybe<Scalars['String']['output']>;
    name: Scalars['String']['output'];
    permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
    type?: Maybe<Scalars['String']['output']>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
    filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleUsersArgs = {
    filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
    attributes?: Maybe<UsersPermissionsRole>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
    data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
    data: Array<UsersPermissionsRoleEntity>;
    meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    description?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    name?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
    permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
    type?: InputMaybe<StringFilterInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    type?: InputMaybe<Scalars['String']['input']>;
    users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
    ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
    attempts?: Maybe<AttemptRelationResponseCollection>;
    blocked?: Maybe<Scalars['Boolean']['output']>;
    confirmed?: Maybe<Scalars['Boolean']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    email: Scalars['String']['output'];
    firstName: Scalars['String']['output'];
    lastName: Scalars['String']['output'];
    middleName?: Maybe<Scalars['String']['output']>;
    provider?: Maybe<Scalars['String']['output']>;
    role?: Maybe<UsersPermissionsRoleEntityResponse>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    username: Scalars['String']['output'];
};

export type UsersPermissionsUserAttemptsArgs = {
    filters?: InputMaybe<AttemptFiltersInput>;
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsUserEntity = {
    attributes?: Maybe<UsersPermissionsUser>;
    id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
    data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
    data: Array<UsersPermissionsUserEntity>;
    meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
    and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    attempts?: InputMaybe<AttemptFiltersInput>;
    blocked?: InputMaybe<BooleanFilterInput>;
    confirmationToken?: InputMaybe<StringFilterInput>;
    confirmed?: InputMaybe<BooleanFilterInput>;
    createdAt?: InputMaybe<DateTimeFilterInput>;
    email?: InputMaybe<StringFilterInput>;
    firstName?: InputMaybe<StringFilterInput>;
    id?: InputMaybe<IdFilterInput>;
    lastName?: InputMaybe<StringFilterInput>;
    middleName?: InputMaybe<StringFilterInput>;
    not?: InputMaybe<UsersPermissionsUserFiltersInput>;
    or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
    password?: InputMaybe<StringFilterInput>;
    provider?: InputMaybe<StringFilterInput>;
    resetPasswordToken?: InputMaybe<StringFilterInput>;
    role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
    updatedAt?: InputMaybe<DateTimeFilterInput>;
    username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
    attempts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
    blocked?: InputMaybe<Scalars['Boolean']['input']>;
    confirmationToken?: InputMaybe<Scalars['String']['input']>;
    confirmed?: InputMaybe<Scalars['Boolean']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    firstName?: InputMaybe<Scalars['String']['input']>;
    lastName?: InputMaybe<Scalars['String']['input']>;
    middleName?: InputMaybe<Scalars['String']['input']>;
    password?: InputMaybe<Scalars['String']['input']>;
    provider?: InputMaybe<Scalars['String']['input']>;
    resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
    role?: InputMaybe<Scalars['ID']['input']>;
    username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
    data: Array<UsersPermissionsUserEntity>;
};

export type LoadAttemptsQueryVariables = Exact<{
    filters?: InputMaybe<AttemptFiltersInput>;
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<
        | Array<InputMaybe<Scalars['String']['input']>>
        | InputMaybe<Scalars['String']['input']>
    >;
    attemptTaskValuesPublicationState2?: InputMaybe<PublicationState>;
    attemptTaskValuesPagination2?: InputMaybe<PaginationArg>;
}>;

export type LoadAttemptsQuery = {
    attempts?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                CompletedAt?: any | null;
                slug?: string | null;
                Status?: Enum_Attempt_Status | null;
                publishedAt?: any | null;
                Test?: {
                    data?: {
                        id?: string | null;
                        attributes?: {
                            slug?: string | null;
                            CompleteTestBefore?: any | null;
                        } | null;
                    } | null;
                } | null;
                Student?: { data?: { id?: string | null } | null } | null;
                AttemptTaskValues?: {
                    data: Array<{
                        id?: string | null;
                        attributes?: {
                            IsCorrect?: boolean | null;
                            Value?: string | null;
                            Task?: {
                                data?: { id?: string | null } | null;
                            } | null;
                            Attempt?: {
                                data?: { id?: string | null } | null;
                            } | null;
                        } | null;
                    }>;
                } | null;
            } | null;
        }>;
    } | null;
};

export type LoadAllAttemptsByIdsQueryVariables = Exact<{
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    filters?: InputMaybe<AttemptFiltersInput>;
    attemptTaskValuesPublicationState2?: InputMaybe<PublicationState>;
    attemptTaskValuesPagination2?: InputMaybe<PaginationArg>;
    tasksPublicationState2?: InputMaybe<PublicationState>;
    tasksPagination2?: InputMaybe<PaginationArg>;
}>;

export type LoadAllAttemptsByIdsQuery = {
    attempts?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                CompletedAt?: any | null;
                slug?: string | null;
                Status?: Enum_Attempt_Status | null;
                publishedAt?: any | null;
                Student?: { data?: { id?: string | null } | null } | null;
                Test?: {
                    data?: {
                        id?: string | null;
                        attributes?: {
                            slug?: string | null;
                            CompleteTestBefore?: any | null;
                            Tasks?: {
                                data: Array<{ id?: string | null }>;
                            } | null;
                        } | null;
                    } | null;
                } | null;
                AttemptTaskValues?: {
                    data: Array<{
                        id?: string | null;
                        attributes?: { IsCorrect?: boolean | null } | null;
                    }>;
                } | null;
            } | null;
        }>;
    } | null;
};

export type CreateAttemptMutationVariables = Exact<{
    data: AttemptInput;
}>;

export type CreateAttemptMutation = {
    createAttempt?: {
        data?: {
            id?: string | null;
            attributes?: {
                CompletedAt?: any | null;
                slug?: string | null;
                Status?: Enum_Attempt_Status | null;
                publishedAt?: any | null;
                Test?: {
                    data?: {
                        id?: string | null;
                        attributes?: { slug?: string | null } | null;
                    } | null;
                } | null;
                Student?: { data?: { id?: string | null } | null } | null;
            } | null;
        } | null;
    } | null;
};

export type UpdateAttemptMutationVariables = Exact<{
    updateAttemptId: Scalars['ID']['input'];
    data: AttemptInput;
}>;

export type UpdateAttemptMutation = {
    updateAttempt?: { data?: { id?: string | null } | null } | null;
};

export type CreateAttemptTaskValueMutationVariables = Exact<{
    data: AttemptTaskValueInput;
}>;

export type CreateAttemptTaskValueMutation = {
    createAttemptTaskValue?: {
        data?: {
            id?: string | null;
            attributes?: {
                IsCorrect?: boolean | null;
                Value?: string | null;
                publishedAt?: any | null;
                Attempt?: { data?: { id?: string | null } | null } | null;
                Task?: { data?: { id?: string | null } | null } | null;
            } | null;
        } | null;
    } | null;
};

export type UpdateAttemptTaskValueMutationVariables = Exact<{
    updateAttemptTaskValueId: Scalars['ID']['input'];
    data: AttemptTaskValueInput;
}>;

export type UpdateAttemptTaskValueMutation = {
    updateAttemptTaskValue?: {
        data?: {
            id?: string | null;
            attributes?: {
                publishedAt?: any | null;
                Value?: string | null;
                IsCorrect?: boolean | null;
                Task?: { data?: { id?: string | null } | null } | null;
                Attempt?: { data?: { id?: string | null } | null } | null;
            } | null;
        } | null;
    } | null;
};

export type LoadAllAttemptValuesQueryVariables = Exact<{
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    filters?: InputMaybe<AttemptFiltersInput>;
    attemptTaskValuesPublicationState2?: InputMaybe<PublicationState>;
    attemptTaskValuesPagination2?: InputMaybe<PaginationArg>;
}>;

export type LoadAllAttemptValuesQuery = {
    attempts?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                Student?: { data?: { id?: string | null } | null } | null;
                AttemptTaskValues?: {
                    data: Array<{
                        attributes?: {
                            IsCorrect?: boolean | null;
                            Task?: {
                                data?: {
                                    id?: string | null;
                                    attributes?: {
                                        Theme?: {
                                            data?: {
                                                id?: string | null;
                                            } | null;
                                        } | null;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    }>;
                } | null;
            } | null;
        }>;
    } | null;
};

export type LoginMutationVariables = Exact<{
    input: UsersPermissionsLoginInput;
}>;

export type LoginMutation = {
    login: {
        jwt?: string | null;
        user: {
            id: string;
            email?: string | null;
            blocked?: boolean | null;
            confirmed?: boolean | null;
            firstName?: string | null;
            lastName?: string | null;
            username: string;
            role?: { name: string } | null;
        };
    };
};

export type LoadUserRolesQueryVariables = Exact<{ [key: string]: never }>;

export type LoadUserRolesQuery = {
    me?: { role?: { name: string } | null } | null;
};

export type LoadClassesDataQueryVariables = Exact<{
    filters?: InputMaybe<ClassFiltersInput>;
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
}>;

export type LoadClassesDataQuery = {
    classes?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                Name: string;
                Students?: {
                    data: Array<{
                        id?: string | null;
                        attributes?: {
                            firstName: string;
                            lastName: string;
                            email: string;
                        } | null;
                    }>;
                } | null;
                School?: {
                    data?: {
                        id?: string | null;
                        attributes?: { Name?: string | null } | null;
                    } | null;
                } | null;
                Teacher?: {
                    data?: {
                        id?: string | null;
                        attributes?: {
                            firstName: string;
                            lastName: string;
                            middleName?: string | null;
                            email: string;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
    } | null;
};

export type LoadTasksDataQueryVariables = Exact<{
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<
        | Array<InputMaybe<Scalars['String']['input']>>
        | InputMaybe<Scalars['String']['input']>
    >;
    filters?: InputMaybe<TaskFiltersInput>;
}>;

export type LoadTasksDataQuery = {
    tasks?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                AnswerDescription?: any | null;
                Description?: any | null;
                slug?: string | null;
                Answer?: string | null;
                File?: {
                    data?: {
                        id?: string | null;
                        attributes?: {
                            url: string;
                            caption?: string | null;
                            alternativeText?: string | null;
                        } | null;
                    } | null;
                } | null;
                Theme?: {
                    data?: {
                        id?: string | null;
                        attributes?: {
                            OrderedTaskTheme?: {
                                data?: {
                                    id?: string | null;
                                    attributes?: {
                                        ExamPosition?: number | null;
                                    } | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null;
                } | null;
            } | null;
        }>;
    } | null;
};

export type LoadTasksWithAnswersQueryVariables = Exact<{
    pagination?: InputMaybe<PaginationArg>;
    publicationState?: InputMaybe<PublicationState>;
    sort?: InputMaybe<
        | Array<InputMaybe<Scalars['String']['input']>>
        | InputMaybe<Scalars['String']['input']>
    >;
    filters?: InputMaybe<TaskFiltersInput>;
}>;

export type LoadTasksWithAnswersQuery = {
    tasks?: {
        data: Array<{
            id?: string | null;
            attributes?: { Answer?: string | null } | null;
        }>;
    } | null;
};

export type LoadTasksListQueryVariables = Exact<{
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    sort?: InputMaybe<
        | Array<InputMaybe<Scalars['String']['input']>>
        | InputMaybe<Scalars['String']['input']>
    >;
}>;

export type LoadTasksListQuery = {
    tasks?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                Theme?: { data?: { id?: string | null } | null } | null;
            } | null;
        }>;
    } | null;
};

export type CreateTestMutationVariables = Exact<{
    data: TestInput;
}>;

export type CreateTestMutation = {
    createTest?: {
        data?: {
            id?: string | null;
            attributes?: { slug?: string | null } | null;
        } | null;
    } | null;
};

export type LoadTestBySlugQueryVariables = Exact<{
    filters?: InputMaybe<TestFiltersInput>;
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    tasksPagination2?: InputMaybe<PaginationArg>;
    assignedToPagination2?: InputMaybe<PaginationArg>;
}>;

export type LoadTestBySlugQuery = {
    tests?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                CompleteTestBefore?: any | null;
                AvailableAttempts?: number | null;
                publishedAt?: any | null;
                Tasks?: { data: Array<{ id?: string | null }> } | null;
                MadeBy?: { data?: { id?: string | null } | null } | null;
                AssignedTo?: { data: Array<{ id?: string | null }> } | null;
            } | null;
        }>;
    } | null;
};

export type LoadAllUserTestsQueryVariables = Exact<{
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    filters?: InputMaybe<TestFiltersInput>;
    tasksPagination2?: InputMaybe<PaginationArg>;
    assignedToPagination2?: InputMaybe<PaginationArg>;
}>;

export type LoadAllUserTestsQuery = {
    tests?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                AvailableAttempts?: number | null;
                CompleteTestBefore?: any | null;
                publishedAt?: any | null;
                slug?: string | null;
                MadeBy?: { data?: { id?: string | null } | null } | null;
                Tasks?: { data: Array<{ id?: string | null }> } | null;
                AssignedTo?: { data: Array<{ id?: string | null }> } | null;
            } | null;
        }>;
    } | null;
};

export type LoadTestInfoBySlugQueryVariables = Exact<{
    filters?: InputMaybe<TestFiltersInput>;
}>;

export type LoadTestInfoBySlugQuery = {
    tests?: { data: Array<{ id?: string | null }> } | null;
};

export type LoadThemesDataQueryVariables = Exact<{
    sort?: InputMaybe<
        | Array<InputMaybe<Scalars['String']['input']>>
        | InputMaybe<Scalars['String']['input']>
    >;
    publicationState?: InputMaybe<PublicationState>;
    pagination?: InputMaybe<PaginationArg>;
    taskThemesPagination2?: InputMaybe<PaginationArg>;
    taskThemesPublicationState2?: InputMaybe<PublicationState>;
    filters?: InputMaybe<OrderedTaskThemeFiltersInput>;
    taskThemesFilters2?: InputMaybe<TaskThemeFiltersInput>;
}>;

export type LoadThemesDataQuery = {
    orderedTaskThemes?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                ExamPosition?: number | null;
                Title?: string | null;
                slug: string;
                BlockColor?: Enum_Orderedtasktheme_Blockcolor | null;
            } | null;
        }>;
    } | null;
    taskThemes?: {
        data: Array<{
            id?: string | null;
            attributes?: {
                Title: string;
                slug: string;
                OrderedTaskTheme?: {
                    data?: { id?: string | null } | null;
                } | null;
            } | null;
        }>;
    } | null;
};
