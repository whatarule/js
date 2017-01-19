/*global React ReactDOM __ Immutable __Element*/
(() => {
  'use strict';
  const TodoElement = () => {
    const ClockElement = __Element(__
      .intervalSeq(Immutable.Range(), 100)
      .__(() => (<div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>)));
    const __focusedList = __()
      .__((val) => (__.log.t = val));
    const __lists = __(true)
      .__((__list) => {
        __focusedList.t = __lists.length;
        return __list;
      });
    const ListofListElement = __Element(__([__lists])
      .__(() => ((__lists)
        .map((list, i) => (<button
          onClick = {() => (__.log.t = __focusedList.t = i)}>
          {'List#' + (i + 1)}</button>)))));
    const InputElement = () => {
      const __value = __();
      const onChange = (e) => (__value.t = e.target.value);
      const onClick = () => {
        __.log.t = __lists[__focusedList.t].t = __value.t;
      };
      const onClickNL = () => {
        __lists.t = __(true); //new items-list
        __.log.t = 'newList';
      };
      const __seqEl = __([__value])
        .__((value) => (<div>
          <h4>{'List#' + (__focusedList.t + 1)}
          <button onClick = {onClickNL}>{'NewList'}</button></h4>
            {__lists[__focusedList.t]
            .map((item) => (<li>{item}</li>))}
            <input type="text" value={value} onChange={onChange}/>
            <button onClick = {onClick}>{'NewToDo#' + (__lists[__focusedList.t].length + 1)}</button>
            </div>));
      __.log.__(() => (__value.t = ""));
      return __Element(__seqEl);
    };
    __lists.t = __(true); //new items-list
    (() => {
      const __delay = __
        .intervalSeq(Immutable
          .Seq.of("started!"), 1000)
        .log()
        .__(() => (__.log.t = "showInput"));
    })();
    return (<div><h2>ToDo</h2>
      {ClockElement}<p/>
      {ListofListElement}<p/>
      {InputElement()}</div>);
  };
  const mount = ReactDOM.render(TodoElement(), document.getElementById('todo'));
})();
