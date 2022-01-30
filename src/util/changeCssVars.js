
export const changeCssVars = (theme) => {

  const root = document.querySelector(':root');

  const cssVars = ['theme-switcher-bg-color', 'body-bg-color', 'text-color', 'header-bg-color', 'footer-bg-color', 'aside-bg-color', 'main-bg-color', 'quote-bg-color', 'quote-shadow', 'textarea-bg-color', 'todoItem-bg-color', 'todoChekboxArrow-bg-color'];

  cssVars.forEach((elem) => {
    root.style.setProperty(
      `--theme-default-${elem}`,
      `var(--theme-${theme}-${elem})`
    )
  })

}