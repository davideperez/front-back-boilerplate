import '@tanstack/react-table'
// TODO: Learn in depth the difference between the implemented and commented version.
declare module '@tanstack/react-table' {
  interface ColumnMeta {
    className?: string
  }
}

/* 
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
  }
} */