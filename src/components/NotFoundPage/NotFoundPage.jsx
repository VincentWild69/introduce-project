import s from './NotFoundPage.module.css';
import { useTranslation } from 'react-i18next';


const NotFoundPage = () => {

  const {t} = useTranslation();

  return (
      <div className={s.nfpContainer}>
        <div className={s.nfpContent}>
          <div>{t("common.page-not-exist")}</div>
          <div>&#128528;</div>
        </div>
      </div>
  );
}

export default NotFoundPage;