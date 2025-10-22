import { useAppDispatch, useAppSelector } from "@/store";
import { deleteEmployee, getEmployees } from "@/store/employeeSlice";
import { IEmployee } from "@/types/IEmployee";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function useHome() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { employees, loading, error } = useAppSelector(
    (state) => state.employees
  );

  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [deletionModalVisible, setDeletionModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  function reload() {
    dispatch(getEmployees());
  }

  function goToAddEmployee() {
    router.navigate("/AddEmployee");
  }

  function goToEditEmployee(employee: IEmployee) {
    router.navigate({
      pathname: "/EditEmployee",
      params: {
        id: employee.id.toString(),
        fullName: employee.employee_name,
        salary: employee.employee_salary,
        age: employee.employee_age,
      },
    });
  }

  function onPressDelete(employee: IEmployee) {
    setSelectedEmployee(employee);
    setDeletionModalVisible(true);
  }

  function onAgreeToDelete() {
    dispatch(deleteEmployee(selectedEmployee?.id ?? 0));
    setSelectedEmployee(null);
    setDeletionModalVisible(false);
  }

  function onDisagreeToDelete() {
    setSelectedEmployee(null);
    setDeletionModalVisible(false);
  }

  return {
    actions: {
      goToAddEmployee,
      goToEditEmployee,
      onPressDelete,
      onAgreeToDelete,
      onDisagreeToDelete,
      reload,
    },
    states: {
      employees,
      loading,
      error,
      deletionModalVisible,
      selectedEmployee,
    },
  };
}
