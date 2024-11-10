import { useParams } from 'react-router-dom';
import { nonEmpty, object, pipe, string, type InferInput } from 'valibot';

import { TextField } from '~/components/TextField';
import { useAppDispatch, useAppSelector } from '~/hooks/store';
import { useImprovedForm } from '~/hooks/useImprovedForm';
import { addCommentToDealAction, selectDealById } from '~/store/slices/deals';
import { dealRouteCommentFormStyles as styles } from './styles.css';

import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const formSchema = object({ comment: pipe(string(), nonEmpty()) });
type FormValues = InferInput<typeof formSchema>;

export const DealRouteCommentForm: FC = () => {
  const id = Number(useParams()['id']);
  // eslint-disable-next-line ts/no-non-null-assertion -- I don't know how to redirect to 404 from the component...
  const { comments } = useAppSelector((state) => selectDealById(state, id))!;

  const { reset, register, handleSubmit } = useImprovedForm({
    schema: formSchema,
    defaultValues: { comment: '' },
  });

  const dispatch = useAppDispatch();

  const submitHandler: SubmitHandler<FormValues> = ({ comment }) => {
    dispatch(addCommentToDealAction({ dealId: id, comment }));
    reset();
  };

  return (
    <div className={styles.formContainerClass}>
      {/* eslint-disable-next-line ts/no-misused-promises -- don't worry, buddy */}
      <form onSubmit={handleSubmit(submitHandler)} className={styles.formClass}>
        <TextField label="Комментарий" {...register('comment')} />
      </form>

      <ul role="list" className={styles.listClass}>
        {comments.map((text) => (
          <li key={text} className={styles.listItemClass}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};
