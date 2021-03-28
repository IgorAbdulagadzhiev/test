import React from "react";
import MUIDataTable from "mui-datatables";
import { EditAction, DeleteAction, AddAction } from "./TableActions";
import withDeleteDialog from "../HOC/withDeleteDialog";
import withEmployeeDialog from "../HOC/withEmployeeDialog";

import EmployeesService from "../../services/employees-service.js";

const employeesService = new EmployeesService();

const Table = ({ onOpenDeleteDialog, onOpenDialog }) => {
  const [employees, setEmployees] = React.useState();

  React.useEffect(() => {
    employeesService.getEmployees().then((result) => {
      setEmployees(result);
    });
  }, []);

  const deleteEmployee = (id) =>
    employeesService.deleteEmployee(id).then(() => {
      employeesService.getEmployees().then((result) => {
        setEmployees(result);
      });
    });

  const renderActionColumn = (id) => {
    const idx = employees.findIndex((el) => el.id === id);
    return (
      <>
        <EditAction
          onClick={() => {
            onOpenDialog(
              `редактирование сотрудника ${employees[idx].fullname}`,
              employees[idx],
              setEmployees
            );
          }}
          title="Редактировать"
        />
        <DeleteAction
          title="Удалить"
          onClick={() =>
            onOpenDeleteDialog(
              () => deleteEmployee(id),
              `сотрудника ${employees[idx].fullname}`
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
    customToolbar: () => (
      <React.Fragment>
        <AddAction
          onClick={() => {
            onOpenDialog("Создание сотрудника", {}, setEmployees);
          }}
        ></AddAction>
      </React.Fragment>
    ),
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

export default withEmployeeDialog(withDeleteDialog(Table));
