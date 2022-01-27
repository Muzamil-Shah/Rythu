import React from "react";

function MessageBox(props) {
  return (
    <div className={`text-center mr-3 rounded-lg p-2 h-10 w-full text-xl flex justify-center items-center alert-${props.variant || 'info'}`}>
        {props.children}
    </div>
  );
}

export default MessageBox;
