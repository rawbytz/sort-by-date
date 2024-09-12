# Sort by Date - WorkFlowy
- Sorts the current zoom level children by WorkFlowy date.
- Uses the first date found in the item name and note.
- Dated items are sorted, and grouped at the top. 
- Undated items are unsorted, and grouped at the bottom.
- Sorts all dated items including hidden completed items.

![sortByDate](https://i.imgur.com/pRGPx45.png)

## Installation: Drag this link to your bookmarks bar:

<!-- Special #setup editing instrucions go here -->

<a href="javascript:(function sortByDate_0_7(){function toastMsg(str,sec,err){WF.showMessage(str,err);setTimeout(WF.hideMessage,(sec||2)*1e3)}function sortDatesAndMove(dItems,reverse){WF.hideDialog();setTimeout(()=&gt;{dItems.sort((a,b)=&gt;reverse?b.date-a.date:a.date-b.date);WF.editGroup(()=&gt;{dItems.forEach((dItem,i)=&gt;WF.moveItems([WF.getItemById(dItem.pid)],current,i))});WF.editItemName(current);toastMsg(`Sorted ${reverse?&quot;New to Old&quot;:&quot;Old to New&quot;}`,1)},50)}const htmlEscText=str=&gt;str.replace(/&amp;/g,&quot;&amp;amp;&quot;).replace(/&gt;/g,&quot;&amp;gt;&quot;).replace(/&lt;/g,&quot;&amp;lt;&quot;).replace(/&quot;/g,&quot;&amp;quot;&quot;);function showDatedSortDialog(bodyHtml,title,button1,button2){const style='.btnX{font-size:18px;background-color:gray;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus,.btnX:hover{border-color:#c4c4c4;background-color:steelblue}';const buttons=`&lt;div&gt;&lt;button type=&quot;button&quot; class=&quot;btnX&quot; id=&quot;btn1&quot;&gt;${button1}&lt;/button&gt;&lt;button type=&quot;button&quot; class=&quot;btnX&quot; id=&quot;btn2&quot;&gt;${button2}&lt;/button&gt;&lt;/div&gt;`;WF.showAlertDialog(`&lt;style&gt;${htmlEscText(style)}&lt;/style&gt;&lt;div&gt;${bodyHtml}&lt;/div&gt;${buttons}`,title);const intervalId=setInterval((function(){let btn1=document.getElementById(&quot;btn1&quot;);if(btn1){clearInterval(intervalId);const btn2=document.getElementById(&quot;btn2&quot;);btn1.focus();btn1.onclick=function(){sortDatesAndMove(datedItems)};btn2.onclick=function(){sortDatesAndMove(datedItems,true)}}}),50)}function addIfDated(item){const name=item.getName();const note=item.getNote();const time=(new DOMParser).parseFromString(name+note,'text/html').querySelector(&quot;time&quot;);if(!time)return;const ta=time.attributes;if(ta!==undefined&amp;&amp;ta.startyear!==undefined&amp;&amp;ta.startmonth!==undefined&amp;&amp;ta.startday!==undefined){const startYMD=`${ta.startyear.value}-${ta.startmonth.value}-${ta.startday.value}`;const startTime=ta.starthour?` ${ta.starthour.value}:${ta.startminute?ta.startminute.value:&quot;00&quot;}`:&quot; 00:00&quot;;const startStr=startYMD+startTime;datedItems.push({pid:item.getId(),pty:item.getPriority(),date:Date.parse(startStr)})}return}if(WF.currentSearchQuery())return void toastMsg(&quot;Sorting is disabled when search is active.&quot;,3,true);const current=WF.currentItem();if(current.isEmbedded())return void toastMsg(&quot;Sorting disabled for added shares.&quot;,3,true);const children=current.getChildren();if(children.length&lt;2)return void toastMsg(&quot;Nothing to sort.&quot;,3,true);const datedItems=[];children.forEach(item=&gt;addIfDated(item));if(datedItems.length===0)return void toastMsg(&quot;No dated items to sort.&quot;,3,true);const sortInfo=`Sort &lt;b&gt;${datedItems.length}&lt;/b&gt; dated items?`;showDatedSortDialog(sortInfo,current.getNameInPlainText(),'Old to New','New to Old')})();">sortByDate</a>
## Links:
- [Source code](https://github.com/rawbytz/sort-by-date/blob/master/sortByDate.js)
- [rawbytz Blog](https://rawbytz.wordpress.com)


## Version Notes:
- v0.7 (2024-09-11): fix button colors
- v0.5 (2020-08-14): disable for embedded content
