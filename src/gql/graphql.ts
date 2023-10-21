/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  float8: { input: any; output: any; }
  smallint: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "countries" */
export type Countries = {
  __typename?: 'countries';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/** aggregated selection of "countries" */
export type Countries_Aggregate = {
  __typename?: 'countries_aggregate';
  aggregate?: Maybe<Countries_Aggregate_Fields>;
  nodes: Array<Countries>;
};

/** aggregate fields of "countries" */
export type Countries_Aggregate_Fields = {
  __typename?: 'countries_aggregate_fields';
  avg?: Maybe<Countries_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Countries_Max_Fields>;
  min?: Maybe<Countries_Min_Fields>;
  stddev?: Maybe<Countries_Stddev_Fields>;
  stddev_pop?: Maybe<Countries_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Countries_Stddev_Samp_Fields>;
  sum?: Maybe<Countries_Sum_Fields>;
  var_pop?: Maybe<Countries_Var_Pop_Fields>;
  var_samp?: Maybe<Countries_Var_Samp_Fields>;
  variance?: Maybe<Countries_Variance_Fields>;
};


/** aggregate fields of "countries" */
export type Countries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Countries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Countries_Avg_Fields = {
  __typename?: 'countries_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "countries". All fields are combined with a logical 'AND'. */
export type Countries_Bool_Exp = {
  _and?: InputMaybe<Array<Countries_Bool_Exp>>;
  _not?: InputMaybe<Countries_Bool_Exp>;
  _or?: InputMaybe<Array<Countries_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "countries" */
export enum Countries_Constraint {
  /** unique or primary key constraint on columns "id" */
  CountriesPkey = 'countries_pkey'
}

/** input type for incrementing numeric columns in table "countries" */
export type Countries_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "countries" */
export type Countries_Insert_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Countries_Max_Fields = {
  __typename?: 'countries_max_fields';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Countries_Min_Fields = {
  __typename?: 'countries_min_fields';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "countries" */
export type Countries_Mutation_Response = {
  __typename?: 'countries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Countries>;
};

/** on_conflict condition type for table "countries" */
export type Countries_On_Conflict = {
  constraint: Countries_Constraint;
  update_columns?: Array<Countries_Update_Column>;
  where?: InputMaybe<Countries_Bool_Exp>;
};

/** Ordering options when selecting data from "countries". */
export type Countries_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: countries */
export type Countries_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "countries" */
export enum Countries_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "countries" */
export type Countries_Set_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Countries_Stddev_Fields = {
  __typename?: 'countries_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Countries_Stddev_Pop_Fields = {
  __typename?: 'countries_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Countries_Stddev_Samp_Fields = {
  __typename?: 'countries_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "countries" */
export type Countries_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Countries_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Countries_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Countries_Sum_Fields = {
  __typename?: 'countries_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "countries" */
export enum Countries_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Countries_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Countries_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Countries_Set_Input>;
  /** filter the rows which have to be updated */
  where: Countries_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Countries_Var_Pop_Fields = {
  __typename?: 'countries_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Countries_Var_Samp_Fields = {
  __typename?: 'countries_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Countries_Variance_Fields = {
  __typename?: 'countries_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "drone_telemetry" */
export type Drone_Telemetry = {
  __typename?: 'drone_telemetry';
  altitude?: Maybe<Scalars['float8']['output']>;
  battery?: Maybe<Scalars['smallint']['output']>;
  /** An object relationship */
  drone: Drones;
  drone_id: Scalars['bigint']['output'];
  flight_id?: Maybe<Scalars['bigint']['output']>;
  has_package?: Maybe<Scalars['Boolean']['output']>;
  heading?: Maybe<Scalars['float8']['output']>;
  id: Scalars['bigint']['output'];
  latitude?: Maybe<Scalars['float8']['output']>;
  longitude?: Maybe<Scalars['float8']['output']>;
  stage_of_flight?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['bigint']['output']>;
  velocity?: Maybe<Scalars['float8']['output']>;
};

/** aggregated selection of "drone_telemetry" */
export type Drone_Telemetry_Aggregate = {
  __typename?: 'drone_telemetry_aggregate';
  aggregate?: Maybe<Drone_Telemetry_Aggregate_Fields>;
  nodes: Array<Drone_Telemetry>;
};

/** aggregate fields of "drone_telemetry" */
export type Drone_Telemetry_Aggregate_Fields = {
  __typename?: 'drone_telemetry_aggregate_fields';
  avg?: Maybe<Drone_Telemetry_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Drone_Telemetry_Max_Fields>;
  min?: Maybe<Drone_Telemetry_Min_Fields>;
  stddev?: Maybe<Drone_Telemetry_Stddev_Fields>;
  stddev_pop?: Maybe<Drone_Telemetry_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Drone_Telemetry_Stddev_Samp_Fields>;
  sum?: Maybe<Drone_Telemetry_Sum_Fields>;
  var_pop?: Maybe<Drone_Telemetry_Var_Pop_Fields>;
  var_samp?: Maybe<Drone_Telemetry_Var_Samp_Fields>;
  variance?: Maybe<Drone_Telemetry_Variance_Fields>;
};


/** aggregate fields of "drone_telemetry" */
export type Drone_Telemetry_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Drone_Telemetry_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Drone_Telemetry_Avg_Fields = {
  __typename?: 'drone_telemetry_avg_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "drone_telemetry". All fields are combined with a logical 'AND'. */
export type Drone_Telemetry_Bool_Exp = {
  _and?: InputMaybe<Array<Drone_Telemetry_Bool_Exp>>;
  _not?: InputMaybe<Drone_Telemetry_Bool_Exp>;
  _or?: InputMaybe<Array<Drone_Telemetry_Bool_Exp>>;
  altitude?: InputMaybe<Float8_Comparison_Exp>;
  battery?: InputMaybe<Smallint_Comparison_Exp>;
  drone?: InputMaybe<Drones_Bool_Exp>;
  drone_id?: InputMaybe<Bigint_Comparison_Exp>;
  flight_id?: InputMaybe<Bigint_Comparison_Exp>;
  has_package?: InputMaybe<Boolean_Comparison_Exp>;
  heading?: InputMaybe<Float8_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  latitude?: InputMaybe<Float8_Comparison_Exp>;
  longitude?: InputMaybe<Float8_Comparison_Exp>;
  stage_of_flight?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Bigint_Comparison_Exp>;
  velocity?: InputMaybe<Float8_Comparison_Exp>;
};

/** unique or primary key constraints on table "drone_telemetry" */
export enum Drone_Telemetry_Constraint {
  /** unique or primary key constraint on columns "id" */
  DroneTelemetryPkey = 'drone_telemetry_pkey'
}

/** input type for incrementing numeric columns in table "drone_telemetry" */
export type Drone_Telemetry_Inc_Input = {
  altitude?: InputMaybe<Scalars['float8']['input']>;
  battery?: InputMaybe<Scalars['smallint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  heading?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  latitude?: InputMaybe<Scalars['float8']['input']>;
  longitude?: InputMaybe<Scalars['float8']['input']>;
  timestamp?: InputMaybe<Scalars['bigint']['input']>;
  velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "drone_telemetry" */
export type Drone_Telemetry_Insert_Input = {
  altitude?: InputMaybe<Scalars['float8']['input']>;
  battery?: InputMaybe<Scalars['smallint']['input']>;
  drone?: InputMaybe<Drones_Obj_Rel_Insert_Input>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  has_package?: InputMaybe<Scalars['Boolean']['input']>;
  heading?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  latitude?: InputMaybe<Scalars['float8']['input']>;
  longitude?: InputMaybe<Scalars['float8']['input']>;
  stage_of_flight?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['bigint']['input']>;
  velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate max on columns */
export type Drone_Telemetry_Max_Fields = {
  __typename?: 'drone_telemetry_max_fields';
  altitude?: Maybe<Scalars['float8']['output']>;
  battery?: Maybe<Scalars['smallint']['output']>;
  drone_id?: Maybe<Scalars['bigint']['output']>;
  flight_id?: Maybe<Scalars['bigint']['output']>;
  heading?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  latitude?: Maybe<Scalars['float8']['output']>;
  longitude?: Maybe<Scalars['float8']['output']>;
  stage_of_flight?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['bigint']['output']>;
  velocity?: Maybe<Scalars['float8']['output']>;
};

/** aggregate min on columns */
export type Drone_Telemetry_Min_Fields = {
  __typename?: 'drone_telemetry_min_fields';
  altitude?: Maybe<Scalars['float8']['output']>;
  battery?: Maybe<Scalars['smallint']['output']>;
  drone_id?: Maybe<Scalars['bigint']['output']>;
  flight_id?: Maybe<Scalars['bigint']['output']>;
  heading?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  latitude?: Maybe<Scalars['float8']['output']>;
  longitude?: Maybe<Scalars['float8']['output']>;
  stage_of_flight?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['bigint']['output']>;
  velocity?: Maybe<Scalars['float8']['output']>;
};

/** response of any mutation on the table "drone_telemetry" */
export type Drone_Telemetry_Mutation_Response = {
  __typename?: 'drone_telemetry_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Drone_Telemetry>;
};

/** on_conflict condition type for table "drone_telemetry" */
export type Drone_Telemetry_On_Conflict = {
  constraint: Drone_Telemetry_Constraint;
  update_columns?: Array<Drone_Telemetry_Update_Column>;
  where?: InputMaybe<Drone_Telemetry_Bool_Exp>;
};

/** Ordering options when selecting data from "drone_telemetry". */
export type Drone_Telemetry_Order_By = {
  altitude?: InputMaybe<Order_By>;
  battery?: InputMaybe<Order_By>;
  drone?: InputMaybe<Drones_Order_By>;
  drone_id?: InputMaybe<Order_By>;
  flight_id?: InputMaybe<Order_By>;
  has_package?: InputMaybe<Order_By>;
  heading?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  stage_of_flight?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  velocity?: InputMaybe<Order_By>;
};

/** primary key columns input for table: drone_telemetry */
export type Drone_Telemetry_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "drone_telemetry" */
export enum Drone_Telemetry_Select_Column {
  /** column name */
  Altitude = 'altitude',
  /** column name */
  Battery = 'battery',
  /** column name */
  DroneId = 'drone_id',
  /** column name */
  FlightId = 'flight_id',
  /** column name */
  HasPackage = 'has_package',
  /** column name */
  Heading = 'heading',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  StageOfFlight = 'stage_of_flight',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Velocity = 'velocity'
}

/** input type for updating data in table "drone_telemetry" */
export type Drone_Telemetry_Set_Input = {
  altitude?: InputMaybe<Scalars['float8']['input']>;
  battery?: InputMaybe<Scalars['smallint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  has_package?: InputMaybe<Scalars['Boolean']['input']>;
  heading?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  latitude?: InputMaybe<Scalars['float8']['input']>;
  longitude?: InputMaybe<Scalars['float8']['input']>;
  stage_of_flight?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['bigint']['input']>;
  velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate stddev on columns */
export type Drone_Telemetry_Stddev_Fields = {
  __typename?: 'drone_telemetry_stddev_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Drone_Telemetry_Stddev_Pop_Fields = {
  __typename?: 'drone_telemetry_stddev_pop_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Drone_Telemetry_Stddev_Samp_Fields = {
  __typename?: 'drone_telemetry_stddev_samp_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "drone_telemetry" */
export type Drone_Telemetry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Drone_Telemetry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Drone_Telemetry_Stream_Cursor_Value_Input = {
  altitude?: InputMaybe<Scalars['float8']['input']>;
  battery?: InputMaybe<Scalars['smallint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  has_package?: InputMaybe<Scalars['Boolean']['input']>;
  heading?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  latitude?: InputMaybe<Scalars['float8']['input']>;
  longitude?: InputMaybe<Scalars['float8']['input']>;
  stage_of_flight?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['bigint']['input']>;
  velocity?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate sum on columns */
export type Drone_Telemetry_Sum_Fields = {
  __typename?: 'drone_telemetry_sum_fields';
  altitude?: Maybe<Scalars['float8']['output']>;
  battery?: Maybe<Scalars['smallint']['output']>;
  drone_id?: Maybe<Scalars['bigint']['output']>;
  flight_id?: Maybe<Scalars['bigint']['output']>;
  heading?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  latitude?: Maybe<Scalars['float8']['output']>;
  longitude?: Maybe<Scalars['float8']['output']>;
  timestamp?: Maybe<Scalars['bigint']['output']>;
  velocity?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "drone_telemetry" */
export enum Drone_Telemetry_Update_Column {
  /** column name */
  Altitude = 'altitude',
  /** column name */
  Battery = 'battery',
  /** column name */
  DroneId = 'drone_id',
  /** column name */
  FlightId = 'flight_id',
  /** column name */
  HasPackage = 'has_package',
  /** column name */
  Heading = 'heading',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  StageOfFlight = 'stage_of_flight',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Velocity = 'velocity'
}

export type Drone_Telemetry_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Drone_Telemetry_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Drone_Telemetry_Set_Input>;
  /** filter the rows which have to be updated */
  where: Drone_Telemetry_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Drone_Telemetry_Var_Pop_Fields = {
  __typename?: 'drone_telemetry_var_pop_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Drone_Telemetry_Var_Samp_Fields = {
  __typename?: 'drone_telemetry_var_samp_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Drone_Telemetry_Variance_Fields = {
  __typename?: 'drone_telemetry_variance_fields';
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "drones" */
export type Drones = {
  __typename?: 'drones';
  completion_date?: Maybe<Scalars['bigint']['output']>;
  drone_id: Scalars['bigint']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_exists?: Maybe<Scalars['Boolean']['output']>;
};

/** aggregated selection of "drones" */
export type Drones_Aggregate = {
  __typename?: 'drones_aggregate';
  aggregate?: Maybe<Drones_Aggregate_Fields>;
  nodes: Array<Drones>;
};

/** aggregate fields of "drones" */
export type Drones_Aggregate_Fields = {
  __typename?: 'drones_aggregate_fields';
  avg?: Maybe<Drones_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Drones_Max_Fields>;
  min?: Maybe<Drones_Min_Fields>;
  stddev?: Maybe<Drones_Stddev_Fields>;
  stddev_pop?: Maybe<Drones_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Drones_Stddev_Samp_Fields>;
  sum?: Maybe<Drones_Sum_Fields>;
  var_pop?: Maybe<Drones_Var_Pop_Fields>;
  var_samp?: Maybe<Drones_Var_Samp_Fields>;
  variance?: Maybe<Drones_Variance_Fields>;
};


/** aggregate fields of "drones" */
export type Drones_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Drones_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Drones_Avg_Fields = {
  __typename?: 'drones_avg_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "drones". All fields are combined with a logical 'AND'. */
export type Drones_Bool_Exp = {
  _and?: InputMaybe<Array<Drones_Bool_Exp>>;
  _not?: InputMaybe<Drones_Bool_Exp>;
  _or?: InputMaybe<Array<Drones_Bool_Exp>>;
  completion_date?: InputMaybe<Bigint_Comparison_Exp>;
  drone_id?: InputMaybe<Bigint_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  is_exists?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "drones" */
export enum Drones_Constraint {
  /** unique or primary key constraint on columns "drone_id" */
  DronesPkey = 'drones_pkey'
}

/** input type for incrementing numeric columns in table "drones" */
export type Drones_Inc_Input = {
  completion_date?: InputMaybe<Scalars['bigint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "drones" */
export type Drones_Insert_Input = {
  completion_date?: InputMaybe<Scalars['bigint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Drones_Max_Fields = {
  __typename?: 'drones_max_fields';
  completion_date?: Maybe<Scalars['bigint']['output']>;
  drone_id?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Drones_Min_Fields = {
  __typename?: 'drones_min_fields';
  completion_date?: Maybe<Scalars['bigint']['output']>;
  drone_id?: Maybe<Scalars['bigint']['output']>;
};

/** response of any mutation on the table "drones" */
export type Drones_Mutation_Response = {
  __typename?: 'drones_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Drones>;
};

/** input type for inserting object relation for remote table "drones" */
export type Drones_Obj_Rel_Insert_Input = {
  data: Drones_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Drones_On_Conflict>;
};

/** on_conflict condition type for table "drones" */
export type Drones_On_Conflict = {
  constraint: Drones_Constraint;
  update_columns?: Array<Drones_Update_Column>;
  where?: InputMaybe<Drones_Bool_Exp>;
};

/** Ordering options when selecting data from "drones". */
export type Drones_Order_By = {
  completion_date?: InputMaybe<Order_By>;
  drone_id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  is_exists?: InputMaybe<Order_By>;
};

/** primary key columns input for table: drones */
export type Drones_Pk_Columns_Input = {
  drone_id: Scalars['bigint']['input'];
};

/** select columns of table "drones" */
export enum Drones_Select_Column {
  /** column name */
  CompletionDate = 'completion_date',
  /** column name */
  DroneId = 'drone_id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsExists = 'is_exists'
}

/** input type for updating data in table "drones" */
export type Drones_Set_Input = {
  completion_date?: InputMaybe<Scalars['bigint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Drones_Stddev_Fields = {
  __typename?: 'drones_stddev_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Drones_Stddev_Pop_Fields = {
  __typename?: 'drones_stddev_pop_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Drones_Stddev_Samp_Fields = {
  __typename?: 'drones_stddev_samp_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "drones" */
export type Drones_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Drones_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Drones_Stream_Cursor_Value_Input = {
  completion_date?: InputMaybe<Scalars['bigint']['input']>;
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type Drones_Sum_Fields = {
  __typename?: 'drones_sum_fields';
  completion_date?: Maybe<Scalars['bigint']['output']>;
  drone_id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "drones" */
export enum Drones_Update_Column {
  /** column name */
  CompletionDate = 'completion_date',
  /** column name */
  DroneId = 'drone_id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsExists = 'is_exists'
}

export type Drones_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Drones_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Drones_Set_Input>;
  /** filter the rows which have to be updated */
  where: Drones_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Drones_Var_Pop_Fields = {
  __typename?: 'drones_var_pop_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Drones_Var_Samp_Fields = {
  __typename?: 'drones_var_samp_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Drones_Variance_Fields = {
  __typename?: 'drones_variance_fields';
  completion_date?: Maybe<Scalars['Float']['output']>;
  drone_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "flights" */
export type Flights = {
  __typename?: 'flights';
  drone_id?: Maybe<Scalars['bigint']['output']>;
  end_lat?: Maybe<Scalars['float8']['output']>;
  end_long?: Maybe<Scalars['float8']['output']>;
  flight_id: Scalars['bigint']['output'];
  order_id?: Maybe<Scalars['bigint']['output']>;
  route?: Maybe<Array<Scalars['String']['output']>>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_long?: Maybe<Scalars['float8']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "flights" */
export type Flights_Aggregate = {
  __typename?: 'flights_aggregate';
  aggregate?: Maybe<Flights_Aggregate_Fields>;
  nodes: Array<Flights>;
};

/** aggregate fields of "flights" */
export type Flights_Aggregate_Fields = {
  __typename?: 'flights_aggregate_fields';
  avg?: Maybe<Flights_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Flights_Max_Fields>;
  min?: Maybe<Flights_Min_Fields>;
  stddev?: Maybe<Flights_Stddev_Fields>;
  stddev_pop?: Maybe<Flights_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Flights_Stddev_Samp_Fields>;
  sum?: Maybe<Flights_Sum_Fields>;
  var_pop?: Maybe<Flights_Var_Pop_Fields>;
  var_samp?: Maybe<Flights_Var_Samp_Fields>;
  variance?: Maybe<Flights_Variance_Fields>;
};


/** aggregate fields of "flights" */
export type Flights_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Flights_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Flights_Avg_Fields = {
  __typename?: 'flights_avg_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "flights". All fields are combined with a logical 'AND'. */
export type Flights_Bool_Exp = {
  _and?: InputMaybe<Array<Flights_Bool_Exp>>;
  _not?: InputMaybe<Flights_Bool_Exp>;
  _or?: InputMaybe<Array<Flights_Bool_Exp>>;
  drone_id?: InputMaybe<Bigint_Comparison_Exp>;
  end_lat?: InputMaybe<Float8_Comparison_Exp>;
  end_long?: InputMaybe<Float8_Comparison_Exp>;
  flight_id?: InputMaybe<Bigint_Comparison_Exp>;
  order_id?: InputMaybe<Bigint_Comparison_Exp>;
  route?: InputMaybe<String_Array_Comparison_Exp>;
  start_lat?: InputMaybe<Float8_Comparison_Exp>;
  start_long?: InputMaybe<Float8_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "flights" */
export enum Flights_Constraint {
  /** unique or primary key constraint on columns "flight_id" */
  FlightsPkey = 'flights_pkey'
}

/** input type for incrementing numeric columns in table "flights" */
export type Flights_Inc_Input = {
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  end_lat?: InputMaybe<Scalars['float8']['input']>;
  end_long?: InputMaybe<Scalars['float8']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_long?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "flights" */
export type Flights_Insert_Input = {
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  end_lat?: InputMaybe<Scalars['float8']['input']>;
  end_long?: InputMaybe<Scalars['float8']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  route?: InputMaybe<Array<Scalars['String']['input']>>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_long?: InputMaybe<Scalars['float8']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Flights_Max_Fields = {
  __typename?: 'flights_max_fields';
  drone_id?: Maybe<Scalars['bigint']['output']>;
  end_lat?: Maybe<Scalars['float8']['output']>;
  end_long?: Maybe<Scalars['float8']['output']>;
  flight_id?: Maybe<Scalars['bigint']['output']>;
  order_id?: Maybe<Scalars['bigint']['output']>;
  route?: Maybe<Array<Scalars['String']['output']>>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_long?: Maybe<Scalars['float8']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Flights_Min_Fields = {
  __typename?: 'flights_min_fields';
  drone_id?: Maybe<Scalars['bigint']['output']>;
  end_lat?: Maybe<Scalars['float8']['output']>;
  end_long?: Maybe<Scalars['float8']['output']>;
  flight_id?: Maybe<Scalars['bigint']['output']>;
  order_id?: Maybe<Scalars['bigint']['output']>;
  route?: Maybe<Array<Scalars['String']['output']>>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_long?: Maybe<Scalars['float8']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "flights" */
export type Flights_Mutation_Response = {
  __typename?: 'flights_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Flights>;
};

/** on_conflict condition type for table "flights" */
export type Flights_On_Conflict = {
  constraint: Flights_Constraint;
  update_columns?: Array<Flights_Update_Column>;
  where?: InputMaybe<Flights_Bool_Exp>;
};

/** Ordering options when selecting data from "flights". */
export type Flights_Order_By = {
  drone_id?: InputMaybe<Order_By>;
  end_lat?: InputMaybe<Order_By>;
  end_long?: InputMaybe<Order_By>;
  flight_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  route?: InputMaybe<Order_By>;
  start_lat?: InputMaybe<Order_By>;
  start_long?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: flights */
export type Flights_Pk_Columns_Input = {
  flight_id: Scalars['bigint']['input'];
};

/** select columns of table "flights" */
export enum Flights_Select_Column {
  /** column name */
  DroneId = 'drone_id',
  /** column name */
  EndLat = 'end_lat',
  /** column name */
  EndLong = 'end_long',
  /** column name */
  FlightId = 'flight_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Route = 'route',
  /** column name */
  StartLat = 'start_lat',
  /** column name */
  StartLong = 'start_long',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "flights" */
export type Flights_Set_Input = {
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  end_lat?: InputMaybe<Scalars['float8']['input']>;
  end_long?: InputMaybe<Scalars['float8']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  route?: InputMaybe<Array<Scalars['String']['input']>>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_long?: InputMaybe<Scalars['float8']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Flights_Stddev_Fields = {
  __typename?: 'flights_stddev_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Flights_Stddev_Pop_Fields = {
  __typename?: 'flights_stddev_pop_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Flights_Stddev_Samp_Fields = {
  __typename?: 'flights_stddev_samp_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "flights" */
export type Flights_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Flights_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Flights_Stream_Cursor_Value_Input = {
  drone_id?: InputMaybe<Scalars['bigint']['input']>;
  end_lat?: InputMaybe<Scalars['float8']['input']>;
  end_long?: InputMaybe<Scalars['float8']['input']>;
  flight_id?: InputMaybe<Scalars['bigint']['input']>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  route?: InputMaybe<Array<Scalars['String']['input']>>;
  start_lat?: InputMaybe<Scalars['float8']['input']>;
  start_long?: InputMaybe<Scalars['float8']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Flights_Sum_Fields = {
  __typename?: 'flights_sum_fields';
  drone_id?: Maybe<Scalars['bigint']['output']>;
  end_lat?: Maybe<Scalars['float8']['output']>;
  end_long?: Maybe<Scalars['float8']['output']>;
  flight_id?: Maybe<Scalars['bigint']['output']>;
  order_id?: Maybe<Scalars['bigint']['output']>;
  start_lat?: Maybe<Scalars['float8']['output']>;
  start_long?: Maybe<Scalars['float8']['output']>;
};

/** update columns of table "flights" */
export enum Flights_Update_Column {
  /** column name */
  DroneId = 'drone_id',
  /** column name */
  EndLat = 'end_lat',
  /** column name */
  EndLong = 'end_long',
  /** column name */
  FlightId = 'flight_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Route = 'route',
  /** column name */
  StartLat = 'start_lat',
  /** column name */
  StartLong = 'start_long',
  /** column name */
  Status = 'status'
}

export type Flights_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Flights_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Flights_Set_Input>;
  /** filter the rows which have to be updated */
  where: Flights_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Flights_Var_Pop_Fields = {
  __typename?: 'flights_var_pop_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Flights_Var_Samp_Fields = {
  __typename?: 'flights_var_samp_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Flights_Variance_Fields = {
  __typename?: 'flights_variance_fields';
  drone_id?: Maybe<Scalars['Float']['output']>;
  end_lat?: Maybe<Scalars['Float']['output']>;
  end_long?: Maybe<Scalars['Float']['output']>;
  flight_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  start_lat?: Maybe<Scalars['Float']['output']>;
  start_long?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "countries" */
  delete_countries?: Maybe<Countries_Mutation_Response>;
  /** delete single row from the table: "countries" */
  delete_countries_by_pk?: Maybe<Countries>;
  /** delete data from the table: "drone_telemetry" */
  delete_drone_telemetry?: Maybe<Drone_Telemetry_Mutation_Response>;
  /** delete single row from the table: "drone_telemetry" */
  delete_drone_telemetry_by_pk?: Maybe<Drone_Telemetry>;
  /** delete data from the table: "drones" */
  delete_drones?: Maybe<Drones_Mutation_Response>;
  /** delete single row from the table: "drones" */
  delete_drones_by_pk?: Maybe<Drones>;
  /** delete data from the table: "flights" */
  delete_flights?: Maybe<Flights_Mutation_Response>;
  /** delete single row from the table: "flights" */
  delete_flights_by_pk?: Maybe<Flights>;
  /** delete data from the table: "orders" */
  delete_orders?: Maybe<Orders_Mutation_Response>;
  /** delete single row from the table: "orders" */
  delete_orders_by_pk?: Maybe<Orders>;
  /** insert data into the table: "countries" */
  insert_countries?: Maybe<Countries_Mutation_Response>;
  /** insert a single row into the table: "countries" */
  insert_countries_one?: Maybe<Countries>;
  /** insert data into the table: "drone_telemetry" */
  insert_drone_telemetry?: Maybe<Drone_Telemetry_Mutation_Response>;
  /** insert a single row into the table: "drone_telemetry" */
  insert_drone_telemetry_one?: Maybe<Drone_Telemetry>;
  /** insert data into the table: "drones" */
  insert_drones?: Maybe<Drones_Mutation_Response>;
  /** insert a single row into the table: "drones" */
  insert_drones_one?: Maybe<Drones>;
  /** insert data into the table: "flights" */
  insert_flights?: Maybe<Flights_Mutation_Response>;
  /** insert a single row into the table: "flights" */
  insert_flights_one?: Maybe<Flights>;
  /** insert data into the table: "orders" */
  insert_orders?: Maybe<Orders_Mutation_Response>;
  /** insert a single row into the table: "orders" */
  insert_orders_one?: Maybe<Orders>;
  /** update data of the table: "countries" */
  update_countries?: Maybe<Countries_Mutation_Response>;
  /** update single row of the table: "countries" */
  update_countries_by_pk?: Maybe<Countries>;
  /** update multiples rows of table: "countries" */
  update_countries_many?: Maybe<Array<Maybe<Countries_Mutation_Response>>>;
  /** update data of the table: "drone_telemetry" */
  update_drone_telemetry?: Maybe<Drone_Telemetry_Mutation_Response>;
  /** update single row of the table: "drone_telemetry" */
  update_drone_telemetry_by_pk?: Maybe<Drone_Telemetry>;
  /** update multiples rows of table: "drone_telemetry" */
  update_drone_telemetry_many?: Maybe<Array<Maybe<Drone_Telemetry_Mutation_Response>>>;
  /** update data of the table: "drones" */
  update_drones?: Maybe<Drones_Mutation_Response>;
  /** update single row of the table: "drones" */
  update_drones_by_pk?: Maybe<Drones>;
  /** update multiples rows of table: "drones" */
  update_drones_many?: Maybe<Array<Maybe<Drones_Mutation_Response>>>;
  /** update data of the table: "flights" */
  update_flights?: Maybe<Flights_Mutation_Response>;
  /** update single row of the table: "flights" */
  update_flights_by_pk?: Maybe<Flights>;
  /** update multiples rows of table: "flights" */
  update_flights_many?: Maybe<Array<Maybe<Flights_Mutation_Response>>>;
  /** update data of the table: "orders" */
  update_orders?: Maybe<Orders_Mutation_Response>;
  /** update single row of the table: "orders" */
  update_orders_by_pk?: Maybe<Orders>;
  /** update multiples rows of table: "orders" */
  update_orders_many?: Maybe<Array<Maybe<Orders_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CountriesArgs = {
  where: Countries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Countries_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Drone_TelemetryArgs = {
  where: Drone_Telemetry_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Drone_Telemetry_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_DronesArgs = {
  where: Drones_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Drones_By_PkArgs = {
  drone_id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FlightsArgs = {
  where: Flights_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Flights_By_PkArgs = {
  flight_id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_OrdersArgs = {
  where: Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Orders_By_PkArgs = {
  order_id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootInsert_CountriesArgs = {
  objects: Array<Countries_Insert_Input>;
  on_conflict?: InputMaybe<Countries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Countries_OneArgs = {
  object: Countries_Insert_Input;
  on_conflict?: InputMaybe<Countries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Drone_TelemetryArgs = {
  objects: Array<Drone_Telemetry_Insert_Input>;
  on_conflict?: InputMaybe<Drone_Telemetry_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Drone_Telemetry_OneArgs = {
  object: Drone_Telemetry_Insert_Input;
  on_conflict?: InputMaybe<Drone_Telemetry_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DronesArgs = {
  objects: Array<Drones_Insert_Input>;
  on_conflict?: InputMaybe<Drones_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Drones_OneArgs = {
  object: Drones_Insert_Input;
  on_conflict?: InputMaybe<Drones_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FlightsArgs = {
  objects: Array<Flights_Insert_Input>;
  on_conflict?: InputMaybe<Flights_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Flights_OneArgs = {
  object: Flights_Insert_Input;
  on_conflict?: InputMaybe<Flights_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrdersArgs = {
  objects: Array<Orders_Insert_Input>;
  on_conflict?: InputMaybe<Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Orders_OneArgs = {
  object: Orders_Insert_Input;
  on_conflict?: InputMaybe<Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CountriesArgs = {
  _inc?: InputMaybe<Countries_Inc_Input>;
  _set?: InputMaybe<Countries_Set_Input>;
  where: Countries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Countries_By_PkArgs = {
  _inc?: InputMaybe<Countries_Inc_Input>;
  _set?: InputMaybe<Countries_Set_Input>;
  pk_columns: Countries_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Countries_ManyArgs = {
  updates: Array<Countries_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Drone_TelemetryArgs = {
  _inc?: InputMaybe<Drone_Telemetry_Inc_Input>;
  _set?: InputMaybe<Drone_Telemetry_Set_Input>;
  where: Drone_Telemetry_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Drone_Telemetry_By_PkArgs = {
  _inc?: InputMaybe<Drone_Telemetry_Inc_Input>;
  _set?: InputMaybe<Drone_Telemetry_Set_Input>;
  pk_columns: Drone_Telemetry_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Drone_Telemetry_ManyArgs = {
  updates: Array<Drone_Telemetry_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DronesArgs = {
  _inc?: InputMaybe<Drones_Inc_Input>;
  _set?: InputMaybe<Drones_Set_Input>;
  where: Drones_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Drones_By_PkArgs = {
  _inc?: InputMaybe<Drones_Inc_Input>;
  _set?: InputMaybe<Drones_Set_Input>;
  pk_columns: Drones_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Drones_ManyArgs = {
  updates: Array<Drones_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FlightsArgs = {
  _inc?: InputMaybe<Flights_Inc_Input>;
  _set?: InputMaybe<Flights_Set_Input>;
  where: Flights_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Flights_By_PkArgs = {
  _inc?: InputMaybe<Flights_Inc_Input>;
  _set?: InputMaybe<Flights_Set_Input>;
  pk_columns: Flights_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Flights_ManyArgs = {
  updates: Array<Flights_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OrdersArgs = {
  _inc?: InputMaybe<Orders_Inc_Input>;
  _set?: InputMaybe<Orders_Set_Input>;
  where: Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Orders_By_PkArgs = {
  _inc?: InputMaybe<Orders_Inc_Input>;
  _set?: InputMaybe<Orders_Set_Input>;
  pk_columns: Orders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Orders_ManyArgs = {
  updates: Array<Orders_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "orders" */
export type Orders = {
  __typename?: 'orders';
  completed?: Maybe<Scalars['Boolean']['output']>;
  completed_at?: Maybe<Scalars['bigint']['output']>;
  delivered_at?: Maybe<Scalars['bigint']['output']>;
  dest_lat?: Maybe<Scalars['float8']['output']>;
  dest_long?: Maybe<Scalars['float8']['output']>;
  food_items?: Maybe<Array<Scalars['String']['output']>>;
  order_id: Scalars['bigint']['output'];
  pickup_lat?: Maybe<Scalars['float8']['output']>;
  pickup_long?: Maybe<Scalars['float8']['output']>;
  placed_at?: Maybe<Scalars['bigint']['output']>;
  price?: Maybe<Scalars['float8']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  vendor_id: Scalars['bigint']['output'];
};

/** aggregated selection of "orders" */
export type Orders_Aggregate = {
  __typename?: 'orders_aggregate';
  aggregate?: Maybe<Orders_Aggregate_Fields>;
  nodes: Array<Orders>;
};

/** aggregate fields of "orders" */
export type Orders_Aggregate_Fields = {
  __typename?: 'orders_aggregate_fields';
  avg?: Maybe<Orders_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Orders_Max_Fields>;
  min?: Maybe<Orders_Min_Fields>;
  stddev?: Maybe<Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Orders_Sum_Fields>;
  var_pop?: Maybe<Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Orders_Var_Samp_Fields>;
  variance?: Maybe<Orders_Variance_Fields>;
};


/** aggregate fields of "orders" */
export type Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Orders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Orders_Avg_Fields = {
  __typename?: 'orders_avg_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "orders". All fields are combined with a logical 'AND'. */
export type Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Orders_Bool_Exp>>;
  _not?: InputMaybe<Orders_Bool_Exp>;
  _or?: InputMaybe<Array<Orders_Bool_Exp>>;
  completed?: InputMaybe<Boolean_Comparison_Exp>;
  completed_at?: InputMaybe<Bigint_Comparison_Exp>;
  delivered_at?: InputMaybe<Bigint_Comparison_Exp>;
  dest_lat?: InputMaybe<Float8_Comparison_Exp>;
  dest_long?: InputMaybe<Float8_Comparison_Exp>;
  food_items?: InputMaybe<String_Array_Comparison_Exp>;
  order_id?: InputMaybe<Bigint_Comparison_Exp>;
  pickup_lat?: InputMaybe<Float8_Comparison_Exp>;
  pickup_long?: InputMaybe<Float8_Comparison_Exp>;
  placed_at?: InputMaybe<Bigint_Comparison_Exp>;
  price?: InputMaybe<Float8_Comparison_Exp>;
  user_id?: InputMaybe<Bigint_Comparison_Exp>;
  vendor_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "orders" */
export enum Orders_Constraint {
  /** unique or primary key constraint on columns "order_id" */
  OrdersPkey = 'orders_pkey'
}

/** input type for incrementing numeric columns in table "orders" */
export type Orders_Inc_Input = {
  completed_at?: InputMaybe<Scalars['bigint']['input']>;
  delivered_at?: InputMaybe<Scalars['bigint']['input']>;
  dest_lat?: InputMaybe<Scalars['float8']['input']>;
  dest_long?: InputMaybe<Scalars['float8']['input']>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  pickup_lat?: InputMaybe<Scalars['float8']['input']>;
  pickup_long?: InputMaybe<Scalars['float8']['input']>;
  placed_at?: InputMaybe<Scalars['bigint']['input']>;
  price?: InputMaybe<Scalars['float8']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  vendor_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "orders" */
export type Orders_Insert_Input = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  completed_at?: InputMaybe<Scalars['bigint']['input']>;
  delivered_at?: InputMaybe<Scalars['bigint']['input']>;
  dest_lat?: InputMaybe<Scalars['float8']['input']>;
  dest_long?: InputMaybe<Scalars['float8']['input']>;
  food_items?: InputMaybe<Array<Scalars['String']['input']>>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  pickup_lat?: InputMaybe<Scalars['float8']['input']>;
  pickup_long?: InputMaybe<Scalars['float8']['input']>;
  placed_at?: InputMaybe<Scalars['bigint']['input']>;
  price?: InputMaybe<Scalars['float8']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  vendor_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Orders_Max_Fields = {
  __typename?: 'orders_max_fields';
  completed_at?: Maybe<Scalars['bigint']['output']>;
  delivered_at?: Maybe<Scalars['bigint']['output']>;
  dest_lat?: Maybe<Scalars['float8']['output']>;
  dest_long?: Maybe<Scalars['float8']['output']>;
  food_items?: Maybe<Array<Scalars['String']['output']>>;
  order_id?: Maybe<Scalars['bigint']['output']>;
  pickup_lat?: Maybe<Scalars['float8']['output']>;
  pickup_long?: Maybe<Scalars['float8']['output']>;
  placed_at?: Maybe<Scalars['bigint']['output']>;
  price?: Maybe<Scalars['float8']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  vendor_id?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Orders_Min_Fields = {
  __typename?: 'orders_min_fields';
  completed_at?: Maybe<Scalars['bigint']['output']>;
  delivered_at?: Maybe<Scalars['bigint']['output']>;
  dest_lat?: Maybe<Scalars['float8']['output']>;
  dest_long?: Maybe<Scalars['float8']['output']>;
  food_items?: Maybe<Array<Scalars['String']['output']>>;
  order_id?: Maybe<Scalars['bigint']['output']>;
  pickup_lat?: Maybe<Scalars['float8']['output']>;
  pickup_long?: Maybe<Scalars['float8']['output']>;
  placed_at?: Maybe<Scalars['bigint']['output']>;
  price?: Maybe<Scalars['float8']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  vendor_id?: Maybe<Scalars['bigint']['output']>;
};

/** response of any mutation on the table "orders" */
export type Orders_Mutation_Response = {
  __typename?: 'orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Orders>;
};

/** on_conflict condition type for table "orders" */
export type Orders_On_Conflict = {
  constraint: Orders_Constraint;
  update_columns?: Array<Orders_Update_Column>;
  where?: InputMaybe<Orders_Bool_Exp>;
};

/** Ordering options when selecting data from "orders". */
export type Orders_Order_By = {
  completed?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  delivered_at?: InputMaybe<Order_By>;
  dest_lat?: InputMaybe<Order_By>;
  dest_long?: InputMaybe<Order_By>;
  food_items?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  pickup_lat?: InputMaybe<Order_By>;
  pickup_long?: InputMaybe<Order_By>;
  placed_at?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  vendor_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: orders */
export type Orders_Pk_Columns_Input = {
  order_id: Scalars['bigint']['input'];
};

/** select columns of table "orders" */
export enum Orders_Select_Column {
  /** column name */
  Completed = 'completed',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  DeliveredAt = 'delivered_at',
  /** column name */
  DestLat = 'dest_lat',
  /** column name */
  DestLong = 'dest_long',
  /** column name */
  FoodItems = 'food_items',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PickupLat = 'pickup_lat',
  /** column name */
  PickupLong = 'pickup_long',
  /** column name */
  PlacedAt = 'placed_at',
  /** column name */
  Price = 'price',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VendorId = 'vendor_id'
}

/** input type for updating data in table "orders" */
export type Orders_Set_Input = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  completed_at?: InputMaybe<Scalars['bigint']['input']>;
  delivered_at?: InputMaybe<Scalars['bigint']['input']>;
  dest_lat?: InputMaybe<Scalars['float8']['input']>;
  dest_long?: InputMaybe<Scalars['float8']['input']>;
  food_items?: InputMaybe<Array<Scalars['String']['input']>>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  pickup_lat?: InputMaybe<Scalars['float8']['input']>;
  pickup_long?: InputMaybe<Scalars['float8']['input']>;
  placed_at?: InputMaybe<Scalars['bigint']['input']>;
  price?: InputMaybe<Scalars['float8']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  vendor_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Orders_Stddev_Fields = {
  __typename?: 'orders_stddev_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Orders_Stddev_Pop_Fields = {
  __typename?: 'orders_stddev_pop_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Orders_Stddev_Samp_Fields = {
  __typename?: 'orders_stddev_samp_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "orders" */
export type Orders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Orders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Orders_Stream_Cursor_Value_Input = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  completed_at?: InputMaybe<Scalars['bigint']['input']>;
  delivered_at?: InputMaybe<Scalars['bigint']['input']>;
  dest_lat?: InputMaybe<Scalars['float8']['input']>;
  dest_long?: InputMaybe<Scalars['float8']['input']>;
  food_items?: InputMaybe<Array<Scalars['String']['input']>>;
  order_id?: InputMaybe<Scalars['bigint']['input']>;
  pickup_lat?: InputMaybe<Scalars['float8']['input']>;
  pickup_long?: InputMaybe<Scalars['float8']['input']>;
  placed_at?: InputMaybe<Scalars['bigint']['input']>;
  price?: InputMaybe<Scalars['float8']['input']>;
  user_id?: InputMaybe<Scalars['bigint']['input']>;
  vendor_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Orders_Sum_Fields = {
  __typename?: 'orders_sum_fields';
  completed_at?: Maybe<Scalars['bigint']['output']>;
  delivered_at?: Maybe<Scalars['bigint']['output']>;
  dest_lat?: Maybe<Scalars['float8']['output']>;
  dest_long?: Maybe<Scalars['float8']['output']>;
  order_id?: Maybe<Scalars['bigint']['output']>;
  pickup_lat?: Maybe<Scalars['float8']['output']>;
  pickup_long?: Maybe<Scalars['float8']['output']>;
  placed_at?: Maybe<Scalars['bigint']['output']>;
  price?: Maybe<Scalars['float8']['output']>;
  user_id?: Maybe<Scalars['bigint']['output']>;
  vendor_id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "orders" */
export enum Orders_Update_Column {
  /** column name */
  Completed = 'completed',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  DeliveredAt = 'delivered_at',
  /** column name */
  DestLat = 'dest_lat',
  /** column name */
  DestLong = 'dest_long',
  /** column name */
  FoodItems = 'food_items',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PickupLat = 'pickup_lat',
  /** column name */
  PickupLong = 'pickup_long',
  /** column name */
  PlacedAt = 'placed_at',
  /** column name */
  Price = 'price',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VendorId = 'vendor_id'
}

export type Orders_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Orders_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Orders_Set_Input>;
  /** filter the rows which have to be updated */
  where: Orders_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Orders_Var_Pop_Fields = {
  __typename?: 'orders_var_pop_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Orders_Var_Samp_Fields = {
  __typename?: 'orders_var_samp_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Orders_Variance_Fields = {
  __typename?: 'orders_variance_fields';
  completed_at?: Maybe<Scalars['Float']['output']>;
  delivered_at?: Maybe<Scalars['Float']['output']>;
  dest_lat?: Maybe<Scalars['Float']['output']>;
  dest_long?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  pickup_lat?: Maybe<Scalars['Float']['output']>;
  pickup_long?: Maybe<Scalars['Float']['output']>;
  placed_at?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
  vendor_id?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "countries" */
  countries: Array<Countries>;
  /** fetch aggregated fields from the table: "countries" */
  countries_aggregate: Countries_Aggregate;
  /** fetch data from the table: "countries" using primary key columns */
  countries_by_pk?: Maybe<Countries>;
  /** fetch data from the table: "drone_telemetry" */
  drone_telemetry: Array<Drone_Telemetry>;
  /** fetch aggregated fields from the table: "drone_telemetry" */
  drone_telemetry_aggregate: Drone_Telemetry_Aggregate;
  /** fetch data from the table: "drone_telemetry" using primary key columns */
  drone_telemetry_by_pk?: Maybe<Drone_Telemetry>;
  /** fetch data from the table: "drones" */
  drones: Array<Drones>;
  /** fetch aggregated fields from the table: "drones" */
  drones_aggregate: Drones_Aggregate;
  /** fetch data from the table: "drones" using primary key columns */
  drones_by_pk?: Maybe<Drones>;
  /** fetch data from the table: "flights" */
  flights: Array<Flights>;
  /** fetch aggregated fields from the table: "flights" */
  flights_aggregate: Flights_Aggregate;
  /** fetch data from the table: "flights" using primary key columns */
  flights_by_pk?: Maybe<Flights>;
  /** fetch data from the table: "orders" */
  orders: Array<Orders>;
  /** fetch aggregated fields from the table: "orders" */
  orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
};


export type Query_RootCountriesArgs = {
  distinct_on?: InputMaybe<Array<Countries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Countries_Order_By>>;
  where?: InputMaybe<Countries_Bool_Exp>;
};


export type Query_RootCountries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Countries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Countries_Order_By>>;
  where?: InputMaybe<Countries_Bool_Exp>;
};


export type Query_RootCountries_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootDrone_TelemetryArgs = {
  distinct_on?: InputMaybe<Array<Drone_Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drone_Telemetry_Order_By>>;
  where?: InputMaybe<Drone_Telemetry_Bool_Exp>;
};


export type Query_RootDrone_Telemetry_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drone_Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drone_Telemetry_Order_By>>;
  where?: InputMaybe<Drone_Telemetry_Bool_Exp>;
};


export type Query_RootDrone_Telemetry_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootDronesArgs = {
  distinct_on?: InputMaybe<Array<Drones_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drones_Order_By>>;
  where?: InputMaybe<Drones_Bool_Exp>;
};


export type Query_RootDrones_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drones_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drones_Order_By>>;
  where?: InputMaybe<Drones_Bool_Exp>;
};


export type Query_RootDrones_By_PkArgs = {
  drone_id: Scalars['bigint']['input'];
};


export type Query_RootFlightsArgs = {
  distinct_on?: InputMaybe<Array<Flights_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flights_Order_By>>;
  where?: InputMaybe<Flights_Bool_Exp>;
};


export type Query_RootFlights_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flights_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flights_Order_By>>;
  where?: InputMaybe<Flights_Bool_Exp>;
};


export type Query_RootFlights_By_PkArgs = {
  flight_id: Scalars['bigint']['input'];
};


export type Query_RootOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Query_RootOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Query_RootOrders_By_PkArgs = {
  order_id: Scalars['bigint']['input'];
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']['input']>;
  _gt?: InputMaybe<Scalars['smallint']['input']>;
  _gte?: InputMaybe<Scalars['smallint']['input']>;
  _in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['smallint']['input']>;
  _lte?: InputMaybe<Scalars['smallint']['input']>;
  _neq?: InputMaybe<Scalars['smallint']['input']>;
  _nin?: InputMaybe<Array<Scalars['smallint']['input']>>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "countries" */
  countries: Array<Countries>;
  /** fetch aggregated fields from the table: "countries" */
  countries_aggregate: Countries_Aggregate;
  /** fetch data from the table: "countries" using primary key columns */
  countries_by_pk?: Maybe<Countries>;
  /** fetch data from the table in a streaming manner: "countries" */
  countries_stream: Array<Countries>;
  /** fetch data from the table: "drone_telemetry" */
  drone_telemetry: Array<Drone_Telemetry>;
  /** fetch aggregated fields from the table: "drone_telemetry" */
  drone_telemetry_aggregate: Drone_Telemetry_Aggregate;
  /** fetch data from the table: "drone_telemetry" using primary key columns */
  drone_telemetry_by_pk?: Maybe<Drone_Telemetry>;
  /** fetch data from the table in a streaming manner: "drone_telemetry" */
  drone_telemetry_stream: Array<Drone_Telemetry>;
  /** fetch data from the table: "drones" */
  drones: Array<Drones>;
  /** fetch aggregated fields from the table: "drones" */
  drones_aggregate: Drones_Aggregate;
  /** fetch data from the table: "drones" using primary key columns */
  drones_by_pk?: Maybe<Drones>;
  /** fetch data from the table in a streaming manner: "drones" */
  drones_stream: Array<Drones>;
  /** fetch data from the table: "flights" */
  flights: Array<Flights>;
  /** fetch aggregated fields from the table: "flights" */
  flights_aggregate: Flights_Aggregate;
  /** fetch data from the table: "flights" using primary key columns */
  flights_by_pk?: Maybe<Flights>;
  /** fetch data from the table in a streaming manner: "flights" */
  flights_stream: Array<Flights>;
  /** fetch data from the table: "orders" */
  orders: Array<Orders>;
  /** fetch aggregated fields from the table: "orders" */
  orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "orders" using primary key columns */
  orders_by_pk?: Maybe<Orders>;
  /** fetch data from the table in a streaming manner: "orders" */
  orders_stream: Array<Orders>;
};


export type Subscription_RootCountriesArgs = {
  distinct_on?: InputMaybe<Array<Countries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Countries_Order_By>>;
  where?: InputMaybe<Countries_Bool_Exp>;
};


export type Subscription_RootCountries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Countries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Countries_Order_By>>;
  where?: InputMaybe<Countries_Bool_Exp>;
};


export type Subscription_RootCountries_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCountries_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Countries_Stream_Cursor_Input>>;
  where?: InputMaybe<Countries_Bool_Exp>;
};


export type Subscription_RootDrone_TelemetryArgs = {
  distinct_on?: InputMaybe<Array<Drone_Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drone_Telemetry_Order_By>>;
  where?: InputMaybe<Drone_Telemetry_Bool_Exp>;
};


export type Subscription_RootDrone_Telemetry_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drone_Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drone_Telemetry_Order_By>>;
  where?: InputMaybe<Drone_Telemetry_Bool_Exp>;
};


export type Subscription_RootDrone_Telemetry_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootDrone_Telemetry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Drone_Telemetry_Stream_Cursor_Input>>;
  where?: InputMaybe<Drone_Telemetry_Bool_Exp>;
};


export type Subscription_RootDronesArgs = {
  distinct_on?: InputMaybe<Array<Drones_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drones_Order_By>>;
  where?: InputMaybe<Drones_Bool_Exp>;
};


export type Subscription_RootDrones_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drones_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drones_Order_By>>;
  where?: InputMaybe<Drones_Bool_Exp>;
};


export type Subscription_RootDrones_By_PkArgs = {
  drone_id: Scalars['bigint']['input'];
};


export type Subscription_RootDrones_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Drones_Stream_Cursor_Input>>;
  where?: InputMaybe<Drones_Bool_Exp>;
};


export type Subscription_RootFlightsArgs = {
  distinct_on?: InputMaybe<Array<Flights_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flights_Order_By>>;
  where?: InputMaybe<Flights_Bool_Exp>;
};


export type Subscription_RootFlights_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Flights_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Flights_Order_By>>;
  where?: InputMaybe<Flights_Bool_Exp>;
};


export type Subscription_RootFlights_By_PkArgs = {
  flight_id: Scalars['bigint']['input'];
};


export type Subscription_RootFlights_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Flights_Stream_Cursor_Input>>;
  where?: InputMaybe<Flights_Bool_Exp>;
};


export type Subscription_RootOrdersArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Subscription_RootOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Orders_Order_By>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};


export type Subscription_RootOrders_By_PkArgs = {
  order_id: Scalars['bigint']['input'];
};


export type Subscription_RootOrders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Orders_Stream_Cursor_Input>>;
  where?: InputMaybe<Orders_Bool_Exp>;
};

export type GetCountriesStreamingSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesStreamingSubscriptionSubscription = { __typename?: 'subscription_root', countries: Array<{ __typename?: 'countries', id: number, name: string }> };


export const GetCountriesStreamingSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"GetCountriesStreamingSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCountriesStreamingSubscriptionSubscription, GetCountriesStreamingSubscriptionSubscriptionVariables>;