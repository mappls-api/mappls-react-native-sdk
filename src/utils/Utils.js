 export function getFormattedDistance(distance) {
    if (distance / 1000 < 1) {
      return distance + 'mtr.';
    }
    let dis = distance / 1000;
    dis = dis.toFixed(2);
    return dis + 'Km.';
  }

 export function getFormattedDuration(duration) {
    let min = parseInt((duration % 3600) / 60);
    let hours = parseInt((duration % 86400) / 3600);
    let days = parseInt(duration / 86400);
    if (days > 0) {
      return (
        days +
        ' ' +
        (days > 1 ? 'Days' : 'Day') +
        ' ' +
        hours +
        ' ' +
        'hr' +
        (min > 0 ? ' ' + min + ' ' + 'min.' : '')
      );
    } else {
      return hours > 0
        ? hours + ' ' + 'hr' + (min > 0 ? ' ' + min + ' ' + 'min' : '')
        : min + ' ' + 'min.';
    }
  }