import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/hooks/store';
import { deleteDealAction, selectDealById } from '~/store/slices/deals';
import { DealRouteBasicInfoForm } from './BasicInfoForm';
import { DealRouteCommentForm } from './CommentForm';
import { DealRouteProgressBar } from './ProgressBar';
import { dealRouteStyles as styles } from './styles.css';

import type { FC } from 'react';

export const DealRouteComponent: FC = () => {
  const idParam = Number(useParams()['id']);

  // eslint-disable-next-line ts/no-non-null-assertion -- I don't know how to redirect to 404 from the component...
  const { id, title } = useAppSelector((state) =>
    selectDealById(state, idParam),
  )!;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deleteDeal = () => {
    if (confirm('Вы уверены, что хотите удалить сделку?')) {
      navigate('/deals');
      dispatch(deleteDealAction(id));
    }
  };

  return (
    <section className={styles.sectionClass}>
      <header className={styles.headerClass}>
        <h2 className={styles.headingClass}>{title}</h2>

        <button
          type="button"
          onClick={deleteDeal}
          className={styles.deleteBtnClass}
        >
          Удалить
        </button>
      </header>

      <DealRouteProgressBar />

      <div className={styles.formsContainerClass}>
        <DealRouteBasicInfoForm />
        <DealRouteCommentForm />
      </div>
    </section>
  );
};
