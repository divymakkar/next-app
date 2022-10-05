export function scrollTo(id: string, offset = 205) {
  // document?.getElementById(id)?.scrollIntoView({alignToTop:true});
  const element = document?.getElementById(id);
  const y = element?.getBoundingClientRect().top + window.scrollY;
  if (y)
    window.scroll({
      top: y - offset,
      behavior: "smooth",
    });
}
