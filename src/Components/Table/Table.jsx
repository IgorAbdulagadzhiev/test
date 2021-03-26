import React from "react";
import MUIDataTable from "mui-datatables";
import { EditAction, DeleteAction } from "./TableActions";
import withDeleteDialog from "../HOC/withDeleteDialog";

import EmployeesService from "../../services/employees-service.js";

const employeesService = new EmployeesService();

const Table = ({ onOpenDeleteDialog }) => {
  const data = [
    {
      id: 1,
      fullname: "Иванов Иван Иванович",
      position: "Директор",
      subdivision: "Разработка",
      email: "123@123.123",
      phone: "88005553535",
    },
    {
      id: 2,
      fullname: "Иванов Петр Иванович",
      position: "Разработчик",
      subdivision: "Разработка",
      email: "123@123.123",
      phone: "88005553535",
    },
  ];

  const [employees, setEmployees] = React.useState(data);

  React.useEffect(() => {
    employeesService.getEmployees().then((result) => {
      setEmployees(result);
    });
  }, []);

  const renderActionColumn = (id) => {
    return (
      <>
        <EditAction title="Редактировать" onClick={() => {}} />
        <DeleteAction
          title="Удалить"
          onClick={() =>
            onOpenDeleteDialog(() =>
              employeesService.deleteEmployee(id).then(() => {
                const idx = employees.findIndex((el) => el.id === id);
                const newEmployees = [
                  ...employees.slice(0, idx),
                  ...employees.slice(idx + 1),
                ];
                setEmployees(newEmployees);
              }
              )
            )
          }
        />
      </>
    );
  };

  const columns = [
    {
      name: "fullname",
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
    {
      name: "id",
      label: "Действия",
      options: {
        filter: false,
        sort: false,
        print: false,
        searchable: false,
        download: false,
        customBodyRender: renderActionColumn,
      },
    },
  ];

  const options = {
    filterType: "textField",
    selectableRowsHeader: false,
    selectableRows: "none",
    textLabels: {
      body: {
        toolTip: "Сортировка",
        columnHeaderTooltip: (column) => `Сортировка для ${column.label}`,
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
    },
  };

  return (
    <MUIDataTable
      title={"Список сотрудников"}
      data={employees}
      columns={columns}
      options={options}
    />
  );
};

export default withDeleteDialog(Table);
