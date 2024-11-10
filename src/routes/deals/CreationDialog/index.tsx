import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { useId, useState, type FC } from 'react';
import { nonEmpty, object, pipe, string, type InferInput } from 'valibot';

import { Button } from '~/components/Button';
import { TextField } from '~/components/TextField';
import { useAppDispatch } from '~/hooks/store';
import { useImprovedForm } from '~/hooks/useImprovedForm';
import { createDealAction } from '~/store/slices/deals';
import { dealsRouteCreationDialogStyles as styles } from './styles.css';

import type { SubmitHandler } from 'react-hook-form';

const formSchema = object({ title: pipe(string(), nonEmpty()) });
type FormValues = InferInput<typeof formSchema>;

export const DealsRouteCreationDialog: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useImprovedForm({
    schema: formSchema,
    defaultValues: { title: '' },
  });

  const submitHandler: SubmitHandler<FormValues> = (formValues) => {
    dispatch(createDealAction(formValues));
    setOpen(false);
  };

  const titleId = useId();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) reset();
  };

  return (
    <Root open={open} onOpenChange={handleOpenChange}>
      <Trigger asChild className={styles.triggerClass}>
        <Button variant="tertiary">Создать</Button>
      </Trigger>

      <Portal>
        <Overlay className={styles.overlayClass}>
          <Content aria-labelledby={titleId} className={styles.contentClass}>
            <Title id={titleId} className={styles.titleClass}>
              Создать сделку
            </Title>

            <form
              // eslint-disable-next-line ts/no-misused-promises -- don't worry, buddy
              onSubmit={handleSubmit(submitHandler)}
              aria-labelledby={titleId}
              className={styles.formClass}
            >
              <TextField
                label="Название"
                error={errors.title}
                {...register('title')}
              />

              <Button variant="primary" type="submit">
                Создать
              </Button>

              <Close asChild>
                <Button variant="secondary">Отмена</Button>
              </Close>
            </form>
          </Content>
        </Overlay>
      </Portal>
    </Root>
  );
};
