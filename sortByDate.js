(function sortByDate_0_4() {
  function toastMsg(str, sec, err) {
    WF.showMessage(str, err);
    setTimeout(WF.hideMessage, (sec || 2) * 1000);
  }
  function sortDatesAndMove(dItems, reverse) {
    WF.hideDialog();
    setTimeout(() => {
      dItems.sort((a, b) => reverse ? b.date - a.date : a.date - b.date);
      WF.editGroup(() => {
        dItems.forEach((dItem, i) => WF.moveItems([WF.getItemById(dItem.pid)], current, i));
      });
      // set focus to current after sort
      WF.editItemName(current);
      toastMsg(`Sorted ${reverse ? "New to Old" : "Old to New"}`, 1)
    }, 50);
  }
  const htmlEscText = str => str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  function showDatedSortDialog(bodyHtml, title, button1, button2) {
    const style = '.btnX{font-size:18px;background-color:steelblue;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';
    const buttons = `<div><button type="button" class="btnX" id="btn1">${button1}</button><button type="button" class="btnX" id="btn2">${button2}</button></div>`;
    WF.showAlertDialog(`<style>${htmlEscText(style)}</style><div>${bodyHtml}</div>${buttons}`, title);
    setTimeout(() => {
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      btn1.focus();
      btn1.onclick = function () { sortDatesAndMove(datedItems) };
      btn2.onclick = function () { sortDatesAndMove(datedItems, true) };
    }, 100);
  }
  const canCreateChild = item => !item.isReadOnly() || item.isMainDocumentRoot() || (item.isAddedSubtreePlaceholder() && !item.data.added_subtree.isReadOnly());

  function addIfDated(item) {
    const name = item.getName();
    const note = item.getNote();
    const time = new DOMParser().parseFromString(name + note, 'text/html').querySelector("time");
    if (!time) return
    const ta = time.attributes;
    if (ta !== undefined && ta.startyear !== undefined && ta.startmonth !== undefined && ta.startday !== undefined) {
      const startYMD = `${ta.startyear.value}-${ta.startmonth.value}-${ta.startday.value}`;
      const startTime = ta.starthour ? ` ${ta.starthour.value}:${ta.startminute ? ta.startminute.value : "00"}` : " 00:00";
      const startStr = startYMD + startTime;
      datedItems.push({pid: item.getId(), pty: item.getPriority(), date: Date.parse(startStr)})
    }
    return
  }
  if (WF.currentSearchQuery()) return void toastMsg("Sorting is disabled when search is active.", 3, true);
  const current = WF.currentItem();
  if (!canCreateChild(current)) return void toastMsg("Read-Only. Cannot sort bullets.", 3, true);
  const children = current.getChildren();
  if (children.length < 2) return void toastMsg("Nothing to sort.", 3, true);
  const datedItems = [];
  children.forEach(item => addIfDated(item));
  if (datedItems.length === 0) return void toastMsg("No dated items to sort.", 3, true);
  const sortInfo = `Sort <b>${datedItems.length}</b> dated items?`;
  showDatedSortDialog(sortInfo, current.getNameInPlainText(), 'Old to New', 'New to Old');
})();