import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '~/components/Button';
import { useAppSelector } from '~/hooks/store';
import { selectDealsByStatus } from '~/store/slices/deals';
import { contentsClass, srOnlyClass } from '~/styles/utils.css';
import { translateDealStatus } from '~/utils/translateDealStatus';
import { DealsRouteCreationDialog } from './CreationDialog';
import { dealsRouteStyles as styles } from './styles.css';

import type { FC } from 'react';

const COMPLETED_SEARCH_PARAM_NAME = 'completed';

export const DealsRouteComponent: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isCompleted = searchParams.has(COMPLETED_SEARCH_PARAM_NAME);

  const deals = useAppSelector((state) =>
    selectDealsByStatus(state, isCompleted),
  );

  const navigateToAllDeals = () =>
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete(COMPLETED_SEARCH_PARAM_NAME);
      return newParams;
    });

  const navigateToArchiveDeals = () =>
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(COMPLETED_SEARCH_PARAM_NAME, '');
      return newParams;
    });

  return (
    <section className={styles.sectionClass}>
      <DealsRouteCreationDialog />

      <div className={styles.navClass}>
        <Button
          variant={isCompleted ? 'secondary' : 'primary'}
          onClick={navigateToAllDeals}
        >
          Все
        </Button>

        <Button
          variant={isCompleted ? 'primary' : 'secondary'}
          onClick={navigateToArchiveDeals}
        >
          Архив
        </Button>
      </div>

      <table className={styles.tableClass}>
        <caption className={srOnlyClass}>Сделки</caption>

        <thead className={contentsClass}>
          <tr className={styles.tableRowClass}>
            <th className={srOnlyClass}>Ссылка</th>
            <th>ID</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Дата создания</th>
          </tr>
        </thead>

        <tbody className={contentsClass}>
          {deals.map(({ id, title, status, createdAt }) => (
            <tr key={id} className={styles.tableRowClass}>
              <td className={contentsClass}>
                <Link to={`/deals/${id}`} className={styles.dealLinkClass}>
                  {title}
                </Link>
              </td>

              <td>{id}</td>
              <td>{title}</td>
              <td>{translateDealStatus(status)}</td>
              <td>{new Date(createdAt).toLocaleDateString('ru-RU')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
