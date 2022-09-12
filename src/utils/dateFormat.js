/**
 * @author Burkhardt Renz
 * Formatting string in iso date format to american style
 */

export const dateFormat = (isoString) => {
  let date;
  switch (isoString.length) {
    case 4:
      return isoString;
    case 7:
      date = new Date(isoString);
      return date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
    default:
      date = new Date(isoString);
      return date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
  }
}