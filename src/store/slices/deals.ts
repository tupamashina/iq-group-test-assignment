import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  CompletedDealStatus,
  UncompletedDealStatus,
  type Deal,
} from '~/guards/schemas/deal';
import { createAppSelector } from '../createSelector';

import type { IterableElement } from 'type-fest';

//* =============================== Initial data ===============================

const initialData: readonly Deal[] = [
  {
    id: 0,
    status: UncompletedDealStatus.NEW,
    title: 'Тест 1',
    budget: 5000,
    fullName: 'Иванов Иван Иванович',
    phoneNumber: '+79998887766',
    comments: ['Комментарий 1'],
    createdAt: 1_730_190_630_400,
  },
  {
    id: 1,
    status: CompletedDealStatus.SUCCESS,
    title: 'Тест 2',
    budget: 7200.5,
    fullName: 'Олегов Олег Олегович',
    phoneNumber: '+79874443322',
    comments: ['Комментарий 1', 'Комментарий 2'],
    createdAt: 1_730_369_400_600,
  },
  {
    id: 2,
    status: UncompletedDealStatus.IN_PROGRESS,
    title: 'Тест 3',
    budget: 10_000,
    fullName: 'Николаев Николай',
    phoneNumber: '+79019991188',
    comments: ['Комментарий 3', 'Комментарий 2', 'Комментарий 1'],
    createdAt: 1_730_307_477_000,
  },
  {
    id: 3,
    status: CompletedDealStatus.FAILURE,
    title: 'Тест 4',
    budget: 4200.42,
    fullName: 'Александров Александр',
    phoneNumber: '+79453456789',
    comments: ['Комментарий 1', 'Комментарий 2'],
    createdAt: 1_730_086_921_005,
  },
  {
    id: 4,
    status: UncompletedDealStatus.ALMOST_DONE,
    title: 'Тест 5',
    budget: 15_000,
    fullName: 'Владимиров Владимир Владимирович',
    phoneNumber: '+79876543210',
    comments: ['Комментарий 1'],
    createdAt: 1_729_891_281_210,
  },
];

//* ================================== Types ===================================

type CreatePayload = Pick<Deal, 'title'>;

type UpdatePayload = Pick<
  Deal,
  'budget' | 'createdAt' | 'fullName' | 'id' | 'phoneNumber' | 'status'
>;

interface AddCommentPayload {
  dealId: Deal['id'];
  comment: IterableElement<Deal['comments']>;
}

//* ================================== Slice ===================================

const dealsSlice = createSlice({
  name: 'deals',
  initialState: initialData,

  reducers: {
    delete(deals, { payload }: PayloadAction<Deal['id']>) {
      const index = deals.findIndex(({ id }) => id === payload);
      if (index !== -1) deals.splice(index, 1);
    },

    create(deals, { payload }: PayloadAction<CreatePayload>) {
      const maxId =
        deals.toSorted(({ id: idA }, { id: idB }) => idA - idB).at(-1)?.id ??
        -1;

      deals.push({
        comments: [],
        id: maxId + 1,
        title: payload.title,
        createdAt: Date.now(),
        status: UncompletedDealStatus.NEW,

        budget: null,
        fullName: null,
        phoneNumber: null,
      });
    },

    update(deals, { payload }: PayloadAction<UpdatePayload>) {
      const deal = deals.find(({ id }) => id === payload.id);
      if (deal) Object.assign(deal, payload);
    },

    addComment(deals, { payload }: PayloadAction<AddCommentPayload>) {
      const deal = deals.find(({ id }) => id === payload.dealId);
      deal?.comments.push(payload.comment);
    },
  },
});

export const dealsReducer = dealsSlice.reducer;

export const {
  create: createDealAction,
  update: updateDealAction,
  delete: deleteDealAction,
  addComment: addCommentToDealAction,
} = dealsSlice.actions;

//* ================================ Selectors =================================

export const selectDealById = createAppSelector(
  [(state) => state.deals, (_, id: number) => id],
  (deals, id) => deals.find((deal) => deal.id === id),
);

export const selectDealsByStatus = createAppSelector(
  [(state) => state.deals, (_, isCompleted: boolean) => isCompleted],
  (deals, isCompleted) =>
    deals.filter(
      ({ status }) => typeof status === (isCompleted ? 'string' : 'number'),
    ),
);
