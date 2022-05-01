import React from 'react';

export default function Item(props: any): JSX.Element {
  const { ability, selectAbility } = props;

  return (
    <React.Fragment>
      <div className='item'>
        <div className='item-name'>{ability}</div>
        <button className='item-button' onClick={() => selectAbility(ability)}>
          Select
        </button>
      </div>
    </React.Fragment>
  );
}
