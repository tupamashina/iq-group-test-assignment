import {
  CompletedDealStatus,
  UncompletedDealStatus,
} from '~/guards/schemas/deal';

export function translateDealStatus(
  status: CompletedDealStatus | UncompletedDealStatus,
) {
  switch (status) {
    case UncompletedDealStatus.NEW:
      return 'Новая';

    case UncompletedDealStatus.IN_PROGRESS:
      return 'В работе';

    case UncompletedDealStatus.ALMOST_DONE:
      return 'Почти завершена';

    case CompletedDealStatus.FAILURE:
      return 'Провал';

    case CompletedDealStatus.SUCCESS:
      return 'Успех';
  }
}
