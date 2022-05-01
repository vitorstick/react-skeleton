import React from 'react';
import Item from '../components/Item';
import { IAction } from '../interfaces';
import { Store } from '../store/Store';

export default function Main(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    console.log('Main: useEffect ', state.abilities);
    state.abilities.length === 0 && fetchDataAction();
  }, []);

  const baseUrl: string = 'https://api.pagerduty.com';
  const token: string = 'y_NbAkKc66ryYTWUXYEu';

  const fetchDataAction = async () => {
    const data = await fetch(`${baseUrl}/abilities`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${token}`,
      },
    });
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON.abilities,
    });
  };

  const selectAbility = (ability: string): IAction => {
    const abInList = state.abilities.find((ab: string) => ab === ability);

    console.log('Main: selectAbility ', abInList);
    return dispatch({
      type: 'SELECT_ABILITY',
      payload: abInList,
    });
  };

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <section className='episode-layout'>
          {state.abilities.map((ability: string) => (
            <Item
              key={ability}
              ability={ability}
              selectAbility={selectAbility}
            />
          ))}
        </section>
      </React.Suspense>
    </React.Fragment>
  );
}
