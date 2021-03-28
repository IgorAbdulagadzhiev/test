import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useFormik } from "formik";
import * as yup from "yup";

import EmployeesService from "../../services/employees-service.js";
import { makeStyles } from "@material-ui/core";

import { phoneRegExp } from "../../utils/RegExp";

const employeesService = new EmployeesService();

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    padding: "0 20px 20px 20px",
  },
  field: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    maxWidth: 150,
    "&:not(:last-of-type)": {
      marginRight: 10,
    },
  },
  item: {
    minHeight: 36,
  },
}));

const validationSchema = yup.object({
  fullname: yup.string("Введите ваше ФИО").required("ФИО обязательно"),
  email: yup.string("Введите почту").email("Неверный формат email"),
  phone: yup
    .string("Введите номер телефона")
    .matches(phoneRegExp, "Неверный формат номера телефона"),
  position: yup.string("Выберите должность").required("Должность обязательна"),
  subdivision: yup
    .string("Выберите подразделение")
    .required("Подразделение обязательно"),
});

const EmployeeForm = ({ handleClose, data, callback }) => {
  const classes = useStyles();
  const [directory, setDirectory] = React.useState("");

  const editEmployee = (values, data) => {
    employeesService.putEmployee(data.id, values).then(() =>
      employeesService.getEmployees().then((result) => {
        callback(result);
        handleClose();
      })
    );
  };

  const addEmployee = (values) => {
    employeesService.postEmployee(values).then(() =>
      employeesService.getEmployees().then((result) => {
        callback(result);
        handleClose();
      })
    );
  };

  const getEmployee = () => {
    employeesService.getDirectory().then((result) => {
      setDirectory(result);
    });
  };

  const formik = useFormik({
    initialValues: {
      fullname: data?.fullname ?? "",
      position: data?.position ?? "",
      subdivision: data?.subdivision ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      data?.fullname ? editEmployee(values, data) : addEmployee(values);
    },
  });

  React.useEffect(getEmployee, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.field}
          id="fullname"
          name="fullname"
          label="ФИО"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          helperText={formik.touched.fullname && formik.errors.fullname}
        />
        <TextField
          select
          className={classes.field}
          id="position"
          name="position"
          label="Должность"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
        >
          <MenuItem className={classes.item} value=""></MenuItem>
          {directory?.position?.map((item) => (
            <MenuItem className={classes.item} key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          className={classes.field}
          id="subdivision"
          name="subdivision"
          label="Подразделение"
          value={formik.values.subdivision}
          onChange={formik.handleChange}
          error={
            formik.touched.subdivision && Boolean(formik.errors.subdivision)
          }
          helperText={formik.touched.subdivision && formik.errors.subdivision}
        >
          <MenuItem className={classes.item} value=""></MenuItem>
          {directory?.subdivision?.map((item) => (
            <MenuItem className={classes.item} key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.field}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.field}
          id="phone"
          name="phone"
          label="Телефон"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Сохранить
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleClose}
            className={classes.button}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
