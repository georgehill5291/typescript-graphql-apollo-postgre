import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
};

export type CreateFilmInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  imageBanner: Scalars['String'];
};

export type CreatePostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Film = {
  __typename?: 'Film';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  imageBanner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type FilmMutationResponse = IMutationRepsponse & {
  __typename?: 'FilmMutationResponse';
  code: Scalars['Float'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  film?: Maybe<Film>;
  error?: Maybe<Array<FieldError>>;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type IMutationRepsponse = {
  code: Scalars['Float'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostMutationResponse;
  updatePost: PostMutationResponse;
  deletePost: PostMutationResponse;
  vote: PostMutationResponse;
  register?: Maybe<UserMutationResponse>;
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserMutationResponse;
  createFilm: FilmMutationResponse;
  updateFilm: FilmMutationResponse;
  deleteFilm: FilmMutationResponse;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationVoteArgs = {
  inputVoteValue: VoteType;
  postId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  userId: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateFilmArgs = {
  createFilmInput: CreateFilmInput;
};


export type MutationUpdateFilmArgs = {
  updateFilmInput: UpdateFilmInput;
};


export type MutationDeleteFilmArgs = {
  id: Scalars['ID'];
};

export type PaginatedFilms = {
  __typename?: 'PaginatedFilms';
  totalCount: Scalars['Float'];
  paginatedFilms: Array<Film>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  totalCount: Scalars['Float'];
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedPosts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  voteType: Scalars['Float'];
  point: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  textSnippet: Scalars['String'];
};

export type PostMutationResponse = IMutationRepsponse & {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  error?: Maybe<Array<FieldError>>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts?: Maybe<PaginatedPosts>;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  films?: Maybe<PaginatedFilms>;
  film?: Maybe<Film>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryFilmsArgs = {
  start: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryFilmArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateFilmInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  imageBanner: Scalars['String'];
};

export type UpdatePostInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserMutationResponse = IMutationRepsponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  error?: Maybe<Array<FieldError>>;
};

export enum VoteType {
  Upvote = 'Upvote',
  Downvote = 'Downvote'
}

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type FilmFragmentFragment = { __typename?: 'Film', id: string, title: string, description: string, url: string, imageBanner: string, createdAt: any, updatedAt: any };

export type FilmMutationResponseFragment = { __typename?: 'FilmMutationResponse', code: number, success: boolean, message?: Maybe<string>, film?: Maybe<{ __typename?: 'Film', id: string, title: string, description: string, url: string, imageBanner: string, createdAt: any, updatedAt: any }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> };

export type MutationStatusesFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string> };

export type PostMutationStatusesFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: Maybe<string> };

export type PostFragmentFragment = { __typename?: 'Post', id: string, title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, point: number, voteType: number, user: { __typename?: 'User', id: string, username: string } };

export type PostMutationResponseFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: Maybe<string>, post?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, point: number, voteType: number, user: { __typename?: 'User', id: string, username: string } }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, email: string };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> };

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: Maybe<string>, post?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, point: number, voteType: number, user: { __typename?: 'User', id: string, username: string } }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: Maybe<string> } };

export type CreateFilmMutationVariables = Exact<{
  createFilmInput: CreateFilmInput;
}>;


export type CreateFilmMutation = { __typename?: 'Mutation', createFilm: { __typename?: 'FilmMutationResponse', code: number, success: boolean, message?: Maybe<string>, film?: Maybe<{ __typename?: 'Film', id: string, title: string, description: string, url: string, imageBanner: string, createdAt: any, updatedAt: any }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UpdateFilmMutationVariables = Exact<{
  updateFilmInput: UpdateFilmInput;
}>;


export type UpdateFilmMutation = { __typename?: 'Mutation', updateFilm: { __typename?: 'FilmMutationResponse', code: number, success: boolean, message?: Maybe<string>, film?: Maybe<{ __typename?: 'Film', id: string, title: string, description: string, url: string, imageBanner: string, createdAt: any, updatedAt: any }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserMutationResponse', code: number, success: boolean, message?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> }> };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: Maybe<string>, post?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, point: number, voteType: number, user: { __typename?: 'User', id: string, username: string } }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type VoteMutationVariables = Exact<{
  inputVoteValue: VoteType;
  postId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: Maybe<string>, post?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, point: number, voteType: number, user: { __typename?: 'User', id: string, username: string } }>, error?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type FilmQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FilmQuery = { __typename?: 'Query', film?: Maybe<{ __typename?: 'Film', id: string, title: string, description: string, url: string, imageBanner: string }> };

export type FilmsQueryVariables = Exact<{
  start: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type FilmsQuery = { __typename?: 'Query', films?: Maybe<{ __typename?: 'PaginatedFilms', totalCount: number, paginatedFilms: Array<{ __typename?: 'Film', id: string, title: string, description: string, url: string, imageBanner: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, email: string }> };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: string, title: string, text: string, userId: number }> };

export type PostIdsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostIdsQuery = { __typename?: 'Query', posts?: Maybe<{ __typename?: 'PaginatedPosts', paginatedPosts: Array<{ __typename?: 'Post', id: string }> }> };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: Maybe<{ __typename?: 'PaginatedPosts', totalCount: number, cursor: any, hasMore: boolean, paginatedPosts: Array<{ __typename?: 'Post', id: string, title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, point: number, voteType: number, user: { __typename?: 'User', id: string, username: string } }> }> };

export const FilmFragmentFragmentDoc = gql`
    fragment filmFragment on Film {
  id
  title
  description
  url
  imageBanner
  createdAt
  updatedAt
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const FilmMutationResponseFragmentDoc = gql`
    fragment filmMutationResponse on FilmMutationResponse {
  code
  success
  message
  film {
    ...filmFragment
  }
  error {
    ...fieldError
  }
}
    ${FilmFragmentFragmentDoc}
${FieldErrorFragmentDoc}`;
export const PostMutationStatusesFragmentDoc = gql`
    fragment postMutationStatuses on PostMutationResponse {
  code
  success
  message
}
    `;
export const PostFragmentFragmentDoc = gql`
    fragment postFragment on Post {
  id
  title
  text
  textSnippet
  createdAt
  updatedAt
  point
  voteType
  user {
    id
    username
  }
}
    `;
export const PostMutationResponseFragmentDoc = gql`
    fragment postMutationResponse on PostMutationResponse {
  ...postMutationStatuses
  post {
    ...postFragment
  }
  error {
    ...fieldError
  }
}
    ${PostMutationStatusesFragmentDoc}
${PostFragmentFragmentDoc}
${FieldErrorFragmentDoc}`;
export const MutationStatusesFragmentDoc = gql`
    fragment mutationStatuses on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  email
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
  ...mutationStatuses
  user {
    ...userInfo
  }
  error {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${UserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($userId: String!, $token: String!, $changePasswordInput: ChangePasswordInput!) {
  changePassword(
    userId: $userId
    token: $token
    changePasswordInput: $changePasswordInput
  ) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    ...postMutationResponse
  }
}
    ${PostMutationResponseFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    ...postMutationStatuses
  }
}
    ${PostMutationStatusesFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const CreateFilmDocument = gql`
    mutation CreateFilm($createFilmInput: CreateFilmInput!) {
  createFilm(createFilmInput: $createFilmInput) {
    ...filmMutationResponse
  }
}
    ${FilmMutationResponseFragmentDoc}`;
export type CreateFilmMutationFn = Apollo.MutationFunction<CreateFilmMutation, CreateFilmMutationVariables>;

/**
 * __useCreateFilmMutation__
 *
 * To run a mutation, you first call `useCreateFilmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilmMutation, { data, loading, error }] = useCreateFilmMutation({
 *   variables: {
 *      createFilmInput: // value for 'createFilmInput'
 *   },
 * });
 */
export function useCreateFilmMutation(baseOptions?: Apollo.MutationHookOptions<CreateFilmMutation, CreateFilmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFilmMutation, CreateFilmMutationVariables>(CreateFilmDocument, options);
      }
export type CreateFilmMutationHookResult = ReturnType<typeof useCreateFilmMutation>;
export type CreateFilmMutationResult = Apollo.MutationResult<CreateFilmMutation>;
export type CreateFilmMutationOptions = Apollo.BaseMutationOptions<CreateFilmMutation, CreateFilmMutationVariables>;
export const UpdateFilmDocument = gql`
    mutation UpdateFilm($updateFilmInput: UpdateFilmInput!) {
  updateFilm(updateFilmInput: $updateFilmInput) {
    ...filmMutationResponse
  }
}
    ${FilmMutationResponseFragmentDoc}`;
export type UpdateFilmMutationFn = Apollo.MutationFunction<UpdateFilmMutation, UpdateFilmMutationVariables>;

/**
 * __useUpdateFilmMutation__
 *
 * To run a mutation, you first call `useUpdateFilmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFilmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFilmMutation, { data, loading, error }] = useUpdateFilmMutation({
 *   variables: {
 *      updateFilmInput: // value for 'updateFilmInput'
 *   },
 * });
 */
export function useUpdateFilmMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFilmMutation, UpdateFilmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFilmMutation, UpdateFilmMutationVariables>(UpdateFilmDocument, options);
      }
export type UpdateFilmMutationHookResult = ReturnType<typeof useUpdateFilmMutation>;
export type UpdateFilmMutationResult = Apollo.MutationResult<UpdateFilmMutation>;
export type UpdateFilmMutationOptions = Apollo.BaseMutationOptions<UpdateFilmMutation, UpdateFilmMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePostInput) {
    ...postMutationResponse
  }
}
    ${PostMutationResponseFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($inputVoteValue: VoteType!, $postId: Int!) {
  vote(inputVoteValue: $inputVoteValue, postId: $postId) {
    ...postMutationResponse
  }
}
    ${PostMutationResponseFragmentDoc}`;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      inputVoteValue: // value for 'inputVoteValue'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const FilmDocument = gql`
    query Film($id: ID!) {
  film(id: $id) {
    id
    title
    description
    url
    imageBanner
  }
}
    `;

/**
 * __useFilmQuery__
 *
 * To run a query within a React component, call `useFilmQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFilmQuery(baseOptions: Apollo.QueryHookOptions<FilmQuery, FilmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
      }
export function useFilmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmQuery, FilmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
        }
export type FilmQueryHookResult = ReturnType<typeof useFilmQuery>;
export type FilmLazyQueryHookResult = ReturnType<typeof useFilmLazyQuery>;
export type FilmQueryResult = Apollo.QueryResult<FilmQuery, FilmQueryVariables>;
export const FilmsDocument = gql`
    query Films($start: Int!, $limit: Int!) {
  films(start: $start, limit: $limit) {
    totalCount
    paginatedFilms {
      id
      title
      description
      url
      imageBanner
    }
  }
}
    `;

/**
 * __useFilmsQuery__
 *
 * To run a query within a React component, call `useFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmsQuery({
 *   variables: {
 *      start: // value for 'start'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFilmsQuery(baseOptions: Apollo.QueryHookOptions<FilmsQuery, FilmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmsQuery, FilmsQueryVariables>(FilmsDocument, options);
      }
export function useFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmsQuery, FilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmsQuery, FilmsQueryVariables>(FilmsDocument, options);
        }
export type FilmsQueryHookResult = ReturnType<typeof useFilmsQuery>;
export type FilmsLazyQueryHookResult = ReturnType<typeof useFilmsLazyQuery>;
export type FilmsQueryResult = Apollo.QueryResult<FilmsQuery, FilmsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: ID!) {
  post(id: $id) {
    id
    title
    text
    userId
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostIdsDocument = gql`
    query PostIds($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    paginatedPosts {
      id
    }
  }
}
    `;

/**
 * __usePostIdsQuery__
 *
 * To run a query within a React component, call `usePostIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostIdsQuery(baseOptions: Apollo.QueryHookOptions<PostIdsQuery, PostIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostIdsQuery, PostIdsQueryVariables>(PostIdsDocument, options);
      }
export function usePostIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostIdsQuery, PostIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostIdsQuery, PostIdsQueryVariables>(PostIdsDocument, options);
        }
export type PostIdsQueryHookResult = ReturnType<typeof usePostIdsQuery>;
export type PostIdsLazyQueryHookResult = ReturnType<typeof usePostIdsLazyQuery>;
export type PostIdsQueryResult = Apollo.QueryResult<PostIdsQuery, PostIdsQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    totalCount
    cursor
    hasMore
    paginatedPosts {
      ...postFragment
    }
  }
}
    ${PostFragmentFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;