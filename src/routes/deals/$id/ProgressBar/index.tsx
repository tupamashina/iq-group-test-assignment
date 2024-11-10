import { useId, type FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  CompletedDealStatus,
  UncompletedDealStatus,
  uncompletedDealStatusSchema,
} from '~/guards/schemas/deal';
import { useAppSelector } from '~/hooks/store';
import { selectDealById } from '~/store/slices/deals';
import { themeVars } from '~/styles/theme.css';
import { translateDealStatus } from '~/utils/translateDealStatus';
import { dealRouteProgressBarStyles as styles } from './styles.css';

const maxValue = uncompletedDealStatusSchema.options.length + 1;

export const DealRouteProgressBar: FC = () => {
  const id = Number(useParams()['id']);
  // eslint-disable-next-line ts/no-non-null-assertion -- I don't know how to redirect to 404 from the component...
  const { status } = useAppSelector((state) => selectDealById(state, id))!;

  const value = typeof status === 'number' ? status + 1 : maxValue;
  const rangeWidth = `${(100 / maxValue) * value}%`;
  const valueText = translateDealStatus(status);
  let rangeColor: string;

  switch (status) {
    case UncompletedDealStatus.NEW:
      rangeColor = themeVars.colors.new;
      break;

    case UncompletedDealStatus.IN_PROGRESS:
      rangeColor = themeVars.colors.inProgress;
      break;

    case UncompletedDealStatus.ALMOST_DONE:
      rangeColor = themeVars.colors.almostDone;
      break;

    case CompletedDealStatus.FAILURE:
      rangeColor = themeVars.colors.failure;
      break;

    case CompletedDealStatus.SUCCESS:
      rangeColor = themeVars.colors.success;
      break;
  }

  const labelId = useId();

  return (
    <div>
      <p id={labelId} className={styles.progressBarLabelClass}>
        Статус
      </p>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuenow={value}
        aria-valuemax={maxValue}
        aria-labelledby={labelId}
        aria-valuetext={valueText}
        className={styles.progressBarTrackClass}
      >
        <div
          aria-hidden
          className={styles.progressBarRangeClass}
          style={{ width: rangeWidth, backgroundColor: rangeColor }}
        >
          <div className={styles.progressBarValueTextClass}>{valueText}</div>
        </div>
      </div>
    </div>
  );
};
