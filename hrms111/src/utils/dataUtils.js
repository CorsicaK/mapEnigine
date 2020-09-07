/* 格式化日期 */
export function formateDate(time) {
  if (!time) return ''
  let day = new Date(time)
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();
  let today = day.getDay();
  let a=' ';
  let arr = ['日', '一', '二', '三', '四', '五', '六'];
  function getTime() {
    let date1 = new Date();
    let h = date1.getHours();
    h = h < 10 ? '0' + h : h;
    let m = date1.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = date1.getSeconds();
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
  }
  return year + '年' + month + '月' + date + '日' + a + '星期' + arr[today] + a + getTime();
}

