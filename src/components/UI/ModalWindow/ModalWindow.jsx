import s from './ModalWindow.module.css';
import SvgSelector from './../../SvgSelector/SvgSelector';
import classNames from "classnames/bind";


const cx = classNames.bind(s);


const ModalWindow = ({children, visible, setVisible}) => {
 
  return (
      <div onClick={setVisible} className={cx("modalContainer", { active: visible })}>
        <div className={s.modalBody}>
          <div onClick={e => e.stopPropagation()} className={s.modalContent}>
            <button onClick={setVisible} className={s.modalCloseBtn}><SvgSelector id='close-btn'/></button>
            <div className={s.modalContentWrapper}>
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ModalWindow;