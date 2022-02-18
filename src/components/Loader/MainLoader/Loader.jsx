import s from './Loader.module.css';


const Loader = ({height = '100px'}) => {
  return (
      <div className={s.loaderWrapper} style={{height: `${height}`}}>
        <div className={s.loaderBody}>
          <svg stroke="#4fc56b" viewBox="0 0 40 40" className={s.loaderSvg}>
          <g
            transform="translate(2 2)"
            strokeWidth={3}
            fill="none"
            fillRule="evenodd"
          >
            <circle strokeOpacity={0.5} cx={18} cy={18} r={18} />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
          </svg>
        </div>
      </div>
  );
}

export default Loader;