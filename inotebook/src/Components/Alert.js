import React from 'react';

function Alert(props) {
  return (
    <div style={{ position: 'relative' }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type}`}
          role="alert"
          style={{
            position: 'fixed',
            top: '60px',
            right: '20px',
            zIndex: '22',
            width: 'auto',
            maxWidth: '500px'
          }}
        >
          {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
