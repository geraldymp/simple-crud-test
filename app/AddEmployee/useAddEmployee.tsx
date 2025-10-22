import { useAppDispatch } from "@/store";
import { addEmployee } from "@/store/employeeSlice";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function useAddEmployee() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [age, setAge] = useState<string>("");
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

  function onSubmit() {
    if (isFormValid()) {
      dispatch(
        addEmployee({
          employee_name: fullName,
          employee_salary: salary,
          employee_age: age,
          profile_image: "",
        })
      );
      router.back();
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
