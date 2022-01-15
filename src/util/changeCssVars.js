
export const changeCssVars = (theme) => {

  const root = document.querySelector(':root');

  const cssVars = ['theme-switcher-bg-color', 'body-bg-color', 'text-color', 'header-bg-color', 'footer-bg-color'];

  cssVars.forEach((elem) => {
    root.style.setProperty(
      `--theme-default-${elem}`,
      `var(--theme-${theme}-${elem})`
    )
  })

}