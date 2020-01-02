(function sortByDate_0_1() {
  function toastMsg(str, sec, err) {
    WF.showMessage(str, err);
    setTimeout(WF.hideMessage, (sec || 2) * 1000);
  }
  // [] convert from items to new array
  function sortAndMove(items, reverse) {
    WF.hideDialog();
    setTimeout(() => {
      items.sort((a, b) => reverse ? b.getNameInPlainText().localeCompare(a.getNameInPlainText()) : a.getNameInPlainText().localeCompare(b.getNameInPlainText()));
      WF.editGroup(() => {
        items.forEach((item, i) => {
          if (item.getPriority() !== i) WF.moveItems([item], current, i);
        });
      });
      // set focus to parent after sort
      WF.editItemName(current);
      toastMsg(`Sorted ${reverse ? "New to Old" : "Old to New"}`, 1)
    }, 50);
  }
  function showSortDialog(bodyHtml, title, button1, button2) {
    const style = '.btnX{font-size:18px;background-color:#49baf2;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';
    const buttons = `<div><button type="button" class="btnX" id="btn1">${button1}</button><button type="button" class="btnX" id="btn2">${button2}</button></div>`;
    WF.showAlertDialog(`<style>${htmlEscapeText(style)}</style><div>${bodyHtml}</div>${buttons}`, title);
    setTimeout(() => {
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      btn1.focus();
      btn1.onclick = function () { sortAndMove(children) };
      btn2.onclick = function () { sortAndMove(children, true) };
    }, 100);
  }
  const canCreateChild = item => !item.isReadOnly() || item.isMainDocumentRoot() || (item.isAddedSubtreePlaceholder() && !item.data.added_subtree.isReadOnly());
  if (WF.currentSearchQuery()) return void toastMsg("Sorting is disabled when search is active.", 3, true);
  const current = WF.currentItem();
  if (!canCreateChild(current)) return void toastMsg("Read-Only. Cannot sort bullets.", 3, true);
  // [] Filter items for dates (need to verify attribute date exists)
  const children = current.getChildren();
  if (children.length < 2) return void toastMsg("Nothing to sort.", 3, true);
  const sortInfo = `Sort <b>${children.length}</b> children?`;
  // [x] rename sort buttons
  showSortDialog(sortInfo, current.getNameInPlainText(), 'Old to New', 'New to Old');
})();