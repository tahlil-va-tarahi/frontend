const isOverlapping = (e1, e2) => {
  if (e1.length && e1.length > 1) {
    e1 = e1[0];
  }
  if (e2.length && e2.length > 1) {
    e2 = e2[0];
  }
  const rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false;
  const rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false;

  let overlap = false;

  if (rect1 && rect2) {
    overlap = !(rect1.bottom <= rect2.top || rect1.top >= rect2.bottom);

    return overlap;
  }

  return overlap;
};
export default isOverlapping;
