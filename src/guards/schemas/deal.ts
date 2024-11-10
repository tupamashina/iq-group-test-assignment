import {
  array,
  enum as enumSchema,
  integer,
  minValue,
  nonEmpty,
  nullable,
  number,
  object,
  pipe,
  string,
  union,
  type InferOutput,
} from 'valibot';

import { phoneNumberCheck } from '../checks/phoneNumber';

export enum CompletedDealStatus {
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

export const completedDealStatusSchema = enumSchema(CompletedDealStatus);

export enum UncompletedDealStatus {
  NEW,
  IN_PROGRESS,
  ALMOST_DONE,
}

export const uncompletedDealStatusSchema = enumSchema(UncompletedDealStatus);

export const dealSchema = object({
  id: pipe(number(), integer(), minValue(0)),
  title: pipe(string(), nonEmpty()),
  createdAt: pipe(number(), integer()),
  comments: array(pipe(string(), nonEmpty())),
  status: union([completedDealStatusSchema, uncompletedDealStatusSchema]),

  budget: nullable(pipe(number(), minValue(0))),
  fullName: nullable(pipe(string(), nonEmpty())),
  phoneNumber: nullable(pipe(string(), phoneNumberCheck())),
});

export interface Deal extends InferOutput<typeof dealSchema> {}
