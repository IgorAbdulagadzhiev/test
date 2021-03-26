import MUIDataTable from "mui-datatables";
import { EditAction, DeleteAction} from './TableActions';

const columns = [
  {
    name: "FullName",
    label: "ФИО",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "position",
    label: "должность",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "subdivision",
    label: "подразделение",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "е-mail",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "phone",
    label: "телефон",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  customToolbarSelect: (data) => {
    console.log(data);
    return (
      <div>
        <EditAction title="Редактировать" />
        <DeleteAction title="Удалить" />
      </div>
      )
  },
  filterType: "textField",
  selectableRows: 'single',
  selectableRowsHeader: false,
  download: false,
  print: false,
  search: false,
  viewColumns: false,
  textLabels: {
    body: {
      toolTip: "Сортировка",
      columnHeaderTooltip: column => `Сортировка для ${column.label}`
    },
    pagination: {
      next: "Следующая страница",
      previous: "Предыдущая страница",
      rowsPerPage: "Строк на странице:",
      displayRows: "из",
    },
    toolbar: {
      filterTable: "Фильтрация",
    },
    filter: {
      all: "Все",
      title: "Фильтрация",
      reset: "Сбросить",
    },
    selectedRows: {
      text: "строк выбрано",
    },
  }
};

const Table = () => {
  return (
    <MUIDataTable
      title={"Список сотрудников"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default Table;
