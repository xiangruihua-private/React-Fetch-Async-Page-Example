function Square({myKey,value,handleClick,active}) {
  return React.createElement('div', { key:myKey,onClick: handleClick,className: `w-12 h-12 border border-primary flex justify-center items-center ${active ? 'bg-accent':''}` }, value);
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
function Board({num,squares,hanlePlay,order}) {
  let squaresClone = squares.slice();
  const setValue = (seq,row,col) => {
    if (squaresClone[seq] !== null || calculateWinner(squaresClone)) return;
    squaresClone[seq] = num%2===0?'X':'O';

    hanlePlay(squaresClone,row,col);
  }
  const winner = calculateWinner(squaresClone);
  let msg = winner ? `Winner: ${winner[0]}` : num === 8 ? 'No Winner' :
  [`You are Next player: ${num%2===0?'X':'O'} `,`at move #${order === 'asc' ? num+2 : 8-num}`].map((it,i) => React.createElement('div', { key:`msg${i}`,className: 'font-bold' }, it));
  return React.createElement('div',{key:'board'},
    React.createElement('div', {key:'msg',className:'font-bold'}, msg),
    Array.from([0, 1, 2]).map(i => React.createElement('div', { key:`row${i}`, className: 'board-row flex' },
      Array.from([0, 1, 2]).map(j => React.createElement(Square, { active:winner?.includes(3*i+j),key:3*i+j,myKey:`col${3*i+j}`,value:squares[3*i+j],handleClick: () => setValue(3*i+j,i,j) })),
    )),
  );
}
export default function Game() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  const [num, setNum] = React.useState(-1);
  const [history, setHistory] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [postions, setPostions] = React.useState(Array(9).fill(null));
  let currSquares = history[num] || Array(9).fill(null);
  const hanlePlay = (squaresClone,row,col) => {
    let historyClone = [...history.slice(0,num+1),squaresClone];
    setHistory(historyClone);
    setNum(historyClone.length-1);
    let postionsClone = postions.slice(0,num+1);
    postionsClone.push([row+1,col+1]);
    setPostions(postionsClone);
  }

  const back2Step = (step) => {
    setNum(step);
  }

  const ordered = (i) => order === 'asc' ? i+1 : 8-i+1;

  return React.createElement('div',{key:'game',className: 'flex'},
    React.createElement(Board,{num:num,squares:currSquares,hanlePlay:hanlePlay,order:order},),
    React.createElement('ol',{key:'ol',className: 'flex flex-col'},
      React.createElement('label', { className: 'swap border' },
        React.createElement('input', { type: 'checkbox', onChange: () => setOrder(order === 'asc' ? 'desc' : 'asc') }),
        React.createElement('div', { key:'on',className: 'swap-on' }, 'Descend'),
        React.createElement('div', { key:'off',className: 'swap-off' }, 'Ascend')
      ),
      React.createElement('li', { key:'start',className: 'link', onClick: () => back2Step(-1) }, 'Back to Game Start'),
      history.map((it,i) => React.createElement('li', {key:i, className: 'link', onClick: () => back2Step(i) }, `Back to move #${ordered(i)} (${postions[i]?.[0]},${postions[i]?.[1]})`)),
    )
  );
}
