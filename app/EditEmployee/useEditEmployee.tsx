import { useAppDispatch } from "@/store";
import { updateEmployee } from "@/store/employeeSlice";
import { IEmployee } from "@/types/IEmployee";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function useEditEmployee() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    fullName: string;
    salary: string;
    age: string;
  }>();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState<string>(params.fullName);
  const [salary, setSalary] = useState<string>(params.salary);
  const [age, setAge] = useState<string>(params.age);
  const [error, setError] = useState<string>("");

  function onChangeName(text: string) {
    setError("");
    setFullName(text);
  }

  function onChangeSalary(text: string) {
    setError("");
    setSalary(text);
  }
  function onChangeAge(text: string) {
    setError("");
    setAge(text);
  }

  const isFormValid = () => {
    return fullName !== "" && salary !== "" && age !== "";
  };

  const isFormChanged = () => {
    return (
      fullName !== params.fullName ||
      salary !== params.salary ||
      age !== params.age
    );
  };

  function onSubmit() {
    if (isFormValid()) {
      if (isFormChanged()) {
        dispatch(
          updateEmployee({
            id: Number(params.id),
            employee_name: fullName,
            employee_salary: salary,
            employee_age: age,
            profile_image: "",
          })
        );
        router.back();
      } else {
        setError("Field must be changed!");
      }
    } else {
      setError("All fields must be filled!");
    }
  }

  function onCancel() {
    router.back();
  }

  return {
    actions: {
      onChangeName,
      onChangeSalary,
      onChangeAge,
      onSubmit,
      onCancel,
    },
    states: {
      fullName,
      salary,
      age,
      error,
    },
  };
}
