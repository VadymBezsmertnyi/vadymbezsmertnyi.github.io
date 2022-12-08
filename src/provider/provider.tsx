import React, { ReactNode, useEffect } from 'react';

import { DEFAULT_VALUE_CONTEXT } from 'constants/default';
import { Cell, TSizeTable } from 'types/data';

const { createContext, useState } = React;
const Context = createContext(DEFAULT_VALUE_CONTEXT);

interface IContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: IContextProviderProps) => {
  const [sizeTable, setSizeTable] = useState<TSizeTable>({ m: 0, n: 0 });
  const [valueX, setValueX] = useState<number>(0);
  const [showMatrix, setShowMatrix] = useState<Array<Array<Cell>>>([]);

  const addOneCell = (
    indexRow: number,
    indexCell: number,
    newAmount: number
  ) => {
    const newMatrix = showMatrix.map((row, indexRowState) =>
      indexRow === indexRowState
        ? row.map((cell, indexCellState) =>
            indexCell === indexCellState ? { ...cell, amount: newAmount } : cell
          )
        : row
    );
    setShowMatrix(newMatrix);
  };

  useEffect(() => {
    const rows = Array.from(Array(sizeTable.m).keys());
    const columns = Array.from(Array(sizeTable.n).keys());
    let createIdCell = 0;
    const matrixState: Array<Array<Cell>> = rows.map(() =>
      columns.map(() => {
        const randomNumberCell = Math.floor(Math.random() * 1000);
        createIdCell += 1;
        return {
          id: createIdCell,
          amount: randomNumberCell,
        };
      })
    );
    setShowMatrix(matrixState);
  }, [sizeTable]);

  return (
    <Context.Provider
      value={{
        sizeTable,
        setSizeTable,
        valueX,
        setValueX,
        matrix: showMatrix,
        addOneCell,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { ContextProvider };
